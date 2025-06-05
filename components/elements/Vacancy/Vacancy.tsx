import RichTextRenderer from '@/components/modules/RichTextRenderer/RichTextRenderer'
import styles from './Vacancy.module.scss'

interface IVacancy{
    index: number
    title: string
    description: string
    id: number
}

const Vacancy = ({index,title,description, id}:IVacancy) =>{
    return(
        <div className={styles.vacancy} id={id}>
            <div className={styles.vacancy__left}>
                <div className={styles.vacancy__index}>
                    <span>[{`0${index + 1}`}]</span>
                </div>
                <div>
                </div>
            </div>
            <div className={styles.vacancy__right}>
                <div className={styles.vacancy__title}><span>{title}</span></div>
                <div className={styles.vacancy__description}>
                    <RichTextRenderer content={description}/>
                </div>
            </div>
        </div> 
    )
}

export default Vacancy;