import { startCursorTrail, stopCursorTrail } from "./cursortrail.mjs";
import { allOptions, loadParticles } from "./tsParticles.mjs";

const bodyNode = document.getElementById("body");
const toggleButtonNode = document.getElementById("nice-button");
let hasCursorTrails = false;
let abortController = undefined;
let intervalID = undefined;

/**
 * toggle button
 */
const toggleButton = () => {
  if (hasCursorTrails && intervalID !== undefined && abortController !== undefined) {
    console.debug("toggling off");

    // setting this first as a lock kinda lmao
    hasCursorTrails = false;

    // load light theme particles
    loadParticles(allOptions.light);
    bodyNode.style.backgroundColor = allOptions.light.background.color;

    // stop cursor trails
    stopCursorTrail(abortController, intervalID);
    abortController = undefined;
    intervalID = undefined;
    console.debug("toggled off", abortController, intervalID);

    toggleButtonNode.style.color = allOptions.dark.background.color;
  } else if (!hasCursorTrails && intervalID === undefined && abortController === undefined) {
    console.debug("toggling on");

    // setting this first as a lock kinda lmao
    hasCursorTrails = true;

    // load dark theme particles
    loadParticles(allOptions.dark);
    bodyNode.style.backgroundColor = allOptions.dark.background.color;

    // start cursor trails
    ({ abortController, intervalID } = startCursorTrail());
    console.debug("toggled on", abortController, intervalID);

    toggleButtonNode.style.color = "#ff85a2";
  } else {
    // just ignore race conditions lmafohohofaohofuc
    console.debug("broke lol");
  }
};

// add toggle function to button
toggleButtonNode.addEventListener("click", toggleButton);

// start off funny effects
toggleButton();
