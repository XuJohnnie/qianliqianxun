import Sprite from "../interface/Sprit.js"
import PictureLoader from "../publibrary/PictureLoader.js"

export default class ChildrenBirdComming extends Sprite {
    constructor() {
        const birdDown = PictureLoader.Instance().get("sbird_a_down");
        super(birdDown, 0, 0, birdDown.width, birdDown.height, 100, window.innerHeight / 2, birdDown.width, birdDown.height);
        this.posY = window.innerHeight / 2;
        this.mode = 0;
        this.time = 0;
        this.downImg = PictureLoader.Instance().get("sbird_a_down");
        this.upImg = PictureLoader.Instance().get("sbird_a_up");
        this.upping = 0;
    }

    flying() {
        this.upping--;
        if (this.upping > 0) {
            this.image = this.downImg;
        }
        else {
            this.image = this.upImg;
            if (this.upping < -14) {
                this.upping = 15;
            }
        }
        this.draw();
    }

    setPosY(y){
        this.posY = y;
    }

    setPosX(x){
        this.posX = x;
    }
}