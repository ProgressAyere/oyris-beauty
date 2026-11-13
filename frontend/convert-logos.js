const fs = require('fs');
const path = require('path');
const potrace = require('potrace');

// Input and output paths
const publicDir = path.join(__dirname, 'public');
const logos = ['logo1.png', 'logo2.png'];

// Convert each PNG to SVG
logos.forEach(logo => {
  const inputPath = path.join(publicDir, logo);
  const outputPath = path.join(publicDir, logo.replace('.png', '.svg'));

  console.log(`Converting ${logo}...`);

  potrace.trace(inputPath, (err, svg) => {
    if (err) {
      console.error(`Error converting ${logo}:`, err);
      return;
    }

    fs.writeFileSync(outputPath, svg);
    console.log(`✓ Successfully converted ${logo} to ${path.basename(outputPath)}`);
  });
});
