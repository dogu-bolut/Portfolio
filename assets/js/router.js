const routes = {
  '/games': 'assets/pages/games.html',
  '/web': 'assets/pages/web.html',
  '/mobile': 'assets/pages/mobile.html',
};

// only mount this if user navigates to a valid sub-route
function safeMountDynamicPage(path) {
  const filePath = routes[path];
  if (!filePath) return;
  window.scrollTo(0, 0);

  const main = document.querySelector('main');

  // Backup homepage HTML once
  if (!main.dataset.original) {
    main.dataset.original = main.innerHTML;
  }

  fetch(filePath)
    .then(res => {
      if (!res.ok) throw new Error('Page not found');
      return res.text();
    })
    .then(html => {
      main.innerHTML = `<div id="main-content">${html}</div>`;
      updateNavbar(path);
    })
    .catch(err => {
      main.innerHTML = '<h2>404 - Page Not Found</h2>';
      console.error(err);
    });
}

// Call this only on demand
function navigateTo(path) {
  const main = document.querySelector('main');

  if (path === '/') {
    if (main.dataset.original) {
      main.innerHTML = main.dataset.original;
      updateNavbar('/');
    }
    history.pushState({}, '', '/');
    return;
  }

  // Continue with normal routing
  safeMountDynamicPage(path);
  history.pushState({}, '', path);
}

// Click events for in-page nav buttons
document.addEventListener('click', (e) => {
  const link = e.target.closest('.spa-link');
  if (!link) return;

  e.preventDefault();
  const path = link.getAttribute('href');
  navigateTo(path);
});

// When user clicks browser back/forward buttons
window.addEventListener('popstate', () => {
  const path = window.location.pathname;
  const main = document.querySelector('main');

  if (path === '/' && main.dataset.original) {
    main.innerHTML = main.dataset.original;
  } else {
    safeMountDynamicPage(path);
  }
});

// Spa links per site
const navbarConfigs = {
  '/': [
    { text: 'Home', href: '#home' },
    { text: 'Experiences', href: '#experiences' },
    { text: 'Certificates', href: '#certificates' },
    { text: 'Skills', href: '#skills' },
    { text: 'Projects', href: '#projects' },
    { text: 'Contacts', href: '#contact' },
  ],
  '/games': [
    { text: 'Home', href: '/' },
    { text: 'Genres', href: '#genres' },
    { text: 'My Games', href: '#my-games' },
    { text: 'Feedback', href: '#feedback' },
  ],
  '/web': [
    { text: 'Home', href: '/' },
    { text: 'Web Projects', href: '#web-projects' },
    { text: 'Tech Stack', href: '#tech' },
    { text: 'Contact', href: '#contact' },
  ],
};

function updateNavbar(path) {
  const linksContainer = document.querySelector('.links-container ul');
  const sideMenu = document.querySelector('#sideMenu ul');

  const config = navbarConfigs[path] || navbarConfigs['/']; // fallback to default

  // Clear existing links
  linksContainer.innerHTML = '';
  sideMenu.innerHTML = '';

  // Re-add links from config
  config.forEach(link => {
    const li = document.createElement('li');
    li.innerHTML = `<a href="${link.href}" class="${link.href.startsWith('/') ? 'spa-link' : 'scroll-link'}">${link.text}</a>`;
    linksContainer.appendChild(li);

    const li2 = li.cloneNode(true);
    sideMenu.appendChild(li2);
  });
}