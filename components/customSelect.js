import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

const CustomSelect = ({
  name,
  value,
  onChange,
  placeholder,
  options = [],
  enableSearch = false, // 👈 optional prop
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Filter options based on search term
  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative w-full">

      <div
        className="flex items-center justify-between border-none rounded-lg px-3 py-2 cursor-pointer bg-white transition"
        onClick={() => setOpen(!open)}
      >
        <span className="font-body text-primaryText">
          {value ? options.find((opt) => opt.value === value)?.label : placeholder}
        </span>
        <IoMdArrowDropdown
          className={`w-4 h-4 text-gray-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>

      {open && (
        <div className="absolute mt-1 w-full bg-white shadow-lg rounded-lg border border-gray-200 z-50">
          {/* 🔍 Conditional Search Bar */}
          {enableSearch && (
            <div className="p-2 border-b border-gray-100">
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#FFC10E80] font-body"
              />
            </div>
          )}

          <ul className="py-2 text-sm text-black font-body max-h-[180px] overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <li
                  key={opt.value}
                  className={`mb-3 px-4 py-2 text-primaryText cursor-pointer hover:bg-[#FFC10E80] rounded-md ${
                    value === opt.value ? "bg-[#FFC10E80]" : ""
                  }`}
                  onClick={() => {
                    onChange({ target: { name, value: opt.value } });
                    setOpen(false);
                    setSearch("");
                  }}
                >
                  {opt.label}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-400">No results found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
