import { createContext, useEffect, useState } from 'react'

import CyberConnect, { Env, Blockchain } from '@cyberlab/cyberconnect'

export const useCyberConnect = (): CyberConnect | undefined => {
	const [cb, setCb] = useState<CyberConnect>()

	useEffect(() => {
		if (window.ethereum && typeof window !== undefined) {
			let cyberconnect = new CyberConnect({
				namespace: 'CyberConnect',
				env: Env.PRODUCTION,
				chain: Blockchain.ETH,
				provider: window.ethereum,
				signingMessageEntity: 'Greet',
			})
			setCb(cyberconnect)
			console.log(cyberconnect)
		}
	}, [])

	return cb
}
