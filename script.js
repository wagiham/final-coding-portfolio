const messages = [
    "I like solving problems with programming.",
    "I enjoy continuous learning.",
    "I'm always looking for creative projects."
];
const typingElement = document.getElementById("typing");
let messageIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < messages[messageIndex].length) {
        typingElement.textContent += messages[messageIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 50);
    } else {
        setTimeout(() => {
            typingElement.textContent = "";
            charIndex = 0;
            messageIndex = (messageIndex + 1) % messages.length;
            type();
        }, 2000);
    }
}
type();

document.getElementById("toggleMode").addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    document.getElementById("stars").style.display =
        document.body.classList.contains("light-mode") ? "none" : "block";
});

const starContainer = document.getElementById("stars");
for (let i = 0; i < 30; i++) {
    const star = document.createElement("div");
    star.className = "shooting-star";
    star.style.top = `${Math.random() * 3000}px`;
    star.style.left = `${Math.random() * window.innerWidth}px`;
    star.style.animationDelay = `${Math.random() * 8}s`;
    starContainer.appendChild(star);
}

const canvas = document.getElementById("neuralCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = { x: null, y: null };
document.addEventListener("mousemove", function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

let nodes = [];
for (let i = 0; i < 40; i++) {
    nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.05,
        vy: (Math.random() - 0.5) * 0.05,
        radius: 2 + Math.random() * 2,
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    nodes.forEach((a, i) => {
        a.x += a.vx;
        a.y += a.vy;
        if (a.x < 0 || a.x > canvas.width) a.vx *= -1;
        if (a.y < 0 || a.y > canvas.height) a.vy *= -1;

        const dx = a.x - mouse.x;
        const dy = a.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 100;
        if (dist < radius) {
            a.vx += dx / dist * 0.01;
            a.vy += dy / dist * 0.01;
        }

        ctx.beginPath();
        ctx.arc(a.x, a.y, a.radius, 0, 2 * Math.PI);
        ctx.fillStyle = "rgba(255,255,255,0.7)";
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
            const b = nodes[j];
            const d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d < 120) {
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.strokeStyle = `rgba(255,255,255,${1 - d / 120})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    });

    requestAnimationFrame(draw);
}
draw();

const observer = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal");
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.2 }
);

document.querySelectorAll(".about-fade").forEach((el) => {
    observer.observe(el);
});

const glowCursor = document.getElementById("glow-cursor");
document.addEventListener("mousemove", (e) => {
    glowCursor.style.transform = `translate(${e.clientX - 8}px, ${e.clientY - 8}px)`;
});
