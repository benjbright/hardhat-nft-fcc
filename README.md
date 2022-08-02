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





