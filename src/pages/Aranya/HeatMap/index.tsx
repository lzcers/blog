import { useEffect, useMemo, useState } from "react";
import "./style.less";

export interface HeatPoint {
    date: string;
    count: number;
}

interface HeatMapProps {
    data: HeatPoint[];
    onClick: (date: string | null) => void;
    onYearChange: (year: number) => void;
}

export default (props: HeatMapProps) => {
    const { data, onClick, onYearChange } = props;
    const [nowYear, setNowYear] = useState(new Date().getFullYear());

    const groupByYear = useMemo(
        () =>
            data.reduce((acc, p) => {
                const year = p.date.slice(0, 4);
                acc[year] ? acc[year].push(p) : (acc[year] = [p]);
                return acc;
            }, {} as { [year: string]: HeatPoint[] }),
        [data]
    );

    const setYear = (t: "add" | "sub") => {
        const max = new Date().getFullYear();
        const min = Math.min(...Object.keys(groupByYear).map(d => Number(d)));
        let newYear = new Date().getFullYear();
        if (t === "add" && nowYear + 1 <= max) {
            newYear = nowYear + 1;
            setNowYear(newYear);
            onYearChange(newYear);
        } else if (t === "sub" && nowYear - 1 >= min) {
            newYear = nowYear - 1;
            setNowYear(newYear);
            onYearChange(newYear);
        }
    };

    return (
        <div className="heatmap">
            <div className="points">
                {groupByYear[nowYear]?.map(p => {
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
            </div>
            <div className="heatmap-info">
                <div className="years">
                    <span className="prev" onClick={() => setYear("sub")}>
                        ◀
                    </span>
                    <span className="year">{nowYear}</span>
                    <span className="next" onClick={() => setYear("add")}>
                        ▶
                    </span>
                </div>

                <div className="count" onClick={() => onClick(null)}>
                    <span>共</span>
                    <span>{data.length} 天</span>
                    <span>{data.length} 笔</span>
                </div>
            </div>
        </div>
    );
};
