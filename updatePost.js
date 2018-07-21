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
                        console.log(`copy ${file} faild...`)
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
            console.log(stdout)
            execSync('git add .')
            execSync('git commit -m "update posts..."')
            execSync('git push')
        }
        if (error) {
            console.info('stderr : ' + stderr)
        }
    })
})
