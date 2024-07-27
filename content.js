window.addEventListener('message', (event) => {
  if (event.source !== window) return;

  const video = document.querySelector('video');
  if (!video) return;

  const { action } = event.data;

  if (action === 'play') {
    video.play();
  } else if (action === 'pause') {
    video.pause();
  } else if (action === 'stop') {
    video.pause();
    video.currentTime = 0;
  }
});

document.addEventListener('visibilitychange', () => {
  chrome.storage.local.get(['autoControl'], (result) => {
    if (result.autoControl) {
      const video = document.querySelector('video');
      if (video) {
        if (document.hidden) {
          video.pause();
        } else {
          video.play();
        }
      }
    }
  });
});