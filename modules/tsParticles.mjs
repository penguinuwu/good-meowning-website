import {
  loadFull,
  tsParticles,
} from "https://cdn.jsdelivr.net/npm/tsparticles@3.0.2/esm/bundle.js/+esm";
import { options as snowOptions } from "https://cdn.jsdelivr.net/npm/tsparticles-preset-snow@2.12.0/esm/options.js/+esm";
import { options as linkOptions } from "https://cdn.jsdelivr.net/npm/tsparticles-preset-links@2.12.0/esm/options.js/+esm";

async function loadParticles(options) {
  await loadFull(tsParticles);
  console.debug(await tsParticles.load({ id: "tsparticles", options: options }));
}

// epic effect colour mods
snowOptions.background.color = "#333333";
snowOptions.particles.color = "#ffd1dc";
linkOptions.background.color = "#ffd1dc";
linkOptions.particles.color = "#000000";
linkOptions.particles.links.color = "#000000";

const allOptions = {
  dark: {
    ...snowOptions,
    interactivity: {
      detectOn: "canvas",
      events: {
        onClick: { enable: true, mode: ["repulse"] },
        onHover: { enable: true, mode: ["bubble"] },
        resize: true,
      },
      modes: {
        bubble: { distance: 250, size: 40, duration: 0.4 },
        connect: { distance: 400, radius: 60, links: { opacity: 0.5 } },
        grab: { distance: 400, links: { opacity: 1 } },
        push: { quantity: 5 },
        repulse: { distance: 200, duration: 2 },
      },
    },
  },
  light: {
    ...linkOptions,
    interactivity: {
      detectOn: "canvas",
      events: {
        onClick: { enable: true, mode: ["push"] },
        onHover: { enable: true, mode: ["grab", "repulse"] },
        resize: true,
      },
      modes: {
        bubble: { distance: 200, size: 5, duration: 2 },
        connect: { distance: 100, radius: 60, links: { opacity: 1 } },
        grab: { distance: 300, links: { opacity: 0.5 } },
        push: { quantity: 5 },
        repulse: { distance: 150, duration: 2 },
      },
    },
  },
};

export { loadParticles, allOptions };
