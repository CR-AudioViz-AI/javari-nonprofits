// app/page.tsx — Javari Nonprofits
// AI tools for nonprofits, 501c3s, and mission-driven organizations
// CR AudioViz AI · EIN 39-3646201 · May 2026
"use client";
import { useState } from "react";

const TOOLS = [
  { icon: "💚", label: "Grant Writer",     desc: "Write winning grant applications in minutes",       href: "https://craudiovizai.com/grants" },
  { icon: "📧", label: "Donor Emails",     desc: "Personalized fundraising email campaigns",          href: "/donor-emails" },
  { icon: "📊", label: "Impact Report",    desc: "Annual report and impact statement generator",      href: "/impact-report" },
  { icon: "📱", label: "Social Media",     desc: "Mission-driven content for all platforms",          href: "/social" },
  { icon: "🎤", label: "Pitch Deck",       desc: "AI-crafted presentations for donors and boards",    href: "/pitch-deck" },
  { icon: "📋", label: "Board Minutes",    desc: "Professional meeting minutes in seconds",           href: "/board-minutes" },
  { icon: "🔍", label: "Grant Finder",     desc: "$500K+ in nonprofit grants matched to your mission",href: "https://craudiovizai.com/grants" },
  { icon: "📝", label: "501c3 Letter",     desc: "Draft IRS determination letters and responses",     href: "/irs-letters" },
];

export default function NonprofitsHome() {
  const [mission, setMission] = useState("");
  const [pitch, setPitch] = useState("");
  const [loading, setLoading] = useState(false);

  async function writePitch() {
    if (!mission.trim()) return;
    setLoading(true); setPitch("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: `Write a compelling 60-second elevator pitch for a nonprofit with this mission: "${mission}". Include: who we serve, the problem we solve, our solution, and a specific call to action for a potential donor or partner.` }],
          stream: false,
          systemOverride: "You are an expert nonprofit communications strategist who has helped organizations raise millions. Write compelling, specific pitches that connect emotionally and drive action."
        }),
      });
      const data = await res.json();
      setPitch(data?.choices?.[0]?.message?.content || data?.content || "Error.");
    } catch { setPitch("Connection error."); }
    setLoading(false);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#040912", color: "#e2e8f0", fontFamily: "system-ui" }}>
      <nav style={{ background: "#1E3A5F", padding: "0 20px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 20 }}>❤️</span>
          <span style={{ fontWeight: 800, color: "#00B4D8", fontSize: 15 }}>Javari Nonprofits</span>
        </div>
        <a href="https://craudiovizai.com/auth/signup" style={{ background: "#FF0800", color: "#fff", borderRadius: 7, padding: "5px 14px", fontSize: 12, fontWeight: 700, textDecoration: "none" }}>Free for Nonprofits</a>
      </nav>

      <section style={{ background: "linear-gradient(135deg,#1E3A5F,#040912)", padding: "64px 24px 56px", textAlign: "center" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ display: "inline-block", background: "rgba(0,180,216,0.1)", border: "1px solid rgba(0,180,216,0.25)", borderRadius: 20, padding: "4px 16px", marginBottom: 16, fontSize: 12, fontWeight: 700, color: "#00B4D8" }}>
            2× Free Credits for All 501c3 Organizations
          </div>
          <h1 style={{ fontSize: "clamp(26px,4vw,48px)", fontWeight: 900, color: "#fff", margin: "0 0 14px", lineHeight: 1.05 }}>
            Your Mission Deserves<br /><span style={{ color: "#00B4D8" }}>World-Class AI Tools</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 15, lineHeight: 1.65, margin: "0 0 32px" }}>
            Grant writing, donor communications, impact reports, and social media — everything your nonprofit needs to do more good.
          </p>
        </div>
      </section>

      {/* Quick pitch generator */}
      <section style={{ maxWidth: 700, margin: "0 auto", padding: "36px 20px 0" }}>
        <div style={{ background: "#0F1F32", border: "1px solid rgba(0,180,216,0.12)", borderRadius: 16, padding: "24px 28px" }}>
          <h2 style={{ margin: "0 0 6px", fontSize: 16, fontWeight: 800, color: "#fff" }}>Write Your Elevator Pitch</h2>
          <p style={{ margin: "0 0 16px", color: "#6B7280", fontSize: 13 }}>Paste your mission statement and get a donor-ready pitch in seconds.</p>
          <textarea value={mission} onChange={e => setMission(e.target.value)} rows={3}
            placeholder="Our mission is to provide nutritious meals to food-insecure children in Southwest Florida..."
            style={{ width: "100%", background: "#172D48", border: "1px solid rgba(0,180,216,0.15)", borderRadius: 8, padding: "11px 14px", color: "#e2e8f0", fontSize: 13, outline: "none", fontFamily: "system-ui", boxSizing: "border-box", resize: "vertical", marginBottom: 12 }} />
          <button onClick={writePitch} disabled={loading || !mission.trim()}
            style={{ background: loading || !mission.trim() ? "#0F1F32" : "#1E3A5F", color: loading || !mission.trim() ? "#374151" : "#00B4D8", border: "1px solid rgba(0,180,216,0.2)", borderRadius: 8, padding: "11px 22px", fontSize: 14, fontWeight: 700, cursor: loading || !mission.trim() ? "not-allowed" : "pointer", fontFamily: "system-ui" }}>
            {loading ? "Writing..." : "🎤 Generate Pitch"}
          </button>
          {pitch && (
            <div style={{ marginTop: 16, padding: "14px 16px", background: "rgba(0,180,216,0.05)", border: "1px solid rgba(0,180,216,0.12)", borderRadius: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#00B4D8" }}>Your Elevator Pitch</span>
                <button onClick={() => navigator.clipboard?.writeText(pitch)} style={{ background: "transparent", color: "#6B7280", border: "none", fontSize: 11, cursor: "pointer", fontFamily: "system-ui" }}>Copy</button>
              </div>
              <p style={{ margin: 0, fontSize: 13, color: "#e2e8f0", lineHeight: 1.65, whiteSpace: "pre-wrap" }}>{pitch}</p>
            </div>
          )}
        </div>
      </section>

      <section style={{ maxWidth: 960, margin: "0 auto", padding: "48px 20px 72px" }}>
        <h2 style={{ textAlign: "center", fontSize: "clamp(18px,3vw,28px)", fontWeight: 800, color: "#fff", margin: "0 0 32px" }}>All Tools</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 12 }}>
          {TOOLS.map(t => (
            <a key={t.href} href={t.href} style={{ background: "#0F1F32", border: "1px solid rgba(0,180,216,0.08)", borderRadius: 14, padding: "20px 18px", textDecoration: "none", display: "block" }}>
              <span style={{ fontSize: 28, display: "block", marginBottom: 8 }}>{t.icon}</span>
              <div style={{ fontWeight: 700, fontSize: 13, color: "#e2e8f0", marginBottom: 5 }}>{t.label}</div>
              <div style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.4 }}>{t.desc}</div>
            </a>
          ))}
        </div>
      </section>

      <footer style={{ borderTop: "1px solid rgba(0,180,216,0.08)", padding: "14px 24px", textAlign: "center" }}>
        <p style={{ color: "#374151", fontSize: 11, margin: 0 }}>
          © 2026 CR AudioViz AI, LLC — EIN: 39-3646201 · <a href="https://craudiovizai.com/auth/signup" style={{ color: "#FF0800", textDecoration: "none", fontWeight: 600 }}>Free for Nonprofits</a>
        </p>
      </footer>
    </div>
  );
}