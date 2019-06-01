import Sprite from "../interface/Sprit.js"
import PictureLoader from "../publibrary/PictureLoader.js"

export default class FlayingBird extends Sprite{
  
  constructor(){
    const birdDown = PictureLoader.Instance().get("bird_up");
    super(birdDown, 0, 0, birdDown.width, birdDown.height, 100, window.innerHeight / 2,  birdDown.width, birdDown.height);
    this.posY = window.innerHeight / 2;
    this.mode = 0;
    this.time = 0;
    this.downImg = PictureLoader.Instance().get("bird_up");
    this.upImg = PictureLoader.Instance().get("bird_down");
  }

  flying(){
    if(this.upping > 0)
    {
      this.posY -= 0.25 * (this.time * this.time) / 2;
      this.time -= 0.1;
      if(this.upping > 15)
      {
        this.image = this.upImg;
      }
      else
      {
        this.image = this.downImg;
      }
      this.upping--;
      if(this.upping <=0)
      {
        this.time = 0;
      }
    }
    else if(this.upping == 0)
    {
      this.time = 0;
      this.upping --;
    }
    else
    {
      this.posY += 0.25*(this.time*this.time)/2;
      this.time += 0.1;
      this.image = this.downImg;
    }
    this.draw();
  }
  
  upTheBird(){
    this.upping = 25;
  //  this.posY -= 40;
    this.time = 5;
    this.draw();
  }
}