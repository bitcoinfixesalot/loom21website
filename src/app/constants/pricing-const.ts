import { API_STATUS } from './product-const';

export { API_STATUS } from './product-const';

export type TierKey = 'free' | 'starter' | 'growth' | 'pro';
export type BillingMode = 'month' | 'year' | 'bitcoin';

/** Prices in euro cents, per month. Must match Stripe prices in the app repo. */
export const TIER_PRICES: Record<TierKey, Record<BillingMode, number>> = {
  free:    { month: 0,     year: 0,     bitcoin: 0 },
  starter: { month: 2900,  year: 2400,  bitcoin: 2160 },
  growth:  { month: 7900,  year: 6600,  bitcoin: 5940 },
  pro:     { month: 17900, year: 14900, bitcoin: 13410 },
};

/** Maps backend plan `type` codes to tiers. Old codes (basic/small/mid) are intentionally NOT mapped
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

const CHOOSE_PLAN = $localize`:Choose plan button@@pricingChoosePlan:Choose plan`;
const ALL_RAILS = $localize`:All payment rails@@planAllRails:Bitcoin (Lightning & on-chain) + cards`;
const ZERO_FEE = $localize`:Zero fee bullet@@planZeroFee:0% Loom21 transaction fee`;
const UNLIMITED_USERS = $localize`:Unlimited users@@planUnlimitedUsers:Unlimited users`;
const ACCESS_RIGHTS = $localize`:User access rights@@planUserAccessRights:User roles & access rights`;

export const TIERS: TierDef[] = [
  {
    key: 'free',
    name: $localize`:Free plan name@@planFreeName:Free`,
    tagline: $localize`:Free plan tagline@@planFreeTagline:Get paid in Bitcoin today. Free forever.`,
    bullets: [
      $localize`:Free users@@planFreeUsers:1 user`,
      $localize`:Free stores@@planFreeStores:1 store location`,
      $localize`:Free orders@@planFreeOrders:50 orders / month`,
      ALL_RAILS,
      ZERO_FEE,
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
      ALL_RAILS,
      ZERO_FEE,
      apiLine(false),
    ],
    cta: CHOOSE_PLAN,
  },
  {
    key: 'growth',
    name: $localize`:Growth plan name@@planGrowthName:Growth`,
    tagline: $localize`:Growth plan tagline@@planGrowthTagline:Multi-store teams. No per-seat fees.`,
    highlight: true,
    bullets: [
      UNLIMITED_USERS,
      $localize`:Growth stores@@planGrowthStores:5 store locations`,
      $localize`:Growth orders@@planGrowthOrders:5,000 orders / month`,
      ACCESS_RIGHTS,
      ZERO_FEE,
      apiLine(true),
    ],
    cta: CHOOSE_PLAN,
  },
  {
    key: 'pro',
    name: $localize`:Pro plan name@@planProName:Pro`,
    tagline: $localize`:Pro plan tagline@@planProTagline:High volume, many locations.`,
    bullets: [
      UNLIMITED_USERS,
      $localize`:Pro stores@@planProStores:25 store locations`,
      $localize`:Pro orders@@planProOrders:25,000 orders / month`,
      ACCESS_RIGHTS,
      $localize`:Onboarding call@@planOnboardingCall:Priority support + onboarding call`,
      apiLine(true),
    ],
    cta: CHOOSE_PLAN,
  },
];

/** Comparison table. `true` → ✓, `false` → —, number → locale-formatted, string → shown as-is. Order: free, starter, growth, pro. */
export type CompareValue = boolean | number | string;
export interface CompareRow { label: string; values: CompareValue[]; }

const UNL = $localize`:Unlimited short@@unlimitedShort:Unlimited`;
const API_RO = $localize`:Cmp api ro@@cmpApiRo:Read-only`;
const API_FULL = API_STATUS === 'live'
  ? $localize`:Cmp api full@@cmpApiFull:Full + webhooks`
  : $localize`:Cmp api full soon@@cmpApiFullSoon:Full + webhooks (soon)`;

export const COMPARE_ROWS: CompareRow[] = [
  { label: $localize`:Cmp users@@cmpUsers:Users`, values: [1, 3, UNL, UNL] },
  { label: $localize`:Cmp stores@@cmpStores:Store locations`, values: [1, 2, 5, 25] },
  { label: $localize`:Cmp orders@@cmpOrders:Orders / month`, values: [50, 1000, 5000, 25000] },
  { label: $localize`:Cmp links@@cmpLinks:Payment links`, values: [UNL, UNL, UNL, UNL] },
  { label: $localize`:Cmp btc@@cmpBitcoin:Bitcoin — Lightning & on-chain`, values: [true, true, true, true] },
  { label: $localize`:Cmp cards@@cmpCards:Card payments (Stripe)`, values: [true, true, true, true] },
  { label: $localize`:Cmp fee@@cmpFee:Loom21 transaction fee`, values: ['0%', '0%', '0%', '0%'] },
  { label: $localize`:Cmp export@@cmpExport:CSV / JSON import & export`, values: [true, true, true, true] },
  { label: $localize`:Cmp pricing@@cmpPriceLists:Price lists, tiers & custom fields`, values: [true, true, true, true] },
  { label: $localize`:Cmp barcodes@@cmpBarcodes:Barcodes, QR codes & PDF documents`, values: [true, true, true, true] },
  { label: $localize`:Cmp roles@@cmpRoles:User roles & access rights`, values: [false, false, true, true] },
  { label: $localize`:Cmp api@@cmpApi:API`, values: [API_RO, API_RO, API_FULL, API_FULL] },
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
  // O9: cancel anytime, runs to end of paid period, no partial refunds
  { q: $localize`:Pricing FAQ q4@@pfaqQ4:Can I switch plans or cancel anytime?`,
    a: $localize`:Pricing FAQ a4@@pfaqA4:Yes. Upgrade or downgrade from Settings → Subscription. If you cancel, your plan stays active until the end of the period you paid for; partial periods are not refunded. You can export all your data at any time.` },
  { q: $localize`:Pricing FAQ q5@@pfaqQ5:Is the Free plan really free forever?`,
    a: $localize`:Pricing FAQ a5@@pfaqA5:Yes — no credit card and no time limit. It includes Bitcoin and card payments, inventory for one store and up to 50 orders a month.` },
];
