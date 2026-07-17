window.PortfolioScrollEffects = (() => {
  function init() {
    const header = document.querySelector("#siteHeader");
    const revealItems = document.querySelectorAll(".reveal");

    const updateHeader = () => {
      header?.classList.toggle("is-scrolled", window.scrollY > 20);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    if (window.PortfolioAccessibility?.prefersReducedMotion()) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px"
      }
    );

    revealItems.forEach((item) => observer.observe(item));
  }

  return {
    init
  };
})();
