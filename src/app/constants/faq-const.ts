export const FAQ_CONSTANTS = {
  pageTitle: $localize`:FAQ page title@@faqPageTitle:Frequently Asked Questions`,
  pageIntro: $localize`:FAQ page intro@@faqPageIntro:Everything you need to know about payments, pricing, inventory, and more. Can't find what you're looking for? Reach out to us.`,
  ctaTitle: $localize`:FAQ CTA title@@faqCtaTitle:Still Have Questions?`,
  ctaDesc: $localize`:FAQ CTA description@@faqCtaDesc:Can't find the answer you're looking for? Our team is happy to help.`,

  // Category 1: Getting Started
  category1Title: $localize`:FAQ category 1 title@@faqCategory1Title:Getting Started`,
  q1_1: $localize`:FAQ question 1.1@@faqQ1_1:How do I create a Loom21 account?`,
  a1_1: $localize`:FAQ answer 1.1@@faqA1_1:Sign up on the Loom21 website and confirm your email from the confirmation message you receive. Once confirmed, you can sign in and start setting up your organization.`,
  q1_2: $localize`:FAQ question 1.2@@faqQ1_2:Is there a free plan?`,
  a1_2: $localize`:FAQ answer 1.2@@faqA1_2:Yes. You can create a free account with no credit card required and start right away. Visit our Pricing page if you need a paid plan with additional features.`,
  q1_3: $localize`:FAQ question 1.3@@faqQ1_3:What should I set up first?`,
  a1_3: $localize`:FAQ answer 1.3@@faqA1_3:We recommend configuring General Settings (language, currency, VAT, and address), connecting at least one payment processor, adding your products and services, and then creating your first sale order.`,

  // Category 2: Payments & Bitcoin
  category2Title: $localize`:FAQ category 2 title@@faqCategory2Title:Payments & Bitcoin`,
  q2_1: $localize`:FAQ question 2.1@@faqQ2_1:What payment methods does Loom21 support?`,
  a2_1: $localize`:FAQ answer 2.1@@faqA2_1:Stripe for credit and debit cards, and Bitcoin through BTCPay Server, Lightning Wallet (Glow), Speed Wallet, and LNBits — covering both Lightning and on-chain Bitcoin.`,
  q2_2: $localize`:FAQ question 2.2@@faqQ2_2:Can I accept both Bitcoin Lightning and on-chain payments?`,
  a2_2: $localize`:FAQ answer 2.2@@faqA2_2:Yes. Most of our Bitcoin processors support Lightning and on-chain payments side by side with card payments, so you can offer whichever methods suit your customers.`,
  q2_3: $localize`:FAQ question 2.3@@faqQ2_3:Do I need my own Bitcoin wallet or node to use Loom21?`,
  a2_3: $localize`:FAQ answer 2.3@@faqA2_3:It depends on the method. BTCPay Server, Speed Wallet, and LNBits connect using an API key or URL you enter in Settings. Lightning Wallet (Glow) works differently — just enter any LNURL-compatible Lightning Address (Glow's own address works out of the box), then use the Test Connection button to verify it.`,
  q2_4: $localize`:FAQ question 2.4@@faqQ2_4:How are Bitcoin payments confirmed?`,
  a2_4: $localize`:FAQ answer 2.4@@faqA2_4:For BTCPay Server, Speed Wallet, and LNBits, confirmation is real-time — the order status updates automatically the moment the payment settles. For Lightning Wallet (Glow) and other Lightning Address wallets, real-time confirmation depends on your wallet provider supporting it; use the Test Connection button in Settings to check your specific address.`,

  // Category 3: Pricing & Price Lists
  category3Title: $localize`:FAQ category 3 title@@faqCategory3Title:Pricing & Price Lists`,
  q3_1: $localize`:FAQ question 3.1@@faqQ3_1:How does Loom21's own pricing work?`,
  a3_1: $localize`:FAQ answer 3.1@@faqA3_1:Loom21 offers flexible subscription plans billed monthly or yearly, with custom plans available for larger teams. Visit our Pricing page for current plans, or contact us for details.`,
  q3_2: $localize`:FAQ question 3.2@@faqQ3_2:Can I set different prices for different customers?`,
  a3_2: $localize`:FAQ answer 3.2@@faqA3_2:Yes. You can create multiple price lists — such as wholesale, retail, or seasonal — and set customer-specific price overrides that always take priority over any price list.`,
  q3_3: $localize`:FAQ question 3.3@@faqQ3_3:Can I offer quantity-based discounts?`,
  a3_3: $localize`:FAQ answer 3.3@@faqA3_3:Yes. Each price list supports quantity tiers, percentage discounts, or custom formulas, so prices can automatically drop at higher order volumes.`,
  q3_4: $localize`:FAQ question 3.4@@faqQ3_4:What price is used if a product isn't on any price list?`,
  a3_4: $localize`:FAQ answer 3.4@@faqA3_4:Loom21 falls back to the product's base Sale Price configured on the product itself.`,

  // Category 4: Products, Inventory & Custom Fields
  category4Title: $localize`:FAQ category 4 title@@faqCategory4Title:Products, Inventory & Custom Fields`,
  q4_1: $localize`:FAQ question 4.1@@faqQ4_1:Can I track stock across multiple store locations?`,
  a4_1: $localize`:FAQ answer 4.1@@faqA4_1:Yes. Inventory is tracked per store, and every sale or delivery order is linked to a specific store, so stock levels stay accurate everywhere.`,
  q4_2: $localize`:FAQ question 4.2@@faqQ4_2:What are Custom Fields and what can I use them for?`,
  a4_2: $localize`:FAQ answer 4.2@@faqA4_2:Custom Fields let you add your own data fields to every product — like a warranty expiry date, a certification flag, or a supplier reference number — beyond the standard name, price, and category fields.`,
  q4_3: $localize`:FAQ question 4.3@@faqQ4_3:Can I import my existing product or customer list?`,
  a4_3: $localize`:FAQ answer 4.3@@faqA4_3:Yes. Loom21 accepts CSV imports for products, services, customers, and suppliers, with downloadable templates to help you format your data correctly.`,
  q4_4: $localize`:FAQ question 4.4@@faqQ4_4:Does Loom21 support barcodes and QR codes?`,
  a4_4: $localize`:FAQ answer 4.4@@faqA4_4:Yes. You can enter or scan barcodes for products, and QR codes are generated automatically.`,

  // Category 5: Orders & Invoicing
  category5Title: $localize`:FAQ category 5 title@@faqCategory5Title:Orders & Invoicing`,
  q5_1: $localize`:FAQ question 5.1@@faqQ5_1:What documents can I generate from a sale order?`,
  a5_1: $localize`:FAQ answer 5.1@@faqA5_1:Quotes, invoices, receipts, and pickup lists — all as downloadable PDFs. Invoices and receipts become available once an order is marked as paid.`,
  q5_2: $localize`:FAQ question 5.2@@faqQ5_2:Can customers pay without creating a Loom21 account?`,
  a5_2: $localize`:FAQ answer 5.2@@faqA5_2:Yes. Payment links give customers a unique URL to pay for a product, service, or donation with no login required on their side.`,
  q5_3: $localize`:FAQ question 5.3@@faqQ5_3:Can I reorder from a customer's past purchases in one click?`,
  a5_3: $localize`:FAQ answer 5.3@@faqA5_3:Yes. Once you select a customer on a new sale order, you can open their Order History and re-add items from any previous order instantly.`,

  // Category 6: Data, Team & Security
  category6Title: $localize`:FAQ category 6 title@@faqCategory6Title:Data, Team & Security`,
  q6_1: $localize`:FAQ question 6.1@@faqQ6_1:Can I export my data?`,
  a6_1: $localize`:FAQ answer 6.1@@faqA6_1:Yes. You can export your products, customers, suppliers, and reports as CSV or JSON at any time — your data is never locked in.`,
  q6_2: $localize`:FAQ question 6.2@@faqQ6_2:How many team members can I invite?`,
  a6_2: $localize`:FAQ answer 6.2@@faqA6_2:You can invite an unlimited number of users to your organization and assign each one specific roles to control what they can access.`,
  q6_3: $localize`:FAQ question 6.3@@faqQ6_3:What languages is Loom21 available in?`,
  a6_3: $localize`:FAQ answer 6.3@@faqA6_3:Loom21 is currently available in English and Bulgarian, with more languages planned.`
};

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqCategory {
  title: string;
  items: FaqItem[];
}

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    title: FAQ_CONSTANTS.category1Title,
    items: [
      { question: FAQ_CONSTANTS.q1_1, answer: FAQ_CONSTANTS.a1_1 },
      { question: FAQ_CONSTANTS.q1_2, answer: FAQ_CONSTANTS.a1_2 },
      { question: FAQ_CONSTANTS.q1_3, answer: FAQ_CONSTANTS.a1_3 }
    ]
  },
  {
    title: FAQ_CONSTANTS.category2Title,
    items: [
      { question: FAQ_CONSTANTS.q2_1, answer: FAQ_CONSTANTS.a2_1 },
      { question: FAQ_CONSTANTS.q2_2, answer: FAQ_CONSTANTS.a2_2 },
      { question: FAQ_CONSTANTS.q2_3, answer: FAQ_CONSTANTS.a2_3 },
      { question: FAQ_CONSTANTS.q2_4, answer: FAQ_CONSTANTS.a2_4 }
    ]
  },
  {
    title: FAQ_CONSTANTS.category3Title,
    items: [
      { question: FAQ_CONSTANTS.q3_1, answer: FAQ_CONSTANTS.a3_1 },
      { question: FAQ_CONSTANTS.q3_2, answer: FAQ_CONSTANTS.a3_2 },
      { question: FAQ_CONSTANTS.q3_3, answer: FAQ_CONSTANTS.a3_3 },
      { question: FAQ_CONSTANTS.q3_4, answer: FAQ_CONSTANTS.a3_4 }
    ]
  },
  {
    title: FAQ_CONSTANTS.category4Title,
    items: [
      { question: FAQ_CONSTANTS.q4_1, answer: FAQ_CONSTANTS.a4_1 },
      { question: FAQ_CONSTANTS.q4_2, answer: FAQ_CONSTANTS.a4_2 },
      { question: FAQ_CONSTANTS.q4_3, answer: FAQ_CONSTANTS.a4_3 },
      { question: FAQ_CONSTANTS.q4_4, answer: FAQ_CONSTANTS.a4_4 }
    ]
  },
  {
    title: FAQ_CONSTANTS.category5Title,
    items: [
      { question: FAQ_CONSTANTS.q5_1, answer: FAQ_CONSTANTS.a5_1 },
      { question: FAQ_CONSTANTS.q5_2, answer: FAQ_CONSTANTS.a5_2 },
      { question: FAQ_CONSTANTS.q5_3, answer: FAQ_CONSTANTS.a5_3 }
    ]
  },
  {
    title: FAQ_CONSTANTS.category6Title,
    items: [
      { question: FAQ_CONSTANTS.q6_1, answer: FAQ_CONSTANTS.a6_1 },
      { question: FAQ_CONSTANTS.q6_2, answer: FAQ_CONSTANTS.a6_2 },
      { question: FAQ_CONSTANTS.q6_3, answer: FAQ_CONSTANTS.a6_3 }
    ]
  }
];
