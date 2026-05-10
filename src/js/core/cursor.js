import { on } from './world-state.js';

export function initCursor() {
  const dot  = document.querySelector('.cursor__dot');
  const ring = document.querySelector('.cursor__ring');

  if (!dot || !ring) return;

  let mouseX = -100, mouseY = -100;
  let ringX  = -100, ringY  = -100;
  let keyboardNav = false;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    keyboardNav = false;
    dot.style.opacity  = '1';
    ring.style.opacity = '1';
  });

  document.addEventListener('keydown', () => { keyboardNav = true; });

  document.addEventListener('focusin', () => {
    if (keyboardNav) {
      dot.style.opacity  = '0';
      ring.style.opacity = '0';
    }
  });

  // Dot follows instantly; ring follows with lag (GSAP quickSetter)
  const setDotX  = gsap.quickSetter(dot,  'x', 'px');
  const setDotY  = gsap.quickSetter(dot,  'y', 'px');
  const setRingX = gsap.quickSetter(ring, 'x', 'px');
  const setRingY = gsap.quickSetter(ring, 'y', 'px');

  gsap.ticker.add(() => {
    setDotX(mouseX);
    setDotY(mouseY);
    ringX += (mouseX - ringX) * 0.14;
    ringY += (mouseY - ringY) * 0.14;
    setRingX(ringX);
    setRingY(ringY);
  });

  // Scale up on interactive elements
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest('a, button, .magnetic-btn, [role="button"]')) {
      ring.classList.add('cursor__ring--hover');
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest('a, button, .magnetic-btn, [role="button"]')) {
      ring.classList.remove('cursor__ring--hover');
    }
  });

  // Update cursor color on world change (CSS handles via --world-cursor-color)
  on('worldChange', () => { /* CSS token cascade handles color */ });
}
