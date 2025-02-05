const particleContainer = document.getElementById('particle-container');

function createParticle() {
    const particle = document.createElement('div');
    const size = Math.random() * 5 + 2; 
    const startX = Math.random() * window.innerWidth;
    const greenShades = ['#24ec24', '#03d803', '#029902', '#02a002', '#4df54d'];

    particle.style.cssText = `
        position: absolute;
        bottom: 0;
        left: ${startX}px;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background-color: ${greenShades[Math.floor(Math.random() * greenShades.length)]};
        opacity: ${Math.random() * 0.8 + 0.2};
        animation: moveParticle ${Math.random() * 3 + 2}s linear;
    `;

    particleContainer.appendChild(particle);

    particle.addEventListener('animationend', () => particle.remove());
}

setInterval(() => {
    if (document.hidden) return;
    createParticle();
}, 200);

const style = document.createElement('style');
style.textContent = `
@keyframes moveParticle {
    0% {
        transform: translate(0, 0) rotate(0deg);
    }
    100% {
        transform: translate(calc(-50vw + 100%), calc(-100vh)) rotate(360deg);
    }
}
`;
document.head.appendChild(style);

function movieshow(url) {
    window.location.href = url;
}

let lastTime = 0;
const throttleDelay = 10;
const crosshair = document.querySelector('.crosshair');
let crosshairPosition = { x: 0, y: 0 };
let targetPosition = { x: 0, y: 0 };
const lerpSpeed = 0.3;

let cursorSize = 30;
let cursorOpacity = 1;

document.addEventListener('mousemove', function (e) {
    const currentTime = new Date().getTime();
    if (currentTime - lastTime >= throttleDelay) {
        lastTime = currentTime;
        targetPosition.x = e.clientX + window.scrollX;
        targetPosition.y = e.clientY + window.scrollY;
    }
});

function updateCursor() {
    const deltaX = targetPosition.x - crosshairPosition.x;
    const deltaY = targetPosition.y - crosshairPosition.y;

    crosshairPosition.x += deltaX * lerpSpeed;
    crosshairPosition.y += deltaY * lerpSpeed;

    crosshair.style.left = (crosshairPosition.x - cursorSize / 6) + 'px';
    crosshair.style.top = (crosshairPosition.y - cursorSize / 6) + 'px';
    crosshair.style.width = cursorSize + 'px';
    crosshair.style.height = cursorSize + 'px';
    crosshair.style.opacity = cursorOpacity;

    requestAnimationFrame(updateCursor);
}

updateCursor();

const buttons = document.querySelectorAll('.movie-card');

buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        cursorSize = 40;
        crosshair.style.transition = "width 0.3s, height 0.3s, opacity 0.3s";
        crosshair.style.left = (crosshairPosition.x - cursorSize / 12) + 'px';
        crosshair.style.top = (crosshairPosition.y - cursorSize / 12) + 'px';
    });

    button.addEventListener('mouseleave', () => {
        cursorSize = 30;
        cursorOpacity = 1;
        crosshair.style.transition = "width 0.3s, height 0.3s, opacity 0.3s";
    }); 
});

function proxyshow(url) {
    window.location.href = "/static/iframe.html#" + url;
}

function gameshow(url) {
    window.location.href = url;
}
