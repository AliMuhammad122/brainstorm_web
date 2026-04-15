import React, { useEffect, useRef } from "react";
import { useTheme } from "../../context/ThemeContext";

const RESTAURANT = { lat: 34.684, lng: 33.037 };
const DESTINATION = { lat: 34.677, lng: 33.053 };

const ROUTE_COORDS = [
  [34.684, 33.037],
  [34.6845, 33.039],
  [34.687, 33.039],
  [34.687, 33.044],
  [34.685, 33.044],
  [34.685, 33.048],
  [34.682, 33.048],
  [34.682, 33.051],
  [34.679, 33.051],
  [34.677, 33.053],
];

const ICON_SIZE = [36, 46];
const ICON_ANCHOR = [18, 46];

function restaurantIconHtml() {
  const red = "#DA1A35"; // TGI primary red mapping
  const svg = `<svg width="36" height="46" viewBox="0 0 40 46" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 0C11.163 0 4 7.163 4 16c0 12.22 15.174 29.344 15.658 29.88a.465.465 0 0 0 .684 0C20.826 45.344 36 28.22 36 16 36 7.163 28.837 0 20 0z" fill="${red}"/>
<circle cx="20" cy="15" r="8" fill="#fff"/>
<path d="M16 11h2v3h4v-3h2v8h-8v-8zm2 3h4v1h-4v-1z" fill="${red}"/>
</svg>`;
  return svg;
}

function destinationIconHtml() {
  const red = "#DA1A35";
  const svg = `<svg width="36" height="46" viewBox="0 0 40 46" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 0C11.163 0 4 7.163 4 16c0 12.22 15.174 29.344 15.658 29.88a.465.465 0 0 0 .684 0C20.826 45.344 36 28.22 36 16 36 7.163 28.837 0 20 0z" fill="${red}"/>
<circle cx="20" cy="15" r="8" fill="#fff"/>
<path d="M16 18v-4.5L20 11l4 2.5V18h-2.5v-3h-3v3H16z" fill="${red}"/>
</svg>`;
  return svg;
}

/**
 * Leaflet map rendered client-side only.
 * Shows route from restaurant to delivery destination with markers.
 */
export default function TrackOrderMap({ height = "100%" }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    if (typeof window === "undefined") return;

    let L;
    const init = async () => {
      L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");

      if (!mapRef.current) return;

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      const map = L.map(mapRef.current, {
        center: [34.681, 33.045],
        zoom: 15,
        zoomControl: false,
        attributionControl: false,
        dragging: true,
        scrollWheelZoom: false,
      });

      const tileUrl = isDark
        ? "https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
        : "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png";

      L.tileLayer(tileUrl, {
        maxZoom: 19,
      }).addTo(map);

      const restaurantIcon = L.divIcon({
        html: restaurantIconHtml(),
        className: "",
        iconSize: ICON_SIZE,
        iconAnchor: ICON_ANCHOR,
      });

      const destIcon = L.divIcon({
        html: destinationIconHtml(),
        className: "",
        iconSize: ICON_SIZE,
        iconAnchor: ICON_ANCHOR,
      });

      L.marker([RESTAURANT.lat, RESTAURANT.lng], { icon: restaurantIcon }).addTo(map);
      L.marker([DESTINATION.lat, DESTINATION.lng], { icon: destIcon }).addTo(map);

      const primary = "#DA1A35"; // Ensure exact red is used

      L.polyline(ROUTE_COORDS, {
        color: primary,
        weight: 3,
        opacity: 1,
        smoothFactor: 1,
      }).addTo(map);

      mapInstanceRef.current = map;

      setTimeout(() => map.invalidateSize(), 200);
    };

    init();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isDark]);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height,
        background: "var(--surface-alt)",
      }}
    />
  );
}
