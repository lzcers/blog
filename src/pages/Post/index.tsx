import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Article from '@/components/Article';
import parseMarkdown from '@/utils/mdRender';
import { getPostById } from '@/api';


interface PostProps {
  html: string;
  markdown: string;
  meta: { Title: string, PublishDate: string, Tags: string };
  tocTree: Object;
}

export default () => {
  const [post, setPost] = useState<PostProps>();
  const [loadingFlag, setLoadingFlag] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    getPostById(Number(id)).then((data) => {
      const result = parseMarkdown(data);
      if (!result) return;
      setPost(result);
      setLoadingFlag(false);
    });
  }, [id]);

  if (loadingFlag || !post) return <h3>Loading...</h3>

  return (
    <Article
      id={Number(id)}
      title={post.meta.Title}
      tags={post.meta.Tags}
      publishDate={post.meta.PublishDate}
      content={post.html}
      toc={post.tocTree}
      mode={true}
    />
  );
}