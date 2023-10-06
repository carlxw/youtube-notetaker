export function getVideoTitle(tabTitle) {
    return tabTitle.split(" - YouTube")[0];
}

export function sendMessage(tab, message, callback) {
    chrome.tabs.sendMessage(tab.id, message, {}, function (res) {
        if (chrome.runtime.lastError) {
            // Handle the error here
            console.error(chrome.runtime.lastError);
            console.log("Refresh the page!!!");
        }
        if (res) callback(res, null);
    });
}

export function store(md) {
    return { ytTitle: md.ytTitle, yturl: md.yturl, mdcontent: md.mdcontent };
}