<style lang="less">
.ivu-radio-wrapper-checked {
  background: #0c92e9 !important;
  color: #fff !important;
}
.rightMiddle {
  position: fixed;
  float: right;
  vertical-align: middle;
  text-align: center;
  background-color: #fff;
  top: 30%;
  right: 10px;
  width: 80px;
  .radio {
    width: 80px;
    padding: 0;
  }
}
</style>
<template>
    <div class="rightMiddle">
        <RadioGroup v-model="selected" type="button">
            <Radio class="radio" v-for="(item, index) in dataOfRadio" :key="index" :label="item"></Radio>
        </RadioGroup>
    </div>
</template>

<script>
//浮动在地图右侧，初始化时就触发on-change
export default {
  name:'six-wuranwu-radio',
  props:{
    dataOfRadio:{type:Array,default: () =>['PM2.5','PM10','SO2','NO2','O3','CO']
    }
  },
  data() {
    return {
      selected: "",
      // dataOfRadio:['AQI','PM2.5','PM10','SO2','NO2','CO','O3'],
      // dataOfRadio:[
      //   {label:'AQI',value:"AQI"},
      //   {label:'PM2.5',value:"PM25"},
      //   {label:'PM10',value:"PM10"},
      //   {label:'SO2',value:"SO2"},
      //   {label:'NO2',value:"NO2"},
      //   {label:'CO',value:"CO"},
      //   {label:'O3',value:"O3"}],
    };
  },
  mounted(){
      this.selected="AQI";//初始化时就触发on-change
  },
  watch:{
      selected(newValue,oldValue){
        // this.$emit('on-change',this.selected.replace('.',"").toLowerCase());
        this.$emit('on-change',this.selected.replace('.',""));
      }
  }
};
</script>


