# Loom21 Website — Implementation Plan v2 (for Claude Code)

**Repo:** `bitcoinfixesalot/loom21website` (Angular 21, SSR + prerender, `@angular/localize` EN source + BG `.xlf`)
**Related repos (not in this plan's commits):**
- `loom21/loom21doc` — the docs markdown (`README.md`, `README-bg.md`) loaded at runtime by `/docs`
- Loom21 app (.NET + Angular, `app.loom21.com`) — owns plans, Stripe prices and limits
**Supersedes:** `claude/loom21-website-fixes-plan.md` (2026-10-06). That plan was written without repo access; this one uses real paths.
**Date:** 2026-10-07

> **How to run this:** Work phase by phase, one commit per phase, on branch `website-v2-pricing-positioning`. Read `CLAUDE.md` first: it defines the SEO pattern (Title + Meta + `OgMetaService` + `StructuredDataService` + breadcrumb) that every page change must follow. At the end of each phase, run the phase's **Check** block before committing.

---

## 0. Locked decisions (from Svetlan, 2026-10-07)

| # | Decision | Value |
|---|---|---|
| L1 | Free tier | **Free forever**: 1 user, 1 store, 50 orders/month |
| L2 | Users | **Unlimited users from Growth up** |
| L3 | API | **Read-only API on every plan**; full API and webhooks on Growth and Pro. Show it as "coming soon" until it ships (see `API_STATUS` flag) |
| L4 | Transaction fees | **0% Loom21 fee on every rail, including Stripe.** The merchant still pays their processor's own fees |
| L5 | Billing discounts | Annual billing is about 17% off ("2 months free"). Paying in Bitcoin is billed annually and works out about 25% off the monthly price |
| L6 | Overage policy | **Soft limits.** Warn at 80% and 100% of the order cap, allow a 1-month grace period, then prompt an upgrade. **Never block a merchant from getting paid** |

### New tier matrix (source of truth for every page)

| | **Free** | **Starter** | **Growth** ⭐ | **Pro** | **Custom** |
|---|---|---|---|---|---|
| Monthly | €0 | €29 | €79 | €179 | Quote |
| Annual (per month) | €0 | €24 | €66 | €149 | — |
| Bitcoin (per month, billed annually) | €0 | €21.60 | €59.40 | €134.10 | — |
| Users | 1 | 3 | Unlimited | Unlimited | Unlimited |
| Store locations | 1 | 2 | 5 | 25 | Unlimited |
| Orders / month | 50 | 1,000 | 5,000 | 25,000 | Custom |
| Payment links | Unlimited | Unlimited | Unlimited | Unlimited | Unlimited |
| Bitcoin (Lightning + on-chain) + cards (Stripe) | ✓ | ✓ | ✓ | ✓ | ✓ |
| Loom21 transaction fee | 0% | 0% | 0% | 0% | 0% |
| CSV/JSON import & export | ✓ | ✓ | ✓ | ✓ | ✓ |
| Price lists, tiers, custom fields | ✓ | ✓ | ✓ | ✓ | ✓ |
| User roles & access rights | — | — | ✓ | ✓ | ✓ |
| API | Read-only | Read-only | Full + webhooks | Full + webhooks | Full + SLA |
| Support | Community | Email | Priority email | Priority + onboarding call | Dedicated |

### Still open — Claude Code must ask Svetlan at the start of Phase 0

Ask all of these in **one message**, then record the answers here. Where a default is given, use it if Svetlan says "go with defaults".

| ID | Question | Default if "use defaults" | Blocks |
|----|----------|---------------------------|--------|
| O1 | `API_STATUS` today: `live`, `early`, or `soon`? | `soon` | Phase 1, 3 |
| O2 | Existing subscribers on Entrepreneur / Small Business / Mid-size: keep their current price (grandfather) for how long? | Grandfather 12 months, then move each to the nearest new tier | Phase 1 backend checklist |
| O3 | Is the backend (app repo) ready to return the new plan codes (`starter`/`growth`/`pro`)? | No. Ship with static prices (see §1.3) and route "Choose plan" to signup | Phase 1 |
| O4 | Legal entity for Privacy/Terms: registered address, ЕИК, contact email | email `info [at] loom21 [dot] com`; others TODO | Phase 5 |
| O5 | Hosting provider(s) to list as processors (Azure? Hetzner?) | TODO placeholder | Phase 5 |
| O6 | Real promo video ID for `PROMO_VIDEO_ID` in `home.component.ts`? | Keep the current one but leave the TODO in place | Phase 3 |
| O7 | Rates for the "What you really pay" calculator: card rate and Lightning rate | Card 2.9% + €0.30; Lightning 1.0% (conservative hosted-wallet figure) | Phase 1 |
| O8 | How are "invoice paid" notifications delivered (in-app / email)? | In-app | Phase 3 copy |
| O9 | Cancellation and refund rule for the pricing FAQ | Cancel anytime; the plan runs to the end of the paid period; no partial refunds | Phase 1 |

### Answers (Svetlan, 2026-10-07)

| ID | Answer |
|----|--------|
| O1 | Default: `soon` |
| O2 | **No existing subscribers** on Entrepreneur / Small Business / Mid-size. No grandfathering or migration; retire the old plans (backend confirms in the DB first) |
| O3 | No. Confirmed: the live `available-plans` still returns `basic`/`small`/`mid` |
| O4 | Default: `info [at] loom21 [dot] com`; address and ЕИК TODO |
| O5 | Default: TODO placeholder |
| O6 | Default: keep the current video ID and its TODO |
| O7 | **Loom21 doesn't collect processor rates; they depend on the provider.** Drop the calculator; replace it with a static "What you pay" block (plan + your processor's own fees; Loom21 fee €0). No assumed rates on the site |
| O8 | Default: in-app |
| O9 | Default: cancel anytime; runs to the end of the paid period; no partial refunds |
| O10 | Contact-form email provider (sent via the app backend `api/Users/ContactUs`): TODO placeholder |
| Deploy | **Option (b):** Phase 1 + §2.1 + §2.3 live on branch `pricing-v2` until the backend Free plan is live. Phases 3–7 ship first on `website-v2-pricing-positioning` with "Free to start" wording; anything quoting new tier names or prices is held on `pricing-v2` |

---

## Guardrails (every phase)

1. **Never write "crypto".** Say "Bitcoin". `rg -in crypto src/` must return 0.
2. **Every user-facing string goes through `$localize` / `i18n` with an explicit `@@id`**, and gets a BG `<target>` in `src/locale/messages.bg.xlf` in the same commit.
3. **Brand normalization (`Loom 21` → `Loom21`) applies to visible text and metadata only.** Never change URLs, handles, asset paths, or `loom21doc`.
4. **Follow the SEO pattern in `CLAUDE.md`** for any new route: title, description, OG, LD-JSON, breadcrumb, and a sitemap entry in `scripts/generate-sitemap.js`.
5. **Keep `ChangeDetectionStrategy.OnPush` and signals.** Prefer `computed()` over manual state.
6. **Legal pages are scaffolded with `noindex` and are not linked** until Svetlan approves them.
7. **Don't edit `src/sitemap.xml` by hand.** It's generated.
8. **BG wording convention:** use "Биткойн" in prose (this is already the majority usage in `messages.bg.xlf`). Use "Bitcoin" only in product or processor names. Write "он-чейн" for on-chain, and leave "Lightning" untranslated.

---

## Phase 0 — Setup and baseline (no product edits)

```bash
git checkout -b website-v2-pricing-positioning
npm ci
npm run build                                # record warnings count as baseline
npx ng extract-i18n --output-path src/locale # refresh messages.xlf from source
git diff --stat src/locale/messages.xlf      # should be ~0 on a clean tree
```

**0.1 Find stale BG units.** `messages.xlf` has 328 units and `messages.bg.xlf` has 339. Write a tiny node script, `scripts/check-i18n.js`, that:
- lists ids in `messages.xlf` that are missing from `messages.bg.xlf`, and
- lists ids in BG that no longer exist in the source.

Commit the script; it's used again in Phase 7.

```js
// scripts/check-i18n.js
const fs = require('fs');
const ids = f => new Set([...fs.readFileSync(f, 'utf8').matchAll(/<trans-unit id="([^"]+)"/g)].map(m => m[1]));
const en = ids('src/locale/messages.xlf'), bg = ids('src/locale/messages.bg.xlf');
const missing = [...en].filter(i => !bg.has(i)), stale = [...bg].filter(i => !en.has(i));
console.log('Missing in BG:', missing.length, missing);
console.log('Stale in BG:', stale.length, stale);
process.exit(missing.length ? 1 : 0);
```

Add to `package.json` scripts: `"i18n:check": "node scripts/check-i18n.js"`.

**0.2 Ask the O1–O9 questions** (one message), and fill in the table above.

**Check:** `npm run build` passes; `npm run i18n:check` prints its report (stale units can be deleted now).

---

## Phase 1 — Pricing page rebuild (P0)

Commit: `feat(pricing): Free/Starter/Growth/Pro tiers, comparison table, cost calculator, pricing FAQ`

### 1.0 How pricing works today (context)

- `src/app/services/subscription-plan.service.ts` → `GET https://app.loom21.com/api/subscriptions/available-plans/` returns `SubscriptionType[]` with `type` ∈ `basic | small | mid` and `interval` ∈ `month | year | bitcoin`.
- `src/app/pricing/pricing.component.ts#setTexts()` hard-codes each tier's feature text keyed on `type`.
- The template renders `{{plan.amount / 100}}`, which produces "22.5". There is no Free card, no comparison table and no FAQ, and **the page is empty if the API fails**.
- `setTexts()` still converts `bgn` to `лв.`. **Bulgaria has used the euro since 1 Jan 2026**, so remove that branch.

### 1.1 New file: `src/app/constants/pricing-const.ts`

This file is the **display source of truth**. The API is used only to get the checkout `id` (and to cross-check prices in dev).

```ts
export type TierKey = 'free' | 'starter' | 'growth' | 'pro';
export type BillingMode = 'month' | 'year' | 'bitcoin';
export type ApiStatus = 'live' | 'early' | 'soon';

/** O1 — flip when the public API ships. */
export const API_STATUS: ApiStatus = 'soon';

/** Prices in euro cents, per month. Must match Stripe prices in the app repo. */
export const TIER_PRICES: Record<TierKey, Record<BillingMode, number>> = {
  free:    { month: 0,     year: 0,     bitcoin: 0 },
  starter: { month: 2900,  year: 2400,  bitcoin: 2160 },
  growth:  { month: 7900,  year: 6600,  bitcoin: 5940 },
  pro:     { month: 17900, year: 14900, bitcoin: 13410 },
};

/** Maps backend plan `type` codes to tiers. Old codes are intentionally NOT mapped
 *  (their prices/features differ) — unknown codes are ignored. */
export const TIER_BY_API_TYPE: Record<string, TierKey> = {
  starter: 'starter', growth: 'growth', pro: 'pro',
};

export const ANNUAL_BADGE = $localize`:Annual billing badge@@pricingAnnualBadge:2 months free`;
export const BITCOIN_BADGE = $localize`:Bitcoin billing badge@@pricingBitcoinBadge:Save 25%`;

export interface TierDef {
  key: TierKey;
  name: string;
  tagline: string;
  highlight?: boolean;
  bullets: string[];
  cta: string;
}

const apiLine = (full: boolean): string => {
  if (!full) return $localize`:API read-only@@pricingApiReadOnly:Read-only API`;
  return API_STATUS === 'live'
    ? $localize`:API full live@@pricingApiFull:Full API + webhooks`
    : $localize`:API full soon@@pricingApiFullSoon:Full API + webhooks (coming soon)`;
};

export const TIERS: TierDef[] = [
  {
    key: 'free',
    name: $localize`:Free plan name@@planFreeName:Free`,
    tagline: $localize`:Free plan tagline@@planFreeTagline:Get paid in Bitcoin today. Free forever.`,
    bullets: [
      $localize`:Free users@@planFreeUsers:1 user`,
      $localize`:Free stores@@planFreeStores:1 store location`,
      $localize`:Free orders@@planFreeOrders:50 orders / month`,
      $localize`:All payment rails@@planAllRails:Bitcoin (Lightning & on-chain) + cards`,
      $localize`:Zero fee bullet@@planZeroFee:0% Loom21 transaction fee`,
      apiLine(false),
    ],
    cta: $localize`:Free plan CTA@@planFreeCta:Start free`,
  },
  {
    key: 'starter',
    name: $localize`:Starter plan name@@planStarterName:Starter`,
    tagline: $localize`:Starter plan tagline@@planStarterTagline:For a single shop with a small team.`,
    bullets: [
      $localize`:Starter users@@planStarterUsers:3 users`,
      $localize`:Starter stores@@planStarterStores:2 store locations`,
      $localize`:Starter orders@@planStarterOrders:1,000 orders / month`,
      $localize`:All payment rails@@planAllRails:Bitcoin (Lightning & on-chain) + cards`,
      $localize`:Zero fee bullet@@planZeroFee:0% Loom21 transaction fee`,
      apiLine(false),
    ],
    cta: $localize`:Choose plan button@@choosePlan:Choose Plan`,
  },
  {
    key: 'growth',
    name: $localize`:Growth plan name@@planGrowthName:Growth`,
    tagline: $localize`:Growth plan tagline@@planGrowthTagline:Multi-store teams. No per-seat fees.`,
    highlight: true,
    bullets: [
      $localize`:Unlimited users@@planUnlimitedUsers:Unlimited users`,
      $localize`:Growth stores@@planGrowthStores:5 store locations`,
      $localize`:Growth orders@@planGrowthOrders:5,000 orders / month`,
      $localize`:User access rights@@userAccessRights:User Access Rights`,
      $localize`:Zero fee bullet@@planZeroFee:0% Loom21 transaction fee`,
      apiLine(true),
    ],
    cta: $localize`:Choose plan button@@choosePlan:Choose Plan`,
  },
  {
    key: 'pro',
    name: $localize`:Pro plan name@@planProName:Pro`,
    tagline: $localize`:Pro plan tagline@@planProTagline:High volume, many locations.`,
    bullets: [
      $localize`:Unlimited users@@planUnlimitedUsers:Unlimited users`,
      $localize`:Pro stores@@planProStores:25 store locations`,
      $localize`:Pro orders@@planProOrders:25,000 orders / month`,
      $localize`:User access rights@@userAccessRights:User Access Rights`,
      $localize`:Onboarding call@@planOnboardingCall:Priority support + onboarding call`,
      apiLine(true),
    ],
    cta: $localize`:Choose plan button@@choosePlan:Choose Plan`,
  },
];

/** Comparison table. `true` → ✓, `false` → —, string → shown as-is. Order: free, starter, growth, pro. */
export interface CompareRow { label: string; values: (boolean | string)[]; }

const UNL = $localize`:Unlimited short@@unlimitedShort:Unlimited`;
export const COMPARE_ROWS: CompareRow[] = [
  { label: $localize`:Cmp users@@cmpUsers:Users`, values: ['1', '3', UNL, UNL] },
  { label: $localize`:Cmp stores@@cmpStores:Store locations`, values: ['1', '2', '5', '25'] },
  { label: $localize`:Cmp orders@@cmpOrders:Orders / month`, values: ['50', '1,000', '5,000', '25,000'] },
  { label: $localize`:Cmp links@@cmpLinks:Payment links`, values: [UNL, UNL, UNL, UNL] },
  { label: $localize`:Cmp btc@@cmpBitcoin:Bitcoin — Lightning & on-chain`, values: [true, true, true, true] },
  { label: $localize`:Cmp cards@@cmpCards:Card payments (Stripe)`, values: [true, true, true, true] },
  { label: $localize`:Cmp fee@@cmpFee:Loom21 transaction fee`, values: ['0%', '0%', '0%', '0%'] },
  { label: $localize`:Cmp export@@cmpExport:CSV / JSON import & export`, values: [true, true, true, true] },
  { label: $localize`:Cmp pricing@@cmpPriceLists:Price lists, tiers & custom fields`, values: [true, true, true, true] },
  { label: $localize`:Cmp barcodes@@cmpBarcodes:Barcodes, QR codes & PDF documents`, values: [true, true, true, true] },
  { label: $localize`:Cmp roles@@cmpRoles:User roles & access rights`, values: [false, false, true, true] },
  { label: $localize`:Cmp api@@cmpApi:API`, values: [
      $localize`:Cmp api ro@@cmpApiRo:Read-only`, $localize`:Cmp api ro@@cmpApiRo:Read-only`,
      $localize`:Cmp api full@@cmpApiFull:Full + webhooks`, $localize`:Cmp api full@@cmpApiFull:Full + webhooks`] },
  { label: $localize`:Cmp support@@cmpSupport:Support`, values: [
      $localize`:Sup community@@supCommunity:Community`, $localize`:Sup email@@supEmail:Email`,
      $localize`:Sup priority@@supPriority:Priority email`, $localize`:Sup onboarding@@supOnboarding:Priority + onboarding`] },
];

export const PRICING_FAQ = [
  { q: $localize`:Pricing FAQ q1@@pfaqQ1:Do you take a cut of my sales?`,
    a: $localize`:Pricing FAQ a1@@pfaqA1:No. Loom21 charges 0% on every payment — Bitcoin and card. You only pay your plan, plus your payment processor's own fees (for example Stripe's card fees, or Lightning network fees).` },
  { q: $localize`:Pricing FAQ q2@@pfaqQ2:What happens if I go over my monthly orders?`,
    a: $localize`:Pricing FAQ a2@@pfaqA2:Nothing breaks and you can always get paid. We notify you at 80% and 100% of your limit and give you a one-month grace period before suggesting an upgrade.` },
  { q: $localize`:Pricing FAQ q3@@pfaqQ3:How does paying for Loom21 in Bitcoin work?`,
    a: $localize`:Pricing FAQ a3@@pfaqA3:Choose the Bitcoin option and pay for a year upfront over Lightning or on-chain. You save about 25% compared with monthly card billing.` },
  { q: $localize`:Pricing FAQ q4@@pfaqQ4:Can I switch plans or cancel anytime?`,
    a: $localize`:Pricing FAQ a4@@pfaqA4:Yes. Upgrade or downgrade from Settings → Subscription. If you cancel, your plan stays active until the end of the period you paid for, and you can export all your data at any time.` }, // O9
  { q: $localize`:Pricing FAQ q5@@pfaqQ5:Is the Free plan really free forever?`,
    a: $localize`:Pricing FAQ a5@@pfaqA5:Yes — no credit card and no time limit. It includes Bitcoin and card payments, inventory for one store and up to 50 orders a month.` },
];

/** O7 — "What you really pay" calculator. Keep sources next to the numbers. */
export const CALC = {
  defaultMonthlyVolume: 20000,     // EUR
  defaultAvgOrder: 40,             // EUR
  cardPct: 0.029, cardFixed: 0.30, // typical online card pricing, e.g. Square online 2.9% + 30¢ (squareup.com/help/ie/article/6357)
  lightningPct: 0.01,              // conservative hosted-wallet estimate; self-hosted BTCPay is often near zero
};
```

> Note on duplicated ids: `@@planAllRails`, `@@planZeroFee`, `@@planUnlimitedUsers`, `@@choosePlan`, `@@userAccessRights`, `@@cmpApiRo`, `@@cmpApiFull` are deliberately reused with **identical text**. Angular accepts this because the source text is the same. Never reuse an id with different text.

### 1.2 `src/app/services/subscription-plan.service.ts`

Keep the HTTP call. Make `type` and `interval` typed, and drop the UI text fields from the interface (they move to the constants file):

```ts
export interface SubscriptionType {
  id: number;
  productId: string;
  productName: string;
  priceId: string;
  interval: 'month' | 'year' | 'bitcoin' | 'single' | string;
  amount: number;   // cents
  currency: string; // 'eur'
  type: string;     // 'starter' | 'growth' | 'pro' (new) — old codes ignored
}
```

Update `subscription-plan.service.spec.ts` if it references the removed fields.

### 1.3 Rewrite `src/app/pricing/pricing.component.ts`

Key behaviour:
- `billing = signal<BillingMode>('year')`.
- `apiPlans = signal<SubscriptionType[]>([])`, loaded as before. **If the load fails, keep rendering from the constants.** Only the paid "Choose plan" buttons fall back to the signup URL. Remove the `hasError` empty state; replace it with a small inline notice: "Checkout is temporarily unavailable — start free and upgrade from Settings."
- `cards = computed(...)` merges `TIERS` with the `TIER_PRICES[key][billing()]` price and the matching `apiPlans()` entry (by `TIER_BY_API_TYPE[p.type] === key && p.interval === billing()`).
- In dev mode, `console.warn` if an API amount ≠ the `TIER_PRICES` value (this catches Stripe drift). No console output in prod; this also clears the `CLAUDE.md` "Remaining Improvements" item for pricing.
- **Delete** `setTexts()`, the `bgn → лв.` branch, the onboarding-fee signals, and the commented-out onboarding code in both the `.ts` and `.html` files.

```ts
formatPrice(cents: number): string {
  const whole = cents % 100 === 0;
  return new Intl.NumberFormat(this.localeId === 'bg' ? 'bg-BG' : 'en-IE', {
    style: 'currency', currency: 'EUR',
    minimumFractionDigits: whole ? 0 : 2, maximumFractionDigits: 2,
  }).format(cents / 100);
}
// en → "€24", "€21.60"; bg → "24 €", "21,60 €"

periodLabel(key: TierKey): string {
  if (key === 'free') return $localize`:Forever@@pricingForever:forever`;
  return this.billing() === 'month'
    ? $localize`:Per month@@perMonth:per month`
    : $localize`:Billed annually@@billedAnnually:per month (billed annually)`;
}

private appBase(): string {
  if (isDevMode()) return 'https://localhost:44412/';
  return this.localeId === 'bg' ? 'https://app.loom21.com/bg/' : 'https://app.loom21.com/en-US/';
}

onSelect(card: { key: TierKey; apiId?: number }): void {
  const base = this.appBase();
  const url = card.key === 'free' || !card.apiId ? `${base}signup/` : `${base}plans/${card.apiId}`;
  window.open(url, '_blank', 'noopener');
}
```

Calculator state (no forms module needed, just signals):

```ts
volume = signal(CALC.defaultMonthlyVolume);
avgOrder = signal(CALC.defaultAvgOrder);
cardFees = computed(() => this.volume() * CALC.cardPct + (this.volume() / Math.max(this.avgOrder(), 1)) * CALC.cardFixed);
lightningFees = computed(() => this.volume() * CALC.lightningPct);
yearlySaving = computed(() => (this.cardFees() - this.lightningFees()) * 12);
```

### 1.4 Rewrite `src/app/pricing/pricing.component.html`

Structure, top to bottom:

1. **H1 + subhead**
   - H1 `@@pricingH1`: "Simple pricing. 0% of your sales."
   - Sub `@@pricingSub`: "Start free forever. Upgrade when you grow. Loom21 never takes a cut of your Bitcoin or card payments."
2. **Billing toggle.** Keep the existing radio `btn-group` markup with `[ngModel]`, three options:
   - MONTHLY
   - ANNUAL, with badge `{{ANNUAL_BADGE}}`
   - BITCOIN, with badge `{{BITCOIN_BADGE}}` and a `fa-bitcoin` icon
   - Replace the hard-coded `-10%` / `-15%` badges.
3. **Cards row**: `@for (card of cards(); track card.key)`, 4 cards.
   - Growth gets the `.pricing-plan--highlight` class and a "Most popular" ribbon (`@@pricingMostPopular`).
   - Each card shows:
     - name and tagline
     - `formatPrice(card.price)` + `periodLabel(card.key)`
     - when `billing()==='month'` and the plan is paid, a small line: "or {{formatPrice(btcPrice)}} /mo paying in Bitcoin" (`@@pricingBtcHint`)
     - bullets
     - CTA button
   - Add `id="plan-{{card.key}}"` so the structured-data URLs resolve.
4. **Custom plan card.** Keep it, and change the copy to: "Need more stores, orders or an SLA? Custom plans with unlimited users and dedicated support." (`@@personalizedQuote`).
5. **Comparison table** (`@@pricingCompareTitle`: "Compare plans"):
   - `<table class="table compare-table">`
   - Header cells come from `TIERS`; rows come from `COMPARE_ROWS`.
   - Render `true` → `<i class="fa fa-check" aria-hidden="true"></i><span class="visually-hidden">Yes</span>`, `false` → `—`.
   - Wrap it in `.table-responsive` for mobile.
6. **"What you really pay" calculator** (`@@pricingCalcTitle`):
   - Two `<input type="number">` fields: monthly card sales (€) and average order (€).
   - Three results: estimated card fees per month, estimated Lightning fees per month, yearly difference.
   - Then a fixed line in bold: "Loom21 fee on either: €0".
   - Disclaimer `@@pricingCalcDisclaimer`: "Estimates only. Card fees based on typical online card pricing (2.9% + €0.30); Lightning fees vary by wallet and route. Loom21 itself charges 0% on every payment."
7. **Pricing FAQ.** Reuse the Bootstrap accordion markup from `src/app/faq/faq.component.html`, looping over `PRICING_FAQ`.

### 1.5 `src/app/pricing/pricing.component.scss`

- Replace the `.card-group` layout with a responsive grid: `display:grid; grid-template-columns:repeat(auto-fit,minmax(230px,1fr)); gap:1rem`.
- `.pricing-plan--highlight`: border `2px solid #1e88e5`, a slight raise, and the ribbon.
- `.btn-group`: change `max-width` from 300px to 480px (it now has 3 badged buttons).
- `.compare-table`: zebra rows; make the first column sticky on mobile.
- Delete the `.onboarding-section` styles.

### 1.6 Structured data (same component)

`updateStructuredData()` uses the constants, so it works even when the API is down:

```ts
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Loom21',
  description: LD_JSON.pricing_description,
  offers: this.cards().map(c => ({
    '@type': 'Offer',
    name: c.name,
    price: (c.price / 100).toFixed(2),
    priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock',
    url: `https://loom21.com/${this.localeId}/pricing/#plan-${c.key}`,
  })),
};
```

Call it from `ngOnInit` (with constants) and again after the API loads.

### 1.7 Meta (`src/app/constants/localized-const.ts`)

- `TITLES.pricing` → `Pricing — Free plan, 0% transaction fees | Loom21`
- `DESCRIPTIONS.pricing_description` → `Free forever plan, then from €24/month. Accept Bitcoin and cards with 0% Loom21 transaction fees, unlimited users from Growth, and full data export.`
- `LD_JSON.pricing_description` → `Loom21 plans: Free, Starter, Growth and Pro — Bitcoin and card payments with 0% platform fees.`

### 1.8 Backend / Stripe checklist (app repo — NOT this repo; hand to Svetlan)

Claude Code writes this checklist into the PR description; it doesn't implement it here.

- [ ] Create Stripe products and prices for Starter, Growth and Pro (monthly + annual, EUR) matching `TIER_PRICES`.
- [ ] Bitcoin annual prices: €259.20 / €712.80 / €1,609.20 per year.
- [ ] `available-plans` returns the new `type` codes `starter|growth|pro` with intervals `month|year|bitcoin`.
- [ ] A **Free plan is provisioned automatically at signup** (no Stripe subscription).
- [ ] Enforce limits:
  - orders **per month** (was per year)
  - stores
  - users: 1 / 3 / unlimited
  - roles gated to Growth+
  - read-only API on all plans
- [ ] Soft-limit behaviour (L6):
  - notify at 80% and 100%
  - 1-month grace period
  - **never block payment links or checkout**
- [ ] Retire the old plans (`basic`/`small`/`mid`): there are no subscribers on them (O2). Confirm that in the DB, stop returning them from `available-plans`, and archive their Stripe prices.
- [ ] Fix `currency` padding on Bitcoin rows (`"eur       "` → `"eur"`).
- [ ] Confirm the `signup/` route exists for `en-US` and `bg` (Free card and paid-plan fallback link there).
- [ ] The app's Settings → Subscription plan picker shows the same matrix.
- [ ] `plans/{id}` route works for the new ids.

**Check (Phase 1):**
```bash
npm run build
rg -n "setTexts|onboardingFee|лв\." src/app/pricing   # → 0
rg -n "No API Access|Limited Access to API|store location\b|8 000 orders" src/app   # → 0
npm run i18n:check
```
- Manual: `/en/pricing` and `/bg/pricing`.
  - All three toggles work; prices match the matrix.
  - Free → signup; paid → `plans/{id}` or signup fallback.
  - Block `app.loom21.com` in devtools and confirm the page still renders.

---

## Phase 2 — Remove contradictions sitewide (P0)

Commit: `fix(site): align FAQ, roadmap and home with new plans`

### 2.1 FAQ — `src/app/constants/faq-const.ts`

| id | New EN text |
|---|---|
| `faqA1_2` | `Yes. The Free plan is free forever — no credit card required. It includes Bitcoin and card payments, inventory for one store and up to 50 orders a month. Upgrade any time from the Pricing page.` |
| `faqA3_1` | `Start on the Free plan, then upgrade to Starter, Growth or Pro as you grow. Pay monthly, annually (2 months free) or in Bitcoin (about 25% off). Loom21 never takes a percentage of your sales.` |
| `faqA6_2` | `It depends on your plan: 1 user on Free, 3 on Starter, and unlimited users on Growth and Pro — each with role-based access on Growth and above.` |

**New Q at the top of "Payments & Bitcoin"** (`faqQ2_0` / `faqA2_0`); insert it first in `FAQ_CATEGORIES[1].items`:
- Q: `Does Loom21 ever hold my money?`
- A: `No. Loom21 never takes custody of your funds. Bitcoin payments go straight to the wallet or server you connect — your BTCPay Server, Lightning Address (e.g. Glow), Speed Wallet account or LNbits wallet — and card payments go to your own Stripe account. Loom21 creates the invoice and tracks its status.`

> Accuracy note: Speed Wallet (and a third-party-hosted LNbits) are custodial *services*. So the copy says **Loom21** never holds funds; it doesn't claim the merchant's wallet is self-custodial. Keep this wording.

**New Q at the end of "Pricing & Price Lists"** (`faqQ3_5` / `faqA3_5`):
- Q: `Does Loom21 charge transaction fees?`
- A: `No — 0% on every payment method, including card payments through Stripe. You only pay your plan and your payment processor's own fees.`

FAQPage JSON-LD updates automatically, because `faq.component.ts` maps `FAQ_CATEGORIES`.

### 2.2 Roadmap — `src/app/constants/roadmap-const.ts`

- Remove the `// DRAFT CONTENT` header comment once Svetlan confirms the items. Also remove the matching note in `CLAUDE.md` ("Roadmap page content … draft copy").
- Rename `planned1`:
  - `Public API & Webhooks` → `Full API & Webhooks`
  - Desc: `Read and write access to your Loom21 data, plus event webhooks — included on Growth and Pro.`
  - If O1 = `early`, move it to In Progress.
- Add `shipped7`:
  - Title `Free Forever Plan`
  - Desc `Start selling with Bitcoin and card payments at no cost — 50 orders a month, no credit card.`
  - (Only once the backend free plan is live.)
- Add a "Last updated" line under the intro. New key `lastUpdated`: `Last updated: October 2026`. Render it in `roadmap.component.html` under `pageIntro`.

### 2.3 Home "Free to Start" card — `src/app/home/home.component.html`

- `@@statFreeDesc` → `Free forever plan — no credit card, no time limit. Upgrade only when you need more.`

**Check:**
```bash
rg -n "unlimited number of users" src/   # → 0
rg -n "billed monthly or yearly, with custom plans" src/   # → 0
```

---

## Phase 3 — Home positioning (P1)

Commit: `feat(home): pillar-led hero, six why-cards, integrations section`

File: `src/app/home/home.component.html` (+ `.ts`, `.scss`, `localized-const.ts`).

### 3.1 Hero

Keep the existing ids where possible, so BG `<target>`s are updated rather than re-created.

| id | EN | BG |
|---|---|---|
| `homeH2TopTitle` | Own your money. Own your data. Own your integrations. | Вашите пари. Вашите данни. Вашите интеграции. |
| `homeTopSubTitle` | Accept Bitcoin (Lightning & on-chain) and cards in one dashboard, keep stock in sync with every sale, and export everything, anytime. 0% Loom21 transaction fees. Free forever plan. | Приемайте Биткойн (Lightning и он-чейн) и карти в едно табло, поддържайте наличностите синхронизирани с всяка продажба и експортирайте всичко по всяко време. 0% такса от Loom21. Безплатен план завинаги. |
| `tryForFreeButton` | Start free | Започнете безплатно |
| *(new)* `heroTrustLine` | No credit card · Funds go straight to your wallet · Cancel anytime | Без кредитна карта · Средствата отиват директно във вашия портфейл · Без обвързване |

- Change the hero `<h2 class="title">` to `<h1 class="title">`. The home page currently has no H1, and the SEO fix keeps the same styling class.
- Add the trust line as `<p class="hero-trust small text-muted">` under the buttons.
- `home.component.ts`: leave `PROMO_VIDEO_ID` and its TODO; O6 decides it.

### 3.2 Features subheading

- `@@benefitsAndFeatures` → EN `Everything you need to sell, get paid and stay in stock`; BG `Всичко необходимо, за да продавате, да получавате плащания и да имате наличност`
- `@@getInvoiceNotification` (per O8, in-app default) → EN `See instantly when an invoice is paid`; BG `Виждайте веднага, когато фактура е платена`

### 3.3 "Why Loom21" → 6 cards

Grid `col-lg-4 col-md-6`. Reuse `.why-card`.

| # | icon | Title EN / BG | Body EN / BG |
|---|---|---|---|
| 1 | `fa-bitcoin` | Own your money / Вашите пари | Payments go straight to the wallet or Stripe account you connect. Loom21 never holds your funds. / Плащанията отиват директно в портфейла или Stripe акаунта, който свържете. Loom21 никога не държи средствата ви. |
| 2 | `fa-lock` | Own your data / Вашите данни | Import and export products, customers, suppliers and reports as CSV or JSON — any time. No lock-in. / Импортирайте и експортирайте продукти, клиенти, доставчици и отчети в CSV или JSON по всяко време. Без обвързване. |
| 3 | `fa-plug` | Own your integrations / Вашите интеграции | API_STATUS `live`: Connect your ERP, CRM or custom apps through the Loom21 API. — else: Stripe, BTCPay Server, Glow, Speed Wallet and LNbits today; open API coming soon. / `live`: Свържете вашата ERP, CRM или собствени приложения чрез API на Loom21. — else: Stripe, BTCPay Server, Glow, Speed Wallet и LNbits още днес; отворен API скоро. |
| 4 | `fa-percent` | 0% transaction fees / 0% такси за транзакции | You pay your plan. We take nothing from your sales — on Bitcoin or card. / Плащате абонамента си. Не взимаме нищо от продажбите ви — нито при Биткойн, нито при карти. |
| 5 | `fa-bolt` | Instant, final payments / Мигновени и окончателни плащания | Lightning payments settle in seconds and can't be charged back. / Lightning плащанията се уреждат за секунди и не подлежат на оспорване. |
| 6 | `fa-gift` | Free forever plan / Безплатен план завинаги | Start with 50 orders a month at no cost. No credit card required. / Започнете с 50 поръчки на месец без разходи. Без кредитна карта. |

- Reuse the ids `statBitcoin`/`statOwnership`/`statFree` for cards 1/2/6 (update their text).
- New ids: `statIntegrations*`, `statZeroFee*`, `statInstant*`.
- Card 3 picks its text from `API_STATUS`. Import it from `pricing-const.ts` and expose two `$localize` strings in `home.component.ts`.

### 3.4 Integrations section (new; insert after "Payments Made Simple")

- Move the **processor logo strip** in here. Delete the standalone strip further down.
- H2 `@@integrationsTitle`: `Works with the tools you already use` / `Работи с инструментите, които вече използвате`
- P `@@integrationsDesc`: `Connect Stripe for cards and BTCPay Server, Glow, Speed Wallet or LNbits for Bitcoin. Move data in and out with CSV and JSON.` / `Свържете Stripe за карти и BTCPay Server, Glow, Speed Wallet или LNbits за Биткойн. Пренасяйте данни с CSV и JSON.`
- **Glow logo consistency:** render it like the others. Use `<img src="assets/images/logos/glow-wallet-logo.png" alt="Glow">` and delete the `.glow-wordmark` span and its `.glow-logo-item` wrapper styles in `home.component.scss`. If the logo alone is unreadable, ask Svetlan for a wordmark asset rather than keeping text.
- If `API_STATUS !== 'live'`, add a small line: `Open API coming soon — tell us what you'd connect.` linking to `/contact`.

### 3.5 Payments section copy

- `@@sendPaymentLinksAnd`:
  - EN: replace "LNBits" with "LNbits", and append " — with 0% Loom21 fees."
  - **BG target is incomplete today.** Replace it with: `Изпращайте връзки за плащане с Биткойн Lightning, он-чейн Биткойн или карти — чрез Stripe, BTCPay Server, Lightning Wallet (Glow), Speed Wallet, LNbits и други — с 0% такса от Loom21.`

### 3.6 Home meta (`localized-const.ts`)

- `TITLES.home_title` → `Loom21 — Bitcoin & Card Payments with Real-Time Inventory`
- `DESCRIPTIONS.home_description` → `Accept Bitcoin (Lightning & on-chain) and cards with 0% Loom21 fees, keep inventory in sync with every sale, and export your data any time. Free forever plan.`
- `LD_JSON.home_description`: same meaning, short version.
- In `home.component.ts` `SoftwareApplication`:
  - set `"name": "Loom21"`
  - change `"operatingSystem"` to `"Web"` (there are no native apps yet; the roadmap lists them as planned)
  - add `"offers": { "@type": "AggregateOffer", "lowPrice": "0", "highPrice": "179", "priceCurrency": "EUR", "offerCount": 4 }`
  - add `"publisher": { "@type": "Organization", "name": "Loom21", "url": "https://loom21.com", "sameAs": ["https://x.com/loom21app", "https://github.com/loom21/loom21doc"] }`

**Check:**
```bash
npm run build
rg -n "Key benefits and platform features|glow-wordmark" src/   # → 0
```
- Manual check at 375 px width: 6 cards stack cleanly and the hero shows a single H1.

---

## Phase 4 — Consistency and polish (P2)

Commit: `chore(site): Loom21 naming, logo link, BG typos, LNbits casing, deps`

### 4.1 Brand name `Loom 21` → `Loom21`

Files, from `rg -n "Loom 21" src/app`:
- `services/og-meta.service.ts:17` — `siteName`
- `footer/footer.component.html:5` — h5; also the copyright link text
- `app.component.ts:41` — default title
- `home.component.ts`, `contact.component.ts`, `documentation.component.ts`, `privacy.component.ts`, `pricing.component.ts` — LD-JSON names (`'Loom 21 app'` → `'Loom21'`)
- `not-found.component.html:20`
- `localized-const.ts` — every ` - Loom 21` title suffix → ` | Loom21`, plus their BG targets in `messages.bg.xlf`
- `@@tryForFreeButton` already becomes "Start free" in Phase 3; also fix `@@loom21footer` casing
- `banner.component.html`: logo `alt="loom21"` → `alt="Loom21"`

Do **not** change `contact.component.ts:95` (`'loom21 contacted'`, an internal email subject), URLs or handles.

### 4.2 Header logo link — `banner.component.html:5`

`<a class="navbar-brand" href="#">` → `<a class="navbar-brand" routerLink="/">`. `RouterModule` is already imported, and the localized base href handles `/en/` vs `/bg/`.

### 4.3 BG fixes in `src/locale/messages.bg.xlf`

| Line (approx.) | Find | Replace |
|---|---|---|
| 1574 | `Особености` | `Функционалности` |
| 1601 | `цени на едно, дребно` | `цени на едро, дребно` |
| 1619 | `управлявление` | `управление` |
| 1646 | `Приемане на плащания с Bitcoin, Lightning, както и кредитни/дебитни карти` | `Приемане на плащания с Биткойн (Lightning и он-чейн), както и с кредитни/дебитни карти` |
| 1826 | `Lightning и Bitcoin on-chain` | `Lightning и он-чейн Биткойн` |

Also translate the old plan names only if they're still referenced after Phase 1. Otherwise delete their units (`entrepreneur`, `smallBusiness`, `midSize`, `oneUser`, … — `i18n:check` lists them as stale).

### 4.4 `LNBits` → `LNbits` (official casing)

```bash
rg -n "LNBits" src/ --glob '!*.png'
```
Change visible text only: FAQ, roadmap, home, and the logo `alt` text. Keep file names such as `lnbits-logo.png`.

### 4.5 Contact page — `contact.component.html`

- Under "We typically respond within one business day.", add `info [at] loom21 [dot] com` as a `mailto:` link (`@@contactEmailLabel`: "Or email us:" / "Или ни пишете:"), per O4.
- The honeypot is already correct (off-screen + `aria-hidden` + `tabindex=-1`). **No change.**
- Add `aria-hidden="true"` to the three `<i class="fa …">` icons in the community list.

### 4.6 Dependencies — `src/index.html`

The Bootstrap CSS is **5.0.2** while the JS bundle is **5.1.3**. Align both to 5.1.3 (CSS: `https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css`). Take the `integrity` value from the official Bootstrap 5.1 docs, or compute it with `curl -s URL | openssl dgst -sha384 -binary | openssl base64 -A`. Never paste a hash from memory. Then smoke-test the navbar dropdown, accordion and collapse.

### 4.7 Docs repo items (`loom21/loom21doc`, separate PR — list them in this PR's description)

- `README.md` → Accounts: replace `You can invite an unlimited number of users to your organization.` with `The number of users you can invite depends on your plan — see [Pricing](https://loom21.com/en/pricing).` Do the same in `README-bg.md`.
- Payments section: narrow the "confirmed in real time" claim to BTCPay Server, Speed Wallet and LNbits, matching FAQ `faqA2_4`.
- Price lists: `Wholesale 2025` → `Wholesale 2026`.
- Glow screenshot: `images/misty-breez.png` → re-shoot it with the Glow branding and rename it `glow-wallet.png`.
- Header link `Explore the docs »` → `View on GitHub »`.
- Contact section: add Telegram and `https://loom21.com/en/contact`.
- Subscription section: mention the Free plan.
- `LNBits` → `LNbits`.

### 4.8 Docs page error state (from the `CLAUDE.md` Remaining Improvements)

In `documentation.component.html`, add `(error)="onDocsError()"` on `<markdown>` and show a fallback with a link to `https://github.com/loom21/loom21doc`. Then tick the item in `CLAUDE.md`.

**Check:**
```bash
rg -n "Loom 21" src/app   # → 0
rg -n "управлявление|на едно, дребно|Особености" src/locale   # → 0
rg -n "LNBits" src/app src/locale   # → 0 in visible text
npm run build
```

---

## Phase 5 — Legal (draft; don't link until approved)

Commit: `docs(site): terms scaffold (noindex) + privacy policy updates for review`

### 5.1 Terms of Service scaffold

- New component `src/app/terms/` (`terms.component.ts/html/scss`), plus `src/app/constants/terms-const.ts` following the `privacy-policy-const.ts` pattern.
- Route in `app.routes.ts`: `{ path: 'terms', component: TermsComponent }`, placed before `'**'`.
- Sections, each with a `TODO` body and an EN/BG title:
  1. Service
  2. Accounts
  3. Plans, billing & Bitcoin payments (soft limits, grace period)
  4. Acceptable use
  5. Your data & export
  6. Third-party payment processors (Loom21 is not a custodian)
  7. Fees: 0% Loom21 transaction fee
  8. Liability
  9. Termination
  10. Governing law: Republic of Bulgaria
  11. Contact
- In `ngOnInit`: `this.metaService.updateTag({ name: 'robots', content: 'noindex' })`. Remove the tag in `ngOnDestroy`.
- **Don't** add it to the footer or the sitemap yet. Leave a `// TODO(legal): link in footer + add to generate-sitemap.js after approval` comment.

### 5.2 Privacy policy — `src/app/constants/privacy-policy-const.ts` (+ BG targets)

Propose these as a diff; don't publish without approval.

- `section1Content1`: restore the entity identity using O4 (there is a commented-out address line in this file — confirm it's still correct). Add ЕИК and `info [at] loom21 [dot] com`.
- Section 5 (sharing): list the processors:
  - hosting (O5)
  - Stripe (card billing and merchants' card payments)
  - Simple Analytics (cookieless website analytics, loaded in `src/index.html`)
  - the email provider used by `email.service.ts` (Claude Code: identify it from that file)
  - a sentence saying Bitcoin payments go directly from the payer to the merchant-connected processor (BTCPay Server, Glow, Speed Wallet, LNbits), and Loom21 never takes custody
- Section 7 (retention): replace "7 years after account deletion" with `Invoices and records we are legally required to keep are retained for up to 7 years; all other account data is deleted within 30 days of account deletion, after you have had the chance to export it.` (Confirm the 30 days with Svetlan.)
- Add a short cookies line: `The website uses no tracking cookies; analytics are cookieless.` Verify this first: check `index.html` and the app for any cookies.
- `privacyPolicyLastUpdated` → the publish date.

**Check:** `/en/terms` renders with `<meta name="robots" content="noindex">`; `rg -n "terms" src/app/footer scripts/generate-sitemap.js` → 0.

---

## Phase 6 — SEO and technical (P3)

Commit: `chore(seo): drop keywords meta, per-page OG images hook, pricing breadcrumb`

1. **Keywords meta.** `src/app/app.component.ts:37` adds `TAGS.home_keywords` to every page. Remove the tag and the `TAGS` export. Search engines ignore it, and it's identical everywhere. Delete the `homeKeywords` unit from both XLF files.
2. **hreflang is already handled** by `canonical.service.ts` and the sitemap. **No change.** (The earlier audit item was a false positive.)
3. **OG image check.**
   ```bash
   curl -sI https://loom21.com/assets/images/form-banners/loom-app-laptop-mobile.png | head -1
   ```
   If it isn't 200, change `OgMetaService.defaultImage` to the `/en/assets/...` path.
4. **Per-page OG images.** `OgMetaService.setOgTags` already accepts `image`. Pass `image` for Pricing once a 1200×630 card exists. **Design task for Svetlan**; leave a TODO in `pricing.component.ts`.
5. **Sitemap.** No change until Terms is approved; then add `{ path: '/terms/', changefreq: 'yearly', priority: '0.3' }` to `mainPages`.

---

## Phase 7 — i18n completion and verification

Commit: `chore(i18n): complete BG translations, verification`

```bash
npx ng extract-i18n --output-path src/locale
npm run i18n:check      # must exit 0: every source id has a BG <target>
npm run build           # both locales; zero new i18nMissingTranslation warnings vs baseline
npm test -- --watch=false --browsers=ChromeHeadless
```

Fix any broken `*.spec.ts`; `pricing.component.spec.ts` is likely to need its provider mocks updated.

**Contradiction / quality greps** — each must return 0:
```bash
rg -in "crypto" src/
rg -n "unlimited number of users|No API Access|Limited Access to API|8 000 orders|store location\b" src/
rg -n "Loom 21" src/app
rg -n "управлявление|Особености" src/locale
rg -n "Key benefits and platform features" src/
```

**Manual walk-through, EN then BG** (`npm run dev-en:ssr` / `npm run dev-bg:ssr`):
1. **Home:**
   - single H1
   - 6 why-cards
   - integrations strip with a consistent Glow logo
   - "Watch Demo" plays
   - the logo links home
2. **Pricing:**
   - 3 toggles; prices match the §0 matrix in both the `€24` and `24 €` formats
   - Free → signup
   - comparison table scrolls on mobile
   - the calculator updates live
   - FAQ accordion works
   - the page works with the API blocked
3. **FAQ:** the new custody and fee questions appear, and the JSON-LD validates (Rich Results Test, or copy the `<script type="application/ld+json">` into validator.schema.org).
4. **Roadmap:** "Last updated" line shows.
5. **Contact:** the email link works; a test submission succeeds.
6. **Privacy:** changes are visible locally. **Terms:** renders with noindex and is unlinked.

**Lighthouse** on `/en/` and `/en/pricing`: record SEO, Accessibility and Performance before and after in the PR.

**PR description must include:**
- What changed, per phase.
- The §1.8 backend/Stripe checklist.
- The §4.7 docs-repo checklist.
- Open items: O-answers still TODO, legal review, Glow screenshot, Pricing OG image, promo video ID.
- **Deploy order:**
  1. Backend plans + free plan + Stripe prices.
  2. This website PR.
  3. Docs repo PR.
  4. Announce.

---

## Deploy sequencing note

The website can ship **before** the backend because of the static fallback in §1.3, with one exception: the Free card's promise ("Free forever, 50 orders/month") **must not go live until signup actually provisions the Free plan**.

If the backend isn't ready, there are two options:
- **Preferred:** finish Phase 1 on the branch but merge it last, together with the Phase 2 FAQ/home "Free forever" copy.
- **Alternative:** ship Phases 3–7 first, and keep the Phase 1 + 2.1 + 2.3 commits on a separate branch `pricing-v2` until the backend is live. In that case, also hold back the "Free forever plan" wording in the 3.1 hero subtitle and in why-card 6. Use "Free to start" until then.

Don't add a runtime feature flag. Two parallel pricing implementations would double the i18n surface.
