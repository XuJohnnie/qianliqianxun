import Sprite from "../../interface/Sprit.js"
import PictureLoader from "../../publibrary/PictureLoader.js"
import GlobalData from "../../publibrary/GlobaData.js"

export default class ButtonRestart extends Sprite {
    constructor() {
        const birdDown = PictureLoader.Instance().get("ions_all_1");
        super(birdDown, 0, 49, 174, 45, window.innerWidth / 2 - 174 / 2, window.innerHeight * 5 / 6, 174, 45);
        this.clickDown = false;
    }

    onTouchStart(res) {
        let touchX = res.changedTouches[0].clientX // 重新判断当前触摸点x坐标
        let touchY = res.changedTouches[0].clientY // 重新判断当前触摸点x坐标
        if (touchX > this.posX && touchX < this.posX + 174
            && touchY > this.posY && touchY < this.posY + 45) {
            this.clickDown = true;
        }
    }
    onTouchEnd(res) {
        if (this.clickDown) {
            GlobalData.Instance().set("state", 3);
        }
    }

    draw() {
        super.draw();

        this.ctx = GlobalData.Instance().get("ctx");

        this.ctx.font = 'bold 20px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillStyle = '#582982';
        this.ctx.textBaseline = 'top';
        //  context.strokeText("Hello Canvas", 150, 100);
        this.ctx.fillText("再玩一局", this.posX + 48, this.posY + 12);
    }
};