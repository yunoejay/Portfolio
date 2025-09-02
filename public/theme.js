const toggleBtn = document.getElementById("theme-toggle");
const root = document.documentElement;

document.addEventListener("DOMContentLoaded", function () {
  new Typed("#typed-role", {
    strings: ["Front-End Developer", "Web Designer"],
    typeSpeed: 70,
    backSpeed: 40,
    backDelay: 1500,
    loop: true
  });
});

document.addEventListener("DOMContentLoaded", function () {
  new Typed("#typed-lost", {
    strings: ["Looks like you’re lost in space 🚀" ],
    typeSpeed: 70,
    backSpeed: 40,
    backDelay: 1500,
    loop: true
  });
});


if (localStorage.getItem("theme") === "dark") {
  root.classList.add("dark");
  toggleBtn.textContent = "☀️";
} else {
  root.classList.remove("dark");
  toggleBtn.textContent = "🌙";
}

document.documentElement.classList.add("no-transition");
window.addEventListener("load", () => {
  document.documentElement.classList.remove("no-transition");
});

function reveal() {
  const reveals = document.querySelectorAll('.reveal');
  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    const elementVisible = 100;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("show");
    }
  }
}
window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);

function loadParticles(theme) {
  tsParticles.load("tsparticles", {
    background: { color: "transparent" },
    particles: {
      number: { value: 80 },
      color: { value: theme === "dark" ? "#ffffff" : "#000000" }, 
      shape: { type: "circle" },
      opacity: { value: 0.8, random: true },
      size: { value: 2, random: true },
      move: {
        enable: true,
        speed: 0.5,
        random: true,
        outModes: { default: "out" }
      }
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "repulse" }
      }
    },
    detectRetina: true
  });
}

const savedTheme = localStorage.getItem("theme") || "light";
loadParticles(savedTheme);

toggleBtn.addEventListener("click", () => {
  if (root.classList.contains("dark")) {
    root.classList.remove("dark");
    toggleBtn.textContent = "🌙";
    localStorage.setItem("theme", "light");
    loadParticles("light");
  } else {
    root.classList.add("dark");
    toggleBtn.textContent = "☀️";
    localStorage.setItem("theme", "dark");
    loadParticles("dark");
  }
});

// === 🌠 Comet Effect ===
const cometCanvas = document.createElement("canvas");
cometCanvas.id = "comet-canvas";
document.body.appendChild(cometCanvas);

const cometCtx = cometCanvas.getContext("2d");

function resizeCanvas() {
  cometCanvas.width = window.innerWidth;
  cometCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Comet {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * cometCanvas.width;
    this.y = -50;
    this.vx = 2 + Math.random() * 2;
    this.vy = 4 + Math.random() * 2;
    this.trail = [];
    this.maxTrail = 20;
    this.life = 0;
    this.maxLife = 200 + Math.random() * 100;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.trail.push({ x: this.x, y: this.y });

    if (this.trail.length > this.maxTrail) this.trail.shift();

    this.life++;
    if (this.life > this.maxLife || this.x > cometCanvas.width + 100 || this.y > cometCanvas.height + 100) {
      this.reset();
    }
  }

  draw(ctx) {
    for (let i = 0; i < this.trail.length; i++) {
      const opacity = i / this.trail.length;
      ctx.beginPath();
      ctx.arc(this.trail[i].x, this.trail[i].y, 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(173,216,230,${opacity})`;
      ctx.fill();
    }
    ctx.beginPath();
    ctx.arc(this.x, this.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
  }
}

let comets = [new Comet()];

function animateComets() {
  cometCtx.clearRect(0, 0, cometCanvas.width, cometCanvas.height);

  comets.forEach(comet => {
    comet.update();
    comet.draw(cometCtx);
  });

  if (Math.random() < 0.005 && comets.length < 3) {
    comets.push(new Comet());
  }

  requestAnimationFrame(animateComets);
}

animateComets();
