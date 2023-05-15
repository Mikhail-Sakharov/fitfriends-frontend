import {useRef} from 'react';
import useMap from '../../hooks/use-map.ts/use-map';
import {SubwayStation, SubwayStationLocationMap} from '../../types/subway-station.enum';
import leaflet, {Marker} from 'leaflet';
import {URL_MARKER} from '../../const';

type MapProps = {
  location: SubwayStation | undefined;
};

function Map({location}: MapProps): JSX.Element {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const map = useMap(mapRef, location);

  const customIcon = leaflet.icon({
    iconUrl: URL_MARKER,
    iconSize: [99, 51],
    iconAnchor: [50, 100],
  });

  if (location && map) {
    const marker = new Marker({
      lat: SubwayStationLocationMap[location].latitude,
      lng: SubwayStationLocationMap[location].longitude,
    });

    marker.setIcon(customIcon).addTo(map);
  }

  return <div ref={mapRef} className="popup__map" style={{height: '623px'}}></div>;
}

export default Map;
