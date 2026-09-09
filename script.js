const roles = ["Aspiring Mechatronics Engineer", "Robotics • Automation", "Embedded Systems • IoT"];
const typedRole = document.getElementById('typedRole');
let roleIndex = 0, charIndex = 0, deleting = false;
function typeLoop(){
  const word = roles[roleIndex];
  typedRole.textContent = word.slice(0, charIndex);
  if(!deleting && charIndex < word.length){ charIndex++; setTimeout(typeLoop, 55); return; }
  if(!deleting && charIndex === word.length){ deleting = true; setTimeout(typeLoop, 1500); return; }
  if(deleting && charIndex > 0){ charIndex--; setTimeout(typeLoop, 30); return; }
  deleting = false; roleIndex = (roleIndex + 1) % roles.length; setTimeout(typeLoop, 350);
}
typeLoop();

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if(entry.isIntersecting) entry.target.classList.add('visible');
}), {threshold:.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
menuToggle.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open);
  menuToggle.textContent = open ? '×' : '☰';
});
document.querySelectorAll('.mobile-menu a').forEach(a => a.addEventListener('click', () => {
  mobileMenu.classList.remove('open'); menuToggle.setAttribute('aria-expanded','false'); menuToggle.textContent='☰';
}));

const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('jobis-theme');
if(savedTheme === 'light') document.body.classList.add('light');
function updateThemeIcon(){ themeToggle.textContent = document.body.classList.contains('light') ? '☾' : '☼'; }
updateThemeIcon();
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  localStorage.setItem('jobis-theme', document.body.classList.contains('light') ? 'light' : 'dark');
  updateThemeIcon();
});

const canvas = document.getElementById('constellation');
const ctx = canvas.getContext('2d');
let particles = [];
function resize(){ canvas.width = innerWidth * devicePixelRatio; canvas.height = innerHeight * devicePixelRatio; canvas.style.width = innerWidth+'px'; canvas.style.height = innerHeight+'px'; ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0); particles = Array.from({length: Math.min(75, Math.floor(innerWidth/18))}, () => ({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.22,vy:(Math.random()-.5)*.22,r:Math.random()*1.3+.3})); }
function draw(){ ctx.clearRect(0,0,innerWidth,innerHeight); const light=document.body.classList.contains('light'); const dot=light?'rgba(95,78,180,.30)':'rgba(150,130,255,.42)'; const line=light?'rgba(95,78,180,.07)':'rgba(150,130,255,.08)'; particles.forEach(p=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>innerWidth)p.vx*=-1;if(p.y<0||p.y>innerHeight)p.vy*=-1;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=dot;ctx.fill();}); for(let i=0;i<particles.length;i++){for(let j=i+1;j<particles.length;j++){const a=particles[i],b=particles[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<125){ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.strokeStyle=line;ctx.stroke();}}}requestAnimationFrame(draw);}
addEventListener('resize', resize); resize(); draw();

// Reliable fixed Back-to-Top control
const backToTop = document.getElementById('backToTop');
function updateBackToTop(){
  if(window.scrollY > 500) backToTop.classList.add('show');
  else backToTop.classList.remove('show');
}
window.addEventListener('scroll', updateBackToTop, {passive:true});
backToTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
updateBackToTop();
