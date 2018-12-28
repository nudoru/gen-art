import canvasSketch from 'canvas-sketch';
import * as  random from 'canvas-sketch-util/random';
import {grid2d2} from "./lib/grid";
import {injectGlobal} from 'emotion';
import {filledCircle, filledRect} from "./lib/shapes";
import {marginify, toSinValue} from "./lib/helpers";
import {lerp} from "canvas-sketch-util/math";

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
  animate   : true,
  fps       : 24,
  duration  : 5,
  suffix    : `seed-${random.getSeed()}`
};

const grid   = grid2d2(10); //.filter(() => random.value() > 0.5);
const margin = 200;

const sketch = () => {

  // Static template
  // return ({context, width, height}) => {};

  // Animated template
  // return {render({context, width, height, time, playhead}) {}};

  return {
    render({context, width, height, time, playhead}) {
      filledRect({context, width, height, color: 'white'});

      grid.forEach(({position, color}) => {
        const [u, v] = position;

        const {x, y} = marginify({margin, u, v, width, height});
        const t      = toSinValue(playhead) * .1;

        const radius = Math.abs(random.noise3D(u, v, time) * 3) * t;

        filledCircle({context, x, y, radius: radius * width, color});
      })
    }
  };
};

canvasSketch(sketch, settings);
