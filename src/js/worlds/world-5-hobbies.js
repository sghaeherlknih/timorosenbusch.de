function isMobile() {
  return window.innerWidth <= 768;
}

function initFireCanvas() {
  const canvas = document.getElementById('fire-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  let active = false;

  const palette = ['#000', '#200', '#400', '#600', '#820', '#a40', '#c60', '#e80', '#fa0', '#fc0', '#ffa', '#fff'];
  const heat = new Uint8Array(W * H);

  function step() {
    if (!active) return;
    // Seed bottom row
    for (let x = 0; x < W; x++) {
      heat[(H - 1) * W + x] = Math.random() > 0.3 ? 11 : 8;
    }
    // Propagate upward
    for (let y = 0; y < H - 1; y++) {
      for (let x = 0; x < W; x++) {
        const below = heat[(y + 1) * W + x];
        const bl    = heat[(y + 1) * W + Math.max(0, x - 1)];
        const br    = heat[(y + 1) * W + Math.min(W - 1, x + 1)];
        const avg   = ((below + bl + br) / 3) - (Math.random() > 0.9 ? 1 : 0);
        heat[y * W + x] = Math.max(0, avg | 0);
      }
    }
    // Draw
    const img = ctx.createImageData(W, H);
    for (let i = 0; i < W * H; i++) {
      const c = palette[Math.min(heat[i], palette.length - 1)];
      const rgb = parseInt(c.replace('#', ''), 16);
      img.data[i * 4]     = (rgb >> 16) & 0xff;
      img.data[i * 4 + 1] = (rgb >>  8) & 0xff;
      img.data[i * 4 + 2] =  rgb        & 0xff;
      img.data[i * 4 + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    requestAnimationFrame(step);
  }

  return {
    start: () => { if (!active) { active = true; step(); } },
    stop:  () => { active = false; },
  };
}

function initBtcTicker() {
  const tape = document.getElementById('btc-tape');
  if (!tape) return;
  let pos = 0;
  gsap.to({ val: 0 }, {
    val:      1,
    duration: 20,
    repeat:   -1,
    ease:     'none',
    onUpdate() { pos -= 1; tape.style.transform = `translateX(${pos % 400}px)`; },
  });
}

function initCyclingHud() {
  const fill  = document.getElementById('speedo-fill');
  const valEl = document.getElementById('speedo-val');
  if (!fill) return;

  let speed = 0, target = 0;
  let raf;

  const animate = () => {
    speed += (target - speed) * 0.06;
    const offset = 157 - (speed / 60) * 157;
    fill.style.strokeDashoffset = offset;
    if (valEl) valEl.textContent = Math.round(speed);
    raf = requestAnimationFrame(animate);
  };

  return {
    start: () => {
      target = 28 + Math.random() * 15;
      raf = requestAnimationFrame(animate);
    },
    stop: () => cancelAnimationFrame(raf),
  };
}

export function initWorld5({ REDUCED_MOTION, lenis } = {}) {
  const section = document.getElementById('world-5');
  if (!section || isMobile()) return;

  const track = section.querySelector('.hobbies-track');
  const pin   = section.querySelector('.hobbies-pin-container');
  if (!track || !pin) return;

  const fire    = initFireCanvas();
  const cycling = initCyclingHud();
  initBtcTicker();

  // Horizontal scroll via GSAP pin
  const scrollDist = () => track.scrollWidth - window.innerWidth;

  gsap.to(track, {
    x:    () => -scrollDist(),
    ease: 'none',
    scrollTrigger: {
      trigger:           pin,
      start:             'top top',
      end:               () => `+=${scrollDist()}`,
      pin:               true,
      scrub:             1,
      anticipatePin:     1,
      invalidateOnRefresh: true,
      onToggle: (self) => {
        if (self.isActive) lenis?.stop();
        else               lenis?.start();
      },
    },
  });

  // Start/stop sub-animations per card
  const cards = track.querySelectorAll('.hobby-card');
  cards.forEach((card) => {
    ScrollTrigger.create({
      trigger:   card,
      scroller:  pin,
      horizontal: true,
      start:     'left center',
      end:       'right center',
      onEnter:   () => {
        if (card.dataset.hobby === 'grillen') fire?.start();
        if (card.dataset.hobby === 'cycling') cycling?.start();
      },
      onLeave:       () => { fire?.stop(); cycling?.stop(); },
      onEnterBack:   () => {
        if (card.dataset.hobby === 'grillen') fire?.start();
        if (card.dataset.hobby === 'cycling') cycling?.start();
      },
      onLeaveBack:   () => { fire?.stop(); cycling?.stop(); },
    });
  });
}
