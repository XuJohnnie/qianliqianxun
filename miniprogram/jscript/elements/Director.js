import SceneOfPlaying from "../elements/SceneOfPlaying.js"
import SceneOfStart from "../elements/SceneOfStart.js"
import GlobalData from "../publibrary/GlobaData.js"
import QuickSetButtons from "./widget/QuickSetButtons.js"

export default class Director {
    constructor() {
        this.playScene = new SceneOfPlaying();
        this.startScene = new SceneOfStart();
        this.rankScene = null;
        this.state = 0; //0-start, 1-plying, 2-failed and show score
        GlobalData.Instance().set("state", 0);
        this.quickButton = new QuickSetButtons();
    }

    working() {
        this.getActiveScene().play();

        this.quickButton.draw();
    }

    onTouchStart(res) {
        this.getActiveScene().onTouchStart(res);
        this.quickButton.onTouchStart(res);
    }
    onTouchEnd(res) {
        this.getActiveScene().onTouchEnd(res);
        this.quickButton.onTouchEnd(res);
    }

    getActiveScene(){
        let state = GlobalData.Instance().get("state");
        if (state == 0) {
            if(this.playScene!=null){
                this.playScene = null;
            }
            return this.startScene;
        }
        else if(state == 1){
            if (this.playScene == null){
                this.playScene = new SceneOfPlaying();
            }
            return this.playScene;
        }
        else if(state == 3){
            this.playScene = null;
            this.playScene = new SceneOfPlaying();
            GlobalData.Instance().set("state", 1);
            return this.playScene;
        }
        else{
            return this.playScene;
        }
    }

    static Instance() {
        if (this.instance == null) {
            this.instance = new Director();
        }

        return this.instance;
    }
};