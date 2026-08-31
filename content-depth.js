document.addEventListener("DOMContentLoaded", () => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const heroTitle = document.querySelector(".hero h1");
  if (heroTitle && !reduce) {
    const text = heroTitle.textContent.trim().split(/\s+/);
    heroTitle.innerHTML = text
      .map((word, index) => `<span style="--word:${index}">${word}</span>`)
      .join(" ");
    heroTitle.classList.add("splitHeroText");
  }
  document.querySelectorAll(".spotlight-card").forEach((card) =>
    card.addEventListener("pointermove", (event) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--x", `${event.clientX - r.left}px`);
      card.style.setProperty("--y", `${event.clientY - r.top}px`);
    }),
  );
  const timeline = document.querySelector(".milestone-timeline");
  const progress = document.querySelector(".milestone-progress");
  if (timeline && progress && !reduce) {
    const update = () => {
      const box = timeline.getBoundingClientRect(),
        visible = Math.max(
          0,
          Math.min(box.height, innerHeight * 0.72 - box.top),
        );
      progress.style.height = `${visible}px`;
    };
    addEventListener("scroll", update, { passive: true });
    update();
  }
  document
    .querySelectorAll(".faq-question")
    .forEach((question) => question.addEventListener("click", () => {}));
});
/**
 * Home-page enhancements: milestone progress and visual reveal behaviour.
 */
