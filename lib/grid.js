import * as random from 'canvas-sketch-util/random';
import {palette} from "./palette";

export const grid2d = (count) => {
  const points = [];
  for (let x = 0; x < count; x++) {
    for (let y = 0; y < count; y++) {
      // UV space between 0-1
      const u = count <= 1 ? 0.5 : x / (count - 1);
      const v = count <= 1 ? 0.5 : y / (count - 1);
      points.push([u, v]);
    }
  }
  return points;
};

export const grid2d2 = (count) => {
  const points = [];
  for (let x = 0; x < count; x++) {
    for (let y = 0; y < count; y++) {
      // UV space between 0-1
      const u        = count <= 1 ? 0.5 : x / (count - 1);
      const v        = count <= 1 ? 0.5 : y / (count - 1);
      const radius   = Math.abs(random.noise2D(u, v)) * 0.1;
      const rotation = Math.abs(random.noise2D(u, v)) * 0.5;
      points.push({
        // gaussian can go negative
        // radius: Math.abs(random.gaussian() * 0.02),
        radius,
        rotation,
        color   : random.pick(palette),
        position: [u, v]
      });
    }
  }
  return points;
};