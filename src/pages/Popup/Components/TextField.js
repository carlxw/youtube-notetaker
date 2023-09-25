import React from "react";
import { richText, sampleSelection } from "../../../modules/RichTextEditing";

const TextField = ({ handleSubmit, title, body }) => {
    return (
        <>
            <span>
                <button onClick={() => richText("bold")}><b>B</b></button>
                <button onClick={() => richText("italic")}><i>I</i></button>
                <button onClick={() => richText("underline")}><u>U</u></button>
            </span>
            <span>
                <button onClick={() => richText("latex_inline")}><code>LaTeX Inline</code></button>
                <button onClick={() => richText("latex_block")}><code>LaTeX Block</code></button>
            </span>
            <span>
                <button onClick={ sampleSelection }>*</button>
                <button onClick={ sampleSelection }><code>1.</code></button>
            </span>
            <form onSubmit={handleSubmit}>
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