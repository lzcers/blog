import { get_list } from '@/api/github';
import metaMarked from '@/utils/mdRender';
import { useEffect, useState } from 'react';
import './aranya.less'

interface ReatPoint {
    date: string;
    count: number;
}

interface Record {
    id: number;
    createDatetime: string;
    updateDatetime: string;
    content: string;
}

export default () => {
    const heatList: ReatPoint[] = Array(30).fill({ date: "2022-03-20", count: 5 });
    const [recordList, setRecordList] = useState<Record[]>([]);

    useEffect(() => {
        get_list().then(data => {
            setRecordList(
                data.map(item => {
                    const mdContent = metaMarked(item.body);
                    return {
                        id: item.id,
                        createDatetime: new Date(item.created_at).toLocaleString(),
                        updateDatetime: new Date(item.updated_at).toLocaleString(),
                        content: mdContent.html,
                    };
                }).reverse()
            );
            console.log(data);
        });
    }, []);
    return (
        <div className="aranya">
            <div className="heti heti--ancient">
                <p>非六根所见，着六尘而显，凡了悟者即知道。</p>
            </div>
            {/* <div className="heatmap"> */}
            {/* <div className="prev">◀</div> */}
            {/* {heatList.map(p => {
                    return (
                        <div key={p.date} className="heatPoint" style={{ backgroundColor: `rgba(0, 160, 0, ${Math.random()})` }}></div>
                    )
                })} */}
            {/* <div className="next">▶</div> */}
            {/* </div> */}
            {/* <div className="inputarea">
                <textarea />
            </div> */}
            <div className="tags">

            </div>
            <div className="timeline">
                {recordList.map(r => {
                    return (
                        <div className="record" key={r.id}>
                            <div className="content post-body markdown-body" dangerouslySetInnerHTML={{ __html: r.content }}></div>
                            <div className="props">
                                <span className="datetime">{r.updateDatetime}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
