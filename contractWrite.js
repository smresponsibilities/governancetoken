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
const wallet = new ethers.Wallet(privateKey, provider);



async function writeContractData() {
  try {
  
    const MyToken = new ethers.Contract(contractAddress, contractAbi, wallet);

    // Current data
    const recipientAddress = '0x70F480b7EbC27e8CE127B910Ce89035B8fE50EB5'; // Replace with the recipient's address
  // Replace with the token URI



// Call the safeMint function api method
const tx = await MyToken.mint(recipientAddress, 1);
    var receipt = await tx.wait();

//api method
    const data = await MyToken.balanceOf("0x70F480b7EbC27e8CE127B910Ce89035B8fE50EB5");
    console.log('The current data stored on blockchain is:', data);




  } catch (error) {
    console.error('Error reading contract data:', error);
  }
}

writeContractData();
