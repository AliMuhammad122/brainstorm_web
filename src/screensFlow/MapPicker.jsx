import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";

const cyprusBounds = [
  [34.3, 32.0], // Southwest
  [35.9, 34.8]  // Northeast
];

const customPinIcon = typeof window !== "undefined" ? L.divIcon({
  html: `<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; width: 30px; height: 30px;">
    <div style="background-color: var(--primary, #E31C3D); width: 20px; height: 20px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 2px solid #fff; box-shadow: 0 2px 5px rgba(0,0,0,0.3); margin-top: -10px;"></div>
    <div style="background-color: rgba(0, 0, 0, 0.25); width: 10px; height: 4px; border-radius: 50%; margin-top: 2px;"></div>
  </div>`,
  className: "custom-map-pin",
  iconSize: [30, 30],
  iconAnchor: [15, 26]
}) : null;

function MapEvents({ onClick }) {
  useMapEvents({
    click(e) {
      if (onClick) {
        onClick(e.latlng);
      }
    }
  });
  return null;
}

function MapController({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center && center[0] && center[1]) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);
  return null;
}

export default function MapPicker({ markerPosition, onMapClick }) {
  const center = markerPosition || [34.6786, 33.0413]; // Limassol

  return (
    <div style={{ width: "100%", height: "100%", borderRadius: 16, overflow: "hidden", position: "relative" }}>
      <MapContainer
        center={center}
        zoom={10}
        minZoom={8}
        maxZoom={16}
        maxBounds={cyprusBounds}
        maxBoundsViscosity={1.0}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {markerPosition && (
          <Marker position={markerPosition} icon={customPinIcon} />
        )}
        <MapEvents onClick={onMapClick} />
        <MapController center={markerPosition} />
      </MapContainer>
    </div>
  );
}
