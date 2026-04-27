const MENU_IDS = {
  PARENT: "tts-parent",
  START: "start-speak",
  STOP: "stop-speak"
};

let isSpeaking = false;

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({ id: MENU_IDS.PARENT, title: "TTS Reader", contexts: ["all"] });
  chrome.contextMenus.create({ id: MENU_IDS.START, parentId: MENU_IDS.PARENT, title: "Start Speaking", contexts: ["selection"] });
  chrome.contextMenus.create({ id: MENU_IDS.STOP, parentId: MENU_IDS.PARENT, title: "Stop Speaking", contexts: ["all"] });
});

const isHebrew = (text) => /[\u0590-\u05FF]/.test(text);

async function getVoice(text, preferred) {
  const voices = await new Promise(r => chrome.tts.getVoices(r));
  if (preferred && preferred !== 'auto') return preferred;

  const lang = isHebrew(text) ? 'he' : 'en';
  const match = voices.find(v => v.lang.startsWith(lang));
  return match ? match.voiceName : null;
}

async function toggleTTS() {
  if (isSpeaking) {
    chrome.tts.stop();
    isSpeaking = false;
    return;
  }

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) return;

  try {
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => window.getSelection().toString(),
    });

    const text = results?.[0]?.result?.trim();
    if (text) {
      const settings = await chrome.storage.local.get({
        preferredVoice: 'auto',
        volume: 1.0,
        rate: 1.0
      });

      const voice  = await getVoice(text, settings.preferredVoice);
      const volume = parseFloat(settings.volume);
      const rate   = parseFloat(settings.rate);

      chrome.tts.speak(text, {
        voiceName: voice,
        volume: isNaN(volume) ? 1.0 : volume,
        rate:   isNaN(rate)   ? 1.0 : rate,
        onEvent: (e) => {
          if (e.type === 'start') isSpeaking = true;
          if (['end', 'interrupted', 'error'].includes(e.type)) isSpeaking = false;
        }
      });
    }
  } catch (err) {
    if (!err.message?.includes("Cannot access") && !err.message?.includes("not allowed")) {
       console.error("TTS Error:", err);
    }
    isSpeaking = false;
  }
}

chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === MENU_IDS.START) toggleTTS();
  if (info.menuItemId === MENU_IDS.STOP) {
    chrome.tts.stop();
    isSpeaking = false;
  }
});

chrome.commands.onCommand.addListener((command) => {
  if (command === "read-selection") toggleTTS();
});

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "read") toggleTTS();
});
