import CyberConnect  from '@cyberlab/cyberconnect';
import { action, makeAutoObservable, observable } from 'mobx'




export class Store{
  name:string = ""
  walletAddress:string = ""
  feedScrollPosition:number = 0
  followingfeedScrollPosition:number = 0
  

  constructor(){
    makeAutoObservable(this,{},{autoBind:true})
  }

  initialize(_name:string, _address:string){
    this.name = _name
    this.walletAddress = _address
  }

  setFeedScrollPosition(y:number){
    this.feedScrollPosition = y
  }
  


}

const store = new Store();

export default store