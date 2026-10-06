# Privacy Policy — proposed changes (for review, not published)

Implements plan §5.2 as a proposal. Nothing here is live: `src/app/constants/privacy-policy-const.ts` is unchanged.
After approval, apply each change to the constant and its BG `<target>` in `src/locale/messages.bg.xlf`, then run `npm run i18n:check`.

Open inputs (from the plan's O-table): **O4** registered address + ЕИК, **O5** hosting provider(s), **O10** email provider used by the app backend for the contact form (`app.loom21.com/api/Users/ContactUs`), and confirm the **30-day** deletion window.

---

## `section1Content1` — restore the entity identity (O4)

The address that's currently commented out is `Tvarditsa, Aleko Konstantinov 11 str.` — confirm it's still correct.

> We are Loom21 LTD, ЕИК `[TODO]`, registered at `[TODO address]`. For the purposes of GDPR, we are the "Data Controller" responsible for the personal data we collect and process through the Service. You can reach us at info@loom21.com.

Also uncomment `section1Address` / `section14Address` (their BG units are still in `messages.bg.xlf`) once the address is confirmed.

## Section 5 — name the processors

Replace `section5Item1` with a list:

- **Hosting:** `[TODO O5 — e.g. provider, region]` hosts the Service and its databases.
- **Stripe, Inc.:** processes card payments, both for your Loom21 subscription and for card payments you accept from your customers through your own Stripe account. ([Stripe Privacy Policy](https://stripe.com/privacy))
- **Simple Analytics:** cookieless, privacy-first website analytics on loom21.com. It doesn't collect personal data or use cookies.
- **Email delivery:** `[TODO O10]` delivers transactional emails and contact-form messages.
- **Bitcoin payments:** go directly from the payer to the processor the merchant connects (BTCPay Server, Glow, Speed Wallet or LNbits). Loom21 creates the invoice and tracks its status, and never takes custody of the funds.

> All service providers are contractually obligated to protect your data and comply with applicable data protection laws, including GDPR.

## `section7Item1` — retention

Current: "Account data is retained while your account is active and for 7 years after account deletion …"

Proposed:

> Invoices and records we are legally required to keep are retained for up to 7 years; all other account data is deleted within 30 days of account deletion, after you have had the chance to export it.

(Confirm the 30 days with the backend.)

## New: cookies line (add to section 2b or as a new short section)

> The loom21.com website uses no tracking cookies; analytics are cookieless.

What I verified in this repo: the site code sets no cookies and no local/session storage, and Simple Analytics is cookieless. **Two caveats to decide on:**

1. **Google Fonts** (`fonts.googleapis.com`, Material Icons + Montserrat) is loaded from Google's CDN, which sends the visitor's IP address to Google. Either self-host the fonts, or name Google as a recipient here.
2. **The promo video** uses `youtube-nocookie.com` and loads only after the visitor clicks "Watch Demo". After that click, YouTube may store data in the browser. Suggested addition: "If you choose to play the demo video, it is served by YouTube (privacy-enhanced mode), which may store data in your browser."

This line covers only the marketing website. `app.loom21.com` (login session) needs its own check in the app repo.

## `privacyPolicyLastUpdated`

Set to the publish date when this is applied.
