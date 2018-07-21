const fs = require('fs')
const path = require('path')
const exec = require('child_process').exec
const execSync = require('child_process').execSync
const sourcePath = path.format({ dir: 'C:\\articles\\blog' })
const destPath = path.join(__dirname, 'articles')

// 复制文件
Promise.all(
    fs.readdirSync(sourcePath).map(
        file =>
            new Promise((resolve, reject) =>
                fs.copyFile(sourcePath + file, path.join(destPath, file), err => {
                    if (err) {
                        console.log(`拷贝 ${file} 失败...`)
                        reject()
                    }
                    resolve(file)
                })
            )
    )
).then(res => {
    // 生成 tags
    exec('node ./genTagslist.js', (error, stdout, stderr) => {
        if (stdout.length > 0) {
            console.log('------------')
            console.log(stdout)
            console.log('开始推送文章至 Github ...')
            console.log('git add .')
            try {
                execSync('git add .')
                console.log('git commit -m "update posts..."')
                execSync('git commit -m "update posts..."')
                console.log('git push')
                execSync('git push')
            } catch (e) {
                console.log('推送失败!')
            }
        }
        if (error) {
            console.info('stderr : ' + stderr)
        }
    })
})
