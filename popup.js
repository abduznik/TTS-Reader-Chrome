const voiceSelect = document.getElementById('voiceSelect');
const volumeSlider = document.getElementById('volumeSlider');
const volVal = document.getElementById('volVal');
const rateSelect = document.getElementById('rateSelect');

// Load settings
chrome.storage.local.get(['preferredVoice', 'volume', 'rate'], (res) => {
  if (res.volume !== undefined) {
    volumeSlider.value = res.volume * 100;
    volVal.textContent = Math.round(res.volume * 100) + "%";
  }
  if (res.rate) rateSelect.value = res.rate;
  
  chrome.tts.getVoices((voices) => {
    voices.forEach((voice) => {
      const option = document.createElement('option');
      option.value = voice.voiceName;
      option.textContent = `${voice.voiceName} (${voice.lang})`;
      voiceSelect.appendChild(option);
    });
    if (res.preferredVoice) voiceSelect.value = res.preferredVoice;
  });
});

// Save settings on change
volumeSlider.oninput = () => {
  const val = volumeSlider.value / 100;
  volVal.textContent = volumeSlider.value + "%";
  chrome.storage.local.set({ volume: val });
};

rateSelect.onchange = () => chrome.storage.local.set({ rate: parseFloat(rateSelect.value) });
voiceSelect.onchange = () => chrome.storage.local.set({ preferredVoice: voiceSelect.value });

document.getElementById('readBtn').onclick = () => chrome.runtime.sendMessage({ action: "read" });
