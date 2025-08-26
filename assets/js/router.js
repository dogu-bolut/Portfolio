const routes = {
  '/': 'index.html',
  '/games': 'assets/pages/games.html',
  '/web': 'assets/pages/web.html',
  '/mobile': 'assets/pages/mobile.html',
};

const normalizePath = (path) => path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path;

// only mount this if user navigates to a valid sub-route
function safeMountDynamicPage(path) {
  return new Promise((resolve, reject) => {
    const filePath = routes[path];
    if (!filePath) {
      reject('Page not found');
      return;
    }

    const main = document.querySelector('main');
    main.style.visibility = 'hidden';
    main.style.minHeight = '100vh';

    fetch(filePath)
      .then(res => {
        if (!res.ok) throw new Error('Page not found');
        return res.text();
      })
      .then(html => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;

        // Remove any header/footer inside the fragment
        const header = tempDiv.querySelector('header');
        const footer = tempDiv.querySelector('footer');
        if (header) header.remove();
        if (footer) footer.remove();
        main.innerHTML = `<div id="main-content">${tempDiv.innerHTML}</div>`;
        requestAnimationFrame(() => {
          main.style.visibility = 'visible';
          main.style.minHeight = '';
          updateNavbar(path);
          resolve();
        });
      })
      .catch(err => {
        main.innerHTML = '<h2>404 - Page Not Found</h2>';
        main.style.visibility = 'visible';
        console.error(err);
        reject(err);
      });
  });
}

// Call this only on demand
function navigateTo(path) {
  const [pathname, hash] = path.split('#');
  const normalizedPath = normalizePath(pathname);

  safeMountDynamicPage(normalizedPath).then(() => {
    if (hash) {
      const target = document.querySelector(`#${hash}`);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo(0, 0);
    }
  });

  history.pushState({}, '', path);
}

document.addEventListener("DOMContentLoaded", () => {
  const currentPath = normalizePath(window.location.pathname);
  safeMountDynamicPage(currentPath);
});

// Click events for in-page nav buttons
document.addEventListener('click', (e) => {
  const link = e.target.closest('a.cta, a.scroll-link');
  if (!link) return;

  e.preventDefault();
  const path = link.getAttribute('href');

  if (path === '/' || !path.startsWith('#')) {
    navigateTo(path); // all SPA routes including home
  } else if (path.startsWith('#')) {
    // Pure hash link on current page
    const target = document.querySelector(path);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
    history.pushState({}, '', path);
  }
});

// When user clicks browser back/forward buttons
window.addEventListener('popstate', () => {
  const path = normalizePath(window.location.pathname);
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
    { text: 'Contacts', href: '#contact' },
  ],
  '/games': [
    { text: 'Home', href: '/' },
    { text: 'Games', href: '#games' },
    { text: 'Tech Stack', href: '#tech-stack' },
    { text: 'Contact', href: '#contact' },
  ],
  '/web': [
    { text: 'Home', href: '/' },
    { text: 'Web Projects', href: '#web-projects' },
    { text: 'Tech Stack', href: '#tech-stack' },
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
    li.innerHTML = `<a href="${link.href}" class="${link.href.startsWith('/') ? 'cta' : 'scroll-link'}">${link.text}</a>`;
    linksContainer.appendChild(li);

    const li2 = li.cloneNode(true);
    sideMenu.appendChild(li2);
  });
}