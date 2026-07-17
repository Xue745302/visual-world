window.PortfolioLightbox = (() => {
  let dialog;
  let media;
  let title;
  let meta;
  let description;
  let closeButton;
  let prevButton;
  let nextButton;
  let items = [];
  let currentIndex = 0;
  let lastTrigger = null;

  function init() {
    dialog = document.querySelector("#lightbox");
    media = document.querySelector("#lightboxMedia");
    title = document.querySelector("#lightboxTitle");
    meta = document.querySelector("#lightboxMeta");
    description = document.querySelector("#lightboxDescription");
    closeButton = document.querySelector("#lightboxClose");
    prevButton = document.querySelector("#lightboxPrev");
    nextButton = document.querySelector("#lightboxNext");

    if (!dialog) {
      return;
    }

    closeButton?.addEventListener("click", close);
    prevButton?.addEventListener("click", () => move(-1));
    nextButton?.addEventListener("click", () => move(1));

    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) {
        close();
      }
    });

    dialog.addEventListener("close", handleClosed);

    document.addEventListener("keydown", (event) => {
      if (!dialog.open) {
        return;
      }

      if (event.key === "ArrowLeft") {
        move(-1);
      }

      if (event.key === "ArrowRight") {
        move(1);
      }
    });
  }

  function open(nextItems, index, trigger) {
    if (!dialog || !Array.isArray(nextItems) || nextItems.length === 0) {
      return;
    }

    items = nextItems;
    currentIndex = Math.max(0, Math.min(index, items.length - 1));
    lastTrigger = trigger || document.activeElement;
    render();

    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }

    document.body.classList.add("is-dialog-open");
    closeButton?.focus();
    document.dispatchEvent(new CustomEvent("portfolio:video-play"));
  }

  function close() {
    if (!dialog?.open) {
      return;
    }

    const activeVideo = media?.querySelector("video");
    if (activeVideo) {
      activeVideo.pause();
    }

    dialog.close();
  }

  function handleClosed() {
    document.body.classList.remove("is-dialog-open");
    document.dispatchEvent(new CustomEvent("portfolio:video-stop"));

    if (lastTrigger && typeof lastTrigger.focus === "function") {
      lastTrigger.focus();
    }
  }

  function move(step) {
    if (items.length < 2) {
      return;
    }

    currentIndex = (currentIndex + step + items.length) % items.length;
    render();
  }

  function render() {
    const item = items[currentIndex];
    if (!item || !media || !title || !meta || !description) {
      return;
    }

    media.replaceChildren();

    const hasVideo = typeof item.video === "string" && item.video.trim();
    const hasImage = typeof item.cover === "string" && item.cover.trim();

    if (hasVideo) {
      const video = document.createElement("video");
      video.controls = true;
      video.playsInline = true;
      video.preload = "metadata";
      video.src = item.video;
      video.addEventListener("play", () => {
        document.dispatchEvent(new CustomEvent("portfolio:video-play"));
      });
      video.addEventListener("pause", () => {
        document.dispatchEvent(new CustomEvent("portfolio:video-stop"));
      });
      media.append(video);
    } else if (hasImage) {
      const image = document.createElement("img");
      image.src = item.cover;
      image.alt = item.title || "作品图片";
      image.addEventListener("error", () => image.remove());
      media.append(image);
    }

    title.textContent = item.title || "未命名作品";
    meta.textContent = [item.year, item.status, item.subtitle].filter(Boolean).join(" · ");
    description.textContent = item.description || "暂无说明。";

    const manyItems = items.length > 1;
    prevButton.hidden = !manyItems;
    nextButton.hidden = !manyItems;
  }

  return {
    init,
    open,
    close
  };
})();
