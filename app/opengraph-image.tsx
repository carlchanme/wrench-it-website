import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "WrenchIt — Production software, built by operators.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const markBuffer = await readFile(
  join(process.cwd(), "public", "wrench-icon.png"),
);
const markSrc = `data:image/png;base64,${markBuffer.toString("base64")}`;

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#F4EFE6",
          fontFamily: "sans-serif",
        }}
      >
        {/* Left: text column */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "70px 0 70px 80px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              fontSize: "26px",
              color: "#5E5E5E",
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

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: "92px",
                fontWeight: 800,
                color: "#15161B",
                lineHeight: 0.95,
                letterSpacing: "-0.035em",
              }}
            >
              Production
            </div>
            <div
              style={{
                fontSize: "92px",
                fontWeight: 800,
                color: "#15161B",
                lineHeight: 0.95,
                letterSpacing: "-0.035em",
              }}
            >
              software.
            </div>
            <div
              style={{
                fontSize: "92px",
                fontWeight: 800,
                color: "#1F3C88",
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
              flexDirection: "column",
              gap: "8px",
              color: "#5E5E5E",
              fontSize: "26px",
              fontWeight: 500,
            }}
          >
            <span>A lean software studio · Kuala Lumpur</span>
            <span style={{ color: "#15161B", fontWeight: 700 }}>wrenchit.io</span>
          </div>
        </div>

        {/* Right: brand mark column */}
        <div
          style={{
            width: "440px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 40px 0 0",
            position: "relative",
          }}
        >
          <img
            src={markSrc}
            alt=""
            width={280}
            height={280}
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
    ),
    size,
  );
}
