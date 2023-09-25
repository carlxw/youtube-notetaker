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

function adjustSelection(text, oldstart) {
    let start;
    // Loop backwards from the selection start to find a \n somewhere, there is an edge case when the the iterating variable is 0
    for (let i = oldstart.length; i >= 0; i--) {
        if (text.substring(i, i+1) === "\n") start = i;
    }

    // Return 2 values: The new starting index and the old starting index; interesting case can occur if start is equal to end
    return start;
}

// // Debug purposes
// function sampleSelection(fulltext) {
//     // User has text highlighted, only do something to the highlighted
//     let text = getSelectionText();
//     let index = [getHighlightedIndex(), getHighlightedIndex() + text.length];

//     console.log(text, index);

//     index[0] = adjustSelection(fulltext, index[0]);
//     let x = fulltext.substring(index[0], index[1]);
//     console.log(x);
//     console.log(x.replaceAll("\n", "\n* "));
//     for (let i = index[1]; i >= index[0]; i--) {
//         if (fulltext.substring(i, i + 1) === "\n") {

//         }
//     }
// }

/**
 * Helper function for rich text editing
 * 
 * @param {string} text Value of string to modify
 * @param {number} index The index of where to insert
 * @param {string} value The string that is to be inserted at the specified index   
 */
function insert(text, index, value) {
    return text.slice(0, index) + value + content.value.slice(index);
}

function richText(action, content) {
    // User has text highlighted, only do something to the highlighted
    let text = getSelectionText();
    let index = [getHighlightedIndex(), getHighlightedIndex() + text.length];

    // Insert elements at the endpoints of the highlighted text
    if (text) {
        switch (action) {
            case "bold":
                content.value = insert(content.value, index[1], "**");
                content.value = insert(content.value, index[0], "**");
                content.set(content.value);
                break;
            case "italic":
                content.value = insert(content.value, index[1], "*");
                content.value = insert(content.value, index[0], "*");
                content.set(content.value);
                break;
            case "underline":
                content.value = insert(content.value, index[1], "__");
                content.value = insert(content.value, index[0], "__");
                content.set(content.value);
                break;
            case "latex_inline":
                content.value = insert(content.value, index[1], "$");
                content.value = insert(content.value, index[0], "$");
                content.set(content.value);
                break;
            case "latex_block":
                content.value = insert(content.value, index[1], "$$");
                content.value = insert(content.value, index[0], "$$");
                content.set(content.value);
                break;
            // Implement something for bullet points and number lists
            default: throw ("Incorrect parameter provided");
        }
    }

    // Insert boilerplate at the end of the string
    else {
        let endChar = content.value[content.value.length - 1];
        let format;
        switch (action) {
            case "bold":
                format = `** text **`;
                content.set(endChar !== " " ? content.value + ` ${ format }` : format);
                break;
            case "italic":
                format = `* text *`;
                content.set(endChar !== " " ? content.value + ` ${ format }` : format);
                break;
            case "underline":
                format = `__ text __`;
                content.set(endChar !== " " ? content.value + ` ${ format }` : format);
                break;
            case "latex_inline":
                format = `$ text $`;
                content.set(endChar !== " " ? content.value + ` ${ format }` : format);
                break;
            case "latex_block":
                format = `$$ text $$`;
                content.set(endChar !== " " ? content.value + ` ${ format }` : format);
                break;
            case "list_number":
                format = `1. text`;
                content.set(endChar !== "\n" ? `\n${ format }` : format);
                break;
            case "list_point":
                format = `* text`;
                content.set(endChar !== "\n" ? `\n${ format }` : format);
                break;
            default: throw ("Incorrect parameter provided");
        }
    }
}

export { richText, sampleSelection };