import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';

import myMarker from './marker.svg';


const containerStyle = {
  width: '100%',
  height: '600px'
};

const center = {
  lat: 55.775350, // центр между метро и офисом
  lng: 37.656500
};

const path = [
  { lat: 55.776949, lng: 37.654331 }, // Метро Комсомольская
  { lat: 55.776283, lng: 37.654163 },
  { lat: 55.775743, lng: 37.653443 },
  { lat: 55.774920, lng: 37.652890 },
  { lat: 55.774661, lng: 37.652899 },
  { lat: 55.774553, lng: 37.653084 },
  { lat: 55.774435, lng: 37.654121 },
  { lat: 55.773945, lng: 37.655091 },
  { lat: 55.7707553, lng: 37.6529002 }, // ASADOV
];

const markerPosition = path[path.length - 1];

const styles = [
  {
    "elementType": "geometry",
    "stylers": [
      { "color": "#f5f5f5" }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      { "visibility": "off" }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      { "color": "#616161" }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      { "color": "#f5f5f5" }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      { "color": "#bdbdbd" }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      { "color": "#eeeeee" }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      { "color": "#757575" }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      { "color": "#ffffff" }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      { "color": "#757575" }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      { "color": "#dadada" }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      { "color": "#9e9e9e" }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      { "color": "#e5e5e5" }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      { "color": "#eeeeee" }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      { "color": "#c9c9c9" }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      { "color": "#9e9e9e" }
    ]
  }
]

const CustomMap = () => {
  const position = [55.77098, 37.6530258]; // Москва

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_MAP_API_KEY}>
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={17}
    options={{ styles }}
    >
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
  </LoadScript>
  );
};

export default CustomMap;
