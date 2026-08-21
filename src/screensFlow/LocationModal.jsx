import React, { useState } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";
import { MdClose, MdSearch, MdOutlineLocationOn, MdDeleteOutline } from "react-icons/md";
import { useScreensFlow } from "../../context/ScreensFlowContext";
import { useTheme } from "../../context/ThemeContext";
import CloseIcon from "../../public/assets/icons/close.svg"
import SearchIcon from "../../public/assets/icons/search2.svg"
import LocationIcon from "../../public/assets/icons/location.svg"

// Dynamically import the map picker with no SSR to avoid window is not defined errors in Next.js
const MapPicker = dynamic(() => import("./MapPicker"), { ssr: false });

// Cyprus bounding box coordinates
const CYPRUS_BOUNDS = {
  latMin: 34.3,
  latMax: 35.9,
  lngMin: 32.0,
  lngMax: 34.8
};

export default function LocationModal({ onClose }) {
  const { state, setSelectedLocation, saveAddress, removeSavedAddress } = useScreensFlow();
  const { isDark } = useTheme();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedPos, setSelectedPos] = useState(
    state.selectedLocation
      ? [state.selectedLocation.latitude, state.selectedLocation.longitude]
      : [34.6786, 33.0413] // Limassol center
  );
  const [selectedAddressText, setSelectedAddressText] = useState(
    state.selectedLocation?.address || "Limassol, Cyprus"
  );
  const [errorMessage, setErrorMessage] = useState("");

  const pageBg = isDark ? "#0D0D1A" : "#FFFFFF";
  const cardBg = isDark ? "#161625" : "#F4F6F8";
  const textColor = isDark ? "#EAEAF2" : "#333333";
  const subTextColor = isDark ? "#EAEAF2" : "#333333";
  const inputBg = isDark ? "#161625" : "#F4F6F8";
  const itemHoverBg = isDark ? "#202035" : "#F4F6F8";
  const borderColor = isDark ? "#2A2A40" : "#E8E8E8";
  const closeBtnBg = isDark ? "#161625" : "#F4F6F8";
  const closeBtnColor = isDark ? "#C8C8D8" : "#333333";

  // Check if coordinates are within Cyprus boundaries
  const isWithinCyprus = (lat, lng) => {
    return (
      lat >= CYPRUS_BOUNDS.latMin &&
      lat <= CYPRUS_BOUNDS.latMax &&
      lng >= CYPRUS_BOUNDS.lngMin &&
      lng <= CYPRUS_BOUNDS.lngMax
    );
  };

  // Geocode address search
  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setErrorMessage("");
    try {
      // Limit search to Cyprus
      const url = `https://nominatim.openstreetmap.org/search?format=json&countrycodes=cy&q=${encodeURIComponent(
        searchQuery
      )}`;
      const res = await fetch(url, {
        headers: {
          "Accept-Language": "en"
        }
      });
      const data = await res.json();
      setSearchResults(data);
      if (data.length === 0) {
        setErrorMessage("No locations found in Cyprus.");
      }
    } catch (err) {
      console.error("Geocoding search error:", err);
      setErrorMessage("Failed to search location. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  // Reverse geocoding on map click
  const handleMapClick = async (latlng) => {
    const { lat, lng } = latlng;
    
    if (!isWithinCyprus(lat, lng)) {
      setErrorMessage("Please select a location within Cyprus only.");
      return;
    }
    
    setErrorMessage("");
    setSelectedPos([lat, lng]);
    setSelectedAddressText("Fetching address...");

    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
      const res = await fetch(url, {
        headers: {
          "Accept-Language": "en"
        }
      });
      const data = await res.json();
      if (data && data.display_name) {
        const parts = data.display_name.split(",");
        const cleanAddress = parts.slice(0, 3).join(",").trim();
        setSelectedAddressText(cleanAddress);
      } else {
        setSelectedAddressText(`Cyprus Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`);
      }
    } catch (err) {
      console.error("Reverse geocoding error:", err);
      setSelectedAddressText(`Cyprus Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`);
    }
  };

  // Click on a search result
  const selectSearchResult = (item) => {
    const lat = parseFloat(item.lat);
    const lng = parseFloat(item.lon);
    
    if (!isWithinCyprus(lat, lng)) {
      setErrorMessage("This location is outside Cyprus.");
      return;
    }

    setErrorMessage("");
    setSelectedPos([lat, lng]);
    
    const parts = item.display_name.split(",");
    const cleanAddress = parts.slice(0, 3).join(",").trim();
    setSelectedAddressText(cleanAddress);
    setSearchResults([]);
    setSearchQuery("");
  };

  // Confirm selection and save
  const handleConfirm = () => {
    const newLoc = {
      latitude: selectedPos[0],
      longitude: selectedPos[1],
      address: selectedAddressText
    };

    setSelectedLocation(newLoc);
    saveAddress(newLoc);
    onClose();
  };

  // Select a saved address immediately
  const handleSelectSaved = (saved) => {
    setSelectedLocation(saved);
    onClose();
  };

  const modalLayout = (
    <div
      style={{
        position: "fixed",
        top: 0,
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: 370,
        backgroundColor: isDark ? "#F0F0F580" : "#00000080",
        backdropFilter: "blur(3px)",
        zIndex: 10000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        boxSizing: "border-box"
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: pageBg,
          borderRadius: 8,
          width: "100%",
          maxHeight: "88vh",
          boxShadow: isDark ? "0 12px 48px rgba(0,0,0,0.6)" : "0 12px 48px rgba(0,0,0,0.15)",
          border: `1px solid ${borderColor}`,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          fontFamily: "'Montserrat', sans-serif",
          animation: "popIn 0.28s cubic-bezier(0.34,1.56,0.64,1)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 18px 12px",
          borderBottom: `1px solid ${isDark ? "#2A2A40" : "#E8E8E8"}`
        }}>
          <h3 style={{ fontSize: 14, fontWeight: 500, color: textColor, margin: 0 ,fontFamily: "'Montserrat', sans-serif"}}>
            Select Location
          </h3>
          <button
            onClick={onClose}
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              backgroundColor: closeBtnBg,
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: closeBtnColor
            }}
          >
            <CloseIcon
             color={isDark ? "#555570" : "#333333"} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{
          flex: 1,
          overflowY: "auto",
          padding: "14px 18px 18px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          scrollbarWidth: "none"
        }}>
          {/* Search Box */}
          <form onSubmit={handleSearch} style={{ display: "flex", gap: 8, position: "relative" }}>
            <div style={{ flex: 1, position: "relative", display: "flex", alignItems: "center" }}>
              <input
                type="text"
                placeholder="Search address in Cyprus..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={isDark?"placeholder:text-[#6E6E85]":"placeholder:text-[#A4A4A4]"}
                style={{
                  width: "100%",
                  height: 34,
                  borderRadius: 10000,
                  border: `1px solid ${isDark?"#2A2A40":"transparent"}`,
                  backgroundColor: inputBg,
                  color: textColor,
                  padding: "0 12px 0 34px",
                  fontSize: 12,
                  outline: "none",
                  fontFamily: "'Montserrat', sans-serif",
                  boxSizing: "border-box"
                }}
              />
              <SearchIcon 
               style={{ position: "absolute", left: 10 }}
               color={isDark ? "#2A2A40" : "#A4A4A4"} />
            </div>
            <button
              type="submit"
              style={{
                padding: "0 14px",
                height: 34,
                borderRadius: 80000,
                backgroundColor: isDark?"#E52E4A":"#DA1A35",
                color: "#ffffff",
                border: "none",
                fontWeight: 400,
                fontSize: 12,
                cursor: "pointer",
                fontFamily: "'Montserrat', sans-serif"
              }}
            >
              {isSearching ? "..." : "Search"}
            </button>
          </form>

          {/* Search Results Dropdown/Box */}
          {searchResults.length > 0 && (
            <div style={{
              maxHeight: 160,
              overflowY: "auto",
              border: `1px solid ${borderColor}`,
              borderRadius: 8,
              backgroundColor: cardBg
            }}>
              {searchResults.map((item) => (
                <div
                  key={item.place_id}
                  onClick={() => selectSearchResult(item)}
                  style={{
                    padding: "9px 12px",
                    cursor: "pointer",
                    borderBottom: `1px solid ${borderColor}`,
                    fontSize: 11.5,
                    color: textColor,
                    transition: "background-color 0.2s"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = itemHoverBg}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                >
                  {item.display_name}
                </div>
              ))}
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div style={{ color: "#DA1A35", fontSize: 11.5, fontWeight: 500 }}>
              {errorMessage}
            </div>
          )}

          {/* Leaflet Map Picker */}
          <div style={{
            height: 190,
            width: "100%",
            position: "relative",
            zIndex: 1,
            borderRadius: 10,
            overflow: "hidden",
            // border: `1px solid ${borderColor}`
          }}>
            <MapPicker markerPosition={selectedPos} onMapClick={handleMapClick} />
          </div>

          {/* Current Selection details */}
          <div style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
            padding: "10px 12px",
            backgroundColor: cardBg,
            borderRadius: 8,
            border: `1px solid ${borderColor}`
          }}>
            <LocationIcon color="#DA1A35" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <div style={{ fontSize: 10, color: subTextColor, fontWeight: 400 }}>Selected Address</div>
              <div style={{ fontSize: 12, fontWeight: 400, color: isDark ? "#9595AA" : "#8E8E8E", marginTop: 2 }}>
                {selectedAddressText}
              </div>
            </div>
          </div>

          {/* Saved Addresses list */}
          {state.savedAddresses && state.savedAddresses.length > 0 && (
            <div>
              <div style={{ fontSize: 12, fontWeight: 400, color: textColor, marginBottom: 6 }}>
                Saved Addresses
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 120, overflowY: "auto" }}>
                {state.savedAddresses.map((addr, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "8px 10px",
                      borderRadius: 8,
                      border: `1px solid ${borderColor}`,
                      backgroundColor: inputBg,
                      cursor: "pointer",
                      transition: "background-color 0.2s"
                    }}
                 
                    onClick={() => handleSelectSaved(addr)}
                  >
                    <div style={{ display: "flex", gap: 8, alignItems: "center", overflow: "hidden", marginRight: 8 }}>
            <LocationIcon color="#DA1A35" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontSize: 12, fontWeight: 400, color: isDark ? "#9595AA" : "#8E8E8E", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {addr.address}
                      </span>
                    </div>
                    {/* Delete Saved Address */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSavedAddress(idx);
                      }}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: isDark?"#C8C8D8":"#333333",
                        padding: 3,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 4
                      }}
                    >
                      <MdDeleteOutline size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Confirm Button */}
          <button
            onClick={handleConfirm}
            disabled={selectedAddressText === "Fetching address..."}
            style={{
              width: "100%",
              height: 44,
              borderRadius: 22,
              backgroundColor: isDark?"#E52E4A":"#DA1A35",
              color: "#ffffff",
              fontWeight: 400,
              fontSize: 14,
              border: "none",
              cursor: selectedAddressText === "Fetching address..." ? "not-allowed" : "pointer",
              marginTop: 4,
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Confirm Location
          </button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );

  if (typeof document !== "undefined") {
    return createPortal(modalLayout, document.body);
  }
  return modalLayout;
}
