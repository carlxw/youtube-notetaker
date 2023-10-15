import React, { useEffect, useState } from 'react';
import './Options.css';
import storage from '../../modules/LocalStorage';

// An option to get unfinished notes
const Options = () => {
    const [notes, setNotes] = useState([]);

    // Load all notes data on when the page loads
    useEffect(() => {
        loadNotes();
    }, []);

    function deleteNote(url) {
        storage.deleteNote(url);
        loadNotes();
    }

    function loadNotes() {
        setNotes(storage.getVideoNotes().map((x, index) => (
            <div className="yt_menu_list" key={ index }>
                <a href={ x.yturl } target="_blank" rel="noopener">{ x.ytTitle }</a>
                <button onClick={ () => deleteNote(x.yturl) }>Delete</button>
            </div>
        )));
    }

    function deleteAllNotes() {
        let choice = confirm("Are you sure you want to delete all video notes?");
        if (choice) {
            storage.clearAllNotes();
            location.reload();
        }
    }

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
                    <button onClick={ deleteAllNotes }>Clear All Notes</button>
                </>
            }
        </div>
    );
};

export default Options;