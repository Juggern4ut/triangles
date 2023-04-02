/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/Particle.js":
/*!****************************!*\
  !*** ./src/js/Particle.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Vector2D_1 = __importDefault(__webpack_require__(/*! ./Vector2D */ \"./src/js/Vector2D.js\"));\nclass Particle {\n    constructor(position, direction) {\n        this.position = position;\n        this.direction = direction;\n    }\n    /**\n     * Updates the Position of the Particle\n     * @param progress deltatime since the last frame draw\n     */\n    update(progress, width, height) {\n        progress *= 0.15;\n        if (this.position.x <= 0 || this.position.x >= width) {\n            this.direction.multiply(new Vector2D_1.default(-1, 1));\n        }\n        if (this.position.y <= 0 || this.position.y >= height) {\n            this.direction.multiply(new Vector2D_1.default(1, -1));\n        }\n        const tmp = this.direction.clone();\n        const factor = new Vector2D_1.default(progress, progress);\n        tmp.multiply(factor);\n        this.position.add(tmp);\n    }\n    /**\n     * Draws the Particle unto a given canvas\n     * @param ctx The context to draw unto\n     * @param color The Color of the Particle\n     */\n    draw(ctx, color = \"#000000\") {\n        ctx.fillStyle = color;\n        ctx.fillRect(this.position.x - 1, this.position.y - 1, 2, 2);\n    }\n}\nexports[\"default\"] = Particle;\n//# sourceMappingURL=Particle.js.map\n\n//# sourceURL=webpack://wetyss-boiler/./src/js/Particle.js?");

/***/ }),

/***/ "./src/js/Vector2D.js":
/*!****************************!*\
  !*** ./src/js/Vector2D.js ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass Vector2D {\n    constructor(x, y) {\n        this.x = x;\n        this.y = y;\n    }\n    /**\n     * Adds a given vector to this one\n     * @param other The other vector to add\n     */\n    add(other) {\n        this.x += other.x;\n        this.y += other.y;\n    }\n    /**\n     * Multiplies a given vector to this one\n     * @param other The vector to multiply\n     */\n    multiply(other) {\n        this.x *= other.x;\n        this.y *= other.y;\n    }\n    /**\n     * Creates a copy of this vector\n     * @returns A clone of the vector\n     */\n    clone() {\n        return new Vector2D(this.x, this.y);\n    }\n    /**\n     * Returns the distance between this vecor and a given one\n     * @param other The Vector to get the distance to\n     * @returns The calculated distance\n     */\n    dist(other) {\n        const deltaX = Math.abs(this.x - other.x);\n        const deltaY = Math.abs(this.y - other.y);\n        return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));\n    }\n    /**\n     * Calculates the dot product of this and a given vector\n     * @param other The other vector\n     * @returns The dot product\n     */\n    dot(other) {\n        return this.x * other.x + this.y * other.y;\n    }\n    /**\n     * Calculates the magnitude of this vector and returns it\n     * @returns The magnitude of this vector\n     */\n    magnitude() {\n        return Math.sqrt(this.x * this.x + this.y * this.y);\n    }\n    /**\n     * Normalizes this vector\n     */\n    normalize() {\n        const magnitude = this.magnitude();\n        this.x /= magnitude;\n        this.y /= magnitude;\n    }\n    /**\n     * Calculates the angle in radians between this\n     * vector and a given one and returns it.\n     * @param other The other vector\n     * @returns The angle in radians\n     */\n    angle(other) {\n        const dotProduct = this.dot(other);\n        const magnitudeProduct = this.magnitude() * other.magnitude();\n        return Math.acos(dotProduct / magnitudeProduct);\n    }\n}\nexports[\"default\"] = Vector2D;\n//# sourceMappingURL=Vector2D.js.map\n\n//# sourceURL=webpack://wetyss-boiler/./src/js/Vector2D.js?");

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Particle_1 = __importDefault(__webpack_require__(/*! ./Particle */ \"./src/js/Particle.js\"));\nconst Vector2D_1 = __importDefault(__webpack_require__(/*! ./Vector2D */ \"./src/js/Vector2D.js\"));\nconst canvas = document.querySelector(\"#game\");\nconst ctx = canvas.getContext(\"2d\");\nconst particles = [];\ncanvas.width = window.innerWidth;\ncanvas.height = window.innerHeight;\nlet width = canvas.width;\nlet height = canvas.height;\nconst particlesDom = document.querySelector(\"#particles\");\nlet particleAmount = parseInt(particlesDom.value);\nconst distDom = document.querySelector(\"#connectDistance\");\nconst hueDom = document.querySelector(\"#hue\");\nlet lastRender = 0;\nwindow.addEventListener(\"resize\", (e) => {\n    width = window.innerWidth;\n    height = window.innerHeight;\n});\n/**\n * The main game loop\n */\nconst loop = (timestamp) => {\n    const progress = timestamp - lastRender;\n    update(progress);\n    draw();\n    lastRender = timestamp;\n    window.requestAnimationFrame(loop);\n};\n/**\n * Updates the whole scene\n * @param progress The delta time since the last draw\n */\nconst update = (progress) => {\n    updateLinesBySlider();\n    particles.forEach((p) => {\n        p.update(progress, width, height);\n    });\n};\n/**\n * Draws the scene\n */\nconst draw = () => {\n    clearScreen();\n    particles.forEach((p) => {\n        particles.forEach((p2) => {\n            const dist = p.position.dist(p2.position);\n            if (dist < parseInt(distDom.value)) {\n                drawLine(dist, p, p2);\n            }\n        });\n        p.draw(ctx, \"rgba(255, 255, 255, 0.6)\");\n    });\n};\n/**\n * Clear the screen for the next draw\n */\nconst clearScreen = () => {\n    ctx.clearRect(0, 0, width, height);\n    ctx.fillStyle = \"#000\";\n    ctx.fillRect(0, 0, width, height);\n};\n/**\n * Draws a line between two particles\n * @param distance The distance between the start and end of the line\n * @param start The start of the line\n * @param end The end of the line\n */\nconst drawLine = (distance, start, end) => {\n    const factor = 1 - distance / parseInt(distDom.value);\n    ctx.strokeStyle = `hsla(${factor * 180 + parseInt(hueDom.value)}, 100%, 70%, ${factor})`;\n    ctx.lineWidth = 4 * factor;\n    ctx.beginPath();\n    ctx.moveTo(start.position.x, start.position.y);\n    ctx.lineTo(end.position.x, end.position.y);\n    ctx.stroke();\n    ctx.closePath();\n};\n/**\n * Adds or removes particles if the slider on the dom has\n * changed its value\n */\nconst updateLinesBySlider = () => {\n    const t = parseInt(particlesDom.value);\n    const v = particles.length;\n    if (t < v) {\n        const delta = v - t;\n        particles.splice(v - delta, delta);\n    }\n    else if (t > v) {\n        const delta = t - v;\n        addParticles(delta);\n    }\n    particleAmount = particles.length;\n};\n/**\n * Adds a given amount of particles to the scene\n * @param amount The amount to add\n */\nconst addParticles = (amount) => {\n    for (let i = 0; i < amount; i++) {\n        particles.push(new Particle_1.default(new Vector2D_1.default(Math.random() * width, Math.random() * height), new Vector2D_1.default(Math.random() * 2 - 1, Math.random() * 2 - 1)));\n    }\n};\nwindow.requestAnimationFrame(loop);\naddParticles(particleAmount);\n//# sourceMappingURL=main.js.map\n\n//# sourceURL=webpack://wetyss-boiler/./src/js/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/main.js");
/******/ 	
/******/ })()
;