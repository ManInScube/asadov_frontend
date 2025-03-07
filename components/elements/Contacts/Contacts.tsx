import useMediaQuery from "@/hooks/useMediaQuery";
import Socials from "../Socials/Socials";
import styles from './Contacts.module.scss'


const Contacts = () =>{
    const isMobile = useMediaQuery('(max-width: 768px)');

    return(
        <div className={styles.contacts}>
            <h2>КОНТАКТЫ</h2>
            <a>Россия, Москва <br/>Новорязанская ул. 8Aс1</a>
            <a href="tel:+7 (495) 777 91 36">+7 (495) 777 91 36</a>
            <a href="mailto:info@asadov.studio">info@asadov.studio</a>
            {!isMobile && <Socials/>}
        </div>
    )
}

export default Contacts