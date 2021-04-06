<style scoped>
.ivu-select-dropdown {
  left: 0px !important;
}
</style>

<template>
  <Dropdown trigger="custom" :visible="visible" style="">
    <i-input v-model="searchKey" @on-change="handleSearchKeyChange" :placeholder="placeholder" clearable style="width:auto"></i-input>
    <span @click="commit">
      <!-- <i-button type="primary" icon="search"></i-button> -->
    </span>
    <DropdownMenu slot="list" style="width:200px">
      <div>
        <search-place v-model="searchKey" @on-select="handleOnSelect"></search-place>
      </div>
    </DropdownMenu>
  </Dropdown>
</template>
<script>
import searchPlace from "./search-place.vue";
export default {
  components: {
    searchPlace
  },
  props:{
    propText:Object
  },
  data() {
    return {
      searchKey: "",
      visible: false,
      placeholder: "请输入地点",
      selectedItem: null
    };
  },
  methods: {
    handleOnSelect(item) {
      this.visible = false;
      this.searchKey = item.name;
      this.selectedItem = item;
      this.handleSearchKeyChange(false);
      this.commit();
    },
    handleSearchKeyChange(show) {
      if (this.searchKey == "") this.visible = false;
      else if (show) this.visible = true;
    },
    setSelect(value) {
      this.selectedItem = value;
      if (value) {
        // this.placeholder =
        //   value.location.lng.toFixed(6) + "," + value.location.lat.toFixed(6);
        this.searchKey = value.name;
      }
      // this.placeholder = this.propText.propText;
    },
    clear(){
      this.searchKey = "";
    },
    commit() {
      if (this.selectedItem && this.selectedItem != null)
        this.$emit("on-select", this.selectedItem);
    }
  }
};
</script>
