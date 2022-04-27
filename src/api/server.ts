import request from 'umi-request';

const apiUrl = "http://localhost:4443"


export type Note = { id: number, content: string, created_at: string, updated_at: string };

function getToken() {
  return localStorage.getItem("myToken");
}


interface BlogNotes {
  getRecordList(pageNumber?: number): Promise<Note[]>
  updateRecord(id: number, content: string): Promise<unknown>;
  createRecord(content: string): Promise<Note>;
}

class BlogServer implements BlogNotes {

  getRecordList(pageNumber?: number): Promise<Note[]> {
    return request.get(apiUrl + '/get_all_notes');
  }

  updateRecord(id: number, content: string): Promise<unknown> {
    return request.post(apiUrl + '/update_note', {data: { id, content }});
  }

  createRecord(content: string): Promise<Note> {
    return request.post(apiUrl + '/add_note', {data: { content }});
  }

}

const blogServer = new BlogServer();

export default blogServer;