document.addEventListener('DOMContentLoaded', () => {
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
});