function pauseVideo() {
    const video = document.querySelector('video');
    if (video && !video.paused) {
      video.pause();
      chrome.storage.local.set({ [window.location.href]: video.currentTime });
    }
  }
  
  function resumeVideo() {
    const video = document.querySelector('video');
    if (video) {
      chrome.storage.local.get(window.location.href, (result) => {
        if (result[window.location.href] !== undefined) {
          video.currentTime = result[window.location.href];
          video.play();
        }
      });
    }
  }
  
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      pauseVideo();
    } else {
      resumeVideo();
    }
  });
  