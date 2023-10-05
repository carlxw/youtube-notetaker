import React, { useEffect, useState } from "react";
import { store } from "../../../modules/ChromeHelper";
import storage from "../../../modules/LocalStorage";

const Annotations = ({md, setTextMode, currentURL}) => {
    const [notes, setNotes] = useState([]);

    function deleteAnnotation(id) {
        // Update md object
        md.removeID(id);

        generateArray();
        
        // Serialize only the data needed to recreate the object
        const serializedData = store(md);
    
        console.log("Setting data to local storage");
        storage.setNote(serializedData, currentURL);
    }
    
    useEffect(() => {
        generateArray();
    }, []);

    function generateArray() {
        if (md.mdcontent.length !== 0) {
            setNotes(md.mdcontent.map((x, idx) => (
                <div key={ `annotation${ idx }` }>
                    <p>
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
                </>
            }
        </>
    );
}

export default Annotations;