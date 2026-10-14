/* ==========================================================
   NIIMATALLAH BUKOYE - PORTFOLIO SCRIPT
   1. Mobile menu
   2. Highlight the current section in the menu
   3. Contact form
   4. Footer year
   ========================================================== */


/* ---------- 1. Mobile menu ---------- */
const menuBtn = document.getElementById('menuBtn');
const menu = document.getElementById('menu');

// Open or close the menu when the Menu button is clicked
menuBtn.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', isOpen);
});

// Close the menu after a link is clicked
menu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  });
});


/* ---------- 2. Highlight the current section ---------- */
const navLinks = [...menu.querySelectorAll('a')];
const sections = navLinks.map(link => document.querySelector(link.getAttribute('href')));

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        const isCurrent = link.getAttribute('href') === '#' + entry.target.id;
        link.classList.toggle('active', isCurrent);
      });
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });

sections.forEach(section => {
  if (section) sectionObserver.observe(section);
});


/* ---------- 3. Contact form ---------- */
// The form checks the fields, then opens the visitor's email app
// with the message already written, addressed to this email.
const EMAIL = 'nibukoye080@gmail.com';

const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

form.addEventListener('submit', event => {
  event.preventDefault();

  const data = new FormData(form);
  const name = data.get('name').trim();
  const email = data.get('email').trim();
  const message = data.get('message').trim();

  const emailLooksValid = /^\S+@\S+\.\S+$/.test(email);

  if (!name || !emailLooksValid || !message) {
    formNote.textContent = 'Please fill in your name, a valid email, and a message.';
    return;
  }

  const subject = encodeURIComponent('Portfolio message from ' + name);
  const body = encodeURIComponent(message + '\n\n' + name + ' (' + email + ')');

  window.location.href = 'mailto:' + EMAIL + '?subject=' + subject + '&body=' + body;
  formNote.textContent = 'Opening your email app...';
});


/* ---------- 4. Footer year ---------- */
document.getElementById('year').textContent = new Date().getFullYear();
