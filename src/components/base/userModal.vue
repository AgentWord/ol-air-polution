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
              @click="searchKeyWord(chackValue)"
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
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "用户ID",
          key: "userid"
        },
        {
          title: "姓名",
          key: "userName"
        },
        {
          title: "性别",
          key: "gender"
        },
        {
          title: "手机号",
          width:130,
          key: "phone"
        }
      ],
      dataUsersList: [],
      selectionRow: [],
      isSelectAll: false
    };
  },
  mounted() {},
  methods: {
    //获取所有用户信息表
    getUsersList() {
      this.$http.send({ url: "userslist" }, this, res => {
        this.dataUsersList = res.data;
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
      this.onClose();
      var username = [],
        userid = [];
      if (this.selectionRow.length == 0) {
        username = "";
        userid = "";
        return;
      } else {
        this.selectionRow.forEach(e => {
          username += " " + e.userName;
          userid += "," + e.userid;
        });
        if (username.length !== 0) {
          username = username.substring(1);
        } else {
          return;
        }
        userid = userid.substring(1);
        this.$emit("setUsername", { username: username, userid: userid });
      }
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
