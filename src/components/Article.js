import React from 'react'
import FIcon from '@fortawesome/react-fontawesome'
import tags from '@fortawesome/fontawesome-free-solid/faTags'

import '@/styles/article.scss'

export default class Article extends React.PureComponent {
    render() {
        return (
            <article className="article">
                <h1 className="article-title">
                    <a href="">如何编写和构建一个 JS 库</a>
                </h1>
                <div className="article-date">MAR 18TH 2018</div>
                <div className="article-content">
                    <p>
                        Introduction

                        我将从一个与文章主题不太相关，但很重要的问题开始 —— 为什么我们需要构建 Libraries 呢？

                        如果我们使用require我们完全不需要构建库（因为我们阅读了前一篇文章并且不在库里使用 ES6,也没有必要使用 bundlers/transpilers 等工具）。

                        当我们使用在 Nodejs 中仍然不支持的 ES6 modules 时，情况会有所变化。如我之前所说，你只能在 Node v9 并且带上 -experimental-modules 标志才能使用 ES6 modules。

                        所以我们需要将我们代码中的的imports/exports替换成require/module.exports,我们需要工具来完成这个工作。
                    </p>
                </div>
                <div className="article-info">
                    <a className="article-more" href="">CONTINUE READING</a>
                    <div className="article-tags">
                        <FIcon icon={tags} className="article-tags-pic" />
                        <a href="" className="article-tags-link">JAVASCRIPT</a>
                        <span>, </span> 
                        <a href="" className="article-tags-link">FED</a>
                    </div>
                </div>
            </article>
        )
    }
}