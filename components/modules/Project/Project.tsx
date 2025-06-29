import { useAppSelector } from "@/lib/hooks"
import { useEffect, useMemo, useState } from "react"
import styles from './Project.module.scss'
import Gallery from "../Gallery/Gallery";
import RichTextRenderer from "../RichTextRenderer/RichTextRenderer";
import { categories } from "../HeaderNew";
import useMediaQuery from "@/hooks/useMediaQuery";
import ExpandButton from "@/components/elements/ExpandButton/ExpandButton";


const Project = () =>{
    const [project, setProject] = useState(null);
    const url = window.location.pathname; // Получаем путь, например, "/project/40"
    const id = url.substring(url.lastIndexOf("/") + 1); // Извлекаем цифру после последнего "/"

    const [isExpanded, setIsExpanded] = useState(false);
    const language = useAppSelector(state=>state.projectsSlice.language)
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [currentTitles, setCurrentTitles] = useState<Object>(titles)

    const maxLength = 200;

    const toggleExpand = () => {
      setIsExpanded(!isExpanded);
    };

    useEffect(()=>{
        getProject()
    },[])

    const projectId = useAppSelector(state=>state.projectsSlice.currentProject)
    async function getProject() {
        try {
            const primaryResponse = await fetch(`https://testinscube.ru/api/projects?filters[documentId][$eq]=${id}&locale=${language?.toLowerCase()}&populate=*`);
            const primaryData = await primaryResponse.json();
    
            if (primaryData.data && primaryData.data.length > 0) {
                setProject(primaryData.data[0]);
                return;
            }
    
            const fallbackResponse = await fetch(`https://testinscube.ru/api/projects?filters[documentId][$eq]=${id}&populate=*`);
            const fallbackData = await fallbackResponse.json();
    
            if (fallbackData.data) {
                console.log(fallbackData.data[0])
                setProject(fallbackData.data[0]);
            } else {
                setProject(null); // или показать ошибку
            }
    
        } catch (error) {
            console.error("Ошибка при получении проекта:", error);
        }
    }
    
        const scrollDown = () => {
            window.scrollBy({
              top: window.innerHeight,
              behavior: "smooth",
            });
          };

    const title = {
        ru: {
            location: 'Местоположение',
            project: 'проекта',
            building: 'постройки',
            year: 'Год',
            status: 'Статус',
            team: 'Команда',
            area: 'Показатели',
            client: 'Заказчик',
            field: 'Направление',
            partners: 'Партнеры',
        },
        en: {
            location: 'Location',
            project: 'of project',
            building: 'of building',
            year: 'Year',
            status: 'Status',
            team: 'Team',
            area: 'Area',
            client: 'Client',
            field: 'Field',
            partners: 'Partners',
        }
    }      

        const currentTitlesMemo = useMemo(() => {
            if (currentTitles && typeof currentTitles === 'object' && currentTitles[language]) {
                return setCurrentTitles[language];
            }
            return currentTitles['RU'] || {}; // fallback на RU, если язык не найден
        }, [currentTitles, language]);
    return(
        <main className={styles.project}>
            <div className={styles.project__banner}>
                {/* <img src={`https://testinscube.ru${project?.cover.url.replace(/\.[^.]+$/, "")}.webp`} alt="" /> */}
                <img src={`https://testinscube.ru${project?.cover?.url}`} alt="" />
                <button id="scroll-down" className={styles.scrollBtn} onClick={scrollDown}>
                    <svg fill="#fff" height="40px" width="40px" version="1.1" id="Layer_1" viewBox="0 0 330 330" >
                        <path id="XMLID_225_" d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393  c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393  s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"/>
                    </svg>
                </button>
            </div>
            <div className={styles.project__block}>
                <svg width="47" height="56" viewBox="0 0 47 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M44.3732 25.5412C44.0536 17.9973 42.6679 11.9345 39.6333 7.83797C36.6239 3.77536 31.9325 1.56957 24.7881 1.8694C10.5974 2.46493 1.717 14.8552 2.34575 29.8375C2.6626 37.3876 4.17098 43.4551 7.33184 47.5526C10.4669 51.6166 15.2881 53.8183 22.4338 53.5184C29.7077 53.2132 34.6186 52.3064 38.0068 48.5421C41.4208 44.7493 43.3866 37.9526 44.3732 25.5412Z" stroke="#73A533"/>
                    <path d="M24.5701 15.8817C24.55 15.4753 24.4738 15.2366 24.3793 15.1091C24.3117 15.0178 24.1963 14.9283 23.8872 14.9413C23.3674 14.9631 22.9624 15.412 22.9924 16.1277C23.0099 16.5446 23.0926 16.7907 23.1937 16.9218C23.269 17.0194 23.3965 17.1098 23.7067 17.0968C24.1453 17.0784 24.2504 17.0202 24.3102 16.9538C24.3973 16.857 24.5102 16.6051 24.5701 15.8817Z" stroke="#73A533"/>
                    <path d="M23.4883 22.582L23.2299 42.123L29.0922 42.2005" stroke="#73A533"/>
                </svg>
                <h2 style={{marginTop:'10px'}}>{project?.title}</h2>

                {/* <div className={styles.project__row}>
               
                        {project?.place&&  
                            (
                                <div className={styles.info}>
                                    <span>{currentTitlesMemo[language].location}</span>
                                    <span>{project?.place}</span>
                                </div>
                            )
                        }
                        {project?.client&&  
                            (
                                <div className={styles.info}>
                                    <span>{currentTitlesMemo[language].client}</span>
                                    <span>{project?.client}</span>
                                </div>
                            )
                        }
                        {project?.year&&  
                            (
                                <div className={styles.info}>
                                    <span>{currentTitlesMemo[language].year} {project?.project === 'project' ? title[language].project : title[language].building}</span>
                                    <span>{project?.year}</span>
                                </div>    
                            )
                        }
             
                        {project?.team&&  
                            (
                                <div className={styles.info}>
                                    <span>{currentTitlesMemo[language].team}</span>
                                    <span>{project?.team}</span>
                                </div>   
                            )
                        }

                        {project?.category&&  
                            (
                                <div className={styles.info}>
                                    <span>{currentTitlesMemo[language].field}</span>
                                    <span>{categories[project?.category]}</span>
                                </div>   
                            )
                        }
                        
                        {project?.projectStatus&&  
                            (
                                <div className={styles.info}>
                                    <span>{currentTitlesMemo[language].status}</span>
                                    <span>{project?.projectStatus}</span>
                                </div>   
                            )
                        }

                        {project?.partners&&  
                            (
                                <div className={styles.info}>
                                    <span>{currentTitlesMemo[language].partners}</span>
                                    <span>{project?.partners}</span>
                                </div>
                            )
                        }
                        {project?.area &&  
                            (
                                <div className={styles.info}>
                                    <span>{currentTitlesMemo[language].area}</span>
                                    <span>{project?.area}</span>
                                </div>      
                            )
                        }
                </div> */}
                
                { project?.richDescription !== null ?
                    <div style={{marginTop: 40}}>
                        <RichTextRenderer content={project?.richDescription}/>
                    </div>
                    :
                    <>
                        {project?.description &&
                            <div className={styles.project__description}>
                                {isMobile ? <p>
                                    {(isExpanded || project?.description?.length) <= maxLength
                                    ? project?.description
                                    : `${project?.description?.slice(0, maxLength)}...`}
                                </p>
                                : project?.description
                                }
                                {(project?.description?.length > maxLength && isMobile) &&
                                    <ExpandButton handler={toggleExpand} isExpanded={isExpanded} collapseTest="свернуть" expandText="читать далее"/>
                                }
                            </div>
                        }
                    </>
                }

            <svg width="49" height="51" viewBox="0 0 49 51" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginTop:'3em'}}>
                <path d="M33.9054 25.1319C33.7018 21.5004 32.9951 18.6398 31.5476 16.7388C30.1257 14.8715 27.9287 13.8546 24.5328 14.0421C17.8393 14.4117 13.6818 20.3126 14.0771 27.471C14.278 31.1091 15.0429 33.9761 16.5521 35.8799C18.035 37.7505 20.2972 38.7652 23.6943 38.5776C27.2196 38.3829 29.4905 37.9112 31.0313 36.1531C32.5976 34.3661 33.5061 31.1452 33.9054 25.1319Z" stroke="#73A533"/>
                <path d="M43.3767 12.6818C44.9873 11.9383 46.1121 11.1236 46.6819 10.1824C47.2296 9.27775 47.3114 8.17504 46.6366 6.70669C45.328 3.85938 42.0349 3.02153 38.9059 4.4595C37.2878 5.20315 36.1658 6.04645 35.6033 7.01771C35.0621 7.95234 34.9935 9.08699 35.6689 10.5564C36.3978 12.1426 36.9895 13.0057 37.9681 13.3563C38.9834 13.7201 40.5494 13.584 43.3767 12.6818Z" stroke="#73A533"/>
                <path d="M13.2903 5.97547C13.1894 4.20447 12.8442 2.85919 12.1777 1.98381C11.537 1.14243 10.5412 0.661869 8.92762 0.75097C5.79879 0.923749 3.81128 3.67995 4.00115 7.11827C4.09934 8.8964 4.47224 10.2496 5.16946 11.1291C5.84038 11.9754 6.87077 12.4555 8.4855 12.3663C10.2285 12.27 11.2485 12.0363 11.9337 11.2545C12.6445 10.4434 13.0924 8.93671 13.2903 5.97547Z" stroke="#73A533"/>
                <path d="M9.80484 38.3153C8.22703 37.5047 6.89238 37.1204 5.79992 37.2514C4.74991 37.3773 3.83094 37.9922 3.09 39.4283C1.65323 42.2132 3.02195 45.3234 6.08222 46.9023C7.66484 47.7188 9.02033 48.0831 10.1319 47.9278C11.2015 47.7784 12.1375 47.1334 12.879 45.6962C13.6794 44.1449 13.9948 43.1471 13.6681 42.1602C13.3292 41.1363 12.2573 39.9866 9.80484 38.3153Z" stroke="#73A533"/>
                <path d="M46.5481 41.743C46.4472 39.972 46.1021 38.6268 45.4355 37.7514C44.7948 36.91 43.799 36.4294 42.1854 36.5185C39.0566 36.6913 37.0691 39.4475 37.259 42.8859C37.3572 44.664 37.7301 46.0171 38.4273 46.8967C39.0982 47.743 40.1286 48.223 41.7433 48.1339C43.4863 48.0376 44.5063 47.8038 45.1915 47.022C45.9024 46.211 46.3502 44.7043 46.5481 41.743Z" stroke="#73A533"/>
                <path d="M10.9805 39.219L16.3141 35.4541" stroke="#73A533"/>
                <path d="M12.2354 10.9819L17.569 16.9431" stroke="#73A533"/>
                <path d="M36.3942 11.6084L31.0605 16.3146" stroke="#73A533"/>
                <path d="M38.2769 38.9052L32.002 33.8853" stroke="#73A533"/>
            </svg>
            </div>


            <div className={styles.project__gallery}>
                <Gallery gallery={project?.gallery}/>
            </div>
        </main>
    )
}

export default Project