const toggleBtn = document.getElementById("theme-toggle");
const root = document.documentElement;

document.addEventListener("DOMContentLoaded", function () {
  new Typed("#typed-role", {
    strings: ["Front-End Developer", "UI Enthusiast", "Web Designer"],
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
