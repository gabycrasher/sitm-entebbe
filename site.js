document.addEventListener("DOMContentLoaded", () => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const header = document.querySelector(".site-header"),
    hero = document.querySelector(".hero"),
    home = document.querySelector("main");
  if (hero)
    hero.insertAdjacentHTML(
      "afterbegin",
      '<div class="noise-overlay"></div><div class="hero-blob"></div><div class="hero-orbit"></div>',
    );
  const firstGrid = document.querySelector(".section-alt .grid-3");
  if (firstGrid) firstGrid.classList.add("bento-grid");
  const image = document.querySelector(".image-panel");
  if (image) image.classList.add("parallax-panel");
  if (home && !document.querySelector(".accreditation-ticker"))
    home.insertAdjacentHTML(
      "afterbegin",
      '<section class="accreditation-ticker"><div class="ticker-track"><span>NCHE-ACCREDITED</span><span>MKCL ERA LEARNING FRAMEWORK</span><span>40 CERTIFICATE PROGRAMMES</span><span>BAKULI–MENGO &amp; ENTEBBE</span><span>NCHE-ACCREDITED</span><span>MKCL ERA LEARNING FRAMEWORK</span><span>40 CERTIFICATE PROGRAMMES</span><span>BAKULI–MENGO &amp; ENTEBBE</span></div></section>',
    );
  const revealItems = document.querySelectorAll(
    ".section-head,.feature,.track,.programme,.campus-card,.learning-item,.step,.split > *,.story-card",
  );
  revealItems.forEach((item, index) => {
    item.dataset.reveal = "";
    if (
      item.matches(
        ".feature,.track,.programme,.campus-card,.learning-item,.step",
      )
    )
      item.classList.add("card-lift");
    item.style.transitionDelay = `${Math.min(index % 3, 2) * 80}ms`;
  });
  if (reduce || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 },
    );
    revealItems.forEach((item) => observer.observe(item));
  }
  const animateCount = (stat) => {
    const el = stat.querySelector("b");
    if (!el || el.dataset.counted) return;
    const raw = el.textContent.trim(),
      match = raw.match(/\d+/);
    if (!match) return;
    const target = Number(match[0]),
      prefix = raw.slice(0, match.index),
      suffix = raw.slice((match.index || 0) + match[0].length),
      start = performance.now();
    el.dataset.counted = "1";
    const frame = (now) => {
      const p = Math.min((now - start) / 900, 1),
        value = Math.round(target * (1 - Math.pow(1 - p, 3)));
      el.textContent = `${prefix}${value}${suffix}`;
      if (p < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  };
  const stats = document.querySelector(".stats");
  if (stats) {
    if (reduce) stats.querySelectorAll(".stat").forEach(animateCount);
    else
      new IntersectionObserver(
        (es) =>
          es.forEach((e) => {
            if (e.isIntersecting)
              e.target.querySelectorAll(".stat").forEach(animateCount);
          }),
        { threshold: 0.4 },
      ).observe(stats);
  }
  document.querySelectorAll(".track,.feature").forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      if (reduce) return;
      const r = card.getBoundingClientRect(),
        x = (event.clientX - r.left) / r.width - 0.5,
        y = (event.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${-y * 4}deg) rotateY(${x * 5}deg) translateY(-7px)`;
    });
    card.addEventListener("mouseleave", () => (card.style.transform = ""));
  });
  window.addEventListener(
    "scroll",
    () => {
      header?.classList.toggle("is-scrolled", scrollY > 12);
      if (image && !reduce)
        image.style.transform = `translateY(${Math.min(scrollY * 0.045, 32)}px)`;
    },
    { passive: true },
  );
});
/**
 * Shared front-end interactions: navigation, ticker, reveal effects and card motion.
 */
