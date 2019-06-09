import Sprite from "../../interface/Sprit.js"

export default class BorderInterface{
    constructor(cloudImg, groundImg){
        this.groundPosY = 0;
        this.groundPosX = 0;
        this.cloudPosY = 0;
        this.groundImg = groundImg;
        this.joinLeftOffset = 0;
        this.joinRightOffset = 0;
        this.ground = new Sprite(groundImg, 0, 0, groundImg.width, groundImg.height, this.groundPosX, this.groundPosY, groundImg.width, groundImg.height);
        this.cloud = new Sprite(cloudImg, 0, 0, cloudImg.width, cloudImg.height, this.groundPosX, this.cloudPosY, cloudImg.width, cloudImg.height);
    }

    draw(){
     //   console.log("draw cloud"+this.groundPosX+" "+this.groundPosY);
        this.cloud.draw();
        this.ground.draw();
    }
    
    setPos(x, groundY, cloudY){
        this.groundPosX = x;
        this.groundPosY = groundY;
        this.cloudPosY = cloudY;
        
        this.ground.posX = this.groundPosX;
        this.ground.posY = this.groundPosY;
        
        this.cloud.posX = this.groundPosX;
        this.cloud.posY = this.cloudPosY;
    }

    offsetY(groundY, cloudY){
        this.ground.posY = groundY;
        this.cloud.posY = cloudY;
    }

    offsetX(offset){
        this.ground.posX = offset;
        this.cloud.posX = offset;
    }

    setYoffset(leftY, rightY){
        this.leftY = leftY;
        this.rightY = rightY;
    }

    getLeftY(){
        return this.leftY;
    }

    getRightY(){
        return this.rightY;
    }
    
    getWidth(){
        return this.groundImg.width;
    }

    isCrash(x, y, w, h){
        let gx = this.ground.posX;
        let gy = this.ground.posY+(this.leftY>this.rightY?this.leftY:this.rightY);
        let gw = this.ground.posW;
        let gh = this.ground.posH;
        if(((x+w)<=gx || x>=(gx+gw)) || (y>=(gy+gh)||(y+h)<=gy)){
            return false;
        }
        console.log("x="+x+" y="+y+" h="+h+" w="+w+" gx="+gx+" gy="+gy+" gw="+gw+" gh="+gh);
        return true;
    }
}