import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  ArrowDown,
  BookOpen,
  Cpu,
  ExternalLink,
  Globe2,
  Layers3,
  Mail,
  MonitorPlay,
  Phone,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import {
  academicOutcomes,
  navItems,
  outcomeGalleryItems,
  portfolioProfile,
  projects,
  stats,
  strengths,
} from "./data/portfolio";
import BorderGlow from "./components/BorderGlow";
import { usePortfolioMotion } from "./hooks/usePortfolioMotion";

const Grainient = lazy(() => import("./components/Grainient"));

const sharedGlowProps = {
  backgroundColor: "rgba(17, 5, 3, 0.82)",
  borderRadius: 22,
  colors: ["#ff7a1f", "#ffb15e", "#c23a1f"],
  coneSpread: 22,
  edgeSensitivity: 24,
  fillOpacity: 0.34,
  glowColor: "28 100 66",
  glowIntensity: 0.86,
  glowRadius: 34,
};

const iconMap = {
  cpu: Cpu,
  globe: Globe2,
  sparkles: Sparkles,
  monitor: MonitorPlay,
};

const outcomeIcons = [Layers3, BookOpen, Cpu, MonitorPlay];

function AnimatedText({ text, className = "" }) {
  return (
    <p className={`about-reveal-text ${className}`.trim()} aria-label={text}>
      {Array.from(text).map((char, index) => (
        <span className="reveal-char" aria-hidden="true" key={`${char}-${index}`}>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </p>
  );
}

function HeroMotionBackground({ videoSrc }) {
  if (videoSrc) {
    return (
      <video className="hero-video" src={videoSrc} autoPlay muted loop playsInline />
    );
  }

  return (
    <div className="motion-bg" aria-hidden="true">
      <div className="motion-layer motion-layer-a" />
      <div className="motion-layer motion-layer-b" />
      <div className="motion-layer motion-layer-c" />
      <div className="scan-grid" />
      <div className="depth-lines">
        {Array.from({ length: 9 }).map((_, index) => (
          <span key={index} style={{ "--line": index }} />
        ))}
      </div>
    </div>
  );
}

function HeroSpotlightReveal() {
  const spotlightRef = useRef(null);

  useEffect(() => {
    const element = spotlightRef.current;
    if (!element) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return undefined;
    const hero = element.closest(".hero");
    if (!hero) return undefined;

    const mouse = {
      x: window.innerWidth * 0.72,
      y: window.innerHeight * 0.42,
    };
    const smooth = { ...mouse };
    let frame = 0;
    let isVisible = false;
    let isPageVisible = !document.hidden;

    const setVars = () => {
      element.style.setProperty("--spotlight-x", `${smooth.x}px`);
      element.style.setProperty("--spotlight-y", `${smooth.y}px`);
    };

    const tick = () => {
      smooth.x += (mouse.x - smooth.x) * 0.1;
      smooth.y += (mouse.y - smooth.y) * 0.1;
      setVars();
      frame = window.requestAnimationFrame(tick);
    };

    const handlePointerMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };
    const start = () => {
      if (!isVisible || !isPageVisible || frame) return;
      hero.addEventListener("pointermove", handlePointerMove, { passive: true });
      frame = window.requestAnimationFrame(tick);
    };
    const stop = () => {
      hero.removeEventListener("pointermove", handlePointerMove);
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) start();
        else stop();
      },
      { threshold: 0 },
    );
    const handleVisibility = () => {
      isPageVisible = !document.hidden;
      if (isPageVisible) start();
      else stop();
    };

    setVars();
    observer.observe(hero);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      stop();
    };
  }, []);

  return (
    <div className="hero-spotlight-reveal" ref={spotlightRef} aria-hidden="true">
      <img
        className="hero-portrait-reveal"
        src="/assets/hero-visor-product-designer.jpg"
        width="1717"
        height="916"
        alt=""
        decoding="async"
      />
      <div className="hero-spotlight-ring" />
    </div>
  );
}

function MarqueeSection() {
  const marqueeProjects = [...projects, ...projects, ...projects];

  return (
    <section className="marquee-section" aria-label="作品动效预览">
      <div className="marquee-row marquee-row-forward">
        {marqueeProjects.map((project, index) => (
          <div className="marquee-tile" key={`forward-${project.title}-${index}`}>
            <ProjectVisual type={project.visualType} />
            <span>{project.category}</span>
          </div>
        ))}
      </div>
      <div className="marquee-row marquee-row-reverse">
        {[...marqueeProjects].reverse().map((project, index) => (
          <div className="marquee-tile" key={`reverse-${project.title}-${index}`}>
            <ProjectVisual type={project.visualType} />
            <span>{project.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let current = false;
    let frame = 0;

    const updateHeaderState = () => {
      const next = window.scrollY > 8;
      if (next !== current) {
        current = next;
        setIsScrolled(next);
      }
    };
    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateHeaderState();
      });
    };

    updateHeaderState();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <header className={`site-header${isScrolled ? " is-scrolled" : ""}`}>
      <a className="brand" href="#home" aria-label="返回首页">
        <span className="brand-mark">WZ</span>
        <span>{portfolioProfile.name}</span>
      </a>
      <nav className="nav" aria-label="主导航">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <a className="nav-contact" href={`mailto:${portfolioProfile.email}`}>
        <Mail size={16} />
        联系我
      </a>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="hero section-screen" id="home">
      <HeroMotionBackground />
      <picture>
        <source
          srcSet="/assets/hero-visor-product-designer-1280.jpg 1280w, /assets/hero-visor-product-designer.jpg 1717w"
          sizes="100vw"
          type="image/jpeg"
        />
        <img
          className="hero-portrait-bg"
          src="/assets/hero-visor-product-designer.jpg"
          width="1717"
          height="916"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
        />
      </picture>
      <HeroSpotlightReveal />
      <div className="hero-vignette" aria-hidden="true" />
      <div className="section-inner hero-inner">
        <div className="hero-copy">
          <div className="hero-signal">
            <Globe2 size={16} />
            <span>PRODUCT DESIGN / DIGITAL EXPERIENCE</span>
          </div>
          <h1 className="hero-title" aria-label="Technology Crafted for Human">
            <span className="hero-title-mask">
              <span className="hero-title-line">Technology</span>
            </span>
            <span className="hero-title-mask">
              <span className="hero-title-line">Crafted for</span>
            </span>
            <span className="hero-title-mask">
              <em className="hero-title-line">Human</em>
            </span>
          </h1>
          <div className="hero-nameplate">
            <strong>{portfolioProfile.name}</strong>
            <span>{portfolioProfile.role}</span>
          </div>
          <p className="hero-focus">{portfolioProfile.focus}</p>
          <p className="hero-text">
            以产品设计为基础，结合游戏设计开发、UE5、AI 与网页交互，把想法转化为可体验、可展示的数字原型。
          </p>
          <div className="hero-actions">
            <a className="primary-action" href={`mailto:${portfolioProfile.email}`}>
              <Send size={18} />
              联系我
            </a>
            <a className="ghost-action" href="#projects">
              查看项目
              <ArrowDown size={18} />
            </a>
          </div>
          <div className="hero-insight" aria-label="首屏能力信息">
            <div className="hero-metric-row">
              <BorderGlow {...sharedGlowProps} className="hero-metric-card" glowRadius={24}>
                <article className="hero-metric-content">
                  <strong>6+</strong>
                  <span>Skill Directions</span>
                </article>
              </BorderGlow>
              <BorderGlow {...sharedGlowProps} className="hero-metric-card" glowRadius={24}>
                <article className="hero-metric-content">
                  <strong>98%</strong>
                  <span>Learning Energy</span>
                </article>
              </BorderGlow>
            </div>
            <div className="hero-partners">
              <span>UE5</span>
              <span>AI Tools</span>
              <span>Web</span>
              <span>Video</span>
            </div>
          </div>
        </div>
      </div>
      <a className="scroll-cue" href="#about" aria-label="滚动到关于">
        <ArrowDown size={20} />
      </a>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="about section-block" id="about">
      <div className="section-inner about-grid">
        <BorderGlow {...sharedGlowProps} className="portrait-glow-card" glowRadius={42}>
          <AboutProfileCard />
        </BorderGlow>
        <div className="about-content">
          <div className="section-kicker">关于我</div>
          <h2>在产品设计和游戏空间之间，寻找更有能量的体验表达。</h2>
          <AnimatedText text={portfolioProfile.extendedIntro} />
          <div className="contact-rows">
            <a href={`mailto:${portfolioProfile.email}`}>
              <Mail size={18} />
              {portfolioProfile.email}
            </a>
            <a href={`tel:${portfolioProfile.phone}`}>
              <Phone size={18} />
              {portfolioProfile.phone}
            </a>
          </div>
          <div className="profile-note">
            <span>{portfolioProfile.school}</span>
            <span>{portfolioProfile.plan}</span>
          </div>
        </div>
      </div>
      <div className="section-inner stat-grid" aria-label="个人项目数据">
        {stats.map((stat) => (
          <BorderGlow {...sharedGlowProps} className="stat-glow-card" key={stat.label}>
            <article className="stat-card">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
              <p>{stat.detail}</p>
            </article>
          </BorderGlow>
        ))}
      </div>
    </section>
  );
}

function AboutProfileCard() {
  const cardRef = useRef(null);
  const settleFrameRef = useRef(0);
  const enterTimerRef = useRef(0);

  const setProfilePointer = (x, y) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const percentX = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    const percentY = Math.min(Math.max((y / rect.height) * 100, 0), 100);
    const centerX = percentX - 50;
    const centerY = percentY - 50;

    card.style.setProperty("--profile-pointer-x", `${percentX}%`);
    card.style.setProperty("--profile-pointer-y", `${percentY}%`);
    card.style.setProperty("--profile-bg-x", `${35 + percentX * 0.3}%`);
    card.style.setProperty("--profile-bg-y", `${35 + percentY * 0.3}%`);
    card.style.setProperty("--profile-from-left", `${percentX / 100}`);
    card.style.setProperty("--profile-from-top", `${percentY / 100}`);
    card.style.setProperty("--profile-rotate-x", `${-(centerY / 7).toFixed(2)}deg`);
    card.style.setProperty("--profile-rotate-y", `${(centerX / 8).toFixed(2)}deg`);
  };

  const handlePointerMove = (event) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    card.classList.add("is-active");
    card.classList.add("is-entering");
    if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
    enterTimerRef.current = window.setTimeout(() => {
      card.classList.remove("is-entering");
      enterTimerRef.current = 0;
    }, 180);
    setProfilePointer(event.clientX - rect.left, event.clientY - rect.top);
  };

  const handlePointerLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    setProfilePointer(card.clientWidth / 2, card.clientHeight / 2);
    if (settleFrameRef.current) window.cancelAnimationFrame(settleFrameRef.current);
    settleFrameRef.current = window.requestAnimationFrame(() => {
      card.classList.remove("is-active");
    });
  };

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return undefined;

    setProfilePointer(card.clientWidth - 70, 60);
    const frame = window.requestAnimationFrame(() => {
      setProfilePointer(card.clientWidth / 2, card.clientHeight / 2);
    });

    return () => {
      window.cancelAnimationFrame(frame);
      if (settleFrameRef.current) window.cancelAnimationFrame(settleFrameRef.current);
      if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
    };
  }, []);

  return (
    <div
      className="profile-card-wrap"
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="profile-card-behind" aria-hidden="true" />
      <div className="profile-card-shell">
        <section className="profile-card" aria-label="王子仪个人形象卡片">
          <div className="profile-card-shine" aria-hidden="true" />
          <div className="profile-card-glare" aria-hidden="true" />
          <img
            className="profile-card-avatar"
            src="/assets/profile-wang-ziyi-cinematic.webp"
            alt=""
            loading="lazy"
            decoding="async"
          />
          <div className="profile-card-grid" aria-hidden="true" />
          <div className="profile-card-details">
            <span>Product Designer</span>
            <h3>{portfolioProfile.name}</h3>
            <p>{portfolioProfile.focus}</p>
          </div>
          <div className="profile-card-user">
            <div className="profile-mini-avatar" aria-hidden="true">
              <img src="/assets/profile-wang-ziyi-mini.webp" alt="" loading="lazy" />
            </div>
            <div>
              <strong>@Wang.Ziyi</strong>
              <span>Building future-facing design works</span>
            </div>
            <a href={`mailto:${portfolioProfile.email}`}>联系</a>
          </div>
        </section>
      </div>
    </div>
  );
}

function OutcomeBoardMedia({ item, index, large = false }) {
  return (
    <div className={large ? "outcome-gallery-media outcome-gallery-media-large" : "outcome-gallery-media"}>
      {item?.image ? (
        <img src={item.image} alt={item.title} loading="lazy" />
      ) : (
        <div className="outcome-gallery-placeholder">
          <span>{String(index + 1).padStart(2, "0")}</span>
        </div>
      )}
    </div>
  );
}

function OutcomeGallery({ items }) {
  const galleryItems = items.length ? items : [];
  const galleryRef = useRef(null);
  const orbitRef = useRef(null);
  const activeIndexRef = useRef(null);
  const hoverTimerRef = useRef(0);
  const pendingIndexRef = useRef(null);
  const previewClearTimerRef = useRef(0);
  const previewActivatedAtRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(null);
  const [previewIndex, setPreviewIndex] = useState(null);
  const [fullscreenIndex, setFullscreenIndex] = useState(null);
  const previewItem = previewIndex !== null ? galleryItems[previewIndex] : null;
  const fullscreenItem = fullscreenIndex !== null ? galleryItems[fullscreenIndex] : null;

  const clearHoverTimer = () => {
    if (hoverTimerRef.current) {
      window.clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = 0;
    }
    pendingIndexRef.current = null;
  };

  const clearPreviewTimer = () => {
    if (previewClearTimerRef.current) {
      window.clearTimeout(previewClearTimerRef.current);
      previewClearTimerRef.current = 0;
    }
  };

  const scheduleActiveIndex = (index, immediate = false) => {
    if (activeIndexRef.current === index) return;
    if (!immediate && pendingIndexRef.current === index) return;

    clearHoverTimer();
    clearPreviewTimer();

    if (immediate) {
      activeIndexRef.current = index;
      previewActivatedAtRef.current = performance.now();
      setPreviewIndex(index);
      setActiveIndex(index);
      return;
    }

    pendingIndexRef.current = index;
    hoverTimerRef.current = window.setTimeout(() => {
      activeIndexRef.current = index;
      pendingIndexRef.current = null;
      hoverTimerRef.current = 0;
      previewActivatedAtRef.current = performance.now();
      setPreviewIndex(index);
      setActiveIndex(index);
    }, 820);
  };

  const activateFromPointer = (event) => {
    if (activeIndexRef.current !== null) return;

    const item = event.target.closest(".outcome-gallery-item");
    if (!item || !event.currentTarget.contains(item)) return;
    scheduleActiveIndex(Number(item.dataset.index));
  };

  const closePreview = () => {
    clearHoverTimer();
    clearPreviewTimer();
    activeIndexRef.current = null;
    setActiveIndex(null);
    previewClearTimerRef.current = window.setTimeout(() => {
      previewClearTimerRef.current = 0;
      setPreviewIndex(null);
    }, 980);
  };

  const openFullscreen = () => {
    if (!previewItem || previewIndex === null) return;
    if (performance.now() - previewActivatedAtRef.current < 650) return;
    setFullscreenIndex(previewIndex);
  };

  const closeFullscreen = () => {
    setFullscreenIndex(null);
  };

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    if (activeIndex === null) return undefined;

    const handleDocumentPointerMove = (event) => {
      const gallery = galleryRef.current;
      if (!gallery || gallery.contains(event.target)) return;
      closePreview();
    };

    window.addEventListener("pointermove", handleDocumentPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handleDocumentPointerMove);
    };
  }, [activeIndex]);

  useEffect(() => {
    if (fullscreenIndex === null) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeFullscreen();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [fullscreenIndex]);

  useEffect(() => {
    const gallery = galleryRef.current;
    const orbit = orbitRef.current;
    if (!gallery || !orbit || !galleryItems.length) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      orbit.style.setProperty("--orbit-angle", "0deg");
      return undefined;
    }

    const baseSpeed = 360 / 68;
    const state = {
      angle: 0,
      speed: baseSpeed,
      lastTime: performance.now(),
      frame: 0,
      visible: false,
      pageVisible: !document.hidden,
    };

    const tick = (time) => {
      const delta = Math.min((time - state.lastTime) / 1000, 0.08);
      const active = activeIndexRef.current;
      const targetSpeed = active === null ? baseSpeed : 0;
      state.lastTime = time;
      const acceleration = active === null ? 1.35 : 2.1;
      state.speed += (targetSpeed - state.speed) * Math.min(delta * acceleration, 1);
      state.angle = (state.angle + state.speed * delta) % 360;

      orbit.style.setProperty("--orbit-angle", `${state.angle}deg`);
      if (active !== null) {
        const counter = -(state.angle + active * (360 / galleryItems.length));
        orbit.style.setProperty("--active-counter", `${counter}deg`);
      }

      state.frame = window.requestAnimationFrame(tick);
    };

    const start = () => {
      if (!state.visible || !state.pageVisible || state.frame) return;
      state.lastTime = performance.now();
      state.frame = window.requestAnimationFrame(tick);
    };
    const stop = () => {
      if (state.frame) window.cancelAnimationFrame(state.frame);
      state.frame = 0;
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        state.visible = entry.isIntersecting;
        if (state.visible) start();
        else stop();
      },
      { rootMargin: "120px 0px", threshold: 0 },
    );
    const handleVisibility = () => {
      state.pageVisible = !document.hidden;
      if (state.pageVisible) start();
      else stop();
    };

    observer.observe(gallery);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [galleryItems.length]);

  useEffect(
    () => () => {
      clearHoverTimer();
      clearPreviewTimer();
    },
    [],
  );

  return (
    <div
      ref={galleryRef}
      className={`outcome-gallery${activeIndex !== null ? " is-interacting" : ""}`}
      aria-label="专业所学成果图片展示框"
      onPointerMove={activateFromPointer}
      onPointerOver={activateFromPointer}
      onPointerLeave={closePreview}
    >
      <div className="outcome-gallery-stage">
        <div className="outcome-gallery-orbit" ref={orbitRef}>
          {galleryItems.map((item, index) => (
            <article
              className={`outcome-gallery-item${activeIndex === index ? " is-active" : ""}`}
              key={item.title}
              data-index={index}
              tabIndex={0}
              onFocus={() => scheduleActiveIndex(index, true)}
              onBlur={closePreview}
              onPointerEnter={activateFromPointer}
              style={{
                "--item-index": index,
                "--item-count": galleryItems.length,
                "--item-angle": `${(360 / galleryItems.length) * index}deg`,
              }}
            >
              <div className="outcome-gallery-shell">
                <OutcomeBoardMedia item={item} index={index} />
                <div className="outcome-gallery-caption">
                  <strong>{item.title}</strong>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div
        className={`outcome-gallery-preview${activeIndex !== null ? " is-visible" : ""}`}
        aria-hidden={!previewItem}
        onPointerMove={(event) => event.stopPropagation()}
        onPointerOver={(event) => event.stopPropagation()}
      >
        {previewItem ? (
          <div
            className="outcome-gallery-preview-board"
            key={previewItem.title}
            role="button"
            tabIndex={0}
            aria-label={`全屏查看${previewItem.title}`}
            onPointerDown={(event) => {
              if (event.button !== 0) return;
              event.preventDefault();
              event.stopPropagation();
              openFullscreen();
            }}
            onClick={(event) => {
              event.stopPropagation();
              openFullscreen();
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openFullscreen();
              }
            }}
          >
            <OutcomeBoardMedia item={previewItem} index={previewIndex} large />
            <div className="outcome-gallery-preview-caption">
              <span>{String(previewIndex + 1).padStart(2, "0")}</span>
              <strong>{previewItem.title}</strong>
            </div>
          </div>
        ) : null}
      </div>
      {fullscreenItem
        ? createPortal(
            <div
              className="outcome-lightbox"
              role="dialog"
              aria-modal="true"
              aria-label={`${fullscreenItem.title} 全屏展示`}
              onClick={closeFullscreen}
            >
              <div className="outcome-lightbox-board" onClick={(event) => event.stopPropagation()}>
                <button className="outcome-lightbox-close" type="button" aria-label="关闭全屏展示" onClick={closeFullscreen}>
                  <X size={20} strokeWidth={1.8} />
                </button>
                <div className="outcome-lightbox-media">
                  <img src={fullscreenItem.image} alt={fullscreenItem.title} />
                </div>
                <div className="outcome-lightbox-caption">
                  <span>{String(fullscreenIndex + 1).padStart(2, "0")}</span>
                  <strong>{fullscreenItem.title}</strong>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}

function AcademicOutcomesSection() {
  return (
    <section className="outcomes section-block" id="outcomes">
      <div className="section-inner outcomes-layout">
        <div className="outcomes-showcase">
          <div className="section-heading outcomes-heading">
            <div className="section-kicker">专业所学成果展示</div>
            <h2>集中展示产品设计课程展板，让研究、造型、模型和表达以作品墙的方式展开。</h2>
          </div>
          <OutcomeGallery items={outcomeGalleryItems} />
        </div>
        <div className="outcomes-grid">
          {academicOutcomes.map((outcome, index) => {
            const Icon = outcomeIcons[index % outcomeIcons.length];
            return (
              <BorderGlow
                {...sharedGlowProps}
                className="outcome-glow-card"
                key={outcome.title}
              >
                <article className="outcome-card">
                  <div className="outcome-card-top">
                    <span className="outcome-index">{String(index + 1).padStart(2, "0")}</span>
                    <div className="icon-box">
                      <Icon size={22} />
                    </div>
                  </div>
                  <span className="outcome-label">{outcome.label}</span>
                  <h3>{outcome.title}</h3>
                  <p>{outcome.description}</p>
                  <div className="tag-row">
                    {outcome.points.map((point) => (
                      <span key={point}>{point}</span>
                    ))}
                  </div>
                </article>
              </BorderGlow>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectVisual({ type }) {
  return (
    <div className={`project-visual visual-${type}`} aria-hidden="true">
      <div className="visual-horizon" />
      <div className="visual-frame">
        <span />
        <span />
        <span />
      </div>
      <div className="visual-core" />
    </div>
  );
}

function InteractiveProjectCard({ project, index }) {
  const cardRef = useRef(null);

  const handlePointerMove = (event) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const relativeX = (x / rect.width) * 100;
    const relativeY = (y / rect.height) * 100;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = ((y - centerY) / centerY) * -4.5;
    const tiltY = ((x - centerX) / centerX) * 4.5;
    const magnetX = (x - centerX) * 0.018;
    const magnetY = (y - centerY) * 0.018;

    card.style.setProperty("--project-x", `${relativeX}%`);
    card.style.setProperty("--project-y", `${relativeY}%`);
    card.style.setProperty("--project-tilt-x", `${tiltX}deg`);
    card.style.setProperty("--project-tilt-y", `${tiltY}deg`);
    card.style.setProperty("--project-magnet-x", `${magnetX}px`);
    card.style.setProperty("--project-magnet-y", `${magnetY}px`);
    card.style.setProperty("--project-glow", "1");
    card.style.transform = `translate3d(${magnetX}px, ${magnetY}px, 0px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  };

  const handlePointerLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    card.style.setProperty("--project-tilt-x", "0deg");
    card.style.setProperty("--project-tilt-y", "0deg");
    card.style.setProperty("--project-magnet-x", "0px");
    card.style.setProperty("--project-magnet-y", "0px");
    card.style.setProperty("--project-glow", "0");
    card.style.transform = "translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div className="project-bento-item" style={{ "--stack-index": index }}>
      <BorderGlow
        {...sharedGlowProps}
        animated={index === 0}
        className="project-glow-card project-bento-card"
      >
        <article
          className="project-card project-bento-shell"
          ref={cardRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          <ProjectVisual type={project.visualType} />
          <div className="project-content">
            <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
            <span className="project-category">{project.category}</span>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="tag-row">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </article>
      </BorderGlow>
    </div>
  );
}

function ProjectsSection() {
  return (
    <section className="projects section-block" id="projects">
      <div className="section-inner section-heading">
        <div className="section-kicker">精选项目</div>
        <h2>从引擎场景到网页交互，把创意变成可体验的原型。</h2>
      </div>
      <div className="section-inner project-bento-list">
        {projects.map((project, index) => (
          <InteractiveProjectCard project={project} index={index} key={project.title} />
        ))}
      </div>
    </section>
  );
}

function StrengthsSection() {
  return (
    <section className="strengths section-block" id="strengths">
      <div className="section-inner strength-layout">
        <div className="strength-copy">
          <div className="section-kicker">个人优势</div>
          <h2>不是单一路径，而是设计、技术、表达共同推进。</h2>
          <p>
            基础版先呈现能力结构，后续可以按真实项目补充过程图、视频 Demo、交互原型和作品详情页。
          </p>
        </div>
        <div className="strength-grid">
          {strengths.map((strength) => {
            const Icon = iconMap[strength.icon];
            return (
              <BorderGlow {...sharedGlowProps} className="strength-glow-card" key={strength.title}>
                <article className="strength-card">
                  <div className="icon-box">
                    <Icon size={22} />
                  </div>
                  <h3>{strength.title}</h3>
                  <p>{strength.description}</p>
                </article>
              </BorderGlow>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="contact section-screen" id="contact">
      <div className="contact-bg" aria-hidden="true" />
      <div className="section-inner contact-inner">
        <div>
          <div className="section-kicker">联系</div>
          <h2>让下一个作品，从一个可被体验的原型开始。</h2>
        </div>
        <div className="contact-actions">
          <a className="primary-action" href={`mailto:${portfolioProfile.email}`}>
            <Mail size={18} />
            {portfolioProfile.email}
          </a>
          <a className="ghost-action" href={`tel:${portfolioProfile.phone}`}>
            <Phone size={18} />
            {portfolioProfile.phone}
          </a>
        </div>
        <a className="footer-link" href="#home">
          返回首页
          <ExternalLink size={16} />
        </a>
      </div>
    </section>
  );
}

function DeferredPostHeroBackground() {
  const backgroundRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const shell = backgroundRef.current?.closest(".post-hero-shell");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) return undefined;
    if (!shell || !("IntersectionObserver" in window)) {
      setShouldRender(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px", threshold: 0.01 },
    );

    observer.observe(shell);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="post-hero-background" ref={backgroundRef} aria-hidden="true">
      <div className="post-hero-background-sticky">
        {shouldRender ? (
          <Suspense fallback={<div className="post-hero-grainient-placeholder" />}>
            <Grainient
              className="post-hero-grainient"
              color1="#ff8a36"
              color2="#8e0000"
              color3="#160503"
              timeSpeed={0.18}
              colorBalance={-0.18}
              warpStrength={1.15}
              warpFrequency={4.6}
              warpSpeed={1.35}
              warpAmplitude={58}
              blendAngle={-18}
              blendSoftness={0.08}
              rotationAmount={420}
              noiseScale={2.35}
              grainAmount={0.12}
              grainScale={2.4}
              grainAnimated
              contrast={1.35}
              gamma={1.04}
              saturation={1.14}
              centerX={0.08}
              centerY={-0.08}
              zoom={0.82}
            />
          </Suspense>
        ) : (
          <div className="post-hero-grainient-placeholder" />
        )}
      </div>
    </div>
  );
}

export default function App() {
  const appRef = useRef(null);
  usePortfolioMotion(appRef);

  return (
    <main ref={appRef}>
      <div className="opening-stage" aria-hidden="true">
        <div className="opening-panel opening-panel-left" />
        <div className="opening-panel opening-panel-right" />
        <div className="opening-scan" />
      </div>
      <SiteHeader />
      <HeroSection />
      <div className="post-hero-shell">
        <DeferredPostHeroBackground />
        <MarqueeSection />
        <AboutSection />
        <AcademicOutcomesSection />
        <ProjectsSection />
        <StrengthsSection />
        <ContactSection />
      </div>
    </main>
  );
}
