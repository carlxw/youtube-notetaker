import React, { useEffect, useState } from "react";
import { mdToStorage, sendMessage } from "../../../modules/ChromeHelper";
import storage from "../../../modules/LocalStorage";

const Annotations = ({md, setTextMode, currentURL, activeTab}) => {
    const [notes, setNotes] = useState([]);

    function deleteAnnotation(id) {
        md.removeID(id);
        generateArray();
        mdToStorage(md, currentURL);
    }

    function deleteAll() {
        for (let i = md.mdcontent.length - 1; i >= 0; i--) {
            md.removeID(i);
        }

        generateArray();
        storage.deleteNote(currentURL);
    }

    function toTimestamp(ts) {
        sendMessage(activeTab, { action: "setTime", time: ts }, () => {});
    }
    
    function generateArray() {
        if (md.mdcontent.length !== 0) {
            setNotes(md.mdcontent.map((x, idx) => (
                <div key={ `annotation${ idx }` }>
                    <p id="annotation_timestamp" onClick={() => toTimestamp(x.timeStamp)}>
                        [{ md.secondsToTimeString(x.timeStamp) }] { x.title }
                    </p>
                    <p>
                        { x.content.substring(0, 20) + "..." }
                    </p>
                    <button onClick={() => deleteAnnotation(x.id)}>
                        Delete
                    </button>
                    <br />
                </div>
            )));
        } else setNotes([]);
    }
    
    useEffect(() => {
        generateArray();
    }, []);

    return (
        <>
            <button onClick={() => setTextMode(true)}>Return</button>
            {
                notes.length === 0 ?
                <p>You have no notes for this video!</p>
                :
                <>
                    <p>
                        See your video annotations below!
                    </p>
                    { notes }
                    <button onClick={ deleteAll }>
                        Delete all
                    </button>
                </>
            }
        </>
    );
}

export default Annotations;