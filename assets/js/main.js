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

// Flip Card for Web Projects
/*function setupFlipCard() {
  const card = document.querySelector('.flip-card');
  if (!card) return;

  const frontImg = card.querySelector('.flip-front img');
  const backImg = card.querySelector('.flip-back img');

  const screenshots = [
    'assets/img/bountyhunter.jpg',
    'assets/img/corridor.png',
    'assets/img/angular.png',
    'assets/img/html.png',
    'assets/img/postgre.png'
  ];

  let currentIndex = 0;

  function flipCard() {
    card.classList.toggle('flipped');

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % screenshots.length;
      if (card.classList.contains('flipped')) {
        frontImg.src = screenshots[currentIndex];
      } else {
        backImg.src = screenshots[currentIndex];
      }
    }, 900);

    setTimeout(flipCard, 4000);
  }

  frontImg.src = screenshots[0];
  backImg.src = screenshots[1];

  setTimeout(flipCard, 4000);
}

// Periodically check for the card
const flipCardChecker = setInterval(() => {
  const card = document.querySelector('.flip-card');
  if (card && card.querySelector('.flip-front img') && card.querySelector('.flip-back img')) {
    clearInterval(flipCardChecker);
    setupFlipCard();
  }
}, 300); */

const screenshots = [
    'assets/img/baw.jpg',
    'assets/img/saglikpaketi.jpg',
    'assets/img/moviereview.jpg',
    'assets/img/QA.jpg',
    'assets/img/dogbreedlist.jpg'
  ];

let currentIndex = 0;
let rotationY = 0;

function startFlipShow() {
  const cardInner = document.querySelector('.flip-card-inner');
  const frontImg = document.querySelector('.flip-front img');
  const backImg = document.querySelector('.flip-back img');

  frontImg.src = screenshots[currentIndex];
  backImg.src = screenshots[(currentIndex + 1) % screenshots.length];

  setInterval(() => {
    const nextIndex = (currentIndex + 1) % screenshots.length;
    const isFrontVisible = (rotationY / 180) % 2 === 0;
    if (isFrontVisible) {
      backImg.src = screenshots[nextIndex];
    } else {
      frontImg.src = screenshots[nextIndex];
    }
    rotationY += 180;
    cardInner.style.transform = `rotateY(${rotationY}deg)`;
    setTimeout(() => {
      currentIndex = nextIndex;
      if ((rotationY / 180) % 2 === 0) {
        frontImg.src = screenshots[currentIndex];
      } else {
        backImg.src = screenshots[currentIndex];
      }
    }, 400);
    currentIndex = nextIndex;
  }, 4000);
}

const flipCardChecker = setInterval(() => {
  const card = document.querySelector('.flip-card');
  if (card && card.querySelector('.flip-front img') && card.querySelector('.flip-back img')) {
    clearInterval(flipCardChecker);
    startFlipShow();
  }
}, 300);