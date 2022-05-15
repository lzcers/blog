import request from "umi-request";

const commentsUrl = "https://api.github.com/repos/lzcers/docs/issues/114/comments";
const updateUrl = "https://api.github.com/repos/lzcers/docs/issues/comments";
const issuesUrl = "https://api.github.com/repos/lzcers/docs/issues/114";

function getToken() {
    return localStorage.getItem("token");
}

function getIssuesInfo() {
    if (!getToken()) return Promise.resolve([]);
    return request.get(issuesUrl, { headers: { Authorization: `token ${getToken()}` } }).catch(e => {
        console.info("token check faild...");
        return [];
    });
}

function getList(pageNumber: number = 1): Promise<{ id: number; body: string; created_at: string; updated_at: string }[]> {
    if (!getToken()) return Promise.resolve([]);
    return request.get(commentsUrl, { headers: { Authorization: `token ${getToken()}` }, params: { page: pageNumber } }).catch(e => {
        console.info("token check faild...");
        return [];
    });
}

function updateRecord(id: number, content: string) {
    const data = {
        body: content,
    };
    return request.patch(`${updateUrl}/${id}`, { headers: { Authorization: `token ${getToken()}` }, data }).catch(e => {
        console.info("update record faild...");
        return [];
    });
}

function createRecord(content: string): Promise<{ id: number; body: string; created_at: string; updated_at: string }> {
    const data = {
        body: content,
    };
    return request.post(commentsUrl, { headers: { Authorization: `token ${getToken()}` }, data }).catch(e => {
        console.info("create record faild...");
        return [];
    });
}

export { getIssuesInfo, getList, updateRecord, createRecord };
