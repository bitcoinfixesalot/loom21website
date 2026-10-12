import type { MarkedExtension, Tokens } from 'marked';

// Emoji shortcodes used in the loom21doc README. Add an entry when the docs start using a new one
// (replaces the 1 MB emoji-toolkit library, which was loaded on every page for this).
const EMOJI: Record<string, string> = {
  bell: '🔔',
};

export const emojiShortcodes: MarkedExtension = {
  walkTokens(token) {
    // Only leaf text tokens: code spans/blocks have their own token types and are left alone
    if (token.type === 'text' && !(token as Tokens.Text).tokens) {
      const text = token as Tokens.Text;
      text.text = text.text.replace(/:([a-z0-9_+-]+):/g, (match, name: string) => EMOJI[name] ?? match);
    }
  },
};
