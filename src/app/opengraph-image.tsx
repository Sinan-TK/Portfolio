import { ImageResponse } from "next/og";
import { site } from "@/config/site";

/* Generates the social-share card at /opengraph-image at build time.
 * No design file to maintain — it always matches src/config/site.ts. */
export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#09090b",
          padding: "72px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Corner glows */}
        <div
          style={{
            position: "absolute",
            top: -220,
            left: -160,
            width: 700,
            height: 700,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.16), rgba(255,255,255,0) 65%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -260,
            right: -180,
            width: 700,
            height: 700,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.10), rgba(255,255,255,0) 65%)",
            display: "flex",
          }}
        />

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 68,
              height: 68,
              borderRadius: 20,
              background: "linear-gradient(135deg, #fafafa, #71717a)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            {initials}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 20px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.14)",
              fontSize: 22,
              color: "rgba(255,255,255,0.65)",
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: site.available ? "#fafafa" : "#71717a",
                display: "flex",
              }}
            />
            {site.availabilityText}
          </div>
        </div>

        {/* Name + role */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 86,
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
              display: "flex",
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              fontSize: 44,
              fontWeight: 600,
              marginTop: 14,
              letterSpacing: "-0.02em",
              background: "linear-gradient(100deg, #ffffff, #a1a1aa)",
              backgroundClip: "text",
              color: "transparent",
              display: "flex",
            }}
          >
            {site.role}
          </div>
          <div
            style={{
              fontSize: 27,
              marginTop: 26,
              color: "rgba(255,255,255,0.55)",
              maxWidth: 900,
              lineHeight: 1.4,
              display: "flex",
            }}
          >
            {site.tagline}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            color: "rgba(255,255,255,0.45)",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex" }}>
            {site.url.replace(/^https?:\/\//, "")}
          </div>
          <div style={{ display: "flex" }}>{site.location}</div>
        </div>
      </div>
    ),
    size,
  );
}
