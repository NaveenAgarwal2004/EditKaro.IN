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
    document.querySelectorAll('.portfolio-card, .filter-btn, .close-btn, .control-btn, .back-to-top, .header-nav a, .cta-button, .submit-btn, .read-more').forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            follower.classList.add('active');
        });
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            follower.classList.remove('active');
        });
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
});