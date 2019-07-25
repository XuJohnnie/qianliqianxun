

export default class SoundManager{
    constructor(){
        this.audioOfBg = wx.createInnerAudioContext();
        this.audioOfBg.loop = true;
        this.audioOfBg.src = "sounds/bg_sound.mp3"; // src 可以设置 http(s) 的路径，本地文件路径或者代码包文件路径

        this.audioOfDie = wx.createInnerAudioContext();
        this.audioOfDie.src = "sounds/die_sound.mp3";

        this.audioOfCached = wx.createInnerAudioContext();
        this.audioOfCached.src = "sounds/cach_bird.mp3";

        this.audioOfBidDispier = wx.createInnerAudioContext();
        this.audioOfBidDispier.src = "sounds/bird_dispier.mp3";

        this.audioOfBidComming = wx.createInnerAudioContext();
        this.audioOfBidComming.src = "sounds/bird_comming.mp3";

        this.audioOfMorning = wx.createInnerAudioContext();
        this.audioOfMorning.src = "sounds/morning.mp3";

        this.audioOfBg.stop();
        this.audioOfDie.stop();
        this.audioOfCached.stop();
        this.audioOfBidDispier.stop();
        this.audioOfBidComming.stop();
        this.audioOfMorning.stop();
    }

    playBackgroundSound(play=true){
        if(play){
            this.audioOfBg.play();
        }
        else{
            this.audioOfBg.stop();
        }
        console.log("play background sound "+play);
    }

    playDieSound(play=true){
        if(play){
            this.playBackgroundSound(false);
            this.audioOfDie.play();
        }
        else{
            this.audioOfDie.stop();
        }
        console.log("play die sound "+play);
    }

    playCachedSound(play=true){
        if (play) {
            this.audioOfCached.play();
        }
        else {
            this.audioOfCached.stop();
        }
        console.log("play audioOfCached sound " + play);
    }

    playSmallBirdDispierSound(play = true) {
        if (play) {
            this.audioOfBidDispier.play();
        }
        else {
            this.audioOfBidDispier.stop();
        }
        console.log("play audioOfBidDispier sound " + play);
    }

    playSmallBirdCommintSound(play = true) {
        if (play) {
            this.audioOfBidComming.play();
        }
        else {
            this.audioOfBidComming.stop();
        }
        console.log("play audioOfCached sound " + play);
    }

    playMorningSound(play = true) {
        if (play) {
            this.audioOfMorning.play();
        }
        else {
            this.audioOfMorning.stop();
        }
        console.log("play audioOfCached sound " + play);
    }

    static Instance(){
        if(this.instance == null){
            this.instance = new SoundManager();
        }

        return this.instance;
    }
};