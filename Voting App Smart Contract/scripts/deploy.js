const { ethers } = require("hardhat");

async function main () {
    const Voting = await ethers.getContractFactory("Voting");
    const voting = await Voting.deploy(['Narendra Modi', 'Rahul Gnadhi', 'Arvind Kejriwal'],120);
    console.log("Contract Address : ", voting.address);
}

main()
    .then(()=>process.exit(0))
    .catch(err=>{
        console.error(err);
        process.exit(1);
    });