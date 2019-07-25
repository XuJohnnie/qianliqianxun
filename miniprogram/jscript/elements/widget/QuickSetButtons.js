import Sprite from "../../interface/Sprit.js"
import PictureLoader from "../../publibrary/PictureLoader.js"

export default class QuickSetButtons extends Sprite{
    constructor(){
        const icons = PictureLoader.Instance().get("icons");
        super(icons, 0, icons.height/2, icons.width, icons.height/2, window.innerWidth - icons.width - 9, 60, icons.width, icons.height/2);
    }

    onTouchStart(res) {
        
    }
    onTouchEnd(res) {
        let touchX = res.changedTouches[0].clientX // 重新判断当前触摸点x坐标
        let touchY = res.changedTouches[0].clientY // 重新判断当前触摸点x坐标
      //  console.log("tx=" + touchX + " ty=" + touchY + " x=" + this.LinkArea[0] + " y=" + this.LinkArea[1] + " x2" + this.LinkArea[2]);
       
        if (touchX > this.posX && touchX < this.posX + this.posW && touchY > this.posY && touchY < this.posY + this.posH) {
           // if(touchY > this.posY+this.posH/2){
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
           // }
           // else{
            //    
           // }
        }
    }
}