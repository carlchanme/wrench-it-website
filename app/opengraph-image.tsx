import { ImageResponse } from "next/og";

export const alt = "WrenchIt — We build what your business needs.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#F4EFE6",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "26px",
            color: "#6B6B6B",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          <span
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "999px",
              background: "#4F7A4E",
            }}
          />
          WrenchIt
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: "60px" }}>
          <div
            style={{
              fontSize: "104px",
              fontWeight: 800,
              color: "#15161B",
              lineHeight: 0.95,
              letterSpacing: "-0.035em",
            }}
          >
            Production software.
          </div>
          <div
            style={{
              fontSize: "104px",
              fontWeight: 800,
              color: "#7A5AE0",
              lineHeight: 0.95,
              letterSpacing: "-0.035em",
              marginTop: "8px",
            }}
          >
            Built by operators.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#5E5E5E",
            fontSize: "30px",
            fontWeight: 500,
          }}
        >
          <span>A lean software studio · Kuala Lumpur</span>
          <span style={{ color: "#15161B", fontWeight: 700 }}>wrenchit.io</span>
        </div>
      </div>
    ),
    size,
  );
}
