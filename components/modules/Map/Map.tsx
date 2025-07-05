import { useAppSelector } from '@/lib/hooks';
import {AdvancedMarker, APIProvider, Map, Marker} from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
import styles from './Map.module.scss'
import {ColorScheme} from '@vis.gl/react-google-maps';

const containerStyle = {
    width: '100%',
    height: 'calc(100vh * 0.7)',
    filter: 'grayscale(100%)',
  };

  const center =  {lat: 55.77159633694424, lng: 37.656277387893766};

  const mark = <svg width="28" height="44" viewBox="0 0 28 44" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.959 0.5C17.5951 0.500019 20.6746 0.923158 22.8711 3.02637C25.0847 5.14612 26.5081 9.07345 27.4658 16.4277C27.4575 20.8299 25.3337 26.6419 22.6914 31.7998C21.3732 34.3731 19.9366 36.7633 18.5938 38.707C17.3565 40.498 16.2139 41.8813 15.333 42.6865C15.2527 42.6396 15.159 42.5793 15.0537 42.501C14.825 42.3308 14.5606 42.0973 14.2637 41.8027C13.6695 41.2133 12.9708 40.4013 12.208 39.4131C10.6836 37.4382 8.92574 34.7911 7.25977 31.8867C5.59386 28.9824 4.02611 25.8319 2.87598 22.8516C1.72199 19.8612 1.00495 17.0835 1.00488 14.9111C1.00488 10.4242 1.79945 6.82693 3.65918 4.35938C5.49728 1.9206 8.4429 0.5 12.959 0.5Z" fill="#73A533" stroke="#73A533"/>
<path d="M13.5254 7.36133C16.1329 7.36134 17.7779 7.6048 18.9424 8.71973C20.1243 9.85145 20.9181 11.9824 21.4561 16.1025C21.4533 18.6007 21.0513 20.5563 20.0938 21.8809C19.1578 23.1752 17.6263 23.9531 15.1396 23.9531C10.2617 23.953 7.02832 20.1016 7.02832 15.2383C7.02836 12.7361 7.47301 10.7726 8.47559 9.44238C9.45659 8.14086 11.0378 7.36133 13.5254 7.36133Z" fill="white" stroke="#73A533"/>
</svg>


const ProjectsMap = () =>{

    const [projects, setProjects] = useState([]);
    const language = useAppSelector(state=>state.projectsSlice.language)
    const [activeMarker, setActiveMarker] = useState('');

    async function getData(){
        try {
            const projectsResponse = await fetch(`https://testinscube.ru/api/projects?sort[0]=lat:desc&pagination[page]=1&pagination[pageSize]=100&locale=${language ? language?.toLowerCase() : 'ru' }&populate=*`)
            const projectsData = await projectsResponse.json()
            setProjects(projectsData.data);
        } catch (error) {
          console.error("Ошибка при загрузке данных:", error);
        }
    }

    useEffect(()=>{
      getData().then(()=>console.log(projects))
    }, [])
  
    return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_MAP_API_KEY} libraries={['marker']}>
    <Map 
    mapId={'bf51a910020fa25a'}
    defaultZoom={3} 
    defaultCenter={center}
    style={containerStyle}

    >
      {projects?.length > 0 && projects?.map((item) => {
        console.log(item)
        if(item.lat!==null || item.lng!==null){
          return(
            <AdvancedMarker
              position={{lat: item.lat, lng: item.lng}}
              onClick={()=>setActiveMarker(item?.documentId)}
            >
              <div className={styles.widget}>
                <svg width="28" height="44" viewBox="0 0 28 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.959 0.5C17.5951 0.500019 20.6746 0.923158 22.8711 3.02637C25.0847 5.14612 26.5081 9.07345 27.4658 16.4277C27.4575 20.8299 25.3337 26.6419 22.6914 31.7998C21.3732 34.3731 19.9366 36.7633 18.5938 38.707C17.3565 40.498 16.2139 41.8813 15.333 42.6865C15.2527 42.6396 15.159 42.5793 15.0537 42.501C14.825 42.3308 14.5606 42.0973 14.2637 41.8027C13.6695 41.2133 12.9708 40.4013 12.208 39.4131C10.6836 37.4382 8.92574 34.7911 7.25977 31.8867C5.59386 28.9824 4.02611 25.8319 2.87598 22.8516C1.72199 19.8612 1.00495 17.0835 1.00488 14.9111C1.00488 10.4242 1.79945 6.82693 3.65918 4.35938C5.49728 1.9206 8.4429 0.5 12.959 0.5Z" fill="#73A533" stroke="#73A533"/>
                  <path d="M13.5254 7.36133C16.1329 7.36134 17.7779 7.6048 18.9424 8.71973C20.1243 9.85145 20.9181 11.9824 21.4561 16.1025C21.4533 18.6007 21.0513 20.5563 20.0938 21.8809C19.1578 23.1752 17.6263 23.9531 15.1396 23.9531C10.2617 23.953 7.02832 20.1016 7.02832 15.2383C7.02836 12.7361 7.47301 10.7726 8.47559 9.44238C9.45659 8.14086 11.0378 7.36133 13.5254 7.36133Z" fill="white" stroke="#73A533"/>
                </svg>
                {activeMarker===item.documentId && 
                  <a className={styles.widgetBlock} href={`/project/${item?.documentId}`}>
                      <div className={styles.widgetBlock__text}>
                        <span>{item?.title}</span>
                      </div>
                      <div className={styles.widgetBlock__img}>
                        <img src={`https://testinscube.ru${item?.cover?.formats?.small?.url}`} alt="" />
                      </div>
                  </a>}
              </div>
            </AdvancedMarker>
          )
        }

      })}

    </Map>
  </APIProvider>
    //   <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={17} onLoad={onLoad}>
    //     {/* <Marker
    //       position={{ lat: 55.77159633694424, lng: 37.656277387893766}}
    //       icon={{
    //         url: mark.default, // положи png в public/icons
    //         scaledSize: new window.google.maps.Size(100, 100)
    //       }}
    //     /> */}

    //     {path.map((item) => (
    //         <Marker
    //         position={item}
    //       />
    //     ))}
    //   </GoogleMap>
    );
  
}

export default ProjectsMap;

