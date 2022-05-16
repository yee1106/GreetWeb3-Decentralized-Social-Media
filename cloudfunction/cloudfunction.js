const { Moralis } = require('moralis')

Moralis.Cloud.beforeSave('UserRegistered', async (request) => {

  let address = request.object.get('userAddress')

  let abi = [{
    "inputs": [{
      "internalType": "address",
      "name": "_userAddress",
      "type": "address"
    }],
    "name": "getUserPublicDetailsByAddress",
    "outputs": [{
      "internalType": "uint256",
      "name": "_id",
      "type": "uint256"
    }, {
      "internalType": "string",
      "name": "_userName",
      "type": "string"
    }],
    "stateMutability": "view",
    "type": "function"
  }]

  

	const options = {
    chain: "mumbai",
    address: "0x48eedeC866fFAeb7FC5E6375FbcFDe2b8FB16308",
    function_name: "getUserPublicDetailsByAddress",
    abi: abi,
    params: {
      _userAddress: address
    },
  };
  const data = await Moralis.Web3API.native.runContractFunction(options);

	logger.info(data)

	return data
})

//Moralis.Cloud.beforeSave('UserRegistered', async (request) => {})
