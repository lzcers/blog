import { useCallback, useMemo, useRef, useState } from "react";
import { resize } from "react-expanding-textarea";
import { HeatPoint } from "./HeatMap";

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
    year: number | null;
}

export default () => {
    const PAGE_SIZE = 100;
    const [noteList, setNoteList] = useState<Record[]>([]);
    const [filter, setFilter] = useState<Filter>({ date: null, tag: null, year: new Date().getFullYear() });
    const addRecotdTextareaRef = useRef<HTMLTextAreaElement>(null);

    // 派生状态
    const showList = useMemo(() => {
        const f = (r: Record) => {
            const { date, tag, year } = filter;
            return (
                (year ? r.createdAt.includes(year + "") : true) && (date ? r.createdAt.includes(date) : true) && (tag ? r.tags.includes(tag) : true)
            );
        };
        const sortFn = (a: Record, b: Record) => {
            if (a.tags.includes("置顶") && b.tags.includes("置顶")) return 0;
            else if (a.tags.includes("置顶")) return -1;
            else return 1;
        };

        if (filter.date || filter.tag || filter.year) {
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
            if (f.tag == tag) return { date: null, tag: null, year: null };
            else return { date: null, year: null, tag };
        });
    };

    const getNotes = async (pageNumber?: number, pageSize?: number) => {
        return {
            total: 0,
            pageSize: 0,
            pageNumber: 0,
            list: [],
        };
        // return blogServer.getNoteList(pageNumber, pageSize).then(({ list, ...info }) => {
        //     let notes = list.map(item => {
        //         // 无标签的分配「无」标签
        //         const tags = [...item.content.matchAll(/#([^\s^#]+)[\s\r\n]/g)].map(i => i[1]);
        //         return {
        //             id: item.id,
        //             tags: tags.length > 0 ? tags : ["无"],
        //             createdAt: new Date(item.created_at).toLocaleString(),
        //             updatedAt: new Date(item.updated_at).toLocaleString(),
        //             content: item.content,
        //         };
        //     });
        //     return {
        //         total: info.total,
        //         pageSize: info.page_size,
        //         pageNumber: info.page_number,
        //         list: notes,
        //     };
        // });
    };

    const getAllNotes = () => {
        let newRecords: Record[] = [];
        let tags: string[] = [];
        const loopLoad = (p: number) => {
            getNotes(p, PAGE_SIZE).then(({ list }) => {
                tags = tags.concat(...list.map((i: Record) => i.tags).flat());
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
        return Promise.resolve();
        // return blogServer.updateNote(newRecord.id, newRecord.content);
    };

    const onDeleteNote = (id: number) => {
        return Promise.resolve();
        // return blogServer.deleteNote(id).then(() => {
        //     setNoteList(noteList.filter(note => note.id != id));
        // });
    };

    const onAddNote = () => {
        if (!addRecotdTextareaRef.current || !addRecotdTextareaRef.current.value) return;
        // blogServer.createNote(addRecotdTextareaRef.current.value).then(r => {
        //     addRecotdTextareaRef.current!.value = "";
        //     resize(0, addRecotdTextareaRef.current);
        //     const tags = [...r.content.matchAll(/#([^\s^#]+)[\s\r\n]/g)].map(i => i[1]);
        //     insertRecord({
        //         id: r.id,
        //         createdAt: new Date(r.created_at).toLocaleString(),
        //         updatedAt: new Date(r.updated_at).toLocaleString(),
        //         tags: tags.length > 0 ? tags : ["无"],
        //         content: r.content,
        //     });
        // });
    };

    const onKeyDownTab = (e: React.KeyboardEvent<HTMLTextAreaElement>, ref: HTMLTextAreaElement | null) => {
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

    return {
        showList,
        tagList,
        heatList,
        filter,
        addRecotdTextareaRef,
        getAllNotes,
        setFilter,
        onClickTag,
        onAddNote,
        onSaveNote,
        onDeleteNote,
        onKeyDownTab,
    };
};
