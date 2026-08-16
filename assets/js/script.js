'use strict';

const sidebar = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');
if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    const expanded = sidebar.classList.contains('active');
    sidebarBtn.setAttribute('aria-expanded', String(expanded));
    const label = sidebarBtn.querySelector('span');
    if (label) label.textContent = expanded ? 'Hide Contacts' : 'Show Contacts';
  });
}

const navLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    const target = link.textContent.trim().toLowerCase();
    pages.forEach((page) => page.classList.toggle('active', page.dataset.page === target));
    navLinks.forEach((item) => item.classList.toggle('active', item === link));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

const lightbox = document.querySelector('[data-lightbox-modal]');
const lightboxImage = document.querySelector('[data-lightbox-image]');
const lightboxCaption = document.querySelector('[data-lightbox-caption]');
const lightboxClose = document.querySelector('[data-lightbox-close]');
const lightboxBackdrop = document.querySelector('[data-lightbox-backdrop]');
const openers = document.querySelectorAll('[data-lightbox]');

function openLightbox(src, caption) {
  if (!lightbox || !lightboxImage) return;
  lightboxImage.src = src;
  lightboxCaption.textContent = caption || '';
  lightbox.classList.add('active');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
}

function closeLightbox() {
  if (!lightbox || !lightboxImage) return;
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');
  setTimeout(() => { lightboxImage.src = ''; }, 150);
}

openers.forEach((item) => item.addEventListener('click', () => openLightbox(item.dataset.lightbox, item.dataset.caption)));
if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeLightbox(); });
