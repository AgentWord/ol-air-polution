<template>
  <div>
    <!-- 用户信息表 -->
    <Modal v-model="userValue" :mask-closable="false" :closable="false">
      <p slot="header">
        <span>用户信息表</span>
        <span @click="onClose">
          <Icon type="ios-close-empty" style="float:right"  size="28"></Icon>
        </span>
      </p>
      <Row style="margin-bottom:10px">
        <Col span="14" offset="4">
          <Input v-model="chackValue" @on-change="chackValueChange(chackValue)">
            <Button  class="buttonStyle" slot="append" icon="ios-search" @click="searchKeyWord(chackValue)">查询</Button>
          </Input>
        </Col>
      </Row>
      <Table border ref="selection" :columns="columns1" :data="dataUsersList" @on-select-cancel="cancelselectUserName" @on-select="selectedUserName"></Table>
      <div slot="footer">
        <Page :total="dataCount" show-total size="small" style="float:left"></Page>
        <Button type="ghost" @click="onClose">取消</Button>
        <Button type="primary" @click="sureInfo">确定</Button>
      </div>
    </Modal>
    <!-- 确定信息表 -->
    <Modal v-model="sureInfoModal" :mask-closable="false" :closable="false">
      <p slot="header">
        <span>确定分组</span>
        <span @click="onCloseInfo">
          <Icon type="ios-close-empty" style="float:right"  size="28"></Icon>
        </span>
      </p>
      <Row style="margin-bottom:10px">
        <Form :model="formTop" label-position="top">
          <FormItem label="分组名称：">
            <Select v-model="formTop.groupName" >
              <Option value="我的家人" label="我的家人"></Option>
              <Option value="我的朋友" label="我的朋友"></Option>
              <Option value="我的同学" label="我的同学"></Option>
            </Select>
          </FormItem>
          <FormItem label="组员名称：">
              <Input v-model="formTop.grouper" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
          </FormItem>
        </Form>
      </Row>
      <div slot="footer">
        <Button type="ghost" @click="onCloseInfo">取消</Button>
        <Button type="primary" @click="onSureInfo">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  data(){
    return{
      userValue:false,
      sureInfoModal:false,
      chackValue:"",
      dataCount:0,
      formTop:{
        groupName:"",
        grouper:"",
        selectUserId:[],
      },
      columns1: [
        {
            type: 'selection',
            width: 60,
            align: 'center'
        },
        {
            title: '姓名',
            key: 'userName'
        },
        {
            title: '性别',
            key: 'gender'
        },
        {
          title: '手机号',
          key: 'phone'
        }
    ],
    dataUsersList: [],
    selectionRow:[],
    sureGroup:[],
    }
  },
  mounted(){
    this.getUsersList()
  },
  methods:{
    //获取所有用户信息表
    getUsersList() {
      this.$http.send({ url: "userslist"}, this, res => {
        this.dataUsersList = res.data;
        this.dataCount = this.dataUsersList.length;
        if(this.$store.state.selectionUser){
          var selection = this.$store.state.selectionUser;
          this.dataUsersList.forEach(e => {
            e['_checked'] = false;
            selection.forEach(e2 => {
              if(e.userid.match(e2.userid)){
                e['_checked'] = true;
              }
            })
          })
        }
      });
    },
    //模糊查询
    searchKeyWord(chackValue){
      if(chackValue){
        var key = ["userName","phone"];
        var newArr= [];
        newArr =  this.$utils.search(key,this.dataUsersList,chackValue);
        this.dataUsersList = newArr;
        this.dataCount = this.dataUsersList.length;
      }else{
        this.getUsersList()
      }
    },
    //清空输入框时
    chackValueChange(chackValue){
      if(!chackValue){
        this.getUsersList()
      }
    },
    //取消选中用户
    cancelselectUserName(selection,row){
      this.selectionRow = selection;
    },
    //勾选用户
    selectedUserName(selection,row){
      this.selectionRow = selection;
    },
    //打开弹窗
    openModal(){
       this.userValue = true;
    },
    //关闭弹窗
    onClose(){
      this.userValue = false;
      this.$emit("on-closeUser")
    },
    //确定选择
    sureInfo(){
      this.onClose();
      this.getUserName();
      this.sureInfoModal = true;
    },
    //获取选择的用户名
    getUserName(){
      var username = [];
      this.formTop.selectUserId = []
      this.selectionRow.forEach(e => {
        username +=" " + e.userName;
        this.formTop.selectUserId.push(e.userid);
      })
      this.formTop.grouper = username;
    },
    //关闭分组名信息弹窗
    onCloseInfo(){
      this.sureInfoModal = false;
      this.openModal();
    },
    // 确认分组信息
    onSureInfo(){
      this.sureInfoModal = false;
      var formGroup = this.formTop;
      this.sureGroup.push(formGroup);
      this.$emit("excudeGroup",this.sureGroup);
    },
  },
}
</script>

<style scoped>
  .buttonStyle{
    /* color: #fff;
    background-color: #2d8cf0;
    border-color: #2d8cf0; */
  }
</style>
