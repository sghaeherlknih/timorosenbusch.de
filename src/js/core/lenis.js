export function initLenis(reducedMotion) {
  const gsap   = window.gsap;
  const ST     = window.ScrollTrigger;

  gsap.registerPlugin(ST);

  if (reducedMotion) {
    ST.defaults({ scroller: window });
    return null;
  }

  const lenis = new window.Lenis({
    lerp:          0.08,
    smoothWheel:   true,
    smoothTouch:   false,
    normalizeWheel: true,
  });

  // Drive ScrollTrigger from Lenis scroll position
  lenis.on('scroll', ST.update);

  // Single RAF loop: GSAP ticks Lenis (prevents double-RAF jitter)
  gsap.ticker.add((time) => { lenis.raf(time * 1000); });
  gsap.ticker.lagSmoothing(0);

  return lenis;
}
