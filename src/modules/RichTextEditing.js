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

// Debug purposes
function sampleSelection() {
    // User has text highlighted, only do something to the highlighted
    let text = getSelectionText();
    let index = [getHighlightedIndex(), getHighlightedIndex() + text.length];

    console.log(text, index);

    console.log((text.match(/\n/g) || []).length)
}

function richText(action, content) {
    // User has text highlighted, only do something to the highlighted
    let text = getSelectionText();
    let index = [getHighlightedIndex(), getHighlightedIndex() + text.length];

    if (text) {
        switch (action) {
            case "bold":
                content.value = content.value.slice(0, index[1]) + "**" + content.value.slice(index[1]);
                content.value = content.value.slice(0, index[0]) + "**" + content.value.slice(index[0]);
                content.set(content.value);
                break;
            case "italic":
                content.value = content.value.slice(0, index[1]) + "*" + content.value.slice(index[1]);
                content.value = content.value.slice(0, index[0]) + "*" + content.value.slice(index[0]);
                content.set(content.value);
                break;
            case "underline":
                content.value = content.value.slice(0, index[1]) + "__" + content.value.slice(index[1]);
                content.value = content.value.slice(0, index[0]) + "__" + content.value.slice(index[0]);
                content.set(content.value);
                break;
            case "latex_inline":
                content.value = content.value.slice(0, index[1]) + "$" + content.value.slice(index[1]);
                content.value = content.value.slice(0, index[0]) + "$" + content.value.slice(index[0]);
                content.set(content.value);
                break;
            case "latex_block":
                content.value = content.value.slice(0, index[1]) + "$$" + content.value.slice(index[1]);
                content.value = content.value.slice(0, index[0]) + "$$" + content.value.slice(index[0]);
                content.set(content.value);
                break;
            // Implement something for bullet points and number lists
            default: throw ("Incorrect parameter provided");
        }
    }

    // Insert boilerplate at the end of the string
    else {
        switch (action) {
            case "bold":
                content.set(content.value + ` ** text **`);
                break;
            case "italic":
                content.set(content.value + ` * text *`);;
                break;
            case "underline":
                content.set(content.value + ` __ text __`);
                break;
            case "latex_inline":
                content.set(content.value + ` $ equation $`);
                break;
            case "latex_block":
                content.set(content.value + ` $$ equation $$`);
                break;
            case "list_number":
                content.set(content.value + `\n1. text`);
                break;
            case "list_point":
                content.set(content.value + `\n* text`);
            default: throw ("Incorrect parameter provided");
        }
    }
}

export { richText, sampleSelection };