import React, { useEffect, useState } from "react";

// Implement scuffed rich text editing
// Implement another way to handle custom errors!
const ErrorMessage = ({ error }) => {
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (error === "err_not_on_youtube") {
            setMessage("You are not on a YouTube page!");
        }

        else if (error === "err_not_connected") {
            setMessage("An error occured. Refresh the page!");
        }
    });

    return (
        <div>
            { message }
        </div>
    );
}

export default ErrorMessage;