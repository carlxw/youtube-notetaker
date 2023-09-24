import React from "react";

// Implement scuffed rich text editing
const TextField = ({ handleSubmit, title, body }) => {
    return (
        <form onSubmit={ handleSubmit }>
            <input
                value={title.value}
                onChange={(e) => title.set(e.target.value)}
                placeholder={"Add your note title here..."}
            />
            <textarea 
                value={body.value} 
                onChange={(e) => body.set(e.target.value)}
                placeholder={"Write down any thoughts..."}
            />
            <br />
            <input type="submit" />
        </form>
    );
}

export default TextField;