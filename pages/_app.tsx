import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import Meta from '@/components/meta'
//import { store } from '@/store/store'
import {
	MantineProvider,
	Global,
	ColorScheme,
	ColorSchemeProvider,
} from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { NotificationsProvider } from '@mantine/notifications'
import { observer } from 'mobx-react-lite'
import '@/styles/globals.css'
import { createContext, useContext, useEffect, useState } from 'react'
import { MoralisProvider } from 'react-moralis'
import Biconomy from '@biconomy/mexa'
import CyberConnect, { Env, Blockchain } from '@cyberlab/cyberconnect'
import restoreScrollPosition from 'next-restore-scroll'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
// import "swiper/swiper-bundle.min.css";
// import "swiper/swiper.min.css";

const App = ({ Component, pageProps, router }: AppProps) => {
	const [colorScheme, setColorScheme] = useState<ColorScheme>('dark')
	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

	let serverUrl = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL || ''
	let appId = process.env.NEXT_PUBLIC_MORALIS_APP_ID || ''
	const client = new ApolloClient({
		uri: 'https://api.stg.cybertino.io/connect/',
		cache: new InMemoryCache()
	})
	//let biconomy = new Biconomy()
	//restoreScrollPosition(router, '#scroll')

	let GlobalStyle = () => (
		<Global
			styles={(theme) => ({
				body: {
					color: theme.colorScheme === 'dark' ? theme.white : theme.black,
					fontFamily:
						'-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
				},
			})}
		/>
	)

	return (
		<MoralisProvider serverUrl={serverUrl} appId={appId} dangerouslyUseOfMasterKey={"iVT6r4HY1yAwWa2UA4MjJ1fmj4Fts1xMtCmYZG4k"}>
			<ApolloProvider client={client}>
				<ColorSchemeProvider
					colorScheme={colorScheme}
					toggleColorScheme={toggleColorScheme}
				>
					<MantineProvider
						theme={{
							colorScheme,
							breakpoints: {
								xxl: 1600,
							},
						}}
					>
						<NotificationsProvider position='bottom-right'>
							<ModalsProvider>
								<GlobalStyle />
								<Meta />
								<Component {...pageProps} />
							</ModalsProvider>
						</NotificationsProvider>
					</MantineProvider>
				</ColorSchemeProvider>
			</ApolloProvider>
		</MoralisProvider>
	)
}

export default App
