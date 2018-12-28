import canvasSketch from 'canvas-sketch';
import {lerp} from 'canvas-sketch-util/math';
import * as  random from 'canvas-sketch-util/random';
import {grid2d2} from "./lib/grid";
import {TWO_PI} from "./lib/number";
import {css, injectGlobal} from 'emotion';

injectGlobal`
  body {
    background-color: #999;
  }
  canvas {
    box-shadow: 0 1px  6px  rgba(0, 0, 0, .05), 0 8px  8px  rgba(0, 0, 0, .1), 0 16px 16px rgba(0, 0, 0, .1), 4px 32px 32px rgba(0, 0, 0, .05), 8px 50px 64px rgba(0, 0, 0, .15)
  }
`;

random.setSeed(random.getRandomSeed());
console.log(`Using seed ${random.getSeed()}`);

const settings = {
  dimensions: [2048, 2048],
  suffix    : `seed-${random.getSeed()}`
};

const grid = grid2d2(50).filter(() => random.value() > 0.5);
const margin = 200;

const sketch = () => {
  return ({context, width, height}) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    grid.forEach(({radius, position, color, rotation}) => {
      const [u, v] = position;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);
      context.beginPath();
      context.arc(x, y, radius * width, 0, TWO_PI, false);
      context.fillStyle = color;
      context.fill();
    })
  };
};

canvasSketch(sketch, settings);
