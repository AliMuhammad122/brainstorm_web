"use client";
import { useState } from "react";
import CustomSelect from "./customSelect";

export default function Input({
  label,
  type = "text",
  placeholder = "",
  size = "medium",
  value,
  name,
  onChange,
  iconStart,
  iconEnd,
  options = [], // for dropdown
  className = "",
  enableSearch 
}) {
  const [showPassword, setShowPassword] = useState(false);

  const sizes = {
    medium: "w-full sm:w-[320px] md:w-[335px] h-12 text-xs",
    large: "w-full sm:w-[335px] h-12 text-xs",
  };

  const baseStyle =
    "flex items-center border border-borderColor  px-3 text-primaryText transition font-body";

  const inputStyle =
    "flex-1 bg-transparent outline-none placeholder-secondaryText text-primaryText font-normal ";

  const phoneStyle = "ps-28";
  const phoneMediumStyle = "ps-26";


  const labelStyle = "block mb-2 text-[16px] text-primaryText font-small font-body";
  const dateLabelStyle = "block mb-2 text-sm text-text font-body";

  const renderInput = () => {
    if (type === "customSelect") {
      return (
        <CustomSelect
          label={label}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          options={options}
          enableSearch={enableSearch}
        />
      );
    }

    // Dropdown (select)
    if (type === "select") {
      return (
        <select
          value={value}
          name={name}
          onChange={onChange}
          className={`${inputStyle} cursor-pointer`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt, idx) => (
            <option key={idx} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }

    // Password field
    if (type === "password" || type === "confirmPassword") {
      return (
        <>
          <input
            type={showPassword ? "text" : "password"}
            value={value}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            className={inputStyle}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-secondaryText"
          >
            {/* {showPassword ? <faeye size={18} /> : <Eye size={18} />} */}
          </button>
        </>
      );
    }

    // Normal input (email, text, number, phone, price, etc.)
    return (
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        className={` ${inputStyle} ${type == "date" ? "uppercase" : ""} ${type == "phone" ? "placeholder-[#BBBBBB]" : ""}`}
      />
    );
  };

  return (
    <div className={className}>
      {label && <label className={`${type == "date" ? dateLabelStyle : labelStyle}`}>{label}</label>}
      <div className={`${baseStyle} ${sizes[size]} ${type == "phone" && size === "large" ? phoneStyle : type == "phone" && size === "medium" ? phoneMediumStyle : ""}`}>
        {iconStart && <span className="mr-2 text-secondaryText">{iconStart}</span>}
        {renderInput()}
        {iconEnd && <span className="ml-2 text-secondaryText">{iconEnd}</span>}
      </div>
    </div>
  );
}
