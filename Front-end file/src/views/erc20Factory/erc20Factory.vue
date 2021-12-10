<template>
<div class="erc20Factory">
  <div class="rainbow-panel">
    <div class="title">
      Token Mint
    </div>
    <div class="info">
      Choose your Tokens settings below.
    </div>
    <div class="src20-form">
      <div class="item">
        <div class="title">
          TOKEN NAME
        </div>
        <div class="input">
          <input type="text" v-model="form.name"  placeholder=" TOKEN NAME">
        </div>
      </div>
      <div class="item">
        <div class="title">
          TOKEN SYMBOL
        </div>
        <div class="input">
          <input type="text" v-model="form.symbol" placeholder="TOKEN SYMBOL">
        </div>
      </div>
      <div class="item">
        <div class="title">
          TOKEN HOLDERS
        </div>
        <div class="input">
          <input type="text" v-model="form.manager" placeholder="ADDRESS">
        </div>
      </div>
      <div class="item">
        <div class="title">
          TOTAL SUPPLY
        </div>
        <div class="input">
          <input type="number" v-model="form.totalSupply" placeholder="AMOUNT">
        </div>
      </div>
    </div>
    <div class="mint" @click="mint">
      MINT
    </div>
  </div>
</div>
</template>

<script>
export default {
name: "erc20Factory",
  data(){
    return {
      form:{}
    }
  },
  methods:{
    mint(){
      this.$store.dispatch("erc20Factory/newToken",this.form).then(res=>{
        this.$router.push({
          path:"/daoFactory?token=" + res.events[0].address,
          query: {
            address: res.events[0].address,
            symbol: this.form.symbol
          }
        })

      })
    }
  }
}
</script>

<style lang="scss" scoped>
.erc20Factory{
  .rainbow-panel{
    width: 1200px;
    border-radius: 20px;
    background: #fff;
    margin: 20px auto;
    padding: 30px;
  }
  .title{
    font-size: 30px;
    text-align: center;
    color: #333333;
    line-height: 45px;
  }
  .info{
    text-align: center;
    font-weight: 500;
    color: #666666;
    line-height: 24px;
  }
  .src20-form{
    .item{
      text-align: center;
      .title{
        font-size: 14px;
        font-weight: 700;
      }
      .input{
        input{
          padding-left: 10px;
          width: 480px;
          height: 50px;
          background: #ffffff;
          border: 1px solid #eaeaea;
          border-radius: 10px;
        }
      }
    }
  }
  .mint{
    text-align: center;
    width: 180px;
    height: 50px;
    background: linear-gradient(90deg,#12c2e9 0%, #c471ed 64%, #f64f59 100%);
    border: 1px solid #eaeaea;
    border-radius: 10px;
    cursor: pointer;
    margin: 20px auto;
    user-select: none;
    font-size: 20px;
    line-height: 50px;
    color: #fff;
  }
}
</style>
