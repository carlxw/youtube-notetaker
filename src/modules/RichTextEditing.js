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

function richText(action) {
    // User has text highlighted, only do something to the highlighted
    let text = getSelectionText();
    let index = [getHighlightedIndex(), getHighlightedIndex() + text.length];

    console.log(text)
    if (text) {
        switch (action) {
            case "bold":
                body.value = body.value.slice(0, index[1]) + "**" + body.value.slice(index[1]);
                body.value = body.value.slice(0, index[0]) + "**" + body.value.slice(index[0]);
                body.set(body.value);
                break;
            case "italic":
                body.value = body.value.slice(0, index[1]) + "*" + body.value.slice(index[1]);
                body.value = body.value.slice(0, index[0]) + "*" + body.value.slice(index[0]);
                body.set(body.value);
                break;
            case "underline":
                body.value = body.value.slice(0, index[1]) + "__" + body.value.slice(index[1]);
                body.value = body.value.slice(0, index[0]) + "__" + body.value.slice(index[0]);
                body.set(body.value);
                break;
            case "latex_inline":
                body.value = body.value.slice(0, index[1]) + "$" + body.value.slice(index[1]);
                body.value = body.value.slice(0, index[0]) + "$" + body.value.slice(index[0]);
                body.set(body.value);
                break;
            case "latex_block":
                body.value = body.value.slice(0, index[1]) + "$$" + body.value.slice(index[1]);
                body.value = body.value.slice(0, index[0]) + "$$" + body.value.slice(index[0]);
                body.set(body.value);
                break;
            // Implement something for bullet points and number lists
            default: throw ("Incorrect parameter provided");
        }
    }

    // Insert boilerplate at the end of the string
    else {
        switch (action) {
            case "bold":
                body.set(body.value + ` ** text **`);
                break;
            case "italic":
                body.set(body.value + ` * text *`);;
                break;
            case "underline":
                body.set(body.value + ` __ text __`);
                break;
            case "latex_inline":
                body.set(body.value + ` $ equation $`);
                break;
            case "latex_block":
                body.set(body.value + ` $$ equation $$`);
                break;
            case "list_number":
                body.set(body.value + `\n1. text`);
                break;
            case "list_point":
                body.set(body.value + `\n* text`);
            default: throw ("Incorrect parameter provided");
        }
    }
}

export { richText, sampleSelection };