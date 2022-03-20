import request from 'umi-request';

const issueUrl = "https://api.github.com/repos/lzcers/docs/issues/114/comments";

function get_list(): Promise<{id: number, body: string, created_at: string, updated_at: string}[]> {
  return request.get(issueUrl, {headers: {Authorization: `token ${window?.myToken}`}});
}


export { get_list };