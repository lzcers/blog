import { Tokens, TokensList, marked } from "marked";
import fm from "front-matter";

// 解析 Tokens 生成 TOC Tree
function parseTokensGenTOC(tokens: TokensList) {
    const tocNodes = tokens
        .filter(t => t.type === "heading")
        .map(e => ({
            nodeID: (e as Tokens.Heading).text
                .replace(/<(?:.|\n)*?>/gm, "")
                .toLowerCase()
                .replace(/[\s\n\t]+/g, "-"),
            nodeLevel: (e as Tokens.Heading).depth,
            childrenNode: [],
        }));
    const rootNode = { nodeID: "root", nodeLevel: 0, childrenNode: [] };
    function createTOCTree(root: any, node: any) {
        let nextNode;
        root.childrenNode.forEach((i: any) => {
            if (node.nodeLevel > i.nodeLevel) nextNode = i;
        });

        nextNode === undefined ? root.childrenNode.push(node) : createTOCTree(nextNode, node);
    }
    tocNodes.forEach(n => createTOCTree(rootNode, n));
    return rootNode;
}

const renderer = new marked.Renderer();

renderer.heading = ({ text, depth }) => {
    const slug = text
        .replace(/<(?:.|\n)*?>/gm, "")
        .toLowerCase()
        .replace(/[\s\n\t]+/g, "-");
    return `<h${depth} id="${slug}">${text}</h${depth}>`;
};

renderer.code = ({ text, lang }) => {
    let html = text;
    lang = lang?.toLowerCase() ?? "";
    const grammar = window.Prism?.languages[lang] || window.Prism?.languages["clike"];
    if (!window.Prism?.languages[lang]) {
        console.warn(`unknown code language ${lang}!`);
    }
    try {
        html = window.Prism?.highlight(text, grammar, lang);
    } catch (e) {
        console.warn(e);
    }
    return `<pre><code class="lang-${lang}">${html}</code></pre>`;
};

marked.use({ extensions: [] });

marked.setOptions({
    renderer,
    breaks: true,
    gfm: true,
});

// 添加元数据支持

function metaMarked(src: string) {
    const { attributes, body } = fm(src);
    const markdown = body;
    const meta = attributes as { title: string; publishDate: string; tags: string };
    const tokens = marked.lexer(markdown);
    const tocTree = parseTokensGenTOC(tokens);
    const html = marked.parser(tokens);
    return { meta, html, markdown, tocTree };
}

export default metaMarked;
