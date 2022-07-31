import { useEffect, useState } from 'react'
import { useEffectOnce } from './useEffectOnce'

export function useIsDay() {
	const [isDay, setDay] = useState(true)
	useEffectOnce(() => {
		const hours = new Date().getHours()
		const isDay = hours > 6 && hours < 20
    setDay(isDay)
	})
	return {
		isDay,
	}
}
