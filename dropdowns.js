const dropdowns = document.querySelectorAll(".dropdown:not(.shopping-dropdown)");
const dropdownTogglers = document.querySelectorAll(".dropdown-toggle:not(.shopping-icon)");

const shoppingIcon = document.querySelector(".shopping-icon");
const shoppingDropdown = shoppingIcon.parentNode;

const showDropdownMenu = (_event) => {
    console.log("mouse is entering");
    const target = _event.target;
    const dropdown = target.parentElement;
    
    dropdowns.forEach(element => {
        element.classList.remove("active")
    })
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
    } else {
        dropdownTogglers.forEach((element) => {
            element.addEventListener("mouseenter", showDropdownMenu);
            element.removeEventListener("click", toggleDropdown);
        })
        dropdowns.forEach((element) => {
            element.addEventListener("mouseleave", hideDropdownMenuOnMouseLeave)
        })
    }
}

document.addEventListener("DOMContentLoaded", respondToSize);
window.addEventListener("resize", respondToSize);

shoppingIcon.addEventListener("mouseenter", showDropdownMenu);
shoppingDropdown.addEventListener("mouseleave", hideDropdownMenuOnMouseLeave);
