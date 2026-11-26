/* ==================================================
   VM WILD EXPEDITIONS
   MAIN JAVASCRIPT CONTROLLER
   Cinematic Motion & Interactive Storytelling
   Inspired by Rockstar Games GTA VI Web Architecture
================================================== */

/* ==================================================
   00. FORCE SCROLL RESTORATION TO TOP (ON PAGE REFRESH)
================================================== */
if (typeof window !== "undefined") {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  window.scrollTo(0, 0);

  window.addEventListener("beforeunload", () => {
    window.scrollTo(0, 0);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Always start at (0, 0) and strip anchor hashes on fresh page reloads
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  if (window.location.hash && window.location.hash !== "#home") {
    if (history.replaceState) {
      history.replaceState(null, null, window.location.pathname + window.location.search);
    }
  }

  /* ==================================================
     01. ELEMENT REFERENCES
  ================================================== */

  const loader = document.querySelector("#loader");
  const trackWrapper = document.querySelector("#cinematic-story-track");
  const presentationStage = document.querySelector("#presentation-stage");

  // Background slides
  const bg1 = document.querySelector("#story-bg-1");
  const bg2 = document.querySelector("#story-bg-2");
  const bg3 = document.querySelector("#story-bg-3");
  const bgImg1 = bg1 ? bg1.querySelector(".story-bg-img") : null;
  const bgImg2 = bg2 ? bg2.querySelector(".story-bg-img") : null;
  const bgImg3 = bg3 ? bg3.querySelector(".story-bg-img") : null;

  // Foreground scenes
  const fg1 = document.querySelector("#story-fg-1");
  const fg2 = document.querySelector("#story-fg-2");
  const fg3 = document.querySelector("#story-fg-3");

  // Navigation
  const navbar = document.querySelector(".navbar");
  const navToggle = document.querySelector("#nav-toggle");
  const mobileNav = document.querySelector("#mobile-nav");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  // Progress pills
  const progressPills = document.querySelectorAll(".progress-pill");
  const expeditionsIntro = document.querySelector(".expeditions-intro");

  /* ==================================================
     02. HELPERS
  ================================================== */

  const wait = (milliseconds) => {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  };

  /* ==================================================
     03. WEBSITE LOADER & INITIALIZATION
  ================================================== */

  async function startWebsite() {
    const imageReady = bgImg1
      ? bgImg1.decode().catch(() => { })
      : Promise.resolve();

    const fontsReady = document.fonts
      ? document.fonts.ready
      : Promise.resolve();

    await Promise.all([imageReady, fontsReady, wait(900)]);

    window.scrollTo(0, 0);
    document.body.classList.add("is-loaded");

    if (loader) {
      loader.classList.add("is-hidden");
    }

    await wait(1800);

    initializeMasterStoryTimeline();
    initializeScrollReveals();
  }

  /* ==================================================
     04. HERO MOUSE PARALLAX (SCENE 1)
  ================================================== */

  function initializeHeroParallax() {
    if (!presentationStage || !bgImg1) return;

    let mouseX = 0;
    let mouseY = 0;
    let animationFrame = null;

    presentationStage.addEventListener("mousemove", (event) => {
      // Only apply parallax while in scene 1
      if (window.scrollY > (trackWrapper?.offsetTop || 0) + window.innerHeight * 0.8) return;

      const rect = presentationStage.getBoundingClientRect();
      const mousePositionX = (event.clientX - rect.left) / rect.width;
      const mousePositionY = (event.clientY - rect.top) / rect.height;

      mouseX = (mousePositionX - 0.5) * -16;
      mouseY = (mousePositionY - 0.5) * -16;

      if (animationFrame !== null) return;

      animationFrame = requestAnimationFrame(() => {
        bgImg1.style.translate = `${mouseX}px ${mouseY}px`;
        animationFrame = null;
      });
    });

    presentationStage.addEventListener("mouseleave", () => {
      bgImg1.style.translate = "0px 0px";
    });
  }

  /* ==================================================
     05. MASTER CINEMATIC SCROLL TIMELINE (GTA VI STYLE)
     Choreographed 3-Scene Pinned Runway with Seamless
     Handoff to the #expeditions grid
  ================================================== */

  let masterStoryScrollTrigger = null;

  function initializeMasterStoryTimeline() {
    if (!window.gsap || !window.ScrollTrigger) {
      console.warn("GSAP or ScrollTrigger is unavailable.");
      return;
    }

    if (!trackWrapper || !presentationStage || !fg1 || !fg2 || !fg3) {
      console.warn("Required cinematic story elements are missing.");
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    /* ------------------------------------------
       REDUCED MOTION CHECK
    ------------------------------------------ */
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      gsap.set([fg1, fg2, fg3], { opacity: 1, y: 0, pointerEvents: "auto" });
      gsap.set([bg1, bg2, bg3], { opacity: 1, scale: 1 });
      return;
    }

    /* ------------------------------------------
       SET INITIAL STATES
    ------------------------------------------ */
    // Scene 1 is visible by default
    gsap.set(bg1, { opacity: 1 });
    gsap.set(bgImg1, { scale: 1.06 });
    gsap.set(fg1, { opacity: 1, y: 0, pointerEvents: "auto" });

    // Scene 2 & 3 start hidden
    gsap.set(bg2, { opacity: 0 });
    gsap.set(bgImg2, { scale: 1.05 });
    gsap.set(fg2, { opacity: 0, y: 40, pointerEvents: "none" });

    gsap.set(bg3, { opacity: 0 });
    gsap.set(bgImg3, { scale: 1.05 });
    gsap.set(fg3, { opacity: 0, y: 40, pointerEvents: "none" });

    /* ------------------------------------------
       MASTER TIMELINE (Total Duration = 10.0 units)
       Scrubbed across the height of trackWrapper
       Balanced, dynamic documentary pacing
    ------------------------------------------ */
    const storyTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: trackWrapper,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          updateSceneProgress(self.progress);
          if (self.progress <= 0.05) {
            gsap.set(fg1, { opacity: 1, y: 0, pointerEvents: "auto" });
            gsap.set(bg1, { opacity: 1 });
            gsap.set(bg2, { opacity: 0 });
            gsap.set(bg3, { opacity: 0 });
            gsap.set([fg2, fg3], { pointerEvents: "none" });
          }
        },
      },
    });

    masterStoryScrollTrigger = storyTimeline.scrollTrigger;

    /* --------------------------------------------------
       SCENE 1 (0% – 25% Scroll Progress, Time: 0.0 -> 2.8)
    -------------------------------------------------- */
    // Slow de-scale on tiger hero image from 1.06 to 1.0
    storyTimeline.to(
      bgImg1,
      {
        scale: 1.0,
        ease: "none",
        duration: 2.0,
      },
      0
    );

    // Active Plateau 1: Hold foreground 1 visible until time 1.8
    // Exit Scene 1: time 1.8 -> 2.8 (smooth 1.0s fade out)
    storyTimeline.to(
      fg1,
      {
        opacity: 0,
        y: -30,
        ease: "power1.inOut",
        duration: 1.0,
        onComplete: () => {
          fg1.style.pointerEvents = "none";
        },
        onReverseComplete: () => {
          fg1.style.pointerEvents = "auto";
        },
      },
      1.8
    );

    storyTimeline.to(
      bg1,
      {
        opacity: 0,
        ease: "power1.inOut",
        duration: 1.0,
      },
      1.8
    );

    /* --------------------------------------------------
       SCENE 2 (25% – 60% Scroll Progress, Time: 1.8 -> 6.3)
       Crisp, balanced reading hold without lingering
    -------------------------------------------------- */
    // Enter Scene 2 Background: time 1.8 -> 2.9
    storyTimeline.to(
      bg2,
      {
        opacity: 1,
        ease: "none",
        duration: 1.1,
      },
      1.8
    );

    storyTimeline.to(
      bgImg2,
      {
        scale: 1.0,
        ease: "none",
        duration: 1.6,
      },
      1.8
    );

    // Enter Scene 2 Foreground: time 2.0 -> 3.1
    storyTimeline.to(
      fg2,
      {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        duration: 1.1,
        onStart: () => {
          fg2.style.pointerEvents = "auto";
        },
        onReverseComplete: () => {
          fg2.style.pointerEvents = "none";
        },
      },
      2.0
    );

    // ACTIVE PLATEAU 2: BALANCED READING HOLD
    // Holds steady from time 3.1 to 5.2 (2.1 units - comfortable, does not linger)

    // TRANSITION SCENE 2 -> SCENE 3 (SMOOTH & MEASURED CROSSFADE)
    // Exit Scene 2: time 5.2 -> 6.3 (duration 1.1s, smooth power1.inOut)
    storyTimeline.to(
      fg2,
      {
        opacity: 0,
        y: -25,
        ease: "power1.inOut",
        duration: 1.1,
        onComplete: () => {
          fg2.style.pointerEvents = "none";
        },
        onReverseComplete: () => {
          fg2.style.pointerEvents = "auto";
        },
      },
      5.2
    );

    storyTimeline.to(
      bg2,
      {
        opacity: 0,
        ease: "power1.inOut",
        duration: 1.1,
      },
      5.2
    );

    /* --------------------------------------------------
       SCENE 3 (60% – 100% Scroll Progress, Time: 5.2 -> 9.8)
    -------------------------------------------------- */
    // Enter Scene 3 Background: time 5.2 -> 6.4 (duration 1.2s)
    storyTimeline.to(
      bg3,
      {
        opacity: 1,
        ease: "none",
        duration: 1.2,
      },
      5.2
    );

    storyTimeline.to(
      bgImg3,
      {
        scale: 1.0,
        ease: "none",
        duration: 1.6,
      },
      5.2
    );

    // Enter Scene 3 Foreground: time 5.4 -> 6.6 (duration 1.2s)
    storyTimeline.to(
      fg3,
      {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        duration: 1.2,
        onStart: () => {
          fg3.style.pointerEvents = "auto";
        },
        onReverseComplete: () => {
          fg3.style.pointerEvents = "none";
        },
      },
      5.4
    );

    // ACTIVE PLATEAU 3: Hold Scene 3 steady from time 6.6 to 8.6!
    // Exit Scene 3 / Clean Hand-off into #expeditions:
    // time 8.6 -> 9.8 (duration 1.2s):
    storyTimeline.to(
      fg3,
      {
        opacity: 0,
        y: -30,
        ease: "power2.in",
        duration: 1.2,
        onComplete: () => {
          fg3.style.pointerEvents = "none";
        },
        onReverseComplete: () => {
          fg3.style.pointerEvents = "auto";
        },
      },
      8.6
    );

    ScrollTrigger.refresh();
  }

  /* ------------------------------------------
     UPDATE ACTIVE SCENE PILL INDICATOR
  ------------------------------------------ */
  function updateSceneProgress(progress) {
    let currentScene = 1;
    if (progress >= 0.25 && progress < 0.60) {
      currentScene = 2;
    } else if (progress >= 0.60) {
      currentScene = 3;
    }

    progressPills.forEach((pill) => {
      const sceneIndex = parseInt(pill.dataset.scene, 10);
      if (sceneIndex === currentScene) {
        pill.classList.add("active");
      } else {
        pill.classList.remove("active");
      }
    });

    const sceneCounter = document.querySelector("#scene-counter-display");
    if (sceneCounter) {
      sceneCounter.textContent = `0${currentScene} / 03`;
    }
  }

  // Clickable pills to jump to corresponding scene
  progressPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      if (!trackWrapper) return;
      const sceneIndex = parseInt(pill.dataset.scene, 10);
      const trackTop = trackWrapper.offsetTop;
      const trackHeight = trackWrapper.offsetHeight - window.innerHeight;

      let targetScroll = trackTop;
      if (sceneIndex === 2) {
        targetScroll = trackTop + trackHeight * 0.42;
      } else if (sceneIndex === 3) {
        targetScroll = trackTop + trackHeight * 0.76;
      }

      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    });
  });

  /* ==================================================
     06. CONTENT SCROLL REVEALS (ALL SUBSEQUENT SECTIONS)
  ================================================== */

  function initializeScrollReveals() {
    if (!window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      gsap.set(".expedition-reveal, .gallery-reveal", { clearProps: "all" });
      return;
    }

    /* ------------------------------------------
       EXPEDITION INTRO HEADING
    ------------------------------------------ */
    if (expeditionsIntro) {
      gsap.fromTo(
        expeditionsIntro,
        {
          autoAlpha: 0,
          y: 50,
          filter: "blur(10px)",
        },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: expeditionsIntro,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }

    /* ------------------------------------------
       ALL EXPEDITION CARDS BATCH REVEAL
    ------------------------------------------ */
    const cards = gsap.utils.toArray(".expedition-reveal");

    cards.forEach((card) => {
      gsap.fromTo(
        card,
        {
          autoAlpha: 0,
          y: 60,
          scale: 0.98,
          filter: "blur(10px)",
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.85,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    /* ------------------------------------------
       GALLERY ITEMS STAGGERED REVEAL (89 ITEMS PERFORMANCE OPTIMIZED)
    ------------------------------------------ */
    const galleryItems = gsap.utils.toArray(".gallery-reveal");

    ScrollTrigger.batch(galleryItems, {
      start: "top 92%",
      once: true,
      onEnter: (batch) => {
        gsap.to(batch, {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.05,
          duration: 0.6,
          ease: "power2.out",
          overwrite: "auto",
        });
      },
    });

    /* ------------------------------------------
       SECTION HEADINGS REVEAL
    ------------------------------------------ */
    gsap.utils.toArray(".section-heading:not(.expeditions-intro .section-heading)").forEach((heading) => {
      gsap.fromTo(
        heading,
        {
          autoAlpha: 0,
          y: 40,
          filter: "blur(8px)",
        },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    /* ------------------------------------------
       PILLARS STAGGERED REVEAL
    ------------------------------------------ */
    const pillarCards = gsap.utils.toArray(".pillar-card");
    if (pillarCards.length > 0) {
      ScrollTrigger.batch(pillarCards, {
        start: "top 85%",
        onEnter: (batch) => {
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.1,
            duration: 0.7,
            ease: "power2.out",
          });
        },
      });
    }

    /* ------------------------------------------
       FEED IMAGES REVEAL
    ------------------------------------------ */
    const feedItems = gsap.utils.toArray(".field-feed-item");
    if (feedItems.length > 0) {
      ScrollTrigger.batch(feedItems, {
        start: "top 90%",
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { autoAlpha: 0, scale: 0.94 },
            { autoAlpha: 1, scale: 1, stagger: 0.06, duration: 0.6, ease: "power2.out" }
          );
        },
      });
    }
  }

  /* ==================================================
     07. EXPEDITION TABS FILTER (WILD vs BIRDS)
  ================================================== */

  function initializeExpeditionTabs() {
    const tabBtns = document.querySelectorAll(".exp-tab-btn");
    const cards = document.querySelectorAll(".expedition-grid article");
    const expSide = document.querySelector(".expedition-side");

    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        tabBtns.forEach((b) => {
          b.classList.remove("active");
          b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");

        const filter = btn.dataset.filter;

        if (expSide) {
          expSide.style.display = filter === "birds" ? "none" : "";
        }

        cards.forEach((card) => {
          const type = card.dataset.type;
          if (filter === "all" || type === filter) {
            card.style.display = "";
            gsap.fromTo(card, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.4 });
          } else {
            card.style.display = "none";
          }
        });

        ScrollTrigger.refresh();
      });
    });
  }

  /* ==================================================
     08. GALLERY FILTER & LIGHTBOX MODAL
  ================================================== */

  function initializeGallery() {
    const filterBtns = document.querySelectorAll(".gallery-filter-btn");
    const items = Array.from(document.querySelectorAll(".gallery-item"));

    if (filterBtns.length > 0) {
      filterBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          filterBtns.forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");

          const filter = btn.dataset.galleryFilter;

          items.forEach((item) => {
            const cat = item.dataset.category;
            if (filter === "all" || cat === filter) {
              item.style.display = "";
              gsap.fromTo(item, { autoAlpha: 0, scale: 0.95 }, { autoAlpha: 1, scale: 1, duration: 0.4 });
            } else {
              item.style.display = "none";
            }
          });

          ScrollTrigger.refresh();
        });
      });
    }

    /* Lightbox Modal logic with full arrow & keyboard navigation */
    const modal = document.querySelector("#lightbox-modal");
    const closeBtn = document.querySelector("#lightbox-close");
    const prevBtn = document.querySelector("#lightbox-prev");
    const nextBtn = document.querySelector("#lightbox-next");
    const modalImg = document.querySelector("#lightbox-img");
    const modalTitle = document.querySelector("#lightbox-title");
    const modalTag = document.querySelector("#lightbox-tag");
    const modalSpecies = document.querySelector("#lightbox-species");
    const modalDesc = document.querySelector("#lightbox-desc");
    const modalCta = document.querySelector("#lightbox-cta");

    if (!modal || items.length === 0) return;

    let currentLightboxIndex = 0;

    const showLightboxItem = (index) => {
      currentLightboxIndex = (index + items.length) % items.length;
      const item = items[currentLightboxIndex];
      const img = item.querySelector("img");
      const title = item.dataset.title || "";
      const species = item.dataset.species || "";
      const location = item.dataset.location || "";
      const caption = item.dataset.caption || "";
      const category = item.dataset.category || "wild";

      if (modalImg && img) {
        modalImg.src = img.src;
        modalImg.alt = img.alt || title;
      }
      if (modalTitle) modalTitle.textContent = title;
      if (modalTag) modalTag.textContent = `${category.toUpperCase()} · ${location.toUpperCase()}`;
      if (modalSpecies) modalSpecies.textContent = species;
      if (modalDesc) modalDesc.textContent = caption;
      if (modalCta) {
        modalCta.href = `#booking`;
        modalCta.onclick = () => {
          closeModal();
          const destInput = document.querySelector("#form-destination");
          if (destInput) destInput.value = location;
        };
      }
    };

    items.forEach((item, index) => {
      item.addEventListener("click", () => {
        showLightboxItem(index);
        modal.classList.add("is-active");
        document.body.style.overflow = "hidden";
      });
    });

    const closeModal = () => {
      modal.classList.remove("is-active");
      document.body.style.overflow = "";
    };

    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (prevBtn) {
      prevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        showLightboxItem(currentLightboxIndex - 1);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        showLightboxItem(currentLightboxIndex + 1);
      });
    }

    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (!modal.classList.contains("is-active")) return;
      if (e.key === "Escape") {
        closeModal();
      } else if (e.key === "ArrowLeft") {
        showLightboxItem(currentLightboxIndex - 1);
      } else if (e.key === "ArrowRight") {
        showLightboxItem(currentLightboxIndex + 1);
      }
    });
  }

  /* ==================================================
     09. BOOKING FORM & DIRECT WHATSAPP / EMAIL
  ================================================== */

  function initializeBookingForm() {
    const form = document.querySelector("#expedition-form");
    const btnEmail = document.querySelector("#btn-submit-email");

    // Click handler for tour cards to pre-fill destination
    document.querySelectorAll(".expedition-link, .btn-secondary-teaser").forEach((link) => {
      link.addEventListener("click", () => {
        const tourName = link.dataset.tour;
        if (tourName) {
          const destInput = document.querySelector("#form-destination");
          if (destInput) {
            destInput.value = tourName;
          }
        }
      });
    });

    if (!form) return;

    // Submit via WhatsApp
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.querySelector("#form-name")?.value.trim() || "";
      const phone = document.querySelector("#form-phone")?.value.trim() || "";
      const email = document.querySelector("#form-email")?.value.trim() || "";
      const track = document.querySelector("#form-track")?.value || "";
      const destination = document.querySelector("#form-destination")?.value.trim() || "Not specified";
      const notes = document.querySelector("#form-notes")?.value.trim() || "None";

      const message = `Hello Vijay & Team VM Wild Expeditions,

I would like to enquire about an upcoming expedition departure:
• Name: ${name}
• WhatsApp / Phone: ${phone}
• Email: ${email}
• Photography Track: ${track}
• Destination / Dates: ${destination}
• Special Notes / Gear: ${notes}

Looking forward to hearing from you!`;

      const encoded = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/919087394546?text=${encoded}`;

      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    });

    // Submit via Email
    if (btnEmail) {
      btnEmail.addEventListener("click", () => {
        if (form && !form.reportValidity()) return;

        const name = document.querySelector("#form-name")?.value.trim() || "";
        const phone = document.querySelector("#form-phone")?.value.trim() || "";
        const email = document.querySelector("#form-email")?.value.trim() || "";
        const track = document.querySelector("#form-track")?.value || "";
        const destination = document.querySelector("#form-destination")?.value.trim() || "Not specified";
        const notes = document.querySelector("#form-notes")?.value.trim() || "None";

        const subject = encodeURIComponent(`Expedition Enquiry — ${name} (${destination})`);
        const body = encodeURIComponent(`Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nTrack: ${track}\nDestination / Dates: ${destination}\nNotes: ${notes}`);

        window.location.href = `mailto:admissions@vmwild.com?subject=${subject}&body=${body}`;
      });
    }
  }

  /* ==================================================
     10. MOBILE NAVIGATION TOGGLE & NAVBAR SCROLL
  ================================================== */

  function initializeNavbarScroll() {
    if (!navbar) return;
    const handleScroll = () => {
      const heroThreshold = trackWrapper
        ? trackWrapper.offsetTop + trackWrapper.offsetHeight - window.innerHeight * 0.4
        : window.innerHeight;

      if (window.scrollY > heroThreshold) {
        navbar.classList.add("is-scrolled");
      } else {
        navbar.classList.remove("is-scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
  }

  function initializeMobileNav() {
    if (!navToggle || !mobileNav) return;

    navToggle.addEventListener("click", () => {
      const isOpen = mobileNav.classList.toggle("is-open");
      navToggle.classList.toggle("is-active", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen);
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("is-open");
        navToggle.classList.remove("is-active");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileNav.classList.contains("is-open")) {
        mobileNav.classList.remove("is-open");
        navToggle.classList.remove("is-active");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  }

  /* ==================================================
     11. SMOOTH ANCHOR NAVIGATION, SCROLL SPY & HOME RESET
  ================================================== */

  function initializeSmoothNavScroll() {
    const navLinks = document.querySelectorAll(".nav-links .nav-link, .nav-links a");

    const updateNavActive = (activeHref) => {
      navLinks.forEach((link) => {
        if (link.getAttribute("href") === activeHref) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    };

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (!href || href === "#") return;

        e.preventDefault();

        // Clicking Home or Our World
        if (href === "#home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          if (history.replaceState) {
            history.replaceState(null, null, window.location.pathname + window.location.search);
          }
          if (fg1) gsap.to(fg1, { opacity: 1, y: 0, duration: 0.35, overwrite: "auto" });
          if (bg1) gsap.to(bg1, { opacity: 1, duration: 0.35, overwrite: "auto" });
          if (fg2) gsap.to(fg2, { opacity: 0, y: 40, duration: 0.35, overwrite: "auto" });
          if (fg3) gsap.to(fg3, { opacity: 0, y: 40, duration: 0.35, overwrite: "auto" });
          if (bg2) gsap.to(bg2, { opacity: 0, duration: 0.35, overwrite: "auto" });
          if (bg3) gsap.to(bg3, { opacity: 0, duration: 0.35, overwrite: "auto" });
          updateSceneProgress(0);
          updateNavActive("#home");
          return;
        }

        // Clicking The Philosophy
        if (href === "#world") {
          const trackTop = trackWrapper ? trackWrapper.offsetTop : 0;
          const trackHeight = trackWrapper ? (trackWrapper.offsetHeight - window.innerHeight) : 0;
          window.scrollTo({ top: trackTop + trackHeight * 0.42, behavior: "smooth" });
          if (history.replaceState) history.replaceState(null, null, "#world");
          updateNavActive("#home");
          return;
        }

        // Other content sections
        const target = document.querySelector(href);
        if (target) {
          const navOffset = 60;
          const targetY = target.offsetTop - navOffset;
          window.scrollTo({ top: targetY, behavior: "smooth" });
          if (history.replaceState) history.replaceState(null, null, href);
          if (href === "#reviews" || href === "#pillars" || href === "#policy") {
            updateNavActive("#reviews");
          } else {
            updateNavActive(href);
          }
        }
      });
    });

    // Content sections for Scroll Spy
    const spySections = [
      { id: "#booking", el: document.querySelector("#booking") },
      { id: "#policy", el: document.querySelector("#policy") },
      { id: "#reviews", el: document.querySelector("#reviews") },
      { id: "#pillars", el: document.querySelector("#pillars") },
      { id: "#mentors", el: document.querySelector("#mentors") },
      { id: "#gallery", el: document.querySelector("#gallery") },
      { id: "#expeditions", el: document.querySelector("#expeditions") },
    ];

    window.addEventListener("scroll", () => {
      const scrollPos = window.scrollY;

      // 1. At or near top (Home intro scene)
      if (scrollPos <= 80) {
        if (window.location.hash && history.replaceState) {
          history.replaceState(null, null, window.location.pathname + window.location.search);
        }
        updateNavActive("#home");
        updateSceneProgress(0);
        if (fg1) gsap.set(fg1, { opacity: 1, y: 0, pointerEvents: "auto" });
        if (bg1) gsap.set(bg1, { opacity: 1 });
        if (bg2) gsap.set(bg2, { opacity: 0 });
        if (bg3) gsap.set(bg3, { opacity: 0 });
        if (fg2) gsap.set(fg2, { opacity: 0, y: 40, pointerEvents: "none" });
        if (fg3) gsap.set(fg3, { opacity: 0, y: 40, pointerEvents: "none" });
        return;
      }

      // 2. Inside the Hero Pinned Track
      const heroTrackEnd = trackWrapper
        ? trackWrapper.offsetTop + trackWrapper.offsetHeight - window.innerHeight * 0.25
        : 1000;
      if (scrollPos < heroTrackEnd) {
        updateNavActive("#home");
        return;
      }

      // 3. Spy on sections below the hero (viewport-relative, zero offsetParent bugs)
      for (const sec of spySections) {
        if (sec.el) {
          const rect = sec.el.getBoundingClientRect();
          if (rect.top <= 160) {
            if (sec.id === "#reviews" || sec.id === "#pillars" || sec.id === "#policy") {
              updateNavActive("#reviews");
            } else {
              updateNavActive(sec.id);
            }
            break;
          }
        }
      }
    }, { passive: true });
  }

  /* ==================================================
     12. INITIALIZE ALL MODULES
  ================================================== */

  initializeNavbarScroll();
  initializeSmoothNavScroll();
  initializeHeroParallax();
  initializeMobileNav();
  initializeExpeditionTabs();
  initializeGallery();
  initializeBookingForm();

  startWebsite();
});
