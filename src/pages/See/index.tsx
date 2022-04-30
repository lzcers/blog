
import { GalleryItem, getGallery } from '@/api';
import { useCallback, useEffect, useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import './styles.less';

export default () => {
  const [imgList, setImgList] = useState<GalleryItem[]>([]);

  useEffect(() => {
    getGallery().then(list => {
      setImgList(list);
    })
  }, []);

  const picDescRender = useCallback((index: number) => {
    const item = imgList[index];
    return (
      <div className="overlay">
        <div>时间：{item.datetime}</div>
        <div>地点：{item.location}</div>
        <div>{item.description}</div>
      </div>
    );
  }, [imgList]);

  return (
    <div className="gallery-container">
      <PhotoProvider
        overlayRender={({ index }) => picDescRender(index)}>
        {imgList.map((info, i) => {
          return (
            <PhotoView src={info.url} key={i}>
              <img className="img-thumbnail" src={info.url + "?x-oss-process=image/resize,h_240,m_lfit"} />
            </PhotoView>
          );
        })}

      </PhotoProvider>
    </div>
  );
}

