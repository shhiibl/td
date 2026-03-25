const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'public/assets/LogoNoBg.png');
const outputDir = path.join(__dirname, 'public');

async function generateIcons() {
  if (!fs.existsSync(inputPath)) {
    console.error("Input logo not found:", inputPath);
    return;
  }

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const sizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'apple-touch-icon.png', size: 180, padding: 20 },
    { name: 'android-chrome-192x192.png', size: 192 },
    { name: 'android-chrome-512x512.png', size: 512 }
  ];

  for (const icon of sizes) {
    try {
      const { size, padding = 0 } = icon;
      const contentSize = size - padding * 2;
      
      let imageBuffer = await sharp(inputPath)
        .resize(contentSize, contentSize, { fit: 'contain', background: { r: 0, g: 0, b:0, alpha: 0 } })
        .toBuffer();
        
      if (padding > 0) {
        imageBuffer = await sharp({
          create: { width: size, height: size, channels: 4, background: { r: 252, g: 232, b: 244, alpha: 1 } } // #FCE8F4 background
        })
        .composite([{ input: imageBuffer, top: padding, left: padding }])
        .png()
        .toBuffer();
      }

      await sharp(imageBuffer).toFile(path.join(outputDir, icon.name));
      console.log(`Generated: ${icon.name}`);
    } catch (err) {
      console.error(`Error generating ${icon.name}:`, err);
    }
  }
}

generateIcons();
