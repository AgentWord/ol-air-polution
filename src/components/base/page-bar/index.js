import pagebar from './page-bar.vue'
// 这里是重点
const PageBar = {
    install: function(Vue){
        Vue.component('PageBar',pagebar)
    }
}

// 导出组件
export default PageBar