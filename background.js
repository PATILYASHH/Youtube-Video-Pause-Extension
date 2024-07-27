chrome.tabs.onActivated.addListener((activeInfo) => {
  handleTabChange(activeInfo.tabId);
});

chrome.windows.onFocusChanged.addListener((windowId) => {
  chrome.tabs.query({ active: true, windowId }, (tabs) => {
    if (tabs.length > 0) {
      handleTabChange(tabs[0].id);
    }
  });
});

function handleTabChange(tabId) {
  chrome.storage.local.get(['autoControl'], (result) => {
    if (result.autoControl) {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: () => {
          window.postMessage({ action: document.hidden ? 'pause' : 'play' }, '*');
        }
      });
    }
  });
}