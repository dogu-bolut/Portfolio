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

function initCarousel() {
  const carousel = document.querySelector('.carousel');
  const track = carousel.querySelector('.carousel-track');
  let slides = Array.from(track.children);

  if (!slides.length) return;

  // Clone first slide and append to the end
  const firstClone = slides[0].cloneNode(true);
  track.appendChild(firstClone);

  slides = Array.from(track.children);
  let index = 0;
  let isTransitioning = false;

  function goToSlide(newIndex) {
    if (isTransitioning) return;
    isTransitioning = true;
    track.style.transition = "transform 0.5s ease";
    track.style.transform = `translateX(-${newIndex * 100}%)`;
    index = newIndex;

    track.addEventListener("transitionend", () => {
      if (index === slides.length - 1) {
        // Jump to real first slide instantly
        track.style.transition = "none";
        track.style.transform = "translateX(0)";
        index = 0;
      }
      isTransitioning = false;
    }, { once: true });
  }

  setInterval(() => {
    goToSlide(index + 1);
  }, 3000);
}