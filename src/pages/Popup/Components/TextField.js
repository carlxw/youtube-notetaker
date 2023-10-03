import React, { useEffect } from "react";
import { richText } from "../../../modules/RichTextEditing";

const TextField = ({ handleSubmit, title, body }) => {
    useEffect(() => {
        // Activate the title text field on component mount
		document.getElementById("note_title_field").focus();
    }, []);

    return (
        <div>
            <span>
                <button onClick={() => richText("bold", body)}><b>B</b></button>
                <button onClick={() => richText("italic", body)}><i>I</i></button>
                <button onClick={() => richText("underline", body)}><u>U</u></button>
                <button onClick={() => richText("list_point", body)}>*</button>
                <button onClick={() => richText("list_number", body)}><code>1.</code></button>
            </span>
            <br />
            <span>
                <button onClick={() => richText("latex_inline", body)}><code>LaTeX Inline</code></button>
                <button onClick={() => richText("latex_block", body)}><code>LaTeX Block</code></button>
            </span>

            <form onSubmit={handleSubmit}>
                <input
                    id="note_title_field"
                    value={ title.value }
                    onChange={(e) => title.set(e.target.value)}
                    placeholder={"Add your note title here..."}
                />
                <textarea
                    id="md_textarea"
                    value={ body.value }
                    onChange={(e) => body.set(e.target.value)}
                    placeholder={"Write down any thoughts..."}
                />
                <br />
                <input type="submit" />
            </form>
        </div>
    );
}

export default TextField;