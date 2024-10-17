import { ethers } from 'ethers';
import dotenv from 'dotenv';
import { contractFile } from './compile.js';

const contractAbi = contractFile.abi;

dotenv.config();

const privateKey = process.env.PRIVATE_KEY;
const api = process.env.API;

const contractAddress = '0x315F6013042e2c11056AaF3a15f2D5a8740C5289';

// Ethereum provider
const provider = new ethers.JsonRpcProvider(api);

async function readContractData() {
  try {
    // Create a contract instance
    const MyToken = new ethers.Contract(contractAddress, contractAbi, provider);

    const data = await MyToken.name();
    console.log('The current data stored on blockchain is:', data);

  } catch (error) {
    console.error('Error deploying contract:', error);
  }
}

readContractData();
