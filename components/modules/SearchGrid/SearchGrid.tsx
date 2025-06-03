import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import styles from '@/components/templates/grid/Grid.module.scss'
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
  
const SearchGrid = ({items}: IGridProps) =>{
    const dispatch = useAppDispatch();

    return(

        <>
          {items?.length>0?
            <div className={styles.gridContainer}>
                {items.map((item,index)=>(
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

export default SearchGrid