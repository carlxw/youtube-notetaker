import React from "react";

// Implement scuffed rich text editing
const TextField = ({ handleSubmit, title, body }) => {
    // https://stackoverflow.com/questions/5379120/get-the-highlighted-selected-text
    function getSelectionText() {
        var text = "";
        if (window.getSelection) text = window.getSelection().toString(); 
        else if (document.selection && document.selection.type != "Control") text = document.selection.createRange().text;
        return text;
    }

    // Returns the starting position of what has been highlighted
    function getHighlightedIndex() {
        const textarea = document.getElementById("md_textarea");
        return textarea.selectionStart;;
    }

    function richText(action) {
        // User has text highlighted, only do something to the highlighted
        let text = getSelectionText();
        let index = [getHighlightedIndex(), getHighlightedIndex() + text.length];

        if (text) {
            switch(action) {
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
                default: throw("Incorrect parameter provided");
            }
        }

        // Insert boilerplate at the end of the string
        else {

        }
    }

    return (
        <>    
            <button onClick={() => richText("bold")}>Bold</button>
            <button onClick={() => richText("italic")}>Italic</button>
            <button onClick={() => richText("underline")}>Underline</button>
            <form onSubmit={ handleSubmit }>
                <input
                    value={title.value}
                    onChange={(e) => title.set(e.target.value)}
                    placeholder={"Add your note title here..."}
                    />
                <textarea 
                    id="md_textarea"
                    value={body.value} 
                    onChange={(e) => body.set(e.target.value)}
                    placeholder={"Write down any thoughts..."}
                    />
                <br />
                <input type="submit" />
            </form>
        </>
    );
}

export default TextField;