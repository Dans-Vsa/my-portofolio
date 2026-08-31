// Synthesized camera film winding ratchet "tik-tik"
// Built with the Web Audio API without external audio files.

let audioCtx = null;

function getContext() {
  if (typeof window === 'undefined') return null;
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return null;
  if (!audioCtx) {
    audioCtx = new Ctx();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

// Auto-unlock AudioContext on first user interaction to satisfy browser autoplay policy
if (typeof window !== 'undefined') {
  const unlock = () => {
    const ctx = getContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
  };
  ['pointerdown', 'touchstart', 'click', 'keydown', 'wheel'].forEach((evt) => {
    window.addEventListener(evt, unlock, { passive: true });
  });
}

export function playReelClick(volume = 0.35) {
  const ctx = getContext();
  if (!ctx) return;

  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }

  const now = ctx.currentTime;
  const jitter = 0.96 + Math.random() * 0.08;

  // 1. Crisp mechanical transient noise burst (spring & tooth release)
  const noiseDuration = 0.018; // 18ms for clear presence
  const bufferSize = Math.floor(ctx.sampleRate * noiseDuration);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    const env = Math.pow(1 - i / bufferSize, 2.2);
    data[i] = (Math.random() * 2 - 1) * env;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const bandpass = ctx.createBiquadFilter();
  bandpass.type = 'bandpass';
  bandpass.frequency.setValueAtTime(3600 * jitter, now);
  bandpass.Q.setValueAtTime(2.8, now);

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(volume * 0.85, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.016);

  noise.connect(bandpass).connect(noiseGain).connect(ctx.destination);
  noise.start(now);
  noise.stop(now + 0.02);

  // 2. Metallic "tik" tooth resonant transient
  const osc = ctx.createOscillator();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(3400 * jitter, now);
  osc.frequency.exponentialRampToValueAtTime(1400 * jitter, now + 0.012);

  const oscGain = ctx.createGain();
  oscGain.gain.setValueAtTime(volume * 0.5, now);
  oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.014);

  osc.connect(oscGain).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.016);
}
