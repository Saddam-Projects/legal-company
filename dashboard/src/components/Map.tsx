import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';

export default function MapComponent({ lat, long, name }: { lat: number; long: number; name: string }) {
  return (
    <MapContainer className="z-0" center={[lat, long]} zoom={13} scrollWheelZoom={false}>
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[lat, long]}>
        <Popup>{name}</Popup>
      </Marker>
    </MapContainer>
  );
}
