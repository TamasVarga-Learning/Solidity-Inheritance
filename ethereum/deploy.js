require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Web3 = require("web3");

const provider = new Web3.providers.HttpProvider(process.env.LOCAL_ENDPOINT);
const web3 = new Web3(provider);

// creating a function to be able to use async-await syntax
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const filePath = path.resolve(__dirname, 'build', 'MyContract.json');
  const compiledContract = JSON.parse(fs.readFileSync(filePath,'utf8'));

  console.log(compiledContract.evm.bytecode.object);

  const result = await new web3.eth.Contract(compiledContract.abi) // instantiate contract with ABI
      .deploy({ data: compiledContract.evm.bytecode.object, arguments: [ process.env.LOCAL_OWNER_ADDRESS ] }) 
      .send({ from: accounts[0], gas: '1000000', gasPrice: '20000000000' }); // send a transaction that creates the contract on the network

  console.log('Contract deployed to', result.options.address);  
};  

deploy();