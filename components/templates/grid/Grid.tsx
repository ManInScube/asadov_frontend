import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import styles from './Grid.module.scss'
import { useEffect, useState } from 'react'
import { setCurrentProject } from '@/lib/features/projects'


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

const Grid = ({items}: IGridProps) =>{
    const list = useAppSelector(state=>state.projectsSlice.list)
    const dispatch = useAppDispatch();
    const [visibleTiles, setVisibleTiles] = useState<any[]>([]);
    useEffect(() => {
        // Пошаговое добавление плиток
        setVisibleTiles([])
        list.forEach((tile, index) => {
          setTimeout(() => {
            setVisibleTiles((prev) => [...prev, tile]);
          }, index * 100); // Задержка 100ms между плитками
        });
      }, [list]);
    // console.log(list)
    return(
        // <div className={styles.gridContainer}>
        //     {items&&items.map(item=>(
        //         <div className={`${styles.gridItem} ${size.get(item.size)}`}>
        //             {/* <h1>{item.title}</h1> */}
        //             <img src={`http://localhost:1337/${item.cover?.url}`} alt="" />
        //         </div>
        //     ))}

        // </div>
            // <div className={styles.gridContainer}>
            //     <div className={`${styles.gridItem} ${size.get(3)}`}>
            //        <img src="http://localhost:1337//uploads/airport_243ca2e07a.png"alt="" />
            //        <span className={styles.gridItem__title}>Title</span>
            //        <span className={styles.gridItem__subtitle}>Subtitle</span>
            //     </div>
            //     <div className={`${styles.gridItem} ${size.get(3)}`}>
            //        <img src="http://localhost:1337//uploads/airport_243ca2e07a.png"alt="" />
            //     </div>
            //     <div className={`${styles.gridItem} ${size.get(4)}`}>
            //        <img src="http://localhost:1337//uploads/airport_243ca2e07a.png"alt="" />
            //     </div>
            //     <div className={`${styles.gridItem} ${size.get(1)}`}>
            //        <img src="http://localhost:1337//uploads/airport_243ca2e07a.png"alt="" />
            //     </div>
            //     <div className={`${styles.gridItem} ${size.get(1)}`}>
            //        <img src="http://localhost:1337//uploads/airport_243ca2e07a.png"alt="" />
            //     </div>
            // </div>

            <div className={styles.gridContainer}>
                {list&&visibleTiles.map((item,index)=>(
                <a key={item.documentId} className={`${styles.gridItem} ${size.get(item.size)}`}
                style={{ animationDelay: `${index * 0.1}s` }} // Задержка для плавности
                onClick={()=>dispatch(setCurrentProject(item.id))}
                href={`/project/${item.documentId}`}
                >
                   <img src={`https://testinscube.ru${item.cover?.url}`}alt="" />
                   <div className={styles.gridItem__info}>
                   </div>
                   <span className={styles.gridItem__title}>{item.title}</span>
                   <span className={styles.gridItem__subtitle}>{item.cover_subtitle}</span>
                </a>
                ))}
            </div>
    )
}

export default Grid