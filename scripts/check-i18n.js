// Compares trans-unit ids in the source XLF with the Bulgarian XLF.
// Run `npx ng extract-i18n --output-path src/locale` first so messages.xlf is current.
const fs = require('fs');

const units = f => new Map(
  [...fs.readFileSync(f, 'utf8').matchAll(/<trans-unit id="([^"]+)"[^>]*>([\s\S]*?)<\/trans-unit>/g)]
    .map(m => [m[1], m[2]])
);

const en = units('src/locale/messages.xlf');
const bg = units('src/locale/messages.bg.xlf');

const missing = [...en.keys()].filter(id => !bg.has(id));
const stale = [...bg.keys()].filter(id => !en.has(id));
const noTarget = [...bg].filter(([id, body]) => en.has(id) && !/<target[^>]*>[\s\S]*?\S[\s\S]*?<\/target>/.test(body)).map(([id]) => id);

// Source text changed in code but the BG unit still carries the old source → its target is probably outdated.
const source = body => ((body.match(/<source>([\s\S]*?)<\/source>/) || [])[1] || '')
  .replace(/&apos;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim();
const outdated = [...bg].filter(([id, body]) => en.has(id) && source(body) !== source(en.get(id))).map(([id]) => id);

console.log('Missing in BG:', missing.length, missing);
console.log('Stale in BG:', stale.length, stale);
console.log('BG units without a target:', noTarget.length, noTarget);
console.log('BG units with outdated source text:', outdated.length, outdated);
process.exit(missing.length || noTarget.length || outdated.length ? 1 : 0);
