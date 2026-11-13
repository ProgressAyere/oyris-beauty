const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const path = require('path');
const fs = require('fs');

// Set ffmpeg path from the installed package
ffmpeg.setFfmpegPath(ffmpegPath);

const inputPath = path.join(__dirname, 'public', 'everyday-look', 'soft-glam-video.mov');
const outputPath = path.join(__dirname, 'public', 'everyday-look', 'soft-glam-video.mp4');

console.log('Starting video conversion...');
console.log(`Input: ${inputPath}`);
console.log(`Output: ${outputPath}`);

// Check if input file exists
if (!fs.existsSync(inputPath)) {
  console.error('Error: Input file does not exist!');
  process.exit(1);
}

ffmpeg(inputPath)
  .outputOptions([
    '-c:v libx264',        // Use H.264 codec for video
    '-preset medium',      // Encoding speed/quality balance
    '-crf 23',            // Constant Rate Factor (quality: 0-51, lower is better)
    '-c:a aac',           // Use AAC codec for audio
    '-b:a 128k',          // Audio bitrate
    '-movflags +faststart' // Enable streaming
  ])
  .output(outputPath)
  .on('start', (commandLine) => {
    console.log('FFmpeg command:', commandLine);
  })
  .on('progress', (progress) => {
    if (progress.percent) {
      process.stdout.write(`\rProgress: ${Math.round(progress.percent)}%`);
    }
  })
  .on('end', () => {
    console.log('\n✓ Video conversion completed successfully!');
    console.log(`Output saved to: ${outputPath}`);
  })
  .on('error', (err, stdout, stderr) => {
    console.error('\n✗ Error during conversion:', err.message);
    console.error('FFmpeg stderr:', stderr);
    process.exit(1);
  })
  .run();
