// Map.tsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import greenLocationPin from "../../assets/greenLocationPin.png"
import redLocationPin from "../../assets/redLocationPin.png"
import {Icon} from 'leaflet'
import 'leaflet/dist/leaflet.css';

interface MapProps {
  rowData : any[] | undefined
  dataType : string
}


interface MapRouteProps {
  startCoords: [number, number];
  endCoords: [number, number];
  originPremID : string;
  destinationPremID : string;
}

interface MapMarkerProps {
  startCoords: [number, number];
  premId : string;
}

const MapRoute: React.FC<MapRouteProps> = ({ startCoords, endCoords, originPremID, destinationPremID }) => {
      return(
      <div>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        <Marker position={startCoords} icon={new Icon({iconUrl: greenLocationPin, iconSize: [40, 40]})}>
          <Popup>
             <b>Origin Prem Id</b>: {originPremID}
          </Popup>
        </Marker>
        <Marker position={endCoords} icon={new Icon({iconUrl: redLocationPin, iconSize: [40, 40]})}>
         <Popup>
            <b>Destination Prem Id</b>: {destinationPremID}
         </Popup>
        </Marker>
        <Polyline pathOptions={{ color: 'blue' }} positions={[startCoords, endCoords]} />
      </div>)
};

const MapMarker: React.FC<MapMarkerProps> = ({ startCoords, premId }) => {
  return(
  <div>
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
    <Marker position={startCoords} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41]})}>
          <Popup>
            <b>Premise Id</b>: {premId}
          </Popup> 
    </Marker>
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
      zoom={4.2}
      style={{ height: '500px', width: '100%' }}
    >
      {rowData ? (rowData.map((data) => (
          dataType==='movements' ? 
          <MapRoute startCoords={
            [data["origin_Lat"],
            data["origin_Lon"]]} 
            endCoords={[data["destination_Lat"],
                        data["destination_Long"]]}
            originPremID={data["new_originpremid"]}
            destinationPremID={data["new_destinationpremid"]}/>:
          <MapMarker startCoords={[data["lat"], data["long"]]} premId={data["premiseid"]}/>
        ))): ''}
    
    </MapContainer>
  );
};

export default Map;
