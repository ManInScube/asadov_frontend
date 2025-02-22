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

const Grid = ({items}: IGridProps) =>{
    const list = useAppSelector(state=>state.projectsSlice.list)
    const dispatch = useAppDispatch();
    const [visibleTiles, setVisibleTiles] = useState<any[]>([]);
    useEffect(() => {
        // Пошаговое добавление плиток
        // setVisibleTiles([])
        list.forEach((tile, index) => {
          setTimeout(() => {
            setVisibleTiles((prev) => [...prev, tile]);
          }, index * 500); // Задержка 100ms между плитками
        });
      }, [list]);
    // console.log(list)
    return(

        <>
          {visibleTiles.length>0?
            <div className={styles.gridContainer}>
                {list&&visibleTiles.map((item,index)=>(
                <a key={item.documentId} className={`${styles.gridItem} ${size.get(item.size)}`}
                style={{ animationDelay: `${index * 0.1}s` }} // Задержка для плавности
                onClick={()=>dispatch(setCurrentProject(item.id))}
                href={`/project/${item.documentId}`}
                >
                   <img src={`https://testinscube.ru${item.cover?.url.replace(/\.[^.]+$/, "")}.webp`} alt="" />
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