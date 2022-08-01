const { expect } = require("chai")

describe("Basic NFT Unit Tests", function () {
    it("Allows the contract to mint an NFT and updates the counter", async function () {
        const [deployer] = await ethers.getSigners()
        const Token = await ethers.getContractFactory("BasicNFT")
        const token = await Token.deploy()
        console.log("Deployed...")

        await token.mintNFT()
        console.log("A new NFT has been minted!")

        expect((await token.getTokenCounter()).toString()).to.equal("1")
    })
})
