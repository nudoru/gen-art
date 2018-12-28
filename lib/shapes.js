import {TWO_PI} from "./number";

export const filledCircle = ({context, x, y, radius, color}) => {
  context.beginPath();
  context.arc(x, y, radius, 0, TWO_PI, false);
  context.fillStyle = color;
  context.fill();
};