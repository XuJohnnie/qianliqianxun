import BackgroundDay from "../elements/BackgroundDay.js"
import BackgroundNight from "../elements/BackgroundNight.js"
import FlyingBird from "../elements/FlyingBird.js"


export default class Director{
  constructor(){
    this.bird = new FlyingBird();
    this.bgDay = new BackgroundDay();
    this.bgNight = new BackgroundNight();

    this.daynight = true;
  }
  static Instance(){
    if(this.instance == null){
      this.instance = new Director();
    }

    return this.instance;
  }

  working(){
    if (this.daynight == true )
    {
      let keepRtn = this.bgDay.keepmoving();
      if (keepRtn == 2){
        this.daynight = false;
      }
      else if (keepRtn == 1){
        let left = this.bgDay.getLeft();
      }
    }
    else{
      if (this.bgNight.keepmoving() == 2) {
        this.daynight = true;
      }
    }

    this.bird.flying();
  }

  onTouch(res){
    this.bird.upTheBird();
  }
};