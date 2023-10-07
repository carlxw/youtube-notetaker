import { useEffect } from "react";
import storage from "../../../modules/LocalStorage";
import { mdToStorage } from "../../../modules/ChromeHelper";

export default function onSubmit(
    currentURL, md, entryTitle, entryBody, timeStamp, setEntryTitle, setEntryBody
) {
    useEffect(() => {
        // There may be a bug here
        if (timeStamp !== 0 && entryBody !== "" && entryTitle !== "") {
            md.push(entryTitle, entryBody, timeStamp);
            setEntryTitle("");
            setEntryBody("");
    
            // Text has been sucessfully used
            storage.clearText();
    
            mdToStorage(md, currentURL);
            window.close();
        }
    }, [timeStamp]);
}