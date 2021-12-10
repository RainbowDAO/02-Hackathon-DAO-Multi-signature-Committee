<template>
  <div class="members">
    <RainbowPanel class="committee-candidate">
      <template v-slot:name>
        <div style="display: flex;justify-content: space-between">
          MEMBERS
          <el-button size="small" style="margin-left: 20px" class="button1" @click="$router.back()">BACK</el-button>
        </div>
      </template>
      <template v-slot:content>
        <div v-for="(item,index) in camArr" :key="index">
          <TableItem :tableData="item"/>
        </div>
        <div class="no-data" v-show="camArr.length==0">
          <img src="../../assets/img/no-data.png" alt="">
        </div>
      </template>
    </RainbowPanel>
  </div>
</template>

<script>
import TableItem from "../../components/TableItem";
export default {
  name: "members",
  components: {TableItem},
  data() {
    return {
      campaignMsUsers:[],
      camArr:[],
    }
  },
  watch: {
    account() {
      this.getData()
    },
    campaignMsUsers() {
      let arr = []
      this.campaignMsUsers.forEach((item, index) => {
        let obj = {
          index: index + 1,
          nameObj: {
            title: "account",
          },
          infoArr: [
            {
              title: "tickets",
              data: item.tickets
            },
            {
              title: "account",
              data: item.account
            },
            {
              title: "opposeTickets",
              data: item.opposeTickets
            },
          ],
          detailArr: [],

        }
        arr.push(obj)
      })
      console.log(arr)
      this.camArr = arr
    }
  },
  computed: {
    account() {
      return this.$store.state.app.account
    }
  },
  mounted() {
    if(this.account){
      this.getData()
    }
  },
  methods: {
    getParliament(){
      this.parliament = []
      this.$store.dispatch("governanceDao/getParliamentLength", {
        address: this.daoAddress,
      }).then(length=>{
        for (let i = 0; i < length; i++) {
          this.$store.dispatch("governanceDao/getParliamentByIndex", {
            address: this.daoAddress,
            idx: i
          }).then(campaignList => {
            this.parliament.push(campaignList)
          })
        }

      })
    },
    parliamentApplyRecords(voteId) {
      this.campaignMsUsers = []
      this.$store.dispatch("governanceDao/getApplyUserLength", {
        address: this.daoAddress,
        id: voteId,
      }).then(length => {
        for (let i = 0; i < length; i++) {
          this.$store.dispatch("governanceDao/parliamentApplyRecords", {
            address: this.daoAddress,
            id: voteId,
            idx: i
          }).then(campaignList => {
            console.log(campaignList)
            this.campaignMsUsers.push(campaignList)
          })
        }
      })

    },
    getData() {
      if (!this.account) {
        return
      }
      this.$store.dispatch("daoFactory/getUserDaoLength").then(length => {
        console.log(length)
        this.$store.dispatch("daoFactory/getUserDaoByIndex", length - 1).then(address => {
          this.daoAddress = address
          console.log("dao" + address)
          this.$store.dispatch("governanceDao/cgInfo", address).then((res) => {
            console.log(res)
            this.tokenAddress = res.govToken

            if (res.startVote) {
              this.getPriorVotes(res.proposalBlockNumber)
            }
            this.getParliament()
            this.parliamentApplyRecords(res.voteId)
          }).catch(err => {
            this.$message.error("applyParliament err" + err)
          })
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
