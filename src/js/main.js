"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Simulation_1 = __importDefault(require("./Simulation"));
const canvas = document.querySelector("#game");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
new Simulation_1.default(canvas);
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
//# sourceMappingURL=main.js.map