export default function CustomRange({
  min = 0,
  max,
  value,
  onChange,
}) {
  const percentage = ((value - min) / (max - min)) * 100;

  // SVG width constants
  const SVG_WIDTH = 335;
  const HANDLE_WIDTH = 17;
  const handleX = Math.min(
    Math.max((percentage / 100) * SVG_WIDTH - HANDLE_WIDTH / 2, 0),
    SVG_WIDTH - HANDLE_WIDTH
  );

  return (
    <div className="w-full relative">
      <svg
        width="335"
        height="37"
        viewBox="0 0 335 37"
        fill="none"
        className="w-full"
      >
        {/* Background */}
        <path
          d="M0 11C0 6.58172 3.58172 3 8 3H327C331.418 3 335 6.58172 335 11V27C335 31.4183 331.418 35 327 35H8C3.58172 35 0 31.4183 0 27V11Z"
          fill="#F6F6F6"
        />

        {/* Progress */}
        <path
          d={`M0 11C0 6.58 3.58 3 8 3H${(percentage / 100) * 327}C331 3 335 6.58 335 11V27C335 31.41 331 35 327 35H8C3.58 35 0 31.41 0 27V11Z`}
          fill="#6FCECC"
        />

        {/* Handle */}
        <g transform={`translate(${handleX},0)`}>
          <path
            d="M0 8C0 3.58172 3.58172 0 8 0H9C13.4183 0 17 3.58172 17 8V29C17 33.4183 13.4183 37 9 37H8C3.58172 37 0 33.4183 0 29V8Z"
            fill="#EBF7FD"
          />
          <circle cx="8.5" cy="18.5" r="6.5" fill="#6FCECC" />
        </g>
      </svg>

      {/* Native range (invisible, handles interaction) */}
      <input
        type="range"
        min={min}
        max={max}
        step="0.01"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
      />
    </div>
  );
}
