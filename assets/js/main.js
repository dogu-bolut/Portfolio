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

// ********** fixed navbar ************
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
// ********** smooth scroll ************
const scrollLinks = document.querySelectorAll('.scroll-link');
// select links
scrollLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    // navigate to specific spot
    const id = e.currentTarget.getAttribute('href').slice(1);
    const element = document.getElementById(id);
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
    // linksContainer.style.height = 0;
  });
});