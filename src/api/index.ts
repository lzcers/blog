import request from "umi-request";
const indexFileUrl = "//ksana.net/articles/postList.json";
const galleryFileUrl = "//ksana.net/gallery.json";
const fileUrl = "//ksana.net/articles/";

export interface Post {
    id: number;
    file_name: string;
    title: string;
    tags: string[];
    publish_date: string;
}

export interface GalleryItem {
    url: string;
    datetime: string;
    location: string;
    description: string;
}

type RawPost = Omit<Post, "tags"> & { tags: string | string[] };
let metadata: RawPost[] | null = null;

const getPosts = async (): Promise<Post[]> => {
    const transformData = (post: RawPost): Post => {
        if (Array.isArray(post.tags)) return { ...post } as Post
        const tags = post.tags.split(" ").map(e => e.trim());
        return { ...post, tags } as Post;
    };
    if (metadata) {
        return Promise.resolve(metadata.map(transformData));
    }

    return fetch(indexFileUrl).then(res => {
        return res.json().then(data => {
            metadata = data;
            return data.map(transformData);
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
        return await getFile(p.file_name);
    } else {
        return "";
    }
};

const getFile = (fileName: string) => request.get(fileUrl + fileName);

const getGallery = () => request.get<GalleryItem[]>(galleryFileUrl);

export { getPosts, getPostById, getGallery };
