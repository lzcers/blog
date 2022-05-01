import { marked } from 'marked';
import highlight from 'highlight.js';
import fm from 'front-matter';

type Token = {
    type: string;
    text: string;
    raw: string;
    tokens?: Token[];
    depth?: number;
};

// 解析 Tokens 生成 TOC Tree
function parseTokensGenTOC(tokens: Token[]) {
    const tocNodes = tokens.filter(t => t.type === 'heading').map(e => ({
        nodeID: e.text
            .replace(/<(?:.|\n)*?>/gm, '')
            .toLowerCase()
            .replace(/[\s\n\t]+/g, '-'),
        nodeLevel: e.depth,
        childrenNode: []
    }))
    const rootNode = { nodeID: 'root', nodeLevel: 0, childrenNode: [] }
    function createTOCTree(root: any, node: any) {
        let nextNode
        root.childrenNode.forEach((i: any) => {
            if (node.nodeLevel > i.nodeLevel) nextNode = i
        })

        nextNode === undefined ? root.childrenNode.push(node) : createTOCTree(nextNode, node)
    }
    tocNodes.forEach(n => createTOCTree(rootNode, n))
    return rootNode
}

const renderer = new marked.Renderer()

renderer.heading = (text: string, level: string) => {
    const slug = text
        .replace(/<(?:.|\n)*?>/gm, '')
        .toLowerCase()
        .replace(/[\s\n\t]+/g, '-')
    return `<h${level} id="${slug}">${text}</h${level}>`
}

renderer.code = (code: string, lang: string) => {
    const highlightResult = highlight.highlightAuto(code).value;
    return `<pre><code class="lang-${lang}">${highlightResult}</code></pre>`;
}

const tagItemRender = {
    name: 'tag',
    level: 'inline',                                  
    start(src: string) { return src.match(/#[^\s]+/)?.index },
    tokenizer(src: string) {
        const rule = /^#([^\s]+)[\s|\b]/;
        const result = src.match(rule);
        if (result) {
            const token = {                              
                type: 'tag',
                raw: result[0].slice(-1) == '\n' ? result[0].slice(0, -1) : result[0],
                text: result[1].trim()
            };
            return token;
        }
    },
    renderer(token: Token) {
        return `<span class="tagItem">${token.text}</span>`;
    }
};

marked.use({ extensions: [tagItemRender] });

marked.setOptions({
    renderer,
    breaks: true,
    gfm: true
})

// 添加元数据支持

function metaMarked(src: string) {
    const { attributes, body } = fm(src);
    const markdown = body;
    const meta = attributes as { title: string, publishDate: string, tags: string };
    const tokens = marked.lexer(markdown);
    const tocTree = parseTokensGenTOC(tokens);
    const html = marked.parser(tokens);
    return { meta, html, markdown, tocTree }
}

export default metaMarked;
