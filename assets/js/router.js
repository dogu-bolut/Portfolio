/*const routes = {
  '/games': `
    <section class="router-page">
      <h1>Game Projects</h1>
      <p>Here are some games I've built using Unity and JavaScript.</p>
    </section>
  `,
  '/web': `
    <section class="router-page">
      <h1>Web Projects</h1>
      <p>Responsive websites with clean code and modern UI.</p>
    </section>
  `,
  '/mobile': `
    <section class="router-page">
      <h1>Mobile Apps</h1>
      <p>Cross-platform mobile experiences built with Flutter and React Native.</p>
    </section>
  `
};

// only mount this if user navigates to a valid sub-route
function safeMountDynamicPage(path) {
  if (!routes[path]) return;

  const main = document.querySelector('main');

  // Backup homepage HTML once
  if (!main.dataset.original) {
    main.dataset.original = main.innerHTML;
  }

  main.innerHTML = `<div id="main-content">${routes[path]}</div>`;
}

// Call this only on demand
function navigateTo(path) {
  if (!routes[path]) return;

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

  if (path === '/' && document.querySelector('main').dataset.original) {
    // Restore homepage
    document.querySelector('main').innerHTML = document.querySelector('main').dataset.original;
  } else {
    safeMountDynamicPage(path);
  }
});

// ⛔ DO NOT force routing on load
// ⛔ Let homepage load normally; routing happens only when path !== '/'
*/

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

/*function navigateTo(path) {
  const file = routes[path];
  const main = document.querySelector('main');

  if (!file) {
    // fallback
    if (main.dataset.original) {
      main.innerHTML = main.dataset.original;
      history.pushState({}, '', '/');
    } else {
      main.innerHTML = '<h2>404 - Not Found</h2>';
    }
    return;
  }

  // Save original homepage content once
  if (!main.dataset.original) {
    main.dataset.original = main.innerHTML;
  }

  // Load external HTML
  fetch(file)
    .then(res => res.text())
    .then(html => {
      main.innerHTML = `<div id="main-content">${html}</div>`;
      history.pushState({}, '', path);
    });
}

document.addEventListener('click', (e) => {
  const link = e.target.closest('.spa-link');
  if (!link) return;

  e.preventDefault();
  const path = link.getAttribute('href');
  navigateTo(path);
});

window.addEventListener('popstate', () => {
  const path = window.location.pathname;

  if (path === '/' && document.querySelector('main').dataset.original) {
    document.querySelector('main').innerHTML = document.querySelector('main').dataset.original;
  } else {
    navigateTo(path);
  }
});

window.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname !== '/') {
    navigateTo(window.location.pathname);
  }
});*/
