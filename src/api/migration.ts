import { getList } from "./github";
import blogServer from "./server";

type Record = { content: string; createdAt: string; updatedAt: string };

export default function migrationData() {
    let newRecords: Record[] = [];
    const totalNumber = 62;
    const PAGE_SIZE = 30;
    let page = totalNumber % PAGE_SIZE != 0 ? Math.floor(totalNumber / PAGE_SIZE) + 1 : totalNumber / PAGE_SIZE;

    const getRecords = (pageNumber?: number) => {
        return getList(pageNumber).then(data => {
            return data
                .map(item => {
                    return {
                        createdAt: new Date(item.created_at).toLocaleString(),
                        updatedAt: new Date(item.updated_at).toLocaleString(),
                        content: item.body,
                    };
                })
                .reverse();
        });
    };

    new Promise<Record[]>((resolve, reject) => {
        const loopLoad = (p: number) => {
            if (p > 0) {
                getRecords(p).then(r => {
                    newRecords = newRecords.concat(...r);
                    loopLoad(--p);
                });
            } else {
                resolve(newRecords);
            }
        };
        loopLoad(page);
    }).then(list => {
        list.map(note => {
            blogServer.createNote(note.content, note.createdAt, note.updatedAt);
        });
    });
}
