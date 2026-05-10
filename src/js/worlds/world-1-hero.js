const TITLE_TEXT = 'TIMO ROSENBUSCH';

function typeText(el, text, msPerChar, onDone) {
  let i = 0;
  el.textContent = '';
  const id = setInterval(() => {
    el.textContent += text[i++];
    if (i >= text.length) {
      clearInterval(id);
      onDone?.();
    }
  }, msPerChar);
  return id;
}

function revealBootLines(lines, delay = 120) {
  return new Promise((resolve) => {
    lines.forEach((el, i) => {
      gsap.to(el, { opacity: 1, duration: 0.01, delay: i * (delay / 1000) });
    });
    setTimeout(resolve, lines.length * delay + 200);
  });
}

export function initWorld1({ REDUCED_MOTION, audio } = {}) {
  const screen    = document.getElementById('hero-screen');
  const titleEl   = document.getElementById('hero-title');
  const subtitle  = document.getElementById('hero-subtitle');
  const tagline   = document.getElementById('hero-tagline');
  const pressStart = screen?.querySelector('.hero__press-start');
  const bootLines  = screen ? [...screen.querySelectorAll('.hero__boot-line')] : [];

  if (!screen || !titleEl) return;

  if (REDUCED_MOTION) {
    // Skip animation — show everything immediately
    titleEl.textContent = TITLE_TEXT;
    bootLines.forEach(el => el.style.opacity = '1');
    [subtitle, tagline, pressStart].forEach(el => { if (el) el.style.opacity = '1'; });
    return;
  }

  // Start hidden
  gsap.set(screen, { opacity: 0 });

  // Sequence: flicker on → boot lines → type title → reveal rest
  async function bootSequence() {
    // 1. Screen flicker on
    screen.classList.add('hero__screen--on');
    await new Promise(r => setTimeout(r, 500));
    gsap.to(screen, { opacity: 1, duration: 0.1 });

    // 2. Boot lines appear one by one
    await revealBootLines(bootLines, 150);

    // 3. Type the title
    await new Promise((resolve) => {
      typeText(titleEl, TITLE_TEXT, 80, resolve);
      audio?.playTone({ freq: 1200, type: 'square', duration: 0.04, gain: 0.05 });
    });

    // 4. Reveal subtitle, tagline, press-start
    gsap.to(subtitle,   { opacity: 1, duration: 0.4 });
    await new Promise(r => setTimeout(r, 300));
    gsap.to(tagline,    { opacity: 1, duration: 0.4 });
    await new Promise(r => setTimeout(r, 400));
    if (pressStart) gsap.to(pressStart, { opacity: 1, duration: 0.3 });
  }

  bootSequence();

  // Dim hero when scrolling away
  ScrollTrigger.create({
    trigger:    '#world-1',
    start:      'top top',
    end:        'bottom top',
    onLeave:     () => gsap.to('#world-1', { opacity: 0.35, duration: 0.3 }),
    onEnterBack: () => gsap.to('#world-1', { opacity: 1,    duration: 0.3 }),
  });
}
