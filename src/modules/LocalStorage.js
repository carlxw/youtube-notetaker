/**
 * Prints all the keys associated with this app's local storage
 */
function printKeys() {
    for (let i = 0; i < localStorage.length; i++) {
        console.log(localStorage.getItem(localStorage.key(i)));
    }
}

/**
 * Returns an item by key
 */
function getByKey(key) {
    return JSON.parse(localStorage.getItem(key));
}

/**
 * Sets an item by key
 */
function setStorage(key, item) {
    localStorage.setItem(key, JSON.stringify(item));
}