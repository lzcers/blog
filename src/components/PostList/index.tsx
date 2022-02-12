import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Post, getPosts } from '@/api';
import './styles.less';

export default (props: { tag: string }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { tag } = props;

  useEffect(() => {
    getPosts().then((data) => setPosts(data));
  }, []);

  const dateTransform = (publishDate: string) => {
    const date = new Date(publishDate);
    const enMonth = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const [month, day, year] = [enMonth[date.getMonth()], date.getDate() + 'TH', date.getFullYear()];
    return `${month} ${day} ${year}`;
  }

  if (posts.length === 0) return <h3>Loading...</h3>;

  return (
    <ul className="post-list">
      {posts
        .sort((a, b) => (new Date(a.publish_date) < new Date(b.publish_date) ? 1 : -1))
        .filter((p) => (tag ? !!p.tags.includes(tag) : true))
        .map((i) => (
          <li key={i.id}>
            <Link to={'/blog/post/' + i.id}>
              <span className="post-item-name">{i.title}</span>
              <span className="post-item-date">{dateTransform(i.publish_date)}</span>
            </Link>
          </li>
        ))}
    </ul>
  )
}
