import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTags } from '@/api';
import './styles.less';

export default (props: { tag: string }) => {
  const [tags, setTags] = useState<string[]>([]);
  const [selected, setSelected] = useState('all');
  const { tag } = props;

  useEffect(() => {
    !tags && setSelected(tag);
  }, [tag]);

  useEffect(() => {
    getTags().then((data) => {
      setTags(data);
    })
  }, []);

  return (
    <ul className="tags">
      <li
        style={{ color: selected === "all" ? '#fff' : '', background: selected === "all" ? '#333' : '' }}
      >
        <Link to="/blog" onClick={(_) => setSelected("all")}>
          ALL
        </Link>
      </li>
      {tags.map((i) => (
        <li
          key={i}
          style={{ color: selected === i ? '#fff' : '', background: selected === i ? '#333' : '' }}
        >
          <Link to={'/blog/tag/' + i} onClick={() => setSelected(i)}>
            {i}
          </Link>
        </li>
      ))}
    </ul>
  )
}

