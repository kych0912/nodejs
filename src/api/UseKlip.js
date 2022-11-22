import axios from 'axios'
import {
  NFT_CONTRACT_ADDRESS,
  MARKET_CONTRACT_ADDRESS,
} from '../contract/index'

const A2P_API_PREPARE_URL = 'https://a2a-api.klipwallet.com/v2/a2a/prepare'
const APP_NAME = 'KLAY_MARKET'
//const isMobile = window.screen.width >= 1280 ? false : true;

const getKlipAccessUrl = (method, request_key) => {
  if (method === 'QR') {
    return `https://klipwallet.com/?target=/a2a?request_key=${request_key}`
  }
  // 딥링크 기술로 카카오계정으로 자동 연결
  return `kakaotalk://klipwallet/open?url=https://klipwallet.com/?target=/a2a?request_key=${request_key}`
}

export const mintCardWithURI = async (toAddress, tokenId, uri,setQrvalue, callback) =>{
    const functionJSON = '{ "constant": false, "inputs": [ { "name": "to", "type": "address" }, { "name": "tokenId", "type": "uint256" }, { "name": "tokenURI", "type": "string" } ], "name": "mintWithTokenURI", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }';

    excuteContract(NFT_CONTRACT_ADDRESS,functionJSON,"0",`[\"${toAddress}\",\"${tokenId}\",\"${uri}\"]`,setQrvalue,callback)
};


export const getAddress = (setQrvalue, callback) => {
  axios
    .post(A2P_API_PREPARE_URL, {
      bapp: {
        name: APP_NAME,
      },
      type: 'auth',
    })
    .then((response) => {
      const request_key = response.data.request_key
      // const request_key = response.data.request_key;
      // if (isMobile) {
      //     window.location.href = getKlipAccessUrl("android", request_key);
      // } else {
      //     setQrvalue(getKlipAccessUrl("QR", request_key));
      // }
      setQrvalue(getKlipAccessUrl('QR', request_key))
      // const qrcode = `https://klipwallet.com/?target=/a2a?request_key=${request_key}`;
      // setQrvalue(qrcode);
      let timerId = setInterval(() => {
        axios
          .get(
            `https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`
          )
          .then((res) => {
            if (res.data.result) {
              console.log(`[Result] ${JSON.stringify(res.data.result)}`)
              callback(res.data.result.klaytn_address)
              clearInterval(timerId)
              setQrvalue('DEFAULT')
            }
          })
      }, 1000)
    })
}

// export const listingCard = async (fromAddress, tokenId,setQrvalue, callback) =>{
//     const functionJSON = '{ "constant": false, "inputs": [ { "name": "from", "type": "address" }, { "name": "to", "type": "address" }, { "name": "tokenId", "type": "uint256" } ], "name": "safeTransferFrom", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }';
  
//     excuteContract(MARKET_CONTRACT_ADDRESS,functionJSON,"0",`[\"${fromAddress}\",\"${MARKET_CONTRACT_ADDRESS}\",\"${tokenId}\"]`,setQrvalue,callback)
//   };

export const buyCard = async ( amount,tokenId,setQrvalue, callback) =>{
    const functionJSON = '{ "constant": false, "inputs": [ { "name": "tokenId", "type": "uint256" }, { "name": "to", "type": "address" } ], "name": "buyNFT", "outputs": [ { "name": "", "type": "bool" } ], "payable": true, "stateMutability": "payable", "type": "function" }';
    excuteContract(MARKET_CONTRACT_ADDRESS,functionJSON,`${amount*10**16}`,`[\"${tokenId}\",\"${NFT_CONTRACT_ADDRESS}\"]`,setQrvalue,callback)
};
  
  
  export const excuteContract = (txTo,functionJSON,value,params,setQrvalue,callback) => {
    axios.post(
        "https://a2a-api.klipwallet.com/v2/a2a/prepare",{
            bapp:{
                name: "KLAYTN_MARKET"
            },
            type:"execute_contract",
            transaction:{
                to: txTo,
                abi:functionJSON,
                value: value,
                params: params
            }
        }
    ).then(response =>{
        const request_key = response.data.request_key;
        const qrcode = `https://klipwallet.com/?target=/a2a?request_key=${request_key}`;
        setQrvalue(qrcode);
        let timerid = setInterval(() =>{
            axios.get(`https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`).then((res) =>{
                if(res.data.result){
                    console.log(JSON.stringify(res.data.result) );
                    callback(res.data.result);
                    clearInterval()
                }
            })
        },1000);
  
    });
  };