import Simulation from "./Simulation";

const canvas = document.querySelector("#game") as HTMLCanvasElement;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

new Simulation(canvas);

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
