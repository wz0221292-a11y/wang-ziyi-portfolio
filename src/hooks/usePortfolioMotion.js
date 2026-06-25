import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

const reduceMotionQuery = "(prefers-reduced-motion: reduce)";

function isHighCostViewport() {
  if (typeof window === "undefined") return false;
  const width = window.innerWidth || 1280;
  const height = window.innerHeight || 720;
  return width >= 2200 || height >= 1250 || width * height >= 3_600_000;
}

function toElements(targets) {
  if (!targets) return [];
  if (targets instanceof Element) return [targets];
  return Array.from(targets).filter(Boolean);
}

function setupOpeningTimeline() {
  const titleLines = gsap.utils.toArray(".hero-title-line");
  const heroDetails = [
    ".hero-signal",
    ".hero-nameplate",
    ".hero-focus",
    ".hero-text",
    ".hero-actions",
  ];

  gsap.set(".opening-stage", { autoAlpha: 1 });
  gsap.set(".opening-mark", { autoAlpha: 0, scale: 0.78, rotate: -16 });
  gsap.set(".opening-type span", { autoAlpha: 0, yPercent: 120, filter: "blur(8px)" });
  gsap.set(".opening-type strong", {
    autoAlpha: 0,
    yPercent: 112,
    scaleX: 0.72,
    filter: "blur(14px)",
    transformOrigin: "left bottom",
  });
  gsap.set(".opening-panel", { scaleX: 1 });
  gsap.set(".opening-scan", { scaleX: 0, autoAlpha: 0 });
  gsap.set(".site-header", { y: -72, autoAlpha: 0 });
  gsap.set(".hero-portrait-bg", {
    autoAlpha: 0.12,
    xPercent: 5,
    scale: 1.08,
    clipPath: "inset(0 0 0 62%)",
  });
  gsap.set(".hero-spotlight-reveal", {
    autoAlpha: 0,
    scale: 1.08,
    filter: "blur(10px)",
  });
  gsap.set(".hero-vignette", { autoAlpha: 0.24 });
  gsap.set(".hero-signal", { autoAlpha: 0, y: 28, clipPath: "inset(0 100% 0 0)" });
  gsap.set(titleLines, {
    yPercent: 112,
    scaleY: 0.58,
    skewY: 2.2,
    filter: "blur(12px)",
  });
  gsap.set([".hero-nameplate", ".hero-focus", ".hero-text"], {
    autoAlpha: 0,
    y: 44,
  });
  gsap.set(".hero-actions a", { autoAlpha: 0, y: 36, scale: 0.96 });
  gsap.set(".hero-metric-card", { autoAlpha: 0, y: 60, scale: 0.94 });
  gsap.set(".hero-partners span", { autoAlpha: 0, y: 24 });
  gsap.set(".scroll-cue", { autoAlpha: 0, y: -18 });

  const timeline = gsap.timeline({
    defaults: { ease: "expo.out" },
  });

  timeline
    .to(".opening-mark", {
      autoAlpha: 1,
      scale: 1,
      rotate: 0,
      duration: 0.82,
      ease: "back.out(1.2)",
    }, 0.02)
    .to(".opening-type span", {
      autoAlpha: 1,
      yPercent: 0,
      filter: "blur(0px)",
      duration: 0.72,
      ease: "power3.out",
    }, 0.12)
    .to(".opening-type strong", {
      autoAlpha: 1,
      yPercent: 0,
      scaleX: 1,
      filter: "blur(0px)",
      duration: 1.05,
      ease: "expo.out",
    }, 0.22)
    .to(".hero-vignette", { autoAlpha: 0.74, duration: 1.25, ease: "power2.out" }, 0)
    .to(
      ".hero-portrait-bg",
      {
        autoAlpha: 0.38,
        xPercent: 3,
        scale: 1.055,
        clipPath: "inset(0 0 0 46%)",
        duration: 1.1,
        ease: "power2.out",
      },
      0.08,
    )
    .to(".opening-scan", {
      autoAlpha: 1,
      scaleX: 1,
      duration: 0.92,
      ease: "power3.inOut",
    }, 0.08)
    .to(
      ".opening-panel-left",
      {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.72,
        ease: "power4.inOut",
      },
      0.48,
    )
    .to(
      ".opening-panel-right",
      {
        scaleX: 0,
        transformOrigin: "right center",
        duration: 1.72,
        ease: "power4.inOut",
      },
      0.56,
    )
    .to(
      ".opening-scan",
      {
        autoAlpha: 0,
        scaleX: 0.24,
        duration: 0.82,
        ease: "power3.inOut",
      },
      1.46,
    )
    .to([".opening-mark", ".opening-type"], {
      autoAlpha: 0,
      y: -32,
      filter: "blur(8px)",
      duration: 0.72,
      ease: "power3.inOut",
    }, 1.66)
    .to(
      ".hero-portrait-bg",
      {
        autoAlpha: 1,
        xPercent: 0,
        scale: 1,
        clipPath: "inset(0 0 0 0%)",
        duration: 2.05,
        ease: "expo.out",
      },
      0.78,
    )
    .to(
      ".hero-spotlight-reveal",
      {
        autoAlpha: 0.82,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.7,
        ease: "expo.out",
      },
      1.04,
    )
    .to(".hero-vignette", { autoAlpha: 1, duration: 1.6, ease: "power2.out" }, 0.82)
    .to(".site-header", { y: 0, autoAlpha: 1, duration: 1.26 }, 0.98)
    .to(
      ".hero-signal",
      {
        autoAlpha: 1,
        y: 0,
        clipPath: "inset(0 0% 0 0)",
        duration: 1.04,
      },
      1.12,
    )
    .to(
      titleLines,
      {
        yPercent: 0,
        scaleY: 1,
        skewY: 0,
        filter: "blur(0px)",
        duration: 1.82,
        stagger: 0.18,
      },
      1.26,
    )
    .to(
      heroDetails.slice(1, 4),
      {
        autoAlpha: 1,
        y: 0,
        duration: 1.18,
        stagger: 0.12,
      },
      2.02,
    )
    .to(
      ".hero-actions a",
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.98,
        stagger: 0.1,
      },
      2.36,
    )
    .to(
      ".hero-metric-card",
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 1.16,
        stagger: 0.12,
      },
      2.58,
    )
    .to(
      ".hero-partners span",
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.86,
        stagger: 0.06,
      },
      2.82,
    )
    .to(".scroll-cue", { autoAlpha: 1, y: 0, duration: 0.82 }, 3.0)
    .to(".opening-stage", { autoAlpha: 0, duration: 0.95, ease: "power2.inOut" }, 2.54)
    .set(".opening-stage", { display: "none" });

  return timeline;
}

function setupStaggeredContentReveals(root) {
  const highCostViewport = isHighCostViewport();
  const groups = [
    {
      trigger: ".about-detail-header",
      items: ".about-detail-header h3, .about-tag",
      y: 66,
      stagger: 0.07,
    },
    {
      trigger: ".about-info-panel",
      items: ".about-info-item",
      y: 72,
      stagger: 0.055,
    },
    {
      trigger: ".about-bio-panel",
      items: ".about-bio-panel > span, .about-bio-panel p",
      y: 52,
      stagger: 0.08,
    },
    {
      trigger: ".about-timeline-list",
      items: ".about-timeline-glow-card",
      y: 86,
      stagger: 0.12,
    },
    {
      trigger: ".about-case-list",
      items: ".about-case-glow-card",
      y: 86,
      stagger: 0.1,
    },
    {
      trigger: ".about-skill-groups",
      items: ".about-skill-group",
      y: 58,
      stagger: 0.075,
    },
    {
      trigger: ".about-language-panel",
      items: ".about-language-panel > span, .about-language-panel p",
      y: 52,
      stagger: 0.08,
    },
    {
      trigger: ".outcomes-grid",
      items: ".outcome-glow-card",
      y: 98,
      stagger: 0.12,
    },
    {
      trigger: ".strength-grid",
      items: ".strength-glow-card",
      y: 96,
      stagger: 0.12,
    },
    {
      trigger: ".contact-inner",
      items: ".contact-actions a, .footer-link",
      y: 72,
      stagger: 0.12,
    },
  ];

  groups.forEach(({ trigger, items, y, stagger }) => {
    gsap.utils.toArray(trigger, root).forEach((group) => {
      const targets = toElements(group.querySelectorAll(items));
      if (!targets.length) return;

      gsap.set(targets, {
        autoAlpha: 0,
        y: highCostViewport ? Math.round(y * 0.68) : y,
        scale: 0.97,
        filter: highCostViewport ? "none" : "blur(10px)",
      });

      gsap.to(targets, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        filter: highCostViewport ? "none" : "blur(0px)",
        duration: highCostViewport ? 0.92 : 1.08,
        stagger,
        ease: "expo.out",
        scrollTrigger: {
          trigger: group,
          start: "top 82%",
          toggleActions: "play none none none",
          once: true,
        },
      });
    });
  });

  gsap.utils.toArray(".about-subhead", root).forEach((subhead) => {
    const items = toElements(subhead.querySelectorAll("span, p"));
    if (!items.length) return;

    gsap.set(items, { autoAlpha: 0, y: 38, clipPath: "inset(0 0 100% 0)" });
    gsap.to(items, {
      autoAlpha: 1,
      y: 0,
      clipPath: "inset(0 0 0% 0)",
      duration: 0.92,
      stagger: 0.08,
      ease: "expo.out",
      scrollTrigger: {
        trigger: subhead,
        start: "top 86%",
        once: true,
      },
    });
  });
}

function setupSectionReveals(root) {
  const sections = gsap.utils.toArray(".section-block, .contact", root);
  const highCostViewport = isHighCostViewport();

  sections.forEach((section) => {
    const kicker = section.querySelector(".section-kicker");
    const heading = section.querySelector("h2");
    const headingItems = [kicker, heading].filter(Boolean);
    const cards = toElements(
      section.querySelectorAll(
        ".stat-glow-card, .outcome-gallery",
      ),
    );
    const visuals = toElements(section.querySelectorAll(".portrait-glow-card"));
    const bodyItems = toElements(
      section.querySelectorAll(
        ".contact-rows a, .profile-note span, .outcome-card p, .strength-copy p",
      ),
    );

    if (headingItems.length) gsap.set(headingItems, { autoAlpha: 0 });
    if (cards.length) {
      gsap.set(cards, {
        autoAlpha: 0,
        y: highCostViewport ? 58 : 92,
        scale: 0.96,
        rotateX: highCostViewport ? 0 : -8,
      });
    }
    if (visuals.length) {
      gsap.set(visuals, {
        autoAlpha: 0,
        y: highCostViewport ? 54 : 86,
        scale: highCostViewport ? 1.02 : 1.06,
        clipPath: "inset(0 0 100% 0)",
      });
    }
    if (bodyItems.length) gsap.set(bodyItems, { autoAlpha: 0, y: 38 });

    const createTriggerConfig = () => ({
      trigger: section,
      start: "top 78%",
      toggleActions: "play none none none",
      once: true,
    });

    const timeline = gsap.timeline({
      scrollTrigger: createTriggerConfig(),
      defaults: { ease: "expo.out" },
    });

    if (kicker) {
      timeline.fromTo(
        kicker,
        { y: 34, clipPath: "inset(0 100% 0 0)" },
        {
          autoAlpha: 1,
          y: 0,
          clipPath: "inset(0 0% 0 0)",
          duration: 0.88,
        },
      );
    }

    if (heading) {
      timeline.fromTo(
        heading,
        {
          y: 150,
          scaleX: 0.82,
          scaleY: 0.74,
          filter: highCostViewport ? "blur(4px)" : "blur(16px)",
          clipPath: "inset(0 0 100% 0)",
          transformOrigin: "left bottom",
        },
        {
          autoAlpha: 1,
          y: 0,
          scaleX: 1,
          scaleY: 1,
          filter: "blur(0px)",
          clipPath: "inset(0 0 0% 0)",
          duration: highCostViewport ? 1.02 : 1.28,
        },
        kicker ? "-=0.42" : 0,
      );
    }

    if (visuals.length) {
      gsap.to(
        visuals,
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          clipPath: "inset(0 0 0% 0)",
          duration: 1.22,
          delay: 0.42,
          stagger: 0.14,
          ease: "expo.out",
          scrollTrigger: createTriggerConfig(),
        },
      );
    }

    if (bodyItems.length) {
      gsap.to(bodyItems, {
        autoAlpha: 1,
        y: 0,
        duration: 0.92,
        delay: 0.58,
        stagger: 0.07,
        ease: "expo.out",
        scrollTrigger: createTriggerConfig(),
      });
    }

    if (cards.length) {
      gsap.to(cards, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: 1.16,
        delay: 0.82,
        stagger: 0.14,
        ease: "expo.out",
        scrollTrigger: createTriggerConfig(),
      });
    }
  });
}

function setupMarquee(root) {
  const rows = gsap.utils.toArray(".marquee-row", root);

  rows.forEach((row) => {
    const reverse = row.classList.contains("marquee-row-reverse");

    gsap.fromTo(
      row,
      { xPercent: reverse ? 10 : -10 },
      {
        xPercent: reverse ? -8 : 8,
        ease: "none",
        scrollTrigger: {
          trigger: ".marquee-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      },
    );
  });
}

function setupCharacterReveal(root) {
  gsap.utils.toArray(".about-reveal-text", root).forEach((text) => {
    const chars = toElements(text.querySelectorAll(".reveal-char"));
    if (!chars.length) return;

    gsap.set(text, { autoAlpha: 1 });
    gsap.set(chars, { autoAlpha: 0.42, y: 5 });
    gsap.to(chars, {
      autoAlpha: 1,
      y: 0,
      stagger: 0.014,
      ease: "none",
      scrollTrigger: {
        trigger: text,
        start: "top 92%",
        end: "bottom 62%",
        scrub: 0.45,
      },
    });
  });
}

function setupProjectBento(root) {
  const list = root.querySelector(".project-bento-list");
  const items = gsap.utils.toArray(".project-bento-item", root);
  if (!list || !items.length) return;
  const highCostViewport = isHighCostViewport();

  gsap.set(items, {
    autoAlpha: 0,
    y: highCostViewport ? 72 : 120,
    scale: 0.96,
    rotateX: highCostViewport ? 0 : -7,
  });
  gsap.set(".project-glow-card", { autoAlpha: 1 });
  gsap.to(items, {
    autoAlpha: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    duration: highCostViewport ? 1.02 : 1.24,
    stagger: 0.16,
    ease: "expo.out",
    scrollTrigger: {
      trigger: ".projects",
      start: "top 68%",
      once: true,
    },
  });

  items.forEach((item) => {
    const visual = item.querySelector(".project-visual");
    if (visual) {
      gsap.fromTo(
        visual,
        {
          scale: highCostViewport ? 1.025 : 1.08,
          clipPath: "inset(0 0 100% 0)",
          filter: highCostViewport ? "none" : "blur(8px)",
        },
        {
          scale: 1,
          clipPath: "inset(0 0 0% 0)",
          filter: highCostViewport ? "none" : "blur(0px)",
          duration: highCostViewport ? 1.02 : 1.34,
          ease: "expo.out",
          scrollTrigger: {
            trigger: item,
            start: "top 74%",
            once: true,
          },
        },
      );
    }
  });
}

function setupParallax(root) {
  const highCostViewport = isHighCostViewport();

  if (highCostViewport) {
    gsap.to(".hero-portrait-bg", {
      yPercent: 2,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });
    return;
  }

  gsap.utils.toArray(".project-visual", root).forEach((visual) => {
    const movingParts = toElements(
      visual.querySelectorAll(".visual-frame, .visual-core, .visual-horizon"),
    );
    if (movingParts.length) {
      gsap.to(movingParts, {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: visual,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.9,
        },
      });
    }
  });

  gsap.utils.toArray(".portrait-scene", root).forEach((scene) => {
    gsap.to(scene, {
      y: -44,
      ease: "none",
      scrollTrigger: {
        trigger: scene,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.85,
      },
    });
  });

  gsap.to(".hero-portrait-bg", {
    yPercent: 5,
    scale: 1.04,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 0.8,
    },
  });

  gsap.to(".hero-spotlight-reveal", {
    yPercent: 4,
    scale: 1.035,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 0.8,
    },
  });
}

export function usePortfolioMotion(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const revealHeroImmediately = () => {
      gsap.set(".opening-stage", { autoAlpha: 0, display: "none" });
      gsap.set(".site-header", { y: 0, autoAlpha: 1, clearProps: "transform" });
      gsap.set(".hero-spotlight-reveal", { autoAlpha: 0.82, scale: 1, filter: "blur(0px)" });
      gsap.set(".hero-portrait-bg", {
        autoAlpha: 1,
        xPercent: 0,
        scale: 1,
        clipPath: "inset(0 0 0 0%)",
      });
      gsap.set(".hero-vignette", { autoAlpha: 1 });
      gsap.set(".hero-title-line", {
        yPercent: 0,
        scaleY: 1,
        skewY: 0,
        filter: "blur(0px)",
      });
      gsap.set(
        [
          ".hero-signal",
          ".hero-nameplate",
          ".hero-focus",
          ".hero-text",
          ".hero-actions a",
          ".hero-metric-card",
          ".hero-partners span",
          ".scroll-cue",
        ],
        { autoAlpha: 1, y: 0, scale: 1, clipPath: "inset(0 0% 0 0)" },
      );
    };
    const openingSafetyTimer = window.setTimeout(revealHeroImmediately, 4800);

    const reduceMotion = window.matchMedia(reduceMotionQuery).matches;
    if (reduceMotion) {
      revealHeroImmediately();
      return () => window.clearTimeout(openingSafetyTimer);
    }

    let context;
    try {
      context = gsap.context(() => {
        setupOpeningTimeline();
        setupMarquee(root);
        setupSectionReveals(root);
        setupStaggeredContentReveals(root);
        setupCharacterReveal(root);
        setupProjectBento(root);
        setupParallax(root);
        ScrollTrigger.refresh();
      }, root);
    } catch (error) {
      console.error("Portfolio motion setup failed", error);
      revealHeroImmediately();
    }

    const hashRefreshTimer = window.setTimeout(() => {
      if (!window.location.hash) return;

      const target = document.querySelector(window.location.hash);
      if (!target) return;

      ScrollTrigger.refresh();
      const top = target.getBoundingClientRect().top + window.scrollY - 112;
      window.scrollTo({ top, behavior: "auto" });
      ScrollTrigger.refresh();
      ScrollTrigger.update();
    }, 5200);

    return () => {
      window.clearTimeout(openingSafetyTimer);
      window.clearTimeout(hashRefreshTimer);
      context?.revert();
    };
  }, [rootRef]);
}
