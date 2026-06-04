export async function extractDominantColor(imageUrl: string): Promise<[number, number, number]> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      const size = 80;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, size, size);

      const { data } = ctx.getImageData(0, 0, size, size);
      let r = 0, g = 0, b = 0, count = 0;

      for (let i = 0; i < data.length; i += 4) {
        const pr = data[i], pg = data[i + 1], pb = data[i + 2], pa = data[i + 3];
        if (pa < 200) continue;

        const brightness = (pr + pg + pb) / 3;
        // skip near-white and near-black pixels
        if (brightness > 220 || brightness < 25) continue;

        r += pr; g += pg; b += pb; count++;
      }

      if (count === 0) { resolve([99, 102, 241]); return; }

      resolve([Math.round(r / count), Math.round(g / count), Math.round(b / count)]);
    };

    img.onerror = () => resolve([99, 102, 241]);
    img.src = imageUrl;
  });
}

export function applyTheme(r: number, g: number, b: number) {
  const root = document.documentElement;
  root.style.setProperty('--color-primary', `rgb(${r}, ${g}, ${b})`);
  root.style.setProperty('--color-primary-light', `rgba(${r}, ${g}, ${b}, 0.12)`);
  root.style.setProperty('--color-primary-mid', `rgba(${r}, ${g}, ${b}, 0.25)`);
  document.body.style.background = `rgb(${Math.round(r * 0.15)}, ${Math.round(g * 0.15)}, ${Math.round(b * 0.15)})`;
}
