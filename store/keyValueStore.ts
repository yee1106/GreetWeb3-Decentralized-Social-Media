import CyberConnect from '@cyberlab/cyberconnect'
import { action, makeAutoObservable, observable } from 'mobx'

interface IKeyValue {
	[key: string]: string | null
}

export class KeyValueStore {
	db: IKeyValue = {}

	constructor() {
		makeAutoObservable(this, {}, { autoBind: true })
	}

	getItem(key: string): string | null {
		let item = this.db[key]
		if (item) {
			return item
		} else {
			return null
		}
	}
	setItem(key: string, value: string) {
		this.db[key] = value
	}
	removeItem(key: string) {
		delete this.db[key]
	}
	clear() {
		this.db = {}
	}
	getAll() {
		return this.db
	}
}

const keyValueStore = new KeyValueStore()

export default keyValueStore
