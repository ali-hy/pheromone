const prevControls = document.querySelectorAll(".carousel-control-prev");
const nextControls = document.querySelectorAll(".carousel-control-next");

const carouselSlides = document.querySelectorAll(".carousel-item");
const indicatorLists = document.querySelectorAll(".carousel-indicators");

/**
 * @param {HTMLElement} carousel 
 */
const getIndicatorListFromCarousel = carousel => {
    return carousel.querySelector("ol.carousel-indicators");
}

/**
 * @param {HTMLAnchorElement} control
 */
const getIndicatorsFromControl = control => {
    return getIndicatorListFromCarousel(getCarouselFromControl(control));
}

/**
 * @param {HTMLCollection} slides 
 */
const getIndicatorListFromSlides = slides => {
    return getIndicatorListFromCarousel((getCarouselFromSlides(slides)));
}

/**
 * @param {HTMLOListElement} indicatorList
 * @param {number} indicatorToActivate 
 */
const setActiveIndicator = (indicatorList, indicatorToActivate) => {
    for(let i = 0; i < indicatorList.childElementCount; i++){
        /**
         * @type {HTMLLIElement}
         */
        const indicator = indicatorList.children.item(i);
        
        if(i === indicatorToActivate){
            indicator.classList.add("active")
        }else if(indicator.classList.contains("active")){
            indicator.classList.remove("active");
        }
    }
}

/**
 * @param {HTMLOListElement} indicatorList 
 */
const getCarouselFromIndicatorList = indicatorList => {
    return indicatorList.parentElement;
}

/**
 * @param {HTMLOListElement} indicatorList 
 */
const getSlidesFromIndicatorList = indicatorList => {
    return getSlidesFromCarousel(getCarouselFromIndicatorList(indicatorList))
}

/**
 * @param {HTMLButtonElement} controlIcon 
 */
const getCarouselFromControl = controlIcon => {
    return document.querySelector(controlIcon.dataset.bsTarget);
}

/**
 * @param {HTMLElement} carousel 
 */
const getSlidesFromCarousel = carousel => {
    const carouselInner = carousel.querySelector(".carousel-inner");
    return carouselInner.children;
}

/**
 * @param {HTMLCollection} carouselSlides 
 */
const getCarouselFromSlides = carouselSlides => {
    const firstSlide = carouselSlides.item(0);
    return firstSlide.parentElement.parentElement;
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
    for(let i = 0; i < carouselSlides.length; i++){
        if(i === slideToActivate){
            carouselSlides.item(i).classList.add("active");
        } else if (carouselSlides.item(i).classList.contains("active")) {
            carouselSlides.item(i).classList.add("fade-out");
        }
    }
    const indicatorCollection = getIndicatorListFromSlides(carouselSlides);
    setActiveIndicator(indicatorCollection, slideToActivate);
}

/**
 * @param {MouseEvent} _event 
 */
const onNextControlClicked = _event => {
    const slides = getSlidesFromCarousel(getCarouselFromControl(_event.target));
    setActiveSlide(slides, getNextSlideNumber(slides));
}
/**
 * @param {MouseEvent} _event 
 */
const onPrevControlClicked = _event => {
    const slides = getSlidesFromCarousel(getCarouselFromControl(_event.target));
    setActiveSlide(slides, getPreviousSlideNumber(slides));
}


/**
 * @param {AnimationEvent} _event 
 */
const onSlideFadeout = (_event) => {
    if(_event.animationName === "fade-out"){
        _event.target.classList.remove("active");
        _event.target.classList.remove("fade-out");
    }
}

nextControls.forEach(controller => {
    controller.addEventListener("click", onNextControlClicked);
})
prevControls.forEach(controller => {
    controller.addEventListener("click", onPrevControlClicked);
})

indicatorLists.forEach(indicatorList => {
    const indicators = indicatorList.children;
    for(let indicator of indicators){
        indicator.addEventListener("click", _event => {
            setActiveSlide(getSlidesFromIndicatorList(indicatorList), Number(indicator.dataset.bsSlideTo));
        })
    }
})

carouselSlides.forEach(slide => {
    slide.addEventListener("animationend", onSlideFadeout);
})

const activeSlide = 0;