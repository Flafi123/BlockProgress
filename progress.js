class Progress {
  constructor(elementId) {
    this.container = document.getElementById(elementId);
    this.arc = this.container.querySelector("#progress-arc");
    this.radius = this.arc.r.baseVal.value;
    this.circumference = 2 * Math.PI * this.radius;

    this.init();
  }

  init() {
    this.arc.style.strokeDasharray = `${this.circumference} ${this.circumference}`;
    this.setValue(0);
  }

  // API для управления
  setValue(value) {
    const clampedValue = Math.max(0, Math.min(100, value));
    const offset =
      this.circumference - (clampedValue / 100) * this.circumference;
    this.arc.style.strokeDashoffset = offset;
  }

  setAnimated(isAnimated) {
    this.container.classList.toggle("is-animated", isAnimated);
  }

  setHidden(isHidden) {
    this.container.classList.toggle("is-hidden", isHidden);
  }
}

// Связь с элементами интерфейса
document.addEventListener("DOMContentLoaded", () => {
  const progress = new Progress("progress-block");

  const valueInput = document.getElementById("value-input");
  const animateToggle = document.getElementById("animate-toggle");
  const hideToggle = document.getElementById("hide-toggle");

  valueInput.addEventListener("input", (e) => {
    let cleanValue = e.target.value.replace(/\D/g, "");
    let val = parseInt(cleanValue, 10);
    if (isNaN(val)) {
      val = 0;
    }
    if (val > 100) {
      val = 100;
    }
    e.target.value = val;
    progress.setValue(val);
  });

  animateToggle.addEventListener("change", (e) => {
    progress.setAnimated(e.target.checked);
  });

  hideToggle.addEventListener("change", (e) => {
    progress.setHidden(e.target.checked);
  });
});
