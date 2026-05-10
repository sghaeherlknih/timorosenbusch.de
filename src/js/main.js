import { initLenis }      from './core/lenis.js';
import { initWorldState }  from './core/world-state.js';
import { initCursor }      from './core/cursor.js';
import { initScanlines }   from './components/scanlines.js';
import { initStoryline }   from './components/storyline.js';
import { initGlitch }      from './components/glitch.js';
import { initMagnetic }    from './components/magnetic.js';
import { initAudio }       from './components/audio.js';
import { initWorld1 }      from './worlds/world-1-hero.js';
import { initWorld2 }      from './worlds/world-2-character.js';
import { initWorld3 }      from './worlds/world-3-timeline.js';
import { initWorld4 }      from './worlds/world-4-skills.js';
import { initWorld5 }      from './worlds/world-5-hobbies.js';
import { initWorld6 }      from './worlds/world-6-projects.js';
import { initWorld7 }      from './worlds/world-7-contact.js';

const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

async function boot() {
  // 1. Wait for fonts before any typing animations start
  await document.fonts.ready;

  // 2. Lenis must be first — ScrollTrigger depends on its scroll position
  const lenis = initLenis(REDUCED_MOTION);

  // 3. World state machine (registers ScrollTrigger observers)
  initWorldState();

  // 4. Global UI components
  initCursor();
  initScanlines();
  initStoryline();
  initGlitch();
  initMagnetic();

  // 5. Audio (deferred until user gesture internally)
  const audio = initAudio();

  // 6. Per-world animations
  const ctx = { audio, REDUCED_MOTION, lenis };
  initWorld1(ctx);
  initWorld2(ctx);
  initWorld3(ctx);
  initWorld4(ctx);
  initWorld5(ctx);
  initWorld6(ctx);
  initWorld7(ctx);
}

document.addEventListener('DOMContentLoaded', boot);
