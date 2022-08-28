import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import Textarea, { resize } from "react-expanding-textarea";
import { globalState } from "@/main";
import blogServer from "@/api/server";
import Tags from "./tags";
import HeatMap, { HeatPoint } from "./heatmap";
import TImeline from "./timeline";
import "./aranya.less";

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
    const [filter, setFilter] = useState<Filter>({ date: null, tag: null });
    const editTextareaRef = useRef<HTMLTextAreaElement>(null);
    const addRecotdTextareaRef = useRef<HTMLTextAreaElement>(null);
    const { isEditor, setIsEditor } = useContext(globalState)!;

    // 派生状态
    const showList = useMemo(() => {
        const f = (r: Record) => {
            const { date, tag } = filter;
            if (date && tag) {
                return r.createdAt.includes(date) && r.tags.includes(tag);
            } else {
                if (date) return r.createdAt.includes(date);
                else if (tag) return r.tags.includes(tag);
            }
            return true;
        };
        const sortFn = (a: Record, b: Record) => {
            if (a.tags.includes("置顶") && b.tags.includes("置顶")) {
                return 0;
            } else if (a.tags.includes("置顶")) {
                return -1;
            } else {
                return 1;
            }
        };

        if (filter.date || filter.tag) {
            return noteList.filter(f).sort(sortFn);
        }
        return noteList.sort(sortFn);
    }, [noteList, filter]);

    const tagList = useMemo(
        () =>
            [...new Set(noteList.map(r => r.tags).flat())].sort((a, b) => {
                if ((a == "无" || a == "密") && (b == "无" || b == "密")) {
                    return 0;
                } else if (a == "无" || a == "密") {
                    return -1;
                }
                return 1;
            }),
        [noteList]
    );

    const heatList = useMemo(() => {
        const dateGroupList = noteList.reduce((prev, item) => {
            const date = item.createdAt.match(/\d*\/\d*\/\d*/g)?.pop();
            if (date) {
                if (prev[date]) {
                    prev[date].push(item);
                } else {
                    prev[date] = [item];
                }
            }
            return prev;
        }, {} as { [key: string]: Record[] });
        const heatList = Object.keys(dateGroupList)
            .reverse()
            .reduce((result, key) => {
                result.push({ date: key, count: dateGroupList[key].length });
                return result;
            }, [] as HeatPoint[]);
        return heatList;
    }, [noteList]);

    const insertRecord = useCallback(
        (r: Record) => {
            noteList.unshift(r);
            setNoteList([...noteList]);
        },
        [noteList]
    );

    const onClickTag = (tag: string) => {
        setFilter(f => {
            if (f.tag == tag) return { date: null, tag: null };
            else return { date: null, tag };
        });
    };

    const getNotes = (pageNumber?: number, pageSize?: number) => {
        return blogServer.getNoteList(pageNumber, pageSize).then(({ list, ...info }) => {
            let notes = list.map(item => {
                // 无标签的分配「无」标签
                const tags = [...item.content.matchAll(/#([^\s^#]+)[\s\r\n]/g)].map(i => i[1]);
                return {
                    id: item.id,
                    tags: tags.length > 0 ? tags : ["无"],
                    createdAt: new Date(item.created_at).toLocaleString(),
                    updatedAt: new Date(item.updated_at).toLocaleString(),
                    content: item.content,
                };
            });
            return {
                total: info.total,
                pageSize: info.page_size,
                pageNumber: info.page_number,
                list: notes,
            };
        });
    };

    const getAllNotes = () => {
        let newRecords: Record[] = [];
        let tags: string[] = [];
        const loopLoad = (p: number) => {
            getNotes(p, PAGE_SIZE).then(({ list }) => {
                tags = tags.concat(...list.map(i => i.tags).flat());
                newRecords = newRecords.concat(...list);
                setNoteList(newRecords);
                if (list.length == PAGE_SIZE) {
                    loopLoad(p + 1);
                }
            });
        };
        loopLoad(1);
    };

    const onSaveNote = (newRecord: Record) => {
        setNoteList(
            noteList.map(i => {
                if (i.id == newRecord.id) return newRecord;
                return i;
            })
        );
        return blogServer.updateNote(newRecord.id, newRecord.content);
    };

    const onDeleteNote = (id: number) => {
        return blogServer.deleteNote(id).then(() => {
            setNoteList(noteList.filter(note => note.id != id));
        });
    };

    const onAddNote = () => {
        if (!addRecotdTextareaRef.current || !addRecotdTextareaRef.current.value) return;
        blogServer.createNote(addRecotdTextareaRef.current.value).then(r => {
            addRecotdTextareaRef.current!.value = "";
            resize(0, addRecotdTextareaRef.current);
            const tags = [...r.content.matchAll(/#([^\s^#]+)[\s\r\n]/g)].map(i => i[1]);
            insertRecord({
                id: r.id,
                createdAt: new Date(r.created_at).toLocaleString(),
                updatedAt: new Date(r.updated_at).toLocaleString(),
                tags: tags.length > 0 ? tags : ["无"],
                content: r.content,
            });
        });
    };

    const handleTab = (e: React.KeyboardEvent<HTMLTextAreaElement>, ref: HTMLTextAreaElement | null) => {
        if (!ref) return;
        const target = e.target as HTMLTextAreaElement;
        const content = target.value;
        const start = target.selectionStart;
        const end = target.selectionEnd;
        if (e.key === "Tab") {
            e.preventDefault();
            let newText = content.substring(0, start) + "\t" + content.substring(end);
            ref.value = newText;
            target.selectionStart = target.selectionEnd = start + 1;
        }
    };

    useEffect(() => {
        getAllNotes();
    }, [isEditor]);

    useEffect(() => {
        blogServer.authToken().then(({ result }) => {
            setIsEditor(result);
        });
    }, []);

    return (
        <div className="aranya">
            <Tags tags={tagList} selected={filter.tag} onClick={tag => onClickTag(tag)} />
            <HeatMap data={heatList} onClick={date => setFilter({ tag: null, date: date })} />
            {isEditor && (
                <div className="newRecord">
                    <Textarea className="editArea heti heti--classic" autoFocus ref={addRecotdTextareaRef} placeholder="..." onKeyDown={e => handleTab(e, addRecotdTextareaRef.current)} />
                    <button className="btn" onClick={onAddNote}>
                        <strong>记</strong>
                    </button>
                </div>
            )}
            <TImeline list={showList} isEditor={isEditor} onUpdate={onSaveNote} onDelete={onDeleteNote} />
        </div>
    );
};
