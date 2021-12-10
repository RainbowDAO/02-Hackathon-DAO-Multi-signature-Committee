
## test-net-contract

test-network:Kovan

### address

#### DaoFactory
0x04601FE27118433A232aB7b6F0d752d54a45A7cc
#### ERC20Factory
0x4cB8aD08984209B6C667acF4479bfd97f95cC4D6



## Documentation on how to run the project

### Contracts

1. Make sure you have node,npm and truffle installed.
2. Clone this repository.
3. Run ```npm install```
5. To run compile, run ```truffle compile```
6. To deploy the contracts,First write your private key in the .secret ,second open truffle-config.js . Then change the defaultNetwork accordingly. Then run ```truffle migrate --network mainnet```
   ,or deploy on your own network,run ```truffle migrate --network your network```
