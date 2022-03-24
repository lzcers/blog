import { useEffect, useRef, useState } from 'react';
import { getList, updateRecord, createRecord } from '@/api/github';
import metaMarked from '@/utils/mdRender';
import Textarea, { resize } from 'react-expanding-textarea';
import './aranya.less'

interface HeatPoint {
    date: string;
    count: number;
}

interface Record {
    id: number;
    createdAt: string;
    updatedAt: string;
    content: string;
}

export default () => {
    const [heatList, setHeatList] = useState<HeatPoint[]>([]);
    const [recordList, setRecordList] = useState<Record[]>([]);
    const [editable, setEditable] = useState<number | null>(null);
    const editTextareaRef = useRef<HTMLTextAreaElement>(null);
    const addRecotdTextareaRef = useRef<HTMLTextAreaElement>(null);

    const getRecords = () => {
        getList().then(data => {
            setRecordList(
                data.map(item => {
                    return {
                        id: item.id,
                        createdAt: new Date(item.created_at).toLocaleString(),
                        updatedAt: new Date(item.updated_at).toLocaleString(),
                        content: item.body
                    };
                }).reverse()
            );
        });
    }
    const openTheDoor = () => getRecords();

    const knockDoor = (token: string) => {
        localStorage.setItem('myToken', token);
        openTheDoor();
    }

    const onSaveRecord = (r: Record) => {
        if (!editTextareaRef.current) return;
        const newRecord = { ...r, content: editTextareaRef.current.value };
        setRecordList(recordList.map(i => {
            if (i.id == r.id) return newRecord;
            return i;
        }));
        updateRecord(r.id, editTextareaRef.current.value);
        setEditable(null);
    }

    const onAddRecord = () => {
        if (!addRecotdTextareaRef.current) return;
        createRecord(addRecotdTextareaRef.current.value).then(() => {
            getRecords();
            addRecotdTextareaRef.current!.value = '';
            resize(0, addRecotdTextareaRef.current);
        });
    }

    useEffect(() => {
        let dateGroupList = recordList.reduce((prev, item) => {
            const date = item.updatedAt.match(/\d*\/\d*\/\d*/g)?.pop();
            if (date) {
                if (prev[date]) {
                    prev[date].push(item)
                } else {
                    prev[date] = [item];
                }
            }
            return prev;
        }, {} as { [key: string]: Record[] });
        console.log(dateGroupList);
        let heatList = Object.keys(dateGroupList).reduce((result, key) => {
            result.push({ date: key, count: dateGroupList[key].length });
            return result;
        }, [] as HeatPoint[]);
        setHeatList(heatList);

    }, [recordList]);

    useEffect(() => {
        openTheDoor();
    }, []);

    if (recordList.length == 0) {
        return (
            <div className="aranya">
                <div className="door">
                    <p>非六根所见，着六尘而显，凡了悟者即知道。</p>
                    <input type="text" className={"key"} autoFocus onKeyUp={e => {
                        if (e.keyCode == 13) {
                            knockDoor((e.target as HTMLInputElement).value);
                        }
                    }} />
                </div>
            </div>
        );
    }

    return (
        <div className="aranya">
            {/* <div className="heatmap">
                <div className="prev">◀</div>
                {heatList.map(p => {
                    return (
                        <div key={p.date} className="heatPoint" style={{ backgroundColor: `rgba(0, 160, 0, .${p.count})` }}></div>
                    )
                })}
                <div className="next">▶</div>
            </div> */}
            {/* <div className="tags">
            </div> */}
            <div className="newRecord">
                <Textarea className="editArea post-body markdown-body" autoFocus ref={addRecotdTextareaRef} placeholder="..." />
                <button className="btn" onClick={onAddRecord}>记下</button>
            </div>
            <div className="timeline">
                {recordList.map(r => {
                    return (
                        <div className="record" key={r.id}>
                            {
                                editable != r.id ?
                                    <div className="content post-body markdown-body" dangerouslySetInnerHTML={{ __html: metaMarked(r.content).html }}></div> :
                                    <Textarea className="editArea post-body markdown-body" autoFocus defaultValue={r.content} ref={editTextareaRef} placeholder="..." />
                            }
                            <div className="props">
                                <div className="opt">
                                    {editable != r.id && <button className="btn" onClick={() => setEditable(r.id)}>编辑</button>}
                                    {editable == r.id && <button className="btn" onClick={() => onSaveRecord(r)}>保存</button>}
                                    {editable == r.id && <button className="btn" onClick={() => setEditable(null)}>取消</button>}
                                </div>
                                <span className="datetime">{r.updatedAt}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div >
    );
}
