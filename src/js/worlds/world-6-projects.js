export function initWorld6({ REDUCED_MOTION } = {}) {
  const section = document.getElementById('world-6');
  if (!section) return;

  const cards = section.querySelectorAll('.project-card');

  ScrollTrigger.batch(cards, {
    start:   'top 88%',
    onEnter: (els) => {
      if (REDUCED_MOTION) {
        gsap.set(els, { clipPath: 'inset(0% 0 0 0)', opacity: 1 });
        return;
      }
      gsap.fromTo(
        els,
        { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
        {
          clipPath:  'inset(0% 0 0 0)',
          opacity:   1,
          duration:  0.7,
          stagger:   0.15,
          ease:      'power2.out',
          onComplete() {
            gsap.set(els, { willChange: 'auto' });
          },
        }
      );
    },
    once: true,
  });
}
