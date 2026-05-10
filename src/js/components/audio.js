let ctx = null;

function getCtx() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  return ctx;
}

function playTone({ freq = 440, type = 'square', duration = 0.08, gain = 0.08 } = {}) {
  try {
    const ac  = getCtx();
    const osc = ac.createOscillator();
    const vol = ac.createGain();
    osc.type      = type;
    osc.frequency.setValueAtTime(freq, ac.currentTime);
    vol.gain.setValueAtTime(gain, ac.currentTime);
    vol.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + duration);
    osc.connect(vol);
    vol.connect(ac.destination);
    osc.start();
    osc.stop(ac.currentTime + duration);
  } catch {
    // AudioContext not available — silent fail
  }
}

export function initAudio() {
  // Attach hover sounds to interactive elements after first user gesture
  const attach = () => {
    document.querySelectorAll('a, button, .magnetic-btn').forEach((el) => {
      el.addEventListener('mouseenter', () => playTone({ freq: 880, duration: 0.05 }), { passive: true });
      el.addEventListener('click',      () => playTone({ freq: 440, type: 'sine', duration: 0.12 }), { passive: true });
    });
    document.removeEventListener('click', attach);
    document.removeEventListener('keydown', attach);
  };

  document.addEventListener('click',   attach, { once: true });
  document.addEventListener('keydown', attach, { once: true });

  return { playTone };
}
