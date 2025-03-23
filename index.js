document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS for scroll animations
    AOS.init({
        duration: 800,
        once: true,
    });

    // Preloader Logic
    const preloader = document.getElementById('preloader');

    // Function to hide the preloader
    const hidePreloader = () => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    };

    // Hide preloader when DOM is fully loaded (as a fallback)
    hidePreloader();

    // Also hide preloader when all resources are loaded
    window.addEventListener('load', hidePreloader);

    // Fallback: Force hide preloader after 5 seconds if it hasn't hidden yet
    setTimeout(hidePreloader, 5000);

    // Particles.js Background
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: '#39FF14' },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: '#6B48FF', opacity: 0.4, width: 1 },
            move: { enable: true, speed: 2, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
        },
        interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
            modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
        },
        retina_detect: true
    });

    // Parallax Background
    window.addEventListener('scroll', () => {
        const parallaxes = document.querySelectorAll('.parallax-bg');
        let scrollPosition = window.pageYOffset;
        parallaxes.forEach(parallax => {
            parallax.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        });
    });

    // Custom Cursor
    const cursor = document.getElementById('customCursor');
    const follower = document.getElementById('cursorFollower');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.5;
        cursorY += (mouseY - cursorY) * 0.5;
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;

        cursor.style.transform = `translate(${cursorX - 5}px, ${cursorY - 5}px)`;
        follower.style.transform = `translate(${followerX - 15}px, ${followerY - 15}px)`;

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Add active class to cursor on hover
    document.querySelectorAll('.portfolio-card, .filter-btn, .close-btn, .control-btn, .back-to-top, .header-nav a, .cta-button, .submit-btn').forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            follower.classList.add('active');
        });
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            follower.classList.remove('active');
        });
    });

    // Filter functionality with fade animation
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            // Fade out all cards
            portfolioCards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            });

            // Fade in filtered cards after a short delay
            setTimeout(() => {
                portfolioCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || filter === category) {
                        card.style.display = 'block';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }, 500);
        });
    });

    // Lightbox functionality with video controls and error handling
    const lightbox = document.getElementById('videoLightbox');
    const videoFrame = document.getElementById('videoFrame');
    const videoError = document.getElementById('videoError');
    const closeLightbox = document.getElementById('closeLightbox');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const videoLinks = document.querySelectorAll('.portfolio-card');
    let isPlaying = true;

    videoLinks.forEach(card => {
        card.addEventListener('click', () => {
            const videoUrl = card.querySelector('.video-link').getAttribute('data-video');
            console.log(`Attempting to load video: ${videoUrl}`);
            videoFrame.src = videoUrl;
            videoFrame.style.display = 'block';
            videoError.style.display = 'none';
            lightbox.style.display = 'flex';
            isPlaying = true;
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';

            // Error handling for video loading
            videoFrame.onerror = () => {
                console.error(`Failed to load video: ${videoUrl}`);
                videoFrame.style.display = 'none';
                videoError.style.display = 'block';
            };

            // Check if video loads successfully
            videoFrame.onload = () => {
                console.log(`Video loaded successfully: ${videoUrl}`);
                videoFrame.style.display = 'block';
                videoError.style.display = 'none';
            };
        });
    });

    closeLightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
        videoFrame.src = ''; // Stop the video by clearing the src
        videoFrame.style.display = 'block';
        videoError.style.display = 'none';
        isPlaying = true;
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    });

    // Close lightbox when clicking outside the video
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            videoFrame.src = '';
            videoFrame.style.display = 'block';
            videoError.style.display = 'none';
            isPlaying = true;
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
    });

    // Play/Pause video
    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            videoFrame.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            isPlaying = false;
        } else {
            videoFrame.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            isPlaying = true;
        }
    });

    // Back to Top Button
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Contact Form Submission (Basic Handling)
    const contactForm = document.querySelector(".contact-form");
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            message: formData.get("message")
        };
        console.log("Form Submitted:", data);
        alert("Thank you for your message! We will get back to you soon. ");
        contactForm.reset();
    });
});