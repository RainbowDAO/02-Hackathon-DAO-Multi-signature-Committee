<template>
  <div class="daoList">
    <RainbowPanel class="committee-candidate">
      <template v-slot:name>
        <div style="display: flex;justify-content: space-between">
          DAO LIST
          <el-button size="small" style="margin-left: 20px" class="button1" @click="$router.back()">BACK</el-button>
        </div>
      </template>
      <template v-slot:content>
        <div class="daoList-box" v-for="(item,index) in camArr" :key="index">
          <TableItem class="item" :tableData="item" operate-g-name="JOIN" @operateGClick="joinDao(item)"/>
        </div>
        <div class="no-data" v-show="camArr.length==0">
          <img src="../../assets/img/no-data.png" alt="">
        </div>
      </template>
    </RainbowPanel>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import TableItem from "../../components/TableItem";
export default {
  name: "daoList",
  components:{TableItem},
  data() {
    return {
      daoList: [],
      camArr:[]
    }
  },
  computed:{
    ...mapGetters([
      'account',
    ]),
  },
  watch:{
    account(){
      this.getDao()
    },
    daoList() {
      let arr = []
      console.log(this.daoList)
      this.daoList.forEach((item, index) => {
        let obj = {
          index: index + 1,
          nameObj: {
            title: "NAME",
            data: item.name
          },
          infoArr: [
            {
              title: "daoAddress",
              data: item.dao
            },
          ],
          detailArr: [

          ],

        }
        arr.push(obj)

      })
      console.log(arr)
      this.camArr = arr
    }
  },
  mounted() {
    if(this.account){
      this.getDao()
    }
  },
  methods: {
    joinDao(item) {
      this.$store.dispatch("daoFactory/joinDao",this.daoList[item.index - 1].dao).then(res => {
        console.log(res)
        this.$message("success")
      })
    },
    getDao() {
      this.daoList = []
      this.$store.dispatch("daoFactory/getDaoCount").then(length => {
        console.log(length)
        for (let i = 0; i < length; i++) {
          this.$store.dispatch("daoFactory/daos", i).then(res => {
            this.daoList.push(res)
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.committee-candidate{
  padding-bottom: 60px;
  .daoList-box{
    .item{
      margin-top: 20px;
    }
  }
}
</style>
