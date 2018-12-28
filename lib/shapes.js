import {TWO_PI} from "./number";

export const filledRect = ({context, x=0, y=0, width, height, color}) => {
  height = height || width;

  context.fillStyle = color;
  context.fillRect(x, y, width, height);
};

export const filledCircle = ({context, x, y, radius, color}) => {
  context.beginPath();
  context.arc(x, y, radius, 0, TWO_PI, false);
  context.fillStyle = color;
  context.fill();
};