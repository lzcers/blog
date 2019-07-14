import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getTags } from '@/api'

export default props => {
    const [tags, setTags] = useState([])
    const [selected, setSelected] = useState('')
    const { tag } = props

    getTags().then(data => {
        setTags(data)
        setSelected(tag)
    })

    return [
        <li
            key="ALL"
            style={{
                color: selected === 'ALL' ? '#fff' : '',
                background: selected === 'ALL' ? '#333' : ''
            }}
        >
            <Link to="/archive" onClick={_ => setSelected({ selected: 'ALL' })}>
                ALL
            </Link>
        </li>
    ].concat(
        tags.map(i => (
            <li
                key={i}
                style={{
                    color: selected === i ? '#fff' : '',
                    background: selected === i ? '#333' : ''
                }}
            >
                <Link to={'/archive/tag/' + i} onClick={_ => setSelected({ selected: i })}>
                    {i}
                </Link>
            </li>
        ))
    )
}
