import request from 'umi-request';
import parseMarkdown from '@/utils/mdRender';

const localTagsUrl = 'https://ksana.oss-cn-shenzhen.aliyuncs.com/articles/tags.json'
const localfileUrl = 'https://ksana.oss-cn-shenzhen.aliyuncs.com/articles/'

export interface Post {
    id: number;
    file_name: string;
    title: string;
    tags: string[];
    publish_date: string;
};

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

const getFile = (fileName: string) => request.get(localfileUrl + fileName);

const getMetadata = () => 
    request.get<(Omit<Post, 'tags'> & {tags: string})[]>(localTagsUrl, {useCache: true})
    .then(data => data.map(post => {
        const tags = post.tags.split('|').map((e) => e.trim());
        return {...post, tags};
    }));



export { getPosts, getTags, getPostById }