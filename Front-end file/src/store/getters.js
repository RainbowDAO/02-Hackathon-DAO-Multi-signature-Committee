const getters = {
    isConnected: state => state.app.isConnected,
    account: state => state.app.account,
    nickName:state => state.rainbow.nickName,
    isRegister:state => state.rainbow.isRegister,
}
export default getters
