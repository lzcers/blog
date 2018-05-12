import React from 'react'
import FIcon from '@fortawesome/react-fontawesome'
import tagsIcon from '@fortawesome/fontawesome-free-solid/faTags'
import { Link } from 'react-router-dom'
import metaMarked from '@/utils/mdRender.js'
import './article.scss'
import 'highlight.js/styles/tomorrow.css'
import 'github-markdown-css'

const Article = ({ id, title, tags, publishDate, lastUpdate, content }) => {
    const date = new Date(publishDate)
    const enMonth = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
    const [month, day, year] = [enMonth[date.getMonth()], date.getDate()+'TH', date.getFullYear()]
    return (
        <article className="article">
            <h1 className="article-title">
                <Link to={ '/post/'+id }>{ title }</Link>
            </h1>
            <div className="article-date">{`${month} ${day} ${year}`}</div>
            <div className="article-content">
                <div className="post-body markdown-body" dangerouslySetInnerHTML={{ __html: metaMarked(content).html }}>
                </div>
            </div>
            <div className="article-info">
                <a className="article-more" href="">CONTINUE READING</a>
                <div className="article-tags">
                    <FIcon icon={ tagsIcon } className="article-tags-pic" />
                    { tags.map(e => <a href="" key={ e } className="article-tags-link">{ e }</a>) }
                </div>
            </div>
        </article>
    )
}
export default Article
