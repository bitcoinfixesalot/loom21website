// DRAFT — Terms of Service scaffold. Section bodies are placeholders pending legal review.
// TODO(legal): replace each `body` with approved text (EN + BG) before linking this page.

const PENDING = $localize`:Terms section pending@@termsSectionPending:This section is being drafted and will be published after legal review.`;

export const TERMS_CONSTANTS = {
  title: $localize`:Terms title@@termsTitle:Terms of Service`,
  draftNotice: $localize`:Terms draft notice@@termsDraftNotice:Draft — not yet in effect.`,
  sections: [
    { title: $localize`:Terms section 1 title@@termsS1Title:1. Service`, body: PENDING },
    { title: $localize`:Terms section 2 title@@termsS2Title:2. Accounts`, body: PENDING },
    { title: $localize`:Terms section 3 title@@termsS3Title:3. Plans, billing & Bitcoin payments`, body: PENDING }, // soft limits, grace period (L5, L6)
    { title: $localize`:Terms section 4 title@@termsS4Title:4. Acceptable use`, body: PENDING },
    { title: $localize`:Terms section 5 title@@termsS5Title:5. Your data & export`, body: PENDING },
    { title: $localize`:Terms section 6 title@@termsS6Title:6. Third-party payment processors`, body: PENDING }, // Loom21 is not a custodian
    { title: $localize`:Terms section 7 title@@termsS7Title:7. Fees`, body: PENDING }, // 0% Loom21 transaction fee (L4)
    { title: $localize`:Terms section 8 title@@termsS8Title:8. Liability`, body: PENDING },
    { title: $localize`:Terms section 9 title@@termsS9Title:9. Termination`, body: PENDING },
    { title: $localize`:Terms section 10 title@@termsS10Title:10. Governing law`, body: PENDING }, // Republic of Bulgaria
    { title: $localize`:Terms section 11 title@@termsS11Title:11. Contact`, body: PENDING },
  ],
};
