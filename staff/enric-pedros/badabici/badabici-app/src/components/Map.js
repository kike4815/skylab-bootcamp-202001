import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet"
import "./Map.css"


export default function App() {

const position = [41.432184, 2.218863]
    return (
        <Map center={[41.432184, 2.218863]} zoom={15}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
                <Popup>BADABICI SPORT <br/> tlf. 933811943 </Popup>
            </Marker>
        </Map>
    );
}