import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getPosts } from '@/api'

export default props => {
    const [posts, setPosts] = useState([])
    const { tag } = props

    getPosts().then(data => setPosts(data))

    const dateTransform = publishDate => {
        const date = new Date(publishDate)
        const enMonth = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
        const [month, day, year] = [enMonth[date.getMonth()], date.getDate() + 'TH', date.getFullYear()]
        return `${month} ${day} ${year}`
    }

    return posts
        .sort((a, b) => (new Date(a.PublishDate) < new Date(b.PublishDate) ? 1 : -1))
        .filter(p => (tag ? !!p.Tags.includes(tag) : true))
        .map(i => (
            <li key={i.ID}>
                <Link to={'/post/' + i.ID}>
                    <span className="item-name">{i.Title}</span>
                    <span className="item-date">{dateTransform(i.PublishDate)}</span>
                </Link>
            </li>
        ))
}
