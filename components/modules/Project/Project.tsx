import { useAppSelector } from "@/lib/hooks"
import { useEffect, useState } from "react"
import styles from './Project.module.scss'
import Gallery from "../Gallery/Gallery";


const Project = () =>{
    const [project, setProject] = useState(null);
    const url = window.location.pathname; // Получаем путь, например, "/project/40"
    const id = url.substring(url.lastIndexOf("/") + 1); // Извлекаем цифру после последнего "/"

    const [isExpanded, setIsExpanded] = useState(false);
    const maxLength = 200;

    const toggleExpand = () => {
      setIsExpanded(!isExpanded);
    };

    useEffect(()=>{
        getProject()
    },[])

    const projectId = useAppSelector(state=>state.projectsSlice.currentProject)
        async function getProject(){
            await fetch(`https://testinscube.ru/api/projects?filters[documentId][$eq]=${id}&populate=*`)
            .then((response)=>{
                return response.json()
            })
            .then((data)=>{
                console.log(data)
                setProject(data.data[0])
            })
        }
        const scrollDown = () => {
            window.scrollBy({
              top: window.innerHeight,
              behavior: "smooth",
            });
          };
    return(
        <main className={styles.project}>
            <div className={styles.project__banner}>
                <img src={`https://testinscube.ru${project?.cover.url}`} alt="" />
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
                <h2>{project?.title}</h2>

                <div className={styles.project__row}>
                    <div>
                        <div className={styles.info}>
                            <span>Место нахождения</span>
                            <span>{project?.place}</span>
                        </div>
                        <div className={styles.info}>
                            <span>Клиент</span>
                            <span>{project?.client}</span>
                        </div>
                        <div className={styles.info}>
                            <span>Год</span>
                            <span>{project?.year}</span>
                        </div>       
                    </div>
                    <div>
                        <div className={styles.info}>
                            <span>Команда</span>
                            <span>{project?.team}</span>
                        </div>    
                    </div>
                    <div>
                        <div className={styles.info}>
                            <span>Партнеры</span>
                            <span>{project?.partners}</span>
                        </div>
                        <div className={styles.info}>
                            <span>Показатели</span>
                            <span>5000</span>
                        </div>      
                    </div>
                </div>


                <div className={styles.project__description}>
      <p>
        {isExpanded || project?.description?.length <= maxLength
          ? project?.description
          : `${project?.description?.slice(0, maxLength)}...`}
      </p>
      {project?.description?.length > maxLength && (
        <button onClick={toggleExpand} className={styles.expandButton}>
          {isExpanded ? "Свернуть" : "Читать далее"}
        </button>
      )}
    </div>
            </div>
            <div className={styles.project__gallery}>
                <Gallery gallery={project?.gallery}/>
            </div>
        </main>
    )
}

export default Project