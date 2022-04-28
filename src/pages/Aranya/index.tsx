import { useCallback, useEffect, useRef, useState } from 'react';
import blogServer from '@/api/server';
import metaMarked from '@/utils/mdRender';
import Textarea, { resize } from 'react-expanding-textarea';
import './aranya.less'

interface HeatPoint {
    date: string;
    count: number;
}

interface Record {
    id: number;
    tags: string[];
    createdAt: string;
    updatedAt: string;
    content: string;
}

interface Filter {
    date: string | null;
    tag: string | null;
}

const PAGE_SIZE = 30;

export default () => {
    const [tagList, setTagList] = useState<string[]>([]);
    const [heatList, setHeatList] = useState<HeatPoint[]>([]);
    const [recordList, setRecordList] = useState<Record[]>([]);
    const [showList, setShowList] = useState<Record[]>([]);
    const [editable, setEditable] = useState<number | null>(null);
    const [filter, setFilter] = useState<Filter>({ date: null, tag: null });
    const editTextareaRef = useRef<HTMLTextAreaElement>(null);
    const addRecotdTextareaRef = useRef<HTMLTextAreaElement>(null);

    const getRecords = (pageNumber?: number) => {
        return blogServer.getNoteList(pageNumber).then(data => {
            return data.map(item => {
                return {
                    id: item.id,
                    tags: [...item.content.matchAll(/#([^\s]+)\s?/g)].map(i => i[1]),
                    createdAt: new Date(item.created_at).toLocaleString(),
                    updatedAt: new Date(item.updated_at).toLocaleString(),
                    content: item.content
                };
            }).reverse();
        });
    }

    const insertRecord = useCallback((r: Record) => {
        recordList.unshift(r);
        setRecordList([...recordList]);
    }, [recordList]);

    const openDoor = () => {
        let newRecords: Record[] = [];
        let tags: string[] = [];
        const rc = 30;
        let page = rc % PAGE_SIZE != 0 ? Math.floor(rc / PAGE_SIZE) + 1 : rc / PAGE_SIZE;
        const loopLoad = (p: number) => {
            if (p > 0) {
                getRecords(p).then((r) => {
                    tags = tags.concat(...r.map(i => i.tags).flat())
                    newRecords = newRecords.concat(...r)
                    setRecordList(newRecords);
                    setTagList([...new Set(tags)]);
                    loopLoad(--p);
                })
            }
        }
        loopLoad(page);
    }

    const knockDoor = (token: string) => {
        localStorage.setItem('myToken', token);
    }

    const onSaveRecord = (r: Record) => {
        if (!editTextareaRef.current) return;
        const newRecord = { ...r, content: editTextareaRef.current.value, tags: [...editTextareaRef.current.value.matchAll(/#([^\s]+)\s?/g)].map(i => i[1]) };
        setRecordList(recordList.map(i => {
            if (i.id == r.id) return newRecord;
            return i;
        }));
        blogServer.updateNote(r.id, editTextareaRef.current.value).then(() => {
            setEditable(null);
        })
    }

    const onAddRecord = () => {
        if (!addRecotdTextareaRef.current || !addRecotdTextareaRef.current.value) return;
        blogServer.createNote(addRecotdTextareaRef.current.value).then((r) => {
            addRecotdTextareaRef.current!.value = '';
            resize(0, addRecotdTextareaRef.current);
            insertRecord({
                id: r.id,
                createdAt: new Date(r.created_at).toLocaleString(),
                updatedAt: new Date(r.updated_at).toLocaleString(),
                tags: [...r.content.matchAll(/#([^\s]+)\s?/g)].map(i => i[1]),
                content: r.content
            })
        });
    }

    const clacHeatList = useCallback(() => {
        const dateGroupList = recordList.reduce((prev, item) => {
            const date = item.createdAt.match(/\d*\/\d*\/\d*/g)?.pop();
            if (date) {
                if (prev[date]) {
                    prev[date].push(item)
                } else {
                    prev[date] = [item];
                }
            }
            return prev;
        }, {} as { [key: string]: Record[] })

        const heatList = Object.keys(dateGroupList)
            .reverse()
            .reduce((result, key) => {
                result.push({ date: key, count: dateGroupList[key].length });
                return result;
            }, [] as HeatPoint[]);
        return heatList;
    }, [recordList]);

    const filterRecord = useCallback((filter: (r: Record) => boolean) => {
        const result = recordList.filter(filter);
        setShowList(result)
    }, [recordList]);


    useEffect(() => {
        setShowList(recordList);
        setHeatList(clacHeatList());
        setTagList([...new Set(recordList.map(r => r.tags).flat())]);
    }, [recordList]);

    useEffect(() => {
        const f = (r: Record) => {
            const { date, tag } = filter;
            if (date && tag) {
                return r.createdAt.includes(date) && r.tags.includes(tag);
            } else {
                if (date) return r.createdAt.includes(date)
                else if (tag) return r.tags.includes(tag);
            }
            return true;
        }
        filterRecord(f);
    }, [filter]);

    useEffect(() => {
        openDoor();
    }, []);

    if (!localStorage.getItem("myToken")) {
        return (
            <div className="aranya">
                <div className="door">
                    <p>非六根所见，着六尘而显，凡了悟者即知道。</p>
                    <input type="text" className={"key"} autoFocus onKeyUp={e => {
                        if (e.keyCode == 13) {
                            knockDoor((e.target as HTMLInputElement).value);
                            openDoor();
                        }
                    }} />
                </div>
            </div>
        );
    }

    return (
        <div className="aranya">
            <ul className="tags">
                {tagList.map(tag => {
                    return <li className={filter.tag == tag ? "selectedTag" : ''} key={tag}
                        onClick={() => {
                            setFilter(f => {
                                if (f.tag == tag) return { date: null, tag: null };
                                else return { date: null, tag };
                            })
                        }}><a>{tag}</a></li>;
                })}
            </ul>
            <div className="heatmap">
                <div className="left">
                    {/* <div className="prev">◀</div> */}
                    {heatList.map(p => {
                        return (
                            <div
                                key={p.date}
                                className="heatPoint"
                                date-title={p.date}
                                onClick={() => {
                                    setFilter(f => ({ tag: null, date: p.date }))
                                }}
                                style={{ backgroundColor: `rgba(0, 160, 0, ${p.count / 5 < 1 ? p.count / 5 : 1})` }}>
                            </div>
                        )
                    })}
                    {/* <div className="next">▶</div> */}
                </div>
                <div className="count" onClick={() => setFilter({ date: null, tag: null })}>
                    <span>共</span>
                    <span>{heatList.length} 天</span>
                    <span>{recordList.length} 笔</span>
                </div>
            </div>
            <div className="newRecord">
                <Textarea className="editArea post-body markdown-body" autoFocus ref={addRecotdTextareaRef} placeholder="..." />
                <button className="btn" onClick={onAddRecord}><strong>记</strong></button>
            </div>
            <div className="timeline">
                {showList.map(r => {
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
        </div>
    );
}
