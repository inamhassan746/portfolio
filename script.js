window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    setTimeout(() => {
        loader.classList.add("hidden");
    }, 800);
});

const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

if (window.matchMedia("(hover: hover)").matches) {
    let mouseX = 0,
        mouseY = 0;
    let outlineX = 0,
        outlineY = 0;

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursorDot.style.opacity = "1";
        cursorOutline.style.opacity = "1";

        cursorDot.style.left = `${mouseX - 4}px`;
        cursorDot.style.top = `${mouseY - 4}px`;
    });

    function animateOutline() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;

        cursorOutline.style.left = `${outlineX - 18}px`;
        cursorOutline.style.top = `${outlineY - 18}px`;

        requestAnimationFrame(animateOutline);
    }
    animateOutline();

    const interactiveElements = document.querySelectorAll("a, button, .btn, .experience-card, .project-card, .award-card, .volunteer-card, .conf-card, .detail-card, .membership-card, .interest-tag");

    interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => {
            cursorOutline.style.width = "50px";
            cursorOutline.style.height = "50px";
            cursorOutline.style.borderColor = "rgba(37, 99, 235, 0.6)";
        });
        el.addEventListener("mouseleave", () => {
            cursorOutline.style.width = "36px";
            cursorOutline.style.height = "36px";
            cursorOutline.style.borderColor = "rgba(37, 99, 235, 0.4)";
        });
    });
}

const navbar = document.getElementById("navbar");
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    if (scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

    if (scrollY > 500) {
        backToTop.classList.add("visible");
    } else {
        backToTop.classList.remove("visible");
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobileMenu.classList.toggle("active");
    document.body.style.overflow = mobileMenu.classList.contains("active") ? "hidden" : "";
});

document.querySelectorAll(".mobile-nav-link").forEach((link) => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        mobileMenu.classList.remove("active");
        document.body.style.overflow = "";
    });
});

const typingTexts = ["Food Safety & Quality", "Ingredient Functionality", "Food Processing", "Research & Innovation", "Community Impact"];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById("typingText");

function typeEffect() {
    const currentText = typingTexts[textIndex];

    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 80;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
}

typeEffect();

const observerOptions = {
    root: null,
    rootMargin: "0px 0px -80px 0px",
    threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            const siblings = entry.target.parentElement.querySelectorAll(".animate-on-scroll");
            let delay = 0;
            siblings.forEach((sibling, i) => {
                if (sibling === entry.target) {
                    delay = i * 100;
                }
            });

            setTimeout(
                () => {
                    entry.target.classList.add("animated");
                },
                Math.min(delay, 400),
            );

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    observer.observe(el);
});

function createParticles() {
    const particlesContainer = document.getElementById("particles");
    const particleCount = window.innerWidth > 768 ? 30 : 15;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.classList.add("particle");
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 15 + 10}s`;
        particle.style.animationDelay = `${Math.random() * 10}s`;
        particle.style.width = `${Math.random() * 4 + 2}px`;
        particle.style.height = particle.style.width;
        particlesContainer.appendChild(particle);
    }
}
createParticles();

function animateCounters() {
    const counters = document.querySelectorAll(".stat-number");

    counters.forEach((counter) => {
        const target = parseFloat(counter.getAttribute("data-count"));
        const isDecimal = target % 1 !== 0;
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = start + (target - start) * easeOut;

            if (isDecimal) {
                counter.textContent = current.toFixed(2);
            } else {
                counter.textContent = Math.floor(current);
            }

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }

        const counterObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        requestAnimationFrame(updateCounter);
                        counterObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 },
        );

        counterObserver.observe(counter);
    });
}
animateCounters();

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let current = "";
    const scrollY = window.scrollY;

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active-link");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active-link");
        }
    });
});

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    const mailtoLink = `mailto:inamhassan746@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.location.href = mailtoLink;

    contactForm.reset();
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    });
});

const profileImg = document.getElementById("profileImg");
profileImg.addEventListener("error", function () {
    this.style.display = "none";
    const parent = this.parentElement;
    parent.style.background = "linear-gradient(135deg, #2563eb, #7c3aed)";
    parent.style.display = "flex";
    parent.style.alignItems = "center";
    parent.style.justifyContent = "center";
    parent.innerHTML = '<span style="font-size: 80px; color: white; font-weight: 900; font-family: Playfair Display, serif;">IH</span>';
});
