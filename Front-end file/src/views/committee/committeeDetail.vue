<template>
  <div class="committeeDetail">

    <RainbowPanel class="committee-member">
      <template v-slot:name>
        <div style="display: flex;justify-content: space-between">
          Committee members
          <div style="display: flex;align-items: center;">
            my votes：{{ myVotes }}
            <el-button size="small"
                       style="margin-left: 20px;background-image: linear-gradient(to right, #ed6868 0%, #ef72e2 50%, #ed6868 100%);"
                       class="button1" @click="Campaign">Campaign
            </el-button>
            <el-button size="small"
                       style="margin-left: 20px;background-image: linear-gradient(to right, #ed6868 0%, #b057e0 50%, #ed6868 100%);"
                       class="button1" @click="startVote">startVote
            </el-button>
            <el-button size="small"
                       style="margin-left: 20px;background-image: linear-gradient(to right, #ed6868 0%, #7700FF 50%, #ed6868 100%);"
                       class="button1" @click="endToParliament">endToParliament
            </el-button>
          </div>
        </div>
      </template>
      <template v-slot:content>
        <div v-for="(item,index) in parliamentList" :key="index">
          <TableItem :tableData="item" operate-g-name="delegate" @operateGClick="delegateDialog = true"
                     operateRName="vote" @operateRClick="openVoteDialog(item)"/>
        </div>
        <div class="no-data" v-show="parliamentList.length==0">
          <img src="../../assets/img/no-data.png" alt="">
        </div>
      </template>
    </RainbowPanel>
    <RainbowPanel class="committee-candidate">
      <template v-slot:name>
        Candidate
      </template>
      <template v-slot:content>
        <div v-for="(item,index) in camArr" :key="index">
          <TableItem :tableData="item" operate-g-name="delegate" @operateGClick="delegateDialog = true"
                     operateRName="vote" @operateRClick="openVoteDialog(item)"/>
        </div>
        <div class="no-data" v-show="camArr.length==0">
          <img src="../../assets/img/no-data.png" alt="">
        </div>
      </template>
    </RainbowPanel>
    <el-dialog
        title="VOTE"
        :visible.sync="isShowVote"
        width="400px"
    >
      <div class="input-box">
        <div class="name">votes:</div>
        <el-input v-model="voteNumber" type="number"></el-input>
      </div>
      <el-button @click="vote()">Vote</el-button>
    </el-dialog>
    <el-dialog
        title="Delegate"
        :visible.sync="delegateDialog"
        width="400px"
    >
      <div class="input-box">
        <div class="name">votes:</div>
        <el-input v-model="delegateNumber" type="number" placeholder="votes"></el-input>
      </div>
      <div class="input-box">
        <div class="name">address:</div>
        <el-input v-model="delegateAddress" type="text" placeholder="account address"></el-input>
      </div>
      <el-button @click="delegate()">delegate</el-button>
    </el-dialog>
  </div>
</template>

<script>
import TableItem from "../../components/TableItem";

export default {
  name: "committeeDetail",
  components: {TableItem},
  data() {
    return {
      delegateDialog: false,
      isShowVote: false,
      tokenAddress: "",
      daoAddress: {},
      myMsManager: [{}],
      campaignMsUsers: [],
      parliament:[],
      parliamentList:[],
      camArr: [],
      myVotes: 0,
      voteNumber: 0,
      delegateNumber: 0,
      delegateAddress: '',
      currentVoteAccount: ""
    }
  },
  watch: {
    account() {
      this.getData()
    },
    parliament(){
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
      this.parliamentList = arr
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
  methods: {
    startVote() {
      this.$store.dispatch("governanceDao/startVote", eval(this.daoAddress)).then(() => {
        this.$message.success("startVote success")
        this.getData()
      }).catch(err => {
        this.$message.error("startVote err" + err)
      })
    },
    openVoteDialog(item) {
      this.currentVoteAccount = this.campaignMsUsers[item.index - 1].account
      this.isShowVote = true
    },
    delegate() {
      this.$store.dispatch("token/delegateVote", {
        address: this.tokenAddress,
        voteNumber: (this.voteNumber).toString(),
        delegateAddress: this.delegateAddress
      }).then(()=>{
        this.openVoteDialog = false
      })
    },
    vote() {
      this.$store.dispatch("governanceDao/voteToParliament", {
        address: this.daoAddress,
        tickets: this.voteNumber,
        user: this.currentVoteAccount
      }).then(res => {
        console.log(res)
      })
    },
    impeach() {//Impeach

    },
    getPriorVotes(blockNumber) {
      this.$store.dispatch("token/getPriorVotes", {
        address: this.tokenAddress,
        blockNumber,
      }).then(res => {
        this.myVotes = res
      })
    },
    endToParliament() {
      this.$store.dispatch("governanceDao/endToParliament", eval(this.daoAddress)).then(() => {
        this.$message.success("applyParliament success")
        this.getData()
      }).catch(err => {
        this.$message.error("applyParliament err" + err)
      })
    },
    Campaign() { //applyParliament
      this.$store.dispatch("token/approve", {
        address: this.tokenAddress,
        contract: this.daoAddress
      }).then(res => {
        console.log(res)
        this.$store.dispatch("governanceDao/applyParliament", eval(this.daoAddress)).then(() => {
          this.$message.success("applyParliament success")
          this.getData()
        }).catch(err => {
          this.$message.error("applyParliament err" + err)
        })
      })
    },
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
  },
  computed: {
    account() {
      return this.$store.state.app.account
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style lang="scss" scoped>
.committeeDetail {
  .committee-candidate {
    margin-top: 20px;
    padding-bottom: 30px;
  }

  .committee-member {
    padding-bottom: 30px;
  }
}
</style>
