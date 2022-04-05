import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Post, getPosts } from '@/api';
import './styles.less';


const pageButton = (pageNumber: number, dir: "left" | "right") => {
  const number = dir == "left" ? pageNumber - 1 : pageNumber + 1
  return (
    <div className={dir == "left" ? "post-left" : "post-right"}>
      {dir == "left" && '◀'}
      <Link onClick={(_) => window.scrollTo(0, 0)} to={{ search: `?pageNumber=${number}` }}>
        {dir == "left" ? "PREVIOUS" : "NEXT"}
      </Link>
      {dir == "right" && '▶'}
    </div>
  )
}


const COUNT = 20;
export default (props: { tag: string, pageNumber: number }) => {
  const { tag, pageNumber } = props;
  const offset = pageNumber * COUNT;

  const [posts, setPosts] = useState<Post[]>([]);
  const [showPosts, setShowPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts().then((data) => setPosts(data));
  }, []);

  useEffect(() => {
    const p = posts
      .sort((a, b) => (new Date(a.publish_date) < new Date(b.publish_date) ? 1 : -1))
      .filter((p) => (tag ? !!p.tags.includes(tag) : true));
    setShowPosts(p);
  }, [posts, tag]);

  const dateTransform = (publishDate: string) => {
    const date = new Date(publishDate);
    const enMonth = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const [month, day, year] = [enMonth[date.getMonth()], date.getDate() + 'TH', date.getFullYear()];
    return `${month} ${day} ${year}`;
  }

  if (posts.length === 0) return <h3 style={{ textAlign: "center", marginTop: "20%" }}>Loading...</h3>;

  return (
    <div className="posts">
      <ul className="post-list">
        {showPosts
          .slice(offset, offset + COUNT)
          .map((i) => (
            <li key={i.id}>
              <Link to={'/blog/post/' + i.id}>
                <span className="post-item-name">{i.title}</span>
                <span className="post-item-date">{dateTransform(i.publish_date)}</span>
              </Link>
            </li>
          ))}
      </ul>
      <div className="post-nav">
        {pageNumber > 0 && pageButton(pageNumber, "left")}
        {pageNumber < showPosts.length / COUNT - 1 && pageButton(pageNumber, "right")}
      </div>
    </div>

  )
}
