
import { action, makeAutoObservable, observable } from 'mobx'


export class MainFeedStore {

  feeds:Feed[] = []
  page = 1
  hasMore = true
  next= ""

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
  setNext(_next:string){
    this.next = _next
  }

	
}

const mainFeedStore = new MainFeedStore()

export default mainFeedStore