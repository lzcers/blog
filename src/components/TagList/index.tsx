import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.less";

export default (props: { list: string[]; tag: string }) => {
    const { tag, list } = props;
    const navigate = useNavigate();
    const [tags, setTags] = useState<string[]>([]);
    const [selected, setSelected] = useState("all");

    const onClickLink = (path: string) => navigate(path);

    useEffect(() => {
        tag && setSelected(tag);
    }, [tag]);

    useEffect(() => {
        list && setTags(list.sort());
    }, [list]);

    return (
        <ul className="tags">
            <li
                className={`tag ${selected === "all" ? "selectedTag" : ""}`}
                onClick={() => {
                    onClickLink("/"), setSelected("all");
                }}
            >
                全部
            </li>
            {tags.map(i => (
                <li
                    key={i}
                    className={`tag ${selected === i ? "selectedTag" : ""}`}
                    onClick={() => {
                        onClickLink("/tag/" + i), setSelected(i);
                    }}
                >
                    {i}
                </li>
            ))}
        </ul>
    );
};
