import { Link } from "react-router-dom";
import { Post } from "@/api";
import "./styles.less";

const pageButton = (pageNumber: number, dir: "left" | "right") => {
    const number = dir == "left" ? pageNumber - 1 : pageNumber + 1;
    return (
        <div className={dir == "left" ? "post-left" : "post-right"}>
            <Link onClick={_ => window.scrollTo(0, 0)} to={{ search: `?pageNumber=${number}` }}>
                {dir == "left" && "◀"}
                <span className="pager-name">{dir == "left" ? "前页" : "下页"}</span>
                {dir == "right" && "▶"}
            </Link>
        </div>
    );
};

const COUNT = 20;
export default (props: { list: Post[]; pageNumber: number }) => {
    const { pageNumber, list } = props;
    const offset = pageNumber * COUNT;

    const dateTransform = (publishDate: string) => {
        const date = new Date(publishDate);
        const [month, day, year] = [date.getMonth() + 1, date.getDate(), date.getFullYear()];
        return `${year}/${month < 10 ? "0" + month : month}/${day < 10 ? "0" + day : day}`;
    };

    if (list.length === 0) return <h3 style={{ textAlign: "center", marginTop: "20%" }}>加载中...</h3>;

    return (
        <div className="posts">
            <ul className="post-list">
                {list.slice(offset, offset + COUNT).map(i => (
                    <li key={i.id}>
                        <Link to={"/post/" + i.id}>
                            <span className="post-item-name">{i.title}</span>
                            <span className="post-item-date">{dateTransform(i.publish_date)}</span>
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="post-nav">
                {pageNumber > 0 && pageButton(pageNumber, "left")}
                {pageNumber < list.length / COUNT - 1 && pageButton(pageNumber, "right")}
            </div>
        </div>
    );
};
