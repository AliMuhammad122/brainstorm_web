import React, { useEffect, useRef } from "react";
import { useTheme } from "../../context/ThemeContext";
import RestaurantIcon from "../../public/assets/icons/storemarker.svg";
import { renderToStaticMarkup } from "react-dom/server";

const ICON_SIZE = [36, 46];
const ICON_ANCHOR = [18, 46];

// function restaurantIconHtml() {
//   const red = "#DA1A35"; // TGI primary red mapping
  
//   return <RestaurantIcon />;
// }

function destinationIconHtml() {
  const red = "#DA1A35";
  const svg = `<svg width="36" height="46" viewBox="0 0 40 46" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 0C11.163 0 4 7.163 4 16c0 12.22 15.174 29.344 15.658 29.88a.465.465 0 0 0 .684 0C20.826 45.344 36 28.22 36 16 36 7.163 28.837 0 20 0z" fill="${red}"/>
<circle cx="20" cy="15" r="8" fill="#fff"/>
<path d="M16 18v-4.5L20 11l4 2.5V18h-2.5v-3h-3v3H16z" fill="${red}"/>
</svg>`;
  return svg;
}

// Fallback coords for standard delivery routing
const DELIVERY_RESTAURANT = { lat: 34.684, lng: 33.037 };
const DELIVERY_DESTINATION = { lat: 34.677, lng: 33.053 };
const DELIVERY_ROUTE_COORDS = [
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

export default function TrackOrderMap({
  height = "100%",
  orderType = "delivery",
  storeLocation = null,
  userLocation = null,
}) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const { isDark } = useTheme();

  const isStoreCoordsValid =
    storeLocation &&
    !isNaN(parseFloat(storeLocation.latitude)) &&
    !isNaN(parseFloat(storeLocation.longitude));

  const isUserCoordsValid =
    userLocation &&
    !isNaN(parseFloat(userLocation.latitude)) &&
    !isNaN(parseFloat(userLocation.longitude));

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (orderType === "pickup" && !isStoreCoordsValid) return;

    let L;
    const init = async () => {
      L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");

      if (!mapRef.current) return;

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      // Initial center coordinates
      let initialCenter = [34.681, 33.045];
      let initialZoom = 15;

      if (orderType === "pickup") {
        if (isStoreCoordsValid) {
          const storeLat = parseFloat(storeLocation.latitude);
          const storeLng = parseFloat(storeLocation.longitude);
          initialCenter = [storeLat - 0.0008, storeLng + 0.0004];
          initialZoom = 18;
        }
      }

      const map = L.map(mapRef.current, {
        center: initialCenter,
        zoom: initialZoom,
        zoomControl: false,
        attributionControl: false,
        dragging: true,
        scrollWheelZoom: false,
      });

      const tileUrl = isDark
        ? "https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
        : "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png";

      L.tileLayer(tileUrl, {
        maxZoom: 29,
      }).addTo(map);

      const storeIcon = L.divIcon({
        html: renderToStaticMarkup(<RestaurantIcon />),
        className: "custom-store-pin",
        iconSize: ICON_SIZE,
        iconAnchor: ICON_ANCHOR,
      });

      const userIcon = L.divIcon({
        html: destinationIconHtml(),
        className: "custom-dest-pin",
        iconSize: ICON_SIZE,
        iconAnchor: ICON_ANCHOR,
      });

      if (orderType === "pickup") {
        // For pickup orders: Destination marker is the store. User pin is omitted per Figma spec.
        const storeLatLng = [
          parseFloat(storeLocation.latitude),
          parseFloat(storeLocation.longitude),
        ];
        L.marker(storeLatLng, { icon: storeIcon }).addTo(map);

        // Center map offset slightly South-East so the store marker floats in the upper-left quadrant
        const offsetLatLng = [
          storeLatLng[0] - 0.0008,
          storeLatLng[1] + 0.0004
        ];
        map.setView(offsetLatLng, 18);
      } else {
        // Delivery order (traditional simulated behavior)
        L.marker([DELIVERY_RESTAURANT.lat, DELIVERY_RESTAURANT.lng], {
          icon: storeIcon,
        }).addTo(map);
        L.marker([DELIVERY_DESTINATION.lat, DELIVERY_DESTINATION.lng], {
          icon: userIcon,
        }).addTo(map);

        const primary = "#DA1A35";
        L.polyline(DELIVERY_ROUTE_COORDS, {
          color: primary,
          weight: 3,
          opacity: 1,
          smoothFactor: 1,
        }).addTo(map);
      }

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
  }, [isDark, orderType, storeLocation, userLocation, isStoreCoordsValid, isUserCoordsValid]);

  if (orderType === "pickup" && !isStoreCoordsValid) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: height,
          background: "var(--surface-alt)",
          color: "var(--subtle)",
          fontSize: 12,
          padding: 24,
          textAlign: "center",
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          style={{ marginBottom: 12, opacity: 0.6 }}
        >
          <path
            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
            fill="currentColor"
          />
        </svg>
        <span>Store location coordinates not available.</span>
      </div>
    );
  }

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
