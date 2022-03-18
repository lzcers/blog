import { useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import TagList from '@/components/TagList';
import PostList from '@/components/PostList';
import './archive.less';

function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
}

const Archive = () => {
    const params = useParams();
    const query = useQuery();

    return (
        <div className="archive">
            <div className="archive-tags">
                <h3>Tags</h3>
                <TagList tag={params.tag || ""} />
            </div>
            <div className="archive-list">
                <h3>List</h3>
                <PostList tag={params.tag || ""} pageNumber={Number(query.get("pageNumber")) || 0} />
            </div>
        </div>
    );
}

export default Archive;