import PictureLoader from "./publibrary/PictureLoader.js"
import GlobalData from "./publibrary/GlobaData.js"
import Director from "./elements/Director.js"

export default class Main2{

  constructor(){
    this.canvas = wx.createCanvas();
    this.ctx = canvas.getContext('2d');
    GlobalData.Instance().set("ctx", this.ctx);
    GlobalData.Instance().set("canvas", this.canvas);
    this.bgX = 0;
    this.ctx.fillStyle = '#1aad19' // 矩形颜色
    //this.ctx.fillRect(0, 0, 100, 100);
    console.info("Hello world"+this.canvas.width);

    let loader = PictureLoader.Instance();
    loader.onload(()=>this.onResouceLoaded());
    wx.onTouchStart((res) => this.onTouchEvent(res));
  }

  onResouceLoaded(){
    console.log("picture loaded");
    this.resetGame();
  }

  onTouchEvent(res){
    Director.Instance().onTouch();
  }

  resetGame(){
    //let testImage = PictureLoader.Instance().get("bg_day");
    //this.bgX++;
    //if (this.bgX > testImage.width)
    //{
     // this.bgX = 0;
    //}
    //console.log("image="+testImage+" w="+testImage.width);
    //this.ctx.fillRect(0, 0, 100, 100);
    //this.ctx.drawImage(testImage, 0, 0, testImage.width, testImage.height, 0, 0, window.innerWidth, window.innerHeight);
   // this.ctx.draxText("ssss");
    //let bg = new Background(testImage, this.bgX);
    //bg.draw();
    
    Director.Instance().working();

    //setTimeout(()=>this.resetGame(), 100);
    requestAnimationFrame(()=>this.resetGame());
  }
};