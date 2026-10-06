// DRAFT CONTENT — inferred from existing product signals, not confirmed commitments. Review before publishing.

export const ROADMAP_CONSTANTS = {
  pageTitle: $localize`:Roadmap page title@@roadmapPageTitle:Loom21 Roadmap`,
  pageIntro: $localize`:Roadmap page intro@@roadmapPageIntro:A look at what we've shipped, what we're working on now, and what's coming next.`,
  ctaTitle: $localize`:Roadmap CTA title@@roadmapCtaTitle:Have a Feature Request?`,
  ctaDesc: $localize`:Roadmap CTA description@@roadmapCtaDesc:We'd love to hear what would make Loom21 more useful for your business.`,

  shippedTitle: $localize`:Roadmap shipped section title@@roadmapShippedTitle:Shipped`,
  inProgressTitle: $localize`:Roadmap in progress section title@@roadmapInProgressTitle:In Progress`,
  plannedTitle: $localize`:Roadmap planned section title@@roadmapPlannedTitle:Planned`,

  // Shipped
  shipped1Title: $localize`:Roadmap shipped item 1 title@@roadmapShipped1Title:Bitcoin & Card Payments`,
  shipped1Desc: $localize`:Roadmap shipped item 1 description@@roadmapShipped1Desc:Accept payments via Stripe, BTCPay Server, Lightning Wallet (Glow), Speed Wallet, and LNbits.`,
  shipped2Title: $localize`:Roadmap shipped item 2 title@@roadmapShipped2Title:Flexible Price Lists`,
  shipped2Desc: $localize`:Roadmap shipped item 2 description@@roadmapShipped2Desc:Quantity tiers, percentage discounts, custom formulas, and customer-specific price overrides.`,
  shipped3Title: $localize`:Roadmap shipped item 3 title@@roadmapShipped3Title:Custom Fields`,
  shipped3Desc: $localize`:Roadmap shipped item 3 description@@roadmapShipped3Desc:Add your own data fields to any product, beyond the standard name, price, and category.`,
  shipped4Title: $localize`:Roadmap shipped item 4 title@@roadmapShipped4Title:CSV Import`,
  shipped4Desc: $localize`:Roadmap shipped item 4 description@@roadmapShipped4Desc:Bulk import products, services, customers, and suppliers from a spreadsheet.`,
  shipped5Title: $localize`:Roadmap shipped item 5 title@@roadmapShipped5Title:Multi-Store Inventory`,
  shipped5Desc: $localize`:Roadmap shipped item 5 description@@roadmapShipped5Desc:Track stock levels per store location across sales and delivery orders.`,
  shipped6Title: $localize`:Roadmap shipped item 6 title@@roadmapShipped6Title:Sales & Deliveries Reports`,
  shipped6Desc: $localize`:Roadmap shipped item 6 description@@roadmapShipped6Desc:Searchable, filterable reports with CSV and JSON export.`,

  // In Progress
  inProgress1Title: $localize`:Roadmap in progress item 1 title@@roadmapInProgress1Title:More Payment Processors`,
  inProgress1Desc: $localize`:Roadmap in progress item 1 description@@roadmapInProgress1Desc:Expanding the list of supported Bitcoin and fiat payment processors.`,
  inProgress2Title: $localize`:Roadmap in progress item 2 title@@roadmapInProgress2Title:Expanded Reporting & Analytics`,
  inProgress2Desc: $localize`:Roadmap in progress item 2 description@@roadmapInProgress2Desc:Deeper insight into sales trends and performance across your stores.`,
  inProgress3Title: $localize`:Roadmap in progress item 3 title@@roadmapInProgress3Title:Installable, Mobile-Friendly App`,
  inProgress3Desc: $localize`:Roadmap in progress item 3 description@@roadmapInProgress3Desc:A smoother, installable experience for managing your business on the go.`,

  // Planned
  planned1Title: $localize`:Roadmap planned item 1 title@@roadmapPlanned1Title:Public API & Webhooks`,
  planned1Desc: $localize`:Roadmap planned item 1 description@@roadmapPlanned1Desc:Connect Loom21 to your other tools with a public API and event webhooks.`,
  planned2Title: $localize`:Roadmap planned item 2 title@@roadmapPlanned2Title:More Languages`,
  planned2Desc: $localize`:Roadmap planned item 2 description@@roadmapPlanned2Desc:Expanding beyond English and Bulgarian to support more of our users.`,
  planned3Title: $localize`:Roadmap planned item 3 title@@roadmapPlanned3Title:Native Mobile Apps`,
  planned3Desc: $localize`:Roadmap planned item 3 description@@roadmapPlanned3Desc:Dedicated iOS and Android apps for managing your business from anywhere.`
};

export interface RoadmapItem {
  title: string;
  description: string;
}

export const SHIPPED_ITEMS: RoadmapItem[] = [
  { title: ROADMAP_CONSTANTS.shipped1Title, description: ROADMAP_CONSTANTS.shipped1Desc },
  { title: ROADMAP_CONSTANTS.shipped2Title, description: ROADMAP_CONSTANTS.shipped2Desc },
  { title: ROADMAP_CONSTANTS.shipped3Title, description: ROADMAP_CONSTANTS.shipped3Desc },
  { title: ROADMAP_CONSTANTS.shipped4Title, description: ROADMAP_CONSTANTS.shipped4Desc },
  { title: ROADMAP_CONSTANTS.shipped5Title, description: ROADMAP_CONSTANTS.shipped5Desc },
  { title: ROADMAP_CONSTANTS.shipped6Title, description: ROADMAP_CONSTANTS.shipped6Desc }
];

export const IN_PROGRESS_ITEMS: RoadmapItem[] = [
  { title: ROADMAP_CONSTANTS.inProgress1Title, description: ROADMAP_CONSTANTS.inProgress1Desc },
  { title: ROADMAP_CONSTANTS.inProgress2Title, description: ROADMAP_CONSTANTS.inProgress2Desc },
  { title: ROADMAP_CONSTANTS.inProgress3Title, description: ROADMAP_CONSTANTS.inProgress3Desc }
];

export const PLANNED_ITEMS: RoadmapItem[] = [
  { title: ROADMAP_CONSTANTS.planned1Title, description: ROADMAP_CONSTANTS.planned1Desc },
  { title: ROADMAP_CONSTANTS.planned2Title, description: ROADMAP_CONSTANTS.planned2Desc },
  { title: ROADMAP_CONSTANTS.planned3Title, description: ROADMAP_CONSTANTS.planned3Desc }
];
