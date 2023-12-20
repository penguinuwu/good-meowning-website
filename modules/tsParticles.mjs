import {
  loadSnowPreset,
  tsParticles,
} from "https://cdn.jsdelivr.net/npm/tsparticles-preset-snow@2.12.0/esm/bundle.js/+esm";

async function loadParticles() {
  await loadSnowPreset(tsParticles);
  await tsParticles.load("tsparticles", { preset: "snow" });
}

export { loadParticles };
