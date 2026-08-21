import React, { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { useTheme } from "../../context/ThemeContext";

const cyprusBounds = [
  [34.3, 32.0], // Southwest
  [35.9, 34.8]  // Northeast
];

const createCustomPinIcon = () => {
  if (typeof window === "undefined") return null;
  return L.divIcon({
    html: `<div style="display: flex; align-items: center; justify-content: center; position: relative;">
      <svg width="30" height="38" viewBox="0 0 40 46" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 0C11.163 0 4 7.163 4 16c0 12.22 15.174 29.344 15.658 29.88a.465.465 0 0 0 .684 0C20.826 45.344 36 28.22 36 16 36 7.163 28.837 0 20 0z" fill="#DA1A35"/>
        <circle cx="20" cy="15" r="7.5" fill="#ffffff"/>
        <circle cx="20" cy="15" r="3.5" fill="#DA1A35"/>
      </svg>
    </div>`,
    className: "custom-map-pin",
    iconSize: [30, 38],
    iconAnchor: [15, 38]
  });
};

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
  const { isDark } = useTheme();
  const pinIcon = useMemo(() => createCustomPinIcon(), []);

  const tileUrl = isDark
    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";

  return (
    <div style={{ width: "100%", height: "100%", borderRadius: 12, overflow: "hidden", position: "relative" }}>
      <MapContainer
        center={center}
        zoom={11}
        minZoom={8}
        maxZoom={18}
        maxBounds={cyprusBounds}
        maxBoundsViscosity={1.0}
        style={{ width: "100%", height: "100%", background: isDark ? "#161625" : "#f4f4f4" }}
      >
        <TileLayer
          url={tileUrl}
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />
        {markerPosition && pinIcon && (
          <Marker position={markerPosition} icon={pinIcon} />
        )}
        <MapEvents onClick={onMapClick} />
        <MapController center={markerPosition} />
      </MapContainer>
      <style jsx global>{`
        .custom-map-pin {
          background: transparent !important;
          border: none !important;
        }
        .leaflet-control-zoom a {
          background-color: ${isDark ? "#161625" : "#ffffff"} !important;
          color: ${isDark ? "#EAEAF2" : "#333333"} !important;
          border-color: ${isDark ? "#2A2A40" : "#E8E8E8"} !important;
        }
        .leaflet-control-zoom a:hover {
          background-color: ${isDark ? "#202035" : "#F4F6F8"} !important;
        }
        .leaflet-container {
          font-family: 'Montserrat', sans-serif !important;
        }
      `}</style>
    </div>
  );
}
