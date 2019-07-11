const { delFolder, copyFolder } = require('./utils.js')
const { execSync } = require('child_process')
const path = require('path')

// 源目录
const sourcePath = path.format({ dir: 'C:\\code\\docs\\blog' })
// 目标目录
const destPath = path.join(__dirname, './docs/articles')

const argv = process.argv.slice(2)
// 第一个参数是命令， 后面跟命令的参数
// 只实现 commandName arg1 arg2 arg3 ... 的形式
const [commandName, ...args] = argv

// save to repository
const cSaveToRepo = () => {
    console.log('----------------------------------------')
    console.log('正在保存文章至远端仓库...')
    try {
        const add = 'git add .',
            commit = 'git commit -m "update posts..."',
            push = 'git push'

        console.log(add)
        execSync(add)
        console.log(commit)
        execSync(commit)
        console.log(push)
        execSync(push)
    } catch (e) {
        console.log('推送失败!', e)
    }
}

const cPublish = () => {
    const genTags = () => {
        // 生成 tags
        exec('node ./genTagslist.js', (error, stdout, stderr) => {
            if (stdout.length > 0) {
                console.log('----------------------------------------')
                console.log('正在推送文章...')
                try {
                    const add = 'git add .',
                        commit = 'git commit -m "update posts..."',
                        push = 'git push'
                    console.log(add)
                    execSync(add)
                    console.log(commit)
                    execSync(commit)
                    console.log(push)
                    execSync(push)
                } catch (e) {
                    console.log('推送失败!')
                }
            }
            if (error) {
                console.info('stderr : ' + stderr)
            }
        })
    }
    // 1.先干掉文件夹
    delFolder(destPath)
    if (!fs.existsSync(destPath)) {
        fs.mkdir(destPath, function(err) {
            if (err) {
                console.log(err)
                return
            }
            // 2. 然后重新拷贝，并生成 tags 调用 git push 操作
            copyFolder(sourcePath, destPath, genTags)
        })
    }
}

const commandList = {
    s: cSaveToRepo,
    p: cPublish,
    sp: () => (cSaveToRepo(), cPublish())
}

// 执行命令
if (!!commandName) {
    const command = commandList[commandName]
    command && command(args)
}
