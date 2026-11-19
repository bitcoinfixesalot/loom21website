import type { MarkedExtension, Tokens } from 'marked';

// The server 301-redirects page URLs without a trailing slash (/en/pricing → /en/pricing/), and Google
// reports links to them as "Page with redirect". The docs markdown lives in another repo, so links
// to this site are normalised here: https://loom21.com/en/pricing#x → https://loom21.com/en/pricing/#x
const SITE_PAGE = /^((?:https:\/\/(?:www\.)?loom21\.com)?\/(?:en|bg)(?:\/[^?#.]*)?)([?#].*)?$/;

export function withTrailingSlash(href: string): string {
  const m = href.match(SITE_PAGE);
  if (!m || m[1].endsWith('/')) return href;
  return `${m[1]}/${m[2] ?? ''}`;
}

export const siteLinkTrailingSlash: MarkedExtension = {
  walkTokens(token) {
    if (token.type === 'link') {
      const link = token as Tokens.Link;
      link.href = withTrailingSlash(link.href);
    }
  },
};
