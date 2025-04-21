import Vacancy from '@/components/elements/Vacancy/Vacancy';
import styles from './Careers.module.scss'
import { useEffect, useState } from 'react';

const Careers = () =>{

    const [vacancies, setVacancies] = useState<[]>();

    useEffect(()=>{
        fetch('https://testinscube.ru/api/vacancies')
        .then((response)=>{
            return response.json()
        })
        .then((data)=>{
            setVacancies(data.data)
        })
    }, [])

    return(
        <main className={styles.careers}>
            <div className={styles.careers__container}>
                <div className={styles.careers__header}>
                    <svg width="57" height="53" viewBox="0 0 57 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M38.426 12.6187C26.8033 -2.05844 21.8657 -1.46032 12.5416 4.23956C3.21741 9.93944 3.84294 18.1927 9.79117 27.9231C15.7394 37.6536 26.673 41.8056 35.9972 36.1057C45.3213 30.4058 44.3742 22.3491 38.426 12.6187ZM41.9398 25.8267C42.1101 22.2013 40.5269 17.9844 37.6043 13.1919C31.8108 5.88332 27.8632 2.6374 24.377 1.75733C20.9659 0.896194 17.7301 2.23982 13.0631 5.09277C8.61528 7.81175 6.6766 11.0354 6.43702 14.6363C6.19182 18.3217 7.70973 22.6009 10.6444 27.4016C16.3905 36.8013 26.7519 40.5853 35.4756 35.2525C39.9214 32.5348 41.7735 29.3673 41.9398 25.8267Z" fill="#73A533"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M35.3572 14.2589C26.2259 2.72789 22.3467 3.1978 15.0212 7.6759C7.69572 12.154 8.18717 18.6382 12.8604 26.2829C17.5336 33.9275 26.1236 37.1896 33.4491 32.7115C40.7746 28.2334 40.0305 21.9036 35.3572 14.2589ZM37.9038 24.6257C38.0344 21.8453 36.8204 18.5815 34.5355 14.8321C29.9879 9.09692 26.9278 6.60521 24.2673 5.93357C21.682 5.28092 19.2105 6.28705 15.5428 8.52911C12.0943 10.6372 10.6217 13.1131 10.4391 15.8583C10.2508 18.6879 11.4164 22.0035 13.7136 25.7613C18.1847 33.0753 26.2024 35.9693 32.9275 31.8583C36.374 29.7514 37.7772 27.3211 37.9038 24.6257Z" fill="#73A533"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M43.0675 52.3507L33.2774 37.207L34.1172 36.6641L43.9073 51.8078L43.0675 52.3507Z" fill="#73A533"/>
                    </svg>
                    <h2>_ВАКАНСИИ</h2>
                </div>
                {vacancies&&vacancies?.map((item, index)=>(
                    <Vacancy index={index} title={item.title} description={item.description} id={item.id}/>
                ))}
            </div>
        </main>
    )
}

export default Careers;