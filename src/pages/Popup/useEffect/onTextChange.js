import { useEffect } from "react";
import storage from "../../../modules/LocalStorage";

export default function onTextChange(
    entryTitle, entryBody
) {
    useEffect(() => {
        if (entryTitle === "" && entryBody === "") return;
    
        const serializedData = {
            title: entryTitle.trim(),
            body: entryBody.trim()
        }
    
        storage.setText(serializedData);
    }, [entryTitle, entryBody]);
}