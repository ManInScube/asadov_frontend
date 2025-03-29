import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import styles from './Grid.module.scss'
import { useEffect, useState } from 'react'
import { setCurrentProject } from '@/lib/features/projects'
import GridSkeleton from '@/components/elements/GridSkeleton/GridSkeleton'


type Item={
    title: string,
    size: number,
    cover: {}
}
interface IGridProps{
    items: Item[]
}

const size = new Map([
    [4, styles.large],
    [3, styles.medium_vertical],
    [2, styles.medium_horizontal],
    [1, styles.small]
])

async function checkImageExists(url) {
    try {
      const response = await fetch(url, { method: "HEAD" });
      return response.ok; // true, если файл существует (статус 200)
    } catch (error) {
      return false; // Ошибка сети или сервер не отвечает
    }
  }
  
  // Пример использования:
  checkImageExists("https://example.com/image.webp").then((exists) => {
    console.log(exists ? "Изображение найдено" : "Изображение не существует");
  });
  const ITEMS_PER_BATCH = 15;

const Grid = ({items}: IGridProps) =>{
    const list = useAppSelector(state=>state.projectsSlice.list)
    const dispatch = useAppDispatch();
    const [visibleTiles, setVisibleTiles] = useState<any[]>([]);
    const [batchIndex, setBatchIndex] = useState(0);
  
    useEffect(() => {
      setVisibleTiles([]);
      setBatchIndex(0);
    }, [list]);
  
    useEffect(() => {
      if (batchIndex * ITEMS_PER_BATCH >= list.length) return;
    
      const start = batchIndex * ITEMS_PER_BATCH;
      const end = start + ITEMS_PER_BATCH;
      const batch = list.slice(start, end); // Берем только новую партию
    
      batch.forEach((tile, index) => {
        setTimeout(() => {
          setVisibleTiles((prev) => [...prev, tile]); // Добавляем только новые элементы
        }, index * 100);
      });
    }, [batchIndex, list]);
  
    useEffect(() => {
      const handleScroll = () => {
        if (
          window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
          visibleTiles.length < list.length
        ) {
          setBatchIndex((prev) => prev + 1);
        }
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, [visibleTiles, list]);

    return(

        <>
          {visibleTiles.length>0?
            <div className={styles.gridContainer}>
                {visibleTiles.map((item,index)=>(
                <a key={item.documentId} className={`${styles.gridItem} ${size.get(item.size)}`}
                style={{ animationDelay: `${index * 0.1}s` }} // Задержка для плавности
                onClick={()=>dispatch(setCurrentProject(item.id))}
                href={`/project/${item.documentId}`}
                >
                   <img src={`https://testinscube.ru${item.cover?.formats?.large?.url}`} alt="" />
                   <div className={styles.gridItem__info}>
                   </div>
                   <span className={styles.gridItem__title}>{item.title}</span>
                   <span className={styles.gridItem__subtitle}>{item.cover_subtitle}</span>
                </a>
                ))}
            </div>
            :
            <GridSkeleton/>
            }
        </>

    )
}

export default Grid