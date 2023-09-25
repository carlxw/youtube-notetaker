/**
 * LEGEND
 * ================
 * ytmd_video_{url} - Markdown content for a video URL
 * ytmd_content - Previously un-submitted content
 */
const textKey = "ytmd_content";
const videoKey = "ytmd_video_";
class LocalStorage {
    /**
     * Prints all the keys associated with this app's local storage
     */
    printKeys() {
        for (let i = 0; i < localStorage.length; i++) {
            console.log(localStorage.getItem(localStorage.key(i)));
        }
    }

    // Markdown content ===========================================
    /**
     * Stores what is currently written to the local storage
     *  
     * @param {Object} obj The object to store to local data
     */
    setText(obj) {
        localStorage.setItem(textKey, JSON.stringify(obj));
    }

    /**
     * Gets what was written from the local storage
     * 
     * @returns Parsed object from local storage
     */
    getText() {
        return JSON.parse(localStorage.getItem(textKey));
    }

    /**
     * Clears the text of what was written
     */
    clearText() {
        localStorage.removeItem(textKey);
    }

    // Notes content ==============================================
    /**
     * Deletes all video notes in the local storage
     */
    clearAllNotes() {
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            if (key.includes(videoKey)) localStorage.removeItem(key);
        }
    }

    /**
     * Sets the serialized data to local storage
     * 
     * @param {Object} obj Serialized data that contains markdown object data
     * @param {string} url The current URL the user is on, used to identify sessions
     */
    setNote(obj, url) {
        localStorage.setItem(`${ videoKey }${ url }`, obj);
    }

    /**
     * Restores the data from a previous session. This method will return null if
     * there is no session to be restored from
     * 
     * @param {string} url The URL that the user is currently on
     * @returns Object that contains the markdown data. 
     */
    getNote(url) {
        return JSON.parse(localStorage.getItem(`${ videoKey }${ url }`));
    }
}

export default new LocalStorage();