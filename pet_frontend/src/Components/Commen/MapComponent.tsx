// import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
// import L from 'leaflet';

// // Fix default marker icon issue in Leaflet
// delete (L.Icon.Default.prototype as any)._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//   iconUrl: require('leaflet/dist/images/marker-icon.png'),
//   shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
// });

// const LocationSelector = ({ setLocation }: { setLocation: (loc: Location) => void }) => {
//   useMapEvents({
//     click(e) {
//       setLocation({ latitude: e.latlng.lat, longitude: e.latlng.lng });
//     },
//   });

//   return null;
// };
