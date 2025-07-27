import { GoogleMap, useLoadScript, LoadScript, Marker, Polyline } from '@react-google-maps/api';
// import {AdvancedMarker, APIProvider, Map, Marker} from '@vis.gl/react-google-maps';

import myMarker from './marker.svg';
import { useCallback, useEffect, useRef } from 'react';


const containerStyle = {
  width: '100%',
  height: 'calc(100vh * 0.45)',
  minHeight: '544px',
  // filter: 'grayscale(100%)',
};


const mark = <svg width="28" height="44" viewBox="0 0 28 44" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.959 0.5C17.5951 0.500019 20.6746 0.923158 22.8711 3.02637C25.0847 5.14612 26.5081 9.07345 27.4658 16.4277C27.4575 20.8299 25.3337 26.6419 22.6914 31.7998C21.3732 34.3731 19.9366 36.7633 18.5938 38.707C17.3565 40.498 16.2139 41.8813 15.333 42.6865C15.2527 42.6396 15.159 42.5793 15.0537 42.501C14.825 42.3308 14.5606 42.0973 14.2637 41.8027C13.6695 41.2133 12.9708 40.4013 12.208 39.4131C10.6836 37.4382 8.92574 34.7911 7.25977 31.8867C5.59386 28.9824 4.02611 25.8319 2.87598 22.8516C1.72199 19.8612 1.00495 17.0835 1.00488 14.9111C1.00488 10.4242 1.79945 6.82693 3.65918 4.35938C5.49728 1.9206 8.4429 0.5 12.959 0.5Z" fill="#73A533" stroke="#73A533"/>
<path d="M13.5254 7.36133C16.1329 7.36134 17.7779 7.6048 18.9424 8.71973C20.1243 9.85145 20.9181 11.9824 21.4561 16.1025C21.4533 18.6007 21.0513 20.5563 20.0938 21.8809C19.1578 23.1752 17.6263 23.9531 15.1396 23.9531C10.2617 23.953 7.02832 20.1016 7.02832 15.2383C7.02836 12.7361 7.47301 10.7726 8.47559 9.44238C9.45659 8.14086 11.0378 7.36133 13.5254 7.36133Z" fill="white" stroke="#73A533"/>
</svg>


const path = [
  { lat: 55.77453831193603, lng: 37.65604589072316 }, // Метро Комсомольская
  { lat: 55.77413121488226, lng: 37.65431412914146 },
  { lat: 55.772265900086154, lng: 37.65527358043053 },
  { lat: 55.77236063370334, lng: 37.65666205047263},
  { lat: 55.77207488573865, lng: 37.656886393997915 },
  { lat: 55.77203736344322, lng: 37.65637357714996 },
  { lat: 55.77159633694424, lng: 37.656277387893766 }, // ASADOV
];

const center =  path[path.length - 1];


const markerPosition = path[path.length - 1];

const CustomMap = () => {
  const mapRef = useRef<GoogleMap>();
  const onLoad = useCallback((map)=>(mapRef.current=map),[]);
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_API_KEY,
});

if(!isLoaded) return <div>Loading...</div>;
return <MapLocal/>

// return (
//   <APIProvider apiKey={process.env.NEXT_PUBLIC_MAP_API_KEY} libraries={['marker']}>
//   <Map 
//     mapId={'bf51a910020fa25a'}
//     defaultZoom={3} 
//     defaultCenter={center}
//     style={containerStyle}

//     >
//         <Polyline
//           path={path}
//           options={{
//             strokeColor: '#FF0000',
//             strokeOpacity: 1.0,
//             strokeWeight: 3,
//             icons: [
//               {
//                   icon: mark,
//                   offset: "0",
//                   repeat: "20px"
//               }
//           ]
//           }}
//         />

//     </Map>

// </APIProvider>
// )


  function MapLocal(){

    useEffect(()=>{
      fetch('https://payload.lockbox.api.cloud.yandex.net/lockbox/v1/secrets/e6qhpnm975iroso0binc/payload')
      .then((res)=>{
        console.log(res.json().secretId)
      })
    }, [])
    return (


      <GoogleMap mapId={'5d9c4da207da9cb21895902e'} mapContainerStyle={containerStyle} center={center} zoom={17} onLoad={onLoad}
      options={{
        mapId: '5d9c4da207da9cb21895902e', // Ваш mapId из Cloud Console
        // disableDefaultUI: true // Опционально: скрыть стандартные элементы
      }}
      >
        <Polyline
          path={path}
          options={{
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 3,
            icons: [
              {
                  icon: mark,
                  offset: "0",
                  repeat: "20px"
              }
          ]
          }}
        />
        <Marker
          position={{ lat: 55.77433831193603, lng: 37.65644589072316 }}
          icon={{
            url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' width='125px' height='85.9px' viewBox='337.5 232.3 125 85.9' xml:space='preserve'%3E%3Cpolygon fill='%23FF0013' points='453.9,306.2 424.7,232.3 400,275.5 375.4,232.3 346.1,306.2 337.5,306.2 337.5,317.4 381.7,317.4 381.7,306.2 375.1,306.2 381.5,287.8 400,318.2 418.5,287.8 424.9,306.2 418.3,306.2 418.3,317.4 462.5,317.4 462.5,306.2'/%3E%3C/svg%3E",
            scaledSize: new window.google.maps.Size(50, 50),
            size: new google.maps.Size(125, 85.9),
            // anchor: new google.maps.Point(14, 44)
          }}
        />
        <Marker
          position={{ lat: 55.77159633694424, lng: 37.656277387893766}}
          icon={{
            url: "data:image/svg+xml,%3Csvg fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.959 0.5C17.5951 0.500019 20.6746 0.923158 22.8711 3.02637C25.0847 5.14612 26.5081 9.07345 27.4658 16.4277C27.4575 20.8299 25.3337 26.6419 22.6914 31.7998C21.3732 34.3731 19.9366 36.7633 18.5938 38.707C17.3565 40.498 16.2139 41.8813 15.333 42.6865C15.2527 42.6396 15.159 42.5793 15.0537 42.501C14.825 42.3308 14.5606 42.0973 14.2637 41.8027C13.6695 41.2133 12.9708 40.4013 12.208 39.4131C10.6836 37.4382 8.92574 34.7911 7.25977 31.8867C5.59386 28.9824 4.02611 25.8319 2.87598 22.8516C1.72199 19.8612 1.00495 17.0835 1.00488 14.9111C1.00488 10.4242 1.79945 6.82693 3.65918 4.35938C5.49728 1.9206 8.4429 0.5 12.959 0.5Z' fill='%2373A533' stroke='%2373A533'/%3E%3Cpath d='M13.5254 7.36133C16.1329 7.36134 17.7779 7.6048 18.9424 8.71973C20.1243 9.85145 20.9181 11.9824 21.4561 16.1025C21.4533 18.6007 21.0513 20.5563 20.0938 21.8809C19.1578 23.1752 17.6263 23.9531 15.1396 23.9531C10.2617 23.953 7.02832 20.1016 7.02832 15.2383C7.02836 12.7361 7.47301 10.7726 8.47559 9.44238C9.45659 8.14086 11.0378 7.36133 13.5254 7.36133Z' fill='white' stroke='%2373A533'/%3E%3C/svg%3E",            
            scaledSize: new window.google.maps.Size(100, 100),
            size: new google.maps.Size(28, 44),
            // anchor: new google.maps.Point(14, 44)
          }}
        />
      </GoogleMap>
    );
  }


};

export default CustomMap;
