window.PortfolioHero = (() => {
  let entryScreen;
  let enterWithSound;
  let enterMuted;
  let spotlightTargets = [];
  let animationFrame = 0;
  let pointerX = 0;
  let pointerY = 0;

  const toneClasses = [
    "is-tone-zh",
    "is-tone-fr",
    "is-tone-en",
    "is-tone-actions"
  ];

  function init() {
    entryScreen = document.querySelector("#entryScreen");
    enterWithSound = document.querySelector("#enterWithSound");
    enterMuted = document.querySelector("#enterMuted");

    initSpotlight();
    initColorStates();

    enterWithSound?.addEventListener("click", async () => {
      await window.PortfolioAudio?.setEnabled(true, true);
      enter();
    });

    enterMuted?.addEventListener("click", async () => {
      await window.PortfolioAudio?.setEnabled(false, true);
      enter();
    });
  }

  function initSpotlight() {
    if (!entryScreen) {
      return;
    }

    spotlightTargets = Array.from(
      entryScreen.querySelectorAll(
        [
          ".entry-screen__content > .eyebrow",
          ".entry-screen__content > h1",
          ".entry-screen__translation",
          ".entry-screen__note"
        ].join(",")
      )
    );

    entryScreen.addEventListener("mousemove", handlePointerMove, {
      passive: true
    });

    entryScreen.addEventListener("mouseleave", handleEntryLeave);

    window.addEventListener("resize", queueSpotlightUpdate, {
      passive: true
    });
  }

  function initColorStates() {
    bindTone("#entryTitle", "is-tone-zh");

    bindTone(
      ".entry-screen__translation--fr",
      "is-tone-fr"
    );

    bindTone(
      ".entry-screen__translation--en",
      "is-tone-en"
    );

    bindTone(
      ".entry-screen__actions",
      "is-tone-actions"
    );
  }

  function bindTone(selector, toneClass) {
    const element = entryScreen?.querySelector(selector);

    if (!element) {
      return;
    }

    element.addEventListener("mouseenter", () => {
      setTone(toneClass);
    });

    element.addEventListener("mouseleave", () => {
      clearTone();
    });

    element.addEventListener("focusin", () => {
      setTone(toneClass);
    });

    element.addEventListener("focusout", () => {
      clearTone();
    });
  }

  function setTone(toneClass) {
    if (!entryScreen) {
      return;
    }

    entryScreen.classList.remove(...toneClasses);
    entryScreen.classList.add(toneClass);
  }

  function clearTone() {
    entryScreen?.classList.remove(...toneClasses);
  }

  function handlePointerMove(event) {
    pointerX = event.clientX;
    pointerY = event.clientY;

    entryScreen.classList.add("has-pointer-spotlight");
    queueSpotlightUpdate();
  }

  function queueSpotlightUpdate() {
    if (animationFrame) {
      return;
    }

    animationFrame = window.requestAnimationFrame(updateSpotlight);
  }

  function updateSpotlight() {
    animationFrame = 0;

    if (!entryScreen) {
      return;
    }

    entryScreen.style.setProperty(
      "--spotlight-screen-x",
      `${pointerX}px`
    );

    entryScreen.style.setProperty(
      "--spotlight-screen-y",
      `${pointerY}px`
    );

    spotlightTargets.forEach((target) => {
      const rect = target.getBoundingClientRect();

      target.style.setProperty(
        "--spotlight-local-x",
        `${pointerX - rect.left}px`
      );

      target.style.setProperty(
        "--spotlight-local-y",
        `${pointerY - rect.top}px`
      );
    });
  }

  function handleEntryLeave() {
    entryScreen?.classList.remove("has-pointer-spotlight");
    clearTone();
  }

  function enter() {
    if (!entryScreen) {
      return;
    }

    entryScreen.classList.add("is-hidden");

    window.setTimeout(() => {
      entryScreen.hidden = true;

      document.querySelector("#hero")?.focus({
        preventScroll: true
      });
    }, 1100);
  }

  return {
    init
  };
})();
