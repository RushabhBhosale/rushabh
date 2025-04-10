import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { value, targetUnit, baseFontSize = 16 } = await req.json();

    const parsed = parseFloat(value);
    const unit = value.replace(parsed, "").trim().toLowerCase();

    const convert = () => {
      if (unit === targetUnit) return `${parsed}${targetUnit}`;

      // REM ↔ PX
      if (unit === "rem" && targetUnit === "px")
        return `${parsed * baseFontSize}px`;
      if (unit === "px" && targetUnit === "rem")
        return `${parsed / baseFontSize}rem`;

      // EM ↔ PX
      if (unit === "em" && targetUnit === "px")
        return `${parsed * baseFontSize}px`;
      if (unit === "px" && targetUnit === "em")
        return `${parsed / baseFontSize}em`;

      // % ↔ PX (assuming % of baseFontSize)
      if (unit === "%" && targetUnit === "px")
        return `${(parsed / 100) * baseFontSize}px`;
      if (unit === "px" && targetUnit === "%")
        return `${(parsed / baseFontSize) * 100}%`;

      // VH/VW ↔ PX (assuming 1080p for now, can customize later)
      const screenHeight = 1080;
      const screenWidth = 1920;

      if (unit === "vh" && targetUnit === "px")
        return `${(parsed / 100) * screenHeight}px`;
      if (unit === "vw" && targetUnit === "px")
        return `${(parsed / 100) * screenWidth}px`;

      return `❌ Conversion from ${unit} to ${targetUnit} not supported yet`;
    };

    return NextResponse.json({ converted: convert() });
  } catch (err) {
    console.error("💥 CSS unit conversion error:", err.message);
    return NextResponse.json({ error: "Conversion failed" }, { status: 500 });
  }
}
