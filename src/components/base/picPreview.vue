<template>
  <div>
    <div class="demo-upload-list">
        <template >
            <img  :src="url+picUrl" >
            <div class="demo-upload-list-cover">
                <Icon type="ios-eye-outline" @click.native="handleView(url+picUrl)"></Icon>
            </div>
        </template>
    </div>

    <Modal title="查看缩略图" v-model="visible" >
      <img :src="imgName" v-if="visible" style="width:100%" >
    </Modal>
  </div>
</template>
<script>
export default {
  props: ["picUrl"],
  data() {
    return {
      url:'http://211.159.186.65',//'http://119.29.220.118:8080',//hehaijian 20190801,感觉应该是找图片，新服务器
      imgName: "",
      visible: false,
      picVisible: true,
    };
  },
  // created(){
  //   console.log(picUrl);
  // },

  methods: {
    handleView(name) {
      this.imgName = name;
      this.visible = true;
    }
  },
};
</script>
<style scoped>

.demo-upload-list {
  display: inline-block;
  width: 200px;
  height: 200px;
  text-align: center;
  line-height: 200px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
