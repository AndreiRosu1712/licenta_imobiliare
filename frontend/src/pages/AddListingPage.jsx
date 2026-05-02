import React, { useState } from "react";
import axios from "axios";

/* ─── DESIGN TOKENS ─────────────────────────────────────────────────────── */

const tokens = {
  bg: "oklch(97% 0.008 80)",
  bgCard: "#ffffff",
  bgInput: "oklch(98.5% 0.005 80)",
  border: "oklch(88% 0.008 80)",
  borderFocus: "oklch(55% 0.18 250)",
  textPrimary: "oklch(18% 0.01 250)",
  textSecondary: "oklch(50% 0.01 250)",
  textMuted: "oklch(68% 0.008 250)",
  accent: "oklch(55% 0.18 250)",
  accentHover: "oklch(50% 0.18 250)",
  accentLight: "oklch(96% 0.04 250)",
  green: "oklch(54% 0.16 165)",
  greenLight: "oklch(96% 0.04 165)",
  fontHeading: "'Plus Jakarta Sans', 'Segoe UI', sans-serif",
  fontBody: "'Inter', 'Segoe UI', sans-serif",
};

/* ─── GLOBAL STYLES (injected once) ─────────────────────────────────────── */

const STYLE_ID = "__add-listing-styles";
if (typeof document !== "undefined" && !document.getElementById(STYLE_ID)) {
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');

    @keyframes alFadeSlideIn {
      from { opacity: 0; transform: translateY(8px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes alCheckPop {
      0%   { transform: scale(0.6); opacity: 0; }
      60%  { transform: scale(1.15); }
      100% { transform: scale(1);   opacity: 1; }
    }
    @keyframes alPulse {
      0%, 100% { opacity: 1; }
      50%       { opacity: 0.45; }
    }

    .al-input:focus {
      border-color: ${tokens.borderFocus} !important;
      box-shadow: 0 0 0 3px oklch(55% 0.18 250 / 0.12) !important;
      background: ${tokens.bgCard} !important;
      outline: none;
    }
    .al-select:focus {
      border-color: ${tokens.borderFocus} !important;
      box-shadow: 0 0 0 3px oklch(55% 0.18 250 / 0.12) !important;
      background: ${tokens.bgCard} !important;
      outline: none;
    }
    .al-btn-outline:hover:not(:disabled) {
      background: ${tokens.accentLight} !important;
    }
    .al-btn-primary:hover:not(:disabled) {
      background: ${tokens.accentHover} !important;
    }
    .al-chip:hover {
      border-color: ${tokens.accent} !important;
      background: ${tokens.accentLight} !important;
    }
    .al-progress-link:hover .al-progress-label {
      color: ${tokens.accent} !important;
    }
    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; }
  `;
  document.head.appendChild(style);
}

/* ─── CONSTANTS ─────────────────────────────────────────────────────────── */

const FEATURE_GROUPS = [
  {
    title: "Confort",
    icon: "✦",
    features: [
      { code: "air_conditioning", label: "Aer condiționat" },
      { code: "furniture", label: "Mobilier" },
      { code: "blinds", label: "Obloane" },
      { code: "terrace", label: "Terasă" },
      { code: "balcony", label: "Balcon" },
      { code: "separate_kitchen", label: "Bucătărie separată" },
    ],
  },
  {
    title: "Electrocasnice & utilități",
    icon: "⚡",
    features: [
      { code: "fridge", label: "Frigider" },
      { code: "oven", label: "Cuptor" },
      { code: "hob", label: "Plită" },
      { code: "washing_machine", label: "Mașină de spălat" },
      { code: "dishwasher", label: "Mașină de spălat vase" },
      { code: "tv", label: "TV" },
      { code: "phone", label: "Telefon" },
      { code: "internet", label: "Internet" },
      { code: "cable_tv", label: "Cablu TV" },
    ],
  },
  {
    title: "Siguranță",
    icon: "⬡",
    features: [
      { code: "alarm_system", label: "Sistem de alarmă" },
      { code: "video_surveillance", label: "Supraveghere video" },
      { code: "security", label: "Pază" },
      { code: "intercom", label: "Interfon" },
      { code: "metal_door", label: "Ușă metalică" },
      { code: "smoke_detector", label: "Detector de fum" },
      { code: "secured_area", label: "Zonă securizată" },
    ],
  },
  {
    title: "Parcare & spații extra",
    icon: "⬚",
    features: [
      { code: "parking_space", label: "Loc de parcare" },
      { code: "underground_parking", label: "Parcare subterană" },
      { code: "garage", label: "Garaj" },
      { code: "basement", label: "Beci" },
      { code: "storage_room", label: "Debara" },
      { code: "garden", label: "Grădină" },
      { code: "fenced_yard", label: "Curte împrejmuită" },
    ],
  },
  {
    title: "Facilități premium",
    icon: "◈",
    features: [
      { code: "elevator", label: "Lift" },
      { code: "pool", label: "Piscină" },
      { code: "gym", label: "Sală de sport" },
      { code: "relaxation_space", label: "Spațiu de relaxare" },
      { code: "playground", label: "Loc de joacă" },
      { code: "sports_fields", label: "Terenuri de sport" },
      { code: "interior_stairs", label: "Scară interioară" },
      { code: "disabled_access", label: "Acces persoane cu dizabilități" },
    ],
  },
];

const initialForm = {
  title: "",
  descriptionText: "",
  street: "",
  streetNumber: "",
  sector: "",
  city: "București",
  priceTotal: "",
  priceCurrency: "EUR",
  surfaceAreaSqm: "",
  rooms: "",
  constructionYear: "",
  floorDisplay: "",
  totalFloors: "",
  heatingType: "",
  propertyState: "",
  sellerType: "",
  features: [],
};

/* ─── ATOMS ──────────────────────────────────────────────────────────────── */

function FieldLabel({ children, required }) {
  return (
    <label style={{
      display: "block",
      fontSize: 11,
      fontWeight: 700,
      fontFamily: tokens.fontHeading,
      color: tokens.textSecondary,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      marginBottom: 6,
    }}>
      {children}
      {required && (
        <span style={{ color: tokens.accent, marginLeft: 3 }}>*</span>
      )}
    </label>
  );
}

const inputStyle = {
  width: "100%",
  background: tokens.bgInput,
  border: `1.5px solid ${tokens.border}`,
  borderRadius: 8,
  padding: "10px 14px",
  fontSize: 14,
  fontFamily: tokens.fontBody,
  color: tokens.textPrimary,
  transition: "border-color 0.18s, box-shadow 0.18s, background 0.18s",
};

function ALInput({ label, required, ...props }) {
  return (
    <div>
      {label && <FieldLabel required={required}>{label}</FieldLabel>}
      <input
        className="al-input"
        style={inputStyle}
        {...props}
      />
    </div>
  );
}

function ALTextarea({ label, ...props }) {
  return (
    <div>
      {label && <FieldLabel>{label}</FieldLabel>}
      <textarea
        className="al-input"
        style={{ ...inputStyle, resize: "vertical", minHeight: 100, lineHeight: 1.6 }}
        {...props}
      />
    </div>
  );
}

function ALSelect({ label, required, children, ...props }) {
  return (
    <div>
      {label && <FieldLabel required={required}>{label}</FieldLabel>}
      <div style={{ position: "relative" }}>
        <select
          className="al-select"
          style={{ ...inputStyle, appearance: "none", cursor: "pointer", paddingRight: 36 }}
          {...props}
        >
          {children}
        </select>
        <svg
          style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
          width="14" height="14" viewBox="0 0 14 14" fill="none"
        >
          <path d="M2.5 5L7 9.5L11.5 5" stroke={tokens.textMuted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

function FeatureChip({ label, checked, onChange }) {
  return (
    <button
      type="button"
      className="al-chip"
      onClick={onChange}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "7px 12px",
        borderRadius: 8,
        border: `1.5px solid ${checked ? tokens.accent : tokens.border}`,
        background: checked ? tokens.accentLight : tokens.bgInput,
        color: checked ? tokens.accent : tokens.textSecondary,
        fontSize: 13,
        fontFamily: tokens.fontBody,
        fontWeight: checked ? 600 : 400,
        cursor: "pointer",
        transition: "all 0.15s",
        userSelect: "none",
        whiteSpace: "nowrap",
      }}
    >
      <span style={{
        width: 16,
        height: 16,
        borderRadius: 4,
        border: checked ? "none" : `1.5px solid ${tokens.border}`,
        background: checked ? tokens.accent : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        transition: "all 0.15s",
      }}>
        {checked && (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ animation: "alCheckPop 0.2s ease" }}>
            <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {label}
    </button>
  );
}

function SectionCard({ id, number, title, subtitle, children }) {
  return (
    <div
      id={id}
      style={{
        background: tokens.bgCard,
        borderRadius: 16,
        border: `1px solid ${tokens.border}`,
        boxShadow: "0 1px 3px oklch(18% 0.01 250 / 0.06)",
        overflow: "hidden",
        animation: "alFadeSlideIn 0.35s ease both",
      }}
    >
      <div style={{
        padding: "20px 28px",
        borderBottom: `1px solid ${tokens.border}`,
        display: "flex",
        alignItems: "center",
        gap: 14,
        background: "oklch(99% 0.005 250)",
      }}>
        <div style={{
          width: 30,
          height: 30,
          borderRadius: "50%",
          background: tokens.accent,
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 12,
          fontWeight: 700,
          fontFamily: tokens.fontHeading,
          flexShrink: 0,
        }}>
          {number}
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, fontFamily: tokens.fontHeading, color: tokens.textPrimary }}>
            {title}
          </div>
          {subtitle && (
            <div style={{ fontSize: 12, color: tokens.textMuted, marginTop: 1 }}>{subtitle}</div>
          )}
        </div>
      </div>
      <div style={{ padding: "24px 28px" }}>{children}</div>
    </div>
  );
}

/* ─── PROGRESS SIDEBAR ───────────────────────────────────────────────────── */

function ProgressSidebar({ formData }) {
  const sections = [
    {
      id: "basics",
      label: "Date generale",
      filled: [formData.title, formData.descriptionText, formData.priceTotal, formData.priceCurrency].filter(Boolean).length,
      total: 4,
    },
    {
      id: "location",
      label: "Localizare",
      filled: [formData.street, formData.streetNumber, formData.sector, formData.city].filter(Boolean).length,
      total: 4,
    },
    {
      id: "details",
      label: "Detalii",
      filled: [formData.surfaceAreaSqm, formData.rooms, formData.constructionYear, formData.floorDisplay, formData.heatingType, formData.propertyState, formData.sellerType].filter(Boolean).length,
      total: 7,
    },
    {
      id: "features",
      label: "Dotări",
      filled: Math.min(formData.features.length, 3),
      total: 3,
    },
  ];

  const totalFilled = sections.reduce((s, sec) => s + sec.filled, 0);
  const totalPossible = sections.reduce((s, sec) => s + sec.total, 0);
  const pct = Math.round((totalFilled / totalPossible) * 100);
  const circumference = 2 * Math.PI * 22;

  return (
    <div style={{
      background: tokens.bgCard,
      borderRadius: 16,
      border: `1px solid ${tokens.border}`,
      boxShadow: "0 1px 3px oklch(18% 0.01 250 / 0.06)",
      padding: "20px",
      position: "sticky",
      top: 24,
    }}>
      <div style={{
        fontSize: 11,
        fontWeight: 700,
        fontFamily: tokens.fontHeading,
        color: tokens.textSecondary,
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        marginBottom: 16,
      }}>
        Progres anunț
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
        <svg width="56" height="56" viewBox="0 0 56 56">
          <circle cx="28" cy="28" r="22" fill="none" stroke={tokens.border} strokeWidth="4" />
          <circle
            cx="28" cy="28" r="22" fill="none"
            stroke={tokens.accent} strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - pct / 100)}
            transform="rotate(-90 28 28)"
            style={{ transition: "stroke-dashoffset 0.4s ease" }}
          />
          <text x="28" y="33" textAnchor="middle" fontSize="12" fontWeight="700" fontFamily={tokens.fontHeading} fill={tokens.accent}>
            {pct}%
          </text>
        </svg>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: tokens.textPrimary }}>Completare</div>
          <div style={{ fontSize: 12, color: tokens.textMuted, marginTop: 2 }}>
            {pct < 40 ? "Adaugă mai multe detalii" : pct < 80 ? "Aproape gata!" : "Anunț complet"}
          </div>
        </div>
      </div>

      {sections.map((s) => (
        <a
          href={`#${s.id}`}
          key={s.id}
          className="al-progress-link"
          style={{ textDecoration: "none", display: "block", marginBottom: 12 }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
            <span className="al-progress-label" style={{ fontSize: 12, fontWeight: 500, color: tokens.textPrimary, transition: "color 0.15s" }}>
              {s.label}
            </span>
            <span style={{ fontSize: 11, color: tokens.textMuted }}>{s.filled}/{s.total}</span>
          </div>
          <div style={{ height: 4, borderRadius: 99, background: tokens.border, overflow: "hidden" }}>
            <div style={{
              height: "100%",
              width: `${Math.round((s.filled / s.total) * 100)}%`,
              background: s.filled === s.total ? tokens.green : tokens.accent,
              borderRadius: 99,
              transition: "width 0.4s ease",
            }} />
          </div>
        </a>
      ))}
    </div>
  );
}

/* ─── MAIN COMPONENT ─────────────────────────────────────────────────────── */

export default function AddListingPage() {
  const [formData, setFormData] = useState(initialForm);
  const [estimatedPrice, setEstimatedPrice] = useState(null);
  const [estimatedPricePerSqm, setEstimatedPricePerSqm] = useState(null);
  const [loadingEstimate, setLoadingEstimate] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleFeatureToggle = (code) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(code)
        ? prev.features.filter((c) => c !== code)
        : [...prev.features, code],
    }));
  };

  const validateRequiredFields = () => {
    if (!formData.street.trim()) { alert("Completează numele străzii."); return false; }
    if (!formData.streetNumber.trim()) { alert("Completează numărul străzii."); return false; }
    if (!formData.sector) { alert("Selectează sectorul."); return false; }
    return true;
  };

  const buildPayload = () => {
    const address = `${formData.street} ${formData.streetNumber}, Sectorul ${formData.sector}, ${formData.city}`;
    return {
      title: formData.title,
      descriptionText: formData.descriptionText,
      street: formData.street,
      streetNumber: formData.streetNumber,
      sector: formData.sector,
      city: formData.city,
      address,
      priceTotal: Number(formData.priceTotal),
      priceCurrency: formData.priceCurrency,
      surfaceAreaSqm: Number(formData.surfaceAreaSqm),
      rooms: Number(formData.rooms),
      constructionYear: Number(formData.constructionYear),
      floorDisplay: formData.floorDisplay,
      totalFloors: Number(formData.totalFloors),
      heatingType: formData.heatingType,
      propertyState: formData.propertyState,
      sellerType: formData.sellerType,
      features: formData.features,
    };
  };

  const handleEstimatePrice = async () => {
    if (!validateRequiredFields()) return;
    try {
      setLoadingEstimate(true);
      const payload = buildPayload();
      const response = await axios.post("http://localhost:8000/predict", payload);
      setEstimatedPrice(response.data.estimated_price);
      setEstimatedPricePerSqm(response.data.estimated_price_per_sqm);
    } catch (error) {
      console.error(error);
      alert("Nu s-a putut calcula estimarea.");
    } finally {
      setLoadingEstimate(false);
    }
  };

  const handleSubmit = async () => {
    if (!validateRequiredFields()) return;
    try {
      setLoadingSubmit(true);
      const payload = buildPayload();
      await axios.post("http://localhost:8080/api/listings", payload);
      setSubmitted(true);
      setEstimatedPrice(null);
      setEstimatedPricePerSqm(null);
    } catch (error) {
      console.error(error);
      alert("Nu s-a putut crea anunțul.");
    } finally {
      setLoadingSubmit(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData(initialForm);
    setEstimatedPrice(null);
    setEstimatedPricePerSqm(null);
  };

  /* ── Success screen ── */
  if (submitted) {
    return (
      <div style={{
        minHeight: "100vh",
        background: tokens.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        fontFamily: tokens.fontBody,
      }}>
        <div style={{
          background: tokens.bgCard,
          borderRadius: 16,
          border: `1px solid ${tokens.border}`,
          boxShadow: "0 12px 32px oklch(18% 0.01 250 / 0.1)",
          padding: "56px 48px",
          maxWidth: 460,
          width: "100%",
          textAlign: "center",
          animation: "alFadeSlideIn 0.4s ease",
        }}>
          <div style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: tokens.greenLight,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
            animation: "alCheckPop 0.4s ease",
          }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M6 16l7 7 13-13" stroke={tokens.green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, fontFamily: tokens.fontHeading, marginBottom: 12, color: tokens.textPrimary }}>
            Anunț publicat!
          </div>
          <div style={{ fontSize: 15, color: tokens.textSecondary, lineHeight: 1.6, marginBottom: 32 }}>
            Anunțul tău a fost creat cu succes și este acum vizibil pe platformă.
          </div>
          <button
            onClick={resetForm}
            className="al-btn-primary"
            style={{
              padding: "12px 28px",
              borderRadius: 8,
              background: tokens.accent,
              color: "white",
              border: "none",
              fontSize: 14,
              fontWeight: 600,
              fontFamily: tokens.fontHeading,
              cursor: "pointer",
              transition: "background 0.15s",
            }}
          >
            Adaugă alt anunț
          </button>
        </div>
      </div>
    );
  }

  /* ── Main form ── */
  return (
    <div style={{
      minHeight: "100vh",
      background: tokens.bg,
      padding: "32px 24px",
      fontFamily: tokens.fontBody,
    }}>
      {/* Page header */}
      <div style={{ maxWidth: 1100, margin: "0 auto 28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: tokens.accent,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 9.5L10 3l7 6.5V17a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M7 18v-5h6v5" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, fontFamily: tokens.fontHeading, lineHeight: 1, color: tokens.textPrimary }}>
              Adaugă anunț imobiliar
            </div>
            <div style={{ fontSize: 13, color: tokens.textMuted, marginTop: 3 }}>
              Completează datele apartamentului · estimare AI inclusă
            </div>
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div style={{
        maxWidth: 1100,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "210px 1fr",
        gap: 22,
        alignItems: "start",
      }}>
        {/* Sidebar */}
        <ProgressSidebar formData={formData} />

        {/* Sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

          {/* 1 — Date generale */}
          <SectionCard id="basics" number="1" title="Date generale" subtitle="Titlu, descriere și prețul anunțului">
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <ALInput
                label="Titlu anunț"
                value={formData.title}
                onChange={handleChange("title")}
                placeholder="Ex: Apartament 3 camere, Floreasca, vedere spre parc"
              />
              <ALTextarea
                label="Descriere"
                value={formData.descriptionText}
                onChange={handleChange("descriptionText")}
                placeholder="Descrie proprietatea: stare, vederi, renovări recente, proximitate față de transport..."
              />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 140px", gap: 12 }}>
                <ALInput
                  label="Preț cerut"
                  type="number"
                  value={formData.priceTotal}
                  onChange={handleChange("priceTotal")}
                  placeholder="Ex: 125000"
                />
                <ALSelect label="Monedă" value={formData.priceCurrency} onChange={handleChange("priceCurrency")}>
                  <option value="EUR">EUR €</option>
                  <option value="RON">RON ₗ</option>
                </ALSelect>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <ALSelect label="Tip vânzător" value={formData.sellerType} onChange={handleChange("sellerType")}>
                  <option value="">Selectează...</option>
                  <option value="privat">Privat</option>
                  <option value="agenție">Agenție</option>
                  <option value="dezvoltator">Dezvoltator</option>
                </ALSelect>
                <ALSelect label="Stare proprietate" value={formData.propertyState} onChange={handleChange("propertyState")}>
                  <option value="">Selectează...</option>
                  <option value="gata de utilizare">Gata de utilizare</option>
                  <option value="de renovat">De renovat</option>
                  <option value="în construcție">În construcție</option>
                </ALSelect>
              </div>
            </div>
          </SectionCard>

          {/* 2 — Localizare */}
          <SectionCard id="location" number="2" title="Localizare" subtitle="Adresa exactă a proprietății">
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 100px", gap: 12 }}>
                <ALInput
                  label="Stradă"
                  required
                  value={formData.street}
                  onChange={handleChange("street")}
                  placeholder="Ex: Bulevardul Nicolae Grigorescu"
                />
                <ALInput
                  label="Număr"
                  required
                  value={formData.streetNumber}
                  onChange={handleChange("streetNumber")}
                  placeholder="10"
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <ALSelect label="Sector" required value={formData.sector} onChange={handleChange("sector")}>
                  <option value="">Selectează sector...</option>
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={String(n)}>Sector {n}</option>
                  ))}
                </ALSelect>
                <ALInput
                  label="Localitate"
                  value={formData.city}
                  onChange={handleChange("city")}
                  placeholder="București"
                />
              </div>
            </div>
          </SectionCard>

          {/* 3 — Detalii */}
          <SectionCard id="details" number="3" title="Detalii proprietate" subtitle="Suprafață, etaj, an construcție și dotări tehnice">
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                <ALInput
                  label="Suprafață utilă (mp)"
                  type="number"
                  value={formData.surfaceAreaSqm}
                  onChange={handleChange("surfaceAreaSqm")}
                  placeholder="Ex: 75"
                />
                <ALSelect label="Camere" value={formData.rooms} onChange={handleChange("rooms")}>
                  <option value="">Camere...</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? "cameră" : "camere"}</option>
                  ))}
                </ALSelect>
                <ALInput
                  label="An construcție"
                  type="number"
                  value={formData.constructionYear}
                  onChange={handleChange("constructionYear")}
                  placeholder="Ex: 2005"
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                <ALSelect label="Etaj" value={formData.floorDisplay} onChange={handleChange("floorDisplay")}>
                  <option value="">Selectează etaj...</option>
                  <option value="cellar">Demisol / Subsol</option>
                  <option value="ground_floor">Parter</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                    <option key={n} value={`floor_${n}`}>Etaj {n}</option>
                  ))}
                  <option value="floor_higher_10">Peste etajul 10</option>
                  <option value="garret">Mansardă</option>
                </ALSelect>
                <ALInput
                  label="Total etaje clădire"
                  type="number"
                  value={formData.totalFloors}
                  onChange={handleChange("totalFloors")}
                  placeholder="Ex: 8"
                />
                <ALSelect label="Încălzire" value={formData.heatingType} onChange={handleChange("heatingType")}>
                  <option value="">Tip încălzire...</option>
                  <option value="boiler_room">Centrală proprie — gaz</option>
                  <option value="electrical">Centrală proprie — electric</option>
                  <option value="urban">Sistem centralizat</option>
                  <option value="tiled_stove">Sobă</option>
                  <option value="other">Alt tip</option>
                </ALSelect>
              </div>
            </div>
          </SectionCard>

          {/* 4 — Dotări */}
          <SectionCard
            id="features"
            number="4"
            title="Dotări & facilități"
            subtitle={`${formData.features.length} dotări selectate`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              {FEATURE_GROUPS.map((group) => (
                <div key={group.title}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 10,
                    paddingBottom: 10,
                    borderBottom: `1px solid ${tokens.border}`,
                  }}>
                    <span style={{ fontSize: 14, color: tokens.accent }}>{group.icon}</span>
                    <span style={{
                      fontSize: 11,
                      fontWeight: 700,
                      fontFamily: tokens.fontHeading,
                      color: tokens.textPrimary,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}>
                      {group.title}
                    </span>
                    <span style={{
                      marginLeft: "auto",
                      fontSize: 11,
                      fontWeight: 600,
                      color: tokens.accent,
                      background: tokens.accentLight,
                      padding: "2px 8px",
                      borderRadius: 99,
                    }}>
                      {group.features.filter((f) => formData.features.includes(f.code)).length} selectate
                    </span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {group.features.map((f) => (
                      <FeatureChip
                        key={f.code}
                        label={f.label}
                        checked={formData.features.includes(f.code)}
                        onChange={() => handleFeatureToggle(f.code)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* ML Estimation result */}
          {estimatedPrice && (
            <div style={{
              background: tokens.greenLight,
              border: `1.5px solid ${tokens.green}`,
              borderRadius: 16,
              padding: "20px 28px",
              display: "flex",
              alignItems: "center",
              gap: 20,
              animation: "alFadeSlideIn 0.35s ease",
            }}>
              <div style={{
                width: 48, height: 48,
                borderRadius: "50%",
                background: tokens.green,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M4 11l4 4 10-10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: 11,
                  fontWeight: 700,
                  fontFamily: tokens.fontHeading,
                  color: tokens.green,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: 4,
                }}>
                  Estimare model ML
                </div>
                <div style={{ fontSize: 26, fontWeight: 800, fontFamily: tokens.fontHeading, color: tokens.textPrimary }}>
                  {Number(estimatedPrice).toLocaleString("ro-RO")} EUR
                </div>
                {estimatedPricePerSqm && (
                  <div style={{ fontSize: 14, color: tokens.textSecondary, marginTop: 3 }}>
                    {Number(estimatedPricePerSqm).toLocaleString("ro-RO")} EUR/mp
                  </div>
                )}
              </div>
              <div style={{ fontSize: 12, color: tokens.textMuted, maxWidth: 160, lineHeight: 1.5, textAlign: "right" }}>
                Preț estimat pe baza datelor introduse
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", paddingBottom: 40 }}>
            <button
              type="button"
              className="al-btn-outline"
              onClick={handleEstimatePrice}
              disabled={loadingEstimate}
              style={{
                padding: "11px 22px",
                borderRadius: 8,
                border: `1.5px solid ${tokens.accent}`,
                background: "transparent",
                color: tokens.accent,
                fontSize: 14,
                fontWeight: 600,
                fontFamily: tokens.fontHeading,
                cursor: loadingEstimate ? "not-allowed" : "pointer",
                opacity: loadingEstimate ? 0.6 : 1,
                transition: "all 0.15s",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              {loadingEstimate ? (
                <span style={{ animation: "alPulse 1s ease infinite" }}>Se calculează...</span>
              ) : (
                "Vezi estimarea"
              )}
            </button>

            <button
              type="button"
              className="al-btn-primary"
              onClick={handleSubmit}
              disabled={loadingSubmit}
              style={{
                padding: "11px 24px",
                borderRadius: 8,
                border: "none",
                background: tokens.accent,
                color: "white",
                fontSize: 14,
                fontWeight: 700,
                fontFamily: tokens.fontHeading,
                cursor: loadingSubmit ? "not-allowed" : "pointer",
                opacity: loadingSubmit ? 0.7 : 1,
                transition: "background 0.15s, opacity 0.15s",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              {loadingSubmit ? (
                <span style={{ animation: "alPulse 1s ease infinite" }}>Se publică...</span>
              ) : (
                "Publică anunțul"
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
