/* Small, dependency-free interactions for the portfolio. */
(() => {
  const typed = document.getElementById("typed");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (typed && !reducedMotion) {
    const words = ["food innovation", "product development", "food safety and quality"];
    let wordIndex = 0;
    let charIndex = words[0].length;
    let deleting = false;

    const type = () => {
      const word = words[wordIndex];
      typed.textContent = word.slice(0, charIndex);

      let delay = deleting ? 42 : 78;
      if (!deleting && charIndex === word.length) {
        deleting = true;
        delay = 1500;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 350;
      }
      charIndex += deleting ? -1 : 1;
      window.setTimeout(type, delay);
    };

    window.setTimeout(type, 1500);
  }

  const toggle = document.getElementById("menuToggle");
  const links = document.getElementById("navLinks");

  if (toggle && links) {
    const closeMenu = () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation menu");
    };

    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    });

    links.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 640) closeMenu();
    });
  }

  // Keep images visible in their reserved space if a file is unavailable;
  // log the broken path for easy troubleshooting instead of removing content.
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", () => {
      img.dataset.imageError = "true";
      console.warn("Portfolio image could not be loaded:", img.getAttribute("src"));
    });
  });
})();
