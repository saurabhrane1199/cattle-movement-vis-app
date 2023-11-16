// Map.tsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';

interface MapProps {
  rowData : any[] | undefined
  dataType : string
}


interface MapRouteProps {
  startCoords: [number, number];
  endCoords: [number, number];
}

interface MapMarkerProps {
  startCoords: [number, number];
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

const MapMarker: React.FC<MapMarkerProps> = ({ startCoords }) => {
  return(
  <div>
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
    <Marker position={startCoords} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41]})}/>
  </div>)
};


const Map: React.FC<MapProps> = ({ rowData, dataType }) => {

  return (
    <MapContainer
      center={rowData ? 
        dataType==="movements" ? [rowData[0]["origin_Lat"], rowData[0]["origin_Lon"]] :
        [rowData[0]["lat"], rowData[0]["long"]]
        : 
        [0,0]}
      zoom={4}
      style={{ height: '500px', width: '100%' }}
    >
      {rowData ? (rowData.map((data) => (
          dataType==='movements' ? 
          <MapRoute startCoords={[data["origin_Lat"], data["origin_Lon"]]} endCoords={[data["destination_Lat"], data["destination_Long"]]}/>:
          <MapMarker startCoords={[data["lat"], data["long"]]}/>
        ))): ''}
    
    </MapContainer>
  );
};

export default Map;
