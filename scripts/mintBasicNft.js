const { ethers } = require("hardhat")
// const { contractAddress, contractAbi } = require("../constants")
// import { contractAddress, contractAbi } from "./constants.js"

async function mintBasicNft() {
    const basicNft = await ethers.getContract("BasicNFT")
    console.log("Contract located...")

    const tx = await basicNft.mintNFT()
    await tx.wait(1)
    console.log("A new DOG NFT has been minted!")
}

mintBasicNft()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
