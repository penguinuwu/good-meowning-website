import { startCursorTrail, stopCursorTrail } from "./cursortrail.mjs";
import { allOptions, loadParticles } from "./tsParticles.mjs";

const bodyNode = document.getElementById("body");
const toggleButtonNode = document.getElementById("nice-button");
let hasCursorTrails = JSON.parse(localStorage.getItem("hasCursorTrails"));
let abortController = undefined;
let intervalID = undefined;

const toggleOff = () => {
  console.debug("toggling off");

  // setting this first as a lock kinda lmao
  hasCursorTrails = false;
  localStorage.setItem("hasCursorTrails", hasCursorTrails);

  // load light theme particles
  loadParticles(allOptions.light);
  bodyNode.style.backgroundColor = allOptions.light.background.color;

  // stop cursor trails
  stopCursorTrail(abortController, intervalID);
  abortController = undefined;
  intervalID = undefined;
  console.debug("toggled off", abortController, intervalID);

  toggleButtonNode.style.color = allOptions.dark.background.color;
};

const toggleOn = () => {
  console.debug("toggling on");

  // setting this first as a lock kinda lmao
  hasCursorTrails = true;
  localStorage.setItem("hasCursorTrails", hasCursorTrails);

  // load dark theme particles
  loadParticles(allOptions.dark);
  bodyNode.style.backgroundColor = allOptions.dark.background.color;

  // start cursor trails
  ({ abortController, intervalID } = startCursorTrail());
  console.debug("toggled on", abortController, intervalID);

  toggleButtonNode.style.color = "#ff85a2";
};

/**
 * toggle button
 */
const toggleButton = () => {
  if (hasCursorTrails && intervalID !== undefined && abortController !== undefined) {
    toggleOff();
  } else if (!hasCursorTrails && intervalID === undefined && abortController === undefined) {
    toggleOn();
  } else {
    // just ignore race conditions lmafohohofaohofuc
    console.debug("broke lol");
  }
};

// add toggle function to button
toggleButtonNode.addEventListener("click", toggleButton);

// start off funny effects
if (hasCursorTrails === null || hasCursorTrails) {
  toggleOn();
} else {
  toggleOff();
}
