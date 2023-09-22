module.exports = class YouTubeVideo {
    video: HTMLVideoElement;
    url: string;
    title: string;

    constructor(video: HTMLVideoElement) {
        this.video = video;
        this.url = window.location.href;
        this.title = this._getVideoTitle();
    }

    play(): void {
        if (this.video) this.video.play();
    }
    
    pause(): void {
        if (this.video) this.video.pause();
    }
    
    _getVideoTitle(): string {
        return document.title.split(" - YouTube")[0];
    }
    
    getCurrentTime(): number {
        return document.getElementsByTagName("video")[0].currentTime;
    }

    isPaused(): boolean {
        return this.video.paused;
    }

    createLink(): string {
        if (this.url === "") throw("No URL found with object");
        return `${ this.url }&t=${ this.getCurrentTime() }`
    }
}
