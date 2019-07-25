import PictureLoader from "./publibrary/PictureLoader.js"
import GlobalData from "./publibrary/GlobaData.js"
import Director from "./elements/Director.js"
import WXCloudDB from "./publibrary/WXCloudDB.js"

export default class Main2 {

    constructor() {
        this.canvas = wx.createCanvas();
        this.ctx = canvas.getContext('2d');
        GlobalData.Instance().set("ctx", this.ctx);
        GlobalData.Instance().set("canvas", this.canvas);

       // console.info("Hello world" + this.canvas.width);

        WXCloudDB.Instance();

        let loader = PictureLoader.Instance();
        loader.onload(() => this.onResouceLoaded());
        wx.onTouchStart((res) => this.onTouchStart(res));
        wx.onTouchEnd((res) => this.onTouchEnd(res));
    }

    onResouceLoaded() {
        console.log("picture loaded");
        this.resetGame();
    }

    onTouchStart(res) {
        Director.Instance().onTouchStart(res);
    }

    onTouchEnd(res) {
        Director.Instance().onTouchEnd(res);
    }

    resetGame() {
        Director.Instance().working();
        requestAnimationFrame(() => this.resetGame());
    }
};