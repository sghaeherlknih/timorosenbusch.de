export function initStoryline() {
  const path  = document.getElementById('storyline-path');
  const nodes = document.querySelectorAll('.storyline__node');
  if (!path) return;

  const length = path.getTotalLength();
  path.style.strokeDasharray  = length;
  path.style.strokeDashoffset = length;

  gsap.to(path, {
    strokeDashoffset: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: 'body',
      start:   'top top',
      end:     'bottom bottom',
      scrub:   1,
    },
  });

  nodes.forEach((node) => {
    const section = document.querySelector(`[data-world="${node.dataset.world}"]`);
    if (!section) return;
    ScrollTrigger.create({
      trigger: section,
      start:   'top 70%',
      once:    true,
      onEnter: () => node.classList.add('storyline__node--visible'),
    });
  });
}
