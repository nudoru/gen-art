import * as random from 'canvas-sketch-util/random';
import * as palettes from 'nice-color-palettes';

const colorCount     = random.rangeFloor(1, 6);
export const palette = random.shuffle(random.pick(palettes)).slice(0, colorCount);