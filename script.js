// Floating Hearts Animation
function createFloatingHearts() {
    const container = document.getElementById('floatingHearts');
    setInterval(() => {
        const heart = document.createElement('i');
        heart.className = 'fas fa-heart heart';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        const colors = ['rgba(255, 107, 157, 0.4)', 'rgba(192, 108, 132, 0.4)', 'rgba(157, 74, 237, 0.4)'];
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];
        container.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 10000);
    }, 500);
}
createFloatingHearts();

// Twinkling Stars
function createStars() {
    const container = document.getElementById('stars');
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (Math.random() * 2 + 2) + 's';
        container.appendChild(star);
    }
}
createStars();

// Confetti on love calculation
function createConfetti() {
    const colors = ['#ff6b9d', '#c06c84', '#9d4edd', '#ffd700', '#ff69b4'];
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        document.body.appendChild(confetti);

        const duration = Math.random() * 3 + 2;
        const xMovement = (Math.random() - 0.5) * 200;
        
        confetti.animate([
            { transform: 'translateY(0) translateX(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(100vh) translateX(${xMovement}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });

        setTimeout(() => confetti.remove(), duration * 1000);
    }
}

// Smooth Scroll
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// Cursor Glow Follow
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
    cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

// Parallax effect for hero
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-section');
    const scrollY = window.scrollY;
    if (hero) {
        hero.style.backgroundPositionY = `${scrollY * 0.3}px`;
    }
});

// Ripple effect for buttons
function addRippleEffect(button) {
    button.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
        button.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
}

document.querySelectorAll('button').forEach(btn => {
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    addRippleEffect(btn);
});

// Love Calculator
document.getElementById('loveCalculatorForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name1 = document.getElementById('name1').value.toLowerCase().trim();
    const name2 = document.getElementById('name2').value.toLowerCase().trim();

    // Simple algorithm for percentage
    const combined = name1 + name2;
    let sum = 0;
    for (let i = 0; i < combined.length; i++) {
        sum += combined.charCodeAt(i);
    }
    const percentage = (sum % 100) + 1;

    // Ensure it's between 50-100 for positive vibes
    const finalPercentage = percentage < 50 ? percentage + 50 : percentage;

    const resultContainer = document.getElementById('loveResult');
    const percentageEl = document.getElementById('percentage');
    const messageEl = document.getElementById('message');

    resultContainer.classList.add('show');
    
    // Trigger confetti
    createConfetti();
    
    // Animate percentage
    let current = 0;
    const interval = setInterval(() => {
        current++;
        percentageEl.textContent = current + '%';
        if (current >= finalPercentage) {
            clearInterval(interval);
        }
    }, 20);

    // Messages based on percentage
    let message = '';
    if (finalPercentage >= 90) {
        message = '💕 Perfect Match! You two are meant to be together!';
    } else if (finalPercentage >= 75) {
        message = '❤️ Great Match! Your love is truly special!';
    } else if (finalPercentage >= 60) {
        message = '💗 Good Match! Keep nurturing your love!';
    } else {
        message = '💖 There\'s potential! Love can grow with time!';
    }
    messageEl.textContent = message;
});

// Memory Gallery
let memories = JSON.parse(localStorage.getItem('loveMemories')) || [];

function displayMemories() {
    const grid = document.getElementById('memoryGrid');
    grid.innerHTML = '';
    
    memories.forEach((memory, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.innerHTML = `
            <img src="${memory.url}" alt="Memory ${index + 1}">
            <div class="memory-overlay">
                <p>${memory.date}</p>
            </div>
            <button class="delete-memory" onclick="deleteMemory(${index})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        grid.appendChild(card);
    });
}

document.getElementById('fileInput').addEventListener('change', function(e) {
    const files = e.target.files;
    
    for (let file of files) {
        const reader = new FileReader();
        reader.onload = function(event) {
            memories.push({
                url: event.target.result,
                date: new Date().toLocaleDateString()
            });
            localStorage.setItem('loveMemories', JSON.stringify(memories));
            displayMemories();
        };
        reader.readAsDataURL(file);
    }
});

function deleteMemory(index) {
    if (confirm('Delete this memory?')) {
        memories.splice(index, 1);
        localStorage.setItem('loveMemories', JSON.stringify(memories));
        displayMemories();
    }
}

displayMemories();

// Love Letter Generator
const loveLetters = [
    "My dearest love, every moment with you feels like a beautiful dream. Your smile lights up my darkest days, and your laughter is the sweetest melody I've ever heard. I fall in love with you more and more each day. You are my everything, my today and all of my tomorrows. Forever yours.",
    
    "To my one and only, words cannot express how deeply I cherish you. You've brought color to my black and white world, and meaning to every sunrise. In your eyes, I see my home. In your arms, I find my peace. Thank you for being the love of my life. Always and forever.",
    
    "My beloved, you are the answer to every prayer I've ever whispered. Your love has transformed my life in the most beautiful ways. Every heartbeat whispers your name, and every breath I take is filled with thoughts of you. I love you more than words could ever say.",
    
    "Darling, from the moment I met you, I knew my life would never be the same. You've shown me what true love means, and I'm grateful for every second we share. You are my best friend, my soulmate, and my greatest adventure. Here's to our forever.",
    
    "My sweet love, you make every ordinary moment extraordinary. Your kindness, your strength, and your beautiful heart inspire me daily. I promise to love you through every season, to support your dreams, and to cherish every moment we create together. You are my everything."
];

function generateLoveLetter() {
    const output = document.getElementById('letterOutput');
    const randomLetter = loveLetters[Math.floor(Math.random() * loveLetters.length)];
    output.innerHTML = `<p>${randomLetter}</p>`;
}

function copyLetter() {
    const letterText = document.getElementById('letterOutput').innerText;
    navigator.clipboard.writeText(letterText).then(() => {
        alert('Love letter copied to clipboard! 💕');
    });
}

// Countdown Timer
let countdownInterval;

function startCountdown() {
    const dateInput = document.getElementById('specialDate').value;
    if (!dateInput) {
        alert('Please select a date!');
        return;
    }

    const specialDate = new Date(dateInput).getTime();
    document.getElementById('countdownDisplay').style.display = 'grid';

    clearInterval(countdownInterval);
    countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = specialDate - now;

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdownDisplay').innerHTML = 
                '<div style="grid-column: 1/-1; font-size: 2rem;">🎉 The Day is Here! 🎉</div>';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;

        document.querySelectorAll('.countdown-item').forEach(item => {
            item.classList.remove('tick');
            void item.offsetWidth;
            item.classList.add('tick');
        });
    }, 1000);
}

// Quiz
function submitQuiz() {
    const questions = document.querySelectorAll('.quiz-question');
    let answered = 0;
    let totalQuestions = questions.length;

    questions.forEach(question => {
        const selected = question.querySelector('input[type="radio"]:checked');
        if (selected) answered++;
    });

    if (answered < totalQuestions) {
        alert('Please answer all questions!');
        return;
    }

    const score = Math.floor((answered / totalQuestions) * 100);
    const scoreContainer = document.getElementById('quizScore');
    const scoreValue = document.getElementById('scoreValue');
    const scoreMessage = document.getElementById('scoreMessage');

    scoreValue.textContent = score + '%';
    
    if (score >= 80) {
        scoreMessage.textContent = '🌟 Amazing! You know each other so well!';
    } else if (score >= 60) {
        scoreMessage.textContent = '💕 Great job! You\'re learning more about each other!';
    } else {
        scoreMessage.textContent = '💖 Keep getting to know each other better!';
    }

    scoreContainer.classList.add('show');
}

// Playlist
let playlist = JSON.parse(localStorage.getItem('lovePlaylist')) || [];

function displayPlaylist() {
    const songList = document.getElementById('songList');
    const songsHTML = playlist.map((song, index) => `
        <div class="song-item">
            <div class="song-info">
                <div class="song-icon">
                    <i class="fas fa-music"></i>
                </div>
                <div class="song-details">
                    <h4>${song.title}</h4>
                    <p>${song.artist}</p>
                </div>
            </div>
            <button class="play-btn" onclick="playSong(${index})">
                <i class="fas fa-play"></i>
            </button>
        </div>
    `).join('');

    if (playlist.length === 0) {
        songList.innerHTML = '<h4 class="mb-4" style="color: var(--secondary);"><i class="fas fa-music me-2"></i> Your Songs</h4><p style="text-align: center; color: #999;">No songs yet. Add your first song above!</p>';
    } else {
        songList.innerHTML = '<h4 class="mb-4" style="color: var(--secondary);"><i class="fas fa-music me-2"></i> Your Songs</h4>' + songsHTML;
    }
}

function addSong() {
    const title = document.getElementById('songTitle').value.trim();
    const artist = document.getElementById('songArtist').value.trim();

    if (!title || !artist) {
        alert('Please enter both song title and artist!');
        return;
    }

    playlist.push({ title, artist });
    localStorage.setItem('lovePlaylist', JSON.stringify(playlist));
    
    document.getElementById('songTitle').value = '';
    document.getElementById('songArtist').value = '';
    
    displayPlaylist();
}

function playSong(index) {
    const song = playlist[index];
    alert(`Now playing: ${song.title} by ${song.artist} 🎵`);
}

displayPlaylist();

// Scroll reveal animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
