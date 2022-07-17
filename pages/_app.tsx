/* eslint react/no-children-prop: 0 */
/* eslint react/jsx-key: 0 */

import type { AppProps } from 'next/app'
import Meta from '@/components/meta'
import {
	MantineProvider,
	Global,
	ColorScheme,
	ColorSchemeProvider,
} from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { NotificationsProvider } from '@mantine/notifications'
import '@/styles/globals.css'
import { MoralisProvider } from 'react-moralis'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import Page from '@/components/main/Page'
import { useColorScheme, useLocalStorage } from '@mantine/hooks'
// import "swiper/swiper-bundle.min.css";
// import "swiper/swiper.min.css";

const App = ({ Component, pageProps, router }: AppProps) => {
	const preferredColorScheme = useColorScheme();
	const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: preferredColorScheme,
    getInitialValueInEffect: true,
  });
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

let GlobalStyle = () => (
	<Global
		styles={(theme) => ({
			body: {
				//color: theme.colorScheme === 'dark' ? theme.white : theme.black,
				fontFamily:
					'-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
			},
			"::-webkit-scrollbar":{
				width:"10px"
			},
			"::-webkit-scrollbar-track":{
				backgroundColor: theme.colorScheme === 'dark' ? theme.black : theme.white
			},
			"::-webkit-scrollbar-thumb":{
				background: "rgb(136,136,136)",
				borderRadius: "10px"
			},
			"::-webkit-scrollbar-thumb:hover":{
				background: "rgb(85,85,85)"
			}
		})}
	/>
)

export default App
