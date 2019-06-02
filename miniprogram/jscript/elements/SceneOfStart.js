import BackgroundStart from "../elements/BackgroundStart.js"
import Sprite from "../interface/Sprit.js"
import PictureLoader from "../publibrary/PictureLoader.js"
import GlobalData from "../publibrary/GlobaData.js"

export default class SceneOfStart {
    constructor() {
        this.bg = new BackgroundStart();
        let birddownImg = PictureLoader.Instance().get("bird_down");
        this.birdDown = new Sprite(birddownImg, 0, 0, birddownImg.width, birddownImg.height
            , window.innerWidth / 2 - birddownImg.width / 2, window.innerHeight / 2, birddownImg.width, birddownImg.height);

        let birdupImg = PictureLoader.Instance().get("bird_up");
        this.birdUp = new Sprite(birdupImg, 0, 0, birdupImg.width, birdupImg.height
            , window.innerWidth / 2 - birdupImg.width / 2, window.innerHeight / 2, birdupImg.width, birdupImg.height);

        this.index = 0;
    }

    play() {
        this.bg.draw();
        this.index++;
        if (this.index < 20) {
            this.birdDown.draw();
        } else if (this.index < 45) {
            this.birdUp.draw();
        } else {
            this.index = 0;
        }
    }

    onTouch(){
        GlobalData.Instance().set("state", 1);
    }
}