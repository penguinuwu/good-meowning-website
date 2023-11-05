// concept from https://www.winterwind.com/tutorials/css/60

/**
 * start cursor trails
 * @returns { abortController<AbortController>, intervalID<number> }
 */
const startCursorTrail = () => {
  const abortController = new AbortController();

  let mouseX = undefined;
  let mouseY = undefined;

  document.body.addEventListener(
    "mouseleave",
    (event) => {
      mouseX = undefined;
      mouseY = undefined;
      console.debug("leave", event);
    },
    { signal: abortController.signal }
  );

  document.body.addEventListener(
    "mousemove",
    (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      console.debug("move", mouseX, mouseY);
    },
    { signal: abortController.signal }
  );

  // game loop in 60fps lol
  const intervalID = setInterval(() => {
    if (mouseX === undefined || mouseY === undefined) {
      console.debug("return", mouseX, mouseY);
      return;
    }

    // create 3 spans of different radii around from the cursor
    [10, 30, 60].forEach((radius) => {
      const star = document.createElement("span");
      const left = mouseX + Math.round(radius * (Math.random() - 0.5));
      const top = mouseY + Math.round(radius * (Math.random() - 0.5));

      star.className = "star";
      star.style.top = `${top}px`;
      star.style.left = `${left}px`;

      document.body.appendChild(star);

      // remove star in 1s
      setTimeout(() => {
        document.body.removeChild(star);
      }, 1000);
    });
  }, 1000 / 60); // 60 fps

  return { abortController, intervalID };
};

/**
 * stop cursor trails
 * @param {AbortController} abortController
 * @param {number} intervalID
 */
const stopCursorTrail = (abortController, intervalID) => {
  abortController.abort(); // remove event listeners
  clearInterval(intervalID); // remove game loop
};

export { startCursorTrail, stopCursorTrail };
