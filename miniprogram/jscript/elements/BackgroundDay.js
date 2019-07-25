import Sprit from "../interface/Sprit";
import PictureLoader from "../../jscript/publibrary/PictureLoader.js"

export default class BackgroundDay extends Sprit{
  constructor(){
    const daybg = PictureLoader.Instance().get("bg_day");
      super(daybg, 0, 0, window.innerWidth / 2, daybg.height, 0, 0, window.innerWidth, window.innerHeight - window.innerHeight/7);
  }
  
  keepmoving(){
   // this.posX -= 1;
    this.srcX += 0.5;

    this.draw();
    if (this.srcX + window.innerWidth > this.image.width) {
      this.srcX = 0;
      return 1;
    }
  //  console.log("srcx="+this.srcX+" w="+this.image.width);
    if(this.srcX > this.image.width){
      return 2;
    }
    return 0;
  }

  getLeft(){
    return 0;
  }
};