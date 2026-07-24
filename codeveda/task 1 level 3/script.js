gsap.registerPlugin(ScrollTrigger);

// Slide up and fade in the content box when it scrolls into view
gsap.from(".content-box", {
  y: 100,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out",
  
  scrollTrigger: {
    trigger: ".scroll-section",
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play none none reverse",
  }
});

const btn = document.querySelector(".interactive-btn");

// Custom hover animation instead of CSS transitions
btn.addEventListener("mouseenter", () => {
  gsap.to(btn, {
    scale: 1.05,
    backgroundColor: "#81d4fa",
    duration: 0.3,
    ease: "back.out(1.5)"
  });
});

btn.addEventListener("mouseleave", () => {
  gsap.to(btn, {
    scale: 1,
    backgroundColor: "#b3e5fc",
    duration: 0.3,
    ease: "power2.out"
  });
});
