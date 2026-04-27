const voiceSelect = document.getElementById('voiceSelect');

// Load and save voice preference
chrome.tts.getVoices((voices) => {
  voiceSelect.innerHTML = '<option value="auto">Auto-Detect Language</option>';
  voices.forEach((voice, i) => {
    const option = document.createElement('option');
    option.value = voice.voiceName;
    option.textContent = `${voice.voiceName} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });
  chrome.storage.local.get(['preferredVoice'], (res) => {
    voiceSelect.value = res.preferredVoice || 'auto';
  });
});

voiceSelect.onchange = () => {
  chrome.storage.local.set({ preferredVoice: voiceSelect.value });
};

document.getElementById('readBtn').onclick = () => {
  chrome.runtime.sendMessage({ action: "read" });
};

document.getElementById('stopBtn').onclick = () => {
  chrome.tts.stop();
};
