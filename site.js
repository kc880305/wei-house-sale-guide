document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector("[data-case-carousel]");
  const dots = [...document.querySelectorAll(".carousel-dots i")];

  if (carousel && dots.length) {
    const updateDots = () => {
      const cards = [...carousel.children];
      const center = carousel.scrollLeft + carousel.clientWidth / 2;
      let active = 0;
      let distance = Infinity;

      cards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const nextDistance = Math.abs(cardCenter - center);
        if (nextDistance < distance) {
          distance = nextDistance;
          active = index;
        }
      });

      dots.forEach((dot, index) => dot.classList.toggle("active", index === active));
    };

    carousel.addEventListener("scroll", updateDots, { passive: true });
    updateDots();
  }

  const lightbox = document.querySelector("[data-lightbox]");
  const lightboxImage = lightbox?.querySelector("img");
  const lightboxCaption = lightbox?.querySelector("p");
  const closeButton = lightbox?.querySelector(".lightbox-close");

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.hidden = true;
    document.body.classList.remove("lightbox-open");
  };

  document.querySelectorAll(".lightbox-trigger").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      if (!lightbox || !lightboxImage || !lightboxCaption) return;
      lightboxImage.src = trigger.dataset.lightboxSrc || "";
      lightboxImage.alt = trigger.dataset.lightboxCaption || "物件照片";
      lightboxCaption.textContent = trigger.dataset.lightboxCaption || "";
      lightbox.hidden = false;
      document.body.classList.add("lightbox-open");
      closeButton?.focus();
    });
  });

  closeButton?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox && !lightbox.hidden) closeLightbox();
  });
});
