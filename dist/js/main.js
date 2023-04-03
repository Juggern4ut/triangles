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

/***/ "./src/js/DomHandler.js":
/*!******************************!*\
  !*** ./src/js/DomHandler.js ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass DomHandler {\n    constructor(canvas) {\n        this.touchX = 0;\n        this.touchY = 0;\n        this.timeout = 0;\n        /**\n         * Initializes the controls for touch devices\n         */\n        this.initTouchHandles = () => {\n            this.canvas.addEventListener(\"touchstart\", (e) => {\n                this.touchX = e.touches[0].clientX;\n                this.touchY = e.touches[0].clientY;\n            });\n            this.canvas.addEventListener(\"touchmove\", (e) => {\n                const deltaX = (e.touches[0].clientX - this.touchX) * 0.2;\n                const deltaY = this.touchY - e.touches[0].clientY;\n                this.touchX = e.touches[0].clientX;\n                this.touchY = e.touches[0].clientY;\n                if (!this.particlesDom || !this.speedDom || !this.hueDom || !this.distDom)\n                    return;\n                if (e.touches[0].clientY >= this.canvas.height - 100) {\n                    const newParticles = parseInt(this.particlesDom.value) + deltaX;\n                    this.particlesDom.value = newParticles.toString();\n                    this.showInfos(`Particles: ${this.particlesDom.value}`);\n                }\n                else if (e.touches[0].clientY >= this.canvas.height - 200) {\n                    const newSpeed = parseInt(this.speedDom.value) + deltaX;\n                    this.speedDom.value = newSpeed.toString();\n                    this.showInfos(`Speed: ${this.speedDom.value}`);\n                }\n                else if (e.touches[0].clientX <= 100) {\n                    const newHue = parseInt(this.hueDom.value) + deltaY;\n                    this.hueDom.value = newHue.toString();\n                    this.showInfos(`Hue: ${this.hueDom.value}`);\n                }\n                else if (e.touches[0].clientX >= this.canvas.width - 100) {\n                    const newDistance = parseInt(this.distDom.value) + deltaY;\n                    this.distDom.value = newDistance.toString();\n                    this.showInfos(`Distance: ${this.distDom.value}`);\n                }\n            });\n        };\n        /**\n         * Initializes the controls to open the help view\n         */\n        this.initOpenHelp = () => {\n            var _a;\n            (_a = this.menuButton) === null || _a === void 0 ? void 0 : _a.addEventListener(\"click\", () => {\n                var _a, _b, _c, _d;\n                if (!this.menuButton || !this.helpOverlay)\n                    return;\n                if (this.menuButton.classList.contains(\"open\")) {\n                    this.menuButton.innerHTML = \"?\";\n                    (_a = this.menuButton) === null || _a === void 0 ? void 0 : _a.classList.remove(\"open\");\n                    (_b = this.helpOverlay) === null || _b === void 0 ? void 0 : _b.classList.remove(\"open\");\n                }\n                else {\n                    this.menuButton.innerHTML = \"X\";\n                    (_c = this.menuButton) === null || _c === void 0 ? void 0 : _c.classList.add(\"open\");\n                    (_d = this.helpOverlay) === null || _d === void 0 ? void 0 : _d.classList.add(\"open\");\n                }\n            });\n        };\n        /**\n         * Shows a infotext that will fade out after 500ms\n         * @param text The text to display\n         */\n        this.showInfos = (text) => {\n            this.infoLabel.innerHTML = text;\n            this.infoLabel.classList.add(\"visible\");\n            clearTimeout(this.timeout);\n            this.timeout = window.setTimeout(() => {\n                this.infoLabel.classList.remove(\"visible\");\n            }, 500);\n        };\n        this.canvas = canvas;\n        this.particlesDom = document.querySelector(\"#particles\");\n        this.distDom = document.querySelector(\"#connectDistance\");\n        this.hueDom = document.querySelector(\"#hue\");\n        this.speedDom = document.querySelector(\"#speed\");\n        this.infoLabel = document.querySelector(\"#infos\");\n        this.menuButton = document.querySelector(\"#openHelp\");\n        this.helpOverlay = document.querySelector(\"#help\");\n        this.initTouchHandles();\n        this.initOpenHelp();\n    }\n}\nexports[\"default\"] = DomHandler;\n//# sourceMappingURL=DomHandler.js.map\n\n//# sourceURL=webpack://wetyss-boiler/./src/js/DomHandler.js?");

/***/ }),

/***/ "./src/js/Particle.js":
/*!****************************!*\
  !*** ./src/js/Particle.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Vector2D_1 = __importDefault(__webpack_require__(/*! ./Vector2D */ \"./src/js/Vector2D.js\"));\nclass Particle {\n    constructor(position, direction) {\n        this.position = position;\n        this.direction = direction;\n    }\n    /**\n     * Updates the Position of the Particle\n     * @param progress deltatime since the last frame draw\n     */\n    update(progress, width, height) {\n        if (this.position.x <= 0 || this.position.x >= width) {\n            this.direction.multiply(new Vector2D_1.default(-1, 1));\n        }\n        if (this.position.y <= 0 || this.position.y >= height) {\n            this.direction.multiply(new Vector2D_1.default(1, -1));\n        }\n        const tmp = this.direction.clone();\n        const factor = new Vector2D_1.default(progress, progress);\n        tmp.multiply(factor);\n        this.position.add(tmp);\n        this.resetPosition(width, height);\n    }\n    /**\n     * Puts the particle back into the canvas if it happens\n     * to go out of bounds somehow\n     * @param width The width of the canvas\n     * @param height The height of the canvas\n     */\n    resetPosition(width, height) {\n        if (this.position.x < 0) {\n            this.position.x = 0;\n        }\n        else if (this.position.x > width) {\n            this.position.x = width;\n        }\n        if (this.position.y < 0) {\n            this.position.y = 0;\n        }\n        else if (this.position.y > height) {\n            this.position.y = height;\n        }\n    }\n    /**\n     * Draws the Particle unto a given canvas\n     * @param ctx The context to draw unto\n     * @param color The Color of the Particle\n     */\n    draw(ctx, color = \"#000000\") {\n        ctx.fillStyle = color;\n        ctx.fillRect(this.position.x - 1, this.position.y - 1, 2, 2);\n    }\n}\nexports[\"default\"] = Particle;\n//# sourceMappingURL=Particle.js.map\n\n//# sourceURL=webpack://wetyss-boiler/./src/js/Particle.js?");

/***/ }),

/***/ "./src/js/Simulation.js":
/*!******************************!*\
  !*** ./src/js/Simulation.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst DomHandler_1 = __importDefault(__webpack_require__(/*! ./DomHandler */ \"./src/js/DomHandler.js\"));\nconst Particle_1 = __importDefault(__webpack_require__(/*! ./Particle */ \"./src/js/Particle.js\"));\nconst Vector2D_1 = __importDefault(__webpack_require__(/*! ./Vector2D */ \"./src/js/Vector2D.js\"));\nclass Simulation {\n    constructor(canvas) {\n        this.particles = [];\n        this.lastRender = 0;\n        /**\n         * The main game loop\n         */\n        this.loop = (timestamp) => {\n            const progress = timestamp - this.lastRender;\n            this.update(progress);\n            this.draw();\n            this.lastRender = timestamp;\n            window.requestAnimationFrame(this.loop);\n        };\n        /**\n         * Updates the whole scene\n         * @param progress The delta time since the last draw\n         */\n        this.update = (progress) => {\n            this.updateLinesBySlider();\n            this.particles.forEach((p) => {\n                if (this.domHandler.speedDom) {\n                    const delta = progress * (parseInt(this.domHandler.speedDom.value) / 100);\n                    p.update(delta, this.canvas.width, this.canvas.height);\n                }\n            });\n        };\n        /**\n         * Adds or removes particles if the slider on the dom has\n         * changed its value\n         */\n        this.updateLinesBySlider = () => {\n            if (!this.domHandler.particlesDom)\n                return;\n            const t = parseInt(this.domHandler.particlesDom.value);\n            const v = this.particles.length;\n            if (t < v) {\n                const delta = v - t;\n                this.particles.splice(v - delta, delta);\n            }\n            else if (t > v) {\n                const delta = t - v;\n                this.addParticles(delta);\n            }\n        };\n        /**\n         * Adds a given amount of particles to the scene\n         * @param amount The amount to add\n         */\n        this.addParticles = (amount) => {\n            for (let i = 0; i < amount; i++) {\n                this.particles.push(new Particle_1.default(new Vector2D_1.default(Math.random() * this.canvas.width, Math.random() * this.canvas.height), new Vector2D_1.default(Math.random() * 2 - 1, Math.random() * 2 - 1)));\n            }\n        };\n        /**\n         * Draws the scene\n         */\n        this.draw = () => {\n            this.clearScreen();\n            this.particles.forEach((p) => {\n                this.particles.forEach((p2) => {\n                    const dist = p.position.dist(p2.position);\n                    if (this.domHandler.distDom &&\n                        dist < parseInt(this.domHandler.distDom.value)) {\n                        this.drawLine(dist, p, p2);\n                    }\n                });\n                p.draw(this.ctx, \"rgba(255, 255, 255, 0.6)\");\n            });\n        };\n        /**\n         * Clear the screen for the next draw\n         */\n        this.clearScreen = () => {\n            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n            this.ctx.fillStyle = \"#000\";\n            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);\n        };\n        /**\n         * Draws a line between two particles\n         * @param distance The distance between the start and end of the line\n         * @param start The start of the line\n         * @param end The end of the line\n         */\n        this.drawLine = (distance, start, end) => {\n            if (!this.domHandler.distDom || !this.domHandler.hueDom)\n                return;\n            const factor = 1 - distance / parseInt(this.domHandler.distDom.value);\n            this.ctx.strokeStyle = `hsla(${factor * 180 + parseInt(this.domHandler.hueDom.value)}, 100%, 70%, ${factor})`;\n            this.ctx.lineWidth = 4 * factor;\n            this.ctx.beginPath();\n            this.ctx.moveTo(start.position.x, start.position.y);\n            this.ctx.lineTo(end.position.x, end.position.y);\n            this.ctx.stroke();\n            this.ctx.closePath();\n        };\n        this.canvas = canvas;\n        this.ctx = this.canvas.getContext(\"2d\");\n        this.domHandler = new DomHandler_1.default(this.canvas);\n        if (this.domHandler.particlesDom) {\n            this.addParticles(parseInt(this.domHandler.particlesDom.value));\n        }\n        window.requestAnimationFrame(this.loop);\n    }\n}\nexports[\"default\"] = Simulation;\n//# sourceMappingURL=Simulation.js.map\n\n//# sourceURL=webpack://wetyss-boiler/./src/js/Simulation.js?");

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

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Simulation_1 = __importDefault(__webpack_require__(/*! ./Simulation */ \"./src/js/Simulation.js\"));\nconst canvas = document.querySelector(\"#game\");\ncanvas.width = window.innerWidth;\ncanvas.height = window.innerHeight;\nnew Simulation_1.default(canvas);\nwindow.addEventListener(\"resize\", () => {\n    canvas.width = window.innerWidth;\n    canvas.height = window.innerHeight;\n});\n//# sourceMappingURL=main.js.map\n\n//# sourceURL=webpack://wetyss-boiler/./src/js/main.js?");

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