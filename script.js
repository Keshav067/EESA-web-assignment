// ======================================================
//                  EVENT SLIDER
// ======================================================

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const slider = document.querySelector(".slider");

let currentSlide = 0;
let autoSlide;

// ================= SHOW SLIDE =================

function showSlide(index) {

    if (slides.length === 0) return;

    if (index >= slides.length)
        currentSlide = 0;
    else if (index < 0)
        currentSlide = slides.length - 1;
    else
        currentSlide = index;

    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    slides[currentSlide].classList.add("active");

    if (dots[currentSlide])
        dots[currentSlide].classList.add("active");

}

// ================= NEXT / PREVIOUS =================

function nextSlide() {

    showSlide(currentSlide + 1);

}

function prevSlide() {

    showSlide(currentSlide - 1);

}

// ================= BUTTONS =================

if (nextBtn && prevBtn) {

    nextBtn.addEventListener("click", nextSlide);

    prevBtn.addEventListener("click", prevSlide);

}

// ================= DOTS =================

dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        showSlide(index);

        restartAutoSlide();

    });

});

// ================= AUTO SLIDER =================

function startAutoSlide() {

    autoSlide = setInterval(nextSlide, 5000);

}

function stopAutoSlide() {

    clearInterval(autoSlide);

}

function restartAutoSlide() {

    stopAutoSlide();

    startAutoSlide();

}

if (slider) {

    startAutoSlide();

    slider.addEventListener("mouseenter", stopAutoSlide);

    slider.addEventListener("mouseleave", startAutoSlide);

}

// ================= TOUCH SWIPE =================

let touchStartX = 0;
let touchEndX = 0;

if (slider) {

    slider.addEventListener("touchstart", e => {

        touchStartX = e.changedTouches[0].screenX;

    });

    slider.addEventListener("touchend", e => {

        touchEndX = e.changedTouches[0].screenX;

        if (touchStartX - touchEndX > 50) {

            nextSlide();

            restartAutoSlide();

        }

        else if (touchEndX - touchStartX > 50) {

            prevSlide();

            restartAutoSlide();

        }

    });

}

// ======================================================
//                  NAVBAR
// ======================================================

const navbar = document.querySelector(".navbar");

let lastScroll = 0;

window.addEventListener("scroll", () => {

    if (!navbar) return;

    const currentScroll = window.pageYOffset;

    if (currentScroll > 20) {

        navbar.style.background = "rgba(8,17,31,.97)";
        navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,.35)";

    }

    else {

        navbar.style.background = "rgba(8,17,31,.92)";
        navbar.style.boxShadow = "none";

    }

    if (currentScroll > lastScroll && currentScroll > 100)

        navbar.classList.add("hide");

    else

        navbar.classList.remove("hide");

    lastScroll = currentScroll;

});

// ======================================================
//              HERO BUTTON
// ======================================================

const heroButton = document.querySelector(".hero-btn");

if (heroButton) {

    heroButton.addEventListener("click", e => {

        e.preventDefault();

        document.querySelector("#events").scrollIntoView({

            behavior: "smooth"

        });

    });

}

// ======================================================
//              COUNCIL MODAL
// ======================================================

const modal = document.getElementById("councilModal");

if (modal) {

    const openBtn = document.getElementById("viewCouncil");

    const closeBtn = document.querySelector(".close");

    openBtn.addEventListener("click", () => {

        modal.classList.add("show");

        document.body.style.overflow = "hidden";

    });

    closeBtn.addEventListener("click", () => {

        modal.classList.remove("show");

        document.body.style.overflow = "auto";

    });

    window.addEventListener("click", e => {

        if (e.target === modal) {

            modal.classList.remove("show");

            document.body.style.overflow = "auto";

        }

    });

}

// ======================================================
//              QUICK ACCESS HOVER
// ======================================================

document.querySelectorAll(".quick-card").forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-10px) scale(1.03)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});

// ======================================================
//              ACTIVE NAV LINK
// ======================================================

const currentPage = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll(".nav-links a").forEach(link => {

    if (link.getAttribute("href") === currentPage)

        link.classList.add("active");

});

// ======================================================
//              SCROLL ANIMATION
// ======================================================

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting)

            entry.target.classList.add("show-section");

    });

}, {

    threshold: 0.15

});

document.querySelectorAll("section").forEach(section => {

    observer.observe(section);

});

// ======================================================
//              BLOG BUTTON EFFECT
// ======================================================

document.querySelectorAll(".blog-btn").forEach(button => {

    button.addEventListener("click", () => {

        button.style.transform = "scale(.95)";

        setTimeout(() => {

            button.style.transform = "";

        }, 150);

    });

});

// ======================================================
//              INITIALIZE
// ======================================================

if (slides.length > 0)

    showSlide(0);