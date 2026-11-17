import { ImageResponse } from "next/og";

export const alt =
  "Red Moros Studios (RedMoros / RedMorosStudios) - Story-Driven Psychological Horror Thriller Experience";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          backgroundColor: "#09090C",
          color: "#F7F2F3",
          fontFamily: "sans-serif",
          border: "4px solid #FF0000",
          position: "relative",
        }}
      >
        {/* Top Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid rgba(255, 0, 0, 0.4)",
            paddingBottom: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "16px",
                height: "16px",
                backgroundColor: "#FF0000",
                borderRadius: "50%",
              }}
            />
            <span
              style={{
                color: "#FF0000",
                fontSize: "18px",
                fontWeight: 800,
                letterSpacing: "4px",
                textTransform: "uppercase",
              }}
            >
              RED MOROS STUDIOS // OFFICIAL
            </span>
          </div>
          <span
            style={{
              color: "#B8AEB1",
              fontSize: "16px",
              letterSpacing: "2px",
            }}
          >
            REDMOROS.AJAYSAAGAR.ONLINE
          </span>
        </div>

        {/* Brand Display */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            margin: "auto 0",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "24px",
            }}
          >
            <span
              style={{
                fontSize: "96px",
                fontWeight: 900,
                color: "#FFFFFF",
                letterSpacing: "-2px",
                lineHeight: "1",
              }}
            >
              RED
            </span>
            <span
              style={{
                fontSize: "108px",
                fontWeight: 900,
                color: "#FF0000",
                letterSpacing: "-2px",
                lineHeight: "1",
              }}
            >
              MOROS
            </span>
          </div>
          <span
            style={{
              fontSize: "32px",
              fontWeight: 800,
              color: "#F96769",
              letterSpacing: "6px",
              textTransform: "uppercase",
              marginTop: "8px",
            }}
          >
            STUDIOS
          </span>
          <span
            style={{
              fontSize: "24px",
              color: "#E0D8D9",
              maxWidth: "950px",
              lineHeight: "1.4",
              marginTop: "16px",
            }}
          >
            A Story-Driven Psychological Horror Thriller Game Experience
          </span>
        </div>

        {/* Footer info & exact permutations */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255, 0, 0, 0.3)",
            paddingTop: "20px",
            color: "#B8AEB1",
            fontSize: "16px",
            letterSpacing: "2px",
          }}
        >
          <span>RED MOROS • REDMOROS • RED MOROS STUDIOS • REDMOROSSTUDIOS</span>
          <span style={{ color: "#FFF700", fontWeight: 700 }}>
            UNKNOWN 13 // COMING SOON
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
