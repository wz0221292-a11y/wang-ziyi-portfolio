# Product Design QA

Source reference: `/Users/wangtianxiang/Desktop/截屏2026-06-22 15.37.56.png`

Prototype URL: `http://127.0.0.1:5173/`

## Checks

- Desktop hero uses the reference layout language: compact top navigation, left oversized headline, right cinematic person image, warm orange/black lighting, lower stat cards.
- Hero metric cards now sit directly below the CTA group instead of being pinned separately at the lower-left of the viewport.
- Portfolio content remains personalized for 王子仪: product designer identity, industrial/digital/game product direction, mailto contact, project navigation.
- CTA and metric cards are visible in the first desktop viewport with clear spacing and no overlap.
- Buttons use hover color-swap states: primary buttons invert to light, secondary buttons switch to orange.
- Downstream sections use the same warm orange/black surface, border, hover, and accent language as the hero.
- Navigation now stays lightweight on the hero and becomes a fixed frosted-glass floating bar after scrolling into the second screen.
- React Bits `Grainient` WebGL background is applied to the shared post-hero area behind About, Projects, Strengths, and Contact without affecting the hero image.
- All major card surfaces now use the React Bits `BorderGlow` interaction: hero metrics, portrait panel, stats, projects, and strength cards share edge-aware orange glow and mesh border fill on hover.
- GSAP opening animation is active: full-screen split mask, scan line, title mask reveal, compressed title recovery, hero image reveal, and staggered hero details.
- Opening animation was smoothed so the hero content reveals underneath the split mask continuously instead of appearing after a black overlay cut.
- ScrollTrigger choreography is active for downstream sections: large heading reveal first, then visual reveal/parallax and staggered cards.
- Product Design prompt pass: added a two-row scroll-driven project marquee below the hero, character-by-character About reveal, and sticky stacked project cards inspired by the 3D creator landing-page prompt while keeping the 王子仪 black/orange portfolio identity.
- Sticky project stack fix: `.post-hero-shell` no longer clips the page scroll context, so project cards can pin, scale, and hand off correctly during scrolling.
- Liquid glass reference pass: only the liquid-glass material from the cinematic space-travel prompt was adopted. Navigation, CTAs, marquee tiles, stat/project/strength cards, portrait panel, and icon boxes now use translucent glass fills, backdrop blur, inset highlights, and masked edge refraction while preserving the existing black/orange visual direction.
- Lithos hero reference pass: only the cursor-following reveal mechanic was adapted. The hero now has a soft circular spotlight mask that reveals a warmer, brighter version of the existing portrait, aligned with the visor glow instead of replacing the image or brand direction.
- Radius system pass: buttons, navigation surfaces, brand mark, marquee tiles, and major BorderGlow cards now share the same `--radius-ui: 22px` corner radius for a consistent rounded visual language.
- Opening animation robustness: added a safety release for the opening mask so the hero cannot remain covered if a browser reload interrupts the GSAP timeline.
- Navigation fix: the header now enters the frosted floating state after a small scroll, uses a higher fixed layer, and the opening safety release also restores header visibility so it remains pinned at the top while scrolling.
- Homepage copy update: the hero focus is now `游戏设计开发 / 产品设计 / 数字体验`; related intro and stat copy now refer to game design/development rather than game product design.
- Academic outcomes section: added a dedicated `专业所学成果展示` section between About and Projects with four product-design learning outcome cards covering form study, research, prototype/modeling, and cross-media presentation.
- Academic outcome gallery pass: added a circular, slow auto-rotating works gallery to the outcomes section, inspired by React Bits `CircularGallery`. It uses six replaceable work slots with image-ready frames, glass styling, curved 3D orbit motion, and hover pause.
- About text reveal timing: the long intro paragraph now starts revealing earlier, uses less blur, shorter stagger, and completes sooner so the full sentence is readable before the viewer scrolls past it.
- Motion uses transform, opacity, clip-path, and scrubbed parallax with `prefers-reduced-motion` fallback.
- Performance pass: hero image now uses JPEG `srcset` assets (`148KB` desktop, `87KB` smaller source) instead of the original `1.3MB` PNG; unused PNG was removed from `public`.
- Performance pass: `Grainient` WebGL is split into a lazy chunk and is not requested on first viewport; it loads after the post-hero section enters the viewport.
- Performance pass: header scroll listener is throttled with `requestAnimationFrame`; WebGL DPR is capped at `1.25`.
- Performance audit update: hero spotlight RAF now runs only while the hero is visible and the page is active; its pointer listener is scoped to the hero instead of `window`.
- Performance audit update: outcome gallery orbit RAF now runs only when the gallery is near the viewport and pauses on page visibility changes.
- Performance audit update: About profile card no longer registers duplicate mouse/pointer handlers and reuses a single entering timer during pointer movement.
- Performance audit update: WebGL background render work is throttled to roughly `30fps`.
- Production preview resource check: first viewport loads only the hero image, main JS, CSS, and favicon; the lazy `Grainient` chunk loads only after scrolling into the post-hero area, with no browser console errors observed.
- Mobile hero keeps readable order and has no horizontal overflow.
- Browser check found no page console errors, no horizontal overflow, working frosted/liquid header state after scroll, and visible liquid-glass pseudo layers on buttons and project cards.
- Browser check confirmed the spotlight mask uses a radial reveal, follows the cursor, and all sampled UI surfaces compute to `22px` radius.
- Browser check confirmed nav remains fixed at top after scroll (`position: fixed`, `top: 14px`, `z-index: 90`), outcomes render 4 cards, and desktop/mobile have no horizontal overflow.
- Browser check confirmed the outcome gallery renders 8 board slots, uses RAF-driven slow orbit motion, the transform changes over time, and About text first/middle/last characters are fully clear when the paragraph is in view.
- Outcome gallery interaction pass: CSS keyframe pause was replaced with a lightweight RAF orbit controller, so hover eases rotation speed down instead of stopping abruptly; the active board counter-rotates, scales up, and remains focusable.
- Project section MagicBento reference pass: the old sticky stack was replaced with a large asymmetric Bento list using cursor spotlight, border glow, direct magnetic tilt, image scale, and staggered GSAP entry while preserving the black/orange liquid-glass style.
- Browser DOM check confirmed outcome active state applies a 3D transform, project hover sets `--project-glow: 1`, applies a non-identity `matrix3d` transform, and keeps horizontal overflow at `0`.
- Outcome gallery preview fix: hover now opens a centered, straight-on board preview that fills about `97%` of the gallery width and `96%` of the gallery height, while the rotating orbit fades behind it.
- Outcome gallery preview interaction fix: the enlarged preview now has its own scale/clip/blur opening animation and switches to `pointer-events: auto`, so mouse movement over the enlarged board no longer reaches or changes the rotating cards underneath.
- Outcome gallery hover sensitivity fix: pointer hover now waits about `820ms` before opening the enlarged board preview; a real mouse quick-pass test confirmed leaving within `200ms` does not open the preview.
- Outcome gallery recovery smoothness fix: preview content now stays mounted during the close animation and is removed after the fade/scale transition, while the orbit resumes with a slower acceleration curve to avoid a visible stutter when the mouse leaves.
- About ProfileCard pass: the old abstract portrait placeholder was replaced with a ProfileCard-inspired image card using pointer-following glow, glare, tilt, avatar crop, and a frosted bottom identity strip in the existing black/orange style.
- Production build passed with `pnpm build`.

## Intentional Differences

- The reference brand, copy, partner logos, and exact person are not copied.
- A generated hero asset is used because no real portrait/video asset was provided yet.
- Project visuals remain high-quality generated placeholders until real project screenshots are provided.

Final result: passed.
