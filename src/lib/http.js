import axios from 'axios';
import * as mockdata from "./mockdata-request.js";

//用于向后台发送请求
let http = {

};

//分页
http.pagination = function(pageNo, pageSize, array) {
    var offset = (pageNo - 1) * pageSize;
    return (offset + pageSize >= array.length) ? array.slice(offset, array.length) : array.slice(offset, offset + pageSize);
}

//获取模拟数据
http.test = function(options, vm, callBack) {
    var res = { data: [], success: true };
    res.data = mockdata.dataOfTable[options.data.i];
    if (!res.data) res.data = [];
    res.total = 10;
    callBack(res);
} 


http.login = function(options, vm, callBack) {
    axios({ url: '/api/user/login', params: options.params }).then(response => {
        var res = response.data;
        if (res.success) {
            callBack(res);
        } else {
            vm.$Message.error("登录失败!");
        }
    }).catch(function(response) {
        vm.$Message.error("请求失败!");
    });
}

// 模拟数据请求
http.sendMock = function(options, vm, callBack) {  
    ///TextTrack
    let url = options.url;
    if (typeof options.data === 'undefined') {
        options.data = {};
    }
    options.data['i'] = url; //post
    http.test(options, vm, callBack);
    return;
}

//发送后台请求
http.send = function(options, vm, callBack, mustCallBack) {
    axios(options).then(response => {
        var res = response.data;
        if (res.success) {
            callBack(res);
        } else if (mustCallBack) {
            callBack(res);
        }

    }).catch(function(response) {
        console.log(response);
    });
} 

//#region 轨迹解析，天地图可调用驾车规划路线，对于项目需求不符  舍弃  cdb 2019-9-7
function xmlStrToJsonObj(xmlStr) {
    var xmlObj = xmlStrToXmlObj(xmlStr);
    var jsonObj = {};
    if (xmlObj.childNodes.length > 0) {
        jsonObj = xmlObjToJsonObj(xmlObj.childNodes);
    }
    return jsonObj;
}
function xmlStrToXmlObj(xmlStr) {
    var xmlObj = {};
    if (document.all) {
        var xmlDom = new ActiveXObject("Microsoft.XMLDOM");
        xmlDom.loadXML(xmlStr);
        xmlObj = xmlDom;
    } else {
        xmlObj = new DOMParser().parseFromString(xmlStr, "text/xml");
    }
    return xmlObj;

}
function xmlObjToJsonObj(xmlNodes) {

    var obj = {};
    if (xmlNodes.length == 0) {
        obj = '';
    } else {
        for (var i = 0; i < xmlNodes.length; i++) {
            var node = xmlNodes[i];
            if (typeof node.tagName == "undefined" || node.nodeName == "#text") {
                obj = node.nodeValue;
            } else {
                var key = node.tagName;
                var value = xmlObjToJsonObj(node.childNodes)
                obj[key] = value;
            }
        }
    }
    return obj;
}
// 天地图模拟路径
http.getRouteSteps=function(startcoordinate,stopcoordinate,midcoordinate,callBack,vm){
    var options={
        url: "http://api.tianditu.gov.cn/drive",
        params:{
            postStr:{"orig":startcoordinate,"dest":stopcoordinate,"mid":midcoordinate,"style":3},
            type:"search",
            tk:"401cb3e4aa8500aad525ea9b23e037c3",
        },
       // `http://api.map.baidu.com/?output=json&qt=drct&v=3.0&origin=${startcoordinate}&destination=${stopcoordinate}&region=307&mode=walking&ie=utf-8&oue=1&fromproduct=jsapi&res=api&callback=BMap._rd._cbk19383&ak=qcVsxjSbGhms7bz1X8csGLLnaRPoUNRX`, 
    }
    axios(options).then(response => {
         debugger;
         //console.log(response.data);
         response=xmlStrToJsonObj(response.data.substring(response.data.indexOf("<routes"),response.data.indexOf("<simple>")));
         callBack(response);
    }).catch(function(response) {
        vm.$Modal.error({
            title: "提示",
            content: "请求错误！"+response,
          });
    });
}
//#endregion



http.searchPlaceTandi = function(params, vm, callBack) {
    var p = []; //参数说明'[{zhanid:\'210201\'}]'
    p.push(params);
    axios({
        url: "http://www.tianditu.com/query.shtml",
        params: { params: JSON.stringify(p) },
    }).then(response => {
        var res = response.data;
        if (res.success) {
            callBack(vm, res);
        }
    }).catch(function(response) {
        console.log(response);
    });
}

http.searchPlaceTianditu = (keyword, vm, callBack) => {
    var url = "http://api.tianditu.gov.cn/search?";//视野内搜索
    var params = {
        postStr: JSON.stringify({ keyWord: keyword, level: "11", mapBound: '113.764,38.25600000000001,116.314,39.94800000000001', queryType: "1", count: 20, start: 0 }),
        type: 'query',
        tk:"401cb3e4aa8500aad525ea9b23e037c3"
    }
    for (var key in params) {
        url += key + "=" + params[key] + "&";
    }
    axios.get(url).then(response => {
        var res = response.data;
        var result = [];
        if (res.count > 0 && res.resultType == 1 && res.pois) {
            res.pois.forEach(e => {
                var l = e.lonlat.split(" ");
                result.push({ name: e.name, address: e.address, location: { lat: parseFloat(l[1]), lng: parseFloat(l[0]) } });
            });
        } else if (res.count > 0 && res.resultType == 3 && res.area) {
            var e = res.area;
            var l = e.lonlat.split(",");
            result.push({ name: e.name, address: "", location: { lat: parseFloat(l[1]), lng: parseFloat(l[0]) } });
        }
        callBack({ message: "ok", result: result });
    }).catch(function(response) {
        console.log(response);
    });
}

http.sendAll = function(params, vm, callBack) {
    var sends = [];
    params.forEach(e => {
        sends.push(axios(e));
    })
    axios.all(sends).then(axios.spread(callBack));
}

export default http;