import { useWindowScroll } from '@mantine/hooks'
import { NextRouter } from 'next/router'
import { useEffect } from 'react'

export const useScrollRestore = (router: NextRouter) => {
	const [scroll, scrollTo] = useWindowScroll()
	useEffect(() => {
		scrollTo({
			y: parseInt(sessionStorage.getItem(`Scroll:${router.asPath}`) || '0'),
		})
	},[])
	useEffect(() => {
		sessionStorage.setItem(`Scroll:${router.asPath}`, scroll.y.toString())
    return(()=>{
      sessionStorage.setItem(`Scroll:${router.asPath}`, scroll.y.toString())
    })
	}, [router.asPath, scroll])
}
