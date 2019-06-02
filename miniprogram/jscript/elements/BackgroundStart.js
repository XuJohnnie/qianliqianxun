import Sprite from "../interface/Sprit.js"
import PictureLoader from "../publibrary/PictureLoader.js";

export default class BackgroundStart extends Sprite{
  constructor(){
    const daybg = PictureLoader.Instance().get("bg_start");
      super(daybg, 0, 0, daybg.width, daybg.height, 0, 0, window.innerWidth, window.innerHeight);
  }
};