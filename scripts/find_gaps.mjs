import sharp from 'sharp';

const inputPath = 'C:/Users/LG/.gemini/antigravity/brain/ec2f8528-1423-4430-8d78-206744d0db22/.user_uploaded/media_1791569115315_f626dfd1.jpg';

const image = sharp(inputPath);
const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

// Calculate horizontal projections (row brightness sum) to find row gaps
const rowSums = [];
for (let y = 0; y < height; y++) {
  let sum = 0;
  for (let x = 0; x < width; x++) {
    const idx = (y * width + x) * channels;
    sum += data[idx] + data[idx + 1] + data[idx + 2];
  }
  rowSums.push(sum);
}

// Find local minima where rows are separated by dark gaps
console.log('Sample row sums around row boundaries:');
for (let y = 200; y < 270; y += 5) {
  console.log(`y=${y}: sum=${rowSums[y]}`);
}
for (let y = 430; y < 500; y += 5) {
  console.log(`y=${y}: sum=${rowSums[y]}`);
}
