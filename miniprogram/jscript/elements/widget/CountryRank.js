import GlobalData from "../../publibrary/GlobaData.js"
import ButtonRestart from "./ButtonRestart.js";
import WXCloudDB from "../../publibrary/WXCloudDB.js";

var WAIT_SHOW_TIME = 45;
export default class CountryRank {
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
        this.uploaded = false;
    }

    draw() {
        this.ctx.font = 'bold 20px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillStyle = 'rgba(00,66,66,0.7)';//#006666';
        this.ctx.textBaseline = 'top';
        this.ctx.fillRect(window.innerWidth / 10, window.innerHeight / 4, window.innerWidth * 8 / 10, window.innerWidth * 4 / 8);

        this.ctx.fillStyle = '#fff';
        this.ctx.font = "14px";
        this.ctx.fillText("= 本局得分 =", window.innerWidth / 2 - (("= 本局得分 =".length) * 7), window.innerHeight / 4 + 30);

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
        this.ctx.fillText(link, window.innerWidth / 10 + window.innerWidth * 8 / 10 - link.length * 14, window.innerHeight / 4 + window.innerWidth * 4 / 8 + 6);

        this.delayshowbutton++;
        if (this.delayshowbutton > WAIT_SHOW_TIME) {
            this.btnReset.draw();
        }

        if (this.uploaded == false) {
            this.uploaded = true;
            WXCloudDB.Instance().uploadScoreIfHeightest(GlobalData.Instance().get("score"));
        }
    }

    onTouchStart(res) {
        if (this.delayshowbutton > WAIT_SHOW_TIME) {
            this.btnReset.onTouchStart(res);
        }
    }
    onTouchEnd(res) {
        if (this.delayshowbutton > WAIT_SHOW_TIME) {
            this.btnReset.onTouchEnd(res);
        }
    }
}