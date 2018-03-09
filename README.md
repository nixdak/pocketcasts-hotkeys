# PocketCasts Hotkeys
Browser extension that adds keyboard control to the [PocketCasts](https://pocketcasts.com) webplayer

## Background

I love the [Google Music Hotkeys](https://github.com/lidel/google-music-hotkeys) extension. I wanted something similar for PocketCasts, so I did what any good software developer would, and copypasted from the internet till it worked.

## Features

- Supports Firefox and Chrome
- Currently only works for the beta webplayer. I'll add the non-beta webplayer at some stage.
- Keyboard shortcuts for controlling podcast playback.
  - Toggle playback: <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>O</kbd>
  - Skip episode backwards: <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd>
  - Skip episode forwards: <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>
  - Alter playback speed: <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>L</kbd>
- Menu bar item:
  - A regular click will either:
    - Toggle playback of an episode if PocketCasts is open
    - Opens and pins PocketCasts if it is not open
  - Right click opens a context menu with options for playback

## Installation

I'll be releasing this extension on the Firefox and Chrome stores soon but for now, the extension needs to be sideloaded

### Build

To build run

```shell
yarn
yarn build
```

### Firefox

1. [about:debugging](about:debugging)
2. Click `Load Temporary Add-On`
3. Navigate to the `dist` directory and load `manifest.json`

### Chrome

1. [chrome://extensions](chrome://extensions)
2. Click `Developer mode`
3. Click `Load unpacked extensions`
4. Navigate to the `dist` directory and load `manifest.json`
