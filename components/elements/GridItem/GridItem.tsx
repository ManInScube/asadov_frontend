import styles from './GridItem.module.scss'

type Item = {
    size: number
    url: string
    title: string
    cover_subtitle: string
}
interface IGridItem{
    item: Item
}
const GridItem = ({item}:IGridItem) =>{
    return(
        // <div className={`${styles.gridItem} ${item.size.get(item.size)}`}>
        //     <img src={`http://localhost:1337/${item.cover.url}`}alt="" />
        //     <div className={styles.gridItem__info}>
        //     </div>
        //     <span className={styles.gridItem__title}>{item.title}</span>
        //     <span className={styles.gridItem__subtitle}>{item.cover_subtitle}</span>
        // </div>
        <></>
    )
}