export function initGlitch() {
  // Periodic random glitch on headings with .glitch class
  const targets = document.querySelectorAll('.glitch');
  if (!targets.length) return;

  function triggerGlitch(el) {
    el.classList.add('glitch--active');
    setTimeout(() => el.classList.remove('glitch--active'), 300);
  }

  function scheduleNext() {
    const delay = 3000 + Math.random() * 6000;
    setTimeout(() => {
      const el = targets[Math.floor(Math.random() * targets.length)];
      triggerGlitch(el);
      scheduleNext();
    }, delay);
  }

  scheduleNext();
}
