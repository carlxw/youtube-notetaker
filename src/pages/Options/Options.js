import React, { useEffect, useState } from 'react';
import './Options.css';
import storage from '../../modules/LocalStorage';

// An option to get unfinished notes
const Options = () => {
    const [notes, setNotes] = useState([]);

    // Load all notes data on when the page loads
    useEffect(() => {
        setNotes(storage.getVideoNotes().map((x, index) => (
            <div className="yt_menu_list" key={index}>
                <a href={ x.yturl } target="_blank" rel="noopener">{ x.ytTitle }</a>
            </div>
        )));
    }, []);

    function deleteNotes() {
        let choice = confirm("Are you sure you want to delete all video notes?");
        if (choice) {
            storage.clearAllNotes();
            location.reload();
        }
    }

    // Eventually implement a feature to delete specific notes in a list
    return (
        <div className="OptionsContainer">
            <h1>List of Notes</h1>
            { notes.length === 0 ? 
                <p>
                    No notes here! Go to a YouTube video and write a note!
                </p>
                :
                <>
                    { notes }
                    <button onClick={ deleteNotes }>Clear All Notes</button>
                </>
            }
        </div>
    );
};

export default Options;