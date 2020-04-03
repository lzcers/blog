import React from 'react'
import TagsContainer from '@/containers/TagsContainer'
import ArchiveContainer from '@/containers/ArchiveContainer'

import './archive.scss'

const Archive = ({ match }) => (
    <div className="archive">
        <div className="archive-tags">
            <h3>Tags</h3>
            <ul className="archive-tag-items">
                <TagsContainer tag={match.params.tag} />
            </ul>
        </div>
        <div className="archive-list">
            <h3>List</h3>
            <ul className="archive-list-items">
                <ArchiveContainer tag={match.params.tag} />
            </ul>
        </div>
    </div>
)
export default Archive
