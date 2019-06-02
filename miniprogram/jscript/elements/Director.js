import SceneOfPlaying from "../elements/SceneOfPlaying.js"
import SceneOfStart from "../elements/SceneOfStart.js"
import GlobalData from "../publibrary/GlobaData.js"

export default class Director {
    constructor() {
        this.playScene = new SceneOfPlaying();
        this.startScene = new SceneOfStart();
        this.state = 0; //0-start, 1-plying, 2-failed and show score
        GlobalData.Instance().set("state", 0);
    }

    working() {
        this.getActiveScene().play();
    }

    onTouch(res) {
        this.getActiveScene().onTouch();
        
    }

    getActiveScene(){
        if (GlobalData.Instance().get("state") == 0) {
            return this.startScene;
        }
        else {
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