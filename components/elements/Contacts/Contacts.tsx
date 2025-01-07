import useMediaQuery from "@/hooks/useMediaQuery";
import Socials from "../Socials/Socials";
import styles from './Contacts.module.scss'


const Contacts = () =>{
    const isMobile = useMediaQuery('(max-width: 768px)');

    return(
        <div className={styles.contacts}>
            <h2>КОНТАКТЫ</h2>
            <a>РОССИЯ, МОСКВА <br/>НОВОРЯЗАНСКАЯ УЛ. 8AC1</a>
            {!isMobile && <Socials/>}
        </div>
    )
}

export default Contacts