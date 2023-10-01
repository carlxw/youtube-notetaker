import { useEffect } from "react";
import storage from "../../../modules/LocalStorage";
import { store } from "../../../modules/ChromeHelper";

export default function onSubmit(
    currentURL, md, entryTitle, entryBody, timeStamp, setEntryTitle, setEntryBody
) {
    useEffect(() => {
        // There may be a bug here
        if (timeStamp !== 0) {
            md.push(entryTitle, entryBody, timeStamp);
            setEntryTitle("");
            setEntryBody("");
    
            // Text has been sucessfully used
            storage.clearText();
    
            // Serialize only the data needed to recreate the object
            const serializedData = store(md);
    
            console.log("Setting data to local storage");
            storage.setNote(serializedData, currentURL);
            window.close();
        }
    }, [timeStamp]);
}