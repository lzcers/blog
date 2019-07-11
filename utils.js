const fs = require('fs')
const path = require('path')

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

module.exports = { copyFile, delFolder, copyFolder }
