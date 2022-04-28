import request from 'umi-request';

const apiUrl = "http://localhost:4443"

interface Note {
  id: number;
  content: string;
  created_at: string; 
  updated_at: string;
};

function getToken() {
  return localStorage.getItem("myToken");
}

interface BlogNotes {
  getNoteList(pageNumber?: number): Promise<Note[]>
  updateNote(id: number, content: string): Promise<unknown>;
  createNote(content: string): Promise<Note>;
}

class BlogServer implements BlogNotes {

  getNoteList(pageNumber?: number): Promise<Note[]> {
    return request.get(apiUrl + '/get_all_notes');
  }

  updateNote(id: number, content: string): Promise<unknown> {
    return request.post(apiUrl + '/update_note', {data: { id, content }});
  }

  createNote(content: string, created_at?: string, updated_at?: string): Promise<Note> {
    return request.post(apiUrl + '/add_note', {data: { content, created_at, updated_at }});
  }

}

const blogServer = new BlogServer();

export default blogServer;