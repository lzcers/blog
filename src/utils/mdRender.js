import marked from 'marked'
import highlight from 'highlight.js'
import fm from 'front-matter'

// 解析 Tokens 生成 TOC Tree
function parseTokensGenTOC(tokens) {
    const tocNodes = tokens.filter(t => t.type === 'heading').map(e => ({
        nodeID: e.text
            .replace(/<(?:.|\n)*?>/gm, '')
            .toLowerCase()
            .replace(/[\s\n\t]+/g, '-'),
        nodeLevel: e.depth,
        childrenNode: []
    }))
    const rootNode = { nodeID: 'root', nodeLevel: 0, childrenNode: [] }
    function createTOCTree(root, node) {
        let nextNode
        root.childrenNode.forEach(i => {
            if (node.nodeLevel > i.nodeLevel) nextNode = i
        })

        nextNode === undefined ? root.childrenNode.push(node) : createTOCTree(nextNode, node)
    }
    tocNodes.forEach(n => createTOCTree(rootNode, n))
    return rootNode
}

const renderer = new marked.Renderer()

renderer.heading = (text, level) => {
    const slug = text
        .replace(/<(?:.|\n)*?>/gm, '')
        .toLowerCase()
        .replace(/[\s\n\t]+/g, '-')
    return `<h${level} id="${slug}">${text}</h${level}>`
}

renderer.code = (code, lang) => {
    const highlightResult = highlight.highlightAuto(code).value
    return `<pre><code class="lang-${lang}">${highlightResult}</code></pre>`
}
marked.setOptions({
    renderer,
    breaks: true,
    gfm: true
})

// 添加元数据支持

function metaMarked(src) {
    const { attributes, body } = fm(src)
    const markdown = body
    const meta = attributes
    const tokens = marked.lexer(markdown)
    const tocTree = parseTokensGenTOC(tokens)
    const html = marked.parser(tokens)
    return { meta, html, markdown, tocTree }
}

export default metaMarked
