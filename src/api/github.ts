import request from 'umi-request';

const issueUrl = "https://api.github.com/repos/lzcers/docs/issues/114/comments";
const updateUrl = "https://api.github.com/repos/lzcers/docs/issues/comments";

function getToken() {
  return localStorage.getItem("myToken");
}

function getList(): Promise<{id: number, body: string, created_at: string, updated_at: string}[]> {
  if (!getToken()) return Promise.resolve([]);
  return request.get(issueUrl, {headers: {Authorization: `token ${getToken()}`}}).catch(e => {console.info("token check faild..."); return []});
}

function updateRecord(id: number, content: string) {
  const data = {
    body: content
  };
  return request.patch(`${updateUrl}/${id}`, {headers: {Authorization: `token ${getToken()}`}, data}).catch(e => {console.info("update record faild..."); return []});
}

function createRecord(content: string) {
  const data = {
    body: content,
  }
  return request.post(issueUrl, {headers: {Authorization: `token ${getToken()}`}, data}).catch(e => {console.info("create record faild..."); return []});
}

export { getList, updateRecord, createRecord };