import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const SwipeDotFun = await ethers.getContractFactory("SwipeDotFun");
  const swipeDotFun = await SwipeDotFun.deploy(
    100, // Example fee percentage (1%)
    "0xYourFeeCollectionAddress", // Example fee collection address
    "0xYourUniswapRouterAddress" // Example Uniswap router address
  );
  console.log("SwipeDotFun contract deployed to:", swipeDotFun.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
