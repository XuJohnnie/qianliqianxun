import Sprite from "../interface/Sprit.js"
import PictureLoader from "../publibrary/PictureLoader.js"

export default class ChildrenBirdComming extends Sprite{
    constructor(){
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
        else{
            this.image = this.upImg;
            if(this.upping < -14){
                this.upping = 15;
            }
        }
        //console.log("ssssssssssssssssssssssflying up="+this.upping);
        this.ctx.save();
        //this.ctx.beginPath();
        //this.ctx.lineWidth = this.arc;
        // this.ctx.strokeStyle = '#ccc';
        // this.ctx.arc(window.innerWidth, window.innerHeight, 45, 0, 2 * Math.PI);
        // this.ctx.rotate(20 * Math.PI / 180); // 旋转值
        // this.draw(); 
        this.ctx.translate((this.posX + this.posW / 2) * 2, 0);
        this.ctx.scale(-1, 1);
        //this.ctx.translate(-(this.posX + this.posW / 2), 0);
        this.ctx.drawImage(this.image, this.srcX, this.srcY, this.srcW, this.srcH, this.posX, this.posY, this.posW, this.posH);
        // this.ctx.closePath();
        //  this.ctx.stroke();
        this.ctx.restore();

        //  console.log("22222222222222222222222222222");
    }
}