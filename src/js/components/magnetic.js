export function initMagnetic() {
  const btns = document.querySelectorAll('.magnetic-btn');
  btns.forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect     = btn.getBoundingClientRect();
      const centerX  = rect.left + rect.width  / 2;
      const centerY  = rect.top  + rect.height / 2;
      const dx       = (e.clientX - centerX) * 0.35;
      const dy       = (e.clientY - centerY) * 0.35;
      gsap.to(btn, { x: dx, y: dy, duration: 0.3, ease: 'power2.out' });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
    });
  });
}
