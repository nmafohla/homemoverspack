// Renders a seamlessly-looping, domain-warped light-field to raw rgb24 on stdout.
// Everything is periodic in t over [0,1), so frame N wraps back onto frame 0.
const W = Number(process.env.W || 1280);
const H = Number(process.env.H || 720);
const FRAMES = Number(process.env.FRAMES || 200);
const PRESET = process.env.PRESET || "ember";

const TAU = Math.PI * 2;

// palette stops: [position, r, g, b]
const PALETTES = {
  ember: [
    [0.0, 6, 9, 14],
    [0.34, 24, 22, 34],
    [0.58, 96, 44, 38],
    [0.79, 197, 84, 40],
    [0.93, 240, 156, 68],
    [1.0, 253, 214, 152],
  ],
  gold: [
    [0.0, 12, 9, 8],
    [0.3, 44, 26, 18],
    [0.56, 130, 72, 26],
    [0.78, 213, 141, 45],
    [0.92, 246, 197, 106],
    [1.0, 255, 236, 190],
  ],
  slate: [
    [0.0, 5, 8, 12],
    [0.33, 12, 24, 34],
    [0.58, 22, 58, 72],
    [0.79, 41, 104, 112],
    [0.92, 96, 163, 158],
    [1.0, 186, 219, 206],
  ],
};

const stops = PALETTES[PRESET];
// pre-bake the ramp so the inner loop is a table lookup, not a stop search
const LUT_N = 1024;
const lut = new Float32Array(LUT_N * 3);
for (let i = 0; i < LUT_N; i++) {
  const p = i / (LUT_N - 1);
  let a = stops[0], b = stops[stops.length - 1];
  for (let s = 0; s < stops.length - 1; s++) {
    if (p >= stops[s][0] && p <= stops[s + 1][0]) { a = stops[s]; b = stops[s + 1]; break; }
  }
  const span = b[0] - a[0] || 1;
  let k = (p - a[0]) / span;
  k = k * k * (3 - 2 * k); // smoothstep between stops
  lut[i * 3] = a[1] + (b[1] - a[1]) * k;
  lut[i * 3 + 1] = a[2] + (b[2] - a[2]) * k;
  lut[i * 3 + 2] = a[3] + (b[3] - a[3]) * k;
}

// deterministic per-pixel grain, fixed across frames so it reads as film stock
const grain = new Float32Array(W * H);
let seed = 0x9e3779b9;
for (let i = 0; i < grain.length; i++) {
  seed ^= seed << 13; seed >>>= 0;
  seed ^= seed >> 17;
  seed ^= seed << 5; seed >>>= 0;
  grain[i] = ((seed / 0xffffffff) - 0.5) * 7.5;
}

const buf = Buffer.allocUnsafe(W * H * 3);
const aspect = W / H;

function writeFrame(t) {
  // Drives the raking light bar around a closed path once per loop.
  const c1 = Math.cos(TAU * t), s1 = Math.sin(TAU * t);

  let o = 0;
  for (let py = 0; py < H; py++) {
    const y = (py / H - 0.5) * 2;
    for (let px = 0; px < W; px++) {
      const x = (px / W - 0.5) * 2 * aspect;

      // --- domain warp: two passes of time-periodic sinusoidal displacement
      let wx = 0.62 * Math.sin(1.7 * y + TAU * t + 0.9)
             + 0.34 * Math.sin(2.9 * y - TAU * 2 * t + 2.1)
             + 0.18 * Math.sin(5.1 * y + TAU * 3 * t);
      let wy = 0.58 * Math.cos(1.5 * x - TAU * t + 1.7)
             + 0.31 * Math.cos(3.3 * x + TAU * 2 * t + 0.4)
             + 0.16 * Math.cos(4.7 * x - TAU * 3 * t);

      const ux = x + 0.45 * wx;
      const uy = y + 0.45 * wy;

      wx += 0.29 * Math.sin(2.2 * uy + 1.3 * ux + TAU * 2 * t);
      wy += 0.27 * Math.cos(2.0 * ux - 1.1 * uy - TAU * t);

      const vx = x + 0.52 * wx;
      const vy = y + 0.52 * wy;

      // --- layered periodic field (all harmonics integer in t => exact loop)
      let f = 0.50 * Math.sin(1.25 * vx + 0.9 * vy + TAU * t)
            + 0.30 * Math.sin(2.10 * vy - 1.4 * vx - TAU * 2 * t + 1.2)
            + 0.16 * Math.sin(3.40 * vx - 2.2 * vy + TAU * 3 * t + 2.4)
            + 0.09 * Math.sin(5.60 * vy + 3.1 * vx - TAU * 2 * t);
      f = f * 0.5 + 0.5;

      // --- a slow raking light bar, like sun moving across a wall
      const beam = Math.exp(-Math.pow((x - 1.35 * c1) * 0.72 + (y - 0.42 * s1) * 0.34, 2) * 2.6);
      f += 0.17 * beam;

      // --- push midtones down so bright colour stays a minority of the frame
      f = Math.pow(Math.max(0, Math.min(1, f)), 1.95);

      // --- vignette + a gentle top-to-bottom falloff for text legibility
      const r2 = (x / aspect) * (x / aspect) + y * y;
      f *= 1 - 0.42 * r2;
      f *= 0.80 + 0.20 * (1 - (py / H));

      let idx = (f * (LUT_N - 1)) | 0;
      if (idx < 0) idx = 0; else if (idx >= LUT_N) idx = LUT_N - 1;
      const g = grain[py * W + px];

      let r = lut[idx * 3] + g, gg = lut[idx * 3 + 1] + g, b = lut[idx * 3 + 2] + g;
      buf[o++] = r < 0 ? 0 : r > 255 ? 255 : r;
      buf[o++] = gg < 0 ? 0 : gg > 255 ? 255 : gg;
      buf[o++] = b < 0 ? 0 : b > 255 ? 255 : b;
    }
  }
  return buf;
}

(async () => {
  for (let i = 0; i < FRAMES; i++) {
    const frame = writeFrame(i / FRAMES);
    if (!process.stdout.write(frame)) {
      await new Promise((res) => process.stdout.once("drain", res));
    }
  }
})();
