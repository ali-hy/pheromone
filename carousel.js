const carouselPrevControls = document.querySelectorAll(".carousel-control-prev");
const carouselNextControls = document.querySelectorAll(".carousel-control-next");

/**
 * @param {AnimationEvent} _event 
 */
const onSlideFadeout = (_event) => {
    if(_event.animationName === "fade-out"){
        _event.target.classList.remove("active");
        _event.target.classList.remove("fade-out");
    }
}

/**
 * @param {HTMLButtonElement} controlIcon 
 */
const getControlCarousel = controlIcon => {
    return document.querySelector(controlIcon.dataset.bsTarget);
}

/**
 * @param {HTMLElement} carousel 
 */
const getCarouselSlides = carousel => {
    const carouselInner = carousel.querySelector(".carousel-inner");
    return carouselInner.children;
}

/**
 * @param {HTMLCollection} carouselSlides 
 */
const getCurrentSlideNumber = carouselSlides => {
    for(let i = 0; i < carouselSlides.length; i++){
        if (carouselSlides.item(i).classList.contains("active")){
            return i;
        }
    }
    return -1;
}

/**
 * @param {HTMLCollection} carouselSlides 
 */
const getNextSlideNumber = carouselSlides => {
    const currentSlide = getCurrentSlideNumber(carouselSlides);
    return currentSlide >= 0 ? (currentSlide + 1) % carouselSlides.length : -1;
}

/**
 * @param {HTMLCollection} carouselSlides 
 */
const getPreviousSlideNumber = carouselSlides => {
    const currentSlide = getCurrentSlideNumber(carouselSlides);
    return currentSlide >= 0 ? carouselSlides.length - 1 - ((carouselSlides.length - currentSlide) % carouselSlides.length) : -1;
}

/**
 * @param {HTMLCollection} carouselSlides 
 */
const getCurrentSlide = carouselSlides => {
    const slideNumber = getCurrentSlideNumber(carouselSlides);
    return slideNumber >= 0 ? carouselSlides.item(slideNumber) : null;
}

/**
 * @param {HTMLCollection} carouselSlides 
 */
const getNextSlide = carouselSlides => {
    const slideNumber = getNextSlideNumber(carouselSlides);
    return slideNumber >= 0 ? carouselSlides.item(slideNumber) : null;
}

/**
 * @param {HTMLCollection} carouselSlides 
 */
const getPreviousSlide = carouselSlides => {
    const slideNumber = getPreviousSlideNumber(carouselSlides);
    return slideNumber >= 0 ? carouselSlides.item(slideNumber) : null;
}

/**
 * @param {number} current
 * @param {number} min included
 * @param {number} max excluded
 */
const backwardsLoop = (current, min, max) => {
    const currentFrom0 = current-min;
    const maxFrom0 = max-min;
    return maxFrom0 - 1 - ((maxFrom0 - currentFrom0) % maxFrom0) + min;
}

const forwardsLoop = (current, max) => {
    return (current + 1) % max;
}

/**
 * @param {HTMLCollection} carouselSlides
 * @param {number} slideToActivate
 */
const setActiveSlide = (carouselSlides, slideToActivate) => {
    const currentSlide = getCurrentSlide(carouselSlides);
    for(let i = 0; i < carouselSlides.length; i++){
        if(i === slideToActivate){
            carouselSlides.item(i).classList.add("active");
        } else if (carouselSlides.item(i).classList.contains("active")) {
            carouselSlides.item(i).classList.add("fade-out");
        }
    }
}

/**
 * @param {MouseEvent} _event 
 */
const onNextControlClicked = _event => {
    const slides = getCarouselSlides(getControlCarousel(_event.target));
    setActiveSlide(slides, getNextSlideNumber(slides));
}
/**
 * @param {MouseEvent} _event 
 */
const onPrevControlClicked = _event => {
    const slides = getCarouselSlides(getControlCarousel(_event.target));
    setActiveSlide(slides, getPreviousSlideNumber(slides));
}

carouselNextControls.forEach(controller => {
    controller.addEventListener("click", onNextControlClicked);
    const carouselSlides = getCarouselSlides(getControlCarousel(controller));
    for(let slide of carouselSlides){
        slide.addEventListener("animationend", onSlideFadeout);
    }
})
carouselPrevControls.forEach(controller => {
    controller.addEventListener("click", onPrevControlClicked);
})

const activeSlide = 0;