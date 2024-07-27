document.getElementById('play').addEventListener('click', () => {
  sendMessageToContentScript({ action: 'play' });
});

document.getElementById('pause').addEventListener('click', () => {
  sendMessageToContentScript({ action: 'pause' });
});

document.getElementById('stop').addEventListener('click', () => {
  sendMessageToContentScript({ action: 'stop' });
});

document.getElementById('autoControl').addEventListener('change', (event) => {
  chrome.storage.local.set({ autoControl: event.target.checked });
});

chrome.storage.local.get(['autoControl'], (result) => {
  document.getElementById('autoControl').checked = result.autoControl || false;
});

function sendMessageToContentScript(message) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: (message) => {
        window.postMessage(message, '*');
      },
      args: [message]
    });
  });
}