import { useEffect, useCallback } from "react";

const onCtrlEnter = (func) => {
	// Handle what happens on key press
	const handleKeyPress = useCallback((event) => {
		if (event.ctrlKey && event.key === "Enter") {
			console.log("Trigger");
			func();
		}
	}, [func]);

	useEffect(() => {
		// Attach the event listener
		document.addEventListener('keydown', handleKeyPress);

		// Remove the event listener
		return () => {
			document.removeEventListener('keydown', handleKeyPress);
		};
	}, [handleKeyPress]);
}

export default onCtrlEnter;