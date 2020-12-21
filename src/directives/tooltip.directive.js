export default { //any directive must have at least one method, that will be called during tooltip initialization, here it'll be 'bind'
    bind(el, {value}) {
        M.Tooltip.init(el, {html: value})
    },
    unbind(el) {
        var tooltip = M.Tooltip.getInstance(el)

        if (tooltip && tooltip.destroy) {
            tooltip.destroy()
        }
    }
}
