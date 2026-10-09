import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputPath = 'C:/Users/LG/.gemini/antigravity/brain/ec2f8528-1423-4430-8d78-206744d0db22/.user_uploaded/media_1791569115315_f626dfd1.jpg';
const outputDir = 'C:/Users/LG/OneDrive/Desktop/stress-lab/src/assets/character';

// Precise column boundaries
const colBounds = [
  { minX: 0, maxX: 280 },
  { minX: 280, maxX: 524 },
  { minX: 524, maxX: 766 },
  { minX: 766, maxX: 1024 },
];

// Precise row boundaries
const rowBounds = [
  { minY: 0, maxY: 268 },
  { minY: 268, maxY: 488 },
  { minY: 488, maxY: 682 },
];

const poses = [
  { name: 'main', row: 0, col: 0 },    // 1행 1열: 클립보드
  { name: 'mbti', row: 0, col: 1 },    // 1행 2열: 고민하는 표정 (?)
  { name: 'cause', row: 0, col: 2 },   // 1행 3열: 돋보기
  { name: 'contact', row: 0, col: 3 }, // 1행 4열: 하트
  { name: 'report', row: 1, col: 0 },  // 2행 1열: 연구 노트 필기
  { name: 'relief', row: 1, col: 1 },  // 2행 2열: 플라스크
  { name: 'done', row: 2, col: 0 },    // 3행 1열: STRESS LAB 깃발
];

const image = sharp(inputPath);
const { data, info } = await image
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;

console.log(`Processing character extraction (${width}x${height})...`);

for (const pose of poses) {
  const { minX, maxX } = colBounds[pose.col];
  const { minY, maxY } = rowBounds[pose.row];

  const cropW = maxX - minX;
  const cropH = maxY - minY;

  const cellBuf = Buffer.alloc(cropW * cropH * 4);
  for (let y = 0; y < cropH; y++) {
    for (let x = 0; x < cropW; x++) {
      const srcIdx = ((minY + y) * width + (minX + x)) * channels;
      const dstIdx = (y * cropW + x) * 4;
      cellBuf[dstIdx] = data[srcIdx];
      cellBuf[dstIdx + 1] = data[srcIdx + 1];
      cellBuf[dstIdx + 2] = data[srcIdx + 2];
      cellBuf[dstIdx + 3] = 255;
    }
  }

  // Flood fill from outer boundary
  const isDark = (r, g, b) => Math.max(r, g, b) < 30;
  const isTransitional = (r, g, b) => Math.max(r, g, b) < 60;

  const visited = new Uint8Array(cropW * cropH);
  const queue = [];

  for (let x = 0; x < cropW; x++) {
    queue.push(x, 0);
    queue.push(x, cropH - 1);
  }
  for (let y = 0; y < cropH; y++) {
    queue.push(0, y);
    queue.push(cropW - 1, y);
  }

  let head = 0;
  while (head < queue.length) {
    const qx = queue[head++];
    const qy = queue[head++];
    const qIdx = qy * cropW + qx;

    if (visited[qIdx]) continue;
    visited[qIdx] = 1;

    const pIdx = qIdx * 4;
    const r = cellBuf[pIdx];
    const g = cellBuf[pIdx + 1];
    const b = cellBuf[pIdx + 2];

    if (!isDark(r, g, b)) continue;

    const neighbors = [
      [qx - 1, qy],
      [qx + 1, qy],
      [qx, qy - 1],
      [qx, qy + 1],
    ];

    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < cropW && ny >= 0 && ny < cropH) {
        const nIdx = ny * cropW + nx;
        if (!visited[nIdx]) {
          const npIdx = nIdx * 4;
          if (isDark(cellBuf[npIdx], cellBuf[npIdx + 1], cellBuf[npIdx + 2])) {
            queue.push(nx, ny);
          }
        }
      }
    }
  }

  // Bounding box finding
  let minContentX = cropW;
  let maxContentX = 0;
  let minContentY = cropH;
  let maxContentY = 0;

  for (let y = 0; y < cropH; y++) {
    for (let x = 0; x < cropW; x++) {
      const idx = y * cropW + x;
      const pIdx = idx * 4;

      if (visited[idx]) {
        cellBuf[pIdx + 3] = 0;
      } else {
        const r = cellBuf[pIdx];
        const g = cellBuf[pIdx + 1];
        const b = cellBuf[pIdx + 2];

        let hasBgNeighbor = false;
        const nbrs = [
          [x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]
        ];
        for (const [nx, ny] of nbrs) {
          if (nx >= 0 && nx < cropW && ny >= 0 && ny < cropH) {
            if (visited[ny * cropW + nx]) {
              hasBgNeighbor = true;
              break;
            }
          }
        }

        if (hasBgNeighbor && isTransitional(r, g, b)) {
          const brightness = Math.max(r, g, b);
          const alpha = Math.max(0, Math.min(255, Math.round(((brightness - 12) / 48) * 255)));
          cellBuf[pIdx + 3] = alpha;
        } else {
          cellBuf[pIdx + 3] = 255;
        }

        if (cellBuf[pIdx + 3] > 20) {
          if (x < minContentX) minContentX = x;
          if (x > maxContentX) maxContentX = x;
          if (y < minContentY) minContentY = y;
          if (y > maxContentY) maxContentY = y;
        }
      }
    }
  }

  const pad = 6;
  const tightX = Math.max(0, minContentX - pad);
  const tightY = Math.max(0, minContentY - pad);
  const tightW = Math.min(cropW - tightX, (maxContentX - minContentX) + pad * 2);
  const tightH = Math.min(cropH - tightY, (maxContentY - minContentY) + pad * 2);

  const cropped = sharp(cellBuf, {
    raw: {
      width: cropW,
      height: cropH,
      channels: 4,
    },
  }).extract({
    left: tightX,
    top: tightY,
    width: tightW,
    height: tightH,
  });

  const out1x = path.join(outputDir, `${pose.name}.png`);
  const out2x = path.join(outputDir, `${pose.name}@2x.png`);

  await cropped
    .clone()
    .png({ compressionLevel: 9 })
    .toFile(out1x);

  await cropped
    .clone()
    .resize(tightW * 2, tightH * 2, { kernel: sharp.kernel.lanczos3 })
    .png({ compressionLevel: 9 })
    .toFile(out2x);

  console.log(`Extracted ${pose.name}: ${tightW}x${tightH} -> @2x ${tightW * 2}x${tightH * 2}`);
}

console.log('Done!');
