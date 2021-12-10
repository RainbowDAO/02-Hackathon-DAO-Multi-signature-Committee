import ERC20Factory from "./data/erc20Factory.json"
import DAOFactory from "./data/DAOFactory.json"
import GovernanceDao from "./data/GovernanceDao.json"
import token from "./data/token.json";
const CONTRACTS = {
    ERC20Factory:{address:"0xc7d582E4b40F22824030EE0d9831e531303D2aaa",abi:ERC20Factory},
    DAOFactory:{address:"0x17908Df55C22f30E288a95e1FB83C420b73B1e2B",abi:DAOFactory},
    GovernanceDao:{abi:GovernanceDao},
    token:{abi:token}
};

function getContractByName(name, web3) {
    return new web3.eth.Contract(CONTRACTS[name].abi, CONTRACTS[name].address, {});
}

function getContractByToken(name, address, web3) {
    return new web3.eth.Contract(CONTRACTS[name].abi, address, {});
}

function getContractAddress(name) {
    return CONTRACTS[name].address;
}

export default {
    CONTRACTS,
    getContractByName,
    getContractByToken,
    getContractAddress
};
