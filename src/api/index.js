import axios from 'axios'
import cache from '@/utils/cache.js'
import marked from '@/utils/mdRender.js'
import memorize from '@/utils/memorize.js'

const tagsUrl = 'https://raw.githubusercontent.com/lzcers/KsanaBlog-React/master/docs/articles/tags.json'
const localTagsUrl = '/articles/tags.json'
const fileUrl = 'https://raw.githubusercontent.com/lzcers/KsanaBlog-React/master/docs/articles/'
const localfileUrl = '/articles/'

axios.defaults.timeout = 3500

function getTagsData(url) {
    if (cache.has('postList')) return Promise.resolve(cache.get('postList'))
    return axios
        .get(url)
        .then(res => res.data)
        .then(arr => {
            cache.set('postList', arr)
            return arr
        })
        .catch(e => false)
}

const getTags = memorize(() => {
    return getMetadata().then(res => [
        ...new Set(res.map(p => p.Tags.split('|').map(e => e.trim())).reduce((pre, cur) => pre.concat(cur)))
    ])
})

const getPosts = memorize(async () => {
    return getMetadata().then(res =>
        res.map(p => {
            p.ID = p.fileName
            p.Tags = p.Tags.split('|').map(t => t.trim())
            p.Content = marked(p.Content).html
            return p
        })
    )
})

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

async function getMetadata() {
    return (await getTagsData(tagsUrl)) || (await getTagsData(localTagsUrl))
}
async function getPostByID(fileName) {
    return (await getFile(fileName, fileUrl)) || (await getFile(fileName, localfileUrl))
}
export { getPosts, getTags, getPostByID }
