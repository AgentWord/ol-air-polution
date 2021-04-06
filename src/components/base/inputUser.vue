<template>
  <div>
    <Input v-model="this.$store.state.inputUserValue" >
      <Icon type="person" slot="append" style="cursor: pointer;" @click="getUserModal"></Icon>
    </Input>
    <usermodal @setUsername="getUserName" v-if="this.$store.state.userModalVisible"></usermodal>
  </div>
</template>

<script>
import usermodal from "./userModal.vue";
export default {
  components:{
    usermodal,
  },
  data(){
    return{
      formInline: {
        username: '',
      },
    }
  },
  watch:{
    inputValue() {
      // this.inputValue = this.value;
    },
  },
  methods:{
    //打开用户信息表弹窗
    getUserModal(){
      this.$store.state.userModalVisible = true;
      var userModalChange = true;
      this.$store.commit("setuserModal",userModalChange);
    },
    //获取选择的用户名
    getUserName(selectionRow){
      var username = [];
      console.log(selectionRow);
        selectionRow.forEach(e => {
          username +=" " + e.userName;
          this.formInline.selectuserid += "," + e.userid;
        })
        if(username.length !== 0){
          username = username.substring(1);
        }else{
          return;
        }
        this.formInline.selectuserid = this.formInline.selectuserid.substring(1);
        this.$store.state.inputUserValue = username;
        this.$store.commit("setusernameInput",selectionRow);
        this.$store.commit("setInputUserValue",username);
    },
  },

}
</script>

<style>

</style>
