export default {
    get: key => {
        if (!window.sessionStorage) return false
        return JSON.parse(window.sessionStorage.getItem(key) || '')
    },
    set: (key, data) => {
        if (!window.sessionStorage) return false
        window.sessionStorage.setItem(key, JSON.stringify(data))
        return true
    },
    has: key => window.sessionStorage && window.sessionStorage.hasOwnProperty(key)
}
