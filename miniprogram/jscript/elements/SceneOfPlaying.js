import FlyingBird from "../elements/FlyingBird.js"
import BackgroundDay from "../elements/BackgroundDay.js"
import BackgroundNight from "../elements/BackgroundNight.js"
import BorderInterface from "./animy/BorderInterface.js"
import PictureLoader from "../publibrary/PictureLoader.js"
import Sprite from "../interface/Sprit.js"

export default class SceneOfPlaying{
    constructor(){
        this.bird = new FlyingBird();
        this.bgDay = new BackgroundDay();
        this.bgNight = new BackgroundNight();
       
        this.daynight = true;

        this.border = [];
        this.initBorder();

        let bgImgTop = PictureLoader.Instance().get("top_day");
        this.bgTop = new Sprite(bgImgTop, 0, 0, window.innerWidth, bgImgTop.height, 0, 0, window.innerWidth, bgImgTop.height);
        this.offset = 0;
        this.lyoffset = 0;
        this.ryoffset = 0;
    }

    play(){
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
    }

    showBorder(){
        this.offset -= 3;
       // this.lyoffset = 0;
        let offsetStart = this.offset;
        let firstWidth = 0;
        let ryoffsetTemp = -1000;
      //  this.ryoffset = 0;
        let orderOffset = this.ryoffset;
        let index = 0;
        this.border.forEach((value) => {
            
            let yoffset = orderOffset - value.getLeftY();

            if (index == 0) {
                firstWidth = value.getWidth();
            }
            else if (index == 1) {
                ryoffsetTemp = 0-yoffset;//value.getLeftY();
            }

            console.log("yoff=" + this.ryoffset + " value.left=" + value.getLeftY() + " value.right=" + value.getRightY() + " yoffset" + yoffset+" xoff="+this.offset+" size="+this.border.length+" index="+index);
            value.offsetX(offsetStart);
            value.offsetY(this.groundYBase + yoffset, this.cloudYBase + yoffset);

            offsetStart += value.getWidth();
            orderOffset = yoffset + value.getRightY();
            value.draw();
            index ++;
        });
        console.log("offsetstat="+offsetStart+" innerWidth="+window.innerWidth);
        if (offsetStart < window.innerWidth){
            this.addNewBorder(true);
            console.log("change yoff start=" + ryoffsetTemp);
            this.ryoffset = ryoffsetTemp;
            this.offset += firstWidth;
        }
    }

    initBorder(){
        this.groundYBase = window.innerHeight - 200;
        this.cloudYBase = window.innerHeight - 200 - 300;
        /*
        let border1 = new BorderInterface(PictureLoader.Instance().get("cloud_a"), PictureLoader.Instance().get("ground_a"));
        border1.setPos(0, this.groundYBase, this.cloudYBase);
        border1.setYoffset(26, 0);
        this.border.push(border1);

        let border2 = new BorderInterface(PictureLoader.Instance().get("cloud_b"), PictureLoader.Instance().get("ground_b"));
        border2.setPos(0, this.groundYBase, this.cloudYBase);
        border2.setYoffset(0, 26);
        this.border.push(border2);

        let border3 = new BorderInterface(PictureLoader.Instance().get("cloud_c"), PictureLoader.Instance().get("ground_c"));
        border3.setPos(0, this.groundYBase, this.cloudYBase);
        border3.setYoffset(5, 5);
        this.border.push(border3);
*/
        this.addNewBorder(false);
        this.addNewBorder(false);
        this.addNewBorder(false);
        this.addNewBorder(false);
        this.addNewBorder(false);
    }

    addNewBorder(replace){
        if(replace)
        {
            this.border.shift();
        }
        //Math.floor(Math.random()*5)都是生成的0-4之间的随机数，Math.ceil(Math.random()*5)则是生成的1-5之间的随机数
        let radomNum = Math.ceil(Math.random() * 3);
      //  console.log("radom="+radomNum);
        switch(radomNum){
            case 1:
                let border1 = new BorderInterface(PictureLoader.Instance().get("cloud_a"), PictureLoader.Instance().get("ground_a"));
                border1.setPos(0, this.groundYBase, this.cloudYBase);
                border1.setYoffset(26, 0);
                this.border.push(border1);
                break;
            case 2:
                let border2 = new BorderInterface(PictureLoader.Instance().get("cloud_b"), PictureLoader.Instance().get("ground_b"));
                border2.setPos(0, this.groundYBase, this.cloudYBase);
                border2.setYoffset(0, 26);
                this.border.push(border2);
                break;
            case 3:
                let border3 = new BorderInterface(PictureLoader.Instance().get("cloud_c"), PictureLoader.Instance().get("ground_c"));
                border3.setPos(0, this.groundYBase, this.cloudYBase);
                border3.setYoffset(5, 5);
                this.border.push(border3);
                break;
        }
    }

    onTouch(){
        this.bird.upTheBird();
    }
}