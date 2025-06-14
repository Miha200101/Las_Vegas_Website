// main.js
// Funcție globală YouTube pentru player limitat
function createLimitedYouTubePlayer({ elementId, videoId, startTime = 0, duration = 10 }) {
  const player = new YT.Player(elementId, {
    height: '280',
    width: '100%',
    videoId: videoId,
    playerVars: {
      autoplay: 1,
      controls: 1,
      start: startTime
    },
    events: {
      onReady: (event) => {
        event.target.playVideo();
      },
      onStateChange: (event) => {
        if (event.data === YT.PlayerState.PLAYING) {
          setTimeout(() => {
            event.target.stopVideo();
          }, duration * 1000);
        }
      }
    }
  });

  return player;
}

// Configurația videoclipurilor
const videoConfig = [
  { elementId: 'player1', videoId: '1U2ppIeN8UE', startTime: 0, duration: 20 },
  { elementId: 'player2', videoId: 'DS_Z432yaiE', startTime: 60, duration: 20 },
  { elementId: 'player3', videoId: 'Ilm8LxfgbkY', startTime: 20, duration: 20 },
  { elementId: 'player4', videoId: 'osOwzZWCNgo', startTime: 30, duration: 20 },
  { elementId: 'player5', videoId: 'I6gSEsftPVU', startTime: 0, duration: 20 },
  { elementId: 'player6', videoId: 'yJfw6V0OsvU', startTime: 60, duration: 20 },
  { elementId: 'player7', videoId: 'VSuSN_qfB0I', startTime: 20, duration: 20 },
  { elementId: 'player8', videoId: 'r0ey28AmGiM', startTime: 30, duration: 20 }
];

// YouTube API va apela asta automat
function onYouTubeIframeAPIReady() {
  videoConfig.forEach(cfg => createLimitedYouTubePlayer(cfg));
}

// Restul funcțiilor rămân în interiorul DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.add('loaded');

  const gallery = document.querySelector('.image-gallery');
  const track = gallery?.querySelector('.gallery-track');
  const scrollLeft = gallery?.querySelector('.scroll-btn.left');
  const scrollRight = gallery?.querySelector('.scroll-btn.right');
  const exploreBtn = document.getElementById('scrollToGallery');

  // Scroll pe mouse
  if (gallery && track) {
    gallery.addEventListener('mousemove', (e) => {
      const { left, width } = gallery.getBoundingClientRect();
      const mouseX = e.clientX - left;
      const percentage = mouseX / width;
      const scrollAmount = (track.scrollWidth - width) * percentage;

      track.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    });
  }

  // Scroll la click pe săgeți
  if (scrollLeft && scrollRight && track) {
    scrollLeft.addEventListener('click', () => {
      track.scrollBy({ left: -400, behavior: 'smooth' });
    });

    scrollRight.addEventListener('click', () => {
      track.scrollBy({ left: 400, behavior: 'smooth' });
    });
  }

  // Autoplay galerie
  if (track) {
    const images = track.querySelectorAll('img');
    let index = 0;
    let sliderInterval;

    const showImage = (i) => {
      images.forEach((img) => img.classList.remove('active'));
      if (images[i]) {
        images[i].classList.add('active');
        track.scrollTo({
          left: images[i].offsetLeft - 40,
          behavior: 'smooth'
        });
      }
    };

    const startSlider = () => {
      sliderInterval = setInterval(() => {
        index = (index + 1) % images.length;
        showImage(index);
      }, 3500);
    };

    const stopSlider = () => clearInterval(sliderInterval);

    showImage(index);
    startSlider();

    gallery?.addEventListener('mouseenter', stopSlider);
    gallery?.addEventListener('mouseleave', startSlider);
  }

  // Scroll la galerie din buton "Explore"
  if (exploreBtn && gallery) {
    exploreBtn.addEventListener('click', () => {
      gallery.scrollIntoView({ behavior: 'smooth' });
    });
  }
  
})