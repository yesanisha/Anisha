AOS.init();

// You can also pass an optional settings object
// below listed default settings
AOS.init({

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 700, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});

const roles = ["Developer", "Designer", "Learner"];
const textElement = document.getElementById("dynamic-text");

let currentRole = 0;
let charIndex = 0;

function typeRole() {
  const role = roles[currentRole];
  if (charIndex < role.length) {
    textElement.textContent += role.charAt(charIndex);
    charIndex++;
    setTimeout(typeRole, 100); // Adjust typing speed here
  } else {
    // Wait before erasing
    setTimeout(eraseRole, 1000);
  }
}

function eraseRole() {
  if (charIndex > 0) {
    textElement.textContent = textElement.textContent.slice(0, -1);
    charIndex--;
    setTimeout(eraseRole, 50); // Adjust erase speed here
  } else {
    // Move to next word and start typing again
    currentRole = (currentRole + 1) % roles.length;
    setTimeout(typeRole, 200);
  }
}

// Start the effect
typeRole();
tsParticles.load("tsparticles", {
  background: {
    color: {
      value: "#ffe6f0", // soft pastel pink background
    },
  },
  fpsLimit: 60,
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "repulse",
      },
      onClick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
    modes: {
      repulse: {
        distance: 100,
        duration: 0.4,
      },
      push: {
        quantity: 4,
      },
    },
  },
  particles: {
    color: {
      value: "#ff85c1", // soft pink particles
    },
    links: {
      color: "#ff85c1", // matching soft pink links
      distance: 130,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "bounce",
      },
      speed: 1.5,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 50,
    },
    opacity: {
      value: 0.6,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 4 },
    },
  },
  detectRetina: true,
});


  const note = document.getElementById("stickyNote");
  const pin = document.querySelector(".pin-icon");

  // Make it draggable
  note.onmousedown = function (e) {
    let shiftX = e.clientX - note.getBoundingClientRect().left;
    let shiftY = e.clientY - note.getBoundingClientRect().top;

    function moveAt(pageX, pageY) {
      note.style.left = pageX - shiftX + 'px';
      note.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(e) {
      moveAt(e.pageX, e.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);
    note.onmouseup = function () {
      document.removeEventListener('mousemove', onMouseMove);
      note.onmouseup = null;
    };
  };

  note.ondragstart = () => false;

  // Toggle show/hide
  function toggleNote() {
    note.classList.toggle('show');
  }

  // Show on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100 && !note.classList.contains('show')) {
      note.classList.add('show');
      setTimeout(() => {
        note.classList.remove('show');
      }, 10000); // auto-hide after 10s
    }
  });


// fetch github langs

  const projects = [
    {
      repo: "yesanisha/fruitful-food-tracker",
      containerId: "github-langs-1"
    },
    {
      repo: "yesanisha/movietime",
      containerId: "github-langs-2"
    },
    {
      repo: "yesanisha/your-other-repo",
      containerId: "github-langs-3"
    }
  ];

  projects.forEach(project => {
    fetch(`https://api.github.com/repos/${project.repo}/languages`)
      .then(response => response.json())
      .then(data => {
        const langContainer = document.getElementById(project.containerId);
        for (const lang in data) {
          const badge = document.createElement("span");
          badge.className = "custom-badge";
          badge.textContent = lang;
          langContainer.appendChild(badge);
        }
      })
      .catch(error => {
        console.error(`Failed to fetch languages for ${project.repo}:`, error);
      });
  });


// pet code


const pet = document.getElementById('pet-avatar');
const waterButton = document.getElementById('water-btn');
const waterCountElement = document.getElementById('water-count');
const confettiCanvas = document.getElementById('confetti-canvas');

// Initialize water count
let waterCount = localStorage.getItem('water-count') || 0;
waterCountElement.textContent = `Watered ${waterCount}x`;

// Setup confetti
const myConfetti = confetti.create(confettiCanvas, { resize: true, useWorker: true });

// Water button event
waterButton.addEventListener('click', () => {
  waterCount++;
  localStorage.setItem('water-count', waterCount);
  waterCountElement.textContent = `Watered ${waterCount}x`;

  // Confetti fire inside the pet-container only
  myConfetti({
    particleCount: 100,
    spread: 90,
    origin: { y: 1.5, x: 0.5 }
  });

  // Pet animation change
  pet.src = 'assets/images/pet-cute.gif';
  setTimeout(() => {
    pet.src = 'assets/images/pet-running.gif';
  }, 2000);
});

// Hover effects
pet.addEventListener('mouseover', () => {
  pet.src = 'assets/images/pet-hover.gif';
});
pet.addEventListener('mouseout', () => {
  pet.src = 'assets/images/pet-running.gif';
});

// Random yawn
setInterval(() => {
  pet.src = 'assets/images/pet-yawn.gif';
  setTimeout(() => {
    pet.src = 'assets/images/pet-running.gif';
  }, 5000);
}, 20000);
