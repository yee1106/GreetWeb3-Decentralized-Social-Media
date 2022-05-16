import Head from 'next/head'

const Meta = () => (
	<Head>
		<title>Greet</title>
		<meta charSet='utf-8' />
		<meta name='mobile-web-app-capable' content='yes' />
		<meta name='apple-mobile-web-app-capable' content='yes' />
		<meta
			name='apple-mobile-web-app-status-bar-style'
			content='black-translucent'
		/>
		<meta name='apple-mobile-web-app-title' content='Greet' />
		<meta name='application-name' content='Greet' />
		<meta name='description' content='Greet - Web 3 Social Media' />
		<meta
			name='viewport'
			content='width=device-width, initial-scale=1, user-scalable=0, viewport-fit=cover'
		/>
		<link rel='apple-touch-icon' href='/images/logo512.png' />
		<link rel='icon' type='image/png' href='/images/favicon.ico' />
		<link rel='manifest' href='/manifest.json' />
	</Head>
)

export default Meta
