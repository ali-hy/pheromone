/**
 * @param {IntersectionObserverEntry} entry 
 */
function revealEntry(entry){
  entry.target.classList.add('entered');
}

/**
 * @type {IntersectionObserverCallback}
 */
const iObserverCallBack = (entries, observer) => {
  entries.forEach((entry) => {
    if(entry.isIntersecting){
      revealEntry(entry);
    }
  })
}

/**
 * @type {IntersectionObserver}
 */
const iObserver = new IntersectionObserver(iObserverCallBack, {threshold: 0.5});

document.querySelectorAll(".animate-on-entry").forEach((element) => {
  iObserver.observe(element);
})

//---- Stat Animation ----
// TODO: make animation class that uses window.requestAnimationFrames();
const maxStats = [];
const currentStats = [];
const statNumberDivs = document.querySelectorAll("#stats-section .stat-number");

function updateCurrentStats(timeElapsed, maxTime){
  const timeFraction = timeElapsed/maxTime;
  const newStats = maxStats.map(
    (maxStat) => Math.round(maxStat * timeFraction)
  );
  // console.log("new stats: ", newStats)
  setCurrentStats(newStats);
  updateStatNumberDivs();
}

function setCurrentStats(newStats){
  currentStats.forEach((stat, i) => {
    currentStats[i] = newStats[i];
  })
}

function updateStatNumberDivs(){
  statNumberDivs.forEach((div, i) => {
    div.innerText = currentStats[i];
  })
}

let statsTimestampData = {
  start: undefined,
  previousTimeStamp: undefined,
  maxTime: 5000,
};
function statsDraw(timestamp){
  if(statsTimestampData.start === undefined){
    statsTimestampData.start = timestamp;
  }
  if(statsTimestampData.previousTimeStamp === timestamp) 
    return;

  const elapsed = timestamp - statsTimestampData.start;
  if(elapsed >= statsTimestampData.maxTime) {
    setCurrentStats(maxStats);
    updateStatNumberDivs();
    return;
  }

  updateCurrentStats(elapsed, statsTimestampData.maxTime);
  window.requestAnimationFrame(statsDraw);
}

function initStats(){
  statNumberDivs.forEach((statNumberDiv) => {
    maxStats.push(statNumberDiv.dataset.statValue);
    currentStats.push(0);
  })
  console.log("statDivs",statNumberDivs);
  console.log("max stats",maxStats);
  window.requestAnimationFrame(statsDraw);
}

/**
 * @type {MutationCallback}
 */
function animateStats(mutations, observer){
  mutations.forEach((mutation) => {
    if(mutation.type === "attributes" && mutation.attributeName === "class"){
      if(mutation.target.classList.contains("entered")){
        initStats();
      }
    }
  })
}

/**
 * @type {MutationObserver}
 */
const statsMutationObserver = new MutationObserver(animateStats);
statsMutationObserver.observe(document.querySelector("#stats-section"), {attributes: true});
