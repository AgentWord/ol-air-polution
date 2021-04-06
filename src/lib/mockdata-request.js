//模拟后台数据

export const dataOfTable = { //表格的模拟数据
    'userslist': [ //所有用户信息表
        { "userid": 1, "userName": "周清", "gender": "女", "age": "20", "phone": "18879814519" },
        { "userid": 2, "userName": "陈光亮", "age": "17", "gender": "男", "phone": "18829134543" },
        { "userid": 3, "userName": "王珊", "gender": "女", "age": "28", "phone": "18832986128" },
        { "userid": 4, "userName": "许巍", "age": "40", "gender": "男", "phone": "18857823092" },
        { "userid": 5, "userName": "夏宇", "age": "30", "gender": "男", "phone": "15783749283" }
    ],
    'getSingleGuiji': [ //单个个体轨迹
        { "userid": 1, "userName": "周清", "gender": "女", "age": "20", "lat": "38.8573484505", "lon": "115.5148163773", "roadName": "东关大街", "timeDuring": "11:30:20" },
        { "userid": 1, "userName": "周清", "gender": "女", "age": "20", "lat": "38.8576820564", "lon": "115.5133549122", "roadName": "东关大街", "timeDuring": "11:33:20" },
        { "userid": 1, "userName": "周清", "gender": "女", "age": "20", "lat": "38.8580890692", "lon": "115.5115921603", "roadName": "红旗大街", "timeDuring": "11:36:30" },
        { "userid": 1, "userName": "周清", "gender": "女", "age": "20", "lat": "38.8568095432", "lon": "115.5113316803", "roadName": "红旗大街", "timeDuring": "11:39:30" },
        { "userid": 1, "userName": "周清", "gender": "女", "age": "20", "lat": "38.8554627246", "lon": "115.5110405716", "roadName": "红旗大街", "timeDuring": "11:42:30" },
        { "userid": 1, "userName": "周清", "gender": "女", "age": "20", "lat": "38.8540705577", "lon": "115.5105258353", "roadName": "裕华东路", "timeDuring": "11:45:06" },
        { "userid": 1, "userName": "周清", "gender": "女", "age": "20", "lat": "38.8544391483", "lon": "115.5091733226", "roadName": "裕华东路", "timeDuring": "11:48:06" },
        { "userid": 1, "userName": "周清", "gender": "女", "age": "20", "lat": "38.8548095391", "lon": "115.5077998783", "roadName": "裕华东路", "timeDuring": "11:51:06" },
        { "userid": 1, "userName": "周清", "gender": "女", "age": "20", "lat": "38.8551905916", "lon": "115.5062843804", "roadName": "裕华东路", "timeDuring": "11:54:06" },
        { "userid": 1, "userName": "周清", "gender": "女", "age": "20", "lat": "38.8555600656", "lon": "115.5048872064", "roadName": "裕华东路", "timeDuring": "11:57:06" },
        { "userid": 1, "userName": "周清", "gender": "女", "age": "20", "lat": "38.8559420721", "lon": "115.5034470295", "roadName": "裕华东路", "timeDuring": "12:00:06" },
        { "userid": 1, "userName": "周清", "gender": "女", "age": "20", "lat": "38.8563986342", "lon": "115.5016066364", "roadName": "长城南大街", "timeDuring": "12:02:16" },
        { "userid": 1, "userName": "周清", "gender": "女", "age": "20", "lat": "38.8554279725", "lon": "115.5010626002", "roadName": "长城南大街", "timeDuring": "12:05:16" },
        { "userid": 1, "userName": "周清", "gender": "女", "age": "20", "lat": "38.8542579165", "lon": "115.5005064050", "roadName": "长城南大街", "timeDuring": "12:08:16" },
        { "userid": 1, "userName": "周清", "gender": "女", "age": "20", "lat": "38.8531273281", "lon": "115.4999360697", "roadName": "长城南大街", "timeDuring": "12:11:16" },
        { "userid": 1, "userName": "周清", "gender": "女", "age": "20", "lat": "38.8517959981", "lon": "115.4993231946", "roadName": "长城南大街", "timeDuring": "12:14:30" }
    ],
    'getSingleGuijiStatistic': [ //单个个体轨迹统计
        { "userid": 1, "userName": "周清", "gender": "女", "age": "20", "roadName": "东关大街", "timeDuring": "11:30:20-11:36:30", "licheng": "0.29" },
        { "userid": 1, "userName": "周清", "gender": "女", "age": "20", "roadName": "红旗大街", "timeDuring": "11:36:31-11:45:05", "licheng": "0.46" },
        { "userid": 1, "userName": "周清", "gender": "女", "age": "20", "roadName": "裕华东路", "timeDuring": "11:45:06-12:02:15", "licheng": "0.81" },
        { "userid": 1, "userName": "周清", "gender": "女", "age": "20", "roadName": "长城南大街", "timeDuring": "12:02:16-12:14:30", "licheng": "0.51" }
    ],
    'GuijiStatisticWay': [ //出行方式统计
        { "userid": 1, "userName": "周清", "gender": "女", "age": "20", "userid": "1", "userName": "周清", "gender": "女", "age": "20", "userName": "周清", "value": { "步行": "30", "驾车": "20", "公交": "35", "骑行": "45", "其他": "19" } },
        { "userid": 2, "userName": "陈光亮", "gender": "男", "age": "17", "value": { "步行": "24", "驾车": "40", "公交": "20", "骑行": "18", "其他": "9" } }
    ],
    'GuijiStatisticSence': [ //场景统计
        { "userid": 1, "userName": "周清", "gender": "女", "age": "20", "userName": "周清", "value": { "医院": "15", "学校": "20", "车站": "15", "工厂": "29", "商场": "19", "老人院": "5", "餐饮": "28", "其他": "10" } },
        { "userid": 2, "userName": "陈光亮", "gender": "男", "age": "17", "value": { "医院": "10", "学校": "16", "车站": "21", "工厂": "30", "商场": "8", "老人院": "43", "餐饮": "34", "其他": "12" } }
    ],
    'getMultipleGuiji': [ //多个个体出行轨迹
        { "userid": 1, "userName": "周清", "gender": "女", "beginPoint": { "lat": "38.8651671987", "lon": "115.5319630393" }, "endPoint": { "lat": "38.8430328166", "lon": "115.4987161868" }, "beginName": "中国石化第8加油站", "endName": "刘家町小区", "timeDuring": "10:30:20-11:10:30" },
        { "userid": 2, "userName": "陈光亮", "gender": "男", "age": "17", "beginPoint": { "lat": "38.8539704748", "lon": "115.4761403461" }, "endPoint": { "lat": "38.8401890749", "lon": "115.5350049700" }, "beginName": "保定动物园", "endName": "保定市焦庄小学", "timeDuring": "9:00:31-9:50:20" },
        { "userid": 3, "userName": "王珊", "gender": "女", "age": "28", "beginPoint": { "lat": "38.862306363", "lon": "115.4736290612" }, "endPoint": { "lat": "38.8813842781", "lon": "115.4687964737" }, "beginName": "保定站", "endName": "华侨大厦", "timeDuring": "14:50:31-15:16:05" }
    ],

    'getRealTimeExposeDatas': [ //实时暴露测量
        { "userid": 1, "userName": "周清", "gender": "女", "age": "20", "location": "保定市财信大厦", "lat": "38.873642", "lon": "115.510453", "shijian": "2018-06-10 20:30:00", "realTimeValue": { "AQI": "42", "PM2.5": "80", "PM10": "139", "CO": "1.25", "NO2": "65", "O3": "27", "SO2": "18" }, "mockValue": { "AQI": "42", "PM2.5": "80", "PM10": "139", "CO": "1.25", "NO2": "65", "O3": "27", "SO2": "18" } },
        { "userid": 2, "userName": "陈光亮", "gender": "男", "age": "17", "location": "保定市焦庄小学", "lat": "38.847328", "lon": "115.547599", "shijian": "2018-06-10 20:30:00", "realTimeValue": { "AQI": "103", "PM2.5": "83", "PM10": "138", "CO": "1.24", "NO2": "64", "O3": "28", "SO2": "20" }, "mockValue": { "AQI": "42", "PM2.5": "80", "PM10": "139", "CO": "1.25", "NO2": "65", "O3": "27", "SO2": "18" } },
        { "userid": 3, "userName": "王珊", "gender": "女", "age": "28", "location": "保定市华侨大厦", "lat": "38.888662", "lon": "115.481361", "shijian": "2018-06-10 20:30:00", "realTimeValue": { "AQI": "165", "PM2.5": "78", "PM10": "130", "CO": "1.21", "NO2": "59", "O3": "25", "SO2": "25" }, "mockValue": { "AQI": "42", "PM2.5": "80", "PM10": "139", "CO": "1.25", "NO2": "65", "O3": "27", "SO2": "18" } }
    ],
    'RealTimeExposeStatistic': [ //个体实时暴露测量统计
        { "userid": 1, "userName": "周清", "gender": "女", "age": "20", "location": "保定市财信大厦", "lat": "38.873642", "lon": "115.510453", "shijian": "2018-06-10 20:30:00", "value": { "08:00": "178", "09:00": "172", "10:00": "189", "11:00": "176", "12:00": "190", "13:00": "182", "14:00": "198", "15:00": "185", "16:00": "182", "17:00": "198", "18:00": "185" } },
        { "userid": 2, "userName": "陈光亮", "gender": "男", "age": "17", "location": "保定市焦庄小学", "lat": "38.847328", "lon": "115.547599", "shijian": "2018-06-10 20:30:00", "value": { "08:00": "178", "09:00": "172", "10:00": "189", "11:00": "176", "12:00": "190", "13:00": "182", "14:00": "198", "15:00": "185", "16:00": "182", "17:00": "198", "18:00": "185" } }
    ],
    // 'getRealtimeExposeStatistic': [ //实时暴露测量统计
    //     { "userid": "1", "userName": "周清", "gender": "女", "age": "20", "location": "保定市财信大厦", "lat": "38.873642", "lon": "115.510453", "shijian": "2018-06-10 20:30:00", "value": { "AQI": "172", "PM2.5": "80", "PM10": "139", "CO": "1.25", "NO2": "65", "O3": "27", "SO2": "18" } },
    //     { "userid": "2", "userName": "陈光亮", "gender": "男", "location": "保定市焦庄小学", "lat": "38.847328", "lon": "115.547599", "shijian": "2018-06-10 20:30:00", "value": { "AQI": "173", "PM2.5": "83", "PM10": "138", "CO": "1.24", "NO2": "64", "O3": "28", "SO2": "20" } },
    //     { "userid": "3", "userName": "王珊", "gender": "女", "location": "保定市华侨大厦", "lat": "38.888662", "lon": "115.481361", "shijian": "2018-06-10 20:30:00", "value": { "AQI": "165", "PM2.5": "78", "PM10": "130", "CO": "1.21", "NO2": "59", "O3": "25", "SO2": "25" } }
    // ],
    'getUsersRealTimeExposeDatas': [ //个体实时暴露测量
        { "userid": 1, "userName": "周清", "gender": "女", "age": "20", "location": "保定市财信大厦", "lat": "38.873642", "lon": "115.510453", "shijian": "2018-06-10 20:30:00", "realTimeValue": { "AQI": "42", "PM2.5": "80", "PM10": "139", "CO": "1.25", "NO2": "65", "O3": "27", "SO2": "18" }, "mockValue": { "AQI": "42", "PM2.5": "80", "PM10": "139", "CO": "1.25", "NO2": "65", "O3": "27", "SO2": "18" } },
        { "userid": 2, "userName": "陈光亮", "gender": "男", "age": "17", "location": "保定市焦庄小学", "lat": "38.847328", "lon": "115.547599", "shijian": "2018-06-10 20:30:00", "realTimeValue": { "AQI": "42", "PM2.5": "80", "PM10": "139", "CO": "1.25", "NO2": "65", "O3": "27", "SO2": "18" }, "mockValue": { "AQI": "42", "PM2.5": "80", "PM10": "139", "CO": "1.25", "NO2": "65", "O3": "27", "SO2": "18" } }
    ],
    'getSimulatedExposeDatas': [ //模拟暴露测量
        { "userid": 1, "userName": "周清", "gender": "女", "age": "20", "location": "保定市财信大厦", "lat": "38.873642", "lon": "115.510453", "shijian": "2018-06-10 20:30:00", "mockValue": { "AQI": "168", "PM2.5": "123", "PM10": "123", "CO": "1.15", "NO2": "72", "O3": "25", "SO2": "24" } },
        { "userid": 2, "userName": "陈光亮", "gender": "男", "age": "17", "location": "保定市焦庄小学", "lat": "38.847328", "lon": "115.547599", "shijian": "2018-06-10 20:30:00", "mockValue": { "AQI": "162", "PM2.5": "112", "PM10": "125", "CO": "1.27", "NO2": "54", "O3": "28", "SO2": "15" } }
    ],
    'getUserSimulatedExposeDatas': [ //单个个体历史暴露查询
        { "userid": 1, "userName": "周清", "gender": "女", "age": "20", "location": "保定市财信大厦", "lat": "38.873642", "lon": "115.510453", "shijian": "2018-06-10 20:30:00", "value": { "AQI": "168", "PM2.5": "123", "PM10": "123", "CO": "1.15", "NO2": "72", "O3": "25", "SO2": "24" } },
        // { "userid": "2", "userName": "陈光亮", "gender": "男", "age": "17", "location": "保定市焦庄小学", "lat": "38.847328", "lon": "115.547599", "shijian": "2018-06-10 20:30:00", "value": { "AQI": "162", "PM2.5": "112", "PM10": "125", "CO": "1.27", "NO2": "54", "O3": "28", "SO2": "15" } }
    ],
    'getSingleHistoricalExpose': [ //单个个体历史暴露回放
        { "userid": 1, "userName": "周清", "gender": "女", "age": "20", "location": "保定市财信大厦", "lat": "38.873642", "lon": "115.510453", "shijian": "2018-06-10 20:30:00", "value": { "AQI": "168", "PM2.5": "123", "PM10": "123", "CO": "1.15", "NO2": "72", "O3": "25", "SO2": "24" } },
        { "userid": 2, "userName": "陈光亮", "gender": "男", "age": "17", "location": "保定市焦庄小学", "lat": "38.847328", "lon": "115.547599", "shijian": "2018-06-10 20:30:00", "value": { "AQI": "162", "PM2.5": "112", "PM10": "125", "CO": "1.27", "NO2": "54", "O3": "28", "SO2": "15" } }
    ],
    'statisticHistoricalExpose': [ //历史暴露回放统计
        { "userid": 1, "userName": "周清", "gender": "女", "age": "20", "value": { "08:00": "178", "09:00": "172", "10:00": "189", "11:00": "176", "12:00": "190", "13:00": "182", "14:00": "198", "15:00": "185", "16:00": "182", "17:00": "198", "18:00": "185" } },
        { "userid": 2, "userName": "陈光亮", "gender": "男", "age": "17", "value": { "08:00": "150", "09:00": "152", "10:00": "169", "11:00": "186", "12:00": "147", "13:00": "153", "14:00": "178", "15:00": "176", "16:00": "157", "17:00": "180", "18:00": "178" } }
    ],
    'fineDrawllution': { //污染精细制图
        type0: [
            { "gridName": "人口密度", "shijian": "2018-06-17 12:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 0, "pollution": "AQI" },
            { "gridName": "人口密度", "shijian": "2018-06-17 13:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 1, "pollution": "PM25" },
            { "gridName": "人口密度", "shijian": "2018-06-17 14:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 2, "pollution": "PM10" },
            { "gridName": "人口密度", "shijian": "2018-06-17 15:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 0, "pollution": "SO2" },
            { "gridName": "人口密度", "shijian": "2018-06-17 16:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 1, "pollution": "NO2" },
            { "gridName": "人口密度", "shijian": "2018-06-17 17:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 2, "pollution": "CO" },
            { "gridName": "人口密度", "shijian": "2018-06-17 18:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 0, "pollution": "O3" },
        ],
        type1: [
            { "gridName": "暴露风险", "shijian": "2018-06-17 12:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 0, "pollution": "AQI" },
            { "gridName": "暴露风险", "shijian": "2018-06-17 13:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 1, "pollution": "PM25" },
            { "gridName": "暴露风险", "shijian": "2018-06-17 14:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 2, "pollution": "PM10" },
            { "gridName": "暴露风险", "shijian": "2018-06-17 15:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 0, "pollution": "SO2" },
            { "gridName": "暴露风险", "shijian": "2018-06-17 16:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 1, "pollution": "NO2" },
            { "gridName": "暴露风险", "shijian": "2018-06-17 17:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 2, "pollution": "CO" },
            { "gridName": "暴露风险", "shijian": "2018-06-17 18:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 0, "pollution": "O3" },
        ],
        type2: [
            { "gridName": "暴露量", "shijian": "2018-06-17 12:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 0, "pollution": "AQI" },
            { "gridName": "暴露量", "shijian": "2018-06-17 13:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 1, "pollution": "PM25" },
            { "gridName": "暴露量", "shijian": "2018-06-17 14:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 2, "pollution": "PM10" },
            { "gridName": "暴露量", "shijian": "2018-06-17 15:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 3, "pollution": "SO2" },
            { "gridName": "暴露量", "shijian": "2018-06-17 16:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 4, "pollution": "NO2" },
            { "gridName": "暴露量", "shijian": "2018-06-17 17:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 0, "pollution": "CO" },
            { "gridName": "暴露量", "shijian": "2018-06-17 18:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 1, "pollution": "O3" },
        ],
        type3: [
            { "gridName": "暴露量", "shijian": "2018-06-17 12:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 0, "pollution": "AQI" },
            { "gridName": "暴露量", "shijian": "2018-06-17 13:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 1, "pollution": "PM25" },
            { "gridName": "暴露量", "shijian": "2018-06-17 14:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 2, "pollution": "PM10" },
            { "gridName": "暴露量", "shijian": "2018-06-17 15:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 3, "pollution": "SO2" },
            { "gridName": "暴露量", "shijian": "2018-06-17 16:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 4, "pollution": "NO2" },
            { "gridName": "暴露量", "shijian": "2018-06-17 17:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 0, "pollution": "CO" },
            { "gridName": "暴露量", "shijian": "2018-06-17 18:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 1, "pollution": "O3" },
        ],
        type4: [
            { "gridName": "暴露量", "shijian": "2018-06-17 12:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 0, "pollution": "AQI" },
            { "gridName": "暴露量", "shijian": "2018-06-17 13:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 1, "pollution": "PM25" },
            { "gridName": "暴露量", "shijian": "2018-06-17 14:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 2, "pollution": "PM10" },
            { "gridName": "暴露量", "shijian": "2018-06-17 15:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 3, "pollution": "SO2" },
            { "gridName": "暴露量", "shijian": "2018-06-17 16:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 4, "pollution": "NO2" },
            { "gridName": "暴露量", "shijian": "2018-06-17 17:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 0, "pollution": "CO" },
            { "gridName": "暴露量", "shijian": "2018-06-17 18:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 1, "pollution": "O3" },
        ],
    },
    'statisticFineDrawllutionXZ': [ //污染精细制图行政单元统计
        { "userid": 1, "userName": "周清", "gender": "女", "userName": "周清", "value": { "竞秀区": "178", "莲池区": "172", "满城区": "189", "清苑区": "176", "徐水区": "170" } },
        { "userid": 2, "userName": "陈光亮", "gender": "男", "age": "17", "value": { "竞秀区": "158", "莲池区": "142", "满城区": "169", "清苑区": "166", "徐水区": "190" } }
    ],
    'statisticFineDrawllutionCJ': [ //污染精细制图场景统计
        { "userid": 1, "userName": "周清", "gender": "女", "age": "20", "value": { "医院": "15", "学校": "20", "车站": "15", "工厂": "129", "商场": "19", "老人院": "33", "餐饮": "28", "其他": "10" } },
        { "userid": 2, "userName": "陈光亮", "gender": "男", "age": "17", "value": { "医院": "20", "学校": "16", "车站": "21", "工厂": "90", "商场": "12", "老人院": "43", "餐饮": "34", "其他": "12" } }
    ],
    'statisticpopDistributSimulationXZ': [ //人群暴露模拟行政单元统计
        { "竞秀区": "5000", "莲池区": "4400", "满城区": "6200", "清苑区": "5020", "徐水区": "7210" }
    ],
    'statisticpopDistributSimulationCJ': [ //人群暴露模拟场景统计
        { "医院": "3000", "学校": "4400", "车站": "3200", "工厂": "4020", "商场": "4510", "老人院": "4300", "餐饮": "3000", "其他": "2500" }
    ],
    'statisticPopExposureCalculatXZ': [ //人群暴露计算行政单元统计
        { "竞秀区": "189", "莲池区": "176", "满城区": "166", "清苑区": "178", "徐水区": "169" }
    ],
    'statisticPopExposureCalculatCJ': [ //人群暴露计算场景统计
        { "医院": "178", "学校": "172", "车站": "189", "工厂": "176", "商场": "190", "老人院": "182", "餐饮": "198", "其他": "185" }
    ],
    'statisticPopExposureCalculatSD': [ //人群暴露计算时段统计
        { "08:00": "178", "09:00": "172", "10:00": "189", "11:00": "176", "12:00": "190", "13:00": "182", "14:00": "198", "15:00": "185", "16:00": "182", "17:00": "198", "18:00": "185" }
    ],
    'statisticExposureDynamicAnalysisXZ': [ //暴露动态分析行政单元统计
        { "statisticName": "人群暴露量", "value": { "竞秀区": "189", "莲池区": "176", "满城区": "166", "清苑区": "178", "徐水区": "169" } },
        { "statisticName": "人群暴露量变化率", "value": { "竞秀区": "37", "莲池区": "32", "满城区": "25", "清苑区": "20", "徐水区": "64" } }
    ],
    'statisticExposureDynamicAnalysisCJ': [ //暴露动态分析场景统计
        { "statisticName": "人群暴露量", "value": { "医院": "178", "学校": "172", "车站": "189", "工厂": "176", "商场": "190", "老人院": "182", "餐饮": "198", "其他": "185" } },
        { "statisticName": "人群暴露量变化率", "value": { "医院": "37", "学校": "25", "车站": "46", "工厂": "64", "商场": "35", "老人院": "20", "餐饮": "39", "其他": "20" } }
    ],
    'statisticExposureDynamicAnalysisSD': [ //暴露动态分析时段统计
        { "statisticName": "人群暴露量", "value": { "08:00": "178", "09:00": "172", "10:00": "189", "11:00": "176", "12:00": "190", "13:00": "182", "14:00": "198", "15:00": "185", "16:00": "182", "17:00": "198", "18:00": "185" } },
        { "statisticName": "人群暴露量变化率", "value": { "08:00": "37", "09:00": "32", "10:00": "25", "11:00": "32", "12:00": "20", "13:00": "33", "14:00": "64", "15:00": "46", "16:00": "35", "17:00": "39", "18:00": "12" } }
    ],
    'ExposureDynamicAnalysis': { //暴露动态分析
        AQI: [
            { "gridName": "人口密度", "shijian": "2018-06-17 12:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 0, },
            { "gridName": "人口密度", "shijian": "2018-06-17 13:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 1, },
            { "gridName": "人口密度", "shijian": "2018-06-17 14:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 2, },
            { "gridName": "人口密度", "shijian": "2018-06-17 15:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 0, },
            { "gridName": "人口密度", "shijian": "2018-06-17 16:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 1, },
            { "gridName": "人口密度", "shijian": "2018-06-17 17:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 2, },
            { "gridName": "人口密度", "shijian": "2018-06-17 18:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 0, },
        ],
        PM25: [
            { "gridName": "暴露风险", "shijian": "2018-06-17 12:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 0, },
            { "gridName": "暴露风险", "shijian": "2018-06-17 13:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 1, },
            { "gridName": "暴露风险", "shijian": "2018-06-17 14:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 2, },
            { "gridName": "暴露风险", "shijian": "2018-06-17 15:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 0, },
            { "gridName": "暴露风险", "shijian": "2018-06-17 16:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 1, },
            { "gridName": "暴露风险", "shijian": "2018-06-17 17:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 2, },
            { "gridName": "暴露风险", "shijian": "2018-06-17 18:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 0, },
        ],
        PM10: [
            { "gridName": "暴露量", "shijian": "2018-06-17 12:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 0, },
            { "gridName": "暴露量", "shijian": "2018-06-17 13:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 1, },
            { "gridName": "暴露量", "shijian": "2018-06-17 14:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 2, },
            { "gridName": "暴露量", "shijian": "2018-06-17 15:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 3, },
            { "gridName": "暴露量", "shijian": "2018-06-17 16:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 4, },
            { "gridName": "暴露量", "shijian": "2018-06-17 17:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 0, },
            { "gridName": "暴露量", "shijian": "2018-06-17 18:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 1, }
        ]
    },
    'statisticExposureSimulationPredict': [ //暴露模拟预测统计
        // { "gridName": "人口密度", "shijian": "2018-06-17 ", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 0 },
        // { "gridName": "人口密度", "shijian": "2018-06-18", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 1 },
        // { "gridName": "人口密度", "shijian": "2018-06-19", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 2 },
        // { "gridName": "人口密度", "shijian": "2018-06-20", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 3 },
        // { "gridName": "人口密度", "shijian": "2018-06-21", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 4 },
        // { "gridName": "人口密度", "shijian": "2018-06-22", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 5 },
        // { "gridName": "人口密度", "shijian": "2018-06-23", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 6 },
        // { "gridName": "人口密度", "shijian": "2018-06-24", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 7 }
        { "gridName": "总人群暴露量", "value": { "06-17": "178", "06-18": "172", "06-19": "189", "06-20": "176", "06-21": "190", "06-22": "182", "06-23": "198", "06-24": "185" } }
    ],
    'IndividualRiskStatistics': [ //所有个体风险统计
        { "userid": 1, "userName": "周清", "gender": "女", "age": "20", "location": "保定市财信大厦", "lat": "38.873642", "lon": "115.510453", "shijian": "2018-06-10 20:30:00", "风险值": "172", "致癌风险": "4", "非致癌风险": "1" },
        { "userid": 2, "userName": "陈光亮", "age": "17", "gender": "男", "location": "保定市焦庄小学", "lat": "38.847328", "lon": "115.547599", "shijian": "2018-06-10 20:30:00", "风险值": "173", "致癌风险": "3", "非致癌风险": "2" },
        { "userid": 3, "userName": "王珊", "gender": "女", "age": "28", "location": "刘家町小区", "lat": "38.8430328166", "lon": "115.4987161868", "shijian": "2018-06-10 20:30:00", "风险值": "173", "致癌风险": "3", "非致癌风险": "4" },
        { "userid": 4, "userName": "许巍", "age": "40", "gender": "男", "location": "保定站", "lat": "38.862306363", "lon": "115.4736290612", "shijian": "2018-06-10 20:30:00", "风险值": "173", "致癌风险": "1", "非致癌风险": "2.3" }
    ],
    'getUserIndividualRisk': [ //所有个体风险统计
        { "userid": 1, "userName": "周清", "gender": "女", "age": "20", "location": "保定市财信大厦", "lat": "38.873642", "lon": "115.510453", "shijian": "2018-06-10 20:30:00", "风险值": "172", "致癌风险": "4", "非致癌风险": "1" },
        { "userid": 2, "userName": "陈光亮", "age": "17", "gender": "男", "location": "保定市焦庄小学", "lat": "38.847328", "lon": "115.547599", "shijian": "2018-06-10 20:30:00", "风险值": "173", "致癌风险": "3", "非致癌风险": "2" }
    ],
    'statisticIndividualRiskZA': [ //个体风险统计
        { "userid": 1, "userName": "周清", "value": { "保定市财信大厦": "0.6", "保定市焦庄小学": "0.7", "刘家町小区": "0.5", "保定站": "0.9", "保定动物园": "0.8", "华侨大厦": "0.2", "中国石化第8加油站": "0.4" } },
        { "userid": 2, "userName": "陈光亮", "value": { "保定市财信大厦": "0.8", "保定市焦庄小学": "0.5", "刘家町小区": "0.7", "保定站": "0.4", "保定动物园": "0.3", "华侨大厦": "0.9", "中国石化第8加油站": "0.1" } }
    ],
    'statisticIndividualRiskFZA': [ //个体风险统计
        { "userid": 1, "userName": "周清", "value": { "保定市财信大厦": "0.8", "保定市焦庄小学": "0.5", "刘家町小区": "0.7", "保定站": "0.4", "保定动物园": "0.3", "华侨大厦": "0.9", "中国石化第8加油站": "0.1" } },
        { "userid": 2, "userName": "陈光亮", "value": { "保定市财信大厦": "0.6", "保定市焦庄小学": "0.7", "刘家町小区": "0.5", "保定站": "0.9", "保定动物园": "0.8", "华侨大厦": "0.2", "中国石化第8加油站": "0.4" } }
    ],
    'getPopulationRisk': { //人群风险统计
        type0: [
            { "gridName": "人口密度", "shijian": "2018-06-17 12:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 0, "crowd": "0" },
            { "gridName": "人口密度", "shijian": "2018-06-17 13:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 1, "crowd": "1" },
            { "gridName": "人口密度", "shijian": "2018-06-17 14:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 2, "crowd": "2" },
            { "gridName": "人口密度", "shijian": "2018-06-17 15:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 0, "crowd": "3" },
            { "gridName": "人口密度", "shijian": "2018-06-17 16:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 1, "crowd": "4" },
        ],
        type1: [
            { "gridName": "暴露风险", "shijian": "2018-06-17 12:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 0, "crowd": "0" },
            { "gridName": "暴露风险", "shijian": "2018-06-17 13:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 1, "crowd": "1" },
            { "gridName": "暴露风险", "shijian": "2018-06-17 14:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 2, "crowd": "2" },
            { "gridName": "暴露风险", "shijian": "2018-06-17 15:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 0, "crowd": "3" },
            { "gridName": "暴露风险", "shijian": "2018-06-17 16:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 1, "crowd": "4" },
        ],
        type2: [
            { "gridName": "暴露量", "shijian": "2018-06-17 12:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 0, "crowd": "0" },
            { "gridName": "暴露量", "shijian": "2018-06-17 13:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 1, "crowd": "1" }, ,
            { "gridName": "暴露量", "shijian": "2018-06-17 14:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 2, "crowd": "2" }, ,
            { "gridName": "暴露量", "shijian": "2018-06-17 15:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 3, "crowd": "3" },
            { "gridName": "暴露量", "shijian": "2018-06-17 16:00", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 4, "crowd": "4" },
        ],
    },
    'statisticPopulationRiskZA': [ //人群风险统计分析
        { "statisticName": "致癌风险", "value": { "08:00-09:00": "3", "09:00-10:00": "3", "10:00-11:00": "2", "11:00-12:00": "3", "12:00-13:00": "1", "13:00-14:00": "2", "14:00-15:00": "4", "15:00-16:00": "2", "16:00-17:00": "4", "17:00-18:00": "3", "18:00-19:00": "2" } }
    ],
    'statisticPopulationRiskFZA': [ //人群风险统计分析
        { "statisticName": "非致癌风险", "value": { "08:00-09:00": "2", "09:00-10:00": "4", "10:00-11:00": "3", "11:00-12:00": "1", "12:00-13:00": "2", "13:00-14:00": "2", "14:00-15:00": "2", "15:00-16:00": "4", "16:00-17:00": "3", "17:00-18:00": "2", "18:00-19:00": "3" } }
    ],
    'riskHotRanking': {
        '超市': [ //风险热点排序
            { "address": "新市场街148", "name": "诚意超市", "lat": "38.879188", "lon": "115.447312", "riskValue": "80" },
            { "address": "新华中街305", "name": "诚信超市", "lat": "38.773048", "lon": "115.481", "riskValue": "40" },
            { "address": "河北省保定市易县", "name": "蓉园超市", "lat": "38.879188", "lon": "115.447312", "riskValue": "70" },
            { "address": "新市场街148", "name": "诚意超市", "lat": "39.2041", "lon": "115.373464", "riskValue": "69" },
            { "address": "迎宾大街123", "name": "天顺超市", "lat": "39.266868", "lon": "115.805792", "riskValue": "75" },
            { "address": "范阳中路41号", "name": "汇合超市", "lat": "39.4842", "lon": "115.9862", "riskValue": "50" },
            { "address": "河北省保定市高碑店市", "name": "自强超市", "lat": "39.314548", "lon": "115.86912", "riskValue": "84" },
            { "address": "泰安路16", "name": "新华超市", "lat": "39.384472", "lon": "115.705648", "riskValue": "47" },
            { "address": "长城北大街314", "name": "金龙超市", "lat": "38.87226", "lon": "115.506608", "riskValue": "45" },
            { "address": "河北省保定市安国市", "name": "天和超市", "lat": "38.39962", "lon": "115.423632", "riskValue": "34" },
            { "address": "富民南路39", "name": "天桥超市", "lat": "39.11404", "lon": "116.029", "riskValue": "45" },
            { "address": "北环路南", "name": "信和超市", "lat": "39.1302", "lon": "116.039616", "riskValue": "55" },
            { "address": "河北省保定市雄县", "name": "中心超市", "lat": "39.0506", "lon": "116.193296", "riskValue": "90" },
            { "address": "新容花园对过", "name": "大良超市", "lat": "39.0506", "lon": "115.853312", "riskValue": "88" },
        ],
        '医院': [
            { "address": "桃源西大街32", "lat": "38.859004", "lon": "115.150185", "name": "兴和医院", "riskValue": "86", "imgUrl": "https://webmap0.bdimg.com/client/services/thumbnails?width=132&height=104&align=center,center&quality=100&src=http%3A%2F%2Fhiphotos.baidu.com%2Fmap%2Fpic%2Fitem%2Fa8014c086e061d95e9e333a877f40ad163d9cafd.jpg" },
            { "address": "长城北大街320号", "lat": "38.879652", "lon": "115.519094 ", "name": "保定市第一中心医院", "riskValue": "73", "imgUrl": "https://webmap0.bdimg.com/client/services/thumbnails?width=132&height=104&align=center,center&quality=100&src=http%3A%2F%2Fhiphotos.baidu.com%2Flbsugc%2Fpic%2Fitem%2F960a304e251f95cac6343204c5177f3e660952ba.jpg" },
            { "address": "百花东路991号", "lat": "38.873355", "lon": "115.496317", "name": "第二五二医院", "riskValue": "90", "imgUrl": "https://webmap0.bdimg.com/client/services/thumbnails?width=132&height=104&align=center,center&quality=100&src=http%3A%2F%2Fhiphotos.baidu.com%2Fmap%2Fpic%2Fitem%2Fbf096b63f6246b60077eb6e7e7f81a4c510fa234.jpg" },
            { "address": "莲池区裕华东路212号", "lat": "38.860463", "lon": "115.522003", "name": "河北大学附属医院", "riskValue": "56", "imgUrl": "https://webmap0.bdimg.com/client/services/thumbnails?width=132&height=104&align=center,center&quality=100&src=http%3A%2F%2Fhiphotos.baidu.com%2Flbsugc%2Fpic%2Fitem%2Fb999a9014c086e06bc2578f90e087bf40bd1cbf7.jpg" },
            { "address": "竞秀区东风西路338号向阳南大街", "lat": "38.879217", "lon": "115.465761", "name": "保定市第二医院东风西路", "riskValue": "48", "imgUrl": "https://webmap0.bdimg.com/client/services/thumbnails?width=132&height=104&align=center,center&quality=100&src=http%3A%2F%2Fhiphotos.baidu.com%2Flbsugc%2Fpic%2Fitem%2F0df431adcbef7609bcfbdd2d22dda3cc7dd99e94.jpg" },
            { "address": "莲池区五四东路443号", "lat": "38.878068", "lon": "115.53129", "name": "第一中心医院东院", "riskValue": "61", "imgUrl": "https://webmap0.bdimg.com/client/services/thumbnails?width=132&height=104&align=center,center&quality=100&src=http%3A%2F%2Fhiphotos.baidu.com%2Flbsugc%2Fpic%2Fitem%2F64380cd7912397dd73d520b65582b2b7d1a287d0.jpg" },
            { "address": "东风东路572号", "lat": "38.870596", "lon": "115.533949", "name": "河北省第六人民医院", "riskValue": "99", "imgUrl": "https://webmap0.bdimg.com/client/services/thumbnails?width=132&height=104&align=center,center&quality=100&src=http%3A%2F%2Fhiphotos.baidu.com%2Fmap%2Fpic%2Fitem%2Fa8014c086e061d95e9e333a877f40ad163d9cafd.jpg" },
            { "address": "莲池区东风东路648号", "lat": "38.870585", "lon": "115.539603", "name": "河北大学附属医院北院", "riskValue": "103", "imgUrl": "https://webmap0.bdimg.com/client/services/thumbnails?width=132&height=104&align=center,center&quality=100&src=http%3A%2F%2Fhiphotos.baidu.com%2Fmap%2Fpic%2Fitem%2F738b4710b912c8fc4e52f35df0039245d78821f8.jpg" }
        ],
        '学校': [ //人群风险统计分析
            { "address": "莲池区普育路39号", "lat": "38.904218", "lon": "115.523161", "name": "新保师附小", "riskValue": "97", "imgUrl": "https://webmap0.bdimg.com/client/services/thumbnails?width=132&height=104&align=center,center&quality=100&src=http%3A%2F%2Fhiphotos.baidu.com%2Fmap%2Fpic%2Fitem%2F8ad4b31c8701a18bfc50b798972f07082938feaa.jpg" },
            { "address": "七一东路2761号", "lat": "38.883931", "lon": "115.576746", "name": "河北保定外国语学校", "riskValue": "78", "imgUrl": "https://webmap0.bdimg.com/client/services/thumbnails?width=132&height=104&align=center,center&quality=100&src=http%3A%2F%2Fhiphotos.baidu.com%2Fmap%2Fpic%2Fitem%2F96dda144ad345982aefd963c00f431adcbef842c.jpg" },
            { "address": "莲池区普育路1号", "lat": "38.903476", "lon": "115.522779", "name": "河北保定师范附属小学", "riskValue": "67", "imgUrl": "https://webmap0.bdimg.com/client/services/thumbnails?width=132&height=104&align=center,center&quality=100&src=http%3A%2F%2Fhiphotos.baidu.com%2Fmap%2Fpic%2Fitem%2F962bd40735fae6cd848746ce03b30f2442a70f6a.jpg" },
            { "address": "永华北大街619号", "lat": "38.882915", "lon": "115.511988", "name": "华北电力大学(保定一校区)", "riskValue": "105", "imgUrl": "https://webmap0.bdimg.com/client/services/thumbnails?width=132&height=104&align=center,center&quality=100&src=http%3A%2F%2Fhiphotos.baidu.com%2Flbsugc%2Fpic%2Fitem%2F42a98226cffc1e17da7e12c74c90f603728de907.jpg" },
            { "address": "灵雨寺街289号", "lat": "38.855841", "lon": "115.489891", "name": "河北农业大学", "riskValue": "49", "imgUrl": "https://webmap0.bdimg.com/client/services/thumbnails?width=132&height=104&align=center,center&quality=100&src=http%3A%2F%2Fhiphotos.baidu.com%2Fmap%2Fpic%2Fitem%2Fb17eca8065380cd735012e42ad44ad3459828106.jpg" },
            { "address": "五四东路180号", "lat": "38.876199", "lon": "115.52262", "name": "河北大学", "riskValue": "66", "imgUrl": "https://webmap0.bdimg.com/client/services/thumbnails?width=132&height=104&align=center,center&quality=100&src=http%3A%2F%2Fhiphotos.baidu.com%2Fmap%2Fpic%2Fitem%2Fe850352ac65c10380799f860b8119313b17e89a8.jpg" },
            { "address": "莲池区七一东路3027号", "lat": "38.887037", "lon": "115.585285", "name": "保定学院", "riskValue": "83", "imgUrl": "https://webmap0.bdimg.com/client/services/thumbnails?width=132&height=104&align=center,center&quality=100&src=http%3A%2F%2Fhiphotos.baidu.com%2Fmap%2Fpic%2Fitem%2F6f061d950a7b02081ff8bf216bd9f2d3572cc839.jpg" }
        ],
        '车站': [ //人群风险统计分析
            { "address": "北三环路口", "lat": "38.917497", "lon": "115.557439", "name": "保定北三环路口（公交站）", "riskValue": "78", "imgUrl": "https://webmap0.bdimg.com/client/services/thumbnails?width=132&height=104&align=center,center&quality=100&src=http%3A%2F%2Fhiphotos.baidu.com%2Fspace%2Fpic%2Fitem%2F8d5494eef01f3a29048585d99125bc315c607c53.jpg" },
            { "address": "竞秀区东风中路1166号西", "lat": "38.878614", "lon": "115.490358", "name": "市公安局(公交站)", "riskValue": "72", "imgUrl": "https://webmap0.bdimg.com/client/services/thumbnails?width=132&height=104&align=center,center&quality=100&src=http%3A%2F%2Fhiphotos.baidu.com%2Fspace%2Fpic%2Fitem%2Fa8ec8a13632762d0484ff4a8a8ec08fa513dc6b0.jpg" },
            { "address": "喜雨街与朝阳南大街交叉口南100米", "lat": "38.818044", "lon": "115.473803", "name": "保定公交长城场站", "riskValue": "105", "imgUrl": "https://webmap0.bdimg.com/client/services/thumbnails?width=132&height=104&align=center,center&quality=100&src=http%3A%2F%2Fhiphotos.baidu.com%2Flbsugc%2Fpic%2Fitem%2F7aec54e736d12f2ecf089df949c2d5628535681d.jpg" },
            { "address": "中山东路121号", "lat": "38.952176", "lon": "115.340558", "name": "保定客运中心满城站", "riskValue": "65", "imgUrl": "https://webmap0.bdimg.com/client/services/thumbnails?width=132&height=104&align=center,center&quality=100&src=http%3A%2F%2Fhiphotos.baidu.com%2Fspace%2Fpic%2Fitem%2Fbf096b63f6246b60d708e263e3f81a4c510fa2a7.jpg" },
            { "address": "莲池区裕华东路1085号", "lat": "38.860442", "lon": "115.548876", "name": "保定客运中心站", "riskValue": "98", "imgUrl": "https://webmap0.bdimg.com/client/services/thumbnails?width=132&height=104&align=center,center&quality=100&src=http%3A%2F%2Fhiphotos.baidu.com%2Fmap%2Fpic%2Fitem%2F242dd42a2834349bcfd32711c5ea15ce37d3be49.jpg" },
            { "address": "竞秀区建华大街640号", "lat": "38.869177", "lon": "115.48644", "name": "保定站", "riskValue": "120", "imgUrl": "https://webmap0.bdimg.com/client/services/thumbnails?width=132&height=104&align=center,center&quality=100&src=http%3A%2F%2Ft11.baidu.com%2Fit%2Fu%3D1200827779%2C1150756308%26fm%3D22" }
        ],
        '公园': [ //人群风险统计分析
            { "address": "莲池区南堤路", "lat": "38.836356", "lon": "115.456274", "name": "保定南湖公园", "riskValue": "73", "imgUrl": "https://webmap0.bdimg.com/client/services/thumbnails?width=132&height=104&align=center,center&quality=100&src=http%3A%2F%2Fhiphotos.baidu.com%2Fspace%2Fpic%2Fitem%2F6a600c338744ebf8c4c63428d1f9d72a6059a776.jpg" },
            { "address": "莲池区永华南大街688号", "lat": "38.859088", "lon": "115.494997", "name": "保定市动物园", "riskValue": "72", "imgUrl": "https://webmap0.bdimg.com/client/services/thumbnails?width=132&height=104&align=center,center&quality=100&src=http%3A%2F%2Fhiphotos.baidu.com%2Fmap%2Fpic%2Fitem%2F8b13632762d0f703c53272260ffa513d2797c54c.jpg" },
            { "address": "保定烈士陵园西侧", "lat": "38.861302", "lon": "115.462478", "name": "龙潭公园", "riskValue": "69", "imgUrl": "https://webmap0.bdimg.com/client/services/thumbnails?width=132&height=104&align=center,center&quality=100&src=http%3A%2F%2Fpcsv0.map.bdimg.com%2F%3Fqt%3Dpr3d%26fovy%3D65%26quality%3D100%26panoid%3D01029900001405270930283076F%26heading%3D355%26pitch%3D-0.36000001430511%26width%3D800%26height%3D600" },
            { "address": "阳光北大街2121号", "lat": "38.925885", "lon": "115.49177", "name": "保定植物园", "riskValue": "48", "imgUrl": "https://webmap0.bdimg.com/client/services/thumbnails?width=132&height=104&align=center,center&quality=100&src=http%3A%2F%2Fhiphotos.baidu.com%2Flbsugc%2Fpic%2Fitem%2F7a899e510fb30f249127d428cf95d143ad4b035f.jpg" },
            { "address": "莲池区东风东路与军校街交汇处", "lat": "38.874473", "lon": "115.534991", "name": "保定军校公园", "riskValue": "51", "imgUrl": "https://webmap0.bdimg.com/client/services/thumbnails?width=132&height=104&align=center,center&quality=100&src=http%3A%2F%2Fhiphotos.bdimg.com%2Flvpics%2Fpic%2Fitem%2Faa18972bd40735faa702da659e510fb30e24087f.jpg" },
            { "address": "莲池区长城南大街69号", "lat": "38.868608", "lon": "115.51786", "name": "东风公园", "riskValue": "53", "imgUrl": "https://webmap0.bdimg.com/client/services/thumbnails?width=132&height=104&align=center,center&quality=100&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fbainuo%2Fcrop%253D0%252C0%252C800%252C506%253Bw%253D690%253Bq%253D90%253Bc%253Dnuomi%252C95%252C95%2Fsign%3D2f99f1848394a4c21e6cbd6b33c437e5%2F6f061d950a7b020882e52f6a66d9f2d3572cc809.jpg" },
            { "address": "竞秀区五四西路127号", "lat": "38.886162", "lon": "115.472519", "name": "竞秀公园", "riskValue": "46", "imgUrl": "https://webmap0.bdimg.com/client/services/thumbnails?width=132&height=104&align=center,center&quality=100&src=http%3A%2F%2Fhiphotos.baidu.com%2Flbsugc%2Fpic%2Fitem%2F4b90f603738da9779c1be94fb851f8198618e39a.jpg" },
            { "address": "竞秀区建华大街640号", "lat": "38.869177", "lon": "115.48644", "name": "保定站", "riskValue": "120", "imgUrl": "https://webmap0.bdimg.com/client/services/thumbnails?width=132&height=104&align=center,center&quality=100&src=http%3A%2F%2Ft11.baidu.com%2Fit%2Fu%3D1200827779%2C1150756308%26fm%3D22" }
        ],
        '养老院': [ //人群风险统计分析
            { "address": "竞秀区盛兴西路1715号", "lat": "38.894684", "lon": "115.437877", "name": "福来居老年公寓", "riskValue": "68", "imgUrl": "https://webmap0.bdimg.com/client/services/thumbnails?width=132&height=104&align=center,center&quality=100&src=http%3A%2F%2Fhiphotos.baidu.com%2Fmap%2Fpic%2Fitem%2F14ce36d3d539b6002bb80419e550352ac65cb72d.jpg" },
            { "address": "七一中路589", "lat": "38.887017", "lon": "115.50794", "name": "金辉康复养老公寓", "riskValue": "59", "imgUrl": "https://webmap0.bdimg.com/client/services/thumbnails?width=132&height=104&align=center,center&quality=100&src=http%3A%2F%2Fhiphotos.baidu.com%2Fmap%2Fpic%2Fitem%2F9a504fc2d56285354fdc36b49cef76c6a7ef6363.jpg" },
            { "address": "莲池区东风东路813-815号", "lat": "38.87219", "lon": "115.543384", "name": "九九敬老院", "riskValue": "74", "imgUrl": "https://webmap0.bdimg.com/client/services/thumbnails?width=132&height=104&align=center,center&quality=100&src=http%3A%2F%2Fhiphotos.baidu.com%2Fmap%2Fpic%2Fitem%2F2f738bd4b31c8701875c66492b7f9e2f0608ffb3.jpg" },
            { "address": "莲池区凌云街555号", "lat": "38.84342", "lon": "115.517655", "name": "金秋老年公寓", "riskValue": "67", "imgUrl": "https://webmap0.bdimg.com/client/services/thumbnails?width=132&height=104&align=center,center&quality=100&src=http%3A%2F%2Fhiphotos.baidu.com%2Fmap%2Fpic%2Fitem%2F5243fbf2b21193133b5e042569380cd791238d02.jpg" },
            { "address": "东关大街437号植物保护研究所院内", "lat": "38.865753", "lon": "115.528403", "name": "康寿园老年公寓", "riskValue": "87", "imgUrl": "https://webmap0.bdimg.com/client/services/thumbnails?width=132&height=104&align=center,center&quality=100&src=http%3A%2F%2Fhiphotos.baidu.com%2Fspace%2Fpic%2Fitem%2Ffaedab64034f78f07e4acae471310a55b3191c67.jpg" },
            { "address": "百花东路1100号", "lat": "38.870914", "lon": "115.498041", "name": "春辉养老院", "riskValue": "70", "imgUrl": "https://webmap0.bdimg.com/client/services/thumbnails?width=132&height=104&align=center,center&quality=100&src=http%3A%2F%2Fhiphotos.baidu.com%2Fmap%2Fpic%2Fitem%2F9345d688d43f8794329153bdde1b0ef41bd53a32.jpg" },
            { "address": "莲池区百楼乡隆兴东路东百楼小学西南250米", "lat": "38.895956", "lon": "115.570164", "name": "金福泰养老院", "riskValue": "70", "imgUrl": "https://webmap0.bdimg.com/client/services/thumbnails?width=132&height=104&align=center,center&quality=100&src=http%3A%2F%2Fhiphotos.baidu.com%2Fmap%2Fpic%2Fitem%2F34fae6cd7b899e51a7413eba4ea7d933c9950d54.jpg" }
        ],
    },
    'IndividualRiskRanking': [ //个体风险排序
        // { "userid": "1", "userName": "周清", "gender": "女", "age": "20", "location": "保定市财信大厦", "lat": "38.873642", "lon": "115.510453", "shijian": "2018-06-10 20:30:00", "riskValue": "172", "headImg": "" },
        // { "userid": "2", "userName": "陈光亮", "age": "17", "gender": "男", "location": "保定市焦庄小学", "lat": "38.847328", "lon": "115.547599", "shijian": "2018-06-10 20:30:00", "riskValue": "72", "headImg": "" },
        // { "userid": "3", "userName": "王珊", "gender": "女", "age": "28", "location": "刘家町小区", "lat": "38.8430328166", "lon": "115.4987161868", "shijian": "2018-06-10 20:30:00", "riskValue": "80", "headImg": "" },
        // { "userid": "4", "userName": "许巍", "age": "40", "gender": "男", "location": "保定站", "lat": "38.862306363", "lon": "115.4736290612", "shijian": "2018-06-10 20:30:00", "riskValue": "92", "headImg": "" }
        { "userid": 1, "userName": "周清", "gender": "女", "age": "20", "lat": "38.9073484505", "lon": "115.5148163773", "location": "东关大街", "shijian": "2018-06-10 20:30:00", "riskValue": "172", "headImg": "" },
        { "userid": 2, "userName": "陈光亮", "age": "17", "gender": "男", "lat": "38.8954627246", "lon": "115.5110405716", "location": "红旗大街", "shijian": "2018-06-10 20:30:00", "riskValue": "172", "headImg": "" },
        { "userid": 3, "userName": "王珊", "gender": "女", "age": "28", "lat": "38.8740705577", "lon": "115.5105258353", "location": "裕华东路", "shijian": "2018-06-10 20:30:00", "riskValue": "172", "headImg": "" },
        { "userid": 4, "userName": "许巍", "age": "40", "gender": "男", "lat": "38.863986342", "lon": "115.5016066364", "location": "长城南大街", "shijian": "2018-06-10 20:30:00", "riskValue": "172", "headImg": "" },
        { "userid": 5, "userName": "钱旭", "age": "40", "gender": "男", "location": "保定市第六人民医院", "lat": "38.873642", "lon": "115.510453", "shijian": "2018-06-10 20:30:00", "riskValue": "172", "headImg": "" },
        { "userid": 6, "userName": "王强", "age": "40", "gender": "男", "location": "保定市东站", "lat": "38.847328", "lon": "115.547599", "shijian": "2018-06-10 20:30:00", "riskValue": "172", "headImg": "" },
        { "userid": 7, "userName": "张超", "age": "40", "gender": "男", "location": "保定市站", "lat": "38.847328", "lon": "115.547599", "shijian": "2018-06-10 20:30:00", "riskValue": "172", "headImg": "" },
        { "userid": 8, "userName": "李丽", "age": "40", "gender": "女", "location": "华北电力大学", "lat": "38.887328", "lon": "115.547599", "shijian": "2018-06-10 20:30:00", "riskValue": "172", "headImg": "" },
        { "userid": 9, "userName": "王晓晓", "age": "15", "gender": "女", "location": "保定市中学", "lat": "38.78328", "lon": "115.547599", "shijian": "2018-06-10 20:30:00", "riskValue": "172", "headImg": "" },
        { "userid": 10, "userName": "张冲冲", "age": "10", "gender": "男", "location": "保定市焦庄小学", "lat": "38.847328", "lon": "115.547599", "shijian": "2018-06-10 20:30:00", "riskValue": "172", "headImg": "" },
        { "userid": 1, "userName": "周海涛", "gender": "女", "age": "20", "lat": "38.8573484505", "lon": "115.5148163773", "location": "东关大街", "shijian": "2018-06-10 20:30:00", "riskValue": "172", "headImg": "" },
        { "userid": 2, "userName": "陈亮", "age": "17", "gender": "男", "lat": "38.8554627246", "lon": "115.5010405716", "location": "红旗大街", "shijian": "2018-06-10 20:30:00", "riskValue": "172", "headImg": "" },
        { "userid": 3, "userName": "王珊珊", "gender": "女", "age": "28", "lat": "38.8540705577", "lon": "115.4905258353", "location": "裕华东路", "shijian": "2018-06-10 20:30:00", "riskValue": "172", "headImg": "" },
        // { "userid": "4", "userName": "许巍", "age": "40", "gender": "男", "lat": "38.8563986342", "lon": "115.5016066364", "location": "长城南大街", "shijian": "2018-06-10 20:30:00", "riskValue": "172", "headImg": "" },
        // { "userid": "5", "userName": "钱旭", "age": "40", "gender": "男", "location": "保定市第六人民医院", "lat": "38.873642", "lon": "115.510453", "shijian": "2018-06-10 20:30:00", "riskValue": "172", "headImg": "" },
        { "userid": 6, "userName": "何强", "age": "40", "gender": "男", "location": "保定市东站", "lat": "38.747328", "lon": "115.547599", "shijian": "2018-06-10 20:30:00", "riskValue": "172", "headImg": "" },
        { "userid": 7, "userName": "钱超", "age": "40", "gender": "男", "location": "保定市站", "lat": "38.837328", "lon": "115.647599", "shijian": "2018-06-10 20:30:00", "riskValue": "172", "headImg": "" },
        { "userid": 8, "userName": "王丽", "age": "40", "gender": "女", "location": "华北电力大学", "lat": "38.807328", "lon": "115.547599", "shijian": "2018-06-10 20:30:00", "riskValue": "172", "headImg": "" },
        { "userid": 9, "userName": "王晓", "age": "15", "gender": "女", "location": "保定市中学", "lat": "38.797328", "lon": "115.567599", "shijian": "2018-06-10 20:30:00", "riskValue": "172", "headImg": "" },
        { "userid": 10, "userName": "张冲", "age": "10", "gender": "男", "location": "保定市焦庄小学", "lat": "38.78328", "lon": "115.597599", "shijian": "2018-06-10 20:30:00", "riskValue": "172", "headImg": "" }
    ],
    'RiskChangeAnalysisZA': { //个体风险统计
        type0: [
            { "userid": 1, "userName": "周清", "gender": "女", "age": "20", "location": "保定市财信大厦", "lat": "38.873642", "lon": "115.510453", "value": { "08:00-09:00": "4", "09:00-10:00": "3", "10:00-11:00": "2", "11:00-12:00": "4", "12:00-13:00": "3", "13:00-14:00": "2", "14:00-15:00": "1", "15:00-16:00": "5", "16:00-17:00": "3", "17:00-18:00": "4", "18:00-19:00": "2" } },
            { "userid": 2, "userName": "陈光亮", "gender": "男", "age": "17", "location": "保定市焦庄小学", "lat": "38.847328", "lon": "115.547599", "value": { "08:00-09:00": "3", "09:00-10:00": "2", "10:00-11:00": "1", "11:00-12:00": "3", "12:00-13:00": "2", "13:00-14:00": "4", "14:00-15:00": "3", "15:00-16:00": "4", "16:00-17:00": "3", "17:00-18:00": "2", "18:00-19:00": "4" } }
            // { "userid": "1", "userName": "周清", "gender": "女", "age": "20", "location": "保定市财信大厦", "lat": "38.873642", "lon": "115.510453", "shijian": "08:00-09:00", "riskValue": "172", "riskChangeRate": "40" },
            // { "userid": "2", "userName": "陈光亮", "age": "17", "gender": "男", "location": "保定市焦庄小学", "lat": "38.847328", "lon": "115.547599", "shijian": "09:00-10:00", "riskValue": "172", "riskChangeRate": "50" },
            // { "userid": "3", "userName": "王珊", "gender": "女", "age": "28", "location": "刘家町小区", "lat": "38.8430328166", "lon": "115.4987161868", "shijian": "10:00-11:00", "riskValue": "172", "riskChangeRate": "65" },
            // { "userid": "4", "userName": "许巍", "age": "40", "gender": "男", "location": "保定站", "lat": "38.862306363", "lon": "115.4736290612", "shijian": "11:00-12:00", "riskValue": "172", "riskChangeRate": "35" },
            // { "userid": "5", "userName": "王静", "gender": "女", "age": "28", "location": "刘家町小区", "lat": "38.8430328166", "lon": "115.4987161868", "shijian": "12:00-13:00", "riskValue": "172", "riskChangeRate": "65" },
            // { "userid": "6", "userName": "胡天", "age": "40", "gender": "男", "location": "保定站", "lat": "38.862306363", "lon": "115.4736290612", "shijian": "13:00-14:00", "riskValue": "172", "riskChangeRate": "35" }
        ],
        type1: [
            { "userid": 1, "userName": "周清", "gender": "女", "age": "20", "location": "保定市财信大厦", "lat": "38.873642", "lon": "115.510453", "value": { "08:00-09:00": "4", "09:00-10:00": "3", "10:00-11:00": "2", "11:00-12:00": "4", "12:00-13:00": "3", "13:00-14:00": "2", "14:00-15:00": "1", "15:00-16:00": "5", "16:00-17:00": "3", "17:00-18:00": "4", "18:00-19:00": "2" } },
            { "userid": 2, "userName": "陈光亮", "gender": "男", "age": "17", "location": "保定市焦庄小学", "lat": "38.847328", "lon": "115.547599", "value": { "08:00-09:00": "3", "09:00-10:00": "2", "10:00-11:00": "1", "11:00-12:00": "3", "12:00-13:00": "2", "13:00-14:00": "4", "14:00-15:00": "3", "15:00-16:00": "4", "16:00-17:00": "3", "17:00-18:00": "2", "18:00-19:00": "4" } }
        ]
    },
    'RiskChangeAnalysisFZA': { //个体风险统计
        type0: [
            { "userid": 1, "userName": "周清", "gender": "女", "age": "20", "location": "保定市财信大厦", "lat": "38.873642", "lon": "115.510453", "value": { "08:00-09:00": "3", "09:00-10:00": "2", "10:00-11:00": "1", "11:00-12:00": "3", "12:00-13:00": "2", "13:00-14:00": "4", "14:00-15:00": "3", "15:00-16:00": "4", "16:00-17:00": "3", "17:00-18:00": "2", "18:00-19:00": "4" } },
            { "userid": 2, "userName": "陈光亮", "gender": "男", "age": "17", "location": "保定市焦庄小学", "lat": "38.847328", "lon": "115.547599", "value": { "08:00-09:00": "4", "09:00-10:00": "3", "10:00-11:00": "2", "11:00-12:00": "4", "12:00-13:00": "3", "13:00-14:00": "2", "14:00-15:00": "1", "15:00-16:00": "5", "16:00-17:00": "3", "17:00-18:00": "4", "18:00-19:00": "2" } }
        ],
        type1: [
            { "userid": 1, "userName": "周清", "gender": "女", "age": "20", "location": "保定市财信大厦", "lat": "38.873642", "lon": "115.510453", "value": { "08:00-09:00": "3", "09:00-10:00": "2", "10:00-11:00": "1", "11:00-12:00": "3", "12:00-13:00": "2", "13:00-14:00": "4", "14:00-15:00": "3", "15:00-16:00": "4", "16:00-17:00": "3", "17:00-18:00": "2", "18:00-19:00": "4" } },
            { "userid": 2, "userName": "陈光亮", "gender": "男", "age": "17", "location": "保定市焦庄小学", "lat": "38.847328", "lon": "115.547599", "value": { "08:00-09:00": "4", "09:00-10:00": "3", "10:00-11:00": "2", "11:00-12:00": "4", "12:00-13:00": "3", "13:00-14:00": "2", "14:00-15:00": "1", "15:00-16:00": "5", "16:00-17:00": "3", "17:00-18:00": "4", "18:00-19:00": "2" } }
        ],
        type2: [
            { "userid": 1, "userName": "周清", "gender": "女", "age": "20", "location": "保定市财信大厦", "lat": "38.873642", "lon": "115.510453", "value": { "08:00-09:00": "3", "09:00-10:00": "2", "10:00-11:00": "1", "11:00-12:00": "3", "12:00-13:00": "2", "13:00-14:00": "4", "14:00-15:00": "3", "15:00-16:00": "4", "16:00-17:00": "3", "17:00-18:00": "2", "18:00-19:00": "4" } },
            { "userid": 2, "userName": "陈光亮", "gender": "男", "age": "17", "location": "保定市焦庄小学", "lat": "38.847328", "lon": "115.547599", "value": { "08:00-09:00": "4", "09:00-10:00": "3", "10:00-11:00": "2", "11:00-12:00": "4", "12:00-13:00": "3", "13:00-14:00": "2", "14:00-15:00": "1", "15:00-16:00": "5", "16:00-17:00": "3", "17:00-18:00": "4", "18:00-19:00": "2" } }
        ],
    },
    'RiskTimePeriodAnalysisGTZA': { //个体风险时段统计
        type0: [ //按时
            { "userid": 1, "userName": "周清", "gender": "女", "age": "20", "location": "保定市财信大厦", "lat": "38.873642", "lon": "115.510453", "value": { "08:00-09:00": "4", "09:00-10:00": "3", "10:00-11:00": "2", "11:00-12:00": "4", "12:00-13:00": "3", "13:00-14:00": "2", "14:00-15:00": "1", "15:00-16:00": "5", "16:00-17:00": "3", "17:00-18:00": "4", "18:00-19:00": "2" } },
            { "userid": 2, "userName": "陈光亮", "gender": "男", "age": "17", "location": "保定市焦庄小学", "lat": "38.847328", "lon": "115.547599", "value": { "08:00-09:00": "3", "09:00-10:00": "2", "10:00-11:00": "1", "11:00-12:00": "3", "12:00-13:00": "2", "13:00-14:00": "4", "14:00-15:00": "3", "15:00-16:00": "4", "16:00-17:00": "3", "17:00-18:00": "2", "18:00-19:00": "4" } }
        ],
        type1: [ //按天
            { "userid": 1, "userName": "周清", "gender": "女", "age": "20", "location": "保定市财信大厦", "lat": "38.873642", "lon": "115.510453", "value": { "06-17": "4", "06-18": "3", "06-19": "2", "06-20": "4", "06-21": "3", "06-22": "2", "06-23": "1", "06-24": "5", "06-25": "3", "06-26": "4", "06-27": "2" } },
            { "userid": 2, "userName": "陈光亮", "gender": "男", "age": "17", "location": "保定市焦庄小学", "lat": "38.847328", "lon": "115.547599", "value": { "06-17": "3", "06-18": "2", "06-19": "1", "06-20": "3", "06-21": "2", "06-22": "4", "06-23": "3", "06-24": "4", "06-25": "3", "06-26": "2", "06-27": "4" } }
        ],
        type2: [ //按周
            { "userid": 1, "userName": "周清", "gender": "女", "age": "20", "location": "保定市财信大厦", "lat": "38.873642", "lon": "115.510453", "value": { "06-18": "3", "06-19": "2", "06-20": "4", "06-21": "3", "06-22": "2", "06-23": "1", "06-24": "5" } },
            { "userid": 2, "userName": "陈光亮", "gender": "男", "age": "17", "location": "保定市焦庄小学", "lat": "38.847328", "lon": "115.547599", "value": { "06-18": "2", "06-19": "1", "06-20": "3", "06-21": "2", "06-22": "4", "06-23": "3", "06-24": "4" } }
        ],
    },
    'RiskTimePeriodAnalysisGTFZA': { //个体风险时段统计
        type0: [ //按时
            { "userid": 1, "userName": "周清", "gender": "女", "age": "20", "location": "保定市焦庄小学", "lat": "38.847328", "lon": "115.547599", "value": { "08:00-09:00": "3", "09:00-10:00": "2", "10:00-11:00": "1", "11:00-12:00": "3", "12:00-13:00": "2", "13:00-14:00": "4", "14:00-15:00": "3", "15:00-16:00": "4", "16:00-17:00": "3", "17:00-18:00": "2", "18:00-19:00": "4" } },
            { "userid": 2, "userName": "陈光亮", "gender": "男", "age": "17", "location": "保定市财信大厦", "lat": "38.873642", "lon": "115.510453", "value": { "08:00-09:00": "4", "09:00-10:00": "3", "10:00-11:00": "2", "11:00-12:00": "4", "12:00-13:00": "3", "13:00-14:00": "2", "14:00-15:00": "1", "15:00-16:00": "5", "16:00-17:00": "3", "17:00-18:00": "4", "18:00-19:00": "2" } }

        ],
        type1: [ //按天,
            { "userid": 1, "userName": "周清", "gender": "女", "age": "20", "location": "保定市焦庄小学", "lat": "38.847328", "lon": "115.547599", "value": { "06-17": "3", "06-18": "2", "06-19": "1", "06-20": "3", "06-21": "2", "06-22": "4", "06-23": "3", "06-24": "4", "06-25": "3", "06-26": "2", "06-27": "4" } },
            { "userid": 2, "userName": "陈光亮", "gender": "男", "age": "17", "location": "保定市财信大厦", "lat": "38.873642", "lon": "115.510453", "value": { "06-17": "4", "06-18": "3", "06-19": "2", "06-20": "4", "06-21": "3", "06-22": "2", "06-23": "1", "06-24": "5", "06-25": "3", "06-26": "4", "06-27": "2" } }
        ],
        type2: [ //按周,
            { "userid": 1, "userName": "周清", "gender": "女", "age": "20", "location": "保定市焦庄小学", "lat": "38.847328", "lon": "115.547599", "value": { "06-18": "2", "06-19": "1", "06-20": "3", "06-21": "2", "06-22": "4", "06-23": "3", "06-24": "4" } },
            { "userid": 2, "userName": "陈光亮", "gender": "男", "age": "17", "location": "保定市财信大厦", "lat": "38.873642", "lon": "115.510453", "value": { "06-18": "3", "06-19": "2", "06-20": "4", "06-21": "3", "06-22": "2", "06-23": "1", "06-24": "5" } }
        ],
    },
    'RiskTimePeriodAnalysisRQZA': { //人群风险时段解析
        type0: [ //按周
            { "crowd": "总人群", "gridName": "人口密度", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 0, "value": { "06-18": "3", "06-19": "2", "06-20": "4", "06-21": "3", "06-22": "2", "06-23": "1", "06-24": "5" } }
        ],
        type1: [ //按时
            { "crowd": "总人群", "gridName": "人口密度", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 0, "value": { "08:00-09:00": "4", "09:00-10:00": "3", "10:00-11:00": "2", "11:00-12:00": "4", "12:00-13:00": "3", "13:00-14:00": "2", "14:00-15:00": "1", "15:00-16:00": "5", "16:00-17:00": "3", "17:00-18:00": "4", "18:00-19:00": "2" } }
        ],
        type2: [ //按天
            { "crowd": "总人群", "gridName": "人口密度", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 0, "value": { "06-17": "1", "06-18": "4", "06-19": "2", "06-20": "4", "06-21": "3", "06-22": "2", "06-23": "1", "06-24": "5", "06-25": "3", "06-26": "4", "06-27": "2" } }
        ]
    },
    'RiskTimePeriodAnalysisRQFZA': { //人群风险时段解析
        type0: [ //按周
            { "crowd": "总人群", "gridName": "人口密度", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 0, "value": { "06-18": "4", "06-19": "3", "06-20": "2", "06-21": "3", "06-22": "5", "06-23": "3", "06-24": "2" } }
        ],
        type1: [ //按时
            { "crowd": "总人群", "gridName": "人口密度", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 0, "value": { "08:00-09:00": "1", "09:00-10:00": "5", "10:00-11:00": "2", "11:00-12:00": "2", "12:00-13:00": "3", "13:00-14:00": "4", "14:00-15:00": "2", "15:00-16:00": "1", "16:00-17:00": "2", "17:00-18:00": "4", "18:00-19:00": "3" } }
        ],
        type2: [ //按天
            { "crowd": "总人群", "gridName": "人口密度", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 0, "value": { "06-17": "3", "06-18": "4", "06-19": "2", "06-20": "3", "06-21": "1", "06-22": "2", "06-23": "4", "06-24": "3", "06-25": "5", "06-26": "4", "06-27": "2" } }
        ]
    },
    'RiskLocationAnalysisGT': { //个体风险地点解析
        type0: [ //按周
            { "userid": 1, "userName": "周清", "gender": "女", "age": "20", "location": "保定市财信大厦", "lat": "38.873642", "lon": "115.510453", "value": { "第一中心医院": "4", "河北大学": "3", "东风公园": "2", "华北电力大学": "4", "财政局": "3", "新华村": "2", "太行大厦": "1", "中华路小学": "5", "财信大厦": "3", "焦庄小学": "4", "加油站": "2" } },
            { "userid": 2, "userName": "陈光亮", "gender": "男", "age": "17", "location": "保定市焦庄小学", "lat": "38.847328", "lon": "115.547599", "value": { "第一中心医院": "3", "河北大学": "2", "东风公园": "1", "华北电力大学": "3", "财政局": "2", "新华村": "4", "太行大厦": "3", "中华路小学": "4", "财信大厦": "3", "焦庄小学": "2", "加油站": "4" } }
        ],
        type1: [ //按时
            { "userid": 1, "userName": "周清", "gender": "女", "age": "20", "location": "保定市焦庄小学", "lat": "38.847328", "lon": "115.547599", "value": { "第一中心医院": "3", "河北大学": "2", "东风公园": "1", "华北电力大学": "3", "财政局": "2", "新华村": "4", "太行大厦": "3", "中华路小学": "4", "财信大厦": "3", "焦庄小学": "2", "加油站": "4" } },
            { "userid": 2, "userName": "陈光亮", "gender": "男", "age": "17", "location": "保定市财信大厦", "lat": "38.873642", "lon": "115.510453", "value": { "第一中心医院": "4", "河北大学": "3", "东风公园": "2", "华北电力大学": "4", "财政局": "3", "新华村": "2", "太行大厦": "1", "中华路小学": "5", "财信大厦": "3", "焦庄小学": "4", "加油站": "2" } }
        ],
    },
    'RiskLocationAnalysisRQ': { //人群风险地点解析
        type0: [ //按周
            { "crowd": "总人群", "gridName": "人口密度", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 0, "value": { "第一中心医院": "4", "河北大学": "3", "东风公园": "2", "华北电力大学": "4", "财政局": "3", "新华村": "2", "太行大厦": "1", "中华路小学": "5", "财信大厦": "3", "焦庄小学": "4", "加油站": "2" } }
        ],
        type1: [ //按时
            { "crowd": "总人群", "gridName": "人口密度", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 0, "value": { "第一中心医院": "3", "河北大学": "2", "东风公园": "1", "华北电力大学": "3", "财政局": "2", "新华村": "4", "太行大厦": "3", "中华路小学": "4", "财信大厦": "3", "焦庄小学": "2", "加油站": "4" } }
        ]
    },
    'PollutantAnalysisGT': { //个体风险地点解析
        type0: [ //按周
            { "userid": "1", "userName": "周清", "gender": "女", "age": "20", "location": "保定市财信大厦", "lat": "38.873642", "lon": "115.510453", "value": { "PM2.5": "4", "PM10": "3", "SO2": "2", "NO2": "4", "CO": "3", "O3": "2" } },
            { "userid": "2", "userName": "陈光亮", "gender": "男", "age": "17", "location": "保定市焦庄小学", "lat": "38.847328", "lon": "115.547599", "value": { "PM2.5": "3", "PM10": "2", "SO2": "1", "NO2": "3", "CO": "2", "O3": "4" } }
        ],
        type1: [ //按时
            { "userid": "1", "userName": "周清", "gender": "女", "age": "20", "location": "保定市焦庄小学", "lat": "38.847328", "lon": "115.547599", "value": { "PM2.5": "3", "PM10": "1", "SO2": "2", "NO2": "3", "CO": "2", "O3": "2" } },
            { "userid": "2", "userName": "陈光亮", "gender": "男", "age": "17", "location": "保定市财信大厦", "lat": "38.873642", "lon": "115.510453", "value": { "PM2.5": "2", "PM10": "4", "SO2": "3", "NO2": "1", "CO": "4", "O3": "3" } }
        ],
    },
    'PollutantAnalysisRQ': { //人群风险地点解析
        type0: [ //按周
            { "crowd": "总人群", "gridName": "人口密度", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 0, "value": { "PM2.5": "2", "PM10": "4", "SO2": "3", "NO2": "1", "CO": "4", "O3": "3" } }
        ],
        type1: [ //按时
            { "crowd": "总人群", "gridName": "人口密度", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 0, "value": { "PM2.5": "1", "PM10": "3", "SO2": "2", "NO2": "4", "CO": "3", "O3": "2" } }
        ]
    },
    'PollutionAnalysis': { //污染物解析
        type0: [
            { "location": "保定市财信大厦", "lat": "38.873642", "lon": "115.510453", "value": { "PM2.5": "4", "PM10": "3", "SO2": "2", "NO2": "4", "CO": "3", "O3": "2" } },
            { "location": "保定市焦庄小学", "lat": "38.847328", "lon": "115.547599", "value": { "PM2.5": "3", "PM10": "2", "SO2": "1", "NO2": "3", "CO": "2", "O3": "4" } },
            { "lat": "38.8573484505", "lon": "115.5148163773", "roadName": "东关大街", "value": { "PM2.5": "3", "PM10": "2", "SO2": "1", "NO2": "3", "CO": "2", "O3": "4" } }
        ],
        type1: [
            { "location": "保定市财信大厦", "lat": "38.873642", "lon": "115.510453", "value": { "PM2.5": "4", "PM10": "3", "SO2": "2", "NO2": "4", "CO": "3", "O3": "2" } },
            // { "location": "保定市焦庄小学", "lat": "38.847328", "lon": "115.547599", "value": { "PM2.5": "3", "PM10": "2", "SO2": "1", "NO2": "3", "CO": "2", "O3": "4" } },
            { "location": "东关大街", "lat": "38.8573484505", "lon": "115.5148163773", "value": { "PM2.5": "3", "PM10": "2", "SO2": "1", "NO2": "3", "CO": "2", "O3": "4" } }
        ]
    },
    'PollutionSourcesAnalyStatistic': { //污染物来源解析
        "PM2.5": [
            { "userid": "1", "userName": "周清", "gender": "女", "age": "20", "location": "保定市财信大厦", "lat": "38.873642", "lon": "115.510453", "value": { "生活": "4", "工业": "3", "交通": "2", "建筑": "4", "农业": "3", "其他": "2" } },
            { "userid": "2", "userName": "陈光亮", "gender": "男", "age": "17", "location": "保定市焦庄小学", "lat": "38.847328", "lon": "115.547599", "value": { "生活": "3", "工业": "2", "交通": "1", "建筑": "3", "农业": "2", "其他": "4" } }
        ],
    },
    'ExposureMarkerParsing': [ //暴露标志物解析
        { "检验标志物": "铬(Cr)", "含量": "0.4", "正常含量": "0-0.3", "超标含量": "0.1", "超标原因": "PM2.5和PM10浓度过高" },
        { "检验标志物": "铅(Pb)", "含量": "0.52", "正常含量": "0-0.4", "超标含量": "0.12", "超标原因": "PM2.5和PM10浓度过高" },
        { "检验标志物": "锰(Mn)", "含量": "0.362", "正常含量": "0-0.3", "超标含量": "0.062", "超标原因": "PM2.5和PM10浓度过高" },
        { "检验标志物": "铜(Cu)", "含量": "0.45", "正常含量": "0-0.3", "超标含量": "0.15", "超标原因": "PM2.5和PM10浓度过高" },
        { "检验标志物": "硝基多环芳烃", "含量": "0.69", "正常含量": "0-0.3", "超标含量": "0.39", "超标原因": "NO2浓度过高" },
        { "检验标志物": "其他多环芳烃", "含量": "0.642", "正常含量": "0-0.3", "超标含量": "0.342", "超标原因": "O3和CO浓度过高" }
    ],
    'getControlPolicy': { //获取道路、工厂名称
        "type0": [{ "label": "京昆高速公路" }, { "label": "保阜高速公路" }, { "label": "京港澳高速公路" }, { "label": "保沧高速公路" }, { "label": "廊涿高速公路" }],
        "type1": [{ "label": "牛奶梦工厂" }, { "label": "华北铝加工厂" }, { "label": "涿美毛衣加工厂" }, { "label": "光明饮片加工厂" }, { "label": "工美工艺品厂" }],
        "type2": [{ "label": "小牛学校" }, { "label": "中阳学校" }, { "label": "刘庄学校" }, { "label": "小营学校" }, { "label": "群英学校" }],
        "type3": [{ "label": "保定商场" }, { "label": "综合商场" }, { "label": "玉泉商场" }, { "label": "友谊商场" }, { "label": "阳光商场" }],
    },
    'PollutionControlSimulation0': { //污染管控仿真--道路
        before: 
        { "gridName": "污染浓度", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 0, "data": [{ "roadname": "京昆高速公路", "value": 12 }, { "roadname": "保阜高速公路", "value": 11 }] },
        after: 
        { "gridName": "污染浓度", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 1, "data": [{ "roadname": "京昆高速公路", "value": 8 }, { "roadname": "保阜高速公路", "value": 7 }] }
    },
    'PollutionControlSimulation1': { //污染管控仿真--工厂
        before: 
        { "gridName": "污染浓度", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 3, "data": [{ "roadname": "牛奶梦工厂", "value": 12 }, { "roadname": "华北铝加工厂", "value": 11 }] },
        after: 
        { "gridName": "污染浓度", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 2, "data": [{ "roadname": "牛奶梦工厂", "value": 8 }, { "roadname": "华北铝加工厂", "value": 7 }] }
    },
    "PCSStatistic0": { 
        "污染管控前": [{name:"京昆高速公路",value:12},{name: "保阜高速公路",value: 9 }],
        "污染管控后": [{name:"京昆高速公路",value:8},{name: "保阜高速公路",value: 6 }]
    },
    "PCSStatistic1": { 
        "污染管控前": [{name:"牛奶梦工厂",value:15},{name: "华北铝加工厂",value: 11 }],
        "污染管控后": [{name:"牛奶梦工厂",value:10},{name: "华北铝加工厂",value: 8 }]
    },
    'PopulationMoveSimulation0': { //人口移动仿真--道路
        before: 
        { "gridName": "污染浓度", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 4, "data": [{ "roadname": "京昆高速公路", "value": 12 }, { "roadname": "保阜高速公路", "value": 11 }] },
        after: 
        { "gridName": "污染浓度", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 3, "data": [{ "roadname": "京昆高速公路", "value": 8 }, { "roadname": "保阜高速公路", "value": 7 }] }
    },
    'PopulationMoveSimulation2': { //人口移动仿真--学校
        before: 
        { "gridName": "污染浓度", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 3, "data": [{ "roadname": "小牛学校", "value": 12 }, { "roadname": "中阳学校", "value": 11 }] },
        after: 
        { "gridName": "污染浓度", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 2, "data": [{ "roadname": "小牛学校", "value": 8 }, { "roadname": "中阳学校", "value": 7 }] }
    },
    'PopulationMoveSimulation3': { //人口移动仿真--商场
        before: 
        { "gridName": "污染浓度", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 2, "data": [{ "roadname": "保定商场", "value": 12 }, { "roadname": "综合商场", "value": 11 }] },
        after: 
        { "gridName": "污染浓度", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 1, "data": [{ "roadname": "保定商场", "value": 8 }, { "roadname": "综合商场", "value": 7 }] }
    },
    "PMSStatistic0": { 
        "污染管控前": [{name:"京昆高速公路",value:15},{name: "保阜高速公路",value: 6 }],
        "污染管控后": [{name:"京昆高速公路",value:11},{name: "保阜高速公路",value: 4 }]
    },
    "PMSStatistic2": { 
        "污染管控前": [{name:"小牛学校",value:20},{name: "中阳学校",value: 16 }],
        "污染管控后": [{name:"小牛学校",value:11},{name: "中阳学校",value: 9 }]
    },
    "PMSStatistic3": { 
        "污染管控前": [{name:"保定商场",value:16},{name: "综合商场",value: 8 }],
        "污染管控后": [{name:"保定商场",value:7},{name: "综合商场",value: 4 }]
    }, 
    //污染物来源解析
    'PollutionSourcesAnalysis': [{
        "生活来源": [
            { "from": { "name": "1", "lon": "115.576141", "lat": "38.879552" }, "to": { "name": "周清", "lon": "115.465237", "lat": "38.883762" }, "value": "" },
            { "from": { "name": "2", "lon": "115.463458", "lat": "38.970722" }, "to": { "name": "周清", "lon": "115.465237", "lat": "38.883762" }, "value": "80" },
            { "from": { "name": "6", "lon": "115.427813", "lat": "38.951869" }, "to": { "name": "周清", "lon": "115.465237", "lat": "38.883762" }, "value": "80" },
            { "from": { "name": "9", "lon": "115.37952", "lat": "38.911452" }, "to": { "name": "周清", "lon": "115.465237", "lat": "38.883762" }, "value": "80" },
            { "from": { "name": "13", "lon": "115.436437", "lat": "38.821556" }, "to": { "name": "周清", "lon": "115.465237", "lat": "38.883762" }, "value": "80" },
            { "from": { "name": "16", "lon": "115.5002553", "lat": "38.89652" }, "to": { "name": "周清", "lon": "115.465237", "lat": "38.883762" }, "value": "80" },
            { "from": { "name": "19", "lon": "115.473232", "lat": "38.901569" }, "to": { "name": "周清", "lon": "115.465237", "lat": "38.883762" }, "value": "80" },
            { "from": { "name": "21", "lon": "115.508816", "lat": "38.920885" }, "to": { "name": "周清", "lon": "115.465237", "lat": "38.883762" }, "value": "80" }
        ],
        "工厂排放": [
            { "from": { "name": "3", "lon": "115.576141", "lat": "38.887641" }, "to": { "name": "周清", "lon": "115.465237", "lat": "38.883762" }, "value": "" },
            { "from": { "name": "5", "lon": "115.394625", "lat": "38.889888" }, "to": { "name": "周清", "lon": "115.465237", "lat": "38.883762" }, "value": "80" },
            { "from": { "name": "7", "lon": "115.389869", "lat": "38.918639" }, "to": { "name": "周清", "lon": "115.465237", "lat": "38.883762" }, "value": "80" },
            { "from": { "name": "10", "lon": "115.45196", "lat": "38.8890337" }, "to": { "name": "周清", "lon": "115.465237", "lat": "38.883762" }, "value": "80" },
            { "from": { "name": "12", "lon": "115.389869", "lat": "38.847637" }, "to": { "name": "周清", "lon": "115.465237", "lat": "38.883762" }, "value": "80" },
            { "from": { "name": "15", "lon": "115.445636", "lat": "38.866069" }, "to": { "name": "周清", "lon": "115.465237", "lat": "38.883762" }, "value": "80" },
            { "from": { "name": "17", "lon": "115.55142", "lat": "38.854831" }, "to": { "name": "周清", "lon": "115.465237", "lat": "38.883762" }, "value": "80" },
            { "from": { "name": "20", "lon": "115.466907", "lat": "38.915495" }, "to": { "name": "周清", "lon": "115.465237", "lat": "38.883762" }, "value": "80" }
        ],
        "交通": [
            { "from": { "name": "4", "lon": "115.465758", "lat": "38.793664" }, "to": { "name": "周清", "lon": "115.465237", "lat": "38.883762" }, "value": "" },
            { "from": { "name": "8", "lon": "115.411716", "lat": "38.901569" }, "to": { "name": "周清", "lon": "115.465237", "lat": "38.883762" }, "value": "80" },
            { "from": { "name": "11", "lon": "115.442186", "lat": "38.900671" }, "to": { "name": "周清", "lon": "115.465237", "lat": "38.883762" }, "value": "80" },
            { "from": { "name": "14", "lon": "115.434712", "lat": "38.845839" }, "to": { "name": "周清", "lon": "115.465237", "lat": "38.883762" }, "value": "80" },
            { "from": { "name": "18", "lon": "115.501977", "lat": "38.828303" }, "to": { "name": "周清", "lon": "115.465237", "lat": "38.883762" }, "value": "80" },
            { "from": { "name": "22", "lon": "115.52095", "lat": "38.940644" }, "to": { "name": "周清", "lon": "115.465237", "lat": "38.883762" }, "value": "80" }
        ],
        "农业": [
            { "from": { "name": "23", "lon": "115.485773", "lat": "38.881743" }, "to": { "name": "周清", "lon": "115.465237", "lat": "38.883762" }, "value": "" },
            { "from": { "name": "24", "lon": "115.512973", "lat": "38.88062" }, "to": { "name": "周清", "lon": "115.465237", "lat": "38.883762" }, "value": "80" },
            { "from": { "name": "25", "lon": "115.507511", "lat": "38.846097" }, "to": { "name": "周清", "lon": "115.465237", "lat": "38.883762" }, "value": "80" },
            { "from": { "name": "26", "lon": "115.463817", "lat": "38.854325" }, "to": { "name": "周清", "lon": "115.465237", "lat": "38.883762" }, "value": "80" },
            { "from": { "name": "27", "lon": "115.514697", "lat": "38.854325" }, "to": { "name": "周清", "lon": "115.465237", "lat": "38.883762" }, "value": "80" },
            { "from": { "name": "28", "lon": "115.482789", "lat": "38.932505" }, "to": { "name": "周清", "lon": "115.465237", "lat": "38.883762" }, "value": "80" },
            { "from": { "name": "29", "lon": "115.45893", "lat": "38.944629" }, "to": { "name": "周清", "lon": "115.465237", "lat": "38.883762" }, "value": "80" },
            { "from": { "name": "30", "lon": "115.567015", "lat": "38.932505" }, "to": { "name": "周清", "lon": "115.465237", "lat": "38.870732" }, "value": "80" }
        ]
    }],
    //TravelmodeRiskAnalysis出行方式解析
    'TravelmodeRiskAnalysis': [{
            "travelType": "驾车",
            "minTime": "21分钟",
            "shortestDistance": "7.7公里",
            "minRiskValue": "3",
            "detail": [
                { "name": "路线1", "path": [{ "lat": "38.9210750234", "lon": "115.4614346251", "luduanname": "朝阳北大街", "riskValue": "98" }, { "lat": "38.9131231115", "lon": "115.4616091029", "luduanname": "北二环", "riskValue": "96" }, { "lat": "38.9126727367", "lon": "115.4743181643", "luduanname": "北二环", "riskValue": "91" }, { "lat": "38.9131542642", "lon": "115.4837173571", "luduanname": "北二环", "riskValue": "90" }, { "lat": "38.9126254085", "lon": "115.4958351004", "luduanname": "恒祥北大街", "riskValue": "84" }, { "lat": "38.8897203374", "lon": "115.4894206427", "luduanname": "恒祥北大街", "riskValue": "87" }, { "lat": "38.8743438299", "lon": "115.4891733815", "luduanname": "恒祥北大街", "riskValue": "90" }, { "lat": "38.8679790694", "lon": "115.4879024436", "luduanname": "恒祥北大街", "riskValue": "89" }] },
                { "name": "路线2", "path": [{ "lat": "38.9210750234", "lon": "115.4614346251", "luduanname": "朝阳北大街", "riskValue": "98" }, { "lat": "38.8996798171", "lon": "115.4619062702", "luduanname": "朝阳北大街", "riskValue": "96" }, { "lat": "38.8809094642", "lon": "115.4622570563", "luduanname": "朝阳北大街", "riskValue": "90" }, { "lat": "38.8728225182", "lon": "115.4623331923", "luduanname": "东风中路", "riskValue": "87" }, { "lat": "38.8729840824", "lon": "115.4752852557", "luduanname": "东风中路", "riskValue": "91" }, { "lat": "38.8679790694", "lon": "115.4879024436", "luduanname": "恒祥北大街", "riskValue": "89" }] },
                { "name": "路线3", "path": [{ "lat": "38.9210750234", "lon": "115.4614346251", "luduanname": "朝阳北大街", "riskValue": "98" }, { "lat": "38.8944296627", "lon": "115.4620082422", "luduanname": "复兴中路", "riskValue": "96" }, { "lat": "38.8945484044", "lon": "115.4748334542", "luduanname": "阳光北大街", "riskValue": "93" }, { "lat": "38.8729245896", "lon": "115.4751694562", "luduanname": "东风中路", "riskValue": "87" }, { "lat": "38.8679790694", "lon": "115.4879024436", "luduanname": "恒祥北大街", "riskValue": "89" }] }
            ]
        },
        {
            "travelType": "公交",
            "minTime": "46分钟",
            "shortestDistance": "7.7公里",
            "minRiskValue": "1",
            "detail": [{ "name": "路线1", "path": [{ "lat": "38.9210750234", "lon": "115.4614346251", "luduanname": "朝阳北大街", "riskValue": "98" }, { "lat": "38.9131231115", "lon": "115.4616091029", "luduanname": "北二环", "riskValue": "96" }, { "lat": "38.9126727367", "lon": "115.4743181643", "luduanname": "北二环", "riskValue": "91" }, { "lat": "38.9131542642", "lon": "115.4837173571", "luduanname": "北二环", "riskValue": "90" }, { "lat": "38.9126254085", "lon": "115.4958351004", "luduanname": "恒祥北大街", "riskValue": "84" }, { "lat": "38.8897203374", "lon": "115.4894206427", "luduanname": "恒祥北大街", "riskValue": "87" }, { "lat": "38.8743438299", "lon": "115.4891733815", "luduanname": "恒祥北大街", "riskValue": "90" }, { "lat": "38.8679790694", "lon": "115.4879024436", "luduanname": "恒祥北大街", "riskValue": "89" }] },
                { "name": "路线2", "path": [{ "lat": "38.9210750234", "lon": "115.4614346251", "luduanname": "朝阳北大街", "riskValue": "98" }, { "lat": "38.8996798171", "lon": "115.4619062702", "luduanname": "朝阳北大街", "riskValue": "96" }, { "lat": "38.8809094642", "lon": "115.4622570563", "luduanname": "朝阳北大街", "riskValue": "90" }, { "lat": "38.8728225182", "lon": "115.4623331923", "luduanname": "东风中路", "riskValue": "87" }, { "lat": "38.8729840824", "lon": "115.4752852557", "luduanname": "东风中路", "riskValue": "90" }, { "lat": "38.8679790694", "lon": "115.4879024436", "luduanname": "恒祥北大街", "riskValue": "89" }] },
                { "name": "路线3", "path": [{ "lat": "38.9210750234", "lon": "115.4614346251", "luduanname": "朝阳北大街", "riskValue": "98" }, { "lat": "38.8944296627", "lon": "115.4620082422", "luduanname": "复兴中路", "riskValue": "96" }, { "lat": "38.8945484044", "lon": "115.4748334542", "luduanname": "阳光北大街", "riskValue": "93" }, { "lat": "38.8729245896", "lon": "115.4751694562", "luduanname": "东风中路", "riskValue": "87" }, { "lat": "38.8679790694", "lon": "115.4879024436", "luduanname": "恒祥北大街", "riskValue": "89" }] }
            ]
        },
        {
            "travelType": "骑行",
            "minTime": "43分钟",
            "shortestDistance": "7.6公里",
            "minRiskValue": "4",
            "detail": [{ "name": "路线1", "path": [{ "lat": "38.9210750234", "lon": "115.4614346251", "luduanname": "朝阳北大街", "riskValue": "98" }, { "lat": "38.8996530413", "lon": "115.4619453509", "luduanname": "隆兴中路", "riskValue": "87" }, { "lat": "38.8999874085", "lon": "115.4745884548", "luduanname": "阳光北大街", "riskValue": "83" }, { "lat": "38.8945591899", "lon": "115.4746809406", "luduanname": "复兴中路", "riskValue": "85" }, { "lat": "38.8947697403", "lon": "115.4908001655", "luduanname": "恒祥北大街", "riskValue": "84" }, { "lat": "38.8896244307", "lon": "115.4892601361", "luduanname": "恒祥北大街", "riskValue": "87" }, { "lat": "38.8742587768", "lon": "115.4891655095", "luduanname": "恒祥北大街", "riskValue": "90" }, { "lat": "38.8679790694", "lon": "115.4879024436", "luduanname": "恒祥北大街", "riskValue": "89" }] },
                { "name": "路线2", "path": [{ "lat": "38.9210750234", "lon": "115.4614346251", "luduanname": "朝阳北大街", "riskValue": "98" }, { "lat": "38.8996798171", "lon": "115.4619062702", "luduanname": "朝阳北大街", "riskValue": "96" }, { "lat": "38.8809094642", "lon": "115.4622570563", "luduanname": "朝阳北大街", "riskValue": "90" }, { "lat": "38.8728225182", "lon": "115.4623331923", "luduanname": "东风中路", "riskValue": "87" }, { "lat": "38.8729840824", "lon": "115.4752852557", "luduanname": "东风中路", "riskValue": "87" }, { "lat": "38.8679790694", "lon": "115.4879024436", "luduanname": "恒祥北大街", "riskValue": "89" }] },
                { "name": "路线3", "path": [{ "lat": "38.9210750234", "lon": "115.4614346251", "luduanname": "朝阳北大街", "riskValue": "98" }, { "lat": "38.8944296627", "lon": "115.4620082422", "luduanname": "复兴中路", "riskValue": "96" }, { "lat": "38.8945484044", "lon": "115.4748334542", "luduanname": "阳光北大街", "riskValue": "93" }, { "lat": "38.8729245896", "lon": "115.4751694562", "luduanname": "东风中路", "riskValue": "87" }, { "lat": "38.8679790694", "lon": "115.4879024436", "luduanname": "恒祥北大街", "riskValue": "89" }] }
            ]
        },
        {
            "travelType": "步行",
            "minTime": "105分钟",
            "shortestDistance": "7.6公里",
            "minRiskValue": "2",
            "detail": [{ "name": "路线1", "path": [{ "lat": "38.9210750234", "lon": "115.4614346251", "luduanname": "朝阳北大街", "riskValue": "98" }, { "lat": "38.8996530413", "lon": "115.4619453509", "luduanname": "隆兴中路", "riskValue": "87" }, { "lat": "38.8999874085", "lon": "115.4745884548", "luduanname": "阳光北大街", "riskValue": "83" }, { "lat": "38.8945591899", "lon": "115.4746809406", "luduanname": "复兴中路", "riskValue": "85" }, { "lat": "38.8947697403", "lon": "115.4908001655", "luduanname": "恒祥北大街", "riskValue": "84" }, { "lat": "38.8896244307", "lon": "115.4892601361", "luduanname": "恒祥北大街", "riskValue": "87" }, { "lat": "38.8742587768", "lon": "115.4891655095", "luduanname": "恒祥北大街", "riskValue": "90" }, { "lat": "38.8679790694", "lon": "115.4879024436", "luduanname": "恒祥北大街", "riskValue": "89" }] },
                { "name": "路线2", "path": [{ "lat": "38.9210750234", "lon": "115.4614346251", "luduanname": "朝阳北大街", "riskValue": "98" }, { "lat": "38.8996798171", "lon": "115.4619062702", "luduanname": "朝阳北大街", "riskValue": "96" }, { "lat": "38.8809094642", "lon": "115.4622570563", "luduanname": "朝阳北大街", "riskValue": "90" }, { "lat": "38.8728225182", "lon": "115.4623331923", "luduanname": "东风中路", "riskValue": "87" }, { "lat": "38.8729840824", "lon": "115.4752852557", "luduanname": "东风中路", "riskValue": "87" }, { "lat": "38.8679790694", "lon": "115.4879024436", "luduanname": "恒祥北大街", "riskValue": "89" }] },
                { "name": "路线3", "path": [{ "lat": "38.9210750234", "lon": "115.4614346251", "luduanname": "朝阳北大街", "riskValue": "98" }, { "lat": "38.8944296627", "lon": "115.4620082422", "luduanname": "复兴中路", "riskValue": "96" }, { "lat": "38.8945484044", "lon": "115.4748334542", "luduanname": "阳光北大街", "riskValue": "93" }, { "lat": "38.8729245896", "lon": "115.4751694562", "luduanname": "东风中路", "riskValue": "87" }, { "lat": "38.8679790694", "lon": "115.4879024436", "luduanname": "恒祥北大街", "riskValue": "89" }] }
            ]
        }
    ],
    'VisualExposureScene3D': [ //暴露三维可视化
        { "userid": "1", "userName": "周清", "gender": "女", "age": "20", "location": "保定市财信大厦", "lat": "38.853642", "lon": "115.513453", "shijian": "2018-06-10 20:30:00", "value": { "AQI": "42", "PM2.5": "80", "PM10": "139", "CO": "1.25", "NO2": "65", "O3": "27", "SO2": "18" } },
        { "userid": "2", "userName": "陈光亮", "gender": "男", "age": "17", "location": "保定市焦庄小学", "lat": "38.857328", "lon": "115.517599", "shijian": "2018-06-10 20:30:00", "value": { "AQI": "103", "PM2.5": "83", "PM10": "138", "CO": "1.24", "NO2": "64", "O3": "28", "SO2": "20" } },
        { "userid": "3", "userName": "王珊", "gender": "女", "age": "28", "location": "保定市华侨大厦", "lat": "38.848662", "lon": "115.491361", "shijian": "2018-06-10 20:30:00", "value": { "AQI": "165", "PM2.5": "78", "PM10": "130", "CO": "1.21", "NO2": "59", "O3": "25", "SO2": "25" } }
    ],
    'getVisualExposureScene3D': [ //暴露三维可视化查询
        { "userid": "1", "userName": "周清", "gender": "女", "age": "20", "location": "保定市财信大厦", "lat": "38.853642", "lon": "115.513453", "shijian": "2018-06-10 20:30:00", "value": { "AQI": "42", "PM2.5": "80", "PM10": "139", "CO": "1.25", "NO2": "65", "O3": "27", "SO2": "18" } },
        { "userid": "2", "userName": "陈光亮", "gender": "男", "age": "17", "location": "保定市焦庄小学", "lat": "38.857328", "lon": "115.517599", "shijian": "2018-06-10 20:30:00", "value": { "AQI": "103", "PM2.5": "83", "PM10": "138", "CO": "1.24", "NO2": "64", "O3": "28", "SO2": "20" } },
        // { "userid": "3", "userName": "王珊", "gender": "女", "age": "28", "location": "保定市华侨大厦", "lat": "38.848662", "lon": "115.491361", "shijian": "2018-06-10 20:30:00", "value": { "AQI": "165", "PM2.5": "78", "PM10": "130", "CO": "1.21", "NO2": "59", "O3": "25", "SO2": "25" } }
    ],
    'TargetScenarioSimulation': [
        { "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/subsystemVI/MapServer"}
        //{ "url": "http://119.29.220.118:6080/arcgis/rest/services/subsystem/subsystemVI/MapServer"}
    ],
    'TargetScenarioSimulation00': [ //PM2.5_2025
        { qingjing:"高 35ug/m3",JKXY:114623,KZCB:124564,CBXY:0.920 },
        { qingjing:"中 37ug/m3",JKXY:117476,KZCB:106254,CBXY:1.106 },
        { qingjing:"低 53ug/m3",JKXY:85224,KZCB:73465,CBXY:1.160 },
    ],
    'TargetScenarioSimulation01': [ //PM2.5_2030
        { qingjing:"高 15ug/m3",JKXY:166579,KZCB:177832,CBXY:0.937 },
        { qingjing:"中 22ug/m3",JKXY:155480,KZCB:145782,CBXY:1.067 },
        { qingjing:"低 38ug/m3",JKXY:135779,KZCB:107846,CBXY:1.259 },
    ],
    'TargetScenarioSimulation10': [ //O3_2025
        { qingjing:"高 130ug/m3",JKXY:97276,KZCB:104652,CBXY:0.930 },
        { qingjing:"中 160ug/m3",JKXY:86535,KZCB:93654,CBXY:0.924 },
        { qingjing:"低 192ug/m3",JKXY:76488,KZCB:77893,CBXY:0.982 },
    ],
    'TargetScenarioSimulation11': [ //O3_2030
        { qingjing:"高 100ug/m3",JKXY:139479,KZCB:146802,CBXY:0.950 },
        { qingjing:"中 162ug/m3",JKXY:126570,KZCB:116789,CBXY:1.084 },
        { qingjing:"低 202ug/m3",JKXY:94676,KZCB:84576,CBXY:1.119 },
    ],
    'qingjing00': [ //PM2.5_2025
        { label:"高 35ug/m3",value:0},
        { label:"中 37ug/m3",value:1},
        { label:"低 53ug/m3",value:2},
    ],
    'qingjing01': [ //PM2.5_2030
        { label:"高 15ug/m3",value:3},
        { label:"中 22ug/m3",value:4},
        { label:"低 38ug/m3",value:5},
    ],
    'qingjing10': [ //O3_2025
        { label:"高 130ug/m3",value:6},
        { label:"中 160ug/m3",value:7},
        { label:"低 192ug/m3",value:8},
    ],
    'qingjing11': [ //O3_2030
        { label:"高 100ug/m3",value:9},
        { label:"中 162ug/m3",value:10},
        { label:"低 202ug/m3",value:11},
    ],
    'PollutionPredictSimulation0': {
        before: 
        { "gridName": "污染浓度", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 4,},
        after: 
        { "gridName": "污染浓度", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 3, }
    },
    'PollutionPredictSimulation1': { 
        before: 
        { "gridName": "污染浓度", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 4,},
        after: 
        { "gridName": "污染浓度", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 3, }
    },
    'PollutionPredictSimulation2': { 
        before: 
        { "gridName": "污染浓度", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 3, },
        after: 
        { "gridName": "污染浓度", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 2,}
    },
    'PollutionPredictSimulation3': {
        before: 
        { "gridName": "污染浓度", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 2,},
        after: 
        { "gridName": "污染浓度", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 1,}
    },
    'PollutionPredictSimulation4': { 
        before: 
        { "gridName": "污染浓度", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 1,},
        after: 
        { "gridName": "污染浓度", "url": "http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer", "id": 0,}
    },
    'TravelRiskAnalysis': {// 所有出行路线规划
        'url':"http://119.29.220.118:6080/arcgis/rest/services/subsystem/route/MapServer",'id':0
    },
    'TravelRiskRoute4': {// 所有出行路线规划 --- 具体路线
        'url':"http://119.29.220.118:6080/arcgis/rest/services/subsystem/route4/MapServer",
    },
    'TravelRiskRoute': {// 所有出行路线规划 --- 具体路线
        'url':"http://119.29.220.118:6080/arcgis/rest/services/subsystem/route3/MapServer",
    },
    'TravelRiskAnalysis0':[ // 致癌风险
        {id:1, type: "步行", yongshi: "90分钟", juli: "6.2公里", avgRisk: "0.000032", },
        {id:2, type: "骑行", yongshi: "28分钟", juli: "6.3公里", avgRisk: "0.000017", },
        {id:3, type: "公交", yongshi: "51分钟", juli: "6.9公里", avgRisk: "0.000023", },
        {id:4, type: "驾车", yongshi: "20分钟", juli: "6.3公里", avgRisk: "0.000014", },
    ],
    'TravelRiskAnalysis1':[ // 非致癌风险
        {id:1, type: "步行", yongshi: "90分钟", juli: "6.2公里", avgRisk: "0.94", },
        {id:2, type: "骑行", yongshi: "28分钟", juli: "6.3公里", avgRisk: "0.52", },
        {id:3, type: "公交", yongshi: "51分钟", juli: "6.9公里", avgRisk: "0.87", },
        {id:4, type: "驾车", yongshi: "20分钟", juli: "6.3公里", avgRisk: "0.57", },
    ],
    'TravelRiskAnalysis01':[ // 步行
        {id:16, type: "1推荐", yongshi: "90分钟", juli: "6.2公里", zhiaiRisk: "0.000032", feizhiaiRisk: "0.94",},
        {id:17, type: "2方案", yongshi: "28分钟", juli: "6.3公里", zhiaiRisk: "0.000036", feizhiaiRisk: "0.97",},
        {id:18, type: "3方案", yongshi: "51分钟", juli: "6.9公里", zhiaiRisk: "0.000035", feizhiaiRisk: "0.96",}, 
    ],
    'TravelRiskAnalysis02':[ // 骑行
        {id:22, type: "1推荐", yongshi: "28分钟", juli: "6.3公里", zhiaiRisk: "0.000014", feizhiaiRisk: "0.52",},
        {id:23, type: "2方案", yongshi: "29分钟", juli: "6.5公里", zhiaiRisk: "0.000017", feizhiaiRisk: "0.78",},
        {id:24, type: "3方案", yongshi: "31分钟", juli: "6.9公里", zhiaiRisk: "0.000018", feizhiaiRisk: "0.59",}, 
    ],
    'TravelRiskAnalysis03':[ // 公交
        {id:13, type: "1推荐", yongshi: "51分钟", juli: "6.9公里", zhiaiRisk: "0.000026", feizhiaiRisk: "0.87",},
        {id:14, type: "2方案", yongshi: "55分钟", juli: "7.4公里", zhiaiRisk: "0.000022", feizhiaiRisk: "0.84",},
        {id:15, type: "3方案", yongshi: "57分钟", juli: "7.8公里", zhiaiRisk: "0.000020", feizhiaiRisk: "0.81",}, 
    ],
    'TravelRiskAnalysis04':[ // 驾车
        {id:19, type: "1推荐", yongshi: "20分钟", juli: "6.3公里", zhiaiRisk: "0.000017", feizhiaiRisk: "0.57",},
        {id:20, type: "2方案", yongshi: "24分钟", juli: "8.2公里", zhiaiRisk: "0.000023", feizhiaiRisk: "0.82",},
        {id:21, type: "3方案", yongshi: "26分钟", juli: "8.8公里", zhiaiRisk: "0.000028", feizhiaiRisk: "0.90",}, 
    ],
    'PopulationRiskStatistics':{ // 驾车
        url:'http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer'
    },
    'NewExposureDynamicAnalysis':{ // 驾车
        url:'http://211.159.186.65:6080/arcgis/rest/services/subsystem/人口密度/MapServer'
    },
}