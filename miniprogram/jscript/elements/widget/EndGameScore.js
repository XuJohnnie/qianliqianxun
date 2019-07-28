import GlobalData from "../../publibrary/GlobaData.js"
import ButtonRestart from "./ButtonRestart.js";
import WXCloudDB from "../../publibrary/WXCloudDB.js";

var WAIT_SHOW_TIME = 45;
export default class EndGameScore {    
    constructor() {
        this.ctx = GlobalData.Instance().get("ctx");
        this.btnReset = new ButtonRestart();

        this.delayshowbutton = 0;

       /* let username = "testa"
        wx.setUserCloudStorage({
            KVDataList: [{
                key: "score",
                value: GlobalData.Instance().get("score")+""
            }, {
                key: "username",
                    value: GlobalData.Instance().get("user_nickName")+""
            }],

            success: function (res) {
                console.log("upload success");
            },

            fail: function (res) {
                console.log("upload fail");
            },
        });*/
        this.LinkArea = [0,0,0,0];

        this.uploaded = false;
        this.bDrawRank = false;
    }

    draw() {
        if(this.bDrawRank == false){
            this.drawCurrentScore();
        }
        else{
            this.drawRank();
        }
    }

    drawCurrentScore(){
        this.ctx.font = 'bold 20px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillStyle = 'rgba(00,66,66,0.7)';//#006666';
        this.ctx.textBaseline = 'top';
        this.ctx.fillRect(window.innerWidth / 10, window.innerHeight / 4, window.innerWidth * 8 / 10, window.innerWidth * 4 / 8);

        this.ctx.fillStyle = '#fff';
        this.ctx.font = "14px";
        this.ctx.textAlign = 'center';
        this.ctx.fillText("= 本局得分 =", window.innerWidth / 2, window.innerHeight / 4 + 30);

        this.ctx.textAlign = 'left';
        this.ctx.font = "60px Georgia";
        this.ctx.fillStyle = '#fff';
        this.ctx.fillText(GlobalData.Instance().get("score"), window.innerWidth / 2 - (GlobalData.Instance().get("score") + "").length * 20, window.innerHeight / 4 + (window.innerWidth * 4 / 8) / 2 - 14);

        this.ctx.fillStyle = '#582982';
        this.ctx.font = "14px";
        // this.ctx.fillRect(window.innerWidth / 10, window.innerHeight / 4 + (window.innerWidth * 4 / 6)-30, window.innerWidth * 8 / 10, 30);
        this.ctx.fillRect(window.innerWidth / 10, window.innerHeight / 4 + window.innerWidth * 4 / 8, window.innerWidth * 8 / 10, 32);

        this.ctx.fillStyle = '#fff';
        this.ctx.font = "14px 宋体";
        let historyScore = "历史最高:" + WXCloudDB.Instance().getMaxScore();
        this.ctx.fillText(historyScore, window.innerWidth / 10 + 12, window.innerHeight / 4 + window.innerWidth * 4 / 8 + 6);


        let link = "全国排名 >>";
        this.LinkArea[0] = window.innerWidth / 10 + window.innerWidth * 8 / 10 - link.length * 14;
        this.LinkArea[1] = window.innerHeight / 4 + window.innerWidth * 4 / 8;
        this.LinkArea[2] = window.innerWidth * 8 / 10;
        this.LinkArea[3] = this.LinkArea[1] + 32;
        this.ctx.fillText(link, this.LinkArea[0], this.LinkArea[1] + 6);

        this.delayshowbutton++;
        if (this.delayshowbutton > WAIT_SHOW_TIME) {
            this.btnReset.draw();
        }

        if (this.uploaded == false) {
            this.uploaded = true;
            WXCloudDB.Instance().uploadScoreIfHeightest(GlobalData.Instance().get("score"));
        }
    }

    drawRank(){
        let topScores = WXCloudDB.Instance().getTopScores();

        if(topScores != null){
            this.ctx.font = 'bold 20px Arial';
            this.ctx.textAlign = 'left';
            this.ctx.fillStyle = 'rgba(00,66,66,0.9)';//#006666';
            this.ctx.textBaseline = 'top';
            this.ctx.fillRect(window.innerWidth / 10, window.innerHeight / 6, window.innerWidth * 8 / 10, 48);

            this.ctx.fillStyle = '#fff';
            this.ctx.font = "14px";
            this.ctx.textAlign = "center"
            this.ctx.fillText("全国排名", window.innerWidth / 2, window.innerHeight / 6 + 18);

            this.ctx.textAlign = 'left';
            this.ctx.font = "14px 宋体";
            for(var i=0; i<topScores.length && i<10; i++){
                if(i%2 == 0){
                    this.ctx.fillStyle = 'rgba(00,66,66,0.6)';//#006666';
                }
                else{
                    this.ctx.fillStyle = 'rgba(00,66,66,0.8)';//#006666';
                }
                this.ctx.fillRect(window.innerWidth / 10, window.innerHeight / 6 + 48 + i * 30, window.innerWidth * 8 / 10, 30);

                this.ctx.fillStyle = '#fff';
                var rank = this.getRankName(i);
                this.ctx.fillText(rank+": "+topScores[i].name, window.innerWidth / 10 + 20, window.innerHeight / 6 + 48 + i*30+5);
                this.ctx.fillText((topScores[i].score + ""), window.innerWidth / 10 + window.innerWidth * 8 / 10 - (topScores[i].score+"").length-30, window.innerHeight / 6 + 48 + i * 30 + 5);
            }
            this.ctx.fillStyle = 'rgba(79,182,206,0.9)';//#006666';
            this.ctx.fillRect(window.innerWidth / 10, window.innerHeight / 6 + 48 + i * 30, window.innerWidth * 8 / 10, 30);

            this.ctx.fillStyle = '#cc33ff';
            this.ctx.fillText("您的排名:" + this.getMyRank(), window.innerWidth / 10 + 20, window.innerHeight / 6 + 48 + i * 30 + 5);
        }

        this.btnReset.draw();
        
        if (this.uploaded == false) {
            this.uploaded = true;
            WXCloudDB.Instance().uploadScoreIfHeightest(GlobalData.Instance().get("score"));
        }
    }

    getRankName(i){
        switch(i){
            case 0:
                return "冠  军";
            case 1:
                return "亚  军";
            case 2:
                return "季  军";
            case 3:
                return "第四名";
            case 4:
                return "第五名";
            case 5:
                return "第六名";
            case 6:
                return "第七名";
            case 7:
                return "第八名";
            case 8:
                return "第九名";
            case 9:
                return "第十名";
        }
        return "";
    }

    getMyRank(){
        var myrank = WXCloudDB.Instance().getMyRank();
        if(myrank == -1){
            return "未上榜";
        }
        return "第"+(myrank+1)+"名";
    }

    onTouchStart(res) {
        if (this.delayshowbutton > WAIT_SHOW_TIME) {
            this.btnReset.onTouchStart(res);
        }
    }
    onTouchEnd(res) {
        if (this.delayshowbutton > WAIT_SHOW_TIME) {
            this.btnReset.onTouchEnd(res);

            let touchX = res.changedTouches[0].clientX // 重新判断当前触摸点x坐标
            let touchY = res.changedTouches[0].clientY // 重新判断当前触摸点x坐标
            console.log("tx=" + touchX + " ty=" + touchY + " x=" + this.LinkArea[0] + " y=" + this.LinkArea[1] + " x2" + this.LinkArea[2]);
            if (touchX > this.LinkArea[0] && touchX < this.LinkArea[2]
                && touchY > this.LinkArea[1] && touchY < this.LinkArea[3]) {
                this.clickDown = true;
                this.bDrawRank = true;
            }
        }
    }
}