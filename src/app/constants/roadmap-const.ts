// DRAFT CONTENT — inferred from existing product signals, not confirmed commitments. Review before publishing.

export const ROADMAP_CONSTANTS = {
  pageTitle: $localize`:Roadmap page title@@roadmapPageTitle:Loom21 roadmap`,
  pageIntro: $localize`:Roadmap page intro@@roadmapPageIntro:A look at what we've shipped, what we're working on now, and what's coming next.`,
  lastUpdated: $localize`:Roadmap last updated@@roadmapLastUpdated:Last updated: November 2026`,
  learnMore: $localize`:Learn more link@@learnMore:Learn more`,
  ctaTitle: $localize`:Roadmap CTA title@@roadmapCtaTitle:Have a feature request?`,
  ctaDesc: $localize`:Roadmap CTA description@@roadmapCtaDesc:We'd love to hear what would make Loom21 more useful for your business.`,

  shippedTitle: $localize`:Roadmap shipped section title@@roadmapShippedTitle:Shipped`,
  inProgressTitle: $localize`:Roadmap in progress section title@@roadmapInProgressTitle:In progress`,
  plannedTitle: $localize`:Roadmap planned section title@@roadmapPlannedTitle:Planned`,

  // Shipped
  shipped1Title: $localize`:Roadmap shipped item 1 title@@roadmapShipped1Title:Bitcoin & card payments`,
  shipped1Desc: $localize`:Roadmap shipped item 1 description@@roadmapShipped1Desc:Accept payments via Stripe, BTCPay Server, Glow, Speed Wallet, and LNbits.`,
  shipped2Title: $localize`:Roadmap shipped item 2 title@@roadmapShipped2Title:Flexible price lists`,
  shipped2Desc: $localize`:Roadmap shipped item 2 description@@roadmapShipped2Desc:Quantity tiers, percentage discounts, custom formulas, and customer-specific price overrides.`,
  shipped3Title: $localize`:Roadmap shipped item 3 title@@roadmapShipped3Title:Custom fields`,
  shipped3Desc: $localize`:Roadmap shipped item 3 description@@roadmapShipped3Desc:Add your own data fields to any product, beyond the standard name, price, and category.`,
  shipped4Title: $localize`:Roadmap shipped item 4 title@@roadmapShipped4Title:Excel & CSV import and export`,
  shipped4Desc: $localize`:Roadmap shipped item 4 description@@roadmapShipped4Desc:Bulk add or update products, services, customers, and suppliers from an Excel or CSV file.`,
  shipped5Title: $localize`:Roadmap shipped item 5 title@@roadmapShipped5Title:Multi-store inventory`,
  shipped5Desc: $localize`:Roadmap shipped item 5 description@@roadmapShipped5Desc:Track stock levels per store location across sales and delivery orders.`,
  shipped6Title: $localize`:Roadmap shipped item 6 title@@roadmapShipped6Title:Sales & deliveries reports`,
  shipped6Desc: $localize`:Roadmap shipped item 6 description@@roadmapShipped6Desc:Searchable, filterable reports with Excel, CSV and JSON export.`,
  shipped7Title: $localize`:Roadmap shipped item 7 title@@roadmapShipped7Title:Free forever plan`,
  shipped7Desc: $localize`:Roadmap shipped item 7 description@@roadmapShipped7Desc:Start selling with Bitcoin and card payments at no cost: 50 orders a month, no credit card.`,
  shipped8Title: $localize`:Roadmap shipped item 8 title@@roadmapShipped8Title:Buy button`,
  shipped8Desc: $localize`:Roadmap shipped item 8 description@@roadmapShipped8Desc:Accept cards and Bitcoin on any website with one line of code. Open source, included on every plan.`,
  shipped9Title: $localize`:Roadmap shipped item 9 title@@roadmapShipped9Title:Payment links`,
  shipped9Desc: $localize`:Roadmap shipped item 9 description@@roadmapShipped9Desc:Send a link by email, chat or QR and get paid by card or Bitcoin.`,
  shipped10Title: $localize`:Roadmap shipped item 10 title@@roadmapShipped10Title:Storefront API`,
  shipped10Desc: $localize`:Roadmap shipped item 10 description@@roadmapShipped10Desc:A public API with publishable keys for selling Loom21 products from any website or app. It powers the Buy button.`,

  // In Progress (items 2 and 3 have moved to Planned; their ids are kept so the BG translations stay linked)
  inProgress1Title: $localize`:Roadmap in progress item 1 title@@roadmapInProgress1Title:More payment processors`,
  inProgress1Desc: $localize`:Roadmap in progress item 1 description@@roadmapInProgress1Desc:More card processors for Europe and more Bitcoin wallets, all paid straight to your own account.`,
  inProgress2Title: $localize`:Roadmap in progress item 2 title@@roadmapInProgress2Title:Expanded reporting & analytics`,
  inProgress2Desc: $localize`:Roadmap in progress item 2 description@@roadmapInProgress2Desc:Deeper insight into sales trends and performance across your stores.`,
  inProgress3Title: $localize`:Roadmap in progress item 3 title@@roadmapInProgress3Title:Installable, mobile-friendly app`,
  inProgress3Desc: $localize`:Roadmap in progress item 3 description@@roadmapInProgress3Desc:A smoother, installable experience for managing your business on the go.`,
  inProgress4Title: $localize`:Roadmap in progress item 4 title@@roadmapInProgress4Title:Online store`,
  inProgress4Desc: $localize`:Roadmap in progress item 4 description@@roadmapInProgress4Desc:A hosted shop for your products, connected to your Loom21 inventory and payments. Now in testing.`,

  // Planned
  planned1Title: $localize`:Roadmap planned item 1 title@@roadmapPlanned1Title:Full API (write access) & webhooks`,
  planned1Desc: $localize`:Roadmap planned item 1 description@@roadmapPlanned1Desc:Adds write access to your Loom21 data on top of read access, plus event webhooks. Included on Growth and Pro.`,
  planned2Title: $localize`:Roadmap planned item 2 title@@roadmapPlanned2Title:More languages`,
  planned2Desc: $localize`:Roadmap planned item 2 description@@roadmapPlanned2Desc:Expanding beyond English and Bulgarian to support more of our users.`,
  planned3Title: $localize`:Roadmap planned item 3 title@@roadmapPlanned3Title:Native mobile apps`,
  planned3Desc: $localize`:Roadmap planned item 3 description@@roadmapPlanned3Desc:Dedicated iOS and Android apps for managing your business from anywhere.`,
  planned4Title: $localize`:Roadmap planned item 4 title@@roadmapPlanned4Title:WordPress plugin for the Buy button`,
  planned4Desc: $localize`:Roadmap planned item 4 description@@roadmapPlanned4Desc:Add the Buy button to a WordPress site without editing HTML.`,
  // Item 5 ("More card processors for Europe") was merged into In progress item 1
  planned6Title: $localize`:Roadmap planned item 6 title@@roadmapPlanned6Title:Low-stock alerts & stock transfers`,
  planned6Desc: $localize`:Roadmap planned item 6 description@@roadmapPlanned6Desc:Get warned before you run out, and move stock between your stores.`
};

export interface RoadmapItem {
  title: string;
  description: string;
  link?: string; // internal route, rendered as a "Learn more" link
}

// Newest first. Display order is set here; the constant ids above are only stable translation keys.
export const SHIPPED_ITEMS: RoadmapItem[] = [
  { title: ROADMAP_CONSTANTS.shipped8Title, description: ROADMAP_CONSTANTS.shipped8Desc, link: '/buy-button' },
  { title: ROADMAP_CONSTANTS.shipped9Title, description: ROADMAP_CONSTANTS.shipped9Desc },
  { title: ROADMAP_CONSTANTS.shipped10Title, description: ROADMAP_CONSTANTS.shipped10Desc },
  { title: ROADMAP_CONSTANTS.shipped7Title, description: ROADMAP_CONSTANTS.shipped7Desc },
  { title: ROADMAP_CONSTANTS.shipped1Title, description: ROADMAP_CONSTANTS.shipped1Desc },
  { title: ROADMAP_CONSTANTS.shipped2Title, description: ROADMAP_CONSTANTS.shipped2Desc },
  { title: ROADMAP_CONSTANTS.shipped3Title, description: ROADMAP_CONSTANTS.shipped3Desc },
  { title: ROADMAP_CONSTANTS.shipped4Title, description: ROADMAP_CONSTANTS.shipped4Desc },
  { title: ROADMAP_CONSTANTS.shipped5Title, description: ROADMAP_CONSTANTS.shipped5Desc },
  { title: ROADMAP_CONSTANTS.shipped6Title, description: ROADMAP_CONSTANTS.shipped6Desc }
];

export const IN_PROGRESS_ITEMS: RoadmapItem[] = [
  { title: ROADMAP_CONSTANTS.inProgress4Title, description: ROADMAP_CONSTANTS.inProgress4Desc },
  { title: ROADMAP_CONSTANTS.inProgress1Title, description: ROADMAP_CONSTANTS.inProgress1Desc }
];

export const PLANNED_ITEMS: RoadmapItem[] = [
  { title: ROADMAP_CONSTANTS.planned1Title, description: ROADMAP_CONSTANTS.planned1Desc },
  { title: ROADMAP_CONSTANTS.planned6Title, description: ROADMAP_CONSTANTS.planned6Desc },
  { title: ROADMAP_CONSTANTS.planned4Title, description: ROADMAP_CONSTANTS.planned4Desc },
  { title: ROADMAP_CONSTANTS.inProgress2Title, description: ROADMAP_CONSTANTS.inProgress2Desc },
  { title: ROADMAP_CONSTANTS.inProgress3Title, description: ROADMAP_CONSTANTS.inProgress3Desc },
  { title: ROADMAP_CONSTANTS.planned2Title, description: ROADMAP_CONSTANTS.planned2Desc },
  { title: ROADMAP_CONSTANTS.planned3Title, description: ROADMAP_CONSTANTS.planned3Desc }
];
