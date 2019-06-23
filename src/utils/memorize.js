// 简单的函数记忆化
const memorize = fn => {
    const map = new Map()
    return async arg => {
        if (!arg) arg = 'void'
        if (map.has(arg)) return map.get(arg)
        const result = await fn(arg)
        map.set(arg, result)
        return result
    }
}

export default memorize
