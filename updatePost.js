const fs = require('fs')
const path = require('path')
const exec = require('child_process').exec
const execSync = require('child_process').execSync
const sourcePath = path.format({ dir: 'C:\\articles\\blog' })
const destPath = path.join(__dirname, './docs/articles')

function copyFile(srcPath, tarPath, cb) {
    const rs = fs.createReadStream(srcPath)
    rs.on('error', function(err) {
        if (err) {
            console.log('read error', srcPath)
        }
        cb && cb(err)
    })
    const ws = fs.createWriteStream(tarPath)
    ws.on('error', function(err) {
        if (err) {
            console.log('write error', tarPath)
        }
        cb && cb(err)
    })
    ws.on('close', function(ex) {
        cb && cb(ex)
    })
    rs.pipe(ws)
}

function delFolder(path) {
    let files = []
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path)
        files.forEach((file, index) => {
            let curPath = path + '/' + file
            if (fs.statSync(curPath).isDirectory()) {
                // recurse
                delFolder(curPath)
            } else {
                // delete file
                fs.unlinkSync(curPath)
            }
        })
        fs.rmdirSync(path)
    }
}

function copyFolder(srcDir, tarDir, cb) {
    fs.readdir(srcDir, function(err, files) {
        let count = 0
        const checkEnd = function() {
            ++count == files.length && cb && cb()
        }

        if (err) {
            checkEnd()
            return
        }
        files.forEach(function(file) {
            const srcPath = path.join(srcDir, file)
            const tarPath = path.join(tarDir, file)

            fs.stat(srcPath, function(err, stats) {
                if (stats.isDirectory()) {
                    console.log('mkdir', tarPath)
                    fs.mkdir(tarPath, function(err) {
                        copyFolder(srcPath, tarPath, checkEnd)
                    })
                } else {
                    copyFile(srcPath, tarPath, checkEnd)
                }
            })
        })

        //为空时直接回调
        files.length === 0 && cb && cb()
    })
}

function genTags() {
    // 生成 tags
    exec('node ./genTagslist.js', (error, stdout, stderr) => {
        if (stdout.length > 0) {
            console.log('----------------------------------------')
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
}

delFolder(destPath)
if (!fs.existsSync(destPath)) {
    fs.mkdir(destPath, function(err) {
        if (err) {
            console.log(err)
            return
        }
        copyFolder(sourcePath, destPath, genTags)
    })
}
