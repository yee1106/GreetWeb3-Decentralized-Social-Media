//import { MetaMaskInpageProvider } from '@metamask/providers';
// import { MetaMaskInpageProvider } from "@metamask/providers/dist/MetaMaskInpageProvider";
import ethers from 'ethers'
import { Moralis as MoralisDef } from 'moralis'

declare global {
	interface Window {
		ethereum: ethers.providers.ExternalProvider
	}
	interface Feed {
		userName: string
		timestamp: string
		textContent: string
		images?: string[]
		video?: string
		id: string
	}
	interface MediaURI {
    URI:string
    IpfsHash:string
  }
	interface GreetMetaData {
		creatorName: string
		creatorAddress: string
		images?: MediaURI[]
		videos?:MediaURI
		text: string
	}
	interface GreetComment{
		text: string,
		image? : string
		timestamp:string,
		userId:string,
		userName:string,
		commentId:string
	}
	const Moralis: MoralisDef

}
