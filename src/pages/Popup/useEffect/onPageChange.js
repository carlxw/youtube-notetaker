import { useEffect } from "react"

const onPageChange = (textMode, setSize) => {
    useEffect(() => {
        if (!textMode) {
            setSize({ height: "600px", width: "400px" });
        } else {
            setSize({ height: "260px", width: "300px" });
        }
    }, [textMode]);
}

export default onPageChange;