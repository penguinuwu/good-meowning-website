// concept from https://www.winterwind.com/tutorials/css/60

/**
 * start cursor trails
 * @returns { abortController<AbortController>, intervalID<number> }
 */
const startCursorTrail = () => {
  const abortController = new AbortController();

  let coords = { x: undefined, y: undefined };

  // pointing devices leaving events
  const leaveEvent = (eventType) => {
    return (event) => {
      coords.x = undefined;
      coords.y = undefined;
      console.debug(eventType, event);
    };
  };
  document.body.addEventListener("mouseleave", leaveEvent("mouseleave"), {
    signal: abortController.signal,
  });
  document.body.addEventListener("touchend", leaveEvent("touchend"), {
    signal: abortController.signal,
  });

  // touchscreen movement events
  const touchEvent = (eventType) => {
    return (event) => {
      const touch = event.touches.item(0);
      if (touch === null) {
        console.debug(`${eventType} no movement?`, event);
      } else {
        coords.x = touch.clientX;
        coords.y = touch.clientY;
        console.debug(eventType, coords);
      }
    };
  };
  document.body.addEventListener("touchmove", touchEvent("touchmove"), {
    signal: abortController.signal,
  });
  document.body.addEventListener("touchstart", touchEvent("touchstart"), {
    signal: abortController.signal,
  });

  // mouse movement events
  document.body.addEventListener(
    "mousemove",
    (event) => {
      coords.x = event.clientX;
      coords.y = event.clientY;
      console.debug("mousemove", coords.x, coords.y);
    },
    { signal: abortController.signal }
  );

  // game loop in 60fps lol
  const intervalID = setInterval(() => {
    if (coords.x === undefined || coords.y === undefined) {
      console.debug("return", coords);
      return;
    }

    // create 3 spans of different radii around from the cursor
    [10, 30, 60].forEach((radius) => {
      const star = document.createElement("span");
      const left = coords.x + Math.round(radius * (Math.random() - 0.5));
      const top = coords.y + Math.round(radius * (Math.random() - 0.5));

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
