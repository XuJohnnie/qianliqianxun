import Sprit from "../interface/Sprit";
import PictureLoader from "../../jscript/publibrary/PictureLoader.js"

export default class BackgroundNight extends Sprit {
  constructor() {
    const nightbg = PictureLoader.Instance().get("bg_night");
    super(nightbg, 0, 0, window.innerWidth, nightbg.height, 0, 0, window.innerWidth, window.innerHeight);
  }
  
  keepmoving() {
    // this.posX -= 1;
    this.srcX += 0.5;

    this.draw();
    if (this.srcX + window.innerWidth > this.image.width) {
      this.srcX = 0;
      return 1;
    }

    if (this.srcX > this.image.width) {
      return 2;
    }
    return 0;
  }
};