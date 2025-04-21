import Employee from '@/components/elements/Employee/Employee';
import styles from './About.module.scss'
import { useEffect, useState } from 'react';
import Position from '@/components/elements/Position/Position';
import collage from './src/collage.png';
import asadovs from './src/asadovs.png'
import eugen from './src/eugen.png'
import olga from './src/olga.png'
import subbanner from './src/subbanner.png'


const About = () =>{
    const [employees, setEmployees] = useState<[]>();
    const [vacancies, setVacancies] = useState<[]>();

    useEffect(()=>{
        fetch('https://testinscube.ru/api/employees?populate=*')
        .then((response)=>{
            return response.json()
        })
        .then((data)=>{
            console.log(data.data)
            setEmployees(data.data)
        })
    
    }, [])

    useEffect(()=>{
        fetch('https://testinscube.ru/api/vacancies?populate=*')
        .then((response)=>{
            return response.json()
        })
        .then((data)=>{
            setVacancies(data.data)
        })
    }, [])

    return(
        <main className={styles.about}>
            <div className={styles.about__banner}>
                <img className={styles.about__bannerCollage} src={collage.src} alt="" />
                <div className={`${styles.about__bannerItem} ${styles.about__bannerAsadovs}`}>
                    <img src={asadovs.src} alt="" />
                </div>

                <div className={`${styles.about__bannerItem} ${styles.about__bannerEugen}`}>
                    <img src={eugen.src} alt="" />
                </div>
                <div className={`${styles.about__bannerItem} ${styles.about__bannerOlga}`}>
                    <img src={olga.src} alt="" />
                </div>
            </div>
            <div className={styles.about__info}>
                <div className={styles.about__container}>
                    <span>
                        <svg width="50" height="62" viewBox="0 0 50 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M34.4482 25.7533H44.4482C47.2097 25.7533 49.4482 27.9919 49.4482 30.7533V55.8351C49.4482 58.5965 47.2097 60.835 44.4482 60.835H36.721C33.9595 60.835 31.721 58.5965 31.721 55.835V6.00289C31.721 2.07959 27.4088 -0.31526 24.0783 1.75834L3.80557 14.3802C2.33948 15.293 1.44824 16.8977 1.44824 18.6247V55.835C1.44824 58.5965 3.68682 60.835 6.44824 60.835H28.5846" stroke="#73A533"/>
                        </svg>
                    </span>
                    <h2>_О НАС</h2>
                    <div>
                        <p>Архитектурное Бюро ASADOV c 1989 года разрабатывает проекты, различные по сложности и функциональному назначению — градостроительные комплексы, общественные, культурные и спортивные сооружения, многоэтажную и загородную жилую застройку, интерьеры и благоустройство.</p>

                        <p>История компании началась в 1989, когда Александр Асадов основал одну из первых персональных архитектурных мастерских. Сейчас он выполняет роль творческого руководителя. Директором Бюро является его сын, Андрей Асадов. На данный момент, Бюро имеет партнерские представительства в ОАЭ, Китае и других странах. Число постоянных сотрудников составляет около 90 человек.</p>
                    </div>
                </div>
            </div> 
            <div className={styles.about__container}>

            
                <div className={styles.about__infographics}>
                    <div className={`${styles.about__infographicsItem} ${styles.about__infographicsEfficiency}`}>
                        <h3>Эффетивность_</h3>
                        <p>В основе нашей работы - эффективная организация пространства и использование BIM-технологий. 35-летний опыт работы и слаженная команда позволяет добиваться необходимых результатов в сжатые сроки</p>
                    </div>
                    <div className={styles.about__infographicsGap}>

                    </div>
                    <div className={`${styles.about__infographicsItem} ${styles.about__infographicsCreativity}`}>
                        <h3>Творчество_</h3>
                        <p>В основе нашей работы - эффективная организация пространства и использование BIM-технологий. 35-летний опыт работы и слаженная команда позволяет добиваться необходимых результатов в сжатые сроки</p>
                    </div>
                    <div className={styles.about__infographicsGap}>

</div>
                    <div className={`${styles.about__infographicsItem} ${styles.about__infographicsPartnership}`}>
                        <h3>Творчество_</h3>
                        <p>В основе нашей работы - эффективная организация пространства и использование BIM-технологий. 35-летний опыт работы и слаженная команда позволяет добиваться необходимых результатов в сжатые сроки</p>
                    </div>
                </div>
            </div>
            <div className={styles.about__subbanner}>
                <img src={subbanner.src} alt="" />
            </div>
            <div className={styles.about__management}>
                <div className={styles.about__container}>
                    <span>
                        <svg width="57" height="61" viewBox="0 0 57 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23.7541 23.0272C23.7571 25.5729 24.1425 27.5699 25.0593 28.9227C25.9522 30.2402 27.4045 31.0241 29.7598 31.0241C34.3719 31.0241 37.4775 27.1309 37.4775 22.1443C37.4775 19.592 37.0523 17.5854 36.0922 16.2267C35.1566 14.9025 33.6571 14.1172 31.3006 14.1172C28.8157 14.1172 27.2617 14.3642 26.1583 15.4912C25.0278 16.6459 24.2679 18.8238 23.7541 23.0272Z" stroke="black"/>
                            <path d="M7.84201 7.90809L1.89622 51.063C1.23393 55.87 4.96899 60.1549 9.82134 60.1549H42.2159C46.2522 60.1549 49.6562 57.1482 50.1547 53.1429L55.5251 9.98793C56.1191 5.21453 52.3965 1 47.5863 1H15.7671C11.7708 1 8.38746 3.94915 7.84201 7.90809Z" stroke="#73A533"/>
                            <path d="M10.9245 9.40248L5.27351 50.3553C4.8589 53.3599 7.19345 56.0387 10.2266 56.0387H42.0323C44.5546 56.0387 46.6819 54.1601 46.9939 51.6571L52.098 10.7043C52.4699 7.72064 50.1432 5.08594 47.1364 5.08594H15.8776C13.3803 5.08594 11.2659 6.9286 10.9245 9.40248Z" stroke="#73A533"/>
                            <path d="M9.58301 50.1639C10.4594 46.4831 13.9999 39.1216 19.0478 37.0183C25.3577 34.3892 34.1342 34.4898 36.6628 37.0183C40.0807 40.4361 40.3436 44.6428 41.1323 50.1639" stroke="black"/>
                        </svg>
                    </span>
                    <h2>_РУКОВОДИТЕЛИ</h2>
                    <div className={styles.about__teamRow}>
                        {
                            employees&&employees
                            .filter((item)=>item.isManager===true)
                            .map((item)=>(
                                <Employee avatarPath={`https://testinscube.ru${item.avatar?.url}`} name={item.name} position={item.position} />
                            ))
                        }
                        
                    </div>
                </div>
            </div>
            <div className={styles.about__team}>
            <div className={styles.about__container}>
                <h2>_КОМАНДА</h2>
            </div>
            <div className={styles.about__teamRow}>
                        {
                            employees&&employees
                            .filter((item)=>item.isManager===false)
                            .map((item)=>(
                                <Employee avatarPath={`https://testinscube.ru${item.avatar?.url}`} name={item.name} position={item.position} />
                            ))
                        }
                    
                    </div>
            </div>
            <div className={styles.about__awards}></div>
            <div className={styles.about__clients}>
                <div className={styles.about__container}>
                    <svg width="93" height="53" viewBox="0 0 93 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.2082 13.7539C21.2113 17.3591 21.7544 20.2279 23.0825 22.1874C24.3868 24.112 26.5042 25.2381 29.8746 25.2381C36.5169 25.2381 40.9531 19.6274 40.9531 12.5223C40.9531 8.91065 40.3527 6.0322 38.9638 4.06648C37.5993 2.13533 35.4171 1.00781 32.0456 1.00781C28.5456 1.00781 26.2739 1.35074 24.6541 3.00518C23.0073 4.6872 21.9321 7.82406 21.2082 13.7539Z" stroke="#73A533"/>
                        <path d="M1.44824 51.999C2.68302 46.813 7.67151 36.4408 14.7838 33.4773C23.6742 29.773 36.0401 29.9147 39.6028 33.4774C44.4185 38.2929 44.7889 44.22 45.9002 51.999" stroke="#73A533"/>
                        <path d="M72.832 35.8954C71.5527 37.9618 66.3844 42.0946 59.0157 43.2754C49.8048 44.7514 36.9931 44.6949 33.3019 43.2754C28.3127 41.3566 27.9289 38.995 26.7775 35.8954" stroke="#73A533"/>
                        <path d="M67.1955 13.2461C67.1986 16.8513 67.7417 19.72 69.0698 21.6796C70.3741 23.6041 72.4915 24.7303 75.8619 24.7303C82.5042 24.7303 86.9404 19.1196 86.9404 12.0145C86.9404 8.40284 86.34 5.52439 84.9511 3.55867C83.5866 1.62751 81.4044 0.5 78.0329 0.5C74.5329 0.5 72.2612 0.842928 70.6414 2.49737C68.9946 4.17939 67.9194 7.31625 67.1955 13.2461Z" stroke="#73A533"/>
                        <path d="M47.4346 51.4912C48.6693 46.3051 53.6578 35.933 60.7702 32.9695C69.6605 29.2652 82.0264 29.4069 85.5892 32.9696C90.4048 37.7851 90.7752 43.7122 91.8865 51.4912" stroke="#73A533"/>
                    </svg>

                    <h2>_КЛИЕНТЫ</h2>
                </div>
                <div className={styles.cients__row}>
                    
                </div>
            </div>
            <div className={styles.about__careers}>
                <div className={styles.about__container}>
                <svg width="57" height="53" viewBox="0 0 57 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M38.426 12.6187C26.8033 -2.05844 21.8657 -1.46032 12.5416 4.23956C3.21741 9.93944 3.84294 18.1927 9.79117 27.9231C15.7394 37.6536 26.673 41.8056 35.9972 36.1057C45.3213 30.4058 44.3742 22.3491 38.426 12.6187ZM41.9398 25.8267C42.1101 22.2013 40.5269 17.9844 37.6043 13.1919C31.8108 5.88332 27.8632 2.6374 24.377 1.75733C20.9659 0.896194 17.7301 2.23982 13.0631 5.09277C8.61528 7.81175 6.6766 11.0354 6.43702 14.6363C6.19182 18.3217 7.70973 22.6009 10.6444 27.4016C16.3905 36.8013 26.7519 40.5853 35.4756 35.2525C39.9214 32.5348 41.7735 29.3673 41.9398 25.8267Z" fill="#73A533"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M35.3572 14.2589C26.2259 2.72789 22.3467 3.1978 15.0212 7.6759C7.69572 12.154 8.18717 18.6382 12.8604 26.2829C17.5336 33.9275 26.1236 37.1896 33.4491 32.7115C40.7746 28.2334 40.0305 21.9036 35.3572 14.2589ZM37.9038 24.6257C38.0344 21.8453 36.8204 18.5815 34.5355 14.8321C29.9879 9.09692 26.9278 6.60521 24.2673 5.93357C21.682 5.28092 19.2105 6.28705 15.5428 8.52911C12.0943 10.6372 10.6217 13.1131 10.4391 15.8583C10.2508 18.6879 11.4164 22.0035 13.7136 25.7613C18.1847 33.0753 26.2024 35.9693 32.9275 31.8583C36.374 29.7514 37.7772 27.3211 37.9038 24.6257Z" fill="#73A533"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M43.0675 52.3507L33.2774 37.207L34.1172 36.6641L43.9073 51.8078L43.0675 52.3507Z" fill="#73A533"/>
                    </svg>
                    <h2>_ВАКАНСИИ</h2>
                </div>
                <div className={styles.about__careersRow}>
                    {vacancies&&vacancies?.map((item,index)=>(
                        <Position url={`/#${item?.id}`} image={'/'} title={item?.title} id={item?.id}/>
                    ))}
                </div>
            </div>
            <div className={styles.about__contacts}></div>
        </main>
    )
}

export default About;