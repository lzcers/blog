const indexFileUrl = "//ksana.net/articles/postsMetadata.json";
const galleryFileUrl = "//ksana.net/gallery.json";
const fileUrl = "//ksana.net/articles/";

export interface Post {
    id: number;
    fileName: string;
    title: string;
    tags: string[];
    publishDate: string;
}

export interface GalleryItem {
    url: string;
    datetime: string;
    location: string;
    description: string;
}

let metadata: Post[] | null = null;

const getPosts = async (): Promise<Post[]> => {
    if (metadata) {
        return Promise.resolve(metadata);
    }

    return fetch(indexFileUrl).then(res => {
        return res.json().then(data => {
            metadata = data;
            return data;
        });
    });
};

const getPostById = async (id: number) => {
    const getFileInfo = async () => {
        if (!metadata) {
            await getPosts();
        }
        const p = metadata!.find(p => p.id == id);
        return p;
    };
    const p = await getFileInfo();
    if (p) {
        return await getFile(p.fileName);
    } else {
        return "";
    }
};

const getFile = (fileName: string) => fetch(fileUrl + fileName).then(res => res.text());

const getGallery = () => fetch(galleryFileUrl).then(res => res.json());

export { getPosts, getPostById, getGallery };
