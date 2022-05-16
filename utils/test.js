const { Moralis } = require('moralis')

let main = async () => {
	let testAddress = '0x11Ba960a711e15a7847d309c62782791f295C8E1'

	let abi = [
		{
			inputs: [
				{ internalType: 'address', name: '_userAddress', type: 'address' },
			],
			name: 'getUserPublicDetailsByAddress',
			outputs: [
				{ internalType: 'uint256', name: '_id', type: 'uint256' },
				{ internalType: 'string', name: '_userName', type: 'string' },
			],
			stateMutability: 'view',
			type: 'function',
		},
	]
	let body = {
		abi: abi,
		params: {
			_userAddress: testAddress,
		},
	}

	let URL =
		'https://deep-index.moralis.io/api/v2/0x48eedeC866fFAeb7FC5E6375FbcFDe2b8FB16308/function?chain=mumbai&function_name=getUserPublicDetailsByAddress'

	let data = await fetch({
		url: URL,
		followRedirect: true,
		headers: {
			accept: 'application/json',
			'X-API-Key':
				'Vdp1Tjb3SADQhfVlzd8yF5Ol6NFzLgQ6iKXZcccQ8PpNZqD7pGDBvG3bDvIkHcfO',
			'Content-type': 'application.json',
		},
		body: JSON.stringify(body),
		method: 'POST',
	})

	console.log(data)
}

let str = ''



// let test = () => {
// 	if (str) {
// 		console.log('str exist')
// 	} else {
// 		console.log('error')
// 	}
// }
// test()

let test2 = ()=>{
	let imageUrl = [
		{ uri: 'test', hash: 'test' },
		{ uri: 'test', hash: 'test' },
	]
	
	let metadata = {
		name:"",
		urls:imageUrl
	}
	console.log(metadata)
}
test2()

//main()
