const { execSync } = require('child_process')

const argv = process.argv.slice(2)
// 第一个参数是命令， 后面跟命令的参数
// 只实现 commandName arg1 arg2 arg3 ... 的形式
const [commandName, ...args] = argv

// save to repository
const cStr = () => {
    console.log('----------------------------------------')
    console.log('正在保存文章至远端仓库...')
    console.log('git add .')
    try {
        execSync('git add .')
        console.log('git commit -m "update posts..."')
        execSync('git commit -m "update posts..."')
        console.log('git push')
        execSync('git push')
    } catch (e) {
        console.log('推送失败!', e)
    }
}

const commandList = {
    str: cStr
}

// 执行命令
if (!!commandName) {
    const command = commandList[commandName]
    command && command(args)
}
