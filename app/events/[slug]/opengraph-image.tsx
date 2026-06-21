import { ImageResponse } from "next/og";
import { client, urlFor } from "@/lib/sanity";

export const runtime = "edge";

export const alt = "Event Cover";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

// Cache font buffers in memory
let monoFontBuffer: ArrayBuffer | null = null;
let sansFontBuffer: ArrayBuffer | null = null;

async function getFonts() {
  if (!monoFontBuffer) {
    try {
      const res = await fetch(
        "https://unpkg.com/@fontsource/jetbrains-mono@5.0.19/files/jetbrains-mono-latin-400-normal.woff"
      );
      if (res.ok) {
        monoFontBuffer = await res.arrayBuffer();
      }
    } catch (e) {
      console.error("Failed to load JetBrains Mono font", e);
    }
  }
  if (!sansFontBuffer) {
    try {
      const res = await fetch(
        "https://unpkg.com/@fontsource/inter@5.0.19/files/inter-latin-700-normal.woff"
      );
      if (res.ok) {
        sansFontBuffer = await res.arrayBuffer();
      }
    } catch (e) {
      console.error("Failed to load Inter font", e);
    }
  }

  const fonts = [];
  if (monoFontBuffer) {
    fonts.push({
      name: "JetBrains Mono",
      data: monoFontBuffer,
      weight: 400 as const,
      style: "normal" as const,
    });
  }
  if (sansFontBuffer) {
    fonts.push({
      name: "Inter",
      data: sansFontBuffer,
      weight: 700 as const,
      style: "normal" as const,
    });
  }
  return fonts;
}

export default async function Image({ params }: { params: { slug: string } }) {
  const event = await client.fetch(
    `*[_type == "event" && slug.current == $slug][0]{
      title,
      coverImage,
      photos[0...1],
      date,
      location
    }`,
    { slug: params.slug }
  );

  const fonts = await getFonts();

  if (!event) {
    return new ImageResponse(
      (
        <div
          style={{
            background: "black",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontFamily: fonts.length > 0 ? "JetBrains Mono" : "sans-serif",
          }}
        >
          <div style={{ fontSize: 40, letterSpacing: "0.3em", fontWeight: "bold" }}>
            KITESTUDIOS
          </div>
        </div>
      ),
      {
        ...size,
        fonts: fonts.length > 0 ? fonts : undefined,
      }
    );
  }

  // Fallback to first photo if coverImage is not specified
  const imageSource = event.coverImage || (event.photos && event.photos[0]);
  const imageUrl = imageSource
    ? urlFor(imageSource).width(1200).height(630).fit("crop").url()
    : null;

  // Format date nicely
  const dateString = event.date
    ? new Date(event.date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0b0b0b",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background Image (Cover Photo) */}
        {imageUrl && (
          <img
            src={imageUrl}
            alt={event.title || "Event Image"}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        )}

        {/* Dark Tint Overlay to ensure text readability */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.65)",
          }}
        />

        {/* Subtle grid pattern for KITESTUDIOS industrial aesthetic */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "50px 60px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            margin: "20px",
            width: "1160px",
            height: "590px",
            boxSizing: "border-box",
          }}
        >
          {/* Header Branding */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div
              style={{
                fontFamily: fonts.length > 0 ? "JetBrains Mono" : "monospace",
                fontSize: 14,
                letterSpacing: "0.4em",
                color: "#ffffff",
                textTransform: "uppercase",
              }}
            >
              KITESTUDIOS
            </div>
            <div
              style={{
                fontFamily: fonts.length > 0 ? "JetBrains Mono" : "monospace",
                fontSize: 11,
                letterSpacing: "0.2em",
                color: "rgba(255, 255, 255, 0.4)",
                textTransform: "uppercase",
              }}
            >
              PROJECTS / GALLERY
            </div>
          </div>

          {/* Event Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            {/* Tag/Category */}
            <div
              style={{
                fontFamily: fonts.length > 0 ? "JetBrains Mono" : "monospace",
                fontSize: 12,
                color: "#ffff00",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: "16px",
                border: "1px solid #ffff00",
                padding: "4px 8px",
              }}
            >
              EVENT GALLERY
            </div>

            {/* Title */}
            <h1
              style={{
                fontFamily: fonts.length > 1 ? "Inter" : "sans-serif",
                fontSize: 60,
                fontWeight: 700,
                color: "#ffffff",
                textTransform: "uppercase",
                letterSpacing: "0.02em",
                lineHeight: 1.1,
                margin: "0 0 20px 0",
                maxWidth: "960px",
              }}
            >
              {event.title}
            </h1>

            {/* Event Metadata (Date & Location) */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontFamily: fonts.length > 0 ? "JetBrains Mono" : "monospace",
                fontSize: 13,
                letterSpacing: "0.15em",
                color: "#a3a3a3",
                textTransform: "uppercase",
              }}
            >
              {dateString && <span>{dateString}</span>}
              {dateString && event.location && (
                <span style={{ margin: "0 12px", color: "rgba(255,255,255,0.2)" }}>•</span>
              )}
              {event.location && <span>{event.location}</span>}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fonts.length > 0 ? fonts : undefined,
    }
  );
}
