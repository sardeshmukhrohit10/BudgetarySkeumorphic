import React from "react";

function detectDevice() {
  const uaData = navigator.userAgentData;
  if (uaData && typeof uaData.mobile === "boolean") {
    if (uaData.mobile) return "phone"; // phones blocked
    const w = Math.min(window.innerWidth, window.innerHeight);
    if (w < 600) return "phone";
    if (w <= 1280) return "tablet";
    return "desktop";
  }
  const ua = navigator.userAgent;
  const isAndroid = /\bAndroid\b/i.test(ua);
  const isMobileToken = /\bMobi\b/i.test(ua) || /\bMobile\b/i.test(ua);
  if (isAndroid) return isMobileToken ? "phone" : "tablet";
  if (/iPhone|iPod|iPad/i.test(ua)) return "phone";
  const w = Math.min(window.innerWidth, window.innerHeight);
  if (w < 600) return "phone";
  if (w <= 1280) return "tablet";
  return "desktop";
}

export default function DeviceGuard({ children }) {
  const device = detectDevice();
  if (device === "phone") {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24, textAlign: "center", background:"#f8fafc"
      }}>
        <div style={{
          maxWidth: 640, background: "#fff", borderRadius: 16, padding: 24,
          boxShadow: "0 10px 30px rgba(0,0,0,.12)"
        }}>
          <h2 style={{ margin: "0 0 12px" }}>Please use an Android tablet or desktop</h2>
          <p style={{ margin: 0 }}>
            This study is limited to <b>Android tablets</b> and <b>laptops/desktops</b>.
          </p>
        </div>
      </div>
    );
  }
  return children;
}
