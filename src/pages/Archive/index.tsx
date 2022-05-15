import { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import TagList from "@/components/TagList";
import PostList from "@/components/PostList";
import { Post, getPosts } from "@/api";

function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
}

const Archive = () => {
    const params = useParams();
    const query = useQuery();
    const [posts, setPosts] = useState<Post[]>([]);
    const [showPosts, setShowPosts] = useState<Post[]>([]);

    const tags = useMemo(() => {
        const tagList = posts.map(p => p.tags).reduce((pre, cur) => pre.concat(cur), []);
        return [...new Set(tagList)];
    }, [posts]);

    useEffect(() => {
        const p = posts.sort((a, b) => (new Date(a.publish_date) < new Date(b.publish_date) ? 1 : -1)).filter(p => (params.tag ? !!p.tags.includes(params.tag) : true));
        setShowPosts(p);
    }, [posts, params]);

    useEffect(() => {
        getPosts().then(data => {
            data && setPosts(data);
        });
    }, []);

    return (
        <div className="archive">
            <TagList list={tags} tag={params.tag || ""} />
            <PostList list={showPosts} pageNumber={Number(query.get("pageNumber")) || 0} />
        </div>
    );
};

export default Archive;
