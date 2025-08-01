'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useGetProjectsQuery } from '@/lib/services/projectApi'
import styles from './Header.module.scss'
import HeaderFilterItem from '@/components/elements/HeaderFilterItem/HeaderFilterItem'
import { categories, categories2 } from '.'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { addProjects, toggleLanguage, toggleSearchMode } from '@/lib/features/projects'
import useMediaQuery from '@/hooks/useMediaQuery'
import { useRouter, useSearchParams } from "next/navigation";


const all = ['project', 'realisation'];
const Header = () =>{
    const [type, setType] = useState<string[]>(['architecture', 'interior'])
    const [status, setStatus] = useState<string[]>(['project', 'realisation'])
    const [selectedCategories, setSelectedCategories] = useState<string>()
    const dispatch = useAppDispatch();
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [menuOpened, setMenuOpened] = useState<boolean>(false);
    //    const {data: brands} = useGetModelsQuery(brand)
    // const {data} = useGetProjectsQuery({type: type || '', status:status || ''})
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchMode, setIsSearchMode] = useState(false);
    const [test, setTest] = useState(false);
    const [submenu, setSubmenu] = useState<Object>(categories)
    const [menu, setMenu] = useState<Object|null>(null)
    const [value, setValue] = useState('');

    // const menuRefs = useRef([]); // Массив для хранения рефов каждого пункта меню
    const language = useAppSelector(state=>state.projectsSlice.language)

    const searchParams = useSearchParams();
    const categoryUrl = searchParams.get("category");
    const typeUrl = searchParams.get("type");

    const underscoreRef = useRef(null);
    const startingPointRef = useRef();  
    const activeCategoryRef = useRef<{ [key: string]: HTMLLIElement | null }>({});
    
    const handleSearchMode = (val) =>{
        setIsSearchMode(val)
        dispatch(toggleSearchMode(val))
    }

    const handleScroll = () => {
        setIsScrolled(window.scrollY > 10);
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



    //тест полоска
    const [activeIndex, setActiveIndex] = useState(0); // Состояние активного пункта

    const menuRefs = useRef([]);

    const underlineRef = useRef(null);

    useEffect(()=>{
        const startingPointY = startingPointRef.current.getBoundingClientRect().right -35;
        underscoreRef.current.style.left = `${startingPointY}px`;
        console.log("Refs:", activeCategoryRef.current['education'].style);

    }, [activeCategoryRef])

    useEffect(() => {
        if(typeUrl)
        {
            setType([typeUrl])
        }
        if (categoryUrl) {
            setSelectedCategories(categoryUrl);
        }
    }, [categoryUrl, typeUrl]);

    useEffect(() => {
        if (categories) {
            setMenu(submenu[language])
        }
    }, [language]);

    useEffect(() => {
        // Обновляем позицию и ширину подчеркивания
        const activeItem = menuRefs.current[activeIndex];
        if (activeItem && underlineRef.current) {
          underlineRef.current.style.width = `${activeItem.offsetWidth}px`;
          underlineRef.current.style.transform = `translateX(${activeItem.offsetLeft}px)`;

          console.log(underlineRef.current.style);
        }
      }, [activeIndex]);

      useEffect(() => {
        console.log("Selected Category:", selectedCategories); // Должно меняться при обновлении URL
    }, [selectedCategories]);
    
    async function hh(){
        try {
            const projectsResponse = await fetch(`https://testinscube.ru/api/projects?pagination[limit]=500&${type.map(item=>`filters[type][$in]=${item}`).join("&")}&${status.map(item=>`filters[state][$in]=${item}`).join("&")}&${selectedCategories&&`filters[category][$in]=${selectedCategories}`}&locale=${language ? language?.toLowerCase() : 'ru' }&populate=*`)
            const projectsData = await projectsResponse.json();

            const articlesResponse = await fetch(`https://testinscube.ru/api/articles?${selectedCategories&&`filters[category][$in]=${selectedCategories}`}&populate=*`);
            const articlesData = await articlesResponse.json();
            const modifiedData = articlesData.data.map(data => ({...data, type: 'articles'}));

            console.log(modifiedData)
            const combinedData = [...projectsData.data, ...modifiedData];
            // Сортируем
            const sortedProjects = combinedData.sort((a, b) => {
                if (!a.order) return 1;
                if (!b.order) return -1;
                return a.order - b.order;
            });

            // Диспатчим в store
            dispatch(addProjects(sortedProjects));
        } catch (error) {
            console.error("Ошибка при загрузке данных:", error);
        }
    }

    async function getDefaultProjects(){
        try {
            const projectsResponse = await fetch(`https://testinscube.ru/api/projects?pagination[limit]=500&${type.map(item => `filters[type][$in]=${item}`).join("&")}&locale=${language ? language?.toLowerCase() : 'ru'}&populate=*`)
            const projectsData = await projectsResponse.json();

            const articlesResponse = await fetch(`https://testinscube.ru/api/articles?populate=*`);
            const articlesData = await articlesResponse.json();
            const modifiedData = articlesData.data.map(data => ({...data, type: 'articles'}));
            console.log(modifiedData)
            const combinedData = [...projectsData.data, ...modifiedData];
            // Сортируем
            const sortedProjects = combinedData.sort((a, b) => {
                if (!a.order) return 1;
                if (!b.order) return -1;
                return a.order - b.order;
            });

            // Диспатчим в store
            dispatch(addProjects(sortedProjects));
        } catch (error) {
            console.error("Ошибка при загрузке данных:", error);
        }
    }

    const handleCheckboxChange = (category:any) => {
        setSelectedCategories(category);
      };
//сделать сортировку по порядку мб или добавить опцию в меню
useEffect(() => {


    const positions = Object.keys(activeCategoryRef.current).map((key) => {
        const el = activeCategoryRef.current[key];
        if (el) {
          const rect = el.getBoundingClientRect();
          return {
            key,
            left: rect.left,
            top: rect.top,
            width: rect.width,
            height: rect.height,
            right: rect.right,
            bottom: rect.bottom,
          };
        }
        return null;
      });

    if (selectedCategories !== undefined) {
        hh();
        setMenuOpened(false)
        if(!isMobile){
        const activeCategoryObj = positions.filter(item=>item.key==selectedCategories)
        underscoreRef.current.style.left = `${activeCategoryObj[0].left}px`;
        underscoreRef.current.style.width = `${activeCategoryObj[0].width}px`;

        console.log("Координаты элементов:", activeCategoryObj[0].left);
        }

    }
    if(!categoryUrl && !selectedCategories){
        getDefaultProjects()
    }
    //!categoryUrl
    handleType(type);
    



    // console.log("Координаты элементов:", positions.filter(Boolean));


}, [type, status, selectedCategories]);

    const handleType = (type: any) =>{
        setType(type);
        if(type.includes("architecture")){
            setSubmenu(categories)
            return
        }
        setSubmenu(categories2)
    }

    const toggleLanguageHandler = (value) => {
        dispatch(toggleLanguage(value));
        console.log(language)
    };

    const currentCategories = useMemo(() => {
        if (submenu && typeof submenu === 'object' && submenu[language]) {
            return submenu[language];
        }
        return submenu['RU'] || {}; // fallback на RU, если язык не найден
    }, [submenu, language]);

    const router = useRouter();

    const handleSearch = (e) => {
      e.preventDefault();
      if (value.trim()) {
        router.push(`/search?query=${encodeURIComponent(value.trim())}`);
      }
    };

    return(
        <header className={`${styles.header} ${isScrolled && styles.header_scrolled}`}>
            {!isMobile&&<span ref={underscoreRef} className={`${styles.underline} ${isSearchMode && styles.underline_stretched}`}></span>}
            <a className={styles.header__logo} href='/'>
                <svg viewBox="0 0 1365 230" fill="none" xmlns="http://www.w3.org/2000/svg" ref={startingPointRef}>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 212.62L58.6589 2.88916H129.873L188.738 212.62H146.75L135.018 168.986C133.372 164.047 129.667 160.959 126.374 160.959H62.9812C60.3055 160.959 55.3658 163.635 53.925 167.957L42.1933 212.62H0ZM65.8649 125.549H123.083L102.295 46.9252C100.443 40.3395 88.9168 40.3394 87.0644 46.9252L65.8649 125.549Z" fill="black"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M368.422 213.435L427.081 3.70361H498.295L557.16 213.435H515.172L503.44 169.801C501.794 164.861 498.089 161.774 494.796 161.774H431.403C428.727 161.774 423.788 164.45 422.347 168.772L410.615 213.435H368.422ZM434.287 125.342H491.505L470.717 46.7181C468.865 40.1324 457.339 40.1323 455.486 46.7181L434.287 125.342Z" fill="black"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M894.701 216.112C954.379 216.112 1002.76 167.733 1002.76 108.056C1002.76 48.3783 954.379 0 894.701 0C835.024 0 786.646 48.3783 786.646 108.056C786.646 167.733 835.024 216.112 894.701 216.112ZM894.704 174.127C931.193 174.127 960.772 144.547 960.772 108.058C960.772 71.5698 931.193 41.9899 894.704 41.9899C858.215 41.9899 828.636 71.5698 828.636 108.058C828.636 144.547 858.215 174.127 894.704 174.127Z" fill="black"/>
                    <path d="M1055.87 213.433L995.972 4.11377H1038.58L1083.03 168.564C1086.12 176.797 1096 176.592 1099.09 168.564L1142.93 4.11377H1184.5L1125.64 213.433H1055.87Z" fill="black"/>
                    <path d="M583.323 213.644H661.947V174.126L633.543 174.332C628.81 173.92 625.722 169.598 625.722 165.482V50.562C625.722 46.6514 629.633 43.6357 633.338 43.6357H661.947V4.11816H583.323V213.644Z" fill="black"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M661.955 213.638C662.433 213.644 662.912 213.648 663.392 213.648C721.251 213.648 768.154 166.744 768.154 108.885C768.154 51.026 721.251 4.12207 663.392 4.12207C662.912 4.12207 662.433 4.1253 661.955 4.13173V43.6548C662.436 43.6444 662.918 43.6391 663.401 43.6391C699.435 43.6391 728.647 72.8504 728.647 108.884C728.647 144.918 699.435 174.129 663.401 174.129C662.918 174.129 662.436 174.124 661.955 174.114V213.638Z" fill="black"/>
                    <path d="M201.29 153.751H238.955V161.16C239.366 168.158 246.776 174.744 253.774 174.95H300.907C300.907 174.95 308.728 174.333 312.844 170.422C315.695 167.714 318.402 163.013 317.99 156.632C317.576 150.212 314.566 144.076 303.377 138.108C291.027 131.522 251.098 115.88 238.131 108.264C225.984 101.13 214.287 88.8411 209.728 79.2435C205.818 71.0107 201.105 54.1334 209.728 32.9339C216.52 16.2364 235.456 4.32471 246.776 4.32471H301.113C310.795 4.32457 318.335 7.61473 326.849 13.175C336.934 19.7613 346.608 33.3454 347.628 50.8402V59.6905H309.963V53.7217C309.963 47.9588 304.423 42.8133 298.446 41.9899H254.391C254.391 41.9899 251.51 42.0311 249.04 43.8423C245.953 46.1064 243.894 49.3995 243.483 54.7508C243.071 60.1022 244.521 65.8652 253.165 72.6573C262.196 79.7532 298.224 93.494 308.531 98.179C319.851 103.325 340.845 114.027 349.489 131.934C357.259 148.028 358.143 160.131 351.342 179.684C344.755 198.62 324.791 212.615 305.032 213.85H251.302C233.406 212.821 219.409 201.295 212.613 192.239C203.659 180.306 200.809 162.601 201.29 153.751Z" fill="black"/>
                    {isMobile&&<path d="M1197.46 221.462C1197.46 217.143 1200.96 213.641 1205.28 213.641H1365V229.283H1205.28C1200.96 229.283 1197.46 225.782 1197.46 221.462Z" fill="#73A533" className={`${test && styles.anim}`}/>}
                </svg>
            </a>
            {!isMobile ?
            //DESKTOP BLOCK
            <div className={styles.header__menu}>
                <nav className={styles.header__nav}>
                    <div onChange={(e)=>setType([e.target.value])} className={styles.header__pages}>
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


                    <div style={{display: 'flex', alignItems: 'center'}}>
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
                        <div className={styles.header__icons}>
                            {!isSearchMode && <a onClick={()=>handleSearchMode(true)}>
                                <svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.72744 6.19502C6.35885 4.64385 7.52075 3.84951 8.92707 3.89985C10.3717 3.95168 12.2174 4.89662 15.1754 7.33226C16.7605 9.00325 17.7473 10.5457 17.9874 11.9918C18.2205 13.3953 17.7642 14.8021 16.2267 16.264C13.2231 19.1195 8.78412 18.5129 5.68439 15.2528C4.09395 13.58 3.12842 12.0061 2.91269 10.5293C2.70312 9.09449 3.18929 7.65759 4.72744 6.19502Z" stroke="#73A533"/>
                                    <path d="M15.7178 17.1572L20.9643 22.4037" stroke="#73A533"/>
                                </svg>
                            </a>}
                            <a href='/map'>
                                <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.83929 14.5297C8.48122 16.1793 9.64878 17.0625 11.0067 17.1331C12.3748 17.2042 14.0847 16.4566 16.8081 14.3494C18.2441 12.8714 19.1052 11.4776 19.2682 10.1176C19.4279 8.78512 18.9291 7.36574 17.3661 5.79548C14.303 2.71828 10.0801 2.99557 7.30755 5.83853C5.86419 7.31857 5.02175 8.74586 4.88269 10.1403C4.74654 11.5069 5.27607 12.9591 6.83929 14.5297Z" stroke="#73A533"/>
                                    <path d="M18.2082 15.6997C11.5641 20.8504 9.27865 19.8683 5.32197 15.8932C1.3653 11.918 2.30949 8.17822 5.8842 4.51269" stroke="#73A533"/>
                                    <path d="M11.1863 19.3135V22.4502H5.22656H17.1461" stroke="#73A533"/>
                                    <path d="M7.13176 5.8252C6.90587 8.64825 7.45212 14.6951 14.4999 15.9498" stroke="#73A533"/>
                                    <path d="M8.67676 4.5708C11.1861 5.3027 16.3931 8.27213 17.1459 14.2946" stroke="#73A533"/>
                                    <path d="M5 12.4503C8.03217 11.8229 14.0092 9.40145 14.0092 3.62988" stroke="#73A533"/>
                                    <path d="M8.36328 15.863C11.3954 15.0265 17.5225 11.9107 17.7734 6.13916" stroke="#73A533"/>
                                </svg>
                            </a>
                        </div>
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
                    </div>
                </nav>

                {
                    isSearchMode
                    ?
                    <form className={styles.header__search} onSubmit={handleSearch} onBlurCapture={()=>handleSearchMode(false)}>
                        <input 
                            type="text"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            autoFocus
                        />
                        <a onClick={handleSearch}>
                            <svg width="26" height="20" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.72744 6.19502C6.35885 4.64385 7.52075 3.84951 8.92707 3.89985C10.3717 3.95168 12.2174 4.89662 15.1754 7.33226C16.7605 9.00325 17.7473 10.5457 17.9874 11.9918C18.2205 13.3953 17.7642 14.8021 16.2267 16.264C13.2231 19.1195 8.78412 18.5129 5.68439 15.2528C4.09395 13.58 3.12842 12.0061 2.91269 10.5293C2.70312 9.09449 3.18929 7.65759 4.72744 6.19502Z" stroke="#73A533"/>
                                <path d="M15.7178 17.1572L20.9643 22.4037" stroke="#73A533"/>
                            </svg>

                        </a>
                    </form>
                    :
                    <ul onClick={() => setTest(true)}>
                        { Object.keys(currentCategories).map((item: string, index: number) => (
                            <li key={item} ref={(el) => (activeCategoryRef.current[item] = el)} style={{ listStyle: 'none' }}>
                                <HeaderFilterItem
                                    key={item}
                                    type={'radio'}
                                    name={'category'}
                                    value={item}
                                    title={currentCategories[item]}
                                    isChecked={selectedCategories?.includes(item)}
                                    handler={handleCheckboxChange}
                                    ref={(el) => (menuRefs.current[index] = el)} // Присваиваем рефы элементам
                                    onClick={() => setActiveIndex(index)}
                                />
                            </li>
                        ))}
                    </ul>
                }

            </div>
            :
            //MOBILE BLOCK
            <div className={styles.header__icons}>
                <a>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="42" viewBox="0 0 41 42" fill="none">
                        <path d="M7.73965 8.78677C10.3015 6.35095 11.9966 5.2424 13.9915 5.3138C16.0842 5.38871 18.8675 6.76725 23.5003 10.5795C25.9537 13.171 27.4137 15.4998 27.7663 17.6229C28.1013 19.6404 27.4703 21.7004 25.1431 23.9131C20.6671 28.1686 13.998 27.3288 9.25803 22.3438C6.78632 19.7442 5.34946 17.3605 5.03153 15.1846C4.72894 13.1134 5.41031 11.0015 7.73965 8.78677Z" stroke="#73A533" stroke-width="2.5"/>
                        <path d="M23.4844 24.4209L32.9009 33.8853" stroke="#73A533" stroke-width="2.5"/>
                    </svg>
                </a>
                <a>
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="36" viewBox="0 0 35 36" fill="none">
                        <path d="M10.7647 22.3735C13.3144 24.9352 15.0708 26.2402 17.083 26.3448C19.1157 26.4502 21.707 25.3424 25.9206 22.0839C28.1287 19.8087 29.4187 17.6957 29.6622 15.6641C29.8991 13.6876 29.169 11.5518 26.777 9.14868C22.1191 4.46934 15.711 4.88796 11.4925 9.21356C9.2688 11.4937 8.00276 13.6616 7.7946 15.7494C7.59217 17.7811 8.37214 19.9699 10.7647 22.3735Z" stroke="#73A533" stroke-width="2"/>
                        <path d="M28.2395 24.3478C17.9351 32.3362 14.3905 30.813 8.25397 24.6479C2.11747 18.4828 3.58185 12.6826 9.12594 6.99767" stroke="#73A533" stroke-width="2"/>
                        <path d="M17.3486 29.9531V34.8179H8.10547H26.5918" stroke="#73A533" stroke-width="2"/>
                        <path d="M11 9.99902C11.1797 13.999 11.0695 22.5531 22 24.499" stroke="#73A533" stroke-width="2" stroke-linecap="round"/>
                        <path d="M14.5 7C18.3919 8.13512 25.3324 11.6596 26.5 21" stroke="#73A533" stroke-width="2" stroke-linecap="round"/>
                        <path d="M7.75391 19.3086C12.4566 18.3357 21.7265 14.5802 21.7265 5.62891" stroke="#73A533" stroke-width="2"/>
                        <path d="M13.5 24C18.2027 22.7027 26.9155 19.4513 27.3046 10.5" stroke="#73A533" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </a>
                <a onClick={()=>setMenuOpened(!menuOpened)} className={`${styles.header__menuBtn} ${ menuOpened &&styles.header__menuBtn_rotate}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="33" height="23" viewBox="0 0 33 23" fill="none">
                        <path d="M0 0H31.5C32.3284 0 33 0.671573 33 1.5V1.5C33 2.32843 32.3284 3 31.5 3H0V0Z" fill="#73A533"/>
                        <path d="M0 10H31.5C32.3284 10 33 10.6716 33 11.5V11.5C33 12.3284 32.3284 13 31.5 13H0V10Z" fill="#73A533"/>
                        <path d="M0 20H31.5C32.3284 20 33 20.6716 33 21.5V21.5C33 22.3284 32.3284 23 31.5 23H0V20Z" fill="#73A533"/>
                    </svg>
                </a>
            </div>
        }
        {menuOpened &&
            <div className={styles.header__mobile}>
                <div className={styles.header__menu}>
                    <nav className={styles.header__mobile__nav}>
                        <div onChange={(e)=>setType([e.target.value])}>
                            <label htmlFor="architecture">
                                <input type="radio" name="type" id="architecture" value='architecture'/>
                                <span>{language==='RU' ? 'АРХИТЕКТУРА' : 'ARCHITECTURE'}</span>
                            </label>
                            <label htmlFor="interior">
                                <input type="radio" name="type" id="interior" value='interior'/>
                                <span>{language==='RU' ? 'ИНТЕРЬЕРЫ' : 'INTERIORS'}</span>
                            </label>
                            <a href="/about">{language==='RU' ? 'О БЮРО' : 'ABOUT'}</a>
                            </div>
                    </nav>
                    <ul
                        className={styles.header__mobileList}
                    >
                    { Object.keys(currentCategories).map((item: string, index: number) => (
                        <li key={item} ref={(el) => (activeCategoryRef.current[item] = el)} style={{ listStyle: 'none' }}>
                            <HeaderFilterItem
                                key={item}
                                type={'radio'}
                                name={'category'}
                                value={item}
                                title={currentCategories[item]}
                                isChecked={selectedCategories?.includes(item)}
                                handler={handleCheckboxChange}
                                ref={(el) => (menuRefs.current[index] = el)} // Присваиваем рефы элементам
                                onClick={() => setActiveIndex(index)}
                            />
                        </li>
                    ))}
                    </ul>
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
                </div>
                <a className={styles.mobile__langToggle} 
                onClick={()=>toggleLanguageHandler(language === 'RU' ? 'EN' : 'RU')}
                >
                    <span>{language === 'RU' ? 'EN' : 'RU'}</span>
                    <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 10L5 5.5L1 1" stroke="#73A533"/>
                    </svg>

                    
                    {/* <div className={styles.language__toggle}>
                        <label>
                            <input
                                type="radio"
                                name="language"
                                value="EN"
                                checked={language === 'EN'}
                                onChange={() => toggleLanguageHandler('EN')}
                            />
                            <span>EN</span>
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="language"
                                value="RU"
                                checked={language === 'RU'}
                                onChange={() => toggleLanguageHandler('RU')}
                            />
                            <span>РУ</span>
                        </label>
                    </div> */}

                </a>

            </div>
        }
        </header>
    )
}

export default Header