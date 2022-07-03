//const { Moralis } = require('moralis')
//const axios = require('axios').default
//const test = require('./test').test
import {Moralis} from 'moralis'




Moralis.Cloud.define('test', async (context) => {
	const logger = Moralis.Cloud.getLogger()
	logger.info("test")
  return "test"
})

//Moralis.Cloud.beforeSave('UserRegistered', async (request) => {})
//C:\\Users\\yeech\\Desktop\\greet-fyp\\cloudfunction\\cloudfunction.js