/*==================== MENU SHOW Y HIDDEN ====================*/
const   navMenu = document.getElementById('nav-menu');
const   navToggle = document.getElementById('nav-toggle');
const   navClose = document.getElementById('nav-close');


/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__Link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

function scrollAction(){
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');
        const menuLink = document.querySelector('.nav__menu a[href*=' + sectionId +']'); // Query the menuLink

        if (menuLink) { // Check if menuLink is not null
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                menuLink.classList.add('active-link');
            } else {
                menuLink.classList.remove('active-link');
            }
        }
    });
}

window.addEventListener('scroll', scrollAction);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader(){
    const nav = document.getElementById('header')
    //when the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav. classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)


/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*==================== CAPTURE USER INPUT AND SEND TO WHATSAPP ====================*/
const sendToWhatsAppButton = document.getElementById('sendToWhatsApp');

if (sendToWhatsAppButton) {
    sendToWhatsAppButton.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the link from being followed

        // Get user input values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('Message').value;

        // Create the WhatsApp message
        const whatsappMessage = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;

        // Encode the message for the URL
        const encodedMessage = encodeURIComponent(whatsappMessage);

        // Construct the WhatsApp link with the message
        const whatsappURL = `https://wa.me/254710678753?text=${encodedMessage}`;

        // Redirect to the WhatsApp URL
        window.location.href = whatsappURL;
    });
}

/*==================== CHANGE BACKGROUND IMAGE ON SCROLL ====================*/
const sectionImages = {
    'home': '', // Home section will have white background via CSS
    'why-choose-us': 'orange.png',
    'about': 'blue.png',
    'visual-features': 'pink.png',
    'testimonials': 'red.png',
    'partners': 'green.png',
    'contact': 'orange.png' // Using orange.png as requested
};

const backgroundMap = {
  'home': 'white',
  'why-choose-us': 'var(--bg-blue)',
  'visual-services': 'var(--bg-green)',
  'testimonials': 'var(--bg-orange)',
  'partners': 'var(--bg-pink)',
  'contact': 'var(--bg-red)',
};

const body = document.body; // Get reference to the body element

function changeBackgroundOnScroll() {
    let currentSectionId = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        // Check if the middle of the section is in the viewport
        if (scrollY >= sectionTop - window.innerHeight / 2 && scrollY < sectionTop + sectionHeight - window.innerHeight / 2) {
             currentSectionId = section.getAttribute('id');
        }
    });

    // If a section is in view and has a corresponding background, change the CSS variable
    if (currentSectionId && backgroundMap[currentSectionId] !== undefined) { // Check for undefined to allow empty string for home
        const backgroundColor = backgroundMap[currentSectionId];
        const computedStyle = window.getComputedStyle(body);
        const currentBg = computedStyle.getPropertyValue('--current-bg-image');

        if (currentBg.trim() !== backgroundColor.trim()) { // Compare values, ignoring whitespace
             body.style.setProperty('--current-bg-image', backgroundColor);
        }
    } else if (scrollY < sections[0].offsetTop - window.innerHeight / 2) {
        // If before the first section, set to initial background (blue.png)
        const initialBg = 'var(--bg-blue)';
        const computedStyle = window.getComputedStyle(body);
        const currentBg = computedStyle.getPropertyValue('--current-bg-image');
        if (currentBg.trim() !== initialBg.trim()) {
             body.style.setProperty('--current-bg-image', initialBg);
         }
    }
}

window.addEventListener('scroll', changeBackgroundOnScroll);

// Initial call to set background based on initial scroll position
changeBackgroundOnScroll();

/*==================== NEWSLETTER SIGNUP ====================*/
const newsletterInput = document.querySelector('.newsletter-input');
const newsletterButton = document.querySelector('.newsletter-button');
const newsletterInfo = document.querySelector('.newsletter-info');

if (newsletterButton && newsletterInput && newsletterInfo) {
    newsletterButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default button behavior

        const email = newsletterInput.value.trim();

        // Simple email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\\.[^\s@]+$/;

        if (emailRegex.test(email)) {
            // Simulate success - in a real application, you'd send this to a server
            newsletterInfo.textContent = 'Thank you for subscribing!';
            newsletterInfo.style.color = 'green'; // Or a success color
            newsletterInput.value = ''; // Clear the input field
        } else {
            // Display error message for invalid email
            newsletterInfo.textContent = 'Please enter a valid email address.';
            newsletterInfo.style.color = 'red'; // Or an error color
        }
    });
}