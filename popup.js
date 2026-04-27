const voiceSelect  = document.getElementById('voiceSelect');
const volumeSlider = document.getElementById('volumeSlider');
const volVal       = document.getElementById('volVal');
const rateSelect   = document.getElementById('rateSelect');

// Load saved settings (defaults applied only on first install)
chrome.storage.local.get({ volume: 1.0, rate: '1.0', preferredVoice: 'auto' }, (res) => {
  volumeSlider.value = res.volume * 100;
  volVal.textContent = Math.round(res.volume * 100) + '%';
  rateSelect.value = res.rate;

  chrome.tts.getVoices((voices) => {
    voices.forEach((voice) => {
      const option = document.createElement('option');
      option.value = voice.voiceName;
      option.textContent = `${voice.voiceName} (${voice.lang})`;
      voiceSelect.appendChild(option);
    });
    voiceSelect.value = res.preferredVoice;
  });
});

// Persist changes immediately on interaction
volumeSlider.oninput = () => {
  const val = volumeSlider.value / 100;
  volVal.textContent = volumeSlider.value + '%';
  chrome.storage.local.set({ volume: val });
};

rateSelect.onchange = () =>
  chrome.storage.local.set({ rate: rateSelect.value });

voiceSelect.onchange = () =>
  chrome.storage.local.set({ preferredVoice: voiceSelect.value });

document.getElementById('readBtn').onclick = () =>
  chrome.runtime.sendMessage({ action: 'read' });
