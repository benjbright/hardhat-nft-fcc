const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("Basic NFT Unit Tests", function () {
    it("Allows the contract to mint an NFT and updates the counter", async function () {
        const [deployer, addr1] = await ethers.getSigners()
        const Token = await ethers.getContractFactory("BasicNFT")
        const token = await Token.deploy()
        console.log("Deployed...")
        console.log(`${deployer.address}`)
        console.log(`${addr1.address}`)

        await token.mintNFT()
        console.log("A new DOG NFT has been minted!")

        expect((await token.getTokenCounter()).toString()).to.equal("1")
    })

    it("Updates the balance of the NFT owner", async function () {
        const [deployer, addr1] = await ethers.getSigners()
        const Token = await ethers.getContractFactory("BasicNFT")
        const token = await Token.deploy()
        console.log("Deployed...")

        await token.mintNFT()
        console.log("A new DOG NFT has been minted!")

        expect((await token.balanceOf(deployer.address)).toString()).to.equal(
            "1"
        )
    })

    it("Transfers ownership of an NFT correctly", async function () {
        const [deployer, addr1] = await ethers.getSigners()
        const Token = await ethers.getContractFactory("BasicNFT")
        const token = await Token.deploy()
        console.log("Deployed...")

        await token.mintNFT()
        console.log("A new DOG NFT has been minted!")

        let deployerBalance = await token.balanceOf(deployer.address)
        console.log(
            `The balance of account ${deployer.address} is ${deployerBalance}`
        )

        await token.transferFrom(deployer.address, addr1.address, 0)

        const addr1Balance = await token.balanceOf(addr1.address)
        console.log(
            `The balance of account ${addr1.address} is ${addr1Balance} `
        )

        deployerBalance = await token.balanceOf(deployer.address)
        console.log(
            `The balance of account ${deployer.address} is ${deployerBalance}`
        )

        expect((await token.balanceOf(addr1.address)).toString()).to.equal("1")

        expect(await token.ownerOf(0)).to.equal(addr1.address)
    })

    it("Emits a Transfer event on the transfer of an NFT", async function () {
        const [deployer, addr1] = await ethers.getSigners()
        const Token = await ethers.getContractFactory("BasicNFT")
        const token = await Token.deploy()
        console.log("Deployed...")

        await token.mintNFT()
        console.log("A new DOG NFT has been minted!")

        // await token.transferFrom(deployer.address, addr1.address, 0)
        // console.log("A DOG NFT has been transferred...")

        await expect(token.transferFrom(deployer.address, addr1.address, 0))
            .to.emit(token, "Transfer")
            .withArgs(deployer.address, addr1.address, 0)
    })
})
