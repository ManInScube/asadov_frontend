import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import styles from './Grid.module.scss'
import { useEffect, useState } from 'react'
import { setCurrentProject } from '@/lib/features/projects'
import GridSkeleton from '@/components/elements/GridSkeleton/GridSkeleton'
import useMediaQuery from '@/hooks/useMediaQuery'


type Item={
    title: string,
    size: number,
    cover: {}
}
interface IGridProps{
    items: Item[]
}

const ArrowUp = <svg width="39" height="122" viewBox="0 0 39 122" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.292 120.172C23.7285 120.172 27.6707 119.527 30.4629 116.675C33.3362 113.74 35.2991 108.168 36.6299 97.292C36.6211 90.7169 35.624 85.5993 33.2861 82.1494C31.02 78.8057 27.3299 76.7969 21.2822 76.7969C9.48221 76.7969 1.5002 86.7535 1.5 99.5879C1.5 106.182 2.59991 111.329 5.0498 114.796C7.42645 118.159 11.2408 120.172 17.292 120.172Z" stroke="black" stroke-width="3"/>
<path d="M18.3456 0.939331C18.9314 0.353546 19.8811 0.353546 20.4669 0.939331L30.0129 10.4853C30.5986 11.0711 30.5986 12.0208 30.0129 12.6066C29.4271 13.1924 28.4773 13.1924 27.8915 12.6066L19.4063 4.12132L10.921 12.6066C10.3352 13.1924 9.38544 13.1924 8.79965 12.6066C8.21386 12.0208 8.21386 11.0711 8.79965 10.4853L18.3456 0.939331ZM17.9062 99.0312L17.9063 1.99999H20.9063L20.9062 99.0312H17.9062Z" fill="black"/>
</svg>;






const ArrowUpMobile = <svg width="23" height="64" viewBox="0 0 23 64" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.9766 62.5C14.692 62.5 16.7094 62.1091 18.1182 60.6572C19.6125 59.1169 20.7309 56.0788 21.499 49.7686C21.4902 45.9964 20.9157 43.1822 19.6758 41.3359C18.5094 39.5993 16.602 38.5001 13.2793 38.5C6.92915 38.5 2.5001 43.8995 2.5 51.1426C2.5 54.936 3.13162 57.7772 4.43555 59.6396C5.66542 61.3961 7.65002 62.5 10.9766 62.5Z" stroke="#73A533" stroke-width="3"/>
<path d="M10.6073 0.939676C11.1931 0.353889 12.1428 0.353889 12.7286 0.939676L22.2746 10.4856C22.8604 11.0714 22.8604 12.0212 22.2746 12.6069C21.6888 13.1927 20.739 13.1927 20.1533 12.6069L11.668 4.12166L3.18269 12.6069C2.5969 13.1927 1.64715 13.1927 1.06137 12.6069C0.475581 12.0212 0.475581 11.0714 1.06137 10.4856L10.6073 0.939676ZM11.668 50.3496H10.168L10.168 2.00034H11.668H13.168L13.168 50.3496H11.668Z" fill="#73A533"/>
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
    const isMobile = useMediaQuery('(max-width: 768px)');

  
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
                <a onClick={scrollUp} className={`${styles.arrowUp} ${!isMobile && styles.arrowUp_inversion}`}>
                  {isMobile ? ArrowUpMobile : ArrowUp}
                </a>
                {visibleTiles.map((item,index)=>(
                <a key={item.documentId} className={`${styles.gridItem} ${size.get(item.size ?? 2)}`}
                style={{ animationDelay: `${index * 0.1}s` }} // Задержка для плавности
                onClick={()=>dispatch(setCurrentProject(item.id))}
                href={item?.type === 'articles' ? item.link : `/project/${item.documentId}`}
                >
                   <img src={`https://testinscube.ru${item?.type ==='articles' ? item.cover?.[0].formats?.large?.url : item.cover?.formats?.large?.url}`} alt="" />
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