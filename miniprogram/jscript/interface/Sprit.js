import GlobalData from "../publibrary/GlobaData.js"

export default class Sprite{
  constructor(img, srcX, srcY, srcW, srcH, posX, posY, posW, posH){
    this.image = img;
    this.srcX = srcX;
    this.srcY = srcY;
    this.srcW = srcW;
    this.srcH = srcH;
    this.posX = posX;
    this.posY = posY;
    this.posW = posW;
    this.posH = posH;
    this.ctx = GlobalData.Instance().get("ctx");
  }

  draw(){
    this.ctx.drawImage(this.image, this.srcX, this.srcY, this.srcW, this.srcH, this.posX, this.posY, this.posW, this.posH);
  }
}