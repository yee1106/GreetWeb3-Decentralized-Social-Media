
import { action, makeAutoObservable, observable } from 'mobx'


export class MainFeedStore {

  feeds:Feed[] = []

	constructor() {
		makeAutoObservable(this, {}, { autoBind: true })
	}
  addLoadedFeed(feed:Feed){
    this.feeds.push(feed)
  }
  clearloadedFeed(){
    this.feeds = []
  }
	
}

const mainFeedStore = new MainFeedStore()

export default mainFeedStore