# TTS-Reader-Chrome

A lightweight Chrome extension that reads selected text using the browser's native text-to-speech engine.

## Features

- **Hotkey toggle** — start/stop speech without touching the mouse
- **Volume control** — adjustable slider (0–100%), saved between sessions
- **Speed control** — Slow (0.5×), Normal (1×), Fast (1.5×), saved between sessions
- **Voice selection** — pick any installed system voice or use Auto-Detect
- **Language auto-detection** — automatically chooses Hebrew or English voice based on selected text
- **Right-click context menu** — Start/Stop speaking from any page

## Installation

1. Clone this repository.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable **Developer mode** in the top right.
4. Click **Load unpacked** and select the project folder.

## Usage

1. Highlight any text on a webpage.
2. Press the hotkey **or** right-click → **TTS Reader → Start Speaking**.
3. Press the hotkey again (or use the **Start / Stop** button in the popup) to stop.

## Hotkey

| Platform | Shortcut |
|----------|----------|
| Windows / Linux | `Ctrl + Shift + U` |
| macOS | `Ctrl + Shift + U` |

> **Note for macOS users:** If the hotkey isn't working, go to `chrome://extensions/shortcuts` and confirm it's set to `Ctrl+Shift+U`. Chrome extension shortcuts can sometimes need to be manually confirmed after install or update.

## Settings (Popup)

Open the extension popup by clicking the TTS Reader icon in the toolbar to adjust:

- **Voice** — auto-detect or select a specific installed voice
- **Volume** — drag the slider; changes are saved immediately
- **Speed** — Slow / Normal / Fast; changes are saved immediately
