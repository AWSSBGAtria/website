"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fff",
          color: "#000",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <p
            style={{
              fontWeight: 900,
              fontSize: "4rem",
              letterSpacing: "-0.05em",
              margin: 0,
            }}
          >
            500
          </p>
          <p style={{ color: "rgba(0,0,0,0.6)", margin: "0 0 2rem" }}>
            Something broke. Please reload the page.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              padding: "1rem 2rem",
              background: "#4F46E5",
              color: "#fff",
              border: "none",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
