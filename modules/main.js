import { startCursorTrail, stopCursorTrail } from "./cursortrail.mjs";

const toggleButtonNode = document.getElementById("toggle-cursor-trail");
let hasCursorTrails = false;
let abortController = undefined;
let intervalID = undefined;

/**
 * toggle cursor trail
 */
const toggleCursorTrail = () => {
  if (hasCursorTrails && intervalID !== undefined && abortController !== undefined) {
    console.debug("toggling off");

    // setting this first as a lock kinda lmao
    hasCursorTrails = false;

    // stop cursor trails
    stopCursorTrail(abortController, intervalID);
    abortController = undefined;
    intervalID = undefined;
    console.debug("toggled off", abortController, intervalID);

    toggleButtonNode.style.color = "#dd2e44";
  } else if (!hasCursorTrails && intervalID === undefined && abortController === undefined) {
    console.debug("toggling on");

    // setting this first as a lock kinda lmao
    hasCursorTrails = true;

    // start cursor trails
    ({ abortController, intervalID } = startCursorTrail());
    console.debug("toggled on", abortController, intervalID);

    toggleButtonNode.style.color = "#ff85a2";
  } else {
    // just ignore race conditions lmafohohofaohofuc
    console.debug("broke lol");
  }
};

// start cursor trails by default
toggleCursorTrail();

// add toggle function to button
toggleButtonNode.addEventListener("click", toggleCursorTrail);
