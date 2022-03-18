import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTags } from '@/api';
import './styles.less';

export default (props: { tag: string }) => {
  const [tags, setTags] = useState<string[]>([]);
  const [selected, setSelected] = useState('all');
  const { tag } = props;

  useEffect(() => {
    console.log(tag);
    tag && setSelected(tag);
  }, [tag]);

  useEffect(() => {
    getTags().then((data) => {
      setTags(data);
    })
  }, []);

  return (
    <ul className="tags">
      <li className={`${selected === 'all' ? "selectedTag" : ""}`}>
        <Link to="/blog" onClick={(_) => setSelected("all")}>
          ALL
        </Link>
      </li>
      {tags.map((i) => (
        <li
          key={i}
          className={`${selected === i ? "selectedTag" : ""}`}
        >
          <Link to={'/blog/tag/' + i} onClick={() => setSelected(i)}>
            {i}
          </Link>
        </li>
      ))
      }
    </ul >
  )
}

