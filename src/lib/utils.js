let utils = {

};

utils.qualityNames = ["优", "良", "轻度污染", "中度污染", "重度污染", "严重污染"];
utils.RouteColors = [[0, 228, 0],[37, 119, 255],[255, 126, 0],[255, 0, 0],[153, 0, 76],[126, 0, 35]];
utils.qualityColors = ["rgb(107, 205, 7)", "rgb(251, 208, 41)", "rgb(254, 136, 0)", "rgb(255, 0, 0)", "rgb(151, 4, 84)", "rgb(98, 0, 30)"];


utils.aliasNameMap = { pm25: 'PM₂.₅', pm10: "PM₁₀", so2: "SO₂", no2: "NO₂", co: "Co", o3: "O₃",
    zn:'Zn',cu:'Cu',pb:'Pb',as:'As',ni:'Ni',cd:'Cd',v:'V',cr:"Cr",mn:"Mn",aeri:'AERI',
    gongye:"工业",jiaotong:'交通',minyong:'民用',dianli:'电力'
}
utils.aliasRealTimeS = { pm25: 'PM₂.₅', pm10: "PM₁₀", so2: "SO₂", no2: "NO₂", co: "CO", o3: "O₃",
    aeri:'AERI'
}
utils.diquArr=[{ label:"全部",value:1,disable:false},
{ label:"北市区",value:2,disable:true},
{ label:"南市区",value:3,disable:true},
{ label:"新市区",value:4,disable:true}],

utils.InputRanges = {
    0:[0,50,50,100,100,150,150,200,200,300,300,600], //AQI
    1:[0,35,35,75,75,115,115,150,150,250,250,600], //PM25
    2:[0,50,50,150,150,250,250,350,350,420,420,600],//pm10
    3:[0,50,50,150,150,475,475,800,800,1600,1600,2600],//so2
    4:[0,40,40,80,80,180,180,280,280,565,565,950], //no2
    5:[0,160,160,200,200,300,300,400,400,800,800,1200], //o3
    6:[0,2,2,4,4,14,14,24,24,36,36,60] //co
}
utils.sixWuRanwuColors = { 'PM2.5': '#FB7293', PM10: "#ff9f7f", SO2: "#fff065", NO2: "#9084ff", CO: "#71f6f9", O3: "#A5D2FF" }
utils.pollutionUnit={
    "模式模型":{
        NO:"ppm",
        NO2:"ppm",
        O3:"ppm",
        PM10:"kg/m³"
    },
    "AOD模型":{
        "PM2.5":"ug/m³",
        "PM10":"ug/m³",
        "NO2":"ug/m³",
        "SO2":"ug/m³",
        "O3":"ug/m³",
        "CO":"mg/m³",
    },
    "土地利用回归模型":{
        "PM2.5":"ug/m³",
        "PM10":"ug/m³",
        "NO2":"ug/m³",
        "SO2":"ug/m³",
        "O3":"ug/m³",
        "CO":"mg/m³",
    }

}
utils.Diction=(a)=>{
    switch (a) {
        case "PM2.5":
           return "PM₂.₅";
        case "PM25":
           return "PM₂.₅";
        case "PM10":
            return "PM₁₀";
        case "NO2":
            return "NO₂";
        case "SO2":
            return "SO₂";
        case "O3":
            return "O₃";
        default:
            return a;
      }

},
//utils.api=process.env.API_HOST // 定义接口地址
utils.IP="http://211.159.186.65:19999"
//utils.IP="http://211.159.186.65:19999"
utils.api="http://211.159.186.65:19999"
utils.roadServiceUrl="http://211.159.186.65:10000/geoserver/cite/wms";
// clear
utils.clearOverlay =() =>{
    var i=0;   
    var n = document.getElementById('chartId_'+i);
    while(n!=null){
        n.parentNode.removeChild(n)
        n=null;
        i++;
        n = document.getElementById('chartId_'+i);
    }
},

utils.getPollutionField=(a)=>{
    switch (a) {
        case "AERI":
          return "aeri";
        case "PM2.5":
           return "pm25Exp";
        case "PM10":
            return "pm10Exp";
        case "NO₂":
            return "no2Exp";
        case "SO₂":
            return "so2Exp";
        case "O₃":
            return "o3Exp";
        case "CO":
            return "coExp";
        default:
          break;
      }

},

utils.getQualityFromAqi = (aqi) => {
    let a = 0
    if (aqi <= 50) {
        a = 0;
    } else if (aqi <= 100) {
        a = 1;
    } else if (aqi <= 150) {
        a = 2;
    } else if (aqi <= 200) {
        a = 3;
    } else if (aqi <= 300) {
        a = 4;
    } else if (aqi > 300) {
        a = 5;
    }
    return [a, utils.qualityNames[a]];
}


utils.getQualityFromAeri = (aeri) => {
    let a = 0
    if (aeri >= 0 && aeri < 1) {
        a = 0;
    } else if (aeri >= 1 && aeri < 2) {
        a = 1;
    } else if (aeri >= 2 && aeri < 3) {
        a = 2;
    } else if (aeri >= 3 && aeri < 4) {
        a = 3;
    } else if (aeri >= 4 && aeri <= 6) {
        a = 4;
    } else if (aeri > 6) {
        a = 5;
    }
    return a;
}
utils.markerSymbolsUrl = (datas,aeri,type) => {
    //实时点的颜色 
    let agei = 0, genderi = 0, a = 0,AQIi = 0 ,picUrl= [];
    if(datas.age<=17){
        agei = 0
    }else if(datas.age>17 && datas.age<=40){
        agei = 1
    }else if(datas.age>40 && datas.age<=65){
        agei = 2
    }else if(datas.age>65){
        agei = 3
    }
    if(datas.gender == "女"){
        genderi = 0
    }else{
        genderi = 1
    } 
    if (aeri >= 0 && aeri < 1) {
        a = 0;
    } else if (aeri >= 1 && aeri < 2) {
        a = 1;
    } else if (aeri >= 2 && aeri < 3) {
        a = 2;
    } else if (aeri >= 3 && aeri < 4) {
        a = 3;
    } else if (aeri >= 4 && aeri <= 6) {
        a = 4;
    } else if (aeri > 6) {
        a = 5;
    }
    if(datas.aqi>0 && datas.aqi<=50){
        AQIi = 0
    }else if(datas.aqi>50 && datas.aqi<=100){
        AQIi = 1
    }else if(datas.aqi>100 && datas.aqi<=150){
        AQIi = 2
    }else if(datas.aqi>150 && datas.aqi<=200){
        AQIi = 3
    }else if(datas.aqi>200 && datas.aqi<=300){
        AQIi = 4
    }else if(datas.aqi>300){
        AQIi = 5
    }
    if(type == "aeri"){
        picUrl.push(agei,genderi,a); 
    }else{
        picUrl.push(agei,genderi,AQIi);  
    }
    return picUrl; 
}

utils.getPollutionTypeOfname = (a) => {
    let pollution = ""
    if (a==1) {
        pollution="PM2.5";
    } else if (a==2) {
        pollution="PM10";
    } else if (a==3) {
        pollution="SO2";
    } else if (a==4) {
        pollution="NO2";
    } else if (a==5) {
        pollution="O3";
    } else if (a==6) {
        pollution="CO";
    }
    return pollution;
}
utils.getPollutionType = (pollution) => {
    let a = 0
    if (pollution=="PM25") {
        a = 1;
    } else if (pollution=="PM10") {
        a = 2;
    } else if (pollution=="SO2") {
        a = 3;
    } else if (pollution=="NO2") {
        a = 4;
    } else if (pollution=="O3") {
        a = 5;
    } else if (pollution=="CO") {
        a = 6;
    }
    return a;
}
utils.getRiskType = (riskType) => {
    let a = ""
    if (riskType=="0") {
        a = "致癌风险";
    } else if (riskType=="1") {
        a = "非致癌风险";
    }
    return a;
}

utils.formatDate = function(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : utils.padLeftZero(str));
        }
    }
    return fmt;
}
utils.padLeftZero = function(str) {
    return ('00' + str).substr(str.length);
}


utils.getNearDay = (type) => {
    var result = "";
    if (type == "now") {
        //获取系统当前时间
        var nowdate = new Date();
        var Ty = nowdate.getFullYear();
        var Tm = nowdate.getMonth() + 1;
        var Td = nowdate.getDate();
        var Th = nowdate.getHours();
        var Tf = nowdate.getMinutes();
        var Ts = nowdate.getSeconds();
        if (Td <= 9) {
            Td = "0" + Td;
        }
        if (Tm <= 9) {
            Tm = "0" + Tm;
        }
        if (Th <= 9) {
            Th = "0" + Th;
        }
        if (Tf <= 9) {
            Tf = "0" + Tf;
        }
        if (Ts <= 9) {
            Ts = "0" + Ts;
        }
        result = Ty + "-" + Tm + "-" + Td + " " + Th + ":" + Tf + ":" + Ts;
    } else if (type == "today") {
        //获取系统当前时间
        var nowdate = new Date();
        var Ty = nowdate.getFullYear();
        var Tm = nowdate.getMonth() + 1;
        var Td = nowdate.getDate();
        if (Tm <= 9) {
            Tm = "0" + Tm;
        }
        if (Td <= 9) {
            Td = "0" + Td;
        }
        result = Ty + "-" + Tm + "-" + Td;
        
    } else if (type == "todayOfYY") {
        //获取系统当前时间
        var nowdate = new Date();
        var Ty = nowdate.getFullYear();
        var Tm = nowdate.getMonth() + 1;
        var Td = nowdate.getDate(); 
        if (Td <= 9) {
            Td = "0" + Td;
        }
        result = Tm + "月" + Td + "日";
    }else if (type == "yesterday") {
        var timenow = new Date();
        timenow.setDate(timenow.getDate() - 1); //设置天数 -1 天，昨天的日期
        var y = timenow.getFullYear(); //年
        var m = timenow.getMonth() + 1; //月
        m = m < 10 ? "0" + m : m;
        var d = timenow.getDate(); //日
        d = d < 10 ? "0" + d : d;
        result = y + "-" + m + "-" + d; //字符串拼接成自己想要的时间格式，现在是yyyy/mm/dd格式
    } else if (type == "nearWeek") {
        var nowdate = new Date();
        var nearweekdate = new Date(nowdate - 7 * 24 * 3600 * 1000);
        var nearw_y = nearweekdate.getFullYear();
        var nearw_m = nearweekdate.getMonth() + 1;
        var nearw_d = nearweekdate.getDate();
        if (nearw_m <= 9) {
            nearw_m = "0" + nearw_m;
        }
        if (nearw_d <= 9) {
            nearw_d = "0" + nearw_d;
        }
        result = nearw_y + "-" + nearw_m + "-" + nearw_d;
    } else if (type == "nearMouth") {
        var nowdate = new Date();
        //获取近一月时间
        nowdate.setMonth(nowdate.getMonth() - 1);
        var nearm_y = nowdate.getFullYear();
        var nearm_m = nowdate.getMonth() + 1;
        var nearm_d = nowdate.getDate();
        if (nearm_m <= 9) {
            nearm_m = "0" + nearm_m;
        }
        if (nearm_d <= 9) {
            nearm_d = "0" + nearm_d;
        }
        result = nearm_y + "-" + nearm_m + "-" + nearm_d;
    } else if (type == "nearYear") {
        var localdate = new Date(); //Sat Jul 20 2013 10:43:36 GMT+0800 (中国标准时间)
        var lastyear = new Date(localdate - 365 * 24 * 60 * 60 * 1000); //Fri Jul 20 2012 10:43:36 GMT+0800 (中国标准时间) 减一个月只需要把365改为30即可
        var year = lastyear.getFullYear(); //2012
        var month = lastyear.getMonth() + 1; //7
        var month = month < 10 ? "0" + month : month; //"07"
        var day = lastyear.getDate(); //20
        var day = day < 10 ? "0" + day : day; //"20"
        result = year + "-" + month + "-" + day; //"2012-07-20"
    }
    return result;
}


//模糊查询
utils.search = (key, data, keyWord) => {
    var arr = [];
    data.forEach(e => {
        key.forEach(e2 => {
            if (e[e2].match(keyWord)) {
                arr.push(e);
            }
        })
    })
    return arr;
}

//人群text
utils.renqunText = (renqunValues) => {
    var crowd = '';
    switch (renqunValues) {
        case "0":
            crowd = "儿童"
            break; 
        case "1":
            crowd = "青年"
            break; 
        case "2":
            crowd = "中年"
            break;
        case "3":
            crowd = "老年"
            break;
        case "4":
            crowd = "总人群"
            break;
        default:
            break;
    }
    return crowd;
}

//从大到小排序
utils.riskRanking = (data) => {
    return data.sort((a, b) => { //按aqi排序
        var val1 = a.riskValue;
        var val2 = b.riskValue;
        if (val1 < val2) { //降序
            return 1;
        } else if (val1 > val2) {
            return -1;
        } else {
            return 0;
        }
    });
}

//排序
utils.sortFun = function(key, orderBy) {
    return function(a, b) {
        var val1 = a;
        var val2 = b;
        if (key != null && key != "") {
            val1 = a[key];
            val2 = b[key];
        }
        if (orderBy == "desc") {
            if (val1 < val2) { //降序
                return 1;
            } else if (val1 > val2) {
                return -1;
            } else {
                return 0;
            }
        } else if (orderBy == "asc") {
            if (val1 > val2) { //升序
                return 1;
            } else if (val1 < val2) {
                return -1;
            } else {
                return 0;
            }
        }
    }
}

utils.sortDescByKey = function(key) {
    return function(a, b) {
        var val1 = parseInt(a[key]);
        var val2 = parseInt(b[key]);
        if (val1 < val2) { //降序
            return 1;
        } else if (val1 > val2) {
            return -1;
        } else {
            return 0;
        }
    }
}

utils.sortDesc = function() {
    return function(a, b) {
        var val1 = a;
        var val2 = b;
        if (val1 < val2) { //降序
            return 1;
        } else if (val1 > val2) {
            return -1;
        } else {
            return 0;
        }
    }
}

utils.sortAscByKey = function(key) {
    return function(a, b) {
        var val1 = a[key];
        var val2 = b[key];
        if (val1 > val2) { //升序
            return 1;
        } else if (val1 < val2) {
            return -1;
        } else {
            return 0;
        }
    }
}

utils.sortAsc = function() {
    return function(a, b) {
        var val1 = a;
        var val2 = b;
        if (val1 > val2) { //升序
            return 1;
        } else if (val1 < val2) {
            return -1;
        } else {
            return 0;
        }
    }
}


utils.sort = function(data, key, order) {
    if (order == "desc") {
        if (key == "") return data.sort(utils.sortDesc());
        else return data.sort(utils.sortDescByKey(key));
    } else if (order == "asc") {
        if (key == "") return data.sort(utils.sortAsc());
        else return data.sort(utils.sortAscByKey(key));
    } else return data;
}

utils.randomData = function() {
    return {
        AQI: parseInt(Math.random() * 499 + 1),
        'PM2.5': parseInt(Math.random() * 99 + 1),
        PM10: parseInt(Math.random() * 99 + 1),
        SO2: parseInt(Math.random() * 99 + 1),
        NO2: parseInt(Math.random() * 99 + 1),
        CO: parseInt(Math.random() * 99 + 1),
        O3: parseInt(Math.random() * 99 + 1),
    }
}

utils.RandomNumBoth = function (Min,Max){
    var Range = Max - Min;
    var Rand = Math.random();
    var num = Min + Math.round(Rand * Range); //四舍五入
    return num;
}

export default utils;