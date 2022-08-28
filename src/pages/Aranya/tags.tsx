interface TagsProps {
    tags: string[];
    selected: string | null;
    onClick: (tag: string) => void;
}

export default (props: TagsProps) => {
    const { tags, selected, onClick } = props;
    return (
        <ul className="tags">
            {tags.map(tag => {
                return (
                    <li key={tag} className={`tag ${selected == tag ? "selectedTag" : ""}`} onClick={() => onClick(tag)}>
                        {tag}
                    </li>
                );
            })}
        </ul>
    );
};
