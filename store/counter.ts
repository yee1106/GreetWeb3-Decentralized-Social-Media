import { makeAutoObservable, runInAction, autorun, action } from 'mobx'
import { createContext } from 'react'

export class Counter {
	count: number = 0
	message: string = ''
	textArray: string[] = []
	constructor() {
		makeAutoObservable(this,{},{autoBind:true})
	}

	increment() {
		this.count++
	}
	decrement() {
		this.count--
	}
	add(num: number) {
		this.count += num
	}
	push(text: string) {
		this.textArray.push(text)
	}
	async setText() {
		let response = await fetch('https://some-random-api.ml/animal/dog')
		let data = await response.json()
		runInAction(() => (this.message = data.fact))
	}

	listAttribute(){
		let obj = new Counter()
		let arr = Object.getPrototypeOf(obj)
		return arr
	}
}

export const store = new Counter()
//export const CounterContext = createContext<Counter>({}as Counter)
