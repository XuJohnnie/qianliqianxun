

export default class SoundManager{
    constructor(){
        this.audioOfBg = wx.createInnerAudioContext();
        this.audioOfBg.loop = true;
        this.audioOfBg.src = "sounds/bg_sound.mp3"; // src 可以设置 http(s) 的路径，本地文件路径或者代码包文件路径
        this.audioOfDie = wx.createInnerAudioContext();
        this.audioOfDie.src = "sounds/die_sound.mp3";

        this.audioOfBg.stop();
        this.audioOfDie.stop();
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

    static Instance(){
        if(this.instance == null){
            this.instance = new SoundManager();
        }

        return this.instance;
    }
};