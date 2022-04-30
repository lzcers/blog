import request from 'umi-request';
const indexFileUrl = '//oss.ksana.net/articles/postList.json'
const fileUrl = '//oss.ksana.net/articles/'
const galleryFileUrl = '//oss.ksana.net/gallery.json';

export interface Post {
    id: number;
    file_name: string;
    title: string;
    tags: string[];
    publish_date: string;
};

export interface GalleryItem {
    url: string;
    datetime: string;
    location: string;
    description: string;
  }

const getTags = () =>
    getMetadata().then((res) => [
        ...new Set(res.map((p) => p.tags).reduce((pre, cur) => pre.concat(cur))),
    ]);

const getPosts = () => getMetadata();

const getPostById = async (id: number) => {
    const metadata = await getPosts();
    const p = metadata.find(p => p.id == id);
    if (p) {
        return await getFile(p.file_name);
    } else {
        return "";
    }
};

const getFile = (fileName: string) => request.get(fileUrl + fileName);

const getMetadata = () => 
    request.get<(Omit<Post, 'tags'> & {tags: string})[]>(indexFileUrl)
    .then(data => data.map(post => {
        const tags = post.tags.split('|').map((e) => e.trim());
        return {...post, tags};
    }));

const getGallery = () => request.get<GalleryItem[]>(galleryFileUrl);

export { getPosts, getTags, getPostById, getGallery }
