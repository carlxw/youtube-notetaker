export function getVideoTitle(tabTitle) {
    return tabTitle.split(" - YouTube")[0];
}

export function sendMessage(tab, message, callback) {
    chrome.tabs.sendMessage(tab.id, message, {}, function (res) {
        if (res) callback(res, null);
        else callback(null, "No response received from the tab.");
    });
}