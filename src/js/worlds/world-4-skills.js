function buildSkillBars(section) {
  section.querySelectorAll('.skill-bar').forEach((bar) => {
    const fill = bar.querySelector('.skill-bar__fill');
    const max  = 5;
    const val  = fill ? parseInt(fill.dataset.value, 10) : 0;
    bar.innerHTML = '';
    for (let i = 1; i <= max; i++) {
      const span = document.createElement('span');
      span.className = 'skill-bar__block' + (i <= val ? ' skill-bar__block--filled' : '');
      span.textContent = '█';
      span.dataset.active = i <= val ? '1' : '0';
      bar.appendChild(span);
    }
  });
}

function showPopup() {
  const popup = document.getElementById('skill-popup');
  if (!popup) return;
  popup.classList.add('skill-popup--visible');
  setTimeout(() => popup.classList.remove('skill-popup--visible'), 2500);
}

export function initWorld4({ REDUCED_MOTION } = {}) {
  const section = document.getElementById('world-4');
  if (!section) return;

  buildSkillBars(section);

  // Start all blocks dim; animate to lit on scroll
  const filledBlocks = section.querySelectorAll('.skill-bar__block--filled');
  if (!REDUCED_MOTION) {
    gsap.set(filledBlocks, { color: 'var(--color-dim)', textShadow: 'none' });
  }

  ScrollTrigger.create({
    trigger: section,
    start:   'top 55%',
    once:    true,
    onEnter: () => {
      if (REDUCED_MOTION) return;
      gsap.to(filledBlocks, {
        color:      'var(--color-cyan)',
        textShadow: 'var(--glow-cyan)',
        duration:   0.05,
        stagger:    0.04,
        ease:       'none',
        onComplete: showPopup,
      });
    },
  });
}
