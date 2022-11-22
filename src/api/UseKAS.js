import Caver from 'caver-js'
import axios from 'axios';
import {
  ACCESS_KEY_ID,
  SECRET_ACCESS_KEY,
  // NFT_CONTRACT_ADDRESS,
  CHAIN_ID,
} from '../contract/index';
import NFTABI from "../contract/abi/NFTABI.json";
import { NFT_CONTRACT_ADDRESS } from '../contract/index';

const option = {
    headers: [
      {
        name: 'Authorization',
        value: `Basic ${ACCESS_KEY_ID}`,
      },
      { name: 'x-chain-id', value: CHAIN_ID },
    ],
  };
  
  const caver = new Caver(
    new Caver.providers.HttpProvider(
      'https://node-api.klaytnapi.com/v1/klaytn',
      option
    )
  )


  const NFTContract = new caver.contract(NFTABI,NFT_CONTRACT_ADDRESS);

