import React from 'react'
import FIcon from '@fortawesome/react-fontawesome'
import tags from '@fortawesome/fontawesome-free-solid/faTags'
import angleLeft from '@fortawesome/fontawesome-free-solid/faAngleDoubleLeft'
import angleRight from '@fortawesome/fontawesome-free-solid/faAngleDoubleRight'

import '@/components/Article/article.scss'
import './post.scss'

export default class Post extends React.PureComponent {
    render() {
        return (
            <article className="post">
                <h1 className="article-title">
                    写作是一个学习过程
                </h1>
                <div className="article-date">MAR 18TH 2018</div>
                <div className="article-content">
                    <div className="markdown-body post-body-slice">
                        <p>旅行的意义不在于终点，而是走过的路。</p>
                        <p>文章不是目的，写作过程中的思考才是，多数时候我将写作当作一件梳理思考的方法，将思想的过程书写下来，与其说是在写文章，倒不如说是在做记录以方便自己回溯。作为书写者，日后从自己记录的内容中能还原思考的路径是容易的，但他人就未必了，因此也从未考虑过写的东西与他人看。<br />但书写的时候假设读者的存在是有意义，而且考虑的读者层次越低越好，如果未曾考虑过读者的写作仅是记录和梳理思考，那么考虑读者的写作就意味还需要做某种程度的解释，有一个学习的著名方法叫做费曼方法。</p>
                        <p>通常情况下我们难以找到一个合适的倾听者，但这个方法的核心是表达，因而用语言也好，文字也罢，效果应该是相同的，再考虑方法的第二个步骤，”教给一个完全不懂得另外一个人“，我们可以将文章读者的预设为外行人，这样一来，整个方法都可以用写作来实践，因此，写作即是学习。<strong>……</strong></p>
                    </div>
                </div>
                <div className="article-info">
                    <div className="article-tags">
                        <FIcon icon={tags} className="article-tags-pic" />
                        <a href="" className="article-tags-link">JAVASCRIPT</a>
                        <span>, </span> 
                        <a href="" className="article-tags-link">FED</a>
                    </div>
                </div>
                <div className="post-nav">
                    <div className="post-left">
                        <FIcon icon={angleLeft} />
                        <a href="">写作是一个学习过程</a>
                    </div>
                    <div className="post-right">
                        <a href="">用JS 实现 Lisp 里的流</a>
                        <FIcon icon={angleRight} />
                    </div>
                </div>
            </article>      
        )
    }
}