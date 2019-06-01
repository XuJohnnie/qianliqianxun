

export default class GlobalData{
  constructor(){
    this.map = new Map();
  }
  set(key, value){
    this.map.set(key, value);
    console.log("add key="+key+" value="+value);
  }

  get(key){
    return this.map.get(key);
  }

  static Instance(){
    if(this.instance == null)
    {
      this.instance = new GlobalData();
    }

    return this.instance;
  }
};