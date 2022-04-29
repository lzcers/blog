import request from 'umi-request';

const apiUrl = "https://api.ksana.net";

interface Note {
  id: number;
  content: string;
  created_at: string; 
  updated_at: string;
};

function getToken() {
  return localStorage.getItem("myToken") || '';
}
interface BlogNotes {
  getNoteList(pageNumber?: number): Promise<Note[]>;
  updateNote(id: number, content: string): Promise<unknown>;
  createNote(content: string): Promise<Note>;
  deleteNote(id: number): Promise<unknown>;
}

class BlogServer implements BlogNotes {

  getNoteList(pageNumber?: number): Promise<Note[]> {
    return request.get(apiUrl + '/get_all_notes');
  }

  updateNote(id: number, content: string): Promise<unknown> {
    const token = getToken();
    return request.post(apiUrl + '/update_note', {data: { id, content },  headers: { token } });
  }

  createNote(content: string, created_at?: string, updated_at?: string): Promise<Note> {
    const token = getToken();
    return request.post(apiUrl + '/add_note', {data: { content, created_at, updated_at }, headers: { token } });
  }
  deleteNote(id: number): Promise<unknown> {
    const token = getToken();
    return request.post(apiUrl + '/delete_note', {data: { id }, headers: { token } });
  }
}

const blogServer = new BlogServer();

export default blogServer;