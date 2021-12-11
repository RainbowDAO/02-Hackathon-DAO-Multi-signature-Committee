# Getting Started
## **Dependencies**

- Linux , Mac or Windows
- node ≥ 14
- truffle v5.4.22
## test-net-contract

test-network:Kovan

### address

#### DaoFactory
0x04601FE27118433A232aB7b6F0d752d54a45A7cc
#### ERC20Factory
0x4cB8aD08984209B6C667acF4479bfd97f95cC4D6



## **Installing**

```bash
git clone https://github.com/RainbowDAO/02-Hackathon-DAO-Multi-signature-Committee.git
cd 02-Hackathon-DAO-Multi-signature-Committee/
npm install
```

## **Prepare some ETH**
You may need 1 ~ 3 ETH in your wallet.


## **Compile  Contracts**
```truffle compile```
## **Deploy  Contracts**


You will deploy 2 factory contracts
- ERC20Factory
- DaoFactory

To deploy the contracts,First write your private key in the .secret ,second open truffle-config.js . Then change the defaultNetwork accordingly. Then run ```truffle migrate --network mainnet```
,or deploy on your own network,run ```truffle migrate --network your network```



