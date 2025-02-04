
import Contacts from '@/components/elements/Contacts/Contacts'
import styles from './Footer.module.scss'
import useMediaQuery from '@/hooks/useMediaQuery';
import Socials from '@/components/elements/Socials/Socials';
import { categories } from '../Header';


const Footer = () =>{
    const isMobile = useMediaQuery('(max-width: 768px)');

    return(
        <>
        {!isMobile ?
                <footer className={styles.footer}>
                <div>
                    
                        <h2>О БЮРО</h2>
                    <div>
                        <ul>
                            <li><a>О НАС</a></li>
                            <li><a>НАГРАДЫ</a></li>
                            <li><a>ПРЕССА</a></li>
                        </ul>
                        <ul>
                            <li><a>КОМАНДА</a></li>
                            <li><a>КЛИЕНТЫ</a></li>
                            <li><a>ВАКАНСИИ</a></li>
                        </ul>
                    </div>
                    {isMobile && <Contacts/>}
                </div>
                <div>
                    <h2>ПРОЕКТЫ</h2>
                    {/* <ul>
                        {Object.keys(categories).map((item:string)=>(
                            <li>
                                <a>{categories[item]}</a>
                            </li>
                        ))}
                    </ul> */}
                    <div>
                    <ul>
                        <li>МАСТЕРПЛАНЫ</li>
                        <li>ГОСТИНИЦЫ</li>
                        <li>ЖИЛЬЕ</li>
                        <li>ПОСЕЛКИ/ВИЛЛЫ</li>
                        <li>ОФИСЫ</li>
                        <li>КУЛЬТУРА</li>
                    </ul>
                    <ul>
                    <li>МЕДИЦИНА</li>
    
                        <li>ОБРАЗОВАНИЕ</li>
                        <li>СПОРТ</li>
                        <li>ТОРГОВЛЯ</li>
                        <li>ТРАНСПОРТ</li>
                        <li>БЛАГОУСТРОЙСТВО</li>
    
                    </ul>
                    </div>
    
                </div>
                {!isMobile && <Contacts/>}
                {isMobile &&
                    <div className={styles.footer__socials}>
                        <Socials/>
                    </div>
                }
            </footer>
            :
            <footer className={`${styles.footer} ${styles.footer__tempmobile}`}>
            <div>
                
                    <h2>О БЮРО</h2>
                <div>
                    <ul>
                        <li><a>О НАС</a></li>
                        <li><a>НАГРАДЫ</a></li>
                        <li><a>ПРЕССА</a></li>
                        <li><a>КОМАНДА</a></li>
                        <li><a>КЛИЕНТЫ</a></li>
                        <li><a>ВАКАНСИИ</a></li>
                    </ul>
                </div>
                {isMobile && <Contacts/>}
            </div>
            <div>
                <h2>ПРОЕКТЫ</h2>
                {/* <ul>
                    {Object.keys(categories).map((item:string)=>(
                        <li>
                            <a>{categories[item]}</a>
                        </li>
                    ))}
                </ul> */}
                <div>
                <ul>
                    <li>МАСТЕРПЛАНЫ</li>
                    <li>ГОСТИНИЦЫ</li>
                    <li>ЖИЛЬЕ</li>
                    <li>ПОСЕЛКИ/ВИЛЛЫ</li>
                    <li>ОФИСЫ</li>
                    <li>КУЛЬТУРА</li>
                    <li>МЕДИЦИНА</li>
                    <li>ОБРАЗОВАНИЕ</li>
                    <li>СПОРТ</li>
                    <li>ТОРГОВЛЯ</li>
                    <li>ТРАНСПОРТ</li>
                    <li>БЛАГОУСТРОЙСТВО</li>
                </ul>
                </div>

            </div>
            {!isMobile && <Contacts/>}
            {isMobile &&
                <div className={styles.footer__socials}>
                    <Socials/>
                </div>
            }
        </footer>
        }
        </>

    )
}

export default Footer