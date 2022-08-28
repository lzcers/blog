import { useRef, useState } from "react";
import metaMarked from "@/utils/mdRender";
import Textarea from "react-expanding-textarea";

export interface Record {
    id: number;
    tags: string[];
    createdAt: string;
    updatedAt: string;
    content: string;
}

interface TimelineProps {
    list: Record[];
    isEditor?: boolean;
    onUpdate: (record: Record) => Promise<unknown>;
    onDelete: (id: number) => Promise<unknown>;
}

export default (props: TimelineProps) => {
    const { list, isEditor = false, onUpdate, onDelete } = props;
    const [confirmAction, setConfirmAction] = useState<number | null>(null);
    const editTextareaRef = useRef<HTMLTextAreaElement>(null);
    const [editable, setEditable] = useState<number | null>(null);

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

    const onSaveRecord = (r: Record) => {
        if (!editTextareaRef.current) return;
        const newRecord = { ...r, content: editTextareaRef.current.value, tags: [...editTextareaRef.current.value.matchAll(/#([^#^\s]+)[\s\r\n]/g)].map(i => i[1]) };
        onUpdate(newRecord).then(() => setEditable(null));
    };

    const onDeleteRecord = (id: number) => {
        onDelete(id).then(() => {
            setEditable(null);
            setConfirmAction(null);
        });
    };

    return (
        <div className="timeline">
            {list.map(r => {
                return (
                    <div className="record" key={r.id}>
                        {editable != r.id ? (
                            <div className="content heti heti--classic" dangerouslySetInnerHTML={{ __html: metaMarked(r.content).html }}></div>
                        ) : (
                            <Textarea
                                className="editArea heti heti--classic"
                                autoFocus
                                defaultValue={r.content}
                                ref={editTextareaRef}
                                placeholder="..."
                                onKeyDown={e => handleTab(e, editTextareaRef.current)}
                            />
                        )}
                        <div className="props">
                            {isEditor && !confirmAction && (
                                <div className="opt">
                                    {editable != r.id && (
                                        <button className="btn" onClick={() => setEditable(r.id)}>
                                            编辑
                                        </button>
                                    )}
                                    {editable != r.id && (
                                        <button className="btn" onClick={() => setConfirmAction(r.id)}>
                                            删除
                                        </button>
                                    )}
                                    {editable == r.id && (
                                        <button className="btn" onClick={() => onSaveRecord(r)}>
                                            保存
                                        </button>
                                    )}
                                    {editable == r.id && (
                                        <button className="btn" onClick={() => setEditable(null)}>
                                            取消
                                        </button>
                                    )}
                                </div>
                            )}
                            {isEditor && confirmAction == r.id && (
                                <div className="confirm">
                                    <button className="btn emphasis" onClick={() => onDeleteRecord(r.id)}>
                                        确定
                                    </button>
                                    <button className="btn" onClick={() => setConfirmAction(null)}>
                                        取消
                                    </button>
                                </div>
                            )}
                            <div className="datetime">
                                <span>{r.createdAt}</span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
