import { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import TagList from "@/components/TagList";
import PostList from "@/components/PostList";
import { Post, getPosts } from "@/api";
import MyPic from "./my_pic.jpg";
import "./index.less";

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
        const p = posts
            .filter(p => p.title && p.publishDate)
            .sort((a, b) => (new Date(a.publishDate) < new Date(b.publishDate) ? 1 : -1))
            .filter(p => (params["*"] ? !!p.tags?.includes(params["*"]) : true));
        setShowPosts(p);
    }, [posts, params]);

    useEffect(() => {
        getPosts().then(data => {
            data && setPosts(data);
        });
    }, []);

    return (
        <div className="archive">
            <div className="archive-header">
                <blockquote className="quotoSICP">
                    <p>「如果说艺术解释了我们的梦想，那么计算机就是以程序的名义执行着它们。」</p>
                    <p style={{ textAlign: "left", fontStyle: "italic", fontSize: "12px" }}>—— Alan J.Perlis《计算机程序的构造与解释》</p>
                </blockquote>
            </div>
            <TagList list={tags} tag={params["*"] || ""} />
            <PostList list={showPosts} pageNumber={Number(query.get("pageNumber")) || 0} />
        </div>
    );
};

export default Archive;
