'use client'
import { useEffect, useState } from 'react'
import { useGetProjectsQuery } from '@/lib/services/projectApi'
import styles from './Header.module.scss'
import HeaderFilterItem from '@/components/elements/HeaderFilterItem/HeaderFilterItem'
import { categories, categories2 } from '.'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { addProjects, toggleLanguage } from '@/lib/features/projects'
import useMediaQuery from '@/hooks/useMediaQuery'
import { useRouter } from 'next/navigation'


const all = ['project', 'realisation'];
const HeaderProject = () =>{
    const router = useRouter();

    const [type, setType] = useState<string[]>(['architecture', 'interior'])
    const [status, setStatus] = useState<string[]>(['project', 'realisation'])
    const [selectedCategories, setSelectedCategories] = useState<string>()
    const dispatch = useAppDispatch();
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [menuOpened, setMenuOpened] = useState<boolean>(false);
    //    const {data: brands} = useGetModelsQuery(brand)
    // const {data} = useGetProjectsQuery({type: type || '', status:status || ''})
    const [isScrolled, setIsScrolled] = useState(false);
    const [test, setTest] = useState(false);
    const [submenu, setSubmenu] = useState<Object>(categories)
    const language = useAppSelector(state=>state.projectsSlice.language)

    const handleScroll = () => {
        setIsScrolled(window.scrollY > 10);
      };
    
      const handleUpButton = () => {
        window.scrollTo(0, 0);
      };

      const handleState = (str:string) =>{
        if(str==='all'){
            setStatus(all);
            return;
        }
        setStatus(['realisation'])
      }
    
      useEffect(() => {

        window.addEventListener("scroll", handleScroll);
        console.log(isScrolled)

        return () => window.removeEventListener("scroll", handleScroll);
      }, [isScrolled]);
    
    
    async function hh(){
        await fetch(`https://testinscube.ru/api/projects?${type.map(item=>`filters[type][$in]=${item}`).join("&")}&${status.map(item=>`filters[state][$in]=${item}`).join("&")}&${selectedCategories&&`filters[category][$in]=${selectedCategories}`}&locale=${language.toLowerCase()}&populate=*`)
        .then((response)=>{
            return response.json()
        })
        .then((data)=>{
            console.log(data)
            const sortedProjects = data.data.sort((a, b)=>{
                if(!a.order) return 1;
                if(!b.order) return -1;
                return a.order-b.order;
            })
            dispatch(addProjects(sortedProjects))
        })
    }

    
        const toggleLanguageHandler = (value) => {
            dispatch(toggleLanguage(value));
            console.log(language)
        };

    const handleCheckboxChange = (category:any) => {
        setSelectedCategories(category);
        router.push(`/?category=${category}`);
    };

    const handleTypeChange = (type:any) => {
        // setType(e);
        router.push(`/?type=${type}`);
    };
//сделать сортировку по порядку мб или добавить опцию в меню
    // useEffect(()=>{
    //     hh()
    //     handleType(type)
    // },[type, status, selectedCategories])

    const handleType = (type: any) =>{
        setType(type);
        if(type.includes("architecture")){
            setSubmenu(categories)
            return
        }
        setSubmenu(categories2)
    }
    
    return(
        <header className={`${styles.header} ${isScrolled && styles.header_scrolled}`}>
            <a className={styles.header__logo} href='/'>
                <svg viewBox="0 0 1365 230" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 212.62L58.6589 2.88916H129.873L188.738 212.62H146.75L135.018 168.986C133.372 164.047 129.667 160.959 126.374 160.959H62.9812C60.3055 160.959 55.3658 163.635 53.925 167.957L42.1933 212.62H0ZM65.8649 125.549H123.083L102.295 46.9252C100.443 40.3395 88.9168 40.3394 87.0644 46.9252L65.8649 125.549Z" fill="black"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M368.422 213.435L427.081 3.70361H498.295L557.16 213.435H515.172L503.44 169.801C501.794 164.861 498.089 161.774 494.796 161.774H431.403C428.727 161.774 423.788 164.45 422.347 168.772L410.615 213.435H368.422ZM434.287 125.342H491.505L470.717 46.7181C468.865 40.1324 457.339 40.1323 455.486 46.7181L434.287 125.342Z" fill="black"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M894.701 216.112C954.379 216.112 1002.76 167.733 1002.76 108.056C1002.76 48.3783 954.379 0 894.701 0C835.024 0 786.646 48.3783 786.646 108.056C786.646 167.733 835.024 216.112 894.701 216.112ZM894.704 174.127C931.193 174.127 960.772 144.547 960.772 108.058C960.772 71.5698 931.193 41.9899 894.704 41.9899C858.215 41.9899 828.636 71.5698 828.636 108.058C828.636 144.547 858.215 174.127 894.704 174.127Z" fill="black"/>
                    <path d="M1055.87 213.433L995.972 4.11377H1038.58L1083.03 168.564C1086.12 176.797 1096 176.592 1099.09 168.564L1142.93 4.11377H1184.5L1125.64 213.433H1055.87Z" fill="black"/>
                    <path d="M583.323 213.644H661.947V174.126L633.543 174.332C628.81 173.92 625.722 169.598 625.722 165.482V50.562C625.722 46.6514 629.633 43.6357 633.338 43.6357H661.947V4.11816H583.323V213.644Z" fill="black"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M661.955 213.638C662.433 213.644 662.912 213.648 663.392 213.648C721.251 213.648 768.154 166.744 768.154 108.885C768.154 51.026 721.251 4.12207 663.392 4.12207C662.912 4.12207 662.433 4.1253 661.955 4.13173V43.6548C662.436 43.6444 662.918 43.6391 663.401 43.6391C699.435 43.6391 728.647 72.8504 728.647 108.884C728.647 144.918 699.435 174.129 663.401 174.129C662.918 174.129 662.436 174.124 661.955 174.114V213.638Z" fill="black"/>
                    <path d="M201.29 153.751H238.955V161.16C239.366 168.158 246.776 174.744 253.774 174.95H300.907C300.907 174.95 308.728 174.333 312.844 170.422C315.695 167.714 318.402 163.013 317.99 156.632C317.576 150.212 314.566 144.076 303.377 138.108C291.027 131.522 251.098 115.88 238.131 108.264C225.984 101.13 214.287 88.8411 209.728 79.2435C205.818 71.0107 201.105 54.1334 209.728 32.9339C216.52 16.2364 235.456 4.32471 246.776 4.32471H301.113C310.795 4.32457 318.335 7.61473 326.849 13.175C336.934 19.7613 346.608 33.3454 347.628 50.8402V59.6905H309.963V53.7217C309.963 47.9588 304.423 42.8133 298.446 41.9899H254.391C254.391 41.9899 251.51 42.0311 249.04 43.8423C245.953 46.1064 243.894 49.3995 243.483 54.7508C243.071 60.1022 244.521 65.8652 253.165 72.6573C262.196 79.7532 298.224 93.494 308.531 98.179C319.851 103.325 340.845 114.027 349.489 131.934C357.259 148.028 358.143 160.131 351.342 179.684C344.755 198.62 324.791 212.615 305.032 213.85H251.302C233.406 212.821 219.409 201.295 212.613 192.239C203.659 180.306 200.809 162.601 201.29 153.751Z" fill="black"/>
                    <path d="M1197.46 221.462C1197.46 217.143 1200.96 213.641 1205.28 213.641H1365V229.283H1205.28C1200.96 229.283 1197.46 225.782 1197.46 221.462Z" fill="#73A533" className={`${test && styles.anim}`}/>
                </svg>
            </a>
            {!isMobile ?
            <div className={styles.header__menu}>
                <nav className={styles.header__nav}>
                    <div onChange={(e)=>handleTypeChange([e.target.value])}>
                        <label htmlFor="architecture">
                            <a href="/about">{language==='RU' ? 'О БЮРО' : 'ABOUT'}</a>
                        </label>
                        <label htmlFor="architecture">
                            <input type="radio" name="type" id="architecture" value='architecture'/>
                            <span>{language==='RU' ? 'АРХИТЕКТУРА' : 'ARCHITECTURE'}</span>
                        </label>
                        <label htmlFor="">/</label>
                        <label htmlFor="interior">
                            <input type="radio" name="type" id="interior" value='interior'/>
                            <span>{language==='RU' ? 'ИНТЕРЬЕРЫ' : 'INTERIORS'}</span>
                        </label>
                    </div>
                    <div onChange={(e)=>handleState(e.target.value)} className={styles.header__switch}> 
                        <label htmlFor="project">
                            <input type="radio" name="status" id="project" value='all'/>
                            <span>{language==='RU' ? 'ВСЕ' : 'ALL'}</span> 
                        </label>
                        <label htmlFor="">/</label>
                        <label htmlFor="release">
                            <input type="radio" name="status" id="release" value="realisation"/>
                            <span>{language==='RU' ? 'РЕАЛИЗАЦИЯ' : 'REALIZATION'}</span>
                        </label>
                    </div>
                    {/* <div className={styles.header__icons}>
                        <a>
                            <svg width="28" height="27" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.5435 7.49511C17.1273 9.16521 18.112 10.7076 18.3521 12.1531C18.5852 13.5566 18.1296 14.9628 16.5921 16.4246C13.5885 19.2805 9.14976 18.6745 6.04991 15.4143C4.4593 13.7414 3.49393 12.1674 3.27818 10.6906C3.06855 9.25564 3.5545 7.81867 5.09285 6.35599C6.72426 4.80482 7.88569 4.01092 9.292 4.06126C10.7371 4.11299 12.5838 5.05777 15.5435 7.49511Z" stroke="#73A533"/>
                                <path d="M16.083 17.3184L21.3295 22.5648" stroke="#73A533"/>
                            </svg>
                        </a>
                        <a>
                            <svg width="27" height="28" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.8095 14.3986C18.245 12.921 19.105 11.5272 19.2679 10.1675C19.4276 8.83498 18.9295 7.41557 17.3665 5.84525C14.3034 2.76789 10.0802 3.04526 7.30762 5.88827C5.86408 7.36848 5.02161 8.79592 4.88266 10.1906C4.74651 11.5571 5.2761 13.009 6.83941 14.5796C8.48137 16.2292 9.64885 17.1117 11.0068 17.1823C12.3751 17.2535 14.0854 16.5066 16.8095 14.3986Z" stroke="#73A533"/>
                                <path d="M18.2082 15.7495C11.5641 20.9002 9.27865 19.9181 5.32197 15.943C1.3653 11.9678 2.30949 8.22802 5.8842 4.5625" stroke="#73A533"/>
                                <path d="M11.1863 19.3633V22.5H5.22656H17.1461" stroke="#73A533"/>
                                <path d="M7.13176 5.875C6.90587 8.69805 7.45212 14.7449 14.4999 15.9996" stroke="#73A533"/>
                                <path d="M8.67676 4.62061C11.1861 5.35251 16.3931 8.32194 17.1459 14.3444" stroke="#73A533"/>
                                <path d="M5 12.5001C8.03217 11.8727 14.0092 9.45126 14.0092 3.67969" stroke="#73A533"/>
                                <path d="M8.36328 15.9128C11.3954 15.0763 17.5225 11.9605 17.7734 6.18896" stroke="#73A533"/>
                            </svg>
                        </a>
                    </div> */}

                    <div className={styles.language__toggle_new}>
                        <label>
              
                            <a
                            onClick={() => toggleLanguageHandler(language ==='RU' ? 'EN' : 'RU')}
                            >{language ==='RU' ? 'RU' : 'EN'}</a>
                            <svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L5.5 5L10 1" stroke="#73A533"/>
                            </svg>
                        </label>
                    </div>
                </nav>
                
                {/* <ul onChange={(e)=>setCategory(e.target.value)}>
                    <label htmlFor="house">
                        <input type="checkbox" name="category" id="house" value='house'/>
                        <span>АРХИТЕКТУРА</span>
                    </label>
                    <label htmlFor="office">
                        <input type="checkbox" name="category" id="office" value='office'/>
                        <span>ОФИСЫ</span>
                    </label>
                    <label htmlFor="hotel">
                        <input type="checkbox" name="category" id="hotel" value='hotel'/>
                        <span>ГОСТИНИЦЫ</span>
                    </label>
                    <HeaderFilterItem type={'checkbox'} name={'category'} value={'culture'} title={'КУЛЬТУРА'} />
                    <HeaderFilterItem type={'checkbox'} name={'category'} value={'education'} title={'ОБРАЗОВАНИЕ'} />
                    <HeaderFilterItem type={'checkbox'} name={'category'} value={'sport'} title={'СПОРТ'} />
                    <HeaderFilterItem type={'checkbox'} name={'category'} value={'market'} title={'ТОРГОВЛЯ'} />
                    <a>ТРАНСПОРТ</a>
                    <a>БЛАГОУСТРОЙСТВО</a>
                    <a>МАСТЕРПЛАНЫ</a>
                </ul> */}
                <ul onClick={()=>setTest(true)}>
                    {Object.keys(submenu).map((item:string)=>(
                        <HeaderFilterItem 
                            key={item}
                            type={'radio'}
                            name={'category'}
                            value={item}
                            title={categories[item]} 
                            isChecked={selectedCategories?.includes(item)}
                            handler={handleCheckboxChange}
                        />
                    ))}
                </ul>
            </div>
            :
            <div className={styles.header__icons}>
                <a>
                    <svg viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.5435 7.49511C17.1273 9.16521 18.112 10.7076 18.3521 12.1531C18.5852 13.5566 18.1296 14.9628 16.5921 16.4246C13.5885 19.2805 9.14976 18.6745 6.04991 15.4143C4.4593 13.7414 3.49393 12.1674 3.27818 10.6906C3.06855 9.25564 3.5545 7.81867 5.09285 6.35599C6.72426 4.80482 7.88569 4.01092 9.292 4.06126C10.7371 4.11299 12.5838 5.05777 15.5435 7.49511Z" stroke="#73A533"/>
                        <path d="M16.083 17.3184L21.3295 22.5648" stroke="#73A533"/>
                    </svg>
                </a>
                <a>
                    <svg viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.8095 14.3986C18.245 12.921 19.105 11.5272 19.2679 10.1675C19.4276 8.83498 18.9295 7.41557 17.3665 5.84525C14.3034 2.76789 10.0802 3.04526 7.30762 5.88827C5.86408 7.36848 5.02161 8.79592 4.88266 10.1906C4.74651 11.5571 5.2761 13.009 6.83941 14.5796C8.48137 16.2292 9.64885 17.1117 11.0068 17.1823C12.3751 17.2535 14.0854 16.5066 16.8095 14.3986Z" stroke="#73A533"/>
                        <path d="M18.2082 15.7495C11.5641 20.9002 9.27865 19.9181 5.32197 15.943C1.3653 11.9678 2.30949 8.22802 5.8842 4.5625" stroke="#73A533"/>
                        <path d="M11.1863 19.3633V22.5H5.22656H17.1461" stroke="#73A533"/>
                        <path d="M7.13176 5.875C6.90587 8.69805 7.45212 14.7449 14.4999 15.9996" stroke="#73A533"/>
                        <path d="M8.67676 4.62061C11.1861 5.35251 16.3931 8.32194 17.1459 14.3444" stroke="#73A533"/>
                        <path d="M5 12.5001C8.03217 11.8727 14.0092 9.45126 14.0092 3.67969" stroke="#73A533"/>
                        <path d="M8.36328 15.9128C11.3954 15.0763 17.5225 11.9605 17.7734 6.18896" stroke="#73A533"/>
                    </svg>
                </a>
                <a onClick={()=>setMenuOpened(!menuOpened)} className={styles.header__menuBtn}>
                    <svg viewBox="0 0 33 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0H30.5C31.8807 0 33 1.11929 33 2.5C33 3.88071 31.8807 5 30.5 5H0V0Z" fill="#73A533"/>
                        <path d="M0 10H30.5C31.8807 10 33 11.1193 33 12.5C33 13.8807 31.8807 15 30.5 15H0V10Z" fill="#73A533"/>
                        <path d="M0 20H30.5C31.8807 20 33 21.1193 33 22.5C33 23.8807 31.8807 25 30.5 25H0V20Z" fill="#73A533"/>
                    </svg>
                </a>
            </div>
        }
        {menuOpened &&
            <div className={styles.header__mobile}>
                <div className={styles.header__menu}>
                    <nav className={styles.header__mobile__nav}>
                    <a href="/about">{language==='RU' ? 'О БЮРО' : 'ABOUT'}</a>
                    <div onChange={(e)=>setType([e.target.value])}>
                            <label htmlFor="architecture">
                                <input type="radio" name="type" id="architecture" value='architecture'/>
                                <span>{language==='RU' ? 'АРХИТЕКТУРА' : 'ARCHITECTURE'}</span>
                                </label>
                            <label htmlFor="interior">
                                <input type="radio" name="type" id="interior" value='interior'/>
                                <span>{language==='RU' ? 'ИНТЕРЬЕРЫ' : 'INTERIORS'}</span>
                            </label>
                        </div>
                        <div onChange={(e)=>setStatus([e.target.value])}>
                            <label htmlFor="project">
                                <input type="radio" name="status" id="project" value="project"/>
                                <span>ПРОЕКТ</span> 
                            </label>
                            <label htmlFor="release">
                                <input type="radio" name="status" id="release" value="release"/>
                                <span>РЕАЛИЗАЦИЯ</span>
                            </label>
                        </div>
                    </nav>
                    <ul>
                    {Object.keys(categories).map((item:string)=>(
                        <HeaderFilterItem 
                            key={item}
                            type={'checkbox'}
                            name={'category'}
                            value={item}
                            title={categories[item]} 
                            isChecked={selectedCategories?.includes(item)}
                            handler={handleCheckboxChange}
                        />
                    ))}
                </ul>
                </div>

            </div>
        }
        </header>
    )
}

export default HeaderProject