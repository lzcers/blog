const fs = require('fs')
const path = require('path')
const fm = require('front-matter')

const postsDir = path.format({
  dir: path.resolve(),
  base: 'articles'
})

// 拿到所有的文章
const arrPosts = fs
  .readdirSync(postsDir)
  .filter(i => !i.match(/.json/))
  .reverse()

Promise.all(
  arrPosts.map(
    (i, index) =>
      new Promise((resolve, reject) => {
        fs.readFile(path.format({ dir: postsDir, base: i }), 'utf8', (err, data) => {
          if (err) reject(err)
          const { attributes, body } = fm(data)
          resolve({
            fileName: i,
            ID: index,
            ...attributes,
            Content: body.split(/(。)/g, 10).join('') + '<strong>……</strong>'
          })
        })
      })
  )
).then(tagsList => {
  fs.writeFile(
    path.format({ dir: path.resolve(), base: 'articles/tags.json' }),
    JSON.stringify(tagsList, null, '  '),
    'utf8',
    err => {
      if (err) throw err
      console.log('tagsList created success...')
    }
  )
})
