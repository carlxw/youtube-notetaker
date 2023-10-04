import { useEffect, useCallback } from "react";

const onKeyCtrl = (key, action) => {
	// Handle what happens on key press
	const handleKeyPress = useCallback((event) => {
		if (event.ctrlKey && event.key === key) {
			event.preventDefault();
			action();
		}
	}, [action]);

	useEffect(() => {
		// Attach the event listener
		document.addEventListener("keydown", handleKeyPress);

		// Remove the event listener
		return () => {
			document.removeEventListener("keydown", handleKeyPress);
		};
	}, [handleKeyPress]);
}

export default onKeyCtrl;