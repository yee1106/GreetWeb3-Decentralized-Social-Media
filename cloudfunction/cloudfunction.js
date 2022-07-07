
/**
 * @type{import("moralis").default}
 */
Moralis.Cloud.define('test', async (context) => {
	const logger = Moralis.Cloud.getLogger()
	logger.info("tes")
  return "testing"
})

/**
 * @type{import("moralis").default}
 */
 Moralis.Cloud.beforeSave('test', async (context) => {
	const logger = Moralis.Cloud.getLogger()
	logger.info("tes")
  return "testing"
})



//Moralis.Cloud.beforeSave('UserRegistered', async (request) => {})
//C:\\Users\\yeech\\Desktop\\greet-fyp\\cloudfunction\\cloudfunction.js