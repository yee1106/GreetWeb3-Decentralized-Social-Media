const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withPWA({
	pwa: {
		dest: 'public',
		runtimeCaching,
		disable: process.env.NODE_ENV === "development"
	},
	env:{
		NEXT_PUBLIC_FLEEK_API_KEY:process.env.NEXT_PUBLIC_FLEEK_API_KEY,
		NEXT_PUBLIC_FLEEK_SECRET:process.env.NEXT_PUBLIC_FLEEK_SECRET,
		NEXT_PUBLIC_FLEEK_BUCKET:process.env.NEXT_PUBLIC_FLEEK_BUCKET,
		NEXT_PUBLIC_BICONOMY_API_KEY:process.env.NEXT_PUBLIC_BICONOMY_API_KEY,
		NEXT_PUBLIC_ALCHEMY_MUMBAI_NODE:process.env.NEXT_PUBLIC_ALCHEMY_MUMBAI_NODE,
		NEXT_PUBLIC_MORALIS_SERVER_URL:process.env.NEXT_PUBLIC_MORALIS_SERVER_URL,
		NEXT_PUBLIC_MORALIS_APP_ID:process.env.NEXT_PUBLIC_MORALIS_APP_ID
	},
	reactStrictMode:false,
	images: {
    domains: ['storageapi.fleek.co'],
  },
	//trailingSlash: true,
	

})

