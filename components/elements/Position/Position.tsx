import Link from 'next/link'
import styles from './Position.module.scss'
import img from './image.png'

interface IEmployee{
    url: string
    image?: string
    title: string
    id: number
}

const Position = ({url,image,title, id}:IEmployee) =>{
    return(
        <Link href={`/careers#${id}`} className={styles.position}>
            <div className={styles.position__img}>
                <img src={img.src} alt="" />
            </div>
            <div className={styles.position__title}>
                <p>{title}</p>
                <div className={styles.position__arrow}></div>
            </div>
        </Link>
    )
}

export default Position;