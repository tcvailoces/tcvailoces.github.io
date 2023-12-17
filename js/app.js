const sections = document.querySelectorAll('.nav_section');
const nav = document.getElementById('floating_nav');
const navToggle = document.querySelector('.mbl_nav_toggle');
let activeSectionIndex = findInitialActiveSectionIndex();

sections.forEach((section, index) => {
  const sectionName = section.getAttribute('data-section-title');
  const nav_indicator = document.createElement('div');
  nav_indicator.classList.add('nav_indicator');
  nav_indicator.innerText = sectionName;
  nav_indicator.addEventListener('click', () => {
    section.scrollIntoView({ behavior: 'smooth' });
  });
  nav.appendChild(nav_indicator);
});

function findInitialActiveSectionIndex() {

  for (let i = 0; i < sections.length; i++) {
    const rect = sections[i].getBoundingClientRect();

    if (rect.top <= window.innerHeight / 1 && rect.bottom >= window.innerHeight / 1) {
      return i;
    }
  }

  return 0; // Default to the first section if none are in view
}

function updateIndicator() {

  let found = false;

  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();

    if (
      rect.top <= window.innerHeight / 2 &&
      rect.bottom >= window.innerHeight / 2 &&
      !found
    ) {
      activateNavIndicator(index);
      found = true;
    }
  });
}

function activateNavIndicator(index) {
  const nav_indicator = document.querySelectorAll('.nav_indicator');
  nav_indicator.forEach((nav_in, i) => {
    if (i === index) {
      nav_in.classList.add('nav_active');
    } else {
      nav_in.classList.remove('nav_active');
    }
  });

  activeSectionIndex = index;
}

updateIndicator();

window.addEventListener('scroll', updateIndicator);
window.addEventListener('resize', updateIndicator);

navToggle.addEventListener('click', function() {
  this.classList.toggle('closed');
  nav.classList.toggle('translate-x-96');
  this.querySelector('i').classList.toggle('fa-xmark');
});