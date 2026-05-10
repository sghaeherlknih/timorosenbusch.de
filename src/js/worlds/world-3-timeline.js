export function initWorld3({ REDUCED_MOTION } = {}) {
  const section  = document.getElementById('world-3');
  if (!section) return;

  const stations = section.querySelectorAll('.timeline__station');

  ScrollTrigger.batch(stations, {
    start:   'top 82%',
    onEnter: (elements) => {
      if (REDUCED_MOTION) {
        gsap.set(elements, { opacity: 1, x: 0 });
        return;
      }
      gsap.to(elements, {
        opacity:  1,
        x:        0,
        duration: 0.6,
        stagger:  0.2,
        ease:     'power2.out',
        onStart() {
          elements.forEach(el => {
            el.querySelector('.station__tag')?.classList.add('station__tag--flash');
          });
        },
      });
    },
  });
}
