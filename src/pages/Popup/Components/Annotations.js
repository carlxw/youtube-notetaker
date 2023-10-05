import React, { useEffect, useState } from "react";

const Annotations = ({md, setmd, setTextMode}) => {
    const [notes, setNotes] = useState([]);

    function deleteAnnotation(id) {
        // Update md object
        md.removeID(id);
        setmd(md);
    }
    
    useEffect(() => {
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
        }
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
                </>
            }
        </>
    );
}

export default Annotations;