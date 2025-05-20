
import Contacts from '@/components/elements/Contacts/Contacts'
import styles from './Footer.module.scss'
import useMediaQuery from '@/hooks/useMediaQuery';
import Socials from '@/components/elements/Socials/Socials';
// import { categories } from '../Header';
import { categories, categories2 } from '../HeaderNew/index'
import { useAppSelector } from '@/lib/hooks';
import { useState } from 'react';


const Footer = () =>{
    const isMobile = useMediaQuery('(max-width: 768px)');
    const language = useAppSelector(state=>state.projectsSlice.language)


    const currentLanguage = language === 'RU' || language === 'EN' ? language : 'RU';
    const currentCategories = categories[currentLanguage];
    const currentCategories2 = categories2[currentLanguage];
    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
      };
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
                <div className={styles.footer__typology}>
                    <h2>АРХИТЕКТУРА</h2>
                    <ul>
                        {Object.entries(currentCategories).map(([key, value], index: number)=>(
                            <li>
                                <a href={`/?category=${key}`}>{value}</a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.footer__typology}>
                    <h2>ИНТЕРЬЕРЫ</h2>
                    <ul>
                        {Object.entries(currentCategories2).map(([key, value], index: number)=>(
                            <li>
                                <a href={`/?category=${key}`}>{value}</a>
                            </li>
                        ))}
                    </ul>
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
            {isMobile && 
            <div>
                <div className={styles.footer__typology}>
                    <h2 onClick={() => toggleSection("architecture")} className={styles.title}>
                    АРХИТЕКТУРА <span>
                        {/* {openSection === "architecture" ? "▲" : "▼"} */}
                            <svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L5.5 5L10 1" stroke="#73A533"/>
                            </svg>

                        </span>
                    </h2>
                    <ul className={`${styles.list} ${openSection === "architecture" ? styles.open : styles.closed}`}>
                    {Object.entries(currentCategories).map(([key, value], index) => (
                        <li key={index}>
                        <a href={`/?category=${key}`}>{value}</a>
                        </li>
                    ))}
                    </ul>
                </div>

                {/* ИНТЕРЬЕРЫ */}
                <div className={styles.footer__typology}>
                    <h2 onClick={() => toggleSection("interior")} className={styles.title}>
                    ИНТЕРЬЕРЫ <span>
                        {/* {openSection === "interior" ? "▲" : "▼"} */}
                        <svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L5.5 5L10 1" stroke="#73A533"/>
                            </svg>
                        </span>
                    </h2>
                    <ul className={`${styles.list} ${openSection === "interior" ? styles.open : styles.closed}`}>
                    {Object.entries(currentCategories2).map(([key, value], index) => (
                        <li key={index}>
                        <a href={`/?category=${key}`}>{value}</a>
                        </li>
                    ))}
                    </ul>
                </div>
            </div>
            }
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