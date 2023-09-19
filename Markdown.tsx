class Markdown {
    mdcontent: string;
    mdurl: string;
    constructor(content: string) {
        this.mdcontent = content;
    }

    createBlob(): HTMLAnchorElement {
        const blob = new Blob([ this.mdcontent ], { type: "text/markdown" });
        const blobUrl: string = URL.createObjectURL(blob);
        const downloadLink = document.createElement("a");
        downloadLink.href = blobUrl;
        downloadLink.download = "output.md";

        return downloadLink;
    }
}