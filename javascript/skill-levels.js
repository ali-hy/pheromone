const circles = document.querySelectorAll(".circle");

/**
 * @param {HTMLDivElement} circle 
 */
const drawCircle = circle => {
    const percentage = circle.dataset.skillLevel / 100;
    const canvas = circle.querySelector("canvas");
    if(canvas.getContext){
        /**
         * @type {CanvasRenderingContext2D}
         */
        const ctx = canvas.getContext("2d");

        ctx.lineWidth = 2;
        ctx.strokeStyle = "#ccc";

        startAngle = Math.PI * 1.5;

        ctx.beginPath();
        ctx.arc(50, 50, 49, startAngle, startAngle + Math.PI * 2);
        ctx.stroke();
        ctx.closePath();

        ctx.strokeStyle = "#777";
        ctx.beginPath();
        ctx.arc(50, 50, 49, startAngle, startAngle + (Math.PI * 2 * percentage));
        ctx.stroke();
        ctx.closePath();
    }

    /**
     * @type {HTMLSpanElement}
     */
    const percentageSpan = document.createElement("span", );
    percentageSpan.textContent = percentage;
    percentageSpan.classList.add("percentage");
    circle.appendChild(percentageSpan);
}

circles.forEach(drawCircle)