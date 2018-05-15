import React from 'react'
import './archive.scss'

const Archiver = (
  <div className="Archiver">
    <div className="archiver-tags">
      <h3>Tags</h3>
      <ul className="archiver-tag-items">
        <li>
          <a href="#">JAVASCRIPT</a>
        </li>
        <li>
          <a href="#">FED</a>
        </li>
        <li>
          <a href="#">CSS</a>
        </li>
      </ul>
    </div>
    <div className="archiver-list">
      <h3>List</h3>
      <ul className="archiver-list-items">
        <li>
          <a href="#">
            <span className="item-name">如何不带脏字讽刺一个人？</span>
            <span className="item-date">Mar 18th 2018</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
)
export default Archiver
