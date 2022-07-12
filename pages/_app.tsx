/* eslint react/no-children-prop: 0 */
/* eslint react/jsx-key: 0 */

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
import Page from '@/components/main/Page'
import { Pipeline, Pipe } from 'react-pipeline-component'
// import "swiper/swiper-bundle.min.css";
// import "swiper/swiper.min.css";

const App = ({ Component, pageProps, router }: AppProps) => {
	const [colorScheme, setColorScheme] = useState<ColorScheme>('dark')
	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

	let serverUrl =
		process.env.NEXT_PUBLIC_MORALIS_SERVER_URL ||
		'https://tlu6sh5vgvs3.usemoralis.com:2053/server'
	let appId =
		process.env.NEXT_PUBLIC_MORALIS_APP_ID ||
		'VoCRaSpW4HrrBhA85LvrrfwEN5ymD8pYJ793KbCW'
	const client = new ApolloClient({
		uri: 'https://api.cybertino.io/connect/',
		cache: new InMemoryCache(),
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
		<>
			<MoralisProvider serverUrl={serverUrl} appId={appId}>
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
							withNormalizeCSS
							withGlobalStyles
						>
							<NotificationsProvider position='top-center'>
								<ModalsProvider>
									<Meta />
									<GlobalStyle />
									<Page title='test' homePage={true}>
										<Component {...pageProps} />
									</Page>
								</ModalsProvider>
							</NotificationsProvider>
						</MantineProvider>
					</ColorSchemeProvider>
				</ApolloProvider>
			</MoralisProvider>
		</>
	)
	
}

export default App
