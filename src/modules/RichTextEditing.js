// https://stackoverflow.com/questions/5379120/get-the-highlighted-selected-text
function getSelectionText() {
    var text = "";
    if (window.getSelection) text = window.getSelection().toString();
    else if (document.selection && document.selection.type != "Control") text = document.selection.createRange().text;

    return text.trim();
}

// Returns the starting position of what has been highlighted
function getHighlightedIndex() {
    const textarea = document.getElementById("md_textarea");
    return textarea.selectionStart;;
}

/**
 * Identifies where the first breakline character is in a selected string from a larger string
 * 
 * @param {string} text The full text of what to observe
 * @param {number} oldstart The number that was initially proposed
 * @returns Modified number that reflects where to put the first instance of a breakline
 */
function adjustSelection(text, oldstart) {
    let start = 0;

    // Loop backwards from the selection start to find a \n somewhere, there is an edge case when the the iterating variable is 0
    for (let i = oldstart; i >= 0; i--) {
        // If the first character itself is a breakline character, skip it
        if (i === oldstart && text[i] === "\n") continue;
        if (text[i] === "\n") {
            start = i;
            break;
        }
    }

    // Return 2 values: The new starting index and the old starting index
    return start;
}

/**
 * Helper function for rich text editing
 * 
 * @param {string} text Value of string to modify
 * @param {number} index The index of where to insert
 * @param {string} value The string that is to be inserted at the specified index   
 */
function insert(text, index, value) {
    return text.slice(0, index) + value + text.slice(index);
}

/**
 * Adds a character next to a breakline character
 * 
 * @param {string} fulltext The entire string to analyze
 * @param {number[]} index The starting and end of the user selection
 * @param {string} insert Element to insert next to the breakline character
 * @returns Modified full text string that contains the adquate modifications
 */
function insertAtBreakline(fulltext, index, element) {
    let temp = adjustSelection(fulltext, index[0]);
    index[0] = temp;
    
    // Identify where to insert character
    for (let i = index[1]; i >= index[0]; i--) {
        if (fulltext[i] === "\n") {
            fulltext = insert(fulltext, i+1, element);
        }
    }

    // Edge case
    if (index[0] === 0) fulltext = element + fulltext.trim();

    return fulltext;
}

function richText(action, content) {
    // User has text highlighted, only do something to the highlighted
    let text = getSelectionText();
    let index = [getHighlightedIndex(), getHighlightedIndex() + text.length];
    let element;

    // Insert elements at the endpoints of the highlighted text
    if (text) {
        switch (action) {
            case "bold":
                element = "**";
                break;
            case "italic":
                element = "*";
                break;
            case "underline":
                element = "__";
                break;
            case "latex_inline":
                element = "$";
                break;
            case "latex_block":
                element = "$$";
                break;
            case "list_number":
                content.set(insertAtBreakline(content.value, index, "1. "));
                return;
            case "list_point":
                content.set(insertAtBreakline(content.value, index, "* "));
                return;
            // Also need to implement something when only the cursor is at specific position
            default: throw ("Incorrect parameter provided");
        }
        content.value = insert(content.value, index[1], element);
        content.value = insert(content.value, index[0], element);
        content.set(content.value);
    }

    // Insert boilerplate at the end of the string
    else {
        let endChar = content.value[content.value.length - 1];
        let format;
        switch (action) {
            case "bold":
                format = `** insert_text_here **`;
                break;
            case "italic":
                format = `* insert_text_here *`;
                break;
            case "underline":
                format = `__ insert_text_here __`;
                break;
            case "latex_inline":
                format = `$ insert_text_here $`;
                break;
            case "latex_block":
                format = `$$ insert_text_here $$`;
                break;
            case "list_number":
                format = `1. insert_text_here`;
                // content.value is an empty string
                if (content.value === "") content.set(format);
                else content.set(content.value + `\n${ format }`);
                return;
            case "list_point":
                format = `* insert_text_here`;
                // content.value is an empty string
                if (content.value === "") content.set(format);
                else content.set(content.value + `\n${ format }`);
                return;
            default: throw ("Incorrect parameter provided");
        }
        // content.value is an empty string
        if (content.value === "") content.set(format);
        else content.set(content.value + (endChar !== " " ? ` ${ format }` : format));
    }
}

export { richText };