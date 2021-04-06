import table from './base-table.vue'
// 这里是重点
const BaseTable = {
    install: function(Vue){
        Vue.component('BaseTable',table)
    }
}

// 导出组件
export default BaseTable