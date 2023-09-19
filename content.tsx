const video: any = document.getElementsByTagName("video")[0];

console.log("Loaded content");

// setTimeout(() => {
//     pause();
//     console.log(getVideoTitle());
//     console.log(video);
//     console.log(getCurrentTime());
// }, 5000);

class YouTubeVideo {
    play(): void {
        if (video) video.play();
    }
    
    pause(): void {
        if (video) video.pause();
    }
    
    getVideoTitle(): string {
        return document.title.split(" - YouTube")[0];
    }
    
    getCurrentTime(): number {
        return document.getElementsByTagName('video')[0].currentTime;
    }
}

class ClipboardImage {
    async isImage(): Promise<boolean> {
        let imgdata:string = await navigator.clipboard.read()[0].types;
        return imgdata.indexOf("image") === -1 ? false : true;
    }

    // Paste the image
    // https://jsfiddle.net/bt7BU/225/
}