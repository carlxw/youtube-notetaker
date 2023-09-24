class MdEntry {
    id;
    title;
    content;
    timeStamp;
    img; // For future

    constructor(id, title, content, timeStamp, img = null) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.timeStamp = timeStamp;
        this.img = img;
    }
}

class Markdown {
    yturl;
    ytTitle;
    mdcontent;

    constructor(ytTitle, yturl) {
        this.ytTitle = ytTitle;
        this.yturl = yturl;

        // Init the array
        this.mdcontent = [];
    }

    createBlob(fileName = "output.md") {
        const blob = new Blob([ this.arrayOutput() ], { type: "text/markdown" });
        const blobUrl = URL.createObjectURL(blob);
        const downloadLink = document.createElement("a");
        downloadLink.href = blobUrl;
        downloadLink.download = fileName;

        // Downloads the file
        downloadLink.click();
        URL.revokeObjectURL(blobUrl);
    }

    arrayOutput() {
        // Maybe make the H1 take the user to when time is 0 seconds?
        let output = `# [${ this.ytTitle }](${ this.yturl })\n\n`;
        this.mdcontent.forEach((x) => {
            output += `## [[${ this._secondsToTimeString(x.timeStamp) }]](${ this.yturl }&t=${ x.timeStamp }s) ${ x.title }\n${ x.content }\n\n`;
        });
        return output;
    }

    _secondsToTimeString(x) {
        const hours = Math.floor(x / 3600);
        const minutes = Math.floor((x % 3600) / 60);
        const seconds = x % 60;
    
        if (hours > 0) {
            return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        } else {
            return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }
    }

    append(title, content, timeStamp) {
        this.mdcontent.push(new MdEntry(this.mdcontent.length, title, content, timeStamp));
    }

    removeTitle(title) {
        for (let i = 0; i < this.mdcontent.length; i++) {
            if (this.mdcontent[i].title === title) {
                this.mdcontent.splice(i, 1);
                return;
            }
        }
        throw("Item not found in array");
    } 
    
    removeID(id) {
        for (let i = 0; i < this.mdcontent.length; i++) {
            if (this.mdcontent[i].id === id) {
                this.mdcontent.splice(i, 1);
                return;
            }
        }
        throw("Item not found in array");
    }

    // https://stackoverflow.com/questions/8608724/how-to-zip-files-using-javascript
}

export default Markdown;