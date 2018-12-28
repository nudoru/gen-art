import {lerp} from "canvas-sketch-util/math";
import {TWO_PI} from "./number";

// Accepts a value 0-1 and returns a value 0-1 in a sin wave
export const toSinValue = value => Math.abs(Math.sin(value * TWO_PI));

export const marginify = ({margin, u, v, width, height}) => {
  // console.log(position);
  // const [u, v] = position;
  return {
    x: lerp(margin, width - margin, u),
    y: lerp(margin, height - margin, v)
  };
};