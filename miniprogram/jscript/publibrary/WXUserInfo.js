
export default class WXUserInfo{
    constructor(){
        this.nickName = "";
        this.city = "";
        this.headimage = "";
        this.infobutton = false;
        this.button = null;
    }

    init(){
        wx.getUserInfo({
            openIdList: ['selfOpenId'],
            lang: 'zh_CN',
            success: (res) => {
                // console.log(res);
                console.log("222:" + JSON.stringify(res.userInfo));
                this.nickName = res.userInfo.nickName;
                this.gender = res.userInfo.gender;
                this.city = res.userInfo.city;
                this.headimage = res.userInfo.avatarUrl;
                if (WXUserInfo.Instance().button != null){
                    WXUserInfo.Instance().button.destroy();
                    WXUserInfo.Instance().button = null;
                }
                //  GlobalData.Instance().set("user_nickName", res.userInfo.nickName);
                // console.log("333:" + res.userInfo.nickName);
            },
            fail: (res) => {
                console.log(res);
                if(WXUserInfo.Instance().infobutton == false){
                    WXUserInfo.Instance().infobutton = true;
                    WXUserInfo.Instance().button = wx.createUserInfoButton({
                        type: 'text',
                        text: '点击授权玩游戏',
                        style: {
                            left: window.innerWidth/2 - 100,
                            top: window.innerHeight/2 - 50,
                            width: 200,
                            height: 50,
                            lineHeight: 50,
                            backgroundColor: '#ff0f0f',
                            color: '#ffffff',
                            textAlign: 'center',
                            fontSize: 24,
                            borderRadius: 4
                        }
                    })
                    WXUserInfo.Instance().button.onTap((res) => {
                        console.log(res)
                    })
                }
            },
            complete: (res) => {
            },
        });
    }

    getNickName(){
        return this.nickName;
    }

    getCity(){
        return this.city;
    }

    getHeadImage(){
        return this.headimage;
    }

    static Instance(){
        if(this.instance == null){
            this.instance = new WXUserInfo();
        }
        return this.instance;
    }
}