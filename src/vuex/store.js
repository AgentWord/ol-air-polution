import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const store = new Vuex.Store({
    // 定义状态
    state: {
        userwhoami: '',
        usernames: '未登录',
        selectText: '',
        collapsedwidth: 0,
        isccollapsed: false,
        // userModalVisible: false,
        selectionUser: [],
        statisticModalVisible: false,
        RealTimestatisticModalVisible: false,
        inputUserValue: '',
    },
    //修改状态
    mutations: {
        //左侧导航栏
        // setcollapsedwidth(state, isCollapsed) {
        //     state.isccollapsed = isCollapsed;
        // },
        //用户信息表
        // setuserModal(state, userModalChange) {
        //     state.userModalVisible = userModalChange;
        // },
        //用户信息表选中
        // setusernameInput(state, usernameInput) {
        //     state.selectionUser = usernameInput;
        // },
        // //输入框用户名
        // setInputUserValue(state, inputUserValue) {
        //     state.inputUserValue = inputUserValue;
        // },
        // //统计弹窗
        // setstatisticValue(state, statisticValueChange) {
        //     state.statisticModalVisible = statisticValueChange;
        // },
        // //实时暴露测量统计弹窗
        // setstatisticValue(state, statisticValueChange) {
        //     state.RealTimestatisticModalVisible = statisticValueChange;
        // },

    }
})

export default store