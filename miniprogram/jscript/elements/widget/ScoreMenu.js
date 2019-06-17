import Sprite from "../../interface/Sprit.js"
import PictureLoader from "../../publibrary/PictureLoader.js"
import GlobalData from "../../publibrary/GlobaData.js"

export default class ScoreMenu extends Sprite{
    constructor(){
        const ions = PictureLoader.Instance().get("ions_all_1");
        super(ions, 0, 98, 161, 45, 21, 21, 161, 45);

        this.score = 0;
    }

    draw(){
        super.draw();

        this.ctx.font = 'bold 20px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillStyle = '#fff';
        this.ctx.textBaseline = 'top';
        //  context.strokeText("Hello Canvas", 150, 100);
        this.ctx.fillText(""+this.score, this.posX + 66, this.posY + 14);
    }

    reset(){
        this.score = 0;
        GlobalData.Instance().set("score", this.score);
        GlobalData.Instance().set("level", 0);
    }

    addScore(){
        this.score++;
        GlobalData.Instance().set("score", this.score);
        if(this.score %14 == 0){
            let level = GlobalData.Instance().get("level");
            if(level == null){
                level = 0;
            }
            level++;
            GlobalData.Instance().set("level", level);
        }
    }
};