import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import blogServer from '@/api/server';
import metaMarked from '@/utils/mdRender';
import Textarea, { resize } from 'react-expanding-textarea';
import { globalState } from '@/main';
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

const PAGE_SIZE = 100;

export default () => {
    const [noteList, setNoteList] = useState<Record[]>([]);
    const [tagList, setTagList] = useState<string[]>([]);
    const [heatList, setHeatList] = useState<HeatPoint[]>([]);
    const [showList, setShowList] = useState<Record[]>([]);
    const [editable, setEditable] = useState<number | null>(null);
    const [filter, setFilter] = useState<Filter>({ date: null, tag: null });
    const editTextareaRef = useRef<HTMLTextAreaElement>(null);
    const addRecotdTextareaRef = useRef<HTMLTextAreaElement>(null);
    const [confirmAction, setConfirmAction] = useState<number | null>(null);

    const { isEditor, setIsEditor } = useContext(globalState)!;


    const insertRecord = useCallback((r: Record) => {
        noteList.unshift(r);
        setNoteList([...noteList]);
    }, [noteList]);


    const onClickTag = (tag: string) => {
        setFilter(f => {
            if (f.tag == tag) return { date: null, tag: null };
            else return { date: null, tag };
        })
    }

    const getNotes = (pageNumber?: number, pageSize?: number) => {
        return blogServer.getNoteList(pageNumber, pageSize).then(({ list, ...info }) => {
            let notes = list.map(item => {
                // 无标签的分配「无」标签
                const tags = [...item.content.matchAll(/#([^\s]+)[\s\r\n]/g)].map(i => i[1]);
                return {
                    id: item.id,
                    tags: tags.length > 0 ? tags : ["无"],
                    createdAt: new Date(item.created_at).toLocaleString(),
                    updatedAt: new Date(item.updated_at).toLocaleString(),
                    content: item.content
                };
            })
            return {
                total: info.total,
                pageSize: info.page_size,
                pageNumber: info.page_number,
                list: notes
            }
        });
    }

    const onSaveNote = (r: Record) => {
        if (!editTextareaRef.current) return;
        const newRecord = { ...r, content: editTextareaRef.current.value, tags: [...editTextareaRef.current.value.matchAll(/#([^\s]+)[\s\r\n]/g)].map(i => i[1]) };
        setNoteList(noteList.map(i => {
            if (i.id == r.id) return newRecord;
            return i;
        }));
        blogServer.updateNote(r.id, editTextareaRef.current.value).then(() => {
            setEditable(null);
        })
    }

    const onAddNote = () => {
        if (!addRecotdTextareaRef.current || !addRecotdTextareaRef.current.value) return;
        blogServer.createNote(addRecotdTextareaRef.current.value).then((r) => {
            addRecotdTextareaRef.current!.value = '';
            resize(0, addRecotdTextareaRef.current);
            insertRecord({
                id: r.id,
                createdAt: new Date(r.created_at).toLocaleString(),
                updatedAt: new Date(r.updated_at).toLocaleString(),
                tags: [...r.content.matchAll(/#([^\s]+)[\s\r\n]/g)].map(i => i[1]),
                content: r.content
            })
        });
    }

    const onDeleteNote = (id: number) => {
        return blogServer.deleteNote(id).then(() => {
            setNoteList(noteList.filter(note => note.id != id));
            setEditable(null);
            setConfirmAction(null);
        })
    }

    const clacHeatList = useCallback(() => {
        const dateGroupList = noteList.reduce((prev, item) => {
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
    }, [noteList]);

    const filterNotes = useCallback((filter: (r: Record) => boolean) => {
        const result = noteList.filter(filter);
        setShowList(result)
    }, [noteList]);

    const getAllNotes = () => {
        let newRecords: Record[] = [];
        let tags: string[] = [];
        const loopLoad = (p: number) => {
            getNotes(p, PAGE_SIZE).then(({ list }) => {
                tags = tags.concat(...list.map(i => i.tags).flat())
                newRecords = newRecords.concat(...list)
                setNoteList(newRecords);
                setTagList([...new Set(tags)]);
                if (list.length == PAGE_SIZE) {
                    loopLoad(p + 1);
                }
            })
        }
        loopLoad(1);
    }

    const sortShowNotesByUpdatedAt = (notes: Record[]) => notes.sort((a, b) => (new Date(a.updatedAt) < new Date(b.updatedAt) ? 1 : -1))
    
    const sortTags = (tags: string[]) => {
        return tags.reduce((arr, tag) => {
            // 让「无」和「密」标签在前面
            if (tag == "无" || tag == "密") {
                arr.unshift(tag);
            } else {
                arr.push(tag);
            }
            return arr;
        }, [] as string[]);
    }

    useEffect(() => {
        setShowList(noteList);
        setHeatList(clacHeatList());
        setTagList([...new Set(noteList.map(r => r.tags).flat())]);
    }, [noteList]);

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
        filterNotes(f);
    }, [filter]);

    useEffect(() => {
        getAllNotes();
    }, [isEditor]);

    useEffect(() => {
        getAllNotes();
        blogServer.authToken().then(({ result }) => {
            setIsEditor(result);
        })
    }, []);

    return (
        <div className="aranya">
            <ul className="tags">
                {sortTags(tagList).map(tag => {
                    return (
                        <li key={tag} className={`tag ${filter.tag == tag ? "selectedTag" : ''}`} onClick={() => onClickTag(tag)}>
                            {tag}
                        </li>
                    );
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
                <div className="right">
                    <div className="count" onClick={() => setFilter({ date: null, tag: null })}>
                        <span>共</span>
                        <span>{heatList.length} 天</span>
                        <span>{noteList.length} 笔</span>
                    </div>
                </div>
            </div>
            {isEditor &&
                <div className="newRecord">
                    <Textarea className="editArea heti heti--classic" autoFocus ref={addRecotdTextareaRef} placeholder="..." />
                    <button className="btn" onClick={onAddNote}><strong>记</strong></button>
                </div>
            }
            <div className="timeline">
                {showList.map(r => {
                    return (
                        <div className="record" key={r.id}>
                            {
                                editable != r.id ?
                                    <div className="content heti heti--classic" dangerouslySetInnerHTML={{ __html: metaMarked(r.content).html }}></div> :
                                    <Textarea className="editArea heti heti--classic" autoFocus defaultValue={r.content} ref={editTextareaRef} placeholder="..." />
                            }
                            <div className="props">
                                {isEditor && !confirmAction &&
                                    <div className="opt">
                                        {editable != r.id && <button className="btn" onClick={() => setEditable(r.id)}>编辑</button>}
                                        {editable != r.id && <button className="btn" onClick={() => setConfirmAction(r.id)}>删除</button>}
                                        {editable == r.id && <button className="btn" onClick={() => onSaveNote(r)}>保存</button>}
                                        {editable == r.id && <button className="btn" onClick={() => setEditable(null)}>取消</button>}
                                    </div>
                                }
                                {isEditor && confirmAction == r.id &&
                                    <div className="confirm">
                                        <button className="btn emphasis" onClick={() => onDeleteNote(r.id)}>确定</button>
                                        <button className="btn" onClick={() => setConfirmAction(null)}>取消</button>
                                    </div>
                                }
                                <div className="datetime">
                                    <span>{r.createdAt}</span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
