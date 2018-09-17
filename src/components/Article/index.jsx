import React from 'react'
import FIcon from '@fortawesome/react-fontawesome'
import tagsIcon from '@fortawesome/fontawesome-free-solid/faTags'
import { Link } from 'react-router-dom'
import 'highlight.js/styles/tomorrow.css'
import './markdown.scss'
import './article.scss'
// import angleLeft from '@fortawesome/fontawesome-free-solid/faAngleDoubleLeft'
// import angleRight from '@fortawesome/fontawesome-free-solid/faAngleDoubleRight'
import Toc from '@/components/Toc'

const Article = ({ id, title, tags, publishDate, content, toc, mode }) => {
    const date = new Date(publishDate)
    const enMonth = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
    const [month, day, year] = [enMonth[date.getMonth()], date.getDate() + 'TH', date.getFullYear()]
    return (
        <article className="article post">
            <h1 className="article-title">{mode ? title : <Link to={'/post/' + id}>{title}</Link>}</h1>
            <div className="article-date">{`${month || ''} ${day} ${year || ''}`}</div>
            <div className="article-content">
                {toc && toc.childrenNode.length >= 3 ? (
                    <aside className="article-toc">
                        <Toc toc={toc} />
                    </aside>
                ) : null}
                <div className="post-body markdown-body" dangerouslySetInnerHTML={{ __html: content }} />
            </div>
            <div className="article-info">
                {mode ? null : <Link to={'/post/' + id}>MORE</Link>}
                <div className="article-tags">
                    <FIcon icon={tagsIcon} className="article-tags-pic" />
                    {tags.map(e => (
                        <Link to={'/archive/tag/' + e} key={e} className="article-tags-link">
                            {e}
                        </Link>
                    ))}
                </div>
            </div>
            {/* <div className="post-nav">
        <div className="post-left">
          <FIcon icon={angleLeft} />
          <a href="">写作是一个学习过程</a>
        </div>
        <div className="post-right">
          <a href="">用JS 实现 Lisp 里的流</a>
          <FIcon icon={angleRight} />
        </div>
      </div> */}
        </article>
    )
}
export default Article
