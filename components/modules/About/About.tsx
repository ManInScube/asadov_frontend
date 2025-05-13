import Employee from '@/components/elements/Employee/Employee';
import styles from './About.module.scss'
import { useEffect, useState } from 'react';
import Position from '@/components/elements/Position/Position';
import collage from './src/collage.png';
import asadovs from './src/asadovs.png'
import eugen from './src/eugen.png'
import olga from './src/olga.png'
import osman from './src/osman.png'
import hadji from './src/hadji.png'
import kopylov from './src/kopylov.png'
import borisovna from './src/borisovna.png'
import kucherov from './src/kucherov.png'
import erdenko from './src/erdenko.png'
import tolokonov from './src/tolokonov.png'
import bessonov from './src/bessonov.png'
import sobolev from './src/sobolev.png'
import vinogradova from './src/vinogradova.png'
import sysoev from './src/sysoev.png'
import zimuldinova from './src/zimuldinova.png'
import stulova from './src/stulova.png'
import sergeeva from './src/sergeeva.png'
import salyukov from './src/salyukov.png'
import archakov from './src/archakov.png'
import konovalova from './src/konovalova.png'
import kosmachenko from './src/kosmachenko.png'
import medvedev from './src/medvedev.png'
import grigoryeva from './src/grigoryeva.png'
import chernova from './src/chernova.png'
import andreev from './src/andreev.png'
import efremkina from './src/efremkina.png'
import borodin from './src/borodin.png'
import afanasyeva from './src/afanasyeva.png'
import polyanskaya from './src/polyanskaya.png'

import subbanner from './src/subbanner.png'
import CustomMap from '../CustomMap/CustomMap';

type Award = {
    year: string;
    items: string[];
  };
  
  const awards: Award[] = [
    {
      year: '2023',
      items: ['Архитектурная Премия Москвы за школу на 825 мест в Тушино'],
    },
    {
      year: '2020',
      items: [
        'победитель конкурса на развитие территории Самара Арены (совместно с KPMG, LAND и Самарским Политехом)',
        'Архитектурная Премия Москвы за школу на 2100 мест в Троицке',
      ],
    },
    {
      year: '2019',
      items: [
        'гран-при фестиваля Зодчество’19 за аэропорт в Саратове',
        'победитель конкурса на туристический кластер в Оймяконе (Якутия)',
      ],
    },
    {
      year: '2018',
      items: [
        'лауреат Всемирного фестиваля архитектуры WAF (Амстердам) за Международный медицинский кластер в Сколково',
      ],
    },
    {
      year: '2017',
      items: [
        'победитель конкурса на реновацию Головинского района в Москве (совместно с Prospecta и Engex)',
      ],
    },
    {
      year: '2015',
      items: ['Архитектурная Премия Москвы за Центр детской гематологии'],
    },
    {
      year: '2013',
      items: [
        'победитель международного конкурса на аэропорт в Саратове',
        'победитель конкурса на ТРЦ Океания в Москве',
      ],
    },
    {
      year: '2011',
      items: [
        'гран-при фестиваля Зодчество’11 за Центр гематологии в Москве',
      ],
    },
    {
      year: '2010',
      items: [
        'член Российского Совета по Зеленому Строительству (RUGBC)',
        'победитель международного конкурса на реконструкцию стадиона Динамо в Москве (совместно с Erick Van Egeraat и Моспроект-2)',
        'лауреат Всемирного фестиваля архитектуры WAF (Барселона) за проект Аэроотель',
      ],
    },
  ];
  

const About = () =>{
    const [employees, setEmployees] = useState<[]>();
    const [vacancies, setVacancies] = useState<[]>();
    const [clients, setClients] = useState<[]>();
    const [selectedYear, setSelectedYear] = useState<string | null>(null);

    const toggleYear = (year: string) => {
      setSelectedYear((prev) => (prev === year ? null : year));
    };
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

    useEffect(()=>{
        fetch('https://testinscube.ru/api/klienties?populate=*')
        .then((response)=>{
            return response.json()
        })
        .then((data)=>{
            setClients(data.data)
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
                <div className={`${styles.about__bannerItem} ${styles.about__bannerOsman}`}>
                    <img src={osman.src} alt="" />
                </div>
                <div className={`${styles.about__bannerItem} ${styles.about__bannerBorisovna}`}>
                    <img src={borisovna.src} alt="" />
                </div>
                <div className={`${styles.about__bannerItem} ${styles.about__bannerKopylov}`}>
                    <img src={kopylov.src} alt="" />
                </div>
                <div className={`${styles.about__bannerItem} ${styles.about__bannerKucherov}`}>
                    <img src={kucherov.src} alt="" />
                </div>
                <div className={`${styles.about__bannerItem} ${styles.about__bannerErdenko}`}>
                    <img src={erdenko.src} alt="" />
                </div>
                <div className={`${styles.about__bannerItem} ${styles.about__bannerTolokonov}`}>
                    <img src={tolokonov.src} alt="" />
                </div>
                <div className={`${styles.about__bannerItem} ${styles.about__bannerSobolev}`}>
                    <img src={sobolev.src} alt="" />
                </div>
                <div className={`${styles.about__bannerItem} ${styles.about__bannerArchakov}`}>
                    <img src={archakov.src} alt="" />
                </div>
                <div className={`${styles.about__bannerItem} ${styles.about__bannerVinogradova}`}>
                    <img src={vinogradova.src} alt="" />
                </div>
                <div className={`${styles.about__bannerItem} ${styles.about__bannerKonovalova}`}>
                    <img src={konovalova.src} alt="" />
                </div>
                <div className={`${styles.about__bannerItem} ${styles.about__bannerChernova}`}>
                    <img src={chernova.src} alt="" />
                </div>
                <div className={`${styles.about__bannerItem} ${styles.about__bannerGrigoryeva}`}>
                    <img src={grigoryeva.src} alt="" />
                </div>
                <div className={`${styles.about__bannerItem} ${styles.about__bannerAndreev}`}>
                    <img src={andreev.src} alt="" />
                </div>
                <div className={`${styles.about__bannerItem} ${styles.about__bannerSergeeva}`}>
                    <img src={sergeeva.src} alt="" />
                </div>
                <div className={`${styles.about__bannerItem} ${styles.about__bannerEfremkina}`}>
                    <img src={efremkina.src} alt="" />
                </div>
                <div className={`${styles.about__bannerItem} ${styles.about__bannerBorisovna}`}>
                    <img src={borisovna.src} alt="" />
                </div>
                <div className={`${styles.about__bannerItem} ${styles.about__bannerStulova}`}>
                    <img src={stulova.src} alt="" />
                </div>
                <div className={`${styles.about__bannerItem} ${styles.about__bannerSysoev}`}>
                    <img src={sysoev.src} alt="" />
                </div>
                <div className={`${styles.about__bannerItem} ${styles.about__bannerMedvedev}`}>
                    <img src={medvedev.src} alt="" />
                </div>
                <div className={`${styles.about__bannerItem} ${styles.about__bannerBorodin}`}>
                    <img src={borodin.src} alt="" />
                </div>
                <div className={`${styles.about__bannerItem} ${styles.about__bannerSalyukov}`}>
                    <img src={salyukov.src} alt="" />
                </div>
                <div className={`${styles.about__bannerItem} ${styles.about__bannerAfanasyeva}`}>
                    <img src={afanasyeva.src} alt="" />
                </div>
                <div className={`${styles.about__bannerItem} ${styles.about__bannerKosmachenko}`}>
                    <img src={kosmachenko.src} alt="" />
                </div>
                <div className={`${styles.about__bannerItem} ${styles.about__bannerZimuldinova}`}>
                    <img src={zimuldinova.src} alt="" />
                </div>
                <div className={`${styles.about__bannerItem} ${styles.about__bannerPolyanskaya}`}>
                    <img src={polyanskaya.src} alt="" />
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
            <div className={styles.about__awards}>
                <div className={styles.about__container}>
                    <svg width="41" height="43" viewBox="0 0 41 43" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24.5726 13.0047C24.5695 11.5537 24.3466 10.457 23.8533 9.73094C23.384 9.0402 22.6162 8.60924 21.305 8.60924C18.781 8.60924 17.0459 10.7301 17.0459 13.5275C17.0459 14.9857 17.2909 16.0917 17.8092 16.8234C18.3033 17.5208 19.1003 17.9531 20.4127 17.9531C21.8531 17.9531 22.6688 17.8051 23.2408 17.2224C23.8397 16.6123 24.275 15.4246 24.5726 13.0047Z" stroke="#73A533"/>
        <path d="M28.5226 26.406C30.5407 24.3414 31.842 20.5073 32.7163 13.3195C32.992 9.06026 33.1312 4.76629 32.592 0.499252H32.583H32.5659H32.5484H32.5307H32.5126H32.4943H32.4756H32.4567H32.4374H32.4179H32.3981H32.378H32.3576H32.3369H32.3159H32.2947H32.2731H32.2513H32.2292H32.2068H32.1841H32.1612H32.138H32.1145H32.0907H32.0667H32.0424H32.0178H31.993H31.9679H31.9425H31.9169H31.891H31.8648H31.8384H31.8117H31.7847H31.7575H31.7301H31.7023H31.6744H31.6462H31.6177H31.589H31.56H31.5308H31.5013H31.4716H31.4416H31.4114H31.381H31.3503H31.3194H31.2883H31.2569H31.2252H31.1934H31.1613H31.129H31.0964H31.0636H31.0306H30.9974H30.9639H30.9302H30.8963H30.8622H30.8278H30.7933H30.7585H30.7235H30.6883H30.6528H30.6172H30.5813H30.5452H30.509H30.4725H30.4358H30.3989H30.3618H30.3245H30.287H30.2493H30.2114H30.1733H30.135H30.0965H30.0578H30.0189H29.9798H29.9405H29.9011H29.8614H29.8216H29.7816H29.7414H29.701H29.6604H29.6197H29.5788H29.5377H29.4964H29.4549H29.4133H29.3715H29.3295H29.2874H29.245H29.2026H29.1599H29.1171H29.0741H29.031H28.9876H28.9442H28.9005H28.8568H28.8128H28.7687H28.7245H28.68H28.6355H28.5908H28.5459H28.5009H28.4557H28.4104H28.365H28.3194H28.2737H28.2278H28.1818H28.1356H28.0893H28.0429H27.9963H27.9496H27.9028H27.8558H27.8088H27.7615H27.7142H27.6667H27.6191H27.5714H27.5236H27.4756H27.4275H27.3793H27.331H27.2825H27.234H27.1853H27.1365H27.0876H27.0386H26.9895H26.9403H26.891H26.8416H26.792H26.7424H26.6927H26.6428H26.5929H26.5428H26.4927H26.4425H26.3922H26.3417H26.2912H26.2406H26.19H26.1392H26.0883H26.0374H25.9863H25.9352H25.884H25.8328H25.7814H25.73H25.6785H25.6269H25.5752H25.5235H25.4717H25.4198H25.3679H25.3159H25.2638H25.2116H25.1594H25.1072H25.0548H25.0024H24.95H24.8975H24.8449H24.7923H24.7396H24.6869H24.6341H24.5812H24.5284H24.4754H24.4224H24.3694H24.3163H24.2632H24.2101H24.1569H24.1036H24.0504H23.9971H23.9437H23.8903H23.8369H23.7835H23.73H23.6765H23.6229H23.5694H23.5158H23.4622H23.4085H23.3549H23.3012H23.2475H23.1937H23.14H23.0863H23.0325H22.9787H22.9249H22.8711H22.8173H22.7635H22.7096H22.6558H22.6019H22.5481H22.4942H22.4404H22.3865H22.3327H22.2788H22.225H22.1711H22.1173H22.0635H22.0097H21.9559H21.9021H21.8483H21.7945H21.7407H21.687H21.6333H21.5796H21.5259H21.4722H21.4186H21.365H21.3114H21.2578H21.2043H21.1507H21.0973H21.0438H20.9904H20.937H20.8836H20.8303H20.777H20.7238H20.6706H20.6174H20.5643H20.5113H20.4582H20.4052H20.3523H20.2994H20.2466H20.1938H20.141H20.0883H20.0357H19.9831H19.9306H19.8782H19.8258H19.7734H19.7211H19.6689H19.6168H19.5647H19.5127H19.4607H19.4088H19.357H19.3053H19.2536H19.202H19.1505H19.0991H19.0477H18.9964H18.9452H18.8941H18.8431H18.7921H18.7412H18.6904H18.6397H18.5891H18.5386H18.4882H18.4379H18.3876H18.3375H18.2874H18.2375H18.1876H18.1379H18.0882H18.0387H17.9893H17.9399H17.8907H17.8416H17.7926H17.7436H17.6949H17.6462H17.5976H17.5492H17.5008H17.4526H17.4045H17.3565H17.3087H17.2609H17.2133H17.1658H17.1185H17.0712H17.0241H16.9772H16.9303H16.8836H16.837H16.7906H16.7443H16.6981H16.6521H16.6062H16.5604H16.5148H16.4693H16.424H16.3789H16.3338H16.2889H16.2442H16.1996H16.1552H16.1109H16.0668H16.0229H15.979H15.9354H15.8919H15.8486H15.8054H15.7624H15.7196H15.6769H15.6344H15.5921H15.5499H15.5079H15.4661H15.4244H15.3829H15.3416H15.3005H15.2596H15.2188H15.1782H15.1378H15.0976H15.0575H15.0177H14.978H14.9386H14.8993H14.8602H14.8213H14.7825H14.744H14.7057H14.6676H14.6296H14.5919H14.5544H14.5171H14.4799H14.443H14.4063H14.3698H14.3335H14.2974H14.2615H14.2258H14.1904H14.1551H14.1201H14.0853H14.0507H14.0163H13.9822H13.9482H13.9145H13.881H13.8478H13.8147H13.7819H13.7493H13.717H13.6849H13.653H13.6213H13.5899H13.5587H13.5278H13.4971H13.4666H13.4364H13.4064H13.3767H13.3472H13.3179H13.2889H13.2602H13.2317H13.2034H13.1754H13.1477H13.1202H13.093H13.0862C11.8961 1.90206 10.803 4.28479 9.99702 6.9219C9.16233 9.65289 8.65918 12.5781 8.65918 14.8192C8.65918 19.1964 9.38498 22.7049 11.0811 25.1093C12.7528 27.479 15.4236 28.8535 19.5214 28.8535C23.7479 28.8535 26.5331 28.4413 28.5226 26.406Z" stroke="#73A533"/>
        <path d="M19.8829 29.3535L18.8263 42.493H9.74219H28.8773" stroke="#73A533"/>
        <path d="M33.3936 9.78516H40.2863C40.9722 11.6889 39.4419 18.0371 36.1713 19.3933C34.3812 20.1355 33.5513 20.2386 32.2002 19.3933" stroke="#73A533"/>
        <path d="M8.7168 9.92578H1.94379C1.26986 11.815 0.855494 17.0667 3.64557 19.1128C5.18701 20.2432 7.19045 20.6678 8.51809 19.8289" stroke="#73A533"/>
                    </svg>

                    <h2>_НАГРАДЫ</h2>

                </div>

                </div>
                <div className={styles.about__awardsScroll}>
                    {awards.map(({ year }) => (
                    <div
                        key={year}
                        className={styles.about__awardsYear}
                        onClick={() => toggleYear(year)}
                    >
                        {year}
                    </div>
                    ))}
                </div>
                <div className={styles.about__awardsInfo}>
                    {awards
                    .filter((award) => award.year === selectedYear)
                    .map((award) => (
                        <ul key={award.year}>
                        {award.items.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                        </ul>
                    ))}
                </div>
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
                <div className={styles.about__clientsRow}>
                    {clients?.map(item => (
                        <a>
                            <img src={`https://testinscube.ru${item.logo?.url}`} alt="" />
                        </a>
                    ))}
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
            <div className={styles.about__contacts}>
                <div className={styles.about__container}>
                    <CustomMap/>
                </div>
            </div>
        </main>
    )
}

export default About;