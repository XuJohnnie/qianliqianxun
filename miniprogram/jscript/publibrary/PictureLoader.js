import {picMap} from "../publibrary/PictureResource.js"

export default class PictureLoader{
  constructor(){
    this.map = new Map(picMap);

    for (let [key, value] of this.map) {
      let image = wx.createImage();
      image.src = value;
      this.map.set(key, image);
    }
    console.log("construct pircutloaded "+this.map);
  }
  
  onload(funCallback){
    let loadcount = 0;
    for( let imgobj of this.map.values() ){
        imgobj.onload = () =>{
          loadcount++;
          if(loadcount >= this.map.size){
              console.log("picture load over, stat callback="+loadcount+" map size="+this.map.size);
              funCallback();
          }
        }
    }
  }

  get(key){
   // console.log("get map key="+key);
    return this.map.get(key);
  }

  static Instance(){
    if(this.instance==null)
    {
      this.instance = new PictureLoader();
    }

    return this.instance;
  }
};