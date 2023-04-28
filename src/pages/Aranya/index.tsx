import { useContext, useEffect } from "react";
import Textarea from "react-expanding-textarea";
import { globalState } from "@/main";
import Tags from "./tags";
import HeatMap from "./HeatMap";
import Timeline from "./timeline";
import useTimelineModel from "./timelineModel";
import "./aranya.less";

export default () => {
    const { isEditor, setIsEditor } = useContext(globalState)!;
    const timeLineModel = useTimelineModel();
    const { showList, tagList, heatList, filter, addRecotdTextareaRef } = timeLineModel;
    const { getAllNotes, setFilter, onClickTag, onKeyDownTab, onAddNote, onSaveNote, onDeleteNote } = timeLineModel;

    useEffect(() => {
        getAllNotes();
    }, [isEditor]);

    useEffect(() => {
        // blogServer.authToken().then(({ result }) => setIsEditor(result));
    }, []);

    return (
        <div className="aranya">
            <Tags tags={tagList} selected={filter.tag} onClick={tag => onClickTag(tag)} />
            <HeatMap
                data={heatList}
                onClick={date => setFilter({ tag: null, year: null, date: date })}
                onYearChange={year => setFilter({ tag: null, date: null, year })}
            />
            {isEditor && (
                <div className="newRecord">
                    <Textarea
                        className="editArea heti heti--classic"
                        autoFocus
                        ref={addRecotdTextareaRef}
                        placeholder="..."
                        onKeyDown={e => onKeyDownTab(e, addRecotdTextareaRef.current)}
                    />
                    <button className="btn" onClick={onAddNote}>
                        <strong>记</strong>
                    </button>
                </div>
            )}
            <Timeline list={showList} isEditor={isEditor} onUpdate={onSaveNote} onDelete={onDeleteNote} />
        </div>
    );
};
