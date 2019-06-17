import FlyingBird from "../elements/FlyingBird.js"
import BackgroundDay from "../elements/BackgroundDay.js"
import BackgroundNight from "../elements/BackgroundNight.js"
import BorderInterface from "./animy/BorderInterface.js"
import PictureLoader from "../publibrary/PictureLoader.js"
import Sprite from "../interface/Sprit.js"
import GlobalData from "../publibrary/GlobaData.js"
import ScoreMenu from "../elements/widget/ScoreMenu.js";
import EndGameScore from "./widget/EndGameScore.js"
import SoundManager from "../publibrary/SoundManager.js"

export default class SceneOfPlaying{
    constructor(){
        this.bird = new FlyingBird();
        this.bgDay = new BackgroundDay();
        this.bgNight = new BackgroundNight();
        this.scoreMenu = new ScoreMenu();
        this.scoreMenu.reset(0);
       
        this.daynight = true;

        this.border = [];
        this.initBorder();

        let bgImgTop = PictureLoader.Instance().get("top_day");
        this.bgTop = new Sprite(bgImgTop, 0, 0, window.innerWidth, bgImgTop.height, 0, 0, window.innerWidth, bgImgTop.height);
        this.xoffset = 0;
        this.lyoffset = 0;
        this.ryoffset = 0;

        this.CreatedGroundNum = 0;

        this.crashPause = false;
        this.resetUI = new EndGameScore();

        this.firstPlay = false;
    }

    play(){
        if (this.firstPlay == false){
            this.firstPlay = true;
            SoundManager.Instance().playBackgroundSound(true);
        }
        if (this.crashPause == false){
            if (this.daynight == true) {
                let keepRtn = this.bgDay.keepmoving();
                if (keepRtn == 2) {
                    this.daynight = false;
                } else if (keepRtn == 1) {
                    let left = this.bgDay.getLeft();
                }
            } else {
                if (this.bgNight.keepmoving() == 2) {
                    this.daynight = true;
                }
            }
        // this.bgTop.draw();
            this.showBorder();
            this.bird.flying();
            this.crashChecking();
            this.scoreMenu.draw();
        }
        else{
            this.bgDay.draw();
            this.scoreMenu.draw();
            this.showPauseBorder();
            this.bird.draw();
            this.resetUI.draw();
        }
    }

    crashChecking(){
        let x = this.bird.posX+16;
        let y = this.bird.posY+10;
        let w = this.bird.posW-13;
        let h = this.bird.posH-13;
        this.border.forEach((value) => {
            if (value.isCrash(x, y, w, h)){
                GlobalData.Instance().set("state", 2);
                this.crashPause = true;
                SoundManager.Instance().playDieSound(true);
            }
        });
    }

    showPauseBorder(){
        this.border.forEach((value) => {
            value.draw();
        });
    }

    showBorder(){
        this.xoffset -= 3;
       // this.lyoffset = 0;
        let offsetStart = this.xoffset;
        let firstWidth = 0;
        let ryoffsetTemp = -1000;
        let lastYOffset = 0;
      //  this.ryoffset = 0;
        let orderOffset = this.ryoffset;
        let index = 0;
        this.border.forEach((value) => {
            let yoffset = orderOffset - value.getLeftY();

            if (index == 0) {
                firstWidth = value.getWidth();
            }
            else if (index == 1) {
                ryoffsetTemp = yoffset + value.getLeftY();//value.getLeftY();
            }

            value.offsetX(offsetStart);
            value.offsetY(this.groundYBase + yoffset, this.cloudYBase + yoffset);
            lastYOffset = this.groundYBase + yoffset, this.cloudYBase + yoffset;

            offsetStart += value.getWidth();
            orderOffset = yoffset + value.getRightY();
            value.draw();
            index ++;
        });
        
        if (offsetStart < window.innerWidth){
            console.log("change yoff start=" + ryoffsetTemp+" last="+lastYOffset+" inner="+window.innerHeight);
            this.ryoffset = ryoffsetTemp;
            this.xoffset += firstWidth;

            let updown = 0;
            lastYOffset = window.innerHeight - lastYOffset;
            if (lastYOffset < Math.ceil(window.innerHeight / 7) + 40){
                updown = 1;
            }
            else if(lastYOffset > 220){
                updown = -1;
            }
            this.addNewBorder(true, updown);
        }
    }

    initBorder(){
        this.groundYBase = window.innerHeight - 200;
        this.cloudYBase = this.groundYBase - 330;

        this.addNewBorder(false);
        this.addNewBorder(false);
        this.addNewBorder(false);
        this.addNewBorder(false);
        this.addNewBorder(false);
    }
    //<0 need to down, 0:radom; >0: need to up
    addNewBorder(replace, updown=0){
        let addMCloud = false;
        this.CreatedGroundNum++;
        if (this.CreatedGroundNum > 5 && this.CreatedGroundNum%3 ==0){
            this.scoreMenu.addScore();
            addMCloud = true;
        }
        if(replace)
        {
            this.border.shift();
        }
        //Math.floor(Math.random()*5)都是生成的0-4之间的随机数，Math.ceil(Math.random()*5)则是生成的1-5之间的随机数
        let radomNum = 0;
        if(updown < 0){
            radomNum = 2;
        }
        else if(updown > 0){
            radomNum = 1;
        }
        else if(replace == false){
            radomNum = 3;
        }
        else{
            radomNum = Math.ceil(Math.random() * 3);
        }
      //  console.log("radom="+radomNum);
        switch(radomNum){
            case 1:
                let border1 = new BorderInterface(PictureLoader.Instance().get("cloud_a"), PictureLoader.Instance().get("ground_a"), addMCloud);
                border1.setPos(0, this.groundYBase, this.cloudYBase);
                border1.setYoffset(26, 0);
                this.border.push(border1);
                break;
            case 2:
                let border2 = new BorderInterface(PictureLoader.Instance().get("cloud_b"), PictureLoader.Instance().get("ground_b"), addMCloud);
                border2.setPos(0, this.groundYBase, this.cloudYBase);
                border2.setYoffset(0, 26);
                this.border.push(border2);
                break;
            case 3:
                let border3 = new BorderInterface(PictureLoader.Instance().get("cloud_c"), PictureLoader.Instance().get("ground_c"), addMCloud);
                border3.setPos(0, this.groundYBase, this.cloudYBase);
                border3.setYoffset(5, 5);
                this.border.push(border3);
                break;
        }
    }

    onTouchStart(res){
        if(this.crashPause == false){
            this.bird.upTheBird();
        }
        else{
            this.resetUI.onTouchStart(res);
        }
    }
    onTouchEnd(res) {
        if (this.crashPause == true) {
            this.resetUI.onTouchEnd(res);
        }
    }
}