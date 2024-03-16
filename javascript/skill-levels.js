const circles = document.querySelectorAll(".circle");
const maxPercentages = [];
const currentPercentages = [];
/**
 * array of canvas contexts
 * @type {CanvasRenderingContext2D}
 */
const ctxs = [];

/**
 * @param {HTMLDivElement} circle
 */
const getCtxFromCircle = circle => {
  const canvas = circle.querySelector("canvas");
  return canvas.getContext("2d");
}

/**
 * @param {CanvasRenderingContext2D} ctx
 */
const drawLightCircle = ctx => {
  let startAngle = Math.PI * 1.5;

  ctx.strokeStyle = "#ccc";

  ctx.beginPath();
  ctx.arc(50, 50, 49, startAngle, startAngle + Math.PI * 2);
  ctx.stroke();
  ctx.closePath();
}

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} percentage
 */
const drawPercentageArc = (ctx, percentage) => {
  let startAngle = Math.PI * 1.5;

  ctx.strokeStyle = "#777";
  ctx.beginPath();
  ctx.arc(50, 50, 49, startAngle, startAngle + (Math.PI * 2 * percentage));
  ctx.stroke();
  ctx.closePath();
}

/**
 * @param {HTMLDivElement} circle
 * @param {number} index
 */
const drawCircle = (circle, index) => {
  const percentage = currentPercentages[index] / 100;
  /**
   * @type {CanvasRenderingContext2D}
   */
  const ctx = ctxs[index];
  ctx.clearRect(0,0,100,100);
  ctx.lineWidth = 2;

  drawLightCircle(ctx);
  drawPercentageArc(ctx, percentage);

  updatePercentageSpan(circle, index);
}

/**
 * @param {HTMLDivElement} circle
 */
const updatePercentageSpan = (circle, index) => {
  /**
 * @param {HTMLDivElement} circle
 */
  const getSpanFromCircle = (circle) => {
    return circle.querySelector("span");
  }

  const span = getSpanFromCircle(circle);
  span.innerText = (Math.round(currentPercentages[index] * 10)/10).toFixed(0);
}

const skillLevelTimestampData = {
  start: undefined,
  previousTimestamp: undefined,
}
function skillLevelDraw(timestamp) {
  if(skillLevelTimestampData.start === undefined){
    skillLevelTimestampData.start = timestamp;
  }

  if(timestamp === skillLevelTimestampData.previousTimestamp){
    window.requestAnimationFrame(skillLevelDraw);
    return;
  }
  circles.forEach(drawCircle);
  currentPercentages.forEach((value, i) =>{
    if(currentPercentages[i] < maxPercentages[i]){
      currentPercentages[i] = value + 1/2;
      window.requestAnimationFrame(skillLevelDraw);
    }
  })

  skillLevelTimestampData.previousTimestamp = timestamp;
}

/**
 * @param {HTMLDivElement} circle
 */
const initPercentageSpan = (circle) => {
  /**
   * @type {HTMLSpanElement}
   */
  const percentageSpan = document.createElement("span");
  percentageSpan.textContent = 0;
  percentageSpan.classList.add("percentage");
  circle.appendChild(percentageSpan);
}

/**
 * @param {HTMLDivElement} circle
 */
function initCircle(circle) {
  maxPercentages.push(circle.dataset.skillLevel);
  currentPercentages.push(0);
  ctxs.push(getCtxFromCircle(circle));

  window.requestAnimationFrame(skillLevelDraw);
}

var initialized = false;
function init() {
  if(initialized) return;
  circles.forEach(initCircle);
  circles.forEach(initPercentageSpan);
  initialized = true;
}

// ----- Skill level animation -----
/**
 * @type {MutationCallback}
 */
const animateSkillLevels = (mutations, observer) => {
  mutations.forEach((mutation) => {
    if (mutation.type === "attributes" && mutation.attributeName === "class") {
      if (mutation.target.classList.contains("entered")) {
        init();
      }
    }
  })
}

/**
 * @type {MutationObserver}
 */
const skillLevelMutationObserver = new MutationObserver(animateSkillLevels);
skillLevelMutationObserver.observe(document.querySelector(".skill-levels-container"), {attributes: true});
