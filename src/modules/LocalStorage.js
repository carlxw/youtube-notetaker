/**
 * LEGEND
 * ================
 * ytmd_video_{url} - Markdown content for a video URL
 * ytmd_content - Previously un-submitted content
 * ytmd_config - Any settings related to this Chrome extension
 */
const TEXTKEY = "ytmd_content";
const VIDEOKEY = "ytmd_video_";
const CONFIGKEY = "ytmd_config";
class LocalStorage {
    /**
     * Prints all the keys associated with this app's local storage
     */
    printKeys() {
        for (let i = 0; i < localStorage.length; i++) {
            console.log(localStorage.getItem(localStorage.key(i)));
        }
    }

    /**
     * Prints the local storage data 
     */
    printText() {
        console.log(this.getText());
    }

    /**
     * Prints all video notes data
     */
    printNotes() {
        config.log(this.getVideoNotes());
    }

    /**
     * Prints all config data
     */
    printConfig() {
        config.log(this.getConfig());
    }

    // Config content =============================================
    /**
     * Fetches the user settings from the local storage
     * 
     * @returns {object} Config object that contains the user's preferences
     */
    getConfig() {
        return JSON.parse(localStorage.getItem(CONFIGKEY));
    }
    
    /**
     * Sets the config to the local storage
     * 
     * @param {Object} object The user's setting config
     */
    setConfig(object) {
        localStorage.setItem(CONFIGKEY, JSON.stringify(object));
    }

    // Markdown content ===========================================
    /**
     * Stores what is currently written to the local storage
     *  
     * @param {Object} obj The object to store to local data
     */
    setText(obj) {
        localStorage.setItem(TEXTKEY, JSON.stringify(obj));
    }

    /**
     * Gets what was written from the local storage
     * 
     * @returns {object} Parsed object from local storage
     */
    getText() {
        return JSON.parse(localStorage.getItem(TEXTKEY));
    }

    /**
     * Clears the text of what was written
     */
    clearText() {
        localStorage.removeItem(TEXTKEY);
    }

    // Notes content ==============================================
    /**
     * Deletes all video notes in the local storage
     */
    clearAllNotes() {
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            if (key.includes(VIDEOKEY)) localStorage.removeItem(key);
        }
    }

    /**
     * Sets the serialized data to local storage
     * 
     * @param {Object} obj Serialized data that contains markdown object data
     * @param {string} url The current URL the user is on, used to identify sessions
     */
    setNote(obj, url) {
        localStorage.setItem(`${ VIDEOKEY }${ url }`, JSON.stringify(obj));
    }

    /**
     * Restores the data from a previous session. This method will return null if
     * there is no session to be restored from
     * 
     * @param {string} url The URL that the user is currently on
     * @returns {Object} Object that contains the markdown data. 
     */
    getNote(url) {
        return JSON.parse(localStorage.getItem(`${ VIDEOKEY }${ url }`));
    }

    /**
     * Gets all video notes that are stored in local storage
     * 
     * @returns {Object} Object that contains all video notes
     */
    getVideoNotes() {
        let output = [];
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            if (key.includes(VIDEOKEY)) output.push(JSON.parse(localStorage.getItem(key)));
        }

        // Should sort by the video title alphabetically
        output.sort()
        return output;
    }

    /**
     * Delete the specified note given a specific url
     * 
     * @param {string} url URL of the video that has notes to delete
     */
    deleteNote(url) {
        localStorage.removeItem(`${ VIDEOKEY }${ url }`);
    }
}
const storage = new LocalStorage();

export default storage;