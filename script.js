const particleContainer = document.getElementById('particle-container');

function createParticle() {
    const particle = document.createElement('div');
    const size = Math.random() * 5 + 2; 
    const startX = Math.random() * window.innerWidth;
    const greenShades = ['#24ec24', '#03d803', '#029902', '#02a002', '#4df54d'];

    particle.style.position = 'absolute';
    particle.style.bottom = '0';
    particle.style.left = `${startX}px`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.borderRadius = '50%';
    particle.style.backgroundColor = greenShades[Math.floor(Math.random() * greenShades.length)];
    particle.style.opacity = Math.random() * 0.8 + 0.2;
    particle.style.animation = `moveParticle ${Math.random() * 3 + 2}s linear`;

    particleContainer.appendChild(particle);

    particle.addEventListener('animationend', () => {
        particle.remove();
    });
}

setInterval(createParticle, 100);

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
    window.location.href = "/static/iframe.html#" + url;
}