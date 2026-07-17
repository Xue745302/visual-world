window.PortfolioAccessibility = (() => {
  const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  function prefersReducedMotion() {
    return reduceMotionQuery.matches;
  }

  function bindEscape(callback) {
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        callback(event);
      }
    });
  }

  return {
    prefersReducedMotion,
    bindEscape
  };
})();
