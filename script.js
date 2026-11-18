// Generate Floating Hearts Background
const heartsContainer = document.getElementById('hearts-bg');
const heartIcons = ['❤️', '💖', '🌸', '✨', '💕', '🌷', '🥰', '💌', '🛵'];

for (let i = 0; i < 24; i++) {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.innerText = heartIcons[Math.floor(Math.random() * heartIcons.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (6 + Math.random() * 6) + 's';
    heart.style.animationDelay = (Math.random() * 5) + 's';
    heart.style.fontSize = (16 + Math.random() * 16) + 'px';
    heartsContainer.appendChild(heart);
}

// Data Foto & Caption Kenangan
const gallery = [
    {
        src: 'foto1.jpg',
        caption: 'Masa bidadari IVI Piaggio cemberut begini... 🥺'
    },
    {
        src: 'foto2.jpg',
        caption: 'Kangen bercanda & ketawa lepas bareng Feby... ❤️'
    },
    {
        src: 'foto3.png',
        caption: 'Momen konyol yang selalu bikin bahagia punya kamu 🥰'
    }
];

let currentSlide = 0;

function updatePhotoDisplay() {
    const girlPhoto = document.getElementById('girlPhoto');
    const photoCaption = document.getElementById('photoCaption');
    const dots = document.querySelectorAll('.dot');

    girlPhoto.style.opacity = '0';
    setTimeout(() => {
        girlPhoto.src = gallery[currentSlide].src;
        photoCaption.innerText = gallery[currentSlide].caption;
        girlPhoto.style.opacity = '1';

        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }, 200);
}

function nextPhoto(e) {
    if (e) e.stopPropagation();
    currentSlide = (currentSlide + 1) % gallery.length;
    updatePhotoDisplay();
}

function prevPhoto(e) {
    if (e) e.stopPropagation();
    currentSlide = (currentSlide - 1 + gallery.length) % gallery.length;
    updatePhotoDisplay();
}

function jumpToPhoto(index) {
    currentSlide = index;
    updatePhotoDisplay();
}

// AUDIO ENGINE
const bgMusic = document.getElementById('bgMusic');
const musicIcon = document.getElementById('musicIcon');
const musicLabelText = document.getElementById('musicLabelText');
let isEnvelopeOpened = false;

function playMusic() {
    if (!bgMusic) return;
    bgMusic.volume = 1.0;
    
    // Pastikan src terhubung (format asli file TikTok adalah M4A / AAC)
    if (!bgMusic.src || bgMusic.src === '' || bgMusic.src.includes('music.mp3')) {
        bgMusic.src = 'music.m4a';
    }

    const playPromise = bgMusic.play();
    if (playPromise !== undefined) {
        playPromise.then(() => {
            if (musicIcon) {
                musicIcon.classList.add('rotating');
                musicIcon.innerText = '🎵';
            }
            if (musicLabelText) musicLabelText.innerText = 'Sampai Jadi Debu 🎶';
        }).catch(err => {
            console.warn("Browser menahan audio otomatis:", err);
            if (musicIcon) {
                musicIcon.classList.remove('rotating');
                musicIcon.innerText = '▶️';
            }
            if (musicLabelText) musicLabelText.innerText = 'Klik untuk Putar Musik 🎵';
        });
    }
}

function pauseMusic() {
    if (!bgMusic) return;
    bgMusic.pause();
    if (musicIcon) {
        musicIcon.classList.remove('rotating');
        musicIcon.innerText = '🔇';
    }
    if (musicLabelText) musicLabelText.innerText = 'Lagu Berhenti ⏸️';
}

function toggleMusic(e) {
    if (e) e.stopPropagation();
    if (bgMusic.paused) {
        playMusic();
    } else {
        pauseMusic();
    }
}

// Buka Amplop Surat
function openLetter() {
    isEnvelopeOpened = true;
    
    // Putar musik langsung saat klik amplop (user interaction token aktif)
    playMusic();

    const envelopeScreen = document.getElementById('envelope-screen');
    const mainContent = document.getElementById('main-content');
    
    envelopeScreen.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    envelopeScreen.style.opacity = '0';
    envelopeScreen.style.transform = 'scale(0.8)';

    setTimeout(() => {
        envelopeScreen.classList.add('hidden');
        mainContent.classList.remove('hidden');
        
        // Pesta konfeti saat surat terbuka
        confetti({
            particleCount: 60,
            spread: 70,
            origin: { y: 0.6 }
        });
    }, 350);
}

// Fallback interaksi: klik pertama kali di mana saja pada layar akan langsung memutar musik jika tertahan
document.addEventListener('click', function unlockAudio() {
    if (isEnvelopeOpened && bgMusic.paused) {
        playMusic();
    }
}, { passive: true });

// Tombol "Nggak mau" yang Menghindar & Berubah Teks Khusus Feby
const btnNo = document.getElementById('btnNo');
let dodgeCount = 0;

const funnyTexts = [
    "Eits, gak kena Feby sayang 😜",
    "Masa tega sih sama aku? 🥺",
    "Janji jemput naik Vespa sore ini! 🛵💨",
    "Jangan ngambek lagi dong bidadari IVI Piaggio... 🥺❤️",
    "Plisss maafin aku ya Febyyy 😭",
    "Nanti aku beliin makanan kesukaan Feby! 🍧",
    "Tombol ini nyerah, klik yang merah aja Feb! 👉"
];

function dodgeButton() {
    dodgeCount++;
    
    if (dodgeCount <= funnyTexts.length) {
        btnNo.innerText = funnyTexts[dodgeCount - 1];
    } else {
        btnNo.innerText = funnyTexts[funnyTexts.length - 1];
    }

    const randomX = (Math.random() - 0.5) * 260;
    const randomY = (Math.random() - 0.5) * 160;

    btnNo.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

// Fungsi Ketika Dimaafkan
function onForgive() {
    document.getElementById('action-section').classList.add('hidden');
    document.getElementById('forgiven-section').classList.remove('hidden');

    // Tampilkan Foto ke-4 (Foto Senyum Paling Bahagia Berdua)
    const girlPhoto = document.getElementById('girlPhoto');
    const photoCaption = document.getElementById('photoCaption');
    
    girlPhoto.style.opacity = '0';
    setTimeout(() => {
        girlPhoto.src = 'foto4.png';
        photoCaption.innerText = "Nah gitu dong senyum! Makasih banyak ya Feby sayang, love you so much! 🥰🛵❤️";
        girlPhoto.style.opacity = '1';
    }, 250);

    // Sembunyikan navigasi panah & dots saat sudah dimaafkan
    const arrows = document.querySelector('.slider-arrows');
    const dots = document.getElementById('dotsContainer');
    const tip = document.querySelector('.slide-tip');
    if (arrows) arrows.style.display = 'none';
    if (dots) dots.style.display = 'none';
    if (tip) tip.style.display = 'none';

    // Pesta Konfeti Meriah
    const duration = 5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 6,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
        confetti({
            particleCount: 6,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}
