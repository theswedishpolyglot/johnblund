
function loadBanner(){
  fetch('/components/banner.html').then(r=>r.ok?r.text():Promise.reject()).then(html=>{
    document.getElementById('banner').innerHTML = html;
  }).catch(e=>console.error('Failed to load banner:', e));
}

function loadFooter(){
  fetch('/components/footer.html').then(r=>r.ok?r.text():Promise.reject()).then(html=>{
    document.getElementById('footer').innerHTML = html;
  }).catch(e=>console.error('Failed to load footer:', e));
}

function loadNavbar(){
  fetch('/components/navbar.html').then(r=>r.ok?r.text():Promise.reject()).then(html=>{
    document.getElementById('primary-navbar').innerHTML = html;
    setupSubNavbarEventListeners();
  }).catch(e=>console.error('Failed to load navbar:', e));
}

function setupSubNavbarEventListeners(){
  const subNavbarMapping = { 'shop':'shop-navbar.html', 'services':'services-navbar.html', 'guides':'guides-navbar.html', 'about':'about-navbar.html', 'contact':'contact-navbar.html' };
  document.querySelectorAll('#primary-navbar ul li a').forEach(item=>{
    item.addEventListener('mouseover',(event)=>{
      document.querySelectorAll('#primary-navbar ul li a').forEach(n=>n.classList.remove('active-navbar'));
      event.target.classList.add('active-navbar');
      const href = event.target.getAttribute('href');
      const isStart = href === '/index.html';
      if(isStart){ document.getElementById('secondary-navbar').innerHTML = ''; }
      else{
        const navId = href.split('#').pop();
        const file = subNavbarMapping[navId];
        if(file) loadSubNavbar(file);
      }
    });
  });
}

function loadSubNavbar(file){
  fetch(`/components/secondary-navbar/${file}`).then(r=>r.ok?r.text():Promise.reject()).then(html=>{
    document.getElementById('secondary-navbar').innerHTML = html;
  }).catch(e=>console.error('Failed to load secondary-navbar:', e));
}

document.addEventListener('DOMContentLoaded', ()=>{ loadBanner(); loadFooter(); loadNavbar(); });