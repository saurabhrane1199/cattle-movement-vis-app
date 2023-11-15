// Map.tsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';

interface MapProps {
  rowData : any[] | undefined
}


interface MapRouteProps {
  startCoords: [number, number];
  endCoords: [number, number];
}


const MapRoute: React.FC<MapRouteProps> = ({ startCoords, endCoords }) => {
      return(
      <div>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        <Marker position={startCoords} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41]})}/>
        <Marker position={endCoords} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41]})}/>
        <Polyline pathOptions={{ color: 'blue' }} positions={[startCoords, endCoords]} />
      </div>)
};


const Map: React.FC<MapProps> = ({ rowData }) => {

  // const [routeData, setRouteData] = useState<any[]>();

  // useEffect(() => {

  //   fetch(`http://127.0.0.1:5000/movements`)
  //     .then((result) => result.json())
  //     .then((rowData) => {
  //       setRouteData(rowData['movements'])
  //     });
  // }, []);

  return (
    <MapContainer
      center={rowData ? [rowData[0]["origin_Lat"], rowData[0]["origin_Lon"]] : [0,0]}
      zoom={4}
      style={{ height: '500px', width: '100%' }}
    >
      {rowData ? (rowData.map((data) => (
          <MapRoute startCoords={[data["origin_Lat"], data["origin_Lon"]]} endCoords={[data["destination_Lat"], data["destination_Long"]]}/>
        ))): ''}
    
    </MapContainer>
  );
};

export default Map;
