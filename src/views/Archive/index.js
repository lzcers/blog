import React from 'react'
import TagsContainer from '@/containers/TagsContainer'
import ArchiveContainer from '@/containers/ArchiveContainer'

import './archive.scss'

const Archive = _ => (
  <div className="Archiver">
    <div className="archiver-tags">
      <h3>Tags</h3>
      <ul className="archiver-tag-items">
        <TagsContainer />
      </ul>
    </div>
    <div className="archiver-list">
      <h3>List</h3>
      <ul className="archiver-list-items">
        <ArchiveContainer />
      </ul>
    </div>
  </div>
)
export default Archive
