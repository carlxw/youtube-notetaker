import React, { useEffect, useState } from 'react';
import './Options.css';
import storage from '../../modules/LocalStorage';

// An option to get unfinished notes
const Options = () => {
    const [notes, setNotes] = useState([]);

    // Load all notes data on when the page loads
    useEffect(() => {
        let a = storage.getVideoNotes();
        console.log(a);
        let temp = a.map((x, index) => (
            <div className="yt_menu_list" key={index}>
                <a href={ x.yturl } target="_blank" rel="noopener">{ x.ytTitle }</a>
            </div>
        ));
        console.log(temp);
        setNotes(temp);
    }, []);

    return (
        <div className="OptionsContainer">
            <h1>List of Notes</h1>
            { notes }
            <button onClick={() => {
                localStorage.clear();
                // storage.clearAllNotes();
                location.reload();
            }}>Clear All Notes</button>
        </div>
    );
};

export default Options;