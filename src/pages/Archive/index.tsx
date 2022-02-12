import { useParams } from 'react-router-dom';
import TagList from '@/components/TagList';
import PostList from '@/components/PostList';
import './archive.less';

const Archive = () => {
    const params = useParams();
    return (
        <div className="archive">
            <div className="archive-tags">
                <h3>Tags</h3>
                <TagList tag={params.tag || ""} />
            </div>
            <div className="archive-list">
                <h3>List</h3>
                <PostList tag={params.tag || ""} />
            </div>
        </div>
    );
}

export default Archive;