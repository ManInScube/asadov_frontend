import {AdvancedMarker, APIProvider, Map, Marker} from '@vis.gl/react-google-maps';
const containerStyle = {
    width: '100%',
    height: 'calc(100vh * 0.7)',
  };

  const center =  {lat: 55.77159633694424, lng: 37.656277387893766};



const ProjectMap = ({position}) =>{  
    return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_MAP_API_KEY} libraries={['marker']}>
    <Map 
    mapId={'5d9c4da207da9cb21895902e'}
    defaultZoom={3} 
    defaultCenter={center}
    style={containerStyle}

    >
           {position && <AdvancedMarker
              position={{lat: position.lat, lng: position.lng}}
            >
            </AdvancedMarker>}
    </Map>
  </APIProvider>
    );
  
}

export default ProjectMap;

