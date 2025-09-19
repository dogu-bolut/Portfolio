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

function openModal() {

  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const captionText = document.getElementById('modalCaption');
  const images = Array.from(document.querySelectorAll('.image-container img'));
  let currentIndex = 0;

  // Open modal on click
  images.forEach((img, index) => {
    img.addEventListener('click', () => {
      modal.style.display = 'flex';
      modalImg.src = img.src;
      captionText.innerHTML = img.alt; // Use alt as caption, e.g., "Web Page 1"
      currentIndex = index;
    });
  });

  // Close modal
  document.querySelector('.close').addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Navigation arrows
  document.querySelector('.prev').addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
    modalImg.src = images[currentIndex].src;
    captionText.innerHTML = images[currentIndex].alt;
  });

  document.querySelector('.next').addEventListener('click', () => {
    currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
    modalImg.src = images[currentIndex].src;
    captionText.innerHTML = images[currentIndex].alt;
  });

  // Close on outside click or ESC
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') modal.style.display = 'none';
    if (e.key === 'ArrowLeft') document.querySelector('.prev').click();
    if (e.key === 'ArrowRight') document.querySelector('.next').click();
  });
}

function addImageEffect() {
  const card = document.querySelector(".erpwelcome img");

  card.addEventListener("mousemove", (e) => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left; // mouse X inside element
  const y = e.clientY - rect.top;  // mouse Y inside element

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  // calculate rotation (adjust 15 for intensity)
  const rotateX = ((y - centerY) / centerY) * -15;
  const rotateY = ((x - centerX) / centerX) * 15;

  card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });

  card.addEventListener("mouseleave", () => {
  card.style.transform = "rotateX(0) rotateY(0) scale(1)";
  });
}