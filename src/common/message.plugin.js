export default {
    install(Vue, options) {
        Vue.prototype.$message = function(html) { // with $ is @system@ property, like a private
            M.toast({html})
        }    

        Vue.prototype.$error = function(html) {
            M.toast({html: `[Ошибка]: ${html}`})
        }
    }
}
