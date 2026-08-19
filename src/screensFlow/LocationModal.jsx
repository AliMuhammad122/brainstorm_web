import React, { useState } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";
import { MdClose, MdSearch, MdOutlineLocationOn, MdDeleteOutline } from "react-icons/md";
import { useScreensFlow } from "../../context/ScreensFlowContext";
import { useTheme } from "../../context/ThemeContext";

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

  const pageBg = isDark ? "#121212" : "#ffffff";
  const textColor = isDark ? "#ffffff" : "#1A1A1A";
  const subTextColor = isDark ? "#A0A0A0" : "#707070";
  const inputBg = isDark ? "#242424" : "#F4F6F8";
  const itemHoverBg = isDark ? "#2D2D2D" : "#F0F2F5";
  const borderColor = isDark ? "#2D2D2D" : "#E2E8F0";

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
        // Clean display name a bit: take the first few parts
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
        backgroundColor: "var(--overlay, rgba(0, 0, 0, 0.6))",
        backdropFilter: "blur(4px)",
        zIndex: 500,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: pageBg,
          borderRadius: 24,
          width: "100%",
          maxWidth: 460,
          maxHeight: "85vh",
          boxShadow: "0 24px 80px rgba(0,0,0,0.3)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          animation: "popIn 0.28s cubic-bezier(0.34,1.56,0.64,1)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px 12px" }}>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: textColor, margin: 0, letterSpacing: -0.4 }}>
            Select Location
          </h3>
          <button
            onClick={onClose}
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: inputBg,
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: textColor
            }}
          >
            <MdClose size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0 24px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Search Box */}
          <form onSubmit={handleSearch} style={{ display: "flex", gap: 8, position: "relative" }}>
            <div style={{ flex: 1, position: "relative", display: "flex", alignItems: "center" }}>
              <input
                type="text"
                placeholder="Search address in Cyprus..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  height: 44,
                  borderRadius: 12,
                  border: `1.5px solid ${borderColor}`,
                  backgroundColor: inputBg,
                  color: textColor,
                  padding: "0 12px 0 38px",
                  fontSize: 13.5,
                  outline: "none",
                  fontFamily: "inherit"
                }}
              />
              <MdSearch size={20} color="var(--subtle, #A0A0A0)" style={{ position: "absolute", left: 12 }} />
            </div>
            <button
              type="submit"
              style={{
                padding: "0 16px",
                height: 44,
                borderRadius: 12,
                backgroundColor: "#DA1A35",
                color: "#ffffff",
                border: "none",
                fontWeight: 400,
                fontSize: 14,
                cursor: "pointer",
                fontFamily: "inherit"
              }}
            >
              {isSearching ? "..." : "Search"}
            </button>
          </form>

          {/* Search Results Dropdown/Box */}
          {searchResults.length > 0 && (
            <div style={{
              maxHeight: 180,
              overflowY: "auto",
              border: `1px solid ${borderColor}`,
              borderRadius: 12,
              backgroundColor: pageBg
            }}>
              {searchResults.map((item) => (
                <div
                  key={item.place_id}
                  onClick={() => selectSearchResult(item)}
                  style={{
                    padding: "10px 14px",
                    cursor: "pointer",
                    borderBottom: `1px solid ${borderColor}`,
                    fontSize: 12.5,
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
            <div style={{ color: "var(--primary, #E31C3D)", fontSize: 12, fontWeight: 600 }}>
              {errorMessage}
            </div>
          )}

          {/* Leaflet Map Picker */}
          <div style={{ height: 220, width: "100%", position: "relative", zIndex: 1 }}>
            <MapPicker markerPosition={selectedPos} onMapClick={handleMapClick} />
          </div>

          {/* Current Selection details */}
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: 12, backgroundColor: inputBg, borderRadius: 12 }}>
            <MdOutlineLocationOn size={22} color="var(--primary, #E31C3D)" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <div style={{ fontSize: 11, color: subTextColor, fontWeight: 500 }}>Selected Address</div>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: textColor, marginTop: 2 }}>
                {selectedAddressText}
              </div>
            </div>
          </div>

          {/* Saved Addresses list */}
          {state.savedAddresses && state.savedAddresses.length > 0 && (
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 800, color: textColor, marginBottom: 8, letterSpacing: -0.2 }}>
                Saved Addresses
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 130, overflowY: "auto" }}>
                {state.savedAddresses.map((addr, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "8px 12px",
                      borderRadius: 10,
                      border: `1px solid ${borderColor}`,
                      cursor: "pointer",
                      transition: "background-color 0.2s"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = itemHoverBg}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                    onClick={() => handleSelectSaved(addr)}
                  >
                    <div style={{ display: "flex", gap: 8, alignItems: "center", overflow: "hidden", marginRight: 8 }}>
                      <MdOutlineLocationOn size={16} color="var(--subtle, #A0A0A0)" style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: 12.5, fontWeight: 500, color: textColor, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
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
                        color: "var(--subtle, #A0A0A0)",
                        padding: 4,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 4
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = "var(--primary, #E31C3D)"}
                      onMouseLeave={(e) => e.currentTarget.style.color = "var(--subtle, #A0A0A0)"}
                    >
                      <MdDeleteOutline size={16} />
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
              height: 48,
              borderRadius: 24,
              backgroundColor: "#DA1A35",
              color: "#ffffff",
              fontWeight: 400,
              fontSize: 14.5,
              border: "none",
              cursor: selectedAddressText === "Fetching address..." ? "not-allowed" : "pointer",
              marginTop: 6,
              fontFamily: "inherit"
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
