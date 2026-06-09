// ================================
//   AGRINHO 2026 — script.js
//   Guilherme José de Siqueira Martins
//   Colégio Estadual Professor Gabriel Rosa
// ================================

// ---- HEADER: sombrear ao rolar ----
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.25)';
  } else {
    header.style.boxShadow = '0 2px 12px rgba(0,0,0,0.15)';
  }
});

// ---- ANIMAÇÃO DE ENTRADA AO ROLAR (Intersection Observer) ----
const elementosAnimados = document.querySelectorAll(
  '.card, .step, .col-texto, .col-imagem, .autor-card, .galeria-grid img'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visivel');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12
});

elementosAnimados.forEach(el => {
  el.classList.add('oculto');
  observer.observe(el);
});

// Adiciona CSS de animação dinamicamente
const estilo = document.createElement('style');
estilo.textContent = `
  .oculto {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .visivel {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(estilo);

// ---- LIGHTBOX SIMPLES PARA GALERIA ----
const imagensGaleria = document.querySelectorAll('.galeria-grid img');

// Cria o overlay do lightbox
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
lightbox.style.cssText = `
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.88);
  z-index: 999;
  align-items: center;
  justify-content: center;
  cursor: zoom-out;
`;

const imgLightbox = document.createElement('img');
imgLightbox.style.cssText = `
  max-width: 90vw;
  max-height: 88vh;
  border-radius: 10px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.5);
  object-fit: contain;
`;

const btnFechar = document.createElement('button');
btnFechar.textContent = '✕';
btnFechar.style.cssText = `
  position: absolute;
  top: 1.25rem;
  right: 1.5rem;
  background: rgba(255,255,255,0.15);
  color: white;
  border: none;
  border-radius: 50%;
  width: 42px;
  height: 42px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;
`;
btnFechar.addEventListener('mouseover', () => btnFechar.style.background = 'rgba(255,255,255,0.3)');
btnFechar.addEventListener('mouseout', () => btnFechar.style.background = 'rgba(255,255,255,0.15)');

lightbox.appendChild(imgLightbox);
lightbox.appendChild(btnFechar);
document.body.appendChild(lightbox);

// Abre o lightbox ao clicar na imagem
imagensGaleria.forEach(img => {
  img.addEventListener('click', () => {
    imgLightbox.src = img.src;
    imgLightbox.alt = img.alt;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });
});

// Fecha o lightbox
function fecharLightbox() {
  lightbox.style.display = 'none';
  document.body.style.overflow = '';
}

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) fecharLightbox();
});

btnFechar.addEventListener('click', fecharLightbox);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') fecharLightbox();
});

// ---- NAV MOBILE: menu hamburguer ----
const headerInner = document.querySelector('.header-inner');
const nav = document.querySelector('.nav');

const btnMenu = document.createElement('button');
btnMenu.innerHTML = '&#9776;';
btnMenu.setAttribute('aria-label', 'Abrir menu');
btnMenu.style.cssText = `
  display: none;
  background: none;
  border: 1.5px solid rgba(255,255,255,0.5);
  color: white;
  font-size: 1.3rem;
  padding: 4px 10px;
  border-radius: 6px;
  cursor: pointer;
`;
headerInner.appendChild(btnMenu);

// Mostra botão no mobile
const estiloMobile = document.createElement('style');
estiloMobile.textContent = `
  @media (max-width: 768px) {
    button[aria-label="Abrir menu"] { display: block !important; }
    .nav.aberto {
      display: flex !important;
      flex-direction: column;
      position: absolute;
      top: 64px;
      left: 0; right: 0;
      background: rgba(26,74,46,0.98);
      padding: 1rem 1.5rem 1.5rem;
      gap: 1rem;
      box-shadow: 0 8px 20px rgba(0,0,0,0.2);
    }
  }
`;
document.head.appendChild(estiloMobile);

btnMenu.addEventListener('click', () => {
  nav.classList.toggle('aberto');
});

// Fecha o menu ao clicar em um link
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('aberto'));
});

// ---- CONTADOR DE ANO AUTOMÁTICO NO FOOTER ----
const anoAtual = new Date().getFullYear();
const textoFooter = document.querySelector('.footer p');
if (textoFooter) {
  textoFooter.textContent = `Agrinho ${anoAtual} — Agro Forte, Futuro Sustentável`;
}