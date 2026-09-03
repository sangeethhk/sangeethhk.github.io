// --- ANTI-INSPECT & ANTI-SHORTCUT PROTECTION ---

// Block Right-Click Context Menu
document.addEventListener('contextmenu', (e) => e.preventDefault());

// Block DevTools Keyboard Shortcuts (F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+S)
document.addEventListener('keydown', (e) => {
  if (
    e.key === 'F12' ||
    (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
    (e.ctrlKey && (e.key === 'U' || e.key === 's' || e.key === 'S'))
  ) {
    e.preventDefault();
    alert('Inspection and source viewing are disabled on this portfolio.');
    return false;
  }
});

// Detect if Developer Tools are open and obscure the screen
let devtoolsOpen = false;
const threshold = 160;
setInterval(() => {
  const widthThreshold = window.outerWidth - window.innerWidth > threshold;
  const heightThreshold = window.outerHeight - window.innerHeight > threshold;
  if (widthThreshold || heightThreshold) {
    if (!devtoolsOpen) {
      devtoolsOpen = true;
      document.body.innerHTML = "<h1 style='color:red; text-align:center; margin-top:20vh;'>Security Warning: Developer tools detected. Access restricted.</h1>";
    }
  }
}, 1000);

// Disable Dragging on Canvas & Images
document.addEventListener('dragstart', (e) => {
  e.preventDefault();
});

function locomotive() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },

    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },

    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
}
locomotive();

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render();
});

function files(index) {
  const frameNumber = (index + 1).toString().padStart(3, '0');
  return `./images/ezgif-frame-${frameNumber}.png`;
}

const frameCount = 147;
const images = [];
const imageSeq = {
  frame: 0,
};

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = files(i);
  images.push(img);
}

// Single continuous timeline mapped to one master ScrollTrigger to prevent pin conflicts
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: `#page>canvas`,
    start: `top top`,
    end: `+=3500`, // Total scroll distance for the sequence
    scrub: 0.1,    // Low scrub value gives that fluid video feel
    pin: true,
    scroller: `#main`,
  },
  onUpdate: render,
});

// Part 1: Initial frames (0 to 49)
tl.to(imageSeq, {
  frame: 49,
  snap: "frame",
  ease: "none",
}, "part1");

// Part 2: Waving/Active video motion sequence (50 to 130)
tl.to(imageSeq, {
  frame: 129,
  snap: "frame",
  ease: "none",
}, "part2");

// Part 3: Final frames to end (130 to 146)
tl.to(imageSeq, {
  frame: frameCount - 1,
  snap: "frame",
  ease: "none",
}, "part3");

images[0].onload = render;

function render() {
  scaleImage(images[imageSeq.frame], context);
}

function scaleImage(img, ctx) {
  var canvas = ctx.canvas;
  var hRatio = canvas.width / img.width;
  var vRatio = canvas.height / img.height;
  var ratio = Math.max(hRatio, vRatio);
  var centerShift_x = (canvas.width - img.width * ratio) / 2;
  var centerShift_y = (canvas.height - img.height * ratio) / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (img) {
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }
}

// Section pins for subsequent pages
gsap.to("#page1", {
  scrollTrigger: {
    trigger: `#page1`,
    start: `top top`,
    end: `bottom top`,
    pin: true,
    scroller: `#main`,
  },
});
gsap.to("#page2", {
  scrollTrigger: {
    trigger: `#page2`,
    start: `top top`,
    end: `bottom top`,
    pin: true,
    scroller: `#main`,
  },
});
gsap.to("#page3", {
  scrollTrigger: {
    trigger: `#page3`,
    start: `top top`,
    end: `bottom top`,
    pin: true,
    scroller: `#main`,
  },
});