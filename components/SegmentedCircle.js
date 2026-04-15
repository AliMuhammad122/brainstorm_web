export default function SegmentedCircle({
    pieces = 3,
    price,
    size = 160,
    thickness = 10,
    gap = 4,
    color = '#6FCECC',
}) {
    const radius = size / 2
    const circumference = 2 * Math.PI * radius

    // convert pixel gap to angle
    const gapAngle = (gap / circumference) * 360
    const pieceAngle = 360 / pieces - gapAngle
    console.log(price)
    // build gradient with EXPLICIT gaps
    const gradient = Array.from({ length: pieces })
        .map((_, i) => {
            const start = i * (pieceAngle + gapAngle)
            const mid = start + pieceAngle
            const end = mid + gapAngle

            return `
        ${color} ${start}deg ${mid}deg,
        transparent ${mid}deg ${end}deg
      `
        })
        .join(',')

    return (
        <div className="relative flex items-center justify-center">
            <div
                className="relative"
                style={{
                    width: size,
                    height: size,
                    borderRadius: '50%',
                    background: `conic-gradient(${gradient})`,
                    WebkitMask: `radial-gradient(
          circle,
          transparent ${radius - thickness}px,
          black ${radius - thickness}px
        )`,
                    mask: `radial-gradient(
          circle,
          transparent ${radius - thickness}px,
          black ${radius - thickness}px
        )`,
                }} />
            <div className="absolute flex flex-col items-center justify-center gap-1">
                <span className="text-primary font-bold text-xl">€{price}</span>
                <span className="text-[#8E8E8E] text-xs font-light">Amount to Share</span>
            </div>
        </div>

    )
}
