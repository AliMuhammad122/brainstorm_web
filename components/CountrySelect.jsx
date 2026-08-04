import React from "react";
import ReactCountryFlag from "react-country-flag";
import Select, { components } from "react-select";
import { useTheme } from "../context/ThemeContext";
import {
  getCountries,
  getCountryCallingCode,
} from "libphonenumber-js";
import ArrowDown from "../public/assets/icons/Drop_down.svg";
import CyprusFlagIcon from "../public/assets/icons/cyprus_flag.svg";

// Build list of all countries with dial codes
export const COUNTRY_OPTIONS = getCountries()
  .map((code) => {
    let dialCode = "";
    try {
      dialCode = `+${getCountryCallingCode(code)}`;
    } catch {
      dialCode = "";
    }
    const regionNames = typeof Intl !== "undefined" && Intl.DisplayNames
      ? new Intl.DisplayNames(["en"], { type: "region" })
      : null;
    const label = regionNames ? (regionNames.of(code) || code) : code;
    return { value: code, label, dialCode };
  })
  .filter((c) => c.dialCode !== "")
  .sort((a, b) => {
    if (a.value === "CY") return -1;
    if (b.value === "CY") return 1;
    return a.label.localeCompare(b.label);
  });

export const DEFAULT_COUNTRY = COUNTRY_OPTIONS.find((c) => c.value === "CY") || COUNTRY_OPTIONS[0];

function RenderFlag({ countryCode }) {
  if (countryCode === "CY") {
    return <CyprusFlagIcon className="shrink-0" />;
  }
  return (
    <ReactCountryFlag
      countryCode={countryCode}
      svg
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  );
}

const CustomSingleValue = (props) => {
  const { data } = props;
  const { isDark } = useTheme();
  return (
    <components.SingleValue {...props}>
      <div className="flex items-center gap-2 cursor-pointer">
        <div className="w-5 h-5 rounded-full overflow-hidden flex items-center justify-center shrink-0 bg-white ">
          <RenderFlag countryCode={data.value} />
        </div>
        <ArrowDown className="ml-1.5" />
        <span className={`text-sm font-normal font-montserrat pl-0.5 ${isDark ? "text-white" : "text-[#777777]"}`}>
          {data.dialCode}
        </span>
      </div>
    </components.SingleValue>
  );
};

const CustomOption = (props) => {
  const { data, isSelected } = props;
  const { isDark } = useTheme();
  return (
    <components.Option {...props}>
      <div className="flex items-center justify-between px-1 py-0.5 text-xs cursor-pointer">
        <span className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full overflow-hidden flex items-center justify-center shrink-0 bg-white ">
            <RenderFlag countryCode={data.value} />
          </div>
          <span className={isSelected
            ? "font-medium text-[#DA1A35]"
            : (isDark ? "text-white" : "text-[#333333]")}
          >
            {data.label}
          </span>
        </span>
        <span className="text-[#8E8E8E] font-medium ml-3">{data.dialCode}</span>
      </div>
    </components.Option>
  );
};

// react-select custom styles for seamless integration
const customSelectStyles = (isDark) => ({
  control: (base) => ({
    ...base,
    backgroundColor: "transparent",
    border: "none",
    boxShadow: "none",
    minHeight: "auto",
    cursor: "pointer",
    padding: 0,
    width: "100px",
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "0 2px",
  }),
  indicatorsContainer: (base) => ({
    ...base,
    padding: 0,
  }),
  dropdownIndicator: () => ({
    display: "none",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0px 4px 36px 0px #00000026",
    zIndex: 9999,
    width: "260px",
    backgroundColor: isDark ? "#1C1C1C" : "#FFFFFF",
  }),
  menuList: (base) => ({
    ...base,
    maxHeight: "200px",
    padding: "4px",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? (isDark ? "#DA1A35" : "#FDE8EA")
      : state.isFocused
        ? (isDark ? "#2B2B2B" : "#F4F6F8")
        : "transparent",
    color: state.isSelected
      ? (isDark ? "#FFFFFF" : "#DA1A35")
      : (isDark ? "#FFFFFF" : "#333333"),
    borderRadius: "6px",
    padding: "6px 8px",
    cursor: "pointer",
  }),
  menuPortal: (base) => ({
    ...base,
    zIndex: 9999,
  }),
});

export default function CountrySelect({ value, onChange }) {
  const { isDark } = useTheme();

  const selectedOption = COUNTRY_OPTIONS.find((c) => c.dialCode === value) || DEFAULT_COUNTRY;

  return (
    <Select
      id="phone-country-select"
      options={COUNTRY_OPTIONS}
      value={selectedOption}
      onChange={onChange}
      components={{
        SingleValue: CustomSingleValue,
        Option: CustomOption,
      }}
      styles={customSelectStyles(isDark)}
      isSearchable
      menuPortalTarget={typeof document !== "undefined" ? document.body : undefined}
      menuPosition="fixed"
    />
  );
}
