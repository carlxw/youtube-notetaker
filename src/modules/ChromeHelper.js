export function getVideoTitle(tabTitle) {
    return tabTitle.split(" - YouTube")[0];
}

export function sendMessage(tab, message, callback) {
    if (chrome.runtime.lastError) {
        console.error(`Youtube Autopause error: ${chrome.runtime.lastError}`);
        callback(null, `Error: ${chrome.runtime.lastError}`);
        return;
    }

    chrome.tabs.sendMessage(tab.id, message, {}, function (res) {
        void chrome.runtime.lastError;
        if (res) {
            // console.log(res);
            callback(res, null);
        } else {
            callback(null, "No response received from the tab.");
        }
    });
}