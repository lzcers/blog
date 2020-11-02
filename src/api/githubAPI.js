import axios from 'axios'
import cache from '@/utils/cache.js'
import marked from '@/utils/mdRender.js'

const config = {
    repo: 'lzcers/KsanaBlog-React',
    path: 'docs/articles/',
    tags: 'docs/articles/',
    branch: 'master',
    tk: 'WlRJM1lqTm1Zak0yTVRFd01qUXdOV05tTW1NMk1qQmtNekF5WW1ZMVlUVXlORGs1Wm1FMk9BPT0=',
}

// const issueUrl = `https://api.github.com/repos/${config.repo}/issues`
const filesListUrl = `https://api.github.com/repos/${config.repo}/contents/${config.path}?ref=${config.branch}`
const tagsListUrl = `https://api.github.com/repos/${config.repo}/contents/${config.tags}?ref=${config.branch}`
const postUrl = `https://api.github.com/repos/${config.repo}/git/blobs/`
const tk = 'WlRJM1lqTm1Zak0yTVRFd01qUXdOV05tTW1NMk1qQmtNekF5WW1ZMVlUVXlORGs1Wm1FMk9BPT0'

function getPostListFromFiles(url = filesListUrl) {
    if (cache.has('postList')) return Promise.resolve(cache.get('postList'))

    return axios
        .get(url, {
            params: {
                access_token: atob(atob(tk)),
            },
        })
        .then((res) => res.data)
        .then((arr) => {
            const list = arr.map(({ name, sha, size }) => ({ name, sha, size })).filter((i) => i.size !== 0)
            cache.set('postList', list)
            return list
        })
}
function getFileBySHA(sha) {
    if (cache.has(sha)) return Promise.resolve(cache.get(sha))

    const httpParam = {
        // https://developer.github.com/v3/media/#raw-1
        headers: { Accept: 'application/vnd.github.v3.raw' },
        params: {
            access_token: atob(atob(tk)),
        },
    }
    return axios
        .get(postUrl + sha, httpParam)
        .then((res) => res.data)
        .then((raw) => {
            cache.set(sha, raw)
            return raw
        })
}
function getPostByID(sha) {
    return getFileBySHA(sha)
        .then((raw) => marked(raw))
        .then((p) => ({
            ID: sha,
            Title: p.meta.Title,
            Tags: p.meta.Tags.split('|').map((i) => i.trim()),
            PublishDate: p.meta.PublishDate,
            Content: p.html,
            TOC: p.tocTree,
        }))
}

// 从git ISSUES获取文章列表
// function getPostListFromIssues() {
//   if (cache.has('postList')) return new Promise(resolve => resolve(cache.get('postList')))

//   // 根据labels过滤
//   // todo: access_token: config.access_token, github会做代码扫描,token会被干掉,暂时不加这个参数
//   return axios
//     .get(issueUrl, { params: { state: 'open', labels: 'post', filter: 'created' } })
//     .then(res => res.data)
//     .then(arr =>
//       arr.map(i => ({
//         id: i.id,
//         title: i.title,
//         date: i.created_at,
//         body: i.body
//       }))
//     )
//     .then(postList => {
//       // 保存至sessionStorage
//       cache.set('postList', postList)
//       return postList
//     })
// }

async function getPosts() {
    const list = await getPostListFromFiles()
    const posts = list.filter((i) => !i.name.match('.json'))
    const tags = list.find((i) => i.name === 'tags.json')
    if (tags)
        return getFileBySHA(tags.sha).then((res) =>
            res.map((p) => {
                for (const i of posts)
                    if (p.fileName === i.name) {
                        p.ID = i.sha
                        p.Tags = p.Tags.split('|').map((t) => t.trim())
                        p.Content = marked(p.Content).html
                        break
                    }
                return p
            })
        )
    return []
}

function getTags() {
    return getPostListFromFiles(tagsListUrl)
        .then((files) => files.find((i) => i.name === 'tags.json'))
        .then((tags) => (tags === undefined ? Promise.resolve([]) : getFileBySHA(tags.sha)))
        .then((res) => [
            ...new Set(res.map((p) => p.Tags.split('|').map((e) => e.trim())).reduce((pre, cur) => pre.concat(cur))),
        ])
}

export { getPosts, getTags, getPostByID }
