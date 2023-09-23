class MdEntry {
    id: number;
    title: string;
    content: string;
    timeStamp: number;
    img: any; // For future

    constructor(id: number, title: string, content: string, timeStamp: number, img = null) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.timeStamp = timeStamp;
        this.img = img;
    }
}

class Markdown {
    yturl: string;
    ytTitle: string;
    mdcontent: MdEntry[];

    constructor(ytTitle: string, yturl: string) {
        this.ytTitle = ytTitle;
        this.yturl = yturl;

        // Init the array
        this.mdcontent = [];
    }

    createBlob(fileName: string = "output.md"): void {
        const blob = new Blob([ this.arrayOutput() ], { type: "text/markdown" });
        const blobUrl: string = URL.createObjectURL(blob);
        const downloadLink = document.createElement("a");
        downloadLink.href = blobUrl;
        downloadLink.download = fileName;

        // Downloads the file
        downloadLink.click();
        URL.revokeObjectURL(blobUrl);
    }

    arrayOutput(): string {
        let output = "";
        this.mdcontent.forEach((x) => {
            output += `# [${ x.title }](${ this.yturl }&t=${ x.timeStamp }s)\n${ x.content }\n`;
        });
        return output;
    }

    append(title: string, content: string): void {
        this.mdcontent.push(new MdEntry(this.mdcontent.length, title, content, 152));
    }

    removeTitle(title: string): void {
        for (let i = 0; i < this.mdcontent.length; i++) {
            if (this.mdcontent[i].title === title) {
                this.mdcontent.splice(i, 1);
                return;
            }
        }
        throw("Item not found in array");
    } 
    
    removeID(id: number): void {
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