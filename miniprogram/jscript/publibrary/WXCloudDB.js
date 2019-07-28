import WXUserInfo from "./WXUserInfo.js"


export default class WXCloudDB{
    constructor(){
        wx.cloud.init();

        this.maxScore = -1;
        this._dbid = null; //uninit
        this.topScores = null;
        this.cachedScore = -1;
        WXUserInfo.Instance();
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@WXclouddb init\n");
        setTimeout(()=>this.initScore(), 500);
    }

    initScore(){
        console.log("@@@@@@@@@@@@@@@@init nickname:" + WXUserInfo.Instance().getNickName()+ " socre:"+ this.maxScore);
        if (WXUserInfo.Instance().getNickName() == ""){
            WXUserInfo.Instance().init();
        }
        else if(this.maxScore == -1){
            this.getScoreFromServer();
        }
        else if(this.topScores == null){
            this.getTopScoresFromServer();
        }
        else if (this.cachedScore > 0){
            this.cachedScore = -1;
            this.uploadScoreIfHeightest(this.cachedScore);
        }

        if (WXUserInfo.Instance().getNickName() == "" || this.maxScore == -1 || this.topScores == null || this.cachedScore > 0){
            setTimeout(() => this.initScore(), 5000);
        }
    }

    getMaxScore(){
        return this.maxScore;
    }

    getScoreFromServer(){
        const db = wx.cloud.database();
        db.collection('bird_rank').where({
            name: WXUserInfo.Instance().getNickName()
        }).get({
            success: function (res) {
                // res.data 是包含以上定义的两条记录的数组
                console.log(res.data);
                if (res.data.length == 0) {
                    console.log("@@@@@@@@@@@@@@set max score is zero");
                    WXCloudDB.Instance().maxScore = 0;
                    WXCloudDB.Instance()._dbid = "";
                } else {
                    WXCloudDB.Instance().maxScore = res.data[0].score;
                    WXCloudDB.Instance()._dbid = res.data[0]._id;
                    console.log("@@@@@@@@@@@@@@@set max score is " + WXCloudDB.Instance().maxScore() + " id=" + res.data[0]._id);
                }
            }
        });
    }

    getTopScoresFromServer(){
        const db = wx.cloud.database();
        db.collection('bird_rank').orderBy('score', 'desc').limit(50).get({
            success: function (res) {
                // res.data 是包含以上定义的两条记录的数组
                WXCloudDB.Instance().topScores = res.data;
                console.log("get top scrores call back\n");
                console.log(WXCloudDB.Instance().topScores);
            }
        });
    }

    getTopScores(){
        return this.topScores;
    }

    uploadScoreIfHeightest(score){
        console.log("@@@@@@@@@@@@@@@upload core:" + score + " max:" + this.maxScore + " id:" + this._dbid);
        if(score < this.maxScore || score <= 0){
            console.log("ignore scroe:"+score+" becasue of best scroe:"+this.maxScore);
            return;
        }

        if(this._dbid == null){
            this.cachedScore = score;
            console.log("CCCCCCCCCCCCCCCache sorce"+this.cachedScore);
            return;
        }

        this.maxScore = score;

        this.resetRank();

        const db = wx.cloud.database();
        if(this._dbid == ""){
            db.collection('bird_rank').add({
                // data 字段表示需新增的 JSON 数据
                data: {
                    name: WXUserInfo.Instance().getNickName(),
                    score: score,
                    update: db.serverDate(),
                    // 为待办事项添加一个地理位置（113°E，23°N）
                    userpic: WXUserInfo.Instance().getHeadImage(),
                    city: WXUserInfo.Instance().getCity()
                },
                success: function (res) {
                    // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
                    
                    WXCloudDB.Instance()._dbid = res._id;
                    console.log("add ok " + JSON.stringify(res) + " dbid=" + WXCloudDB.Instance()._dbid);
                }
            })
        }else{
            db.collection('bird_rank').doc(this._dbid).set({
                // data 字段表示需新增的 JSON 数据
                data: {
                    name: WXUserInfo.Instance().getNickName(),
                    score: score,
                    update: db.serverDate(),
                    // 为待办事项添加一个地理位置（113°E，23°N）
                    userpic: WXUserInfo.Instance().getHeadImage(),
                    city: WXUserInfo.Instance().getCity()
                },
                success: function (res) {
                    // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
                    console.log("================================" + res)
                }
            })
        }
/*
        const db = wx.cloud.database();
        db.collection('bird_rank').add({
            // data 字段表示需新增的 JSON 数据
            data: {
                // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
                name: "Johnnie",
                score: 5,
                update: db.serverDate(),
                // 为待办事项添加一个地理位置（113°E，23°N）
                userpic: "http://wdsfsadfsfssf.sfsflsf.png"
            },
            success: function (res) {
                // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
                console.log("================================" + res)
            }
        })*/
    }

    resetRank(){
        var count = this.topScores.length;

        if(count <= 0){
            return;
        }

        for(var i=0; i<count; i++){
            if(this.topScores[i].score <= this.maxScore){
                if(this.topScores[i].name == WXUserInfo.Instance().getNickName()){
                    this.topScores[i].score = this.maxScore;
                }
                else{
                    var j = count;
                    for (var j = count; j > i; j--) {
                        this.topScores[j] = this.topScores[j-1]
                    }
                    this.topScores[i].userpic = WXUserInfo.Instance().getHeadImage();
                    this.topScores[i].name = WXUserInfo.Instance().getNickName();
                    this.topScores[i].score = this.maxScore;
                }

                break;
            }
        }
    }

    getMyRank(){
        var count = this.topScores.length;
        var rank = -1;
        for(var i=count-1; i>=0; i--){
            if(this.topScores[i].score <= this.maxScore){
                rank = i;
            }
            else{
                break;
            }
        }

        return rank;
    }

    static Instance(){
        if(this.instance == null){
            this.instance = new WXCloudDB();
        }

        return this.instance;
    }
}