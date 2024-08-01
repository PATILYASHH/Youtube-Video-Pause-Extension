document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggleButton');
  
    chrome.storage.local.get('autoPauseEnabled', (data) => {
      if (data.autoPauseEnabled) {
        toggleButton.textContent = 'Disable Auto Pause';
        toggleButton.classList.remove('off');
      } else {
        toggleButton.textContent = 'Enable Auto Pause';
        toggleButton.classList.add('off');
      }
    });
  
    toggleButton.addEventListener('click', () => {
      chrome.storage.local.get('autoPauseEnabled', (data) => {
        const newValue = !data.autoPauseEnabled;
        chrome.storage.local.set({ autoPauseEnabled: newValue }, () => {
          if (newValue) {
            toggleButton.textContent = 'Disable Auto Pause';
            toggleButton.classList.remove('off');
          } else {
            toggleButton.textContent = 'Enable Auto Pause';
            toggleButton.classList.add('off');
          }
        });
      });
    });
  });
  