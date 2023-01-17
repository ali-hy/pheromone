const navbarToggler = document.querySelector(".navbar-toggler");
const navbar = document.querySelector(".navbar");
const collapseNavbar = document.querySelector(navbarToggler.dataset.bsTarget);

const lightLogo = navbar.querySelector("#logo-light");
const darkLogo = navbar.querySelector("#logo-dark");

const toggleNavbarNavVisibility = () => {
    collapseNavbar.classList.toggle("show");
}

navbarToggler.addEventListener("click", toggleNavbarNavVisibility)
const changeNavbarOnScroll = (_event) => {
    const scrollPosition = window.scrollY;
    if(scrollPosition > 0){
        navbar.classList.replace("navbar-dark", "scrolled-navbar")
        //hide lightLogo
        lightLogo.classList.replace("opacity-0", "opacity-100");
        //show darkLogo
        darkLogo.classList.replace("opacity-0", "opacity-100");
    } else {
        navbar.classList.replace("scrolled-navbar", "navbar-dark");
        //show lightLogo
        lightLogo.classList.replace("opacity-0", "opacity-100");
        //hide darkLogo
        darkLogo.classList.replace("opacity-100", "opacity-0");
    }
}

window.addEventListener("scroll", changeNavbarOnScroll)