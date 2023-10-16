import storage from "./LocalStorage";

export function getVideoTitle(tabTitle) {
    return tabTitle.split(" - YouTube")[0];
}

export function checkConnection(tab, set) {
    chrome.tabs.sendMessage(tab.id, { action: null }, {}, function (res) {
        if (chrome.runtime.lastError) {
            // There is a problem with the connection
            set(false);
        } else if (res) {
            // There is a connection
            set(true);
        }
    });
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

export function mdToStorage(md, url) {
    // Serialize only the data needed to recreate the object
    const serializedData = store(md);
        
    console.log("Setting data to local storage");
    storage.setNote(serializedData, url);
}