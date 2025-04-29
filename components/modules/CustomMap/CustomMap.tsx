import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Фикс для отображения маркеров (иначе иконки могут не подгрузиться)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const CustomMap = () => {
  const position = [55.77098, 37.6530258]; // Москва

  return (
    <MapContainer center={position} zoom={15} style={{ height: 'calc(100vh / 1.5)', width: '100%' }}>
      {/* Вместо этого url можно вставить свою кастомную тему, см. шаг 4 */}
      <TileLayer
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a>'
        url="	https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=z2CbOVJ2YZI9uWcLWfhc"
      />
      <Marker position={position}>
        <Popup>Твоя точка</Popup>
      </Marker>
    </MapContainer>
  );
};

export default CustomMap;
