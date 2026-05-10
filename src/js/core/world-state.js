const listeners = {};

export function on(event, fn) {
  (listeners[event] ??= []).push(fn);
}

export function emit(event, data) {
  (listeners[event] ?? []).forEach(fn => fn(data));
}

export function setActiveWorld(n) {
  document.body.dataset.activeWorld = String(n);
  emit('worldChange', { world: n });
}

export function initWorldState() {
  const ST = window.ScrollTrigger;
  const sections = document.querySelectorAll('[data-world]');

  sections.forEach((section) => {
    const n = Number(section.dataset.world);
    ST.create({
      trigger:    section,
      start:      'top 55%',
      end:        'bottom 55%',
      onEnter:     () => setActiveWorld(n),
      onEnterBack: () => setActiveWorld(n),
    });
  });

  // Set world 1 immediately on load
  setActiveWorld(1);
}
