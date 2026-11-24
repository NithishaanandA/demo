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
      ? bgImg1.decode().catch(() => {})
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
       MASTER TIMELINE (Total Duration = 10 units)
       Scrubbed across the height of trackWrapper
    ------------------------------------------ */
    const storyTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: trackWrapper,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
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
       SCENE 1 (0% – 30% Scroll Progress, Time: 0.0 -> 3.0)
    -------------------------------------------------- */
    // Slow de-scale on tiger hero image from 1.06 to 1.0
    storyTimeline.to(
      bgImg1,
      {
        scale: 1.0,
        ease: "none",
        duration: 2.2,
      },
      0,
    );

    // Active Plateau 1: Hold foreground 1 visible until time 2.0
    // Exit Scene 1: time 2.2 -> 3.0
    storyTimeline.to(
      fg1,
      {
        opacity: 0,
        y: -30,
        ease: "power2.in",
        duration: 0.8,
        onComplete: () => {
          fg1.style.pointerEvents = "none";
        },
        onReverseComplete: () => {
          fg1.style.pointerEvents = "auto";
        },
      },
      2.2,
    );

    storyTimeline.to(
      bg1,
      {
        opacity: 0,
        ease: "none",
        duration: 0.8,
      },
      2.2,
    );

    /* --------------------------------------------------
       SCENE 2 (30% – 65% Scroll Progress, Time: 3.0 -> 6.5)
    -------------------------------------------------- */
    // Enter Scene 2 Background: time 2.2 -> 3.2
    storyTimeline.to(
      bg2,
      {
        opacity: 1,
        ease: "none",
        duration: 1.0,
      },
      2.2,
    );

    storyTimeline.to(
      bgImg2,
      {
        scale: 1.0,
        ease: "none",
        duration: 1.5,
      },
      2.2,
    );

    // Enter Scene 2 Foreground: time 2.4 -> 3.4
    storyTimeline.to(
      fg2,
      {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        duration: 1.0,
        onStart: () => {
          fg2.style.pointerEvents = "auto";
        },
        onReverseComplete: () => {
          fg2.style.pointerEvents = "none";
        },
      },
      2.4,
    );

    // Active Plateau 2: Hold Scene 2 visible from time 3.4 to 5.4!
    // Exit Scene 2: time 5.4 -> 6.4
    storyTimeline.to(
      fg2,
      {
        opacity: 0,
        y: -30,
        ease: "power2.in",
        duration: 0.8,
        onComplete: () => {
          fg2.style.pointerEvents = "none";
        },
        onReverseComplete: () => {
          fg2.style.pointerEvents = "auto";
        },
      },
      5.4,
    );

    storyTimeline.to(
      bg2,
      {
        opacity: 0,
        ease: "none",
        duration: 0.8,
      },
      5.4,
    );

    /* --------------------------------------------------
       SCENE 3 (65% – 95% Scroll Progress, Time: 6.5 -> 9.5)
    -------------------------------------------------- */
    // Enter Scene 3 Background: time 5.4 -> 6.4
    storyTimeline.to(
      bg3,
      {
        opacity: 1,
        ease: "none",
        duration: 1.0,
      },
      5.4,
    );

    storyTimeline.to(
      bgImg3,
      {
        scale: 1.0,
        ease: "none",
        duration: 1.5,
      },
      5.4,
    );

    // Enter Scene 3 Foreground: time 5.6 -> 6.6
    storyTimeline.to(
      fg3,
      {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        duration: 1.0,
        onStart: () => {
          fg3.style.pointerEvents = "auto";
        },
        onReverseComplete: () => {
          fg3.style.pointerEvents = "none";
        },
      },
      5.6,
    );

    // Active Plateau 3: Hold Scene 3 visible from time 6.6 to 8.8!
    // Exit Scene 3 / Transition to Scene 4 (95% - 100%):
    // The sticky stage reaches its bottom boundary and cleanly scrolls up into #expeditions
    storyTimeline.to(
      fg3,
      {
        opacity: 0.5,
        y: -15,
        ease: "power1.in",
        duration: 1.0,
      },
      8.8,
    );

    ScrollTrigger.refresh();
  }

  /* ------------------------------------------
     UPDATE ACTIVE SCENE PILL INDICATOR
  ------------------------------------------ */
  function updateSceneProgress(progress) {
    let currentScene = 1;
    if (progress >= 0.30 && progress < 0.65) {
      currentScene = 2;
    } else if (progress >= 0.65) {
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
        targetScroll = trackTop + trackHeight * 0.45;
      } else if (sceneIndex === 3) {
        targetScroll = trackTop + trackHeight * 0.80;
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
       CINEMATIC APERTURE PORTAL TRANSITION
       Smooth scrubbed zoom & optical iris expansion
       connecting Expeditions to Gallery
    ------------------------------------------ */
    const aperturePortal = document.querySelector("#aperture-portal");
    const apertureMask = document.querySelector("#aperture-mask");
    const apertureImg = document.querySelector(".aperture-media-img");
    const hudOverlay = document.querySelector(".hud-narrative-overlay");
    const hudCrosshair = document.querySelector(".hud-crosshair");
    const hudBrackets = document.querySelectorAll(".hud-bracket");

    if (aperturePortal && apertureMask && apertureImg) {
      const apertureTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: aperturePortal,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // Expand lens mask from centered optical viewfinder frame to 100% full bleed
      apertureTimeline.to(
        apertureMask,
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          borderColor: "rgba(197, 166, 106, 0.0)",
          boxShadow: "0 0 0px rgba(0, 0, 0, 0)",
          ease: "none",
          duration: 3,
        },
        0
      );

      // De-scale and increase clarity of the optical image
      apertureTimeline.to(
        apertureImg,
        {
          scale: 1.0,
          filter: "brightness(0.95) contrast(1.05)",
          ease: "none",
          duration: 3,
        },
        0
      );

      // Fade out narrative overlay as viewport expands
      if (hudOverlay) {
        apertureTimeline.to(
          hudOverlay,
          {
            opacity: 0,
            y: -50,
            scale: 0.95,
            ease: "power2.in",
            duration: 1.2,
          },
          1.0
        );
      }

      // Optical crosshair locks and expands away
      if (hudCrosshair) {
        apertureTimeline.to(
          hudCrosshair,
          {
            opacity: 0,
            scale: 2.2,
            ease: "power2.in",
            duration: 1.2,
          },
          1.2
        );
      }

      if (hudBrackets.length) {
        apertureTimeline.to(
          hudBrackets,
          {
            opacity: 0,
            scale: 1.4,
            ease: "power2.in",
            duration: 1.2,
          },
          1.4
        );
      }
    }

    /* ------------------------------------------
       GALLERY ITEMS STAGGERED REVEAL
    ------------------------------------------ */
    const galleryItems = gsap.utils.toArray(".gallery-reveal");

    ScrollTrigger.batch(galleryItems, {
      start: "top 88%",
      onEnter: (batch) => {
        gsap.to(batch, {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.08,
          duration: 0.8,
          ease: "power2.out",
        });
      },
      onLeaveBack: (batch) => {
        gsap.to(batch, {
          autoAlpha: 0,
          y: 40,
          filter: "blur(8px)",
          stagger: 0.04,
          duration: 0.5,
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
        tabBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

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
    const items = document.querySelectorAll(".gallery-item");

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

    /* Lightbox Modal logic */
    const modal = document.querySelector("#lightbox-modal");
    const closeBtn = document.querySelector("#lightbox-close");
    const modalImg = document.querySelector("#lightbox-img");
    const modalTitle = document.querySelector("#lightbox-title");
    const modalTag = document.querySelector("#lightbox-tag");
    const modalSpecies = document.querySelector("#lightbox-species");
    const modalDesc = document.querySelector("#lightbox-desc");
    const modalGear = document.querySelector("#lightbox-gear");
    const modalCta = document.querySelector("#lightbox-cta");

    if (!modal) return;

    items.forEach((item) => {
      item.addEventListener("click", () => {
        const img = item.querySelector("img");
        const title = item.dataset.title;
        const species = item.dataset.species;
        const location = item.dataset.location;
        const gear = item.dataset.gear;
        const caption = item.dataset.caption;
        const category = item.dataset.category;

        modalImg.src = img.src;
        modalImg.alt = img.alt;
        modalTitle.textContent = title;
        modalTag.textContent = `${category.toUpperCase()} · ${location.toUpperCase()}`;
        modalSpecies.textContent = species;
        modalDesc.textContent = caption;
        modalGear.textContent = gear;

        modalCta.href = `#booking`;
        modalCta.onclick = () => {
          modal.classList.remove("is-active");
          const destInput = document.querySelector("#form-destination");
          if (destInput) destInput.value = location;
        };

        modal.classList.add("is-active");
        document.body.style.overflow = "hidden";
      });
    });

    const closeModal = () => {
      modal.classList.remove("is-active");
      document.body.style.overflow = "";
    };

    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("is-active")) {
        closeModal();
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
  }

  /* ==================================================
     11. SMOOTH ANCHOR NAVIGATION & HOME RESET
  ================================================== */

  function initializeSmoothNavScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (!href || href === "#") return;

        e.preventDefault();

        if (href === "#home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          if (history.pushState) history.pushState(null, null, " ");
          return;
        }

        if (href === "#world") {
          const trackTop = trackWrapper ? trackWrapper.offsetTop : 0;
          const trackHeight = trackWrapper ? (trackWrapper.offsetHeight - window.innerHeight) : 0;
          window.scrollTo({ top: trackTop + trackHeight * 0.45, behavior: "smooth" });
          if (history.pushState) history.pushState(null, null, "#world");
          return;
        }

        const target = document.querySelector(href);
        if (target) {
          const navOffset = 70;
          const targetY = target.getBoundingClientRect().top + window.pageYOffset - navOffset;
          window.scrollTo({ top: targetY, behavior: "smooth" });
          if (history.pushState) history.pushState(null, null, href);
        }
      });
    });

    window.addEventListener("scroll", () => {
      if (window.scrollY === 0) {
        updateSceneProgress(0);
        if (fg1) gsap.set(fg1, { opacity: 1, y: 0, pointerEvents: "auto" });
        if (bg1) gsap.set(bg1, { opacity: 1 });
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
