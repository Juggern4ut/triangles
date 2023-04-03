"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DomHandler {
    constructor(canvas) {
        this.touchX = 0;
        this.touchY = 0;
        this.timeout = 0;
        /**
         * Initializes the controls for touch devices
         */
        this.initTouchHandles = () => {
            this.canvas.addEventListener("touchstart", (e) => {
                this.touchX = e.touches[0].clientX;
                this.touchY = e.touches[0].clientY;
            });
            this.canvas.addEventListener("touchmove", (e) => {
                const deltaX = (e.touches[0].clientX - this.touchX) * 0.2;
                const deltaY = this.touchY - e.touches[0].clientY;
                this.touchX = e.touches[0].clientX;
                this.touchY = e.touches[0].clientY;
                if (!this.particlesDom || !this.speedDom || !this.hueDom || !this.distDom)
                    return;
                if (e.touches[0].clientY >= this.canvas.height - 100) {
                    const newParticles = parseInt(this.particlesDom.value) + deltaX;
                    this.particlesDom.value = newParticles.toString();
                    this.showInfos(`Particles: ${this.particlesDom.value}`);
                }
                else if (e.touches[0].clientY >= this.canvas.height - 200) {
                    const newSpeed = parseInt(this.speedDom.value) + deltaX;
                    this.speedDom.value = newSpeed.toString();
                    this.showInfos(`Speed: ${this.speedDom.value}`);
                }
                else if (e.touches[0].clientX <= 100) {
                    const newHue = parseInt(this.hueDom.value) + deltaY;
                    this.hueDom.value = newHue.toString();
                    this.showInfos(`Hue: ${this.hueDom.value}`);
                }
                else if (e.touches[0].clientX >= this.canvas.width - 100) {
                    const newDistance = parseInt(this.distDom.value) + deltaY;
                    this.distDom.value = newDistance.toString();
                    this.showInfos(`Distance: ${this.distDom.value}`);
                }
            });
        };
        /**
         * Initializes the controls to open the help view
         */
        this.initOpenHelp = () => {
            var _a;
            (_a = this.menuButton) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
                var _a, _b, _c, _d;
                if (!this.menuButton || !this.helpOverlay)
                    return;
                if (this.menuButton.classList.contains("open")) {
                    this.menuButton.innerHTML = "?";
                    (_a = this.menuButton) === null || _a === void 0 ? void 0 : _a.classList.remove("open");
                    (_b = this.helpOverlay) === null || _b === void 0 ? void 0 : _b.classList.remove("open");
                }
                else {
                    this.menuButton.innerHTML = "X";
                    (_c = this.menuButton) === null || _c === void 0 ? void 0 : _c.classList.add("open");
                    (_d = this.helpOverlay) === null || _d === void 0 ? void 0 : _d.classList.add("open");
                }
            });
        };
        /**
         * Shows a infotext that will fade out after 500ms
         * @param text The text to display
         */
        this.showInfos = (text) => {
            this.infoLabel.innerHTML = text;
            this.infoLabel.classList.add("visible");
            clearTimeout(this.timeout);
            this.timeout = window.setTimeout(() => {
                this.infoLabel.classList.remove("visible");
            }, 500);
        };
        this.canvas = canvas;
        this.particlesDom = document.querySelector("#particles");
        this.distDom = document.querySelector("#connectDistance");
        this.hueDom = document.querySelector("#hue");
        this.speedDom = document.querySelector("#speed");
        this.infoLabel = document.querySelector("#infos");
        this.menuButton = document.querySelector("#openHelp");
        this.helpOverlay = document.querySelector("#help");
        this.initTouchHandles();
        this.initOpenHelp();
    }
}
exports.default = DomHandler;
//# sourceMappingURL=DomHandler.js.map