import { action, makeAutoObservable, observable } from 'mobx'


export class UserFeedStore {

  feeds:Feed[] = []
  page = 1
  hasMore = true

	constructor() {
		makeAutoObservable(this, {}, { autoBind: true })
	}
  addLoadedFeed(feed:Feed[]){
    this.feeds.push(...feed)
  }
  clearloadedFeed(){
    this.feeds = []
  }
  getPage(){
    return this.page
  }
  get getSkip(){
    return this.page -1
  }
  addPage(){
    this.page+=1
  }
  setPage(_page:number){
    this.page =_page
  }
  setHasMore(_hasMore:boolean){
    this.hasMore = _hasMore
  }
	
}

const mainFeedStore = new UserFeedStore()

export default mainFeedStore