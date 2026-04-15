import { useState } from "react";
import Image from "next/image";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import Link from "next/link";
import { useTheme } from "../../context/ThemeContext";
import ReactCountryFlag from "react-country-flag";
import { countryCodes } from "../../data/countryCodes";

export default function SignupPage() {
  const { isDark } = useTheme();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ phoneCode: "+357", phone: "" });
  const [phoneError, setPhoneError] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log("Signup:", { firstName, lastName, email, password });
    }, 1000);
  };

  const validatePhone = (code, phone) => {
    if (!code) {
      setPhoneError("Country code is required");
      return false;
    }
    if (!phone) {
      setPhoneError("Phone number is required");
      return false;
    }
    if (phone.length < 7 || phone.length > 15) {
      setPhoneError("Enter a valid phone number");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "");
      setForm((prev) => ({ ...prev, phone: digitsOnly }));
      validatePhone(form.phoneCode, digitsOnly);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
      validatePhone(value, form.phone);
    }
  };

  const shellStyle = { backgroundColor: "#DA1A35" };

  const inputBg = isDark ? "bg-[#2B2B2B]" : "bg-[#F2F2F2]";
  const inputTx = isDark ? "text-white placeholder-gray-500" : "text-[#1a1a1a] placeholder-gray-400";
  const fieldCls = `w-full px-4 py-3.5 rounded-xl text-sm outline-none transition focus:ring-2 focus:ring-[#E31C3D] ${inputBg} ${inputTx}`;
  const labelCls = `text-sm font-semibold ${isDark ? "text-gray-200" : "text-[#1a1a1a]"}`;

  const currentCountry = countryCodes.find((c) => c.dial_code === form.phoneCode);

  return (
    <div className="min-h-screen flex flex-col" style={shellStyle}>
      <div className="relative h-[26vh] min-h-[150px] shrink-0 overflow-hidden">
        <div className="absolute -left-6">
          <Image
            src="/assets/images/login_left_decoration.png"
            width="190"
            height="190"
            alt=""
            className="pointer-events-none"
          />
        </div>
        <div className="absolute -top-2 -right-2">
          <Image
            src="/assets/images/login_right.png"
            width="130"
            height="130"
            alt=""
            className="pointer-events-none"
          />
        </div>
      </div>

      <div
        className={`
          flex-1 rounded-t-[28px] px-6 pt-9 pb-10
          flex flex-col gap-5 overflow-y-auto
          ${isDark
            ? "bg-[#0B0B0B] text-white shadow-[0_-10px_30px_rgba(0,0,0,0.35)]"
            : "bg-white text-[#1a1a1a] border border-[#F0F0F0] shadow-[0_-12px_30px_rgba(227,28,61,0.12)]"}
        `}
      >
        <div className="space-y-2">
          <h1
            className="text-center text-[22px] font-black tracking-wider uppercase"
            style={{ fontFamily: "Anton, sans-serif" }}
          >
            Sign Up Account
          </h1>
          <p className={`text-center text-sm leading-snug ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            Please enter your details to sign up account
          </p>
        </div>

        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>First Name</label>
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter first name"
              className={fieldCls}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>Last Name</label>
            <input
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter last name"
              className={fieldCls}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className={fieldCls}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>Phone Number</label>

            <div className={`flex items-center rounded-xl ${inputBg}`}>
              <div className="relative flex items-center gap-0.5 pl-3 shrink-0">
                {currentCountry && (
                  <ReactCountryFlag
                    countryCode={currentCountry.code}
                    svg
                    style={{ width: 22, height: 22, objectFit: "cover", borderRadius: 3 }}
                  />
                )}
                <MdKeyboardArrowDown className="text-gray-400 w-4 h-4" />
                <select
                  name="phoneCode"
                  value={form.phoneCode}
                  onChange={handleChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full"
                >
                  {countryCodes.map((country, idx) => (
                    <option key={idx} value={country.dial_code}>
                      {country.code} {country.dial_code}
                    </option>
                  ))}
                </select>
              </div>

              <div className={`w-px h-5 mx-2 shrink-0 ${isDark ? "bg-[#3A3A3A]" : "bg-gray-300"}`} />

              <span className={`text-sm font-medium shrink-0 ${isDark ? "text-white" : "text-[#1a1a1a]"}`}>
                {form.phoneCode}
              </span>

              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="(444) 1234-5678"
                className={`flex-1 mx-2 py-3.5 text-sm bg-transparent outline-none ${inputTx}`}
              />

              <button
                type="button"
                className="shrink-0 pr-4 text-sm font-semibold text-[#E31C3D]"
                onClick={() => console.log("Send OTP", form.phoneCode + form.phone)}
              >
                Send Otp
              </button>
            </div>

            {phoneError && <p className="text-xs text-red-500">{phoneError}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className={`${fieldCls} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <BsEyeSlash size={20} /> : <BsEye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className={`${fieldCls} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showConfirmPassword ? <BsEyeSlash size={20} /> : <BsEye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
              w-full bg-[#E31C3D] text-white py-3.5 rounded-full
              text-base font-semibold tracking-wide mt-2
              active:scale-95 transition disabled:opacity-50
            "
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className={`text-center text-sm pb-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
          Already have an account?{" "}
          <Link href="/auth/login" className="text-[#E31C3D] font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
