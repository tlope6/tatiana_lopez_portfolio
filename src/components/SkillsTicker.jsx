import { SKILL_ICONS } from "../data/skills";

export default function SkillsTicker() {
  const items = [...SKILL_ICONS, ...SKILL_ICONS, ...SKILL_ICONS];

  return (
    <div
      style={{
        overflow: "hidden",
        padding: "20px 0",
        borderTop: "1px solid rgba(200,138,255,0.06)",
        borderBottom: "1px solid rgba(200,138,255,0.06)",
        background: "rgba(200,138,255,0.02)",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 50,
          whiteSpace: "nowrap",
          animation: "ticker 25s linear infinite",
        }}
      >
        {items.map((s, i) => (
          <span
            key={i}
            style={{
              color: "#7a6a96",
              fontSize: "0.85rem",
              fontWeight: 600,
              letterSpacing: "1px",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ color: "#c88aff", fontSize: "0.6rem" }}>◆</span>
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}