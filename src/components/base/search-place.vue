<style scoped>
.search-place-item {
  font-size: 14px;
  margin: 5px;
  cursor: pointer;
}
.search-place-item-disable {
  color: #999;
}
</style>
<template>
    <div style="height: auto;max-height: 300px;overflow:auto">
     <div v-for="(item, index) in searchResults" @click="commit(item)" :key="index" class="search-place-item"
     :class="{'search-place-item-disable':item.disable === true}"
     >{{item.name}}</div>
    </div>
</template>

<script>
export default {
  props: {
    value: String
  },
  data() {
    return {
      searchResults: []
    };
  },
  methods: {
    remoteMethod(query) {
      if (query == "") return;
      this.searchResults = [{ name: "正在查询", disable: true }];
      this.$http.searchPlaceTianditu(query, this, res => {
        this.loading = false;
        if (res.message == "ok") {
          this.searchResults = res.result;
        } else {
          this.searchResults = [{ name: "无匹配结果", disable: true }];
          this.$Message.error(res.message);
        }
      });
    },
    commit(item) {
      if (!item.disable) this.$emit("on-select", item);
    }
  },
  watch: {
    value(newValue) {
      this.remoteMethod(newValue);
    }
  }
};
</script>


