const anchors = document.querySelectorAll("a");

/**
 * @param {MouseEvent} _event 
 */
const onAnchorClick = _event => {
    /**
     * @type {HTMLAnchorElement}
     */
    const target = _event.target;
    const urlRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

    if(urlRegex.test(target.href())){
        return;
    }

    _event.preventDefault();
    
}

anchors.forEach(anchor => {
    anchor.addEventListener("click", )
})