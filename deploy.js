import { contractFile } from './compile.js';
import { ethers } from 'ethers';
import dotenv from 'dotenv';

dotenv.config();

const contractBytecode = contractFile.evm.bytecode.object;
const contractAbi = contractFile.abi;

const api = process.env.API;
const privateKey = process.env.PRIVATE_KEY;

const provider = new ethers.JsonRpcProvider(api);
const wallet = new ethers.Wallet(privateKey, provider);

// Define the constructor argument
const initialOwner = wallet.address; // or any other address you want to set as the initial owner

async function deployContract() {
  try {
    // Create a contract factory
    const factory = new ethers.ContractFactory(contractAbi, contractBytecode, wallet);

    console.log(`Attempting to deploy from account: ${wallet.address}`);
    // Pass the constructor argument when deploying the contract
    const contract = await factory.deploy(initialOwner,initialOwner);
    const res = await contract.waitForDeployment();
    console.log(res);
    
    const txReceipt = await contract.deploymentTransaction().wait();
    console.log(`Contract deployed at address: ${txReceipt.contractAddress}`);
    console.log(`Contract transaction hash: ${txReceipt.hash}`);
  } catch (error) {
    console.error('Error deploying contract:', error);
  }
}

deployContract();