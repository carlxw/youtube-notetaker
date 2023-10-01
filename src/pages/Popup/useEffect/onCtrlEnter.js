const onCtrlEnter = (func) => {
    // Function to handle the key combination
    function handleKeyPress(event) {
    	if (event.key === 'Control' && event.key === 'Enter') {
            // Your code to run when Ctrl + Enter is pressed
            func();
        }
    }

    // Add an event listener to the document
    document.addEventListener('keydown', handleKeyPress);
}

export default onCtrlEnter;