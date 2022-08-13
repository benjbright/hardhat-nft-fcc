# hardhat-nft-fcc

FreeCodeCamp blockchain course - Lesson 14 Hardhat NFT's

## Timestamps and notes

3 contracts
1. Basic NFT
2. Random IPFS hosted NFT
3. Dynamic SVG NFT

20:40 Basic NFT
- use openzeppelin templates ```yarn add --dev @openzeppelin/contracts```
- ERC721 token template https://docs.openzeppelin.com/contracts/4.x/erc721
- Create a minimalist ERC721 contract 
- NOTE - can access the templates from node_modules @openzeppelin
- Also EIP721 guidance notes https://eips.ethereum.org/EIPS/eip-721
- Token URI (Uniform Resource Identifier) unique identifier for each asset
- Conforms to the ERC721 Metadata JSON Schema 
```json
{
    "title": "Asset Metadata",
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "description": "Identifies the asset to which this NFT represents"
        },
        "description": {
            "type": "string",
            "description": "Describes the asset to which this NFT represents"
        },
        "image": {
            "type": "string",
            "description": "A URI pointing to a resource with mime type image/* representing the asset to which this NFT represents. Consider making any images at a width between 320 and 1080 pixels and aspect ratio between 1.91:1 and 4:5 inclusive."
        }
    }
}
```
- run deploy script ```yarn hardhat deploy```

20:55 Random IPFS NFT
- When we mint an NFT, we will trigger a Chainlink VRF call to get a random number
- Then use that number to get a random NFT
- Pug - super rare
- Shiba Inu - sort of rare
- St. Bernard - very common
- Users have to pay to mint an NFT
- The owner of the contract can withdraw the ETH
- Use Chainlink again to generate random numbers
- ```yarn add --dev @chainlink/contracts```
- https://docs.chain.link/docs/get-a-random-number/

21:03 Mapping Chainlink VRF Requests

21:07 Creating rare NFT's

21:15 Setting the NFT image
- Use ERC721URIStorage contract extension from openzeppelin
- Note - the constructor function still uses ERC721

21:19 Setting an NFT mint price

21:24 Random IPFS NFT Recap

21:26 Deploy script

21:31 Uploading token images with Pinata
- use IPFS node 
- can also use Pinata https://app.pinata.cloud/
- or nft.storage - in the repo can check out utils/uploadToNftStorage.js for a script
- ```yarn add --dev @pinata/sdk```
- to work with file paths ```yarn add --dev path```
- ```yarn hardhat deploy --tags randomipfs,mocks```
- NOTE - couldn't get the deploy script to work with the added tags, only running 'deploy'
- NOTE - don't forget ```require("dotenv").config()``` when working with env variables
- Can then copy the CID from Pinata into the IPFS (desktop) 

21:47 Uploading token URIs (metadata) with Pinata

21:57 Deploying part III

22:00 Random IPFS NFT Tests

22:03 Dynamic SVG on-chain NFT
- IPFS - cheap to store data, but someone needs to pin our data
- Can store data on-chain - but much more expensive!
- If price of ETH above or below certain level - change the image

22:10 Base64 Encoding
- ```yarn add --dev base64-sol```

22:16 Advanced section - Encoding, Opcodes and Calls
- abi.encode and abi.encodePacked
- being able to read the Opcodes = EVM Ethereum Virtual Machine

22:38 Intro to encoding function calls directly
- To call a function on a contract need the ABI and the contract address
- How to send a transaction that calls a function with just the data field populated?
- Solidity has low level keywords - "staticcall" and "call"
- "call" - how we call functions to change the state of the blockchain
- "staticcall" - view or pure function calls at a low level
- previous example:
```javascript
function withdraw(address recentWinner) public {
    (bool success, ) = recentWinner.call{value: address(this).balance}("");
    require(success, "Transfer Failed");
}

```
- In our {} we were able to pass specific fields of a transaction, like value
- In our () we were able to pass data in order to call a specific function - no data in this example
- We only sent ETH so no need to call a function
- If we want to call a function, or send any data - do it in the parenthesis

22:44 Encoding recap

22:46 Encoding function calls directly
- In order to call a function using only the data field of the call, we need to encode:
    - the function name
    - the parameters we want to add
    - down to the binary level

- Each contract assigns each function an ID - this is the "function selector"
    - The "function selector" is the first 4 bytes of the function signature
    - The "function signature" is a string that defines the function name / parameters

```javascript
// Example Function Selector
0xa9059cbbb

// Example Function Signature
"transfer(address, uint256)"
```

23:01 Creating an NFT TokenURI on-chain

23:09 Making the NFT dynamic

23:15 Dynamic SVG on-chain NFT deploy script
- NOTE for running deploy scripts with tags:
```javascript
yarn hardhat deploy --tags "dynamicsvg,mocks"
```
- Don't forget the " " around the tags in the command line

23:22 Deploying the NFT's to a testnet

23:30 Final deployment
- ```yarn hardhat deploy --network rinkeby --tags "main"```
- Added the contract address for the randomIpfs contract to the vrf.chainlink consumer
- Once added the new consumer / subscription can mint an NFT from each contract
- ```yarn hardhat deploy --tags "mint" --network rinkeby```
- NOTE error deploying randomIPFS section of mint.js? - timestamp at 23:32

23:34 Lesson recap
- To run individual test script ``` yarn hardhat test test/unit/basicNft.test.js```











