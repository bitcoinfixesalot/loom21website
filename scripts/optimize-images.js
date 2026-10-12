// Generates resized WebP versions of the home page images (originals are left untouched).
// Run manually after replacing a source image: node scripts/optimize-images.js
const path = require('path');
const sharp = require('sharp');

const root = path.join(__dirname, '..', 'src', 'assets', 'images');

// Screenshots: one width per entry -> <name>-<width>.webp (used with srcset)
// Widths are ~1x and ~2x the largest displayed size of the Bootstrap column the image sits in
const screenshots = [
  { file: 'form-banners/sale-order-edit.PNG', widths: [640, 1280] },
  { file: 'form-banners/price-lists.png', widths: [640, 1280] },
  { file: 'form-banners/loom-app-laptop-mobile.png', widths: [640, 1182] },
  { file: 'form-banners/custom-fields.png', widths: [560, 1100] },
];

// Flat graphics (logos, illustrations): near-lossless WebP at ~2x displayed height -> <name>.webp
// Logos are shown at 48px (BTCPay: 40px) tall
const graphics = [
  { file: 'logos/stripe-logo.png', height: 96 },
  { file: 'logos/lnbits-logo.png', height: 96 },
  { file: 'logos/glow-wallet-logo.png', height: 96 },
  { file: 'logos/speedwallet-logo.png', height: 96 },
  { file: 'logos/btcpay-logo.png', height: 80 },
  { file: 'form-banners/bitcoin-lightning2.png', height: 234 },
];

const base = (file) => file.replace(/\.(png|PNG)$/, '');

async function report(src, out) {
  const [a, b] = await Promise.all([sharp(src).metadata(), sharp(out).metadata()]);
  const fs = require('fs');
  const kb = (f) => (fs.statSync(f).size / 1024).toFixed(1) + ' KB';
  console.log(`${path.relative(root, out).padEnd(48)} ${b.width}x${b.height}  ${kb(out).padStart(9)}  (was ${a.width}x${a.height}, ${kb(src)})`);
}

(async () => {
  for (const { file, widths } of screenshots) {
    const src = path.join(root, file);
    for (const width of widths) {
      const out = path.join(root, `${base(file)}-${width}.webp`);
      await sharp(src).resize({ width, withoutEnlargement: true }).webp({ quality: 80 }).toFile(out);
      await report(src, out);
    }
  }
  for (const { file, height } of graphics) {
    const src = path.join(root, file);
    const out = path.join(root, `${base(file)}.webp`);
    await sharp(src).resize({ height, withoutEnlargement: true }).webp({ nearLossless: true, quality: 60 }).toFile(out);
    await report(src, out);
  }
})();
