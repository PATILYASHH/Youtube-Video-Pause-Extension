chrome.storage.local.get("autoPauseEnabled", (data) => {
    if (data.autoPauseEnabled) {
      document.addEventListener('visibilitychange', () => {
        const video = document.querySelector('video');
        if (document.hidden) {
          video.pause();
        } else {
          video.play();
        }
      });
    }
  });
  