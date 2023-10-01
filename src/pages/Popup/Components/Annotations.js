import React, { useEffect, useState } from "react";

const Annotations = ({md, setTextMode}) => {
    const [notes, setNotes] = useState([]);
    
    useEffect(() => {
        setNotes(md.mdcontent.map((x) => (
            <div>
                <p>
                    [{ md.secondsToTimeString(x.timeStamp) }] { x.title }
                </p>
                <p>
                    { x.content.substring(0, 20) + "..." }
                </p>
                <br />
            </div>
        )));
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