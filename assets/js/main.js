const date = document.getElementById('date');
date.innerHTML = new Date().getFullYear();

function toggleMenu(){
const sideMenu = document.getElementById('sideMenu');
const overlay = document.getElementById('navOverlay');
const mainContent = document.getElementById('mainContent');

const isOpen = sideMenu.classList.toggle('open');
if(isOpen){
  overlay.style.display = 'block';
  mainContent.classList.add('blurred');
}
else{
  overlay.style.display = 'none';
  mainContent.classList.remove('blurred');
}
}

// Fixed Navbar 
const navbar = document.getElementById('nav');
const topLink = document.querySelector('.top-link');
const linksContainer = document.querySelector('.links-container');
window.addEventListener('scroll', () => {
const scrollHeight = window.scrollY;
const navHeight = navbar.getBoundingClientRect().height;
if (scrollHeight > navHeight) {
  navbar.classList.add('fixed-nav');
} else {
  navbar.classList.remove('fixed-nav');
}
if (scrollHeight > 700) {
  topLink.classList.add('show-link');
} else {
  topLink.classList.remove('show-link');
}
});
// Smooth Scroll
const scrollLinks = document.querySelectorAll('.scroll-link');
// select links
scrollLinks.forEach((link) => {
link.addEventListener('click', (e) => {
  e.preventDefault();
  // navigate to specific spot
  const id = e.currentTarget.getAttribute('href').slice(1);
  const element = document.getElementById(id);
  if (!element) return;
  // calculate the heights
  const navHeight = navbar.getBoundingClientRect().height;
  const containerHeight = linksContainer.getBoundingClientRect().height;
  const fixedNav = navbar.classList.contains('fixed-nav');
  let position = element.offsetTop - navHeight;
  if (!fixedNav) {
    position -= navHeight;
  }
  if (navHeight > 82) {
    position += containerHeight;
  }

  window.scrollTo({
    left: 0,
    top: position
  });
  //linksContainer.style.height = 0;
});
});

// Learn More Links
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.spa-link');

    // Cursor glow for each link
    links.forEach(link => {
        link.addEventListener('mousemove', (e) => {
            const rect = link.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            link.style.setProperty('--x', `${x}px`);
            link.style.setProperty('--y', `${y}px`);
        });
    });
});

// Close side menu when a link inside it is clicked
document.getElementById('sideMenu').addEventListener('click', (e) => {
  const clickedLink = e.target.closest('a');
  if (clickedLink) {
    toggleMenu();
  }
});

// web page screenshot carousel
function initCarousel() {
  if (window.innerWidth > 768) {
    const track = document.querySelector(".carousel-track");
    const slides = Array.from(track.children);
    if (!slides.length) return;

    let index = 0;
    let isTransitioning = false;

    // Clone first slide to make infinite loop seamless
    const firstClone = slides[0].cloneNode(true);
    track.appendChild(firstClone);

    const allSlides = Array.from(track.children);

    function goToSlide(newIndex) {
      if (isTransitioning) return;
      isTransitioning = true;

      track.style.transition = "transform 0.5s ease";
      track.style.transform = `translateX(-${newIndex * 100}%)`;
      index = newIndex;

      track.addEventListener(
        "transitionend",
        () => {
          if (index === allSlides.length - 1) {
            // Jump back to first slide without animation
            track.style.transition = "none";
            track.style.transform = "translateX(0)";
            index = 0;
          }
          isTransitioning = false;
        },
        { once: true }
      );
    }

    // Auto-slide every 3 seconds
    setInterval(() => {
      goToSlide(index + 1);
    }, 3000);
  }
  else{
    const stage   = document.querySelector(".scroll-stage") || document.querySelector(".right-container");
    const sticky  = document.querySelector(".light-rays-container");
    const track   = document.querySelector(".carousel-track");
    const slides  = track ? Array.from(track.children) : [];

    if (!stage || !sticky || !track || !slides.length) return;

    let ticking = false;

    const easeOutQuad = (x) => x * (2 - x); // gentle easing

    function apply() {
      const rect = stage.getBoundingClientRect();
      const vh   = window.innerHeight;

      // total scrollable distance while sticky is pinned inside the stage
      const total = Math.max(rect.height - vh, 1);
      const passed = Math.min(Math.max(-rect.top, 0), total);
      const t = passed / total; // 0..1

      // Horizontal progress across all images
      const maxTranslate = -(track.scrollWidth - sticky.clientWidth);
      track.style.transform = `translateX(${maxTranslate * t}px)`;

      // Scale up (0 → 0.5), then down (0.5 → 1)
      let s;
      if (t <= 0.5) {
        const p = easeOutQuad(t / 0.5);          // 0..1
        s = 1.0 + p * (1.6 - 1.0);            // 0.92 → 1.12
      } else {
        const p = easeOutQuad((t - 0.5) / 0.5);  // 0..1
        s = 1.6 - p * (1.6 - 1.0);            // 1.12 → 0.96
      }
      sticky.style.transform = `scale(${s}) translateZ(0)`; // GPU nudge

      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(apply);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    apply(); // initial paint
  }
}