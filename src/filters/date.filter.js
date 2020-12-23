import store from '../store'

export default function dateFilter(value, format = 'date') {
    const options = {}
    const locale = store.getters.info.locale || 'ru-RU'

    if (format.includes('date')) {
        options.day = '2-digit'
        options.month = 'long'
        options.year = 'numeric'
    }

    if (format.includes('time')) {
        options.hour = '2-digit'
        options.minute = '2-digit'
        options.second = '2-digit'
    }

    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
    return new Intl.DateTimeFormat(locale, options).format(value)
}