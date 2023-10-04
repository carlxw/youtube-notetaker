import { useEffect, useCallback } from "react";

const onKeyCtrl = (key, action) => {
	// Handle what happens on key press
	const handleKeyPress = useCallback((event) => {
		event.preventDefault();
		if (event.ctrlKey && event.key === key) action();
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