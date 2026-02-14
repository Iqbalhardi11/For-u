// Falling hearts animation
function createFallingHearts() {
    const heartsContainer = document.getElementById('heartsContainer');
    const heartSymbols = ['❤️', '💕', '💖', '💗', '💓', '💝', '💘'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'falling-heart';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
        heart.style.fontSize = (Math.random() * 10 + 15) + 'px';
        
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 7000);
    }, 300);
}

// Love button functionality
const loveButton = document.getElementById('loveButton');
const loveModal = document.getElementById('loveModal');
const closeModal = document.getElementById('closeModal');

loveButton.addEventListener('click', () => {
    loveModal.style.display = 'block';
    createConfetti();
});

closeModal.addEventListener('click', () => {
    loveModal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === loveModal) {
        loveModal.style.display = 'none';
    }
    if (event.target === celebrationModal) {
        celebrationModal.style.display = 'none';
    }
});

// Yes/No buttons functionality
const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const celebrationModal = document.getElementById('celebrationModal');
const closeCelebration = document.getElementById('closeCelebration');

yesButton.addEventListener('click', () => {
    celebrationModal.style.display = 'block';
    createBigConfetti();
    
    // Add celebration animation
    const celebration = document.querySelector('.celebration');
    celebration.style.animation = 'slideIn 0.5s ease, pulse 1s ease-in-out infinite 0.5s';
});

closeCelebration.addEventListener('click', () => {
    celebrationModal.style.display = 'none';
});

// No button - moves away when hovered or clicked
let noButtonMoveCount = 0;
const maxMoves = 5;

function moveNoButton() {
    if (noButtonMoveCount >= maxMoves) {
        noButton.textContent = "Yaudah deh... 🥺";
        noButton.style.background = "linear-gradient(135deg, #ff6b9d 0%, #e91e63 100%)";
        noButton.style.color = "white";
        noButton.onclick = () => {
            celebrationModal.style.display = 'block';
            createBigConfetti();
        };
        return;
    }
    
    const container = document.querySelector('.button-container');
    const containerRect = container.getBoundingClientRect();
    const buttonRect = noButton.getBoundingClientRect();
    
    // Calculate random position
    const maxX = window.innerWidth - buttonRect.width - 40;
    const maxY = window.innerHeight - buttonRect.height - 40;
    
    let newX = Math.random() * maxX;
    let newY = Math.random() * maxY;
    
    // Make sure it doesn't overlap with yes button
    const yesRect = yesButton.getBoundingClientRect();
    if (Math.abs(newX - yesRect.left) < 200 && Math.abs(newY - yesRect.top) < 100) {
        newX = newX > yesRect.left ? newX + 200 : newX - 200;
    }
    
    noButton.style.position = 'fixed';
    noButton.style.left = newX + 'px';
    noButton.style.top = newY + 'px';
    noButton.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        noButton.style.transform = 'scale(1)';
    }, 100);
    
    noButtonMoveCount++;
    
    // Change text gradually
    const texts = [
        "Enggak 😜",
        "Yakin enggak? 🤔",
        "Masa sih? 😢",
        "Coba lagi deh... 🥺",
        "Please? 🥹",
        "Yaudah deh... 🥺"
    ];
    
    if (noButtonMoveCount < texts.length) {
        noButton.textContent = texts[noButtonMoveCount];
    }
}

noButton.addEventListener('mouseenter', moveNoButton);
noButton.addEventListener('click', moveNoButton);

// Touch support for mobile
noButton.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});

// Confetti animation
function createConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const confettiCount = 100;
    const confetti = [];
    const colors = ['#e91e63', '#ff6b9d', '#ffc0cb', '#ff1744', '#f50057'];
    
    class ConfettiPiece {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height - canvas.height;
            this.size = Math.random() * 8 + 5;
            this.speedY = Math.random() * 3 + 2;
            this.speedX = Math.random() * 2 - 1;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 10 - 5;
        }
        
        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.rotation += this.rotationSpeed;
            
            if (this.y > canvas.height) {
                this.y = -10;
                this.x = Math.random() * canvas.width;
            }
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            ctx.restore();
        }
    }
    
    for (let i = 0; i < confettiCount; i++) {
        confetti.push(new ConfettiPiece());
    }
    
    let animationId;
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confetti.forEach(piece => {
            piece.update();
            piece.draw();
        });
        
        animationId = requestAnimationFrame(animate);
    }
    
    animate();
    
    // Stop after 5 seconds
    setTimeout(() => {
        cancelAnimationFrame(animationId);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 5000);
}

function createBigConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const confettiCount = 200;
    const confetti = [];
    const colors = ['#e91e63', '#ff6b9d', '#ffc0cb', '#ff1744', '#f50057', '#ff80ab'];
    const hearts = ['❤️', '💕', '💖', '💗'];
    
    class ConfettiPiece {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height - canvas.height;
            this.size = Math.random() * 12 + 8;
            this.speedY = Math.random() * 4 + 3;
            this.speedX = Math.random() * 3 - 1.5;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 15 - 7.5;
            this.isHeart = Math.random() > 0.7;
            this.heart = hearts[Math.floor(Math.random() * hearts.length)];
        }
        
        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.rotation += this.rotationSpeed;
            
            if (this.y > canvas.height) {
                this.y = -10;
                this.x = Math.random() * canvas.width;
            }
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            
            if (this.isHeart) {
                ctx.font = this.size + 'px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(this.heart, 0, 0);
            } else {
                ctx.fillStyle = this.color;
                ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            }
            
            ctx.restore();
        }
    }
    
    for (let i = 0; i < confettiCount; i++) {
        confetti.push(new ConfettiPiece());
    }
    
    let animationId;
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confetti.forEach(piece => {
            piece.update();
            piece.draw();
        });
        
        animationId = requestAnimationFrame(animate);
    }
    
    animate();
    
    // Stop after 7 seconds
    setTimeout(() => {
        cancelAnimationFrame(animationId);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 7000);
}

// Handle window resize for canvas
window.addEventListener('resize', () => {
    const canvas = document.getElementById('confettiCanvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createFallingHearts();
});
