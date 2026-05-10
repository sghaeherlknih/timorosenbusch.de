export function initWorld2({ REDUCED_MOTION } = {}) {
  const section = document.getElementById('world-2');
  if (!section) return;

  const bars = section.querySelectorAll('.stat-bar__fill');

  ScrollTrigger.create({
    trigger: section,
    start:   'top 60%',
    once:    true,
    onEnter: () => {
      if (REDUCED_MOTION) {
        bars.forEach(bar => { bar.style.width = bar.dataset.value + '%'; });
        return;
      }
      gsap.to(bars, {
        width:    (_, el) => el.dataset.value + '%',
        duration: 0.9,
        stagger:  0.15,
        ease:     'power2.out',
      });
    },
  });
}
