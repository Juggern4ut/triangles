export default class DomHandler {
  particlesDom: HTMLInputElement | null;
  distDom: HTMLInputElement | null;
  hueDom: HTMLInputElement | null;
  speedDom: HTMLInputElement | null;
  infoLabel: HTMLSpanElement;

  menuButton: HTMLElement | null;
  helpOverlay: HTMLElement | null;

  canvas: HTMLCanvasElement;

  touchX: number = 0;
  touchY: number = 0;
  timeout: number = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.particlesDom = document.querySelector("#particles");

    this.distDom = document.querySelector("#connectDistance");
    this.hueDom = document.querySelector("#hue");
    this.speedDom = document.querySelector("#speed");

    this.infoLabel = document.querySelector("#infos") as HTMLSpanElement;

    this.menuButton = document.querySelector("#openHelp");
    this.helpOverlay = document.querySelector("#help");

    this.initTouchHandles();
    this.initOpenHelp();
  }

  /**
   * Initializes the controls for touch devices
   */
  initTouchHandles = () => {
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
      } else if (e.touches[0].clientY >= this.canvas.height - 200) {
        const newSpeed = parseInt(this.speedDom.value) + deltaX;
        this.speedDom.value = newSpeed.toString();
        this.showInfos(`Speed: ${this.speedDom.value}`);
      } else if (e.touches[0].clientX <= 100) {
        const newHue = parseInt(this.hueDom.value) + deltaY;
        this.hueDom.value = newHue.toString();
        this.showInfos(`Hue: ${this.hueDom.value}`);
      } else if (e.touches[0].clientX >= this.canvas.width - 100) {
        const newDistance = parseInt(this.distDom.value) + deltaY;
        this.distDom.value = newDistance.toString();
        this.showInfos(`Distance: ${this.distDom.value}`);
      }
    });
  };

  /**
   * Initializes the controls to open the help view
   */
  initOpenHelp = () => {
    this.menuButton?.addEventListener("click", () => {
      if (!this.menuButton || !this.helpOverlay) return;
      if (this.menuButton.classList.contains("open")) {
        this.menuButton.innerHTML = "?";
        this.menuButton?.classList.remove("open");
        this.helpOverlay?.classList.remove("open");
      } else {
        this.menuButton.innerHTML = "X";
        this.menuButton?.classList.add("open");
        this.helpOverlay?.classList.add("open");
      }
    });
  };

  /**
   * Shows a infotext that will fade out after 500ms
   * @param text The text to display
   */
  showInfos = (text: string) => {
    this.infoLabel.innerHTML = text;
    this.infoLabel.classList.add("visible");
    clearTimeout(this.timeout);
    this.timeout = window.setTimeout(() => {
      this.infoLabel.classList.remove("visible");
    }, 500);
  };
}
