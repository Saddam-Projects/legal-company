import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

export default function MapComponent() {
  return (
    <MapContainer center={[-6.2508211, 106.9760332]} zoom={13} scrollWheelZoom={false}>
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[-6.2508211, 106.9760332]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}
