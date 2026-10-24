/* Editable enquiry destination: international phone number, digits only. */
document.documentElement.classList.remove('no-js');
const WHATSAPP_NUMBER = '923457777547';
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  navigation.classList.remove('is-open');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  navigation.classList.toggle('is-open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.header')) closeMenu();
});
window.matchMedia('(min-width: 1001px)').addEventListener('change', closeMenu);
document.querySelector('#year').textContent = new Date().getFullYear();

const form = document.querySelector('#enquiry-form');
form.querySelector('button[type="submit"]').disabled = false;
const status = document.querySelector('#form-status');
form.addEventListener('input', () => { status.textContent = ''; });
form.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  const fields = ['name', 'destination', 'service'];
  for (const field of fields) {
    const input = form.elements[field];
    input.setCustomValidity(String(data.get(field) || '').trim() ? '' : 'Please complete this field.');
    if (!input.reportValidity()) return;
  }
  const message = [
    'Hello ADEN GLOBAL, I would like a consultation.',
    '',
    `Name: ${data.get('name').trim()}`,
    `Destination: ${data.get('destination').trim()}`,
    `Service: ${data.get('service')}`,
    `Message: ${data.get('message').trim() || 'I would like to discuss my plans.'}`
  ].join('\n');
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  // A real link opened from this user gesture avoids storing or sending form data here.
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.click();
  status.replaceChildren('Your message is ready. If WhatsApp didn’t open, ');
  const fallback = document.createElement('a');
  fallback.href = url;
  fallback.target = '_blank';
  fallback.rel = 'noopener noreferrer';
  fallback.textContent = 'open your prepared enquiry';
  status.append(fallback, '. You still need to press Send in WhatsApp.');
});
form.querySelectorAll('input, select').forEach(input => {
  input.addEventListener('input', () => input.setCustomValidity(''));
});
