(() => {
  function safelyRun(label, callback) {
    try {
      callback();
    } catch (error) {
      console.error(`${label} 初始化失败：`, error);
    }
  }

  function init() {
    safelyRun("声音系统", () => window.PortfolioAudio?.init());
    safelyRun("作品弹层", () => window.PortfolioLightbox?.init());
    safelyRun("内容渲染", () => window.PortfolioRenderer?.init());
    safelyRun("首屏", () => window.PortfolioHero?.init());
    safelyRun("滚动效果", () => window.PortfolioScrollEffects?.init());

    const year = document.querySelector("#currentYear");
    if (year) {
      year.textContent = String(new Date().getFullYear());
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
