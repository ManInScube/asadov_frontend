
import Contacts from '@/components/elements/Contacts/Contacts'
import styles from './Footer.module.scss'
import useMediaQuery from '@/hooks/useMediaQuery';
import Socials from '@/components/elements/Socials/Socials';
import { categories } from '../Header';


const Footer = () =>{
    const isMobile = useMediaQuery('(max-width: 768px)');

    return(
        <footer className={styles.footer}>
            <div>
                <div>
                    <h2>О БЮРО</h2>
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
                <ul>
                    {Object.keys(categories).map((item:string)=>(
                        <li>
                            <a>{categories[item]}</a>
                        </li>
                    ))}
                    {/* <li><a>О НАС</a></li>
                    <li><a>О НАС</a></li>
                    <li><a>О НАС</a></li>
                    <li><a>О НАС</a></li>
                    <li><a>О НАС</a></li>
                    <li><a>О НАС</a></li>
                    <li><a>О НАС</a></li>
                    <li><a>О НАС</a></li>
                    <li><a>О НАС</a></li>
                    <li><a>О НАС</a></li>
                    <li><a>О НАС</a></li>
                    <li><a>О НАС</a></li> */}
                </ul>
            </div>
            {!isMobile && <Contacts/>}
            {isMobile &&
                <div className={styles.footer__socials}>
                    <Socials/>
                </div>
            }
        </footer>
    )
}

export default Footer