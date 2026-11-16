// Buy button landing page (/buy-button). Positioning: a checkout for any merchant, cards and Bitcoin together.
// Never present it as Bitcoin-only and never use the word "crypto".

// Embed snippet shown on the page. Not translated; placeholder key only, never a real one.
export const BUY_BUTTON_SNIPPET = `<script src="https://app.loom21.com/embed/buy-button/v1/buy-button.js" defer></script>

<loom21-buy-button
  key="l21_pk_live_YOUR_KEY"
  product="your-product">
</loom21-buy-button>`;

export const BUY_BUTTON_GITHUB_URL = 'https://github.com/loom21/loom21-buy-button';
export const BUY_BUTTON_UTM = 'utm_source=website&utm_medium=landing&utm_campaign=buy_button';

export const BUY_BUTTON_CONSTANTS = {
  eyebrow: $localize`:Buy button page eyebrow@@buyButtonEyebrow:Buy button`,
  heroTitle: $localize`:Buy button hero title@@buyButtonHeroTitle:Accept cards and Bitcoin on any website with one line of code`,
  heroSub: $localize`:Buy button hero subtitle@@buyButtonHeroSub:Customers pay by card or with Bitcoin over Lightning. The money goes straight to your own Stripe account or Bitcoin wallet, stock updates the moment it's paid, and Loom21 takes 0% of every sale.`,
  github: $localize`:Buy button GitHub button@@buyButtonGithub:View on GitHub`,

  snippetTitle: $localize`:Buy button snippet title@@buyButtonSnippetTitle:Add it to your page`,
  snippetCaption: $localize`:Buy button snippet caption@@buyButtonSnippetCaption:Paste it where you want the button. That's the whole setup.`,
  snippetNote: $localize`:Buy button snippet note@@buyButtonSnippetNote:Replace the key and product with the ones from your product's Embed dialog in Loom21.`,
  snippetLabel: $localize`:Buy button snippet aria label@@buyButtonSnippetLabel:Buy button embed code`,
  copy: $localize`:Buy button copy code button@@buyButtonCopy:Copy`,
  copied: $localize`:Buy button code copied@@buyButtonCopied:Copied`,
  copyFailed: $localize`:Buy button copy failed@@buyButtonCopyFailed:Copy failed. Select the code and copy it manually.`,

  howTitle: $localize`:Buy button how it works title@@buyButtonHowTitle:How it works`,

  methodsTitle: $localize`:Buy button payment methods title@@buyButtonMethodsTitle:Payment methods`,
  methodsNote: $localize`:Buy button payment methods note@@buyButtonMethodsNote:Turn on only the methods you want.`,
  feesNote: $localize`:Buy button fees note@@buyButtonFeesNote:Loom21 takes 0% on every payment method, cards included. Stripe still charges its own card processing fees.`,

  benefitsTitle: $localize`:Buy button benefits title@@buyButtonBenefitsTitle:What stays yours`,

  worksWithTitle: $localize`:Buy button works with title@@buyButtonWorksWithTitle:Works with`,
  worksWithNote: $localize`:Buy button works with note@@buyButtonWorksWithNote:Any site where you can add an HTML or embed block.`,

  faqTitle: $localize`:Buy button FAQ title@@buyButtonFaqTitle:Buy button questions`,

  ctaTitle: $localize`:Buy button closing CTA title@@buyButtonCtaTitle:Add a Buy button to your site`,
  ctaSub: $localize`:Buy button closing CTA text@@buyButtonCtaSub:Included on every plan, Free included. 0% Loom21 fees on every sale.`,
};

export interface TitledItem { title: string; description: string; }
export interface IconItem extends TitledItem { icon: string; }

export const BUY_BUTTON_STEPS: TitledItem[] = [
  {
    title: $localize`:Buy button step 1 title@@buyButtonStep1Title:Add your product`,
    description: $localize`:Buy button step 1 description@@buyButtonStep1Desc:Add your product in Loom21 and connect Stripe, a Bitcoin wallet, or both.`,
  },
  {
    title: $localize`:Buy button step 2 title@@buyButtonStep2Title:Copy the snippet`,
    description: $localize`:Buy button step 2 description@@buyButtonStep2Desc:Copy the snippet from the product's Embed dialog.`,
  },
  {
    title: $localize`:Buy button step 3 title@@buyButtonStep3Title:Paste it into your site`,
    description: $localize`:Buy button step 3 description@@buyButtonStep3Desc:Paste it into your site. Orders and stock update automatically.`,
  },
];

export const BUY_BUTTON_METHODS: IconItem[] = [
  {
    icon: 'fa-credit-card',
    title: $localize`:Buy button method card title@@buyButtonMethodCardTitle:Card`,
    description: $localize`:Buy button method card description@@buyButtonMethodCardDesc:Paid through your own Stripe account, on Loom21's secure payment page in a new tab.`,
  },
  {
    icon: 'fa-bolt',
    title: $localize`:Buy button method Lightning title@@buyButtonMethodLightningTitle:Bitcoin Lightning`,
    description: $localize`:Buy button method Lightning description@@buyButtonMethodLightningDesc:QR code right on your page, settles in seconds.`,
  },
  {
    icon: 'fa-btc',
    title: $localize`:Buy button method on-chain title@@buyButtonMethodOnchainTitle:Bitcoin on-chain`,
    description: $localize`:Buy button method on-chain description@@buyButtonMethodOnchainDesc:For larger payments, on Loom21's secure payment page in a new tab.`,
  },
];

export const BUY_BUTTON_BENEFITS: IconItem[] = [
  {
    icon: 'fa-money',
    title: $localize`:Buy button benefit 1 title@@buyButtonBenefit1Title:Own your money`,
    description: $localize`:Buy button benefit 1 description@@buyButtonBenefit1Desc:Card payments land in your Stripe account, Bitcoin in your own wallet. Loom21 never holds your funds and takes 0%.`,
  },
  {
    icon: 'fa-database',
    title: $localize`:Buy button benefit 2 title@@buyButtonBenefit2Title:Own your data`,
    description: $localize`:Buy button benefit 2 description@@buyButtonBenefit2Desc:Every sale is a normal Loom21 order with customer and stock records you can export at any time.`,
  },
  {
    icon: 'fa-code',
    title: $localize`:Buy button benefit 3 title@@buyButtonBenefit3Title:Own your integrations`,
    description: $localize`:Buy button benefit 3 description@@buyButtonBenefit3Desc:The button is MIT open source on a public API, so you can restyle it, fork it or self-host the script.`,
  },
];

// Product names are not translated; only "plain HTML" is.
export const BUY_BUTTON_PLATFORMS: string[] = [
  'WordPress', 'Webflow', 'Squarespace', 'Ghost',
  $localize`:Buy button works with plain HTML@@buyButtonPlainHtml:Plain HTML`,
];

// Also the source of the FAQPage structured data, so the page and the JSON-LD always match.
export const BUY_BUTTON_FAQ: { question: string; answer: string }[] = [
  {
    question: $localize`:Buy button FAQ question 1@@buyButtonFaqQ1:Do I need a developer?`,
    answer: $localize`:Buy button FAQ answer 1@@buyButtonFaqA1:No. Copy the snippet and paste it into your site builder's HTML or embed block.`,
  },
  {
    question: $localize`:Buy button FAQ question 2@@buyButtonFaqQ2:Do I have to accept Bitcoin?`,
    answer: $localize`:Buy button FAQ answer 2@@buyButtonFaqA2:No. You can take card payments only, Bitcoin only, or both. You can change this at any time.`,
  },
  {
    question: $localize`:Buy button FAQ question 3@@buyButtonFaqQ3:Which payment methods are supported?`,
    answer: $localize`:Buy button FAQ answer 3@@buyButtonFaqA3:Card via Stripe, Bitcoin over Lightning, and on-chain Bitcoin.`,
  },
  {
    question: $localize`:Buy button FAQ question 4@@buyButtonFaqQ4:Does the buyer leave my website?`,
    answer: $localize`:Buy button FAQ answer 4@@buyButtonFaqA4:Lightning is paid right on your page. Card and on-chain payments open a secure Loom21 payment page in a new tab, and your page updates when the payment is complete.`,
  },
  {
    question: $localize`:Buy button FAQ question 5@@buyButtonFaqQ5:What does it cost?`,
    answer: $localize`:Buy button FAQ answer 5@@buyButtonFaqA5:It's included on every plan, Free included. Loom21 charges 0% per sale; your card processor's own fees still apply. Each paid order counts toward your plan's monthly order limit.`,
  },
  {
    question: $localize`:Buy button FAQ question 6@@buyButtonFaqQ6:Does it track my visitors?`,
    answer: $localize`:Buy button FAQ answer 6@@buyButtonFaqA6:No. No cookies, no analytics, no third-party requests.`,
  },
];
