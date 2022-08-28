export interface HeatPoint {
    date: string;
    count: number;
}

interface HeatMapProps {
    data: HeatPoint[];
    onClick: (date: string | null) => void;
}

export default (props: HeatMapProps) => {
    const { data, onClick } = props;

    return (
        <div className="heatmap">
            <div className="points">
                {/* <div className="prev">◀</div> */}
                {data.map(p => {
                    return (
                        <div
                            key={p.date}
                            className="heatPoint"
                            date-title={p.date}
                            onClick={() => onClick(p.date)}
                            style={{ backgroundColor: `rgba(0, 160, 0, ${p.count / 5 < 1 ? p.count / 5 : 1})` }}
                        ></div>
                    );
                })}
                {/* <div className="next">▶</div> */}
            </div>
            <div className="right">
                <div className="count" onClick={() => onClick(null)}>
                    <span>共</span>
                    <span>{data.length} 天</span>
                    <span>{data.length} 笔</span>
                </div>
            </div>
        </div>
    );
};
