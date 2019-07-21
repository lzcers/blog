import axios from 'axios'
import cache from '@/utils/cache.js'
import marked from '@/utils/mdRender.js'
import memorize from '@/utils/memorize.js'

const localTagsUrl = 'https://ksana.oss-cn-shenzhen.aliyuncs.com/articles/'
const localfileUrl = 'https://raw.githubusercontent.com/lzcers/KsanaBlog-React/master/docs/articles/'

const getTagsData = memorize(url => axios.get(url).then(res => res.data))

const getTags = memorize(() =>
    getMetadata().then(res => [
        ...new Set(res.map(p => p.Tags.split('|').map(e => e.trim())).reduce((pre, cur) => pre.concat(cur)))
    ])
)

const getPosts = memorize(() =>
    getMetadata().then(res =>
        res.map(p => ({
            ...p,
            ID: p.fileName,
            Tags: p.Tags.split('|').map(t => t.trim()),
            Content: marked(p.Content).html
        }))
    )
)

function getFile(fileName, fileUrl) {
    if (cache.has(fileName)) return Promise.resolve(cache.get(fileName))
    return axios
        .get(fileUrl + fileName)
        .then(res => res.data)
        .then(raw => marked(raw))
        .then(p => {
            const post = {
                ID: fileName,
                Title: p.meta.Title,
                Tags: p.meta.Tags.split('|').map(i => i.trim()),
                PublishDate: p.meta.PublishDate,
                Content: p.html,
                TOC: p.tocTree
            }
            cache.set(fileName, post)
            return post
        })
        .catch(e => false)
}

const getMetadata = memorize(() => getTagsData(localTagsUrl))

const getPostByID = memorize(fileName => getFile(fileName, localfileUrl))

export { getPosts, getTags, getPostByID }
