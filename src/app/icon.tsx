import { ImageResponse } from "next/og";
import { site } from "@/config/site";

/* Favicon generated from your initials — replace with src/app/icon.png
 * (or favicon.ico) if you'd rather use a real logo. */
export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  const initials = site.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #18181b, #52525b)",
          color: "#fff",
          fontSize: 230,
          fontWeight: 700,
          letterSpacing: "-0.04em",
          fontFamily: "sans-serif",
        }}
      >
        {initials}
      </div>
    ),
    size,
  );
}
