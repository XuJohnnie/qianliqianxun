import Sprite from "../../interface/Sprit.js"
import PictureLoader from "../../publibrary/PictureLoader.js"
import SoundManager from "../../publibrary/SoundManager.js"

export default class QuickSetButtons{
    constructor(){
        let iconsImg = PictureLoader.Instance().get("icons");
        this.MuteButton = new Sprite(iconsImg, 0, 146, iconsImg.width, 35, window.innerWidth - iconsImg.width - 8, 57, iconsImg.width, 35);
        //this.RankButton = new Sprite(iconsImg, 0, 0, iconsImg.width, 42, window.innerWidth - iconsImg.width - 8, 135, iconsImg.width, 42);
        this.ShareButton = new Sprite(iconsImg, 0, 50, iconsImg.width, 35, window.innerWidth - iconsImg.width - 8, 95, iconsImg.width, 35);
        this.isMute = false;
        this.showRank = false;
    }

    draw(){
        this.MuteButton.draw();
       // this.RankButton.draw();
        this.ShareButton.draw();
    }

    onTouchStart(res) {
        //icons
    }
    onTouchEnd(res) {
        let touchX = res.changedTouches[0].clientX // 重新判断当前触摸点x坐标
        let touchY = res.changedTouches[0].clientY // 重新判断当前触摸点x坐标
      //  console.log("tx=" + touchX + " ty=" + touchY + " x=" + this.LinkArea[0] + " y=" + this.LinkArea[1] + " x2" + this.LinkArea[2]);

        if(this.isInButton(touchX, touchY, this.ShareButton)){
            wx.shareAppMessage({
                title: "我在【疯狂飞鸭】等你挑战？",
                imageUrl: "pics/sharepic.png",
                success: () => {
                    this.playerControl.Relive(true);
                },
                fail: () => {
                    this.playerControl.Relive(false);
                }
            });
        }

        if(this.isInButton(touchX, touchY, this.MuteButton)){
            if(this.isMute == true){
                this.isMute = false;
                this.MuteButton.srcY = 146;
                SoundManager.Instance().muteSound(0);
            }
            else{
                this.isMute = true;
                this.MuteButton.srcY = 102;
                SoundManager.Instance().muteSound(1);
            }
        }
    }
    
    isInButton(x, y, button){
        var bx1 = button.posX;
        var bx2 = bx1 + button.posW;
        var by1 = button.posY;
        var by2 = by1 + button.posH;

        if(x>bx1 && x<bx2 && y>by1 && y<by2){
            return true;
        }
        return false;
    }
}