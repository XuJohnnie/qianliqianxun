import Sprite from "../../interface/Sprit.js"
import PictureLoader from "../../publibrary/PictureLoader.js"
import GlobalData from "../../publibrary/GlobaData.js"

var g_borderCount = 0;
export default class BorderInterface{
    constructor(cloudImg, groundImg, hasMiddleCloud=false){
        g_borderCount++;
        this.groundPosY = 0;
        this.groundPosX = 0;
        this.cloudPosY = 0;
        this.groundImg = groundImg;
        this.joinLeftOffset = 0;
        this.joinRightOffset = 0;
        this.ground = new Sprite(groundImg, 0, 0, groundImg.width, groundImg.height, this.groundPosX, this.groundPosY, groundImg.width, groundImg.height);
        this.cloud = new Sprite(cloudImg, 0, 0, cloudImg.width, cloudImg.height, this.groundPosX, this.cloudPosY, cloudImg.width, cloudImg.height);
        if(hasMiddleCloud){
            let radomNum = Math.ceil(Math.random() * 2);
            let level = GlobalData.Instance().get("level");
            if (level + radomNum > 7){
                level = 7-radomNum;
            }
            let img = PictureLoader.Instance().get("mcloud_" +(level+radomNum));
           // let img = PictureLoader.Instance().get("sbird_a_down");
            this.mCloud = new Sprite(img, 0, 0, img.width, img.height, this.groundPosX, this.groundPosY, img.width, img.height);
            this.radius = img.height/2 - img.height/9;
            console.log("@@@@@@@@@@@@@@@count=" + g_borderCount + " level=" + level);
        }
        
        let topimg = PictureLoader.Instance().get("top_day");
        this.topCovert = new Sprite(topimg, (g_borderCount%5)*100, 0, 100, 10, 0, 0, 100, 10);
    }

    draw(){
        this.cloud.draw();
        this.ground.draw();
        if(this.mCloud){
            this.mCloud.draw();
        }
    }

    drawTop(){
        this.topCovert.draw();
    }
    
    setPos(x, groundY, cloudY){
        this.groundPosX = x;
        this.groundPosY = groundY;
        this.cloudPosY = cloudY;
        
        this.ground.posX = this.groundPosX;
        this.ground.posY = this.groundPosY;
        
        this.cloud.posX = this.groundPosX;
        this.cloud.posY = this.cloudPosY;

        if(this.mCloud){
            this.mCloud.posX = window.innerWidth;
            
            let spaceHeight = this.ground.posY - (this.cloud.posY + this.cloud.image.height) - this.mCloud.image.height;
            this.mCloudOffsetY = Math.ceil(Math.random() * spaceHeight);
            this.mCloud.posY = this.cloud.posY + this.cloud.image.height + this.mCloudOffsetY;
        }
        this.topCovert.posX = this.groundPosX;
        this.topCovert.srcH = this.cloud.posY + this.cloud.posH/2;
        this.topCovert.posH = this.topCovert.srcH;
    }

    offsetY(groundY, cloudY){
        this.ground.posY = groundY;
        this.cloud.posY = cloudY;
        this.topCovert.srcH = this.cloud.posY + this.cloud.posH / 2;
        this.topCovert.posH = this.topCovert.srcH;
        if(this.mCloud){
            this.mCloud.posY = this.cloud.posY + this.cloud.image.height + this.mCloudOffsetY;
          //  console.log("1########################ground.y=" + this.ground.posY + " mclund=" + this.mCloud.posY);
        }
    }

    offsetX(offset){
        this.ground.posX = offset;
        this.cloud.posX = offset;
        this.topCovert.posX = offset;
        if(this.mCloud){
            this.mCloud.posX = offset;
        }
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
        if(this.isTouchCloud(x, y, w, h)){
            return true;
        }
        if(this.isTouchGround(x, y, w, h)){
            return true;
        }
        if(this.isTouchmCloud(x, y, w, h)){
            return true;
        }
        return false;
    }

    isTouchmCloud(x, y, w, h){
        if(this.mCloud){
            var mx = this.mCloud.posX + this.mCloud.posW/2;
            var my = this.mCloud.posY + this.mCloud.posH/2;

            var bx = x+w/2;
            var by = y+h/2;

            var distance = Math.sqrt((mx-bx)*(mx-bx) + (my-by)*(my-by));
            if (distance < this.radius + (h/2-h/9)){
                return true;
            }
/*
            let cx = this.mCloud.posX;
            let cy = this.mCloud.posY;
            let cw = this.mCloud.posW;
            let ch = this.mCloud.posH;
            if (((x + w) <= cx+10 || x >= (cx + cw-30)) || (y >= (cy + ch-20) || (y + h) <= cy+20)) {
                return false;
            }
            console.log("m cloud x=" + x + " y=" + y + " h=" + h + " w=" + w + " cx=" + cx + " cy=" + cy + " cw=" + cw + " ch=" + ch);
            return true;*/
        }
        return false;
    }

    isTouchCloud(x, y, w, h){
        let cx = this.cloud.posX;
        let cy = this.cloud.posY;
        let cw = this.cloud.posW;
        let ch = this.cloud.posH;
        if (((x + w) <= cx || x >= (cx + cw)) || (y >= (cy + ch-20)/* || (y + h) <= cy*/)) {
            return false;
        }
        console.log(" cloud x=" + x + " y=" + y + " h=" + h + " w=" + w + " cx=" + cx + " cy=" + cy + " cw=" + cw + " ch=" + ch);
        return true;
    }

    isTouchGround(x, y, w, h){
        let gx = this.ground.posX;
        let gy = this.ground.posY + (this.leftY > this.rightY ? this.leftY : this.rightY);
        let gw = this.ground.posW;
        let gh = this.ground.posH;
        if (((x + w) <= gx || x >= (gx + gw)) || (/*y >= (gy + gh) || */(y + h) <= gy)) {
            return false;
        }
        console.log(" ground x=" + x + " y=" + y + " h=" + h + " w=" + w + " gx=" + gx + " gy=" + gy + " gw=" + gw + " gh=" + gh);
        return true;
    }
}