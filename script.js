// script.js
class Star {
    constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.size = Math.random() * 4.8 + 0.2;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.isBurstStar = false; // New property to identify burst stars
        this.creationTime = Date.now(); // New property to store the creation time
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if ((!this.isBurstStar || Date.now() - this.creationTime > 5000) && this.size > 0.2) {
            this.size -= 0.1;
        }

        // Check if the star is not a burst star before decreasing its size
        // if (!this.isBurstStar && this.size > 0.2) this.size -= 0.1;

        // if (this.size > 0.2) this.size -= 0.1;

        if (this.x < 0 || this.x > window.innerWidth || this.y < 0 || this.y > window.innerHeight) {
            this.x = Math.random() * window.innerWidth;
            this.y = Math.random() * window.innerHeight;
            this.size = Math.random() * 5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = 'white';
        ctx.fill();
    }
}

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let numberOfStars = Math.floor(window.innerWidth / 5);
let stars = [];
for (let i = 0; i < numberOfStars; i++) {
    stars.push(new Star());
}

// Add this function to create a burst of stars
function createStarBurst(event) {
    let mouseX = event.clientX;
    let mouseY = event.clientY;
    let burstStars = [];

    for (let i = 0; i < 20; i++) {
        let star = new Star();
        star.x = mouseX;
        star.y = mouseY;
        star.size = 3; // Set the size of burst stars to 5
        star.isBurstStar = true; // Set the isBurstStar property to true for burst stars
        burstStars.push(star);
    }

    return burstStars;
}

// Add event listeners for mouse and touch events
canvas.addEventListener('mousedown', (event) => {
    event.preventDefault();
    stars = stars.concat(createStarBurst(event));
});

canvas.addEventListener('touchstart', (event) => {
    event.preventDefault();
    stars = stars.concat(createStarBurst(event.touches[0]));
});

// Update the animate function
// function animate() {
//     // Use a semi-transparent black to create a fading effect for the burst stars
//     ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
//     ctx.fillRect(0, 0, canvas.width, canvas.height);

//     for (let i = 0; i < stars.length; i++) {
//         stars[i].update();
//         stars[i].draw();
//     }

//     requestAnimationFrame(animate);
// }

// animate();



function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < stars.length; i++) {
        stars[i].update();
        stars[i].draw();
    }

    requestAnimationFrame(animate);
}

// Wrap the animate function call inside the window 'load' event listener
window.addEventListener('load', () => {
    animate();
});
