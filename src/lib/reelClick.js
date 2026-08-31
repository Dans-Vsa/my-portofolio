// Synthesized camera film winding ratchet "tik" — crisp mechanical micro-clicks
// built purely with the Web Audio API without external media files.

let audioCtx = null;

function getContext() {
  if (typeof window === 'undefined') return null;
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return null;
  if (!audioCtx) audioCtx = new Ctx();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

export function playReelClick(volume = 0.15) {
  const ctx = getContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  // Subtle pitch jitter between teeth to mimic natural gear winding
  const jitter = 0.95 + Math.random() * 0.1;

  // 1. Crisp high-frequency noise transient (pawl / tooth snap)
  const noiseDuration = 0.008; // 8ms snappy burst
  const bufferSize = Math.floor(ctx.sampleRate * noiseDuration);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    // Sharp envelope
    const env = Math.pow(1 - i / bufferSize, 3);
    data[i] = (Math.random() * 2 - 1) * env;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const bandpass = ctx.createBiquadFilter();
  bandpass.type = 'bandpass';
  bandpass.frequency.setValueAtTime(5400 * jitter, now);
  bandpass.Q.setValueAtTime(3.2, now);

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(volume * 0.9, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.008);

  noise.connect(bandpass).connect(noiseGain).connect(ctx.destination);
  noise.start(now);
  noise.stop(now + 0.01);

  // 2. High metallic ping transient (the distinct "tik" ratchet body)
  const osc = ctx.createOscillator();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(4200 * jitter, now);
  osc.frequency.exponentialRampToValueAtTime(1900 * jitter, now + 0.006);

  const oscGain = ctx.createGain();
  oscGain.gain.setValueAtTime(volume * 0.4, now);
  oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.007);

  osc.connect(oscGain).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.008);
}
