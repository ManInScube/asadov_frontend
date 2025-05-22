import { GoogleMap, useLoadScript, LoadScript, Marker, Polyline } from '@react-google-maps/api';

import myMarker from './marker.svg';
import { useCallback, useRef } from 'react';


const containerStyle = {
  width: '100%',
  height: '600px'
};

const center = {
  lat: 55.775350, // центр между метро и офисом
  lng: 37.656500
};

const path = [
  { lat: 55.77453831193603, lng: 37.65604589072316 }, // Метро Комсомольская
  { lat: 55.77413121488226, lng: 37.65431412914146 },
  { lat: 55.772265900086154, lng: 37.65527358043053 },
  { lat: 55.77236063370334, lng: 37.65666205047263},
  { lat: 55.77207488573865, lng: 37.656886393997915 },
  { lat: 55.77203736344322, lng: 37.65637357714996 },
  { lat: 55.77159633694424, lng: 37.656277387893766 }, // ASADOV
];

const markerPosition = path[path.length - 1];

const CustomMap = () => {
  const position = [55.77098, 37.6530258]; // Москва
  const mapRef = useRef<GoogleMap>();
  const onLoad = useCallback((map)=>(mapRef.current=map),[]);
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_API_KEY,
});

if(!isLoaded) return <div>Loading...</div>;
return <MapLocal/>


  function MapLocal(){
    return (
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={17} onLoad={onLoad}>
        <Polyline
          path={path}
          options={{
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 3,
            
            icons: [
              {
                icon: {
                  path: 'M 0,-1 0,1',
                  strokeOpacity: 1,
                  scale: 4,
                },
                offset: '0',
                repeat: '10px'
              }
            ]
          }}
        />
        <Marker
          position={markerPosition}
          icon={{
            url: 'marker.png', // положи png в public/icons
            scaledSize: typeof window !== 'undefined' && window.google?.maps
              ? new window.google.maps.Size(32, 32)
              : undefined,
          }}
        />
      </GoogleMap>
    );
  }


};

export default CustomMap;
