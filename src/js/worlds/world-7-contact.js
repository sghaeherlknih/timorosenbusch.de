export function initWorld7({ REDUCED_MOTION } = {}) {
  const section   = document.getElementById('world-7');
  const countEl   = document.getElementById('continue-count');
  if (!section || !countEl) return;

  let countdownCall = null;
  let count = 9;

  function tick() {
    if (count < 0) {
      countEl.textContent = '0';
      gsap.to(countEl, { opacity: 0.3, yoyo: true, repeat: -1, duration: 0.5 });
      return;
    }
    countEl.textContent = count;
    count--;
    if (!REDUCED_MOTION) {
      gsap.fromTo(countEl, { scale: 1.3 }, { scale: 1, duration: 0.3, ease: 'back.out(2)' });
    }
    countdownCall = gsap.delayedCall(1, tick);
  }

  function resetCountdown() {
    countdownCall?.kill();
    gsap.killTweensOf(countEl);
    gsap.set(countEl, { opacity: 1, scale: 1 });
    count = 9;
    countEl.textContent = '9';
  }

  ScrollTrigger.create({
    trigger:     section,
    start:       'top 60%',
    onEnter:     () => tick(),
    onLeaveBack: () => resetCountdown(),
  });
}
