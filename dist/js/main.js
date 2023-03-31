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

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst Vector2D_1 = __importDefault(__webpack_require__(/*! ./Vector2D */ \"./src/js/Vector2D.js\"));\r\nclass Particle {\r\n    constructor(position, direction) {\r\n        this.position = position;\r\n        this.direction = direction;\r\n    }\r\n    /**\r\n     * Updates the Position of the Particle\r\n     * @param progress deltatime since the last frame draw\r\n     */\r\n    update(progress, width, height) {\r\n        progress *= 0.15;\r\n        if (this.position.x <= 0 || this.position.x >= width) {\r\n            this.direction.multiply(new Vector2D_1.default(-1, 1));\r\n        }\r\n        if (this.position.y <= 0 || this.position.y >= height) {\r\n            this.direction.multiply(new Vector2D_1.default(1, -1));\r\n        }\r\n        const tmp = this.direction.clone();\r\n        const factor = new Vector2D_1.default(progress, progress);\r\n        tmp.multiply(factor);\r\n        this.position.add(tmp);\r\n    }\r\n    /**\r\n     * Draws the Particle unto a given canvas\r\n     * @param ctx The context to draw unto\r\n     * @param color The Color of the Particle\r\n     */\r\n    draw(ctx, color = \"#000000\") {\r\n        ctx.fillStyle = color;\r\n        ctx.fillRect(this.position.x - 1, this.position.y - 1, 2, 2);\r\n    }\r\n}\r\nexports[\"default\"] = Particle;\r\n//# sourceMappingURL=Particle.js.map\n\n//# sourceURL=webpack://wetyss-boiler/./src/js/Particle.js?");

/***/ }),

/***/ "./src/js/Vector2D.js":
/*!****************************!*\
  !*** ./src/js/Vector2D.js ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass Vector2D {\r\n    constructor(x, y) {\r\n        this.x = x;\r\n        this.y = y;\r\n    }\r\n    /**\r\n     * Adds a given vector to this one\r\n     * @param other The other vector to add\r\n     */\r\n    add(other) {\r\n        this.x += other.x;\r\n        this.y += other.y;\r\n    }\r\n    /**\r\n     * Multiplies a given vector to this one\r\n     * @param other The vector to multiply\r\n     */\r\n    multiply(other) {\r\n        this.x *= other.x;\r\n        this.y *= other.y;\r\n    }\r\n    /**\r\n     * Creates a copy of this vector\r\n     * @returns A clone of the vector\r\n     */\r\n    clone() {\r\n        return new Vector2D(this.x, this.y);\r\n    }\r\n    /**\r\n     * Returns the distance between this vecor and a given one\r\n     * @param other The Vector to get the distance to\r\n     * @returns The calculated distance\r\n     */\r\n    dist(other) {\r\n        const deltaX = Math.abs(this.x - other.x);\r\n        const deltaY = Math.abs(this.y - other.y);\r\n        return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));\r\n    }\r\n}\r\nexports[\"default\"] = Vector2D;\r\n//# sourceMappingURL=Vector2D.js.map\n\n//# sourceURL=webpack://wetyss-boiler/./src/js/Vector2D.js?");

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst Particle_1 = __importDefault(__webpack_require__(/*! ./Particle */ \"./src/js/Particle.js\"));\r\nconst Vector2D_1 = __importDefault(__webpack_require__(/*! ./Vector2D */ \"./src/js/Vector2D.js\"));\r\nconst canvas = document.querySelector(\"#game\");\r\nconst ctx = canvas.getContext(\"2d\");\r\nconst particles = [];\r\nconst LINE_DISTANCE = 400;\r\nconst width = canvas.width;\r\nconst height = canvas.height;\r\nlet lastRender = 0;\r\nfor (let i = 0; i < 25; i++) {\r\n    particles.push(new Particle_1.default(new Vector2D_1.default(Math.random() * width, Math.random() * height), new Vector2D_1.default(Math.random() * 2 - 1, Math.random() * 2 - 1)));\r\n}\r\nconst loop = (timestamp) => {\r\n    const progress = timestamp - lastRender;\r\n    update(progress);\r\n    draw();\r\n    lastRender = timestamp;\r\n    window.requestAnimationFrame(loop);\r\n};\r\n/**\r\n * Updates the whole scene\r\n * @param progress The delta time since the last draw\r\n */\r\nconst update = (progress) => {\r\n    particles.forEach((p) => {\r\n        p.update(progress, width, height);\r\n    });\r\n};\r\n/**\r\n * Draws the scene\r\n */\r\nconst draw = () => {\r\n    ctx.clearRect(0, 0, width, height);\r\n    ctx.fillStyle = \"#000\";\r\n    ctx.fillRect(0, 0, width, height);\r\n    particles.forEach((p) => {\r\n        particles.forEach((p2) => {\r\n            const dist = p.position.dist(p2.position);\r\n            if (dist < LINE_DISTANCE) {\r\n                drawLine(dist, p, p2);\r\n            }\r\n        });\r\n        p.draw(ctx, \"rgba(255, 255, 255, 0.6)\");\r\n    });\r\n};\r\n/**\r\n * Draws a line between two particles\r\n * @param distance The distance between the start and end of the line\r\n * @param start The start of the line\r\n * @param end The end of the line\r\n */\r\nconst drawLine = (distance, start, end) => {\r\n    const factor = 1 - distance / LINE_DISTANCE;\r\n    ctx.strokeStyle = `hsla(${factor * 180 + 90}, 100%, 70%, ${factor})`;\r\n    ctx.lineWidth = 4 * factor;\r\n    ctx.beginPath();\r\n    ctx.moveTo(start.position.x, start.position.y);\r\n    ctx.lineTo(end.position.x, end.position.y);\r\n    ctx.stroke();\r\n    ctx.closePath();\r\n};\r\nwindow.requestAnimationFrame(loop);\r\n//# sourceMappingURL=main.js.map\n\n//# sourceURL=webpack://wetyss-boiler/./src/js/main.js?");

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