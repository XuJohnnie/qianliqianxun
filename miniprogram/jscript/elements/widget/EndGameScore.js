import GlobalData from "../../publibrary/GlobaData.js"
import ButtonRestart from "./ButtonRestart.js";

export default class EndGameScore {
    constructor() {
        this.ctx = GlobalData.Instance().get("ctx");
        this.btnReset = new ButtonRestart();
    }

    draw() {
        this.ctx.font = 'bold 20px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillStyle = '#006666';
        this.ctx.textBaseline = 'top';
        this.ctx.fillRect(window.innerWidth / 10, window.innerHeight / 4, window.innerWidth * 8 / 10, window.innerWidth * 4 / 6) ;

        this.ctx.fillStyle = '#fff';
        this.ctx.font = "14px";
        this.ctx.fillText("= 本局得分 =", window.innerWidth / 2 - (("= 本局得分 =".length)*7), window.innerHeight / 4 + 30);
       
        this.ctx.font = "60px Georgia";
        this.ctx.fillStyle = '#fff';
        this.ctx.fillText(GlobalData.Instance().get("score"), window.innerWidth / 2 - 20, window.innerHeight / 4 + (window.innerWidth * 4 / 6)/2-14);

        this.ctx.fillStyle = '#582982';
        this.ctx.font = "14px";
       // this.ctx.fillRect(window.innerWidth / 10, window.innerHeight / 4 + (window.innerWidth * 4 / 6)-30, window.innerWidth * 8 / 10, 30);
        this.ctx.fillRect(window.innerWidth / 10, window.innerHeight / 4, window.innerWidth * 8 / 10, 4);

        this.btnReset.draw();
    }

    onTouchStart(res) {
        this.btnReset.onTouchStart(res);
    }
    onTouchEnd(res) {
        this.btnReset.onTouchEnd(res);
    }
}