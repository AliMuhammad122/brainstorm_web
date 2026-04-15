"use client";
export default function Button({
    text,
    onClick,
    type = "button",
    variant = "",
    size = "",
    className = "",
    disabled = false,
}) {
    const baseStyle =
        "flex items-center justify-center font-medium transition duration-200 rounded-full text-sm";
    const variants = {
        primary: "bg-primary hover:bg-primary/80 text-background cursor-pointer",
        secondary:
            "border border-borderColor bg-accent hover:border-primary text-heading hover:text-white cursor-pointer",
        danger: "bg-danger hover:bg-danger/80 text-white cursor-pointer",
        success: "bg-green hover:bg-green/80 text-white cursor-pointer",
        outline: "border border-borderColor text-heading cursor-pointer",
        accentOutline: "border border-[#2274D3] text-[#2274D3] cursor-pointer",
        disabled: "bg-borderColor text-white cursor-not-allowed",
    };

    const sizes = {
        xs: "w-[60px] h-[40px]",
        small: "w-[80px] h-[48px]",
        medium: "w-[164px] h-[48px]",
        large: "w-full sm:w-[335px] h-[48px]",
    };
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyle} ${disabled ? variants.disabled : variants[variant]} ${sizes[size]} ${className}`}
        >
            {text}
        </button>
    );
}
