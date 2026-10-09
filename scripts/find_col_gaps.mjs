import sharp from 'sharp';

const inputPath = 'C:/Users/LG/.gemini/antigravity/brain/ec2f8528-1423-4430-8d78-206744d0db22/.user_uploaded/media_1791569115315_f626dfd1.jpg';

const image = sharp(inputPath);
const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

// Column brightness sums
const colSums = [];
for (let x = 0; x < width; x++) {
  let sum = 0;
  for (let y = 0; y < height; y++) {
    const idx = (y * width + x) * channels;
    sum += data[idx] + data[idx + 1] + data[idx + 2];
  }
  colSums.push(sum);
}

const findMinInRange = (start, end) => {
  let minVal = Infinity;
  let minX = start;
  for (let x = start; x <= end; x++) {
    if (colSums[x] < minVal) {
      minVal = colSums[x];
      minX = x;
    }
  }
  return { minX, minVal };
};

console.log('Gap 1 (between col 0 and 1):', findMinInRange(230, 280));
console.log('Gap 2 (between col 1 and 2):', findMinInRange(490, 540));
console.log('Gap 3 (between col 2 and 3):', findMinInRange(740, 790));
