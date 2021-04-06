<template>
  <div>
    <Modal title="用户信息表" v-model="userValue" :mask-closable="false">
      <!-- <p slot="header">
        <span>用户信息表</span>
        <span @click="onClose">
          <Icon type="ios-close-empty" style="float:right"  size="28"></Icon>
        </span>
      </p>-->
      <Row style="margin-bottom:10px">
        <Col span="14" offset="4">
          <Input v-model="chackValue" @on-change="chackValueChange(chackValue)">
            <Button
              class="buttonStyle"
              slot="append"
              icon="ios-search"
              @click="getUsersList(chackValue)"
            >查询</Button>
          </Input>
        </Col>
      </Row>
      <!-- <Table border ref="selection" :height="tableHeight" :columns="columns1" :data="dataUsersList" 
        @on-select-cancel="cancelselectUserName" @on-select="selectedUserName"
      @on-select-all="selectAll" @on-select-all-cancel="cancelSelectAll"></Table>-->
      <BaseTable
        style="margin-top:10px"
        ref="table"
        v-bind:tableHeight="tableHeight"
        v-bind:ajaxOptions="ajaxOptions.userslist"
        v-bind:columnsList="columnsList"
        @handleSelectedRow="handleSelectedRow"
        @handleCancelselectRow="handleCancelselectRow"
        @handleSelectAll="handleSelectAll"
        @handleSelectChange="handleSelectChange"
        @handleCurrentChange="handleCurrentChange"
      ></BaseTable>
      <div slot="footer">
        <!-- <Page :total="dataCount" show-total size="small" style="float:left"></Page> -->
        <Button type="ghost" @click="onClose">取消</Button>
        <Button type="primary" @click="sureInfo">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import BaseTable from "./table/base-table.vue";
export default {
  components: { BaseTable },
  data() {
    return {
      userValue: false,
      chackValue: "",
      dataCount: 0,
      tableHeight: window.innerHeight - 500,
      ajaxOptions: {
        userslist: {
          url: this.$utils.IP + "/volunteer/getVolunteerByPage",
          params: { page: 1 }
        }
      },
      columnsList: [
        /* {
          type: "index",
          width: 55,
          align: "center"
        }, */
        {
          title: "用户ID",
          width: 80,
          key: "userid",
          align: "center"
        },
        {
          title: "姓名",
          width: 80,
          key: "userName",
          align: "center"
        },
        {
          title: "性别",
           width: 60,
          key: "gender",
          align: "center"
        },
        {
          title: "手机号",
          key: "phone",
          align: "center"
        }
      ],
      dataUsersList: [],
      selectionRow: [],
      isSelectAll: false
    };
  },
  mounted() {},
  methods: {
    // 获取所有用户信息表
    getUsersList(keyword=null) {
      if(keyword!=null){
        this.ajaxOptions.userslist.params.name=keyword;
      }
      this.$http.send(this.ajaxOptions.userslist, this, res => {
        console.log("111");
        this.dataUsersList = res.data.datas;
        this.$refs.table.SearchUser(res.data.datas);
        this.dataCount = this.dataUsersList.length;
        if (this.$store.state.selectionUser) {
          var selection = this.$store.state.selectionUser;
          this.dataUsersList.forEach(e => {
            e["_checked"] = false;
            selection.forEach(e2 => {
              if (e.userid.match(e2.userid)) {
                e["_checked"] = true;
              }
            });
          });
        }
      });
    },
    //模糊查询
    searchKeyWord(chackValue) {
      if (chackValue) {
        // 模糊查询要去后台查询

        var key = ["userName", "phone"];
        var newArr = [];
        newArr = this.$utils.search(key, this.dataUsersList, chackValue);
        this.dataUsersList = newArr;
        this.dataCount = this.dataUsersList.length;
      } else {
        this.getUsersList();
      }
    },
    //清空输入框时
    chackValueChange(chackValue) {
      if (!chackValue) {
        this.getUsersList();
      }
    },
    //取消选中用户
    handleCancelselectRow(selection, row) {
      this.selectionRow = selection;
    },
    handleCurrentChange(currentRow,oldCurrentRow){
     
      this.selectionRow = currentRow;

    },
    //勾选用户
    handleSelectedRow(selection, row) {
      this.selectionRow = selection;
    },
    //全选
    handleSelectAll(selection) {
      this.selectionRow = selection;
    },
    //取消全选
    handleSelectChange(selection) {
      this.selectionRow = selection;
    },
    //打开弹窗
    openModal() {
      this.userValue = true;
      console.log("打开用户表");
      this.refresh();
    },
    refresh() {
      this.ajaxOptions.userslist.url =
        this.$utils.IP + "/volunteer/getVolunteerByPage";
      this.ajaxOptions.userslist.params = { page: 1 };
      this.$refs.table.handleRefresh();
    },
    //关闭弹窗
    onClose() {
      this.userValue = false;
      this.$emit("on-closeUser");
    },
    //确定选择
    sureInfo() {
      this.onClose();// 关闭弹出框
      let username=this.selectionRow.userName;
      let userid=this.selectionRow.userid;
      let devSn=this.selectionRow.devSn;
      this.$emit("setUserName", { username: username, userid: userid,devSn:devSn });
      
    }
  }
};
</script>

<style scoped>
.buttonStyle {
  /* color: #fff;
  background-color: #2d8cf0;
  border-color: #2d8cf0; */
}
.ivu-table td,
.ivu-table th {
  height: 34px !important;
}
</style>
