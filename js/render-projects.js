window.PortfolioRenderer = (() => {
  const projects = Array.isArray(window.PORTFOLIO_PROJECTS)
    ? window.PORTFOLIO_PROJECTS
    : [];

  const characters = Array.isArray(window.PORTFOLIO_CHARACTERS)
    ? window.PORTFOLIO_CHARACTERS
    : [];

  function createImageOrPlaceholder(item, className) {
    const visual = document.createElement("div");
    visual.className = className;

    if (item.aspectRatio) {
      visual.style.setProperty("--card-ratio", item.aspectRatio);
    }

    if (item.accent) {
      visual.style.setProperty("--card-accent", item.accent);
      visual.style.setProperty("--character-accent", item.accent);
    }

    if (item.cover || item.portrait) {
      const image = document.createElement("img");
      image.src = item.cover || item.portrait;
      image.alt = item.title || item.name || "作品图片";
      image.loading = "lazy";
      image.addEventListener("error", () => image.remove());
      visual.append(image);
    }

    return visual;
  }

  function createTagList(tags) {
    const list = document.createElement("ul");
    list.className = "tag-list";

    (Array.isArray(tags) ? tags : []).forEach((tag) => {
      const item = document.createElement("li");
      item.textContent = tag;
      list.append(item);
    });

    return list;
  }

  function renderGrid(targetId, type) {
    const target = document.querySelector(`#${targetId}`);
    if (!target) {
      return;
    }

    const filtered = projects.filter((project) => project.type === type);

    if (filtered.length === 0) {
      target.innerHTML = '<p class="empty-state">暂无作品。请在 data/projects.js 中添加内容。</p>';
      return;
    }

    filtered.forEach((project, index) => {
      const article = document.createElement("article");
      article.className = "project-card reveal";

      const button = document.createElement("button");
      button.className = "project-card__button";
      button.type = "button";
      button.setAttribute("aria-label", `查看作品：${project.title}`);

      button.append(createImageOrPlaceholder(project, "project-card__visual"));

      const meta = document.createElement("div");
      meta.className = "project-card__meta";
      const year = document.createElement("span");
      year.textContent = project.year || "";
      const status = document.createElement("span");
      status.textContent = project.status || "";
      meta.append(year, status);

      const heading = document.createElement("h3");
      heading.textContent = project.title || "未命名作品";

      const text = document.createElement("p");
      text.className = "project-card__description";
      text.textContent = project.description || "";

      button.append(meta, heading, text);
      button.addEventListener("click", () => {
        const group = projects.filter((item) => item.type === type);
        const groupIndex = group.findIndex((item) => item.id === project.id);
        window.PortfolioLightbox?.open(group, groupIndex, button);
      });

      article.append(button);
      target.append(article);
    });
  }

  function renderSeries() {
    const target = document.querySelector("#originalSeries");
    if (!target) {
      return;
    }

    const series = projects.filter((project) => project.type === "original-series");

    if (series.length === 0) {
      target.innerHTML = '<p class="empty-state">暂无原创系列。请在 data/projects.js 中添加内容。</p>';
      return;
    }

    series.forEach((project, index) => {
      const article = document.createElement("article");
      article.className = "series-card reveal";

      const visual = document.createElement("button");
      visual.type = "button";
      visual.className = "series-card__visual";
      visual.setAttribute("aria-label", `查看系列：${project.title}`);

      const number = document.createElement("span");
      number.className = "series-card__index";
      number.textContent = `SERIES ${String(index + 1).padStart(2, "0")}`;
      visual.append(number);

      if (project.cover) {
        const image = document.createElement("img");
        image.src = project.cover;
        image.alt = project.title;
        image.loading = "lazy";
        image.addEventListener("error", () => image.remove());
        visual.append(image);
      }

      visual.addEventListener("click", () => {
        window.PortfolioLightbox?.open(series, index, visual);
      });

      const content = document.createElement("div");
      content.className = "series-card__content";

      const top = document.createElement("div");
      const eyebrow = document.createElement("p");
      eyebrow.className = "eyebrow";
      eyebrow.textContent = project.subtitle || "ORIGINAL SERIES";
      const heading = document.createElement("h3");
      heading.textContent = project.title;
      top.append(eyebrow, heading);

      const details = document.createElement("div");
      details.className = "series-card__details";
      const status = document.createElement("span");
      status.className = "series-card__status";
      status.textContent = [project.year, project.status].filter(Boolean).join(" · ");
      const description = document.createElement("p");
      description.textContent = project.description || "";
      details.append(status, description, createTagList(project.tags));

      content.append(top, details);
      article.append(visual, content);
      target.append(article);
    });
  }

  function renderCharacters() {
    const target = document.querySelector("#characterArchive");
    if (!target) {
      return;
    }

    if (characters.length === 0) {
      target.innerHTML = '<p class="empty-state">暂无角色档案。请在 data/characters.js 中添加内容。</p>';
      return;
    }

    characters.forEach((character) => {
      const article = document.createElement("article");
      article.className = "character-card reveal";

      article.append(createImageOrPlaceholder(character, "character-card__portrait"));

      const meta = document.createElement("p");
      meta.className = "character-card__meta";
      meta.textContent = character.realm || "未命名世界";

      const heading = document.createElement("h3");
      heading.textContent = character.name || "未命名角色";

      const quote = document.createElement("p");
      quote.textContent = `“${character.quote || "暂无角色语录。"}”`;

      const description = document.createElement("p");
      description.textContent = character.description || "";

      article.append(meta, heading, quote, description);
      target.append(article);
    });
  }

  function renderSiteData() {
    const site = window.PORTFOLIO_SITE || {};

    document.querySelectorAll("[data-site-name]").forEach((element) => {
      element.textContent = site.siteName || "VISUAL WORLD";
    });

    document.querySelectorAll("[data-artist-bio]").forEach((element) => {
      element.textContent = site.artistBio || "";
    });

    document.querySelectorAll("[data-contact-link]").forEach((element) => {
      element.textContent = site.contactLabel || "联系我";
      element.href = site.contactUrl || "#";
    });
  }

  function init() {
    renderSiteData();
    renderGrid("visualProjects", "visual-experiment");
    renderSeries();
    renderCharacters();
    renderGrid("commercialProjects", "commercial-project");
  }

  return {
    init
  };
})();
