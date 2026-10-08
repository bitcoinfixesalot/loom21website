// Kept in two parts so the full address never appears as a string in prerendered HTML.
export const EMAIL_USER = 'info';
export const EMAIL_DOMAIN = 'loom21.com';
export const EMAIL_TOKEN = '[[EMAIL]]';

export const emailAddress = (): string => `${EMAIL_USER}@${EMAIL_DOMAIN}`;
export const emailObfuscated = (): string =>
  `${EMAIL_USER} [at] ${EMAIL_DOMAIN.replace('.', ' [dot] ')}`;
