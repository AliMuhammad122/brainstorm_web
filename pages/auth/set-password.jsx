import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useTheme } from "../../context/ThemeContext";

export default function CreateNewPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isDark } = useTheme();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log("Password created:", password);
    }, 1000);
  };

  const shellStyle = { backgroundColor: "#DA1A35" };

  const inputBg = isDark
    ? "bg-[#2B2B2B] text-white placeholder-gray-500"
    : "bg-[#F2F2F2] text-[#1a1a1a] placeholder-gray-400";

  const labelCls = `text-sm font-semibold ${isDark ? "text-gray-200" : "text-[#1a1a1a]"}`;
  const fieldCls = `w-full px-4 py-3.5 pr-12 rounded-xl text-sm outline-none transition focus:ring-2 focus:ring-[#E31C3D] ${inputBg}`;

  return (
    <div className="min-h-screen flex flex-col" style={shellStyle}>
      <div className="relative h-[52vh] min-h-[260px] shrink-0 overflow-hidden">
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
          flex-1 rounded-t-[28px] px-6 pt-6 pb-10
          flex flex-col gap-6 overflow-y-auto
          ${isDark
            ? "bg-[#0B0B0B] text-white shadow-[0_-10px_30px_rgba(0,0,0,0.35)]"
            : "bg-white text-[#1a1a1a] border border-[#F0F0F0] shadow-[0_-12px_30px_rgba(227,28,61,0.12)]"}
        `}
      >
        <button
          type="button"
          onClick={() => router.back()}
          className={`
            w-10 h-10 rounded-full flex items-center justify-center self-start
            shadow-sm border active:scale-95 transition
            ${isDark ? "bg-[#1A1A1A] border-[#2A2A2A]" : "bg-white border-gray-200"}
          `}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>

        <div className="space-y-2">
          <h1
            className="text-center text-[22px] font-black tracking-wider uppercase"
            style={{ fontFamily: "Anton, sans-serif" }}
          >
            Create New Password
          </h1>
          <p className={`text-center text-sm leading-snug ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            Please your new password must be different then previous
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>New Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className={fieldCls}
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
                type={showConfirm ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className={fieldCls}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showConfirm ? <BsEyeSlash size={20} /> : <BsEye size={20} />}
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
            {loading ? "Saving..." : "Send Code"}
          </button>
        </form>

        <p className={`text-center text-sm pt-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
          <Link href="/auth/login" className="text-[#E31C3D] font-semibold hover:underline">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}
