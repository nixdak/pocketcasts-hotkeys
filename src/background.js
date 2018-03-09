import * as browser from 'webextension-polyfill';

const pocketCastsUrl = 'https://playbeta.pocketcasts.com/*';
const togglePlaybackCommand = 'toggle-playback';
const skipEpisodeBackwardCommand = 'skip-episode-backward';
const skipEpisodeForwardCommand = 'skip-episode-forward';

async function openPocketCasts() {
    await browser.tabs.create({
        pinned: true,
        url: pocketCastsUrl.replace('*', ''),
    });
}

function scriptFor(command) {
    const scriptThatClicksOn = button_name => () => {
        const button = document.getElementsByClassName(button_name);

        if (button.length > 0) {
            button[0].click();
        }
    };

    switch (command) {
        case togglePlaybackCommand:
            return scriptThatClicksOn('play_pause_button');
        case skipEpisodeBackwardCommand:
            return scriptThatClicksOn('skip_back_button');
        case skipEpisodeForwardCommand:
            return scriptThatClicksOn('skip_forward_button');
    }
}

async function executePocketCastsCommand(command) {
    const pcTabs = await browser.tabs.query({ url: pocketCastsUrl });

    if (pcTabs.length === 0) return openPocketCasts();

    pcTabs.forEach(tab => {
        browser.tabs.executeScript(tab.id, {
            runAt: 'document_start',
            code: scriptFor(command),
        });
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
