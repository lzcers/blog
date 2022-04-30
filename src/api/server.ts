import request from 'umi-request';

const apiUrl = "https://api.ksana.net";
// const apiUrl = "http://localhost:4443";

interface Note {
  id: number;
  content: string;
  created_at: string; 
  updated_at: string;
};

interface NotesPage {
  total: number;
  page_size: number;
  page_number: number;
  list: Note[];
}

function getToken() {
  return localStorage.getItem("token") || '';
}

interface BlogNotes {
  getNoteList(pageNumber?: number): Promise<NotesPage>;
  updateNote(id: number, content: string): Promise<unknown>;
  createNote(content: string): Promise<Note>;
  deleteNote(id: number): Promise<unknown>;
  authToken(): Promise<{result: boolean}>;
}

class BlogServer implements BlogNotes {

  authToken(): Promise<{result: boolean}> {
    const token = getToken();
    return request.get(apiUrl + '/auth_token', { headers: { token } });
  }

  getNoteList(pageNumber?: number, pageSize?: number): Promise<NotesPage> {
    return request.post(apiUrl + '/get_notes', {data: { page_number: pageNumber ?? 1, page_size: pageSize ?? 100} });
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