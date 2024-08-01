let autoPauseEnabled = true;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ autoPauseEnabled: true });
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (tab.url.includes("youtube.com/watch")) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: playVideo
      });
    } else {
      chrome.tabs.query({ url: "*://www.youtube.com/*" }, (tabs) => {
        tabs.forEach((tab) => {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: pauseVideo
          });
        });
      });
    }
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url.includes("youtube.com/watch")) {
    if (autoPauseEnabled) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: addVisibilityChangeListener
      });
    }
  }
});

function playVideo() {
  const video = document.querySelector('video');
  if (video) {
    video.play();
  }
}

function pauseVideo() {
  const video = document.querySelector('video');
  if (video) {
    video.pause();
  }
}

function addVisibilityChangeListener() {
  document.addEventListener('visibilitychange', () => {
    const video = document.querySelector('video');
    if (document.hidden) {
      video.pause();
    } else {
      video.play();
    }
  });
}
