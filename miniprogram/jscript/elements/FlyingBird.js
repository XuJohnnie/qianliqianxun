import Sprite from "../interface/Sprit.js"
import PictureLoader from "../publibrary/PictureLoader.js"
import ChildrenBirdFlowing from "../elements/ChildrenBirdFlowing.js"

export default class FlayingBird extends Sprite {

    constructor() {
        const birdDown = PictureLoader.Instance().get("bird_up");
        super(birdDown, 0, 0, birdDown.width, birdDown.height, 100, window.innerHeight / 2, birdDown.width, birdDown.height);
        this.posY = window.innerHeight / 2;
        this.mode = 0;
        this.time = 0;
        this.downImg = PictureLoader.Instance().get("bird_up");
        this.upImg = PictureLoader.Instance().get("bird_down");

        this.object = null;

        this.fbird = [];
        this.historyY = [];
    }

    flying() {
        if (this.upping > 0) {
            this.posY -= 0.25 * (this.time * this.time) / 2;
            this.time -= 0.1;
            if (this.upping > 15) {
                this.image = this.upImg;
            } else {
                this.image = this.downImg;
            }
            this.upping--;
            if (this.upping <= 0) {
                this.time = 0;
            }
        } else if (this.upping == 0) {
            this.time = 0;
            this.upping--;
        } else {
            this.posY += 0.25 * (this.time * this.time) / 2;
            this.time += 0.1;
            this.image = this.downImg;
        }

        this.ctx.drawImage(this.image, this.srcX, this.srcY, this.srcW, this.srcH, this.posX, this.posY, this.posW, this.posH);
        
        this.historyY.push(this.posY+this.image.height/2-5);
       //console.log("sssssssssssssy="+this.posY+" size="+this.historyY.length);
        if (this.historyY.length > 30) {
            this.historyY.shift();

            var index = 1;
            this.fbird.forEach((value) => {
                value.setPosY(this.historyY[this.historyY.length - (index*9)]);
             //   console.log("index=" + index + " posy=" + this.historyY[index * 2]);
                value.flying();
                index++;
            });
        }
    }

    upTheBird() {
        this.upping = 25;
        this.time = 4;
        this.draw();
    }

    reset(){
        this.posY = window.innerHeight / 2;
        this.mode = 0;
        this.time = 0;
        this.fbird.length = 0;
        this.historyY.length = 0;
    }

    addFlowBird(){
        if(this.fbird.length < 3){
            this.fbird.push(new ChildrenBirdFlowing());
        }

        var index = 1;
        this.fbird.forEach((value) => {
            value.setPosX(this.posX - (index*30));
            index++;
        });
    }

    isBirdSafe(){
        return (this.fbird.length > 0);
    }

    deleteOneFlowBird(){
        if(this.fbird.length > 0){
            this.fbird.shift();
        }
        var index = 1;
        this.fbird.forEach((value) => {
            value.setPosX(this.posX - (index * 30));
            index++;
        });
    }

    static Instance(){
        if(!this.object){
            this.object = new FlayingBird();
        }
        return this.object;
    }
}