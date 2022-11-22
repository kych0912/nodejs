import Caver from 'caver-js'
import {
  ACCESS_KEY_ID,
  // SECRET_ACCESS_KEY,
  // NFT_CONTRACT_ADDRESS,
  CHAIN_ID,
} from '../contract/index';
import { MARKET_CONTRACT_ADDRESS } from '../contract/index';
import KIP17ABI from "../contract/abi/RemainABI.json";
import MARKETABI from '../contract/abi/MarketABI.json';
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
}


const caver = new Caver(
  new Caver.providers.HttpProvider(
    'https://node-api.klaytnapi.com/v1/klaytn',
    option
  )
)
const NFTContract = new caver.contract(NFTABI,NFT_CONTRACT_ADDRESS);
const MarketContract = new caver.contract(MARKETABI,MARKET_CONTRACT_ADDRESS);

export const getBalance = (address) => {
  return caver.rpc.klay.getBalance(address).then((response) => {
    const balance = caver.utils.convertFromPeb(
      caver.utils.hexToNumberString(response)
    )
    return balance
  })
}

export const fetchCardsOf = async (address) => {
  const _balance = await NFTContract.methods.balanceOf(address).call();
  const tokenIds =[];
  for (let i =0;i<_balance;i++){
    const id = await NFTContract.methods.tokenOfOwnerByIndex(address,i).call();
    tokenIds.push(id);
  }

  const tokenURIs =[];
  for (let i =0;i<_balance;i++){
    const uri = await NFTContract.methods.tokenURI(tokenIds[i]).call();
    tokenURIs.push(uri);
  }

  const nfts = [];
  for(let i =0;i<_balance;i++){
    nfts.push({uri: tokenURIs[i],id: tokenIds[i]});
  }
  return nfts;
}