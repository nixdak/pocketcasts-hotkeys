import * as browser from 'webextension-polyfill';

const pocketCastsUrl = 'https://playbeta.pocketcasts.com/*';
const togglePlaybackCommand = 'toggle-playback';
const skipEpisodeBackwardCommand = 'skip-episode-backward';
const skipEpisodeForwardCommand = 'skip-episode-forward';
const decreasePlaybackSpeedCommand = 'decrease-playback-speed';
const increasePlaybackSpeedCommand = 'increase-playback-speed';

async function openPocketCasts() {
    await browser.tabs.create({
        pinned: true,
        url: pocketCastsUrl.replace('*', ''),
    });
}

function scriptFor(command) {
    switch (command) {
        case togglePlaybackCommand:
            return scriptThatClicksOn('play_pause_button');
        case skipEpisodeBackwardCommand:
            return scriptThatClicksOn('skip_back_button');
        case skipEpisodeForwardCommand:
            return scriptThatClicksOn('skip_forward_button');
        case decreasePlaybackSpeedCommand:
            return scriptThatClicksOn('minus-button');
        case increasePlaybackSpeedCommand:
            return scriptThatClicksOn('plus-button');
    }
}

function scriptThatClicksOn(button_name) {
    const script = () => {
        const button = document.getElementsByClassName('button-name');
        if (button.length > 0) return button[0].click();
    };

    return `(${script.toString().replace('button-name', button_name)})()`;
}

async function executePocketCastsCommand(command) {
    const [pcTab] = await browser.tabs.query({ url: pocketCastsUrl });

    if (typeof pcTab === 'undefined' || pcTab === null) {
        return openPocketCasts();
    }

    browser.tabs.executeScript(pcTab.id, {
        runAt: 'document_start',
        code: scriptFor(command),
    });
}

// Listen for keyboard shortcuts
browser.commands.onCommand.addListener(executePocketCastsCommand);

browser.browserAction.onClicked.addListener(() =>
    executePocketCastsCommand('toggle-playback'),
);

browser.contextMenus.create({
    id: 'skip-backwards-menu-item',
    title: 'Skip Backwards',
    contexts: ['browser_action'],
    onclick: () => executePocketCastsCommand(skipEpisodeBackwardCommand),
});

browser.contextMenus.create({
    id: 'toggle-playback-menu-item',
    title: 'Toggle playback',
    contexts: ['browser_action'],
    onclick: () => executePocketCastsCommand(togglePlaybackCommand),
});

browser.contextMenus.create({
    id: 'skip-forward-menu-item',
    title: 'Skip Forward',
    contexts: ['browser_action'],
    onclick: () => executePocketCastsCommand(skipEpisodeForwardCommand),
});

browser.contextMenus.create({
    id: 'playback-separator',
    type: 'separator'
});

browser.contextMenus.create({
    id: 'decrease-playback-speed',
    title: 'Decrease playback speed',
    contexts: ['browser_action'],
    onclick: () => executePocketCastsCommand(decreasePlaybackSpeedCommand)
});

browser.contextMenus.create({
    id: 'increase-playback-speed',
    title: 'Increase playback speed',
    contexts: ['browser_action'],
    onclick: () => executePocketCastsCommand(increasePlaybackSpeedCommand)
});
