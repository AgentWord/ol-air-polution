// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import axios from 'axios'

import 'iview/dist/styles/iview.css'
import { loadScript } from 'esri-loader'
import VueRouter from 'vue-router'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)

import echarts from 'echarts'
Vue.prototype.$echarts = echarts

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

Vue.config.productionTip = false

import http from './lib/http.js'
Vue.prototype.$http = http

import utils from './lib/utils.js'
Vue.prototype.$utils = utils // 设置全局变量

//preload the ArcGIS API
const options = {
    // url: 'https://js.arcgis.com/4.6/',
    url: 'http://211.159.186.65/lib/arcgis_js_lib/4.6/init.js',
};
loadScript(options)

Vue.use(VueRouter);
Vue.use(iView);

import Vuex from 'vuex'
import store from './vuex/store'
Vue.use(Vuex)


import PageBar from './components/base/page-bar'
Vue.use(PageBar);
import BaseTable from './components/base/table'
Vue.use(BaseTable);

import '../static/macarons.js'

import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
    ak: 'Lrxn7GyVIO82Pkf0ZrnfMFxmr6OjUsVv'
});

Vue.prototype.$initCharts = function(id,params) {
    let myChart = echarts.init(document.getElementById(id),'macarons');
    /* 是否显示滚动条 */
    //let showZoom=params.showZoom?true:false;
    window.onresize = function() {
      myChart.resize();
    };
    myChart.resize();
    myChart.getDom().className="myEcharts";
    myChart.clear();
    let offset = 0
    if(params.offset){
        offset = params.offset
    }
    var axisLabelObj={};
    if(params.interval){
        axisLabelObj= {
            interval:0,//横轴信息全部显示
            rotate: 45,
        }
    }
    myChart.setOption({
        tooltip : {
            trigger: 'axis',
            axisPointer: {
            // type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
            }
        },
        grid: {
            right: '10%',
            containLabel: true
        },
        toolbox: {
            show : true,
            feature : {
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        legend: {
            data:params.legend
        },
        
        xAxis: [{
            type: "category",
            data: params.xAxis,
            name:params.xLabel,
            axisLabel:axisLabelObj
        }],
        yAxis: [{
          type: "value",
          name:params.yLabel,
          axisLabel : {
            formatter: "{value} " + params.labelFormatter
          },
          offset:offset
        }],
        dataZoom: [
            {
                show: false,
                start: 0,
                end: 100
            },
            {
                type: 'inside',
                start: 0,
                end: 100
            }
        ],
      series: params.series
    });
},

new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})