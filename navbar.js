const navbarToggler = document.querySelector(".navbar-toggler");
const navbar = document.querySelector(".navbar");
const collapseNavbar = document.querySelector(navbarToggler.dataset.bsTarget);

const lightLogo = navbar.querySelector("#logo-light");
const darkLogo = navbar.querySelector("#logo-dark");

const toggleNavbarNavVisibility = () => {
    if(collapseNavbar.classList.contains("show")){
        collapseNavbar.classList.remove("show");
        return;
    } //else
    collapseNavbar.classList.add("show");
}

navbarToggler.addEventListener("click", toggleNavbarNavVisibility)
const changeNavbarOnScroll = (_event) => {
    const scrollPosition = window.scrollY;
    if(scrollPosition > 0){
        navbar.classList.add("scrolled-navbar");
        navbar.classList.add("navbar-light");
        navbar.classList.remove("navbar-dark");
        //hide lightLogo
        lightLogo.classList.add("opacity-0");
        lightLogo.classList.remove("opacity-100");
        //show darkLogo
        darkLogo.classList.remove("opacity-0");
        darkLogo.classList.add("opacity-100");
    } else {
        navbar.classList.remove("scrolled-navbar");
        navbar.classList.remove("navbar-light");
        navbar.classList.add("navbar-dark");
        //show lightLogo
        lightLogo.classList.remove("opacity-0");
        lightLogo.classList.add("opacity-100");
        //hide darkLogo
        darkLogo.classList.remove("opacity-100");
        darkLogo.classList.add("opacity-0");
    }
}

window.addEventListener("scroll", changeNavbarOnScroll)