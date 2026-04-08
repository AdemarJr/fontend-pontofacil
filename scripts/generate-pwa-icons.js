/* Gera logo192.png e logo512.png com as dimensões reais do manifest (cor tema #1D9E75). */
const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const publicDir = path.join(__dirname, '..', 'public');
const R = 0x1d;
const G = 0x9e;
const B = 0x75;

function writePng(size, filename) {
  const png = new PNG({ width: size, height: size });
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (size * y + x) << 2;
      png.data[idx] = R;
      png.data[idx + 1] = G;
      png.data[idx + 2] = B;
      png.data[idx + 3] = 255;
    }
  }
  const out = path.join(publicDir, filename);
  png.pack().pipe(fs.createWriteStream(out));
  console.log('OK', out);
}

writePng(192, 'logo192.png');
writePng(512, 'logo512.png');
