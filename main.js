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