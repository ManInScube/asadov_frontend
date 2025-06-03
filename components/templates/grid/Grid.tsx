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

const ArrowUp = <svg xmlns="http://www.w3.org/2000/svg" width="39" height="121" viewBox="0 0 39 121" fill="none">
<path d="M17.292 120.172C23.7227 120.172 28.0669 119.552 31.1777 116.375C34.3152 113.17 36.2995 107.265 37.6299 96.3525C37.6271 89.6874 36.6294 84.3005 34.1133 80.5879C31.6211 76.9108 27.5833 74.7969 21.2822 74.7969C8.77847 74.7969 0.500199 85.366 0.5 98.5879C0.5 105.258 1.60611 110.655 4.2334 114.373C6.83628 118.057 10.9898 120.172 17.292 120.172Z" stroke="white"/>
<path d="M19.0527 0.646439C19.248 0.451177 19.5645 0.451177 19.7598 0.646439L22.9418 3.82842C23.137 4.02368 23.137 4.34026 22.9418 4.53553C22.7465 4.73079 22.4299 4.73079 22.2347 4.53553L19.4063 1.7071L16.5778 4.53553C16.3826 4.73079 16.066 4.73079 15.8707 4.53553C15.6755 4.34026 15.6755 4.02368 15.8707 3.82842L19.0527 0.646439ZM19.4062 98.0312H18.9062L18.9063 0.999992H19.4063H19.9063L19.9062 98.0312H19.4062Z" fill="white"/>
</svg>;

const size = new Map([
    [4, styles.large],
    [3, styles.medium_vertical],
    [2, styles.medium_horizontal],
    [1, styles.small]
])
  
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

    const scrollUp = () =>{
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    return(

        <>
          {visibleTiles?.length>0?
            <div className={styles.gridContainer}>
                <a onClick={scrollUp} className={styles.arrowUp}>
                  {ArrowUp}
                </a>
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