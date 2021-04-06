<style lang="less">
span {
  display: inline-block; //保持橫向
}
.timeline {
  position: relative;
  display: inline-block;
  margin: auto;
  text-align: center;
  padding: 2px;
      opacity: 0.8;
        background-color: #fff;
    color: #000;

  &-item {
    margin: 0px;

    &-bar {
      height: 8px;
      background-color: rgb(177, 169, 169);
      border: 1px solid transparent;
      position: relative;
      margin-top: 10px;
    }
    &-tool {
      height: 8px;
      position: relative;
      margin-top: 10px;
    }
    &-icon {
      width: 18px;
      height: 18px;
      background-color: #fff;
      border-radius: 50%;
      border: 1px solid transparent;
      position: relative;
      margin: auto;
      top: -6px;
      &-blue {
        border-color: #2d8cf0;
        color: #2d8cf0;
      }
      &-selected {
        background-color: #2d8cf0;
      }
    }
    &-content {
      padding: 5px 5px 0px 5px;
    }
  }
}
.timeline-left {
  top: -14px;
  margin-right: 10px;
  left: 1px;
  position: relative;
  display: inline;
}
</style>
<template>
  <div class="timeline">
    <!-- <hour-day-month class="timeline-left" @on-select-change="handleHourChange"></hour-day-month> -->
    <span class="timeline-item">
      <div class="timeline-item-tool">
        <span class="timeline-item-icon timeline-item-icon-blue" style="width: 30px;height: 30px;" @click="goPlay">
          <Icon v-show="!isPlay" size=30 type="ios-play" />
          <Icon v-show="isPlay" size=30 type="ios-pause" />
        </span>
      </div>
    </span>
    <span class="timeline-item">
      <div class="timeline-item-tool">
        <span class="timeline-item-icon timeline-item-icon-blue" @click="goTo('back')">
          <Icon type="ios-arrow-left" />
        </span>
      </div>
      <p class="timeline-item-content">向前</p>
    </span>
    <span class="timeline-item" v-for="(item,index) in data" :key="index">
      <div class="timeline-item-bar">
        <span class="timeline-item-icon timeline-item-icon-blue" :class="{'timeline-item-icon-selected':classOfItemClicked === index}" @click="clickItem(item,index)"></span>
      </div>
      <p class="timeline-item-content">{{item}}</p>
    </span>
    <span class="timeline-item">
      <div class="timeline-item-tool">
        <span class="timeline-item-icon timeline-item-icon-blue" @click="goTo('front')">
          <Icon type="ios-arrow-right" />
        </span>
      </div>
      <p class="timeline-item-content">向后</p>
    </span>
  </div>
</template>

<script>
//时间轴-带播放功能，返回
import hourDayMonth from "../base/hour-day-month.vue";
export default {
  components: {
    hourDayMonth
  },
  props: {
    step: {
      type: Number,
      default: 5
    },
    timelist:Array,
    showNumbers: {
      type: Number,
      default: 7
    },
    intervalTime:{
      type:Number,
      default:4000
    },
  },
  data() {
    return {
      data: [],
      selectedItem: '',
      classOfItemClicked: 0,
      isPlay: false,
      sliceIndex: 0,
      timer: {},
      dataOfAll:[],
      dates:[],
      params:{
        startTime:"",
        endTime:"",
        timeFlag:"",
        pageNum:0,
        pageSize:1,
        mpType:"",
      }, 
      dd:{
        '01:00':{aqi:56,co:56},
        '02:00':{aqi:57,co:57},
        '03:00':{aqi:56,co:56},
        '04:00':{aqi:57,co:57},
        '05:00':{aqi:56,co:56},
        '06:00':{aqi:57,co:57},
        '07:00':{aqi:56,co:56},
        '08:00':{aqi:57,co:57},
        '09:00':{aqi:56,co:56},
        '10:00':{aqi:57,co:57},
      }
    };
  },
  mounted() {
    // for (var i = 0; i < 9; i++) {
    //   this.dataOfAll.push("2018-06-1" + i);
    // }
    // this.data = this.slice(this.sliceIndex, this.showNumbers, this.dataOfAll);
    // this.init();    
    this.init(this.dd)// 初始化滚动轴
  },
  methods: {
    init(historyData){
      this.dataOfAll=[];
      if(historyData){
          var temp=[];
          this.timelist.forEach(element => {
              temp.push(element.time);
          });
          /* for(var key in historyData){
            temp.push(key);
          } */
          this.dataOfAll=temp;
      }
      this.data = this.slice(this.sliceIndex, this.showNumbers, this.dataOfAll);
      this.$emit('request-data',this.timelist); // 加载时执行父级控件的request-data监听函数
    },
    clickItem(item, index) {
      this.classOfItemClicked = index;// 标注点击的节点id
    },
    goTo(type) {
      if(this.dataOfAll.length<=this.showNumbers){
        //时间轴已经显示全部数据
          //this.$Message.error("已经是全部时间节点了");
          return false;
      }else{
        if (type == "front" &&this.sliceIndex < this.dataOfAll.length - this.showNumbers ) {
          this.sliceIndex++;
          return true;
        } else if (type == "back" && this.sliceIndex > 0) {
          this.sliceIndex--;
          return true;
        } else {
          if(!this.isPlay)this.$Message.error("没有更多数据了");
          return false;
        }
      }
    },
    goPlay() {
      this.isPlay = !this.isPlay;
      if (this.isPlay) {
        if (this.timer) clearInterval(this.timer);
        if (!this.canMoveToFront()) {//回到起点
            this.classOfItemClicked=0;
            this.sliceIndex=0;
        }
        this.timer = setInterval(() => {
          if (!this.isPlay) {
            clearInterval(this.timer);
            return;
          }
          if (!this.moveToFront()) {
            this.isPlay = false;
            return;
          }
        }, this.intervalTime);
      } else {
        if (this.timer) clearInterval(this.timer);
      }
    },
    canMoveToFront(){
      if(this.dataOfAll.length<=this.showNumbers){//显示的是全部数据
        if(this.classOfItemClicked<this.dataOfAll.length-1){//未到最后
          return true;
        }else{
          return false;//到最后了
        }
      }
      if (this.classOfItemClicked < this.showNumbers - 1) {
        return true;
      }
      return false;
    },
    moveToFront() {
      if(this.canMoveToFront()){
        this.classOfItemClicked++;
        return true;
      }else {
        //高亮焦点已经显示到最后
        return  this.goTo("front");
      }
    },
    slice(sliceIndex, number, datas) {
      let length = datas.length;
      let start = sliceIndex % length;
      let end = start + number;
      let temp = [];
      if (end >= length) {
        temp = datas.slice(start, length);
      } else if (start < 0) {
      } else {
        temp = datas.slice(start, end);
      }
      return temp;
    },
     handleHourChange(selected,dates) {
      let begin = "",end = "";
      if(dates&&dates.length==2&&dates[0]!=""&&dates[1]!=""){
        begin=dates[0];end=dates[1];
      }else{
        if (selected == "hour") {
          begin = end = this.$utils.getNearDay("today");
        } else if (selected == "day") {
          begin = this.$utils.getNearDay("nearWeek");
          end = this.$utils.getNearDay("today");
        } else if (selected == "month") {
          begin = this.$utils.getNearDay("nearYear");
          end = this.$utils.getNearDay("today");
        }
      }

      begin += " 00:00:00";
      end += " 23:59:59";
      //this.getTimeData(begin, end, selected);
      //this.$emit("on-beginEnd-change", begin, end, selected,"");
      this.updateTimeLineData(begin, end, selected,"");
    },
    updateTimeLineData(startTime, endTime,timeType,siteType){
      if(startTime!=null)this.params.startTime=startTime;
      if(endTime!=null)this.params.endTime=endTime;
      if(timeType!=null)this.params.timeFlag=timeType;
      if(siteType!=null)this.params.mpType=siteType;

      //用传过来的数据
      if(this.timeLineDate){
            this.$emit('request-data',this.timeLineDate);
            this.init(this.timeLineDate);        
      }  

      return;
      this.$http.send(
        {
          url: "dynamicdistributionmapping",
          params: this.params
        },
        this,res => {
         //{"2018-06-08":[site1,site2]}
            this.$emit('request-data',res.data);
            this.init(res.data);
        }
      );
    },

    // handleHourChange(selected) {
    //   let begin = "",end = "", length = 0;
    //   var temp = [];
    //   if (selected == "hour") {
    //     begin = end = this.$utils.getNearDay("yesterday");
    //     length = 24;
    //     for (var i = 0; i < length; i++) {
    //       temp.push(begin + " " + i + ":00:00");
    //     }
    //   } else if (selected == "day") {
    //     begin = this.$utils.getNearDay("nearWeek");
    //     end = this.$utils.getNearDay("today");
    //     length
    //   } else if (selected == "month") {
    //     begin = this.$utils.getNearDay("nearYear");
    //     for (var i = 0; i < length; i++) {
    //       temp.push(begin + " " + i + ":00:00");
    //     }
    //     end = this.$utils.getNearDay("today");
    //   }

    //   begin += ":00:00";
    //   end += " 23:59:59";
    //   //this.$emit("on-beginEnd-change", begin, end, selected);
    // }
  },
  watch: {
    selectedItem(newValue, oldValue) {
      if(newValue){
      //this.$Message.success(newValue);
      /* 节点被选中时触发 */
      this.$emit("on-select-change", newValue, oldValue,this.classOfItemClicked);
      }
    },
    sliceIndex(newValue, oldValue) {
      this.data = this.slice(newValue, this.showNumbers, this.dataOfAll);
      if (this.isPlay) {
      } else {
        if (newValue > oldValue)
          this.classOfItemClicked--; //切换选中
        else this.classOfItemClicked++; //切换选中
      }
    },
    data(newValue, oldValue) {
      this.selectedItem = newValue[this.classOfItemClicked];
    },
    classOfItemClicked(newValue, oldValue) {
      this.selectedItem = this.data[newValue];
    }
  }
};
</script>
