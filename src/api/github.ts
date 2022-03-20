import request from 'umi-request';

const issueUrl = "https://api.github.com/repos/lzcers/docs/issues/114/comments";

function get_list(): Promise<{id: number, body: string, created_at: string, updated_at: string}[]> {
  if (!window.myToken) return Promise.resolve([]);
  return request.get(issueUrl, {headers: {Authorization: `token ${window?.myToken}`}}).catch(e => {console.info("token check faild..."); return []});
}


export { get_list };