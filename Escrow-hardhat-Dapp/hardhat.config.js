require('@nomicfoundation/hardhat-toolbox');

module.exports = {
  solidity: "0.8.17",
  paths: {
    artifacts: "./app/src/artifacts",
  },
  networks: {
    sepolia: {
      url: `${process.env.MY_ALCHEMY_RPC_ENDPOINT}`,
      accounts: [
        `38d0e9498c95d05fcf85da5f9015b6b57b3104bab8f3e16465f48d47777ed98e`,
      ],
    },
  },
};
