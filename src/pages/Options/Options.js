import React, { useEffect, useState } from 'react';
import './Options.css';
import storage from '../../modules/LocalStorage';

// An option to get unfinished notes
const Options = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        setNotes(storage.getVideoNotes());
    }, []);

    return (
        <div className="OptionsContainer">
            <h1>List of Notes for URL</h1>
            <h1>List of Notes</h1>
            { notes }
            <h1>Config Settings</h1>
        </div>
    );
};

export default Options;