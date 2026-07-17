window.PortfolioHero = (() => {
  let entryScreen;
  let enterWithSound;
  let enterMuted;

  function init() {
    entryScreen = document.querySelector("#entryScreen");
    enterWithSound = document.querySelector("#enterWithSound");
    enterMuted = document.querySelector("#enterMuted");

    enterWithSound?.addEventListener("click", async () => {
      await window.PortfolioAudio?.setEnabled(true, true);
      enter();
    });

    enterMuted?.addEventListener("click", async () => {
      await window.PortfolioAudio?.setEnabled(false, true);
      enter();
    });
  }

  function enter() {
    if (!entryScreen) {
      return;
    }

    entryScreen.classList.add("is-hidden");
    window.setTimeout(() => {
      entryScreen.hidden = true;
      document.querySelector("#hero")?.focus({ preventScroll: true });
    }, 1100);
  }

  return {
    init
  };
})();
