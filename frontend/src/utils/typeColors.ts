export const TYPE_COLORS: Record<string, [number, number, number]> = {
  normal:   [168, 168, 120],
  fire:     [240, 128,  48],
  water:    [104, 144, 240],
  electric: [248, 208,  48],
  grass:    [120, 200,  80],
  ice:      [152, 216, 216],
  fighting: [192,  48,  40],
  poison:   [160,  64, 160],
  ground:   [224, 192, 104],
  flying:   [168, 144, 240],
  psychic:  [248,  88, 136],
  bug:      [168, 184,  32],
  rock:     [184, 160,  56],
  ghost:    [112,  88, 152],
  dragon:   [112,  56, 248],
  dark:     [112,  88,  72],
  steel:    [184, 184, 208],
  fairy:    [238, 153, 172],
};

const DEFAULT: [number, number, number] = [99, 102, 241];

export function applyTypeTheme(types: string[]) {
  const [r1, g1, b1] = TYPE_COLORS[types[0]] ?? DEFAULT;

  const root = document.documentElement;
  root.style.setProperty('--color-primary', `rgb(${r1}, ${g1}, ${b1})`);
  root.style.setProperty('--color-primary-light', `rgba(${r1}, ${g1}, ${b1}, 0.12)`);
  root.style.setProperty('--color-primary-mid', `rgba(${r1}, ${g1}, ${b1}, 0.25)`);

  if (types.length >= 2) {
    const [r2, g2, b2] = TYPE_COLORS[types[1]] ?? DEFAULT;
    document.body.style.background = `linear-gradient(135deg,
      rgb(${Math.round(r1 * 0.15)}, ${Math.round(g1 * 0.15)}, ${Math.round(b1 * 0.15)}),
      rgb(${Math.round(r2 * 0.15)}, ${Math.round(g2 * 0.15)}, ${Math.round(b2 * 0.15)}))`;
  } else {
    document.body.style.background = `rgb(${Math.round(r1 * 0.15)}, ${Math.round(g1 * 0.15)}, ${Math.round(b1 * 0.15)})`;
  }
}
