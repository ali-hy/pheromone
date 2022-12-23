const dropdowns = document.querySelectorAll(".dropdown:not(.shopping-dropdown)");
const dropdownTogglers = document.querySelectorAll(".dropdown-toggle:not(.shopping-icon)");
const dropdownMenus = document.querySelectorAll(".dropdown-menu");

const shoppingIcon = document.querySelector(".shopping-icon");
const shoppingDropdown = shoppingIcon.parentNode;

/**
 * @param {AnimationEvent} _event 
 */
const onDropdownMenuAnimationEnd = (_event) => {
    /**
     * @type {HTMLElement}
     */
    const target = _event.target;
    if (_event.animationName === "dropdown-float-out") {
        target.style.display="none";
    }
};

/**
 * @param {MouseEvent} _event 
 */
const showDropdownMenu = (_event) => {
    console.log("mouse is entering");
    const target = _event.target;
    const dropdown = target.parentElement;
    const menu = dropdown.querySelector(".dropdown-menu");
    
    dropdowns.forEach(element => {
        element.classList.remove("active");
    })
    menu.style.display = "block";
    dropdown.classList.add("active");
}
const hideDropdownMenuOnMouseLeave = (_event) => {
    const dropdown = _event.target;

    if(dropdown.classList.contains("active")){
        dropdown.classList.remove("active");
    }
}
const toggleDropdown = (_event) => {
    const target = _event.target;
    const dropdown = target.parentElement;

    if(dropdown.classList.contains("active")){
        dropdown.classList.remove("active");
        return;
    } //else
    dropdowns.forEach(element => {
        element.classList.remove("active")
    })
    dropdown.classList.add("active");
}

const respondToSize = e => {
    const { innerWidth } = window;
    console.log("responding to size")

    if(innerWidth < 992){
        dropdownTogglers.forEach((element) => {
            element.removeEventListener("mouseenter", showDropdownMenu)
            element.addEventListener("click", toggleDropdown);
        })
        dropdowns.forEach((element) => {
            element.removeEventListener("mouseleave", hideDropdownMenuOnMouseLeave)
        })
        dropdownMenus.forEach((element) => {
            element.style.display = "block";
        })
    } else {
        dropdownTogglers.forEach((element) => {
            element.addEventListener("mouseenter", showDropdownMenu);
            element.removeEventListener("click", toggleDropdown);
        })
        dropdowns.forEach((element) => {
            element.addEventListener("mouseleave", hideDropdownMenuOnMouseLeave)
        })
        dropdownMenus.forEach((element) => {
            element.style.display = "none";
        })
    }
}

dropdownMenus.forEach(menu => {
    // menu.classList.add("d-none");
    menu.addEventListener("animationend", onDropdownMenuAnimationEnd)
})

document.addEventListener("DOMContentLoaded", respondToSize);
window.addEventListener("resize", respondToSize);

shoppingIcon.addEventListener("mouseenter", showDropdownMenu);
shoppingDropdown.addEventListener("mouseleave", hideDropdownMenuOnMouseLeave);
