window.PortfolioAudio = (() => {
  const STORAGE_KEY = "visual-world-sound-enabled";
  let audio;
  let toggle;
  let toggleText;
  let soundEnabled = false;
  let targetVolume = 0.12;
  let fadeTimer = null;

  function init() {
    audio = document.querySelector("#ambientAudio");
    toggle = document.querySelector("#soundToggle");
    toggleText = document.querySelector("#soundToggleText");

    if (!audio || !toggle || !toggleText) {
      return;
    }

    soundEnabled = localStorage.getItem(STORAGE_KEY) === "true";
    audio.volume = 0;
    updateControl();

    toggle.addEventListener("click", () => {
      setEnabled(!soundEnabled, true);
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden && !audio.paused) {
        fadeTo(0, 350, () => audio.pause());
      } else if (!document.hidden && soundEnabled) {
        playSafely();
      }
    });

    document.addEventListener("portfolio:video-play", duck);
    document.addEventListener("portfolio:video-stop", restore);
  }

  function updateControl(message) {
    if (!toggle || !toggleText) {
      return;
    }

    toggle.setAttribute("aria-pressed", String(soundEnabled));
    toggle.setAttribute("aria-label", soundEnabled ? "关闭背景声音" : "开启背景声音");
    toggleText.textContent = message || (soundEnabled ? "声音开启" : "声音关闭");
  }

  async function playSafely() {
    if (!audio) {
      return false;
    }

    try {
      await audio.play();
      fadeTo(targetVolume, 900);
      updateControl();
      return true;
    } catch (error) {
      soundEnabled = false;
      localStorage.setItem(STORAGE_KEY, "false");
      updateControl("暂未放入音频");
      console.info("背景音频未播放。请将有授权的 ambient.mp3 放入 assets/audio/。");
      return false;
    }
  }

  async function setEnabled(enabled, remember = true) {
    soundEnabled = Boolean(enabled);

    if (remember) {
      localStorage.setItem(STORAGE_KEY, String(soundEnabled));
    }

    updateControl();

    if (soundEnabled) {
      await playSafely();
      return;
    }

    fadeTo(0, 500, () => {
      if (audio) {
        audio.pause();
      }
    });
  }

  function fadeTo(nextVolume, duration = 500, done) {
    if (!audio) {
      return;
    }

    window.clearInterval(fadeTimer);

    const startVolume = audio.volume;
    const difference = nextVolume - startVolume;
    const startedAt = performance.now();

    fadeTimer = window.setInterval(() => {
      const elapsed = performance.now() - startedAt;
      const progress = Math.min(elapsed / duration, 1);
      audio.volume = Math.max(0, Math.min(1, startVolume + difference * progress));

      if (progress >= 1) {
        window.clearInterval(fadeTimer);
        fadeTimer = null;
        if (typeof done === "function") {
          done();
        }
      }
    }, 40);
  }

  function duck() {
    if (soundEnabled && audio && !audio.paused) {
      fadeTo(0.025, 450);
    }
  }

  function restore() {
    if (soundEnabled && audio) {
      if (audio.paused) {
        playSafely();
      } else {
        fadeTo(targetVolume, 650);
      }
    }
  }

  function isEnabled() {
    return soundEnabled;
  }

  return {
    init,
    setEnabled,
    isEnabled,
    duck,
    restore
  };
})();
