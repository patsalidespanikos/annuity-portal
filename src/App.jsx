import { useState } from "react";

const CASES = [
  { id: "ANN-2024-0891", name: "Margaret Thornton", age: 67, fund: "£142,500", stage: 3, stageLabel: "Underwriting", status: "Medical Evidence Requested", ifa: "Hargreaves Lansdown", days: 4, urgent: true, annuityType: "Enhanced - Joint Life" },
  { id: "ANN-2024-0887", name: "Robert Hesketh", age: 72, fund: "£89,200", stage: 4, stageLabel: "Repricing", status: "IFA Acceptance Pending", ifa: "St. James's Place", days: 2, urgent: true, annuityType: "Level - Single Life" },
  { id: "ANN-2024-0882", name: "Patricia Walmsley", age: 65, fund: "£214,000", stage: 5, stageLabel: "Reinsurer", status: "Awaiting Decision", ifa: "Quilter", days: 12, urgent: false, annuityType: "Enhanced - Single Life" },
  { id: "ANN-2024-0876", name: "David Cartwright", age: 70, fund: "£67,400", stage: 6, stageLabel: "Fund Transfer", status: "Partial Receipt — £62,800", ifa: "Brewin Dolphin", days: 8, urgent: false, annuityType: "Escalating 3% — Joint" },
  { id: "ANN-2024-0869", name: "Susan Fairweather", age: 63, fund: "£310,000", stage: 2, stageLabel: "Quote", status: "Quote Sent to IFA", ifa: "Tilney", days: 1, urgent: false, annuityType: "Level - Joint Life" },
  { id: "ANN-2024-0861", name: "Gerald Morrison", age: 74, fund: "£128,750", stage: 7, stageLabel: "Policy Issue", status: "Documents Generated", ifa: "Rathbones", days: 3, urgent: false, annuityType: "Enhanced - Single Life" },
];

const STAGES = [
  { n: 1, label: "Enquiry" },
  { n: 2, label: "Quote" },
  { n: 3, label: "Underwriting" },
  { n: 4, label: "Repricing" },
  { n: 5, label: "Reinsurer" },
  { n: 6, label: "Fund Transfer" },
  { n: 7, label: "Policy Issue" },
  { n: 8, label: "In-Force" },
];

const WORKFLOW_DETAIL = {
  3: {
    color: "#b45309",
    states: ["Awaiting Medical Info", "GP Report Requested", "Medical Evidence Received", "Underwriting Decision", "Referred to Chief UW"],
    current: 1,
    integrations: ["iGPR API — GP Report Pending", "Morgan Ash MARS — Not triggered"],
    rules: ["Refer trigger: 2+ conditions present", "Art.9 GDPR: medical data isolated", "SLA: 10 working days"],
    data: [
      { k: "Conditions", v: "Type 2 Diabetes, Hypertension" },
      { k: "GP Practice", v: "Thornton Medical Centre, Leeds" },
      { k: "iGPR Ref", v: "Awaiting" },
      { k: "UW Decision", v: "Pending" },
    ],
  },
  4: {
    color: "#b45309",
    states: ["Reprice Triggered", "Reprice Calculated", "IFA Notified", "IFA Accepted", "Lapsed"],
    current: 2,
    integrations: ["Pricing Engine — Rate recalculated", "Mailock — Notification sent to IFA"],
    rules: ["Validity window: 5 days (2 remaining)", "Rate change: +0.18% on enhanced factors", "Auto-lapse if no IFA response"],
    data: [
      { k: "Reprice Reason", v: "Medical evidence — enhanced rate" },
      { k: "New Rate", v: "5.84% p.a." },
      { k: "Previous Rate", v: "5.66% p.a." },
      { k: "Validity Expires", v: "13 Mar 2026" },
    ],
  },
  5: {
    color: "#0f766e",
    states: ["Submission Prepared", "Sent to Reinsurer", "Awaiting Decision", "Accepted", "Counter-offer"],
    current: 2,
    integrations: ["Munich Re Portal — Submission ref MR-2024-4421", "Secure doc transfer — Complete"],
    rules: ["Facultative: fund >£200k", "30-day SLA — 12 days elapsed", "Counter-offer workflow available"],
    data: [
      { k: "Reinsurer", v: "Munich Re" },
      { k: "Treaty Ref", v: "MR-2024-4421" },
      { k: "Sum Reinsured", v: "£214,000" },
      { k: "Decision SLA", v: "18 days remaining" },
    ],
  },
};

const STATS = [
  { label: "Active Cases", value: "47", delta: "+3 this week", up: true },
  { label: "Awaiting Medical", value: "12", delta: "4 overdue SLA", up: false },
  { label: "Pending IFA Action", value: "8", delta: "2 expiring today", up: false },
  { label: "Policies Issued MTD", value: "23", delta: "+15% vs last month", up: true },
];

const NAV = ["Dashboard", "Cases", "Workflow Reference", "Integrations", "Reports"];

export default function AnnuityPortal() {
  const [nav, setNav] = useState("Dashboard");
  const [selectedCase, setSelectedCase] = useState(null);
  const [workflowStage, setWorkflowStage] = useState(null);

  const sc = selectedCase ? CASES.find(c => c.id === selectedCase) : null;

  return (
    <div style={{ display: "flex", height: "100vh", background: "#0d1117", fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif", color: "#c9d1d9", overflow: "hidden" }}>

      {/* Sidebar */}
      <div style={{ width: 220, background: "#0a0e15", borderRight: "1px solid #161b22", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid #161b22" }}>
          <div style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "#4a6fa5", marginBottom: 4 }}>Annuity Operations</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#e6edf3", letterSpacing: "-0.01em" }}>PolicyFlow</div>
          <div style={{ fontSize: 10, color: "#30363d", marginTop: 2 }}>v0.1 — Foundation Build</div>
        </div>
        <nav style={{ padding: "16px 0", flex: 1 }}>
          {NAV.map(n => (
            <div key={n} onClick={() => { setNav(n); setSelectedCase(null); }} style={{
              padding: "10px 20px", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 10,
              color: nav === n ? "#e6edf3" : "#6e7681",
              background: nav === n ? "#161b22" : "transparent",
              borderLeft: nav === n ? "2px solid #d4a017" : "2px solid transparent",
              transition: "all 0.1s",
            }}>
              <span style={{ fontSize: 15 }}>{["⬡", "⬜", "◈", "⬢", "◉"][NAV.indexOf(n)]}</span>
              {n}
            </div>
          ))}
        </nav>
        <div style={{ padding: "16px 20px", borderTop: "1px solid #161b22" }}>
          <div style={{ fontSize: 11, color: "#4a6fa5" }}>Logged in as</div>
          <div style={{ fontSize: 12, color: "#8b949e", marginTop: 2 }}>Senior Underwriter</div>
          <div style={{ marginTop: 8, display: "inline-block", background: "#162032", border: "1px solid #1f6feb", borderRadius: 4, padding: "2px 8px", fontSize: 10, color: "#58a6ff" }}>FCA Authorised</div>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Topbar */}
        <div style={{ borderBottom: "1px solid #161b22", padding: "14px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#0d1117", flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#e6edf3" }}>
              {selectedCase ? sc.id : nav}
            </div>
            {selectedCase && <div style={{ fontSize: 12, color: "#6e7681", marginTop: 1 }}>{sc.name} — {sc.annuityType}</div>}
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ background: "#161b22", border: "1px solid #30363d", borderRadius: 6, padding: "6px 14px", fontSize: 12, color: "#8b949e" }}>
              Mon 9 Mar 2026
            </div>
            {selectedCase && (
              <button onClick={() => setSelectedCase(null)} style={{ background: "transparent", border: "1px solid #30363d", color: "#8b949e", borderRadius: 6, padding: "6px 14px", fontSize: 12, cursor: "pointer" }}>
                ← All Cases
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: 28 }}>

          {/* DASHBOARD */}
          {nav === "Dashboard" && !selectedCase && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
                {STATS.map(s => (
                  <div key={s.label} style={{ background: "#0a0e15", border: "1px solid #161b22", borderRadius: 10, padding: "18px 20px" }}>
                    <div style={{ fontSize: 11, color: "#6e7681", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>{s.label}</div>
                    <div style={{ fontSize: 28, fontWeight: 700, color: "#e6edf3", fontVariantNumeric: "tabular-nums" }}>{s.value}</div>
                    <div style={{ fontSize: 11, marginTop: 4, color: s.up ? "#3fb950" : "#f85149" }}>{s.delta}</div>
                  </div>
                ))}
              </div>

              <div style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#4a6fa5", marginBottom: 14 }}>Cases Requiring Attention</div>
              <CaseTable cases={CASES} onSelect={setSelectedCase} />
            </>
          )}

          {/* CASES */}
          {nav === "Cases" && !selectedCase && (
            <>
              <div style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#4a6fa5", marginBottom: 14 }}>All Active Cases</div>
              <CaseTable cases={CASES} onSelect={setSelectedCase} />
            </>
          )}

          {/* CASE DETAIL */}
          {selectedCase && sc && (
            <CaseDetail c={sc} />
          )}

          {/* WORKFLOW REFERENCE */}
          {nav === "Workflow Reference" && <WorkflowRef workflowStage={workflowStage} setWorkflowStage={setWorkflowStage} />}

          {/* INTEGRATIONS */}
          {nav === "Integrations" && <Integrations />}

          {/* REPORTS placeholder */}
          {nav === "Reports" && (
            <div style={{ color: "#6e7681", fontSize: 14, marginTop: 40, textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>◉</div>
              Reports module — coming in Phase 2
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

function CaseTable({ cases, onSelect }) {
  return (
    <div style={{ background: "#0a0e15", border: "1px solid #161b22", borderRadius: 10, overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #161b22" }}>
            {["Case ID", "Policyholder", "Fund Value", "Stage", "Status", "IFA", "Days Open", ""].map(h => (
              <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "#4a6fa5", fontWeight: 600 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cases.map((c, i) => (
            <tr key={c.id} onClick={() => onSelect(c.id)} style={{ borderBottom: "1px solid #0d1117", cursor: "pointer", background: i % 2 === 0 ? "transparent" : "#0b0f16" }}
              onMouseEnter={e => e.currentTarget.style.background = "#161b22"}
              onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "transparent" : "#0b0f16"}
            >
              <td style={{ padding: "12px 16px", fontSize: 12, color: "#58a6ff", fontFamily: "monospace" }}>{c.id}</td>
              <td style={{ padding: "12px 16px", fontSize: 13, color: "#e6edf3" }}>{c.name}<div style={{ fontSize: 11, color: "#6e7681" }}>Age {c.age}</div></td>
              <td style={{ padding: "12px 16px", fontSize: 13, color: "#d4a017", fontVariantNumeric: "tabular-nums" }}>{c.fund}</td>
              <td style={{ padding: "12px 16px" }}>
                <StageBadge stage={c.stage} label={c.stageLabel} />
              </td>
              <td style={{ padding: "12px 16px", fontSize: 12, color: "#8b949e", maxWidth: 200 }}>{c.status}</td>
              <td style={{ padding: "12px 16px", fontSize: 12, color: "#6e7681" }}>{c.ifa}</td>
              <td style={{ padding: "12px 16px", fontSize: 13, color: c.urgent ? "#f85149" : "#8b949e", fontVariantNumeric: "tabular-nums" }}>{c.days}d {c.urgent && "⚠"}</td>
              <td style={{ padding: "12px 16px", fontSize: 12, color: "#4a6fa5" }}>→</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StageBadge({ stage, label }) {
  const colors = ["", "#1f6feb", "#388bfd", "#b45309", "#b45309", "#0f766e", "#1d4ed8", "#166534", "#374151"];
  const bg = colors[stage] || "#161b22";
  return (
    <span style={{ background: bg + "33", border: `1px solid ${bg}66`, color: bg === "#1f6feb" ? "#58a6ff" : "#e6edf3", borderRadius: 4, padding: "2px 8px", fontSize: 11, whiteSpace: "nowrap" }}>
      {stage}. {label}
    </span>
  );
}

function CaseDetail({ c }) {
  const wd = WORKFLOW_DETAIL[c.stage];
  return (
    <div>
      {/* Header cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24 }}>
        {[
          { l: "Fund Value", v: c.fund },
          { l: "Annuity Type", v: c.annuityType },
          { l: "IFA / Broker", v: c.ifa },
          { l: "Days Open", v: `${c.days} days` },
        ].map(item => (
          <div key={item.l} style={{ background: "#0a0e15", border: "1px solid #161b22", borderRadius: 8, padding: "14px 16px" }}>
            <div style={{ fontSize: 10, letterSpacing: "0.15em", color: "#4a6fa5", textTransform: "uppercase", marginBottom: 4 }}>{item.l}</div>
            <div style={{ fontSize: 15, color: "#e6edf3", fontWeight: 600 }}>{item.v}</div>
          </div>
        ))}
      </div>

      {/* Stage pipeline */}
      <div style={{ background: "#0a0e15", border: "1px solid #161b22", borderRadius: 10, padding: "18px 20px", marginBottom: 20 }}>
        <div style={{ fontSize: 11, letterSpacing: "0.15em", color: "#4a6fa5", textTransform: "uppercase", marginBottom: 14 }}>Policy Lifecycle</div>
        <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
          {STAGES.map((s, i) => {
            const done = s.n < c.stage;
            const active = s.n === c.stage;
            const color = done ? "#3fb950" : active ? "#d4a017" : "#21262d";
            const textColor = done ? "#3fb950" : active ? "#d4a017" : "#484f58";
            return (
              <div key={s.n} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 60 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: active ? "#d4a01722" : done ? "#3fb95022" : "#161b22", border: `2px solid ${color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: textColor }}>
                    {done ? "✓" : s.n}
                  </div>
                  <div style={{ fontSize: 9, color: textColor, marginTop: 4, textAlign: "center", letterSpacing: "0.05em" }}>{s.label}</div>
                </div>
                {i < STAGES.length - 1 && <div style={{ flex: 1, height: 2, background: done ? "#3fb950" : "#21262d", margin: "0 2px", marginBottom: 16 }} />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Stage detail */}
      {wd ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={{ background: "#0a0e15", border: "1px solid #161b22", borderRadius: 10, padding: "18px 20px" }}>
            <div style={{ fontSize: 11, letterSpacing: "0.15em", color: "#4a6fa5", textTransform: "uppercase", marginBottom: 14 }}>Stage States</div>
            {wd.states.map((s, i) => (
              <div key={s} style={{ display: "flex", gap: 10, alignItems: "center", padding: "7px 0", borderBottom: "1px solid #161b22" }}>
                <div style={{ width: 18, height: 18, borderRadius: "50%", background: i < wd.current ? "#3fb95022" : i === wd.current ? "#d4a01722" : "#161b22", border: `1.5px solid ${i < wd.current ? "#3fb950" : i === wd.current ? "#d4a017" : "#30363d"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: i < wd.current ? "#3fb950" : i === wd.current ? "#d4a017" : "#484f58", flexShrink: 0 }}>
                  {i < wd.current ? "✓" : i + 1}
                </div>
                <span style={{ fontSize: 12, color: i === wd.current ? "#e6edf3" : i < wd.current ? "#6e7681" : "#484f58" }}>{s}</span>
                {i === wd.current && <span style={{ fontSize: 9, background: "#d4a01722", border: "1px solid #d4a01766", color: "#d4a017", borderRadius: 3, padding: "1px 5px", marginLeft: "auto" }}>CURRENT</span>}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ background: "#0a0e15", border: "1px solid #161b22", borderRadius: 10, padding: "16px 18px" }}>
              <div style={{ fontSize: 11, letterSpacing: "0.15em", color: "#4a6fa5", textTransform: "uppercase", marginBottom: 10 }}>Case Data</div>
              {wd.data.map(d => (
                <div key={d.k} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid #161b22", gap: 12 }}>
                  <span style={{ fontSize: 11, color: "#6e7681" }}>{d.k}</span>
                  <span style={{ fontSize: 12, color: "#e6edf3", textAlign: "right" }}>{d.v}</span>
                </div>
              ))}
            </div>
            <div style={{ background: "#0a0e15", border: "1px solid #1f3a1f", borderRadius: 10, padding: "16px 18px" }}>
              <div style={{ fontSize: 11, letterSpacing: "0.15em", color: "#3fb950", textTransform: "uppercase", marginBottom: 10 }}>Integrations</div>
              {wd.integrations.map(i => <div key={i} style={{ fontSize: 12, color: "#8b949e", padding: "4px 0", borderBottom: "1px solid #161b22" }}>⬡ {i}</div>)}
            </div>
            <div style={{ background: "#0a0e15", border: "1px solid #3a1f1f", borderRadius: 10, padding: "16px 18px" }}>
              <div style={{ fontSize: 11, letterSpacing: "0.15em", color: "#f85149", textTransform: "uppercase", marginBottom: 10 }}>Rules & Flags</div>
              {wd.rules.map(r => <div key={r} style={{ fontSize: 11, color: "#8b949e", padding: "4px 0", borderBottom: "1px solid #161b22", paddingLeft: 8, borderLeft: "2px solid #f8514933" }}>{r}</div>)}
            </div>
          </div>
        </div>
      ) : (
        <div style={{ color: "#6e7681", fontSize: 13 }}>Detailed stage data not yet configured for this stage.</div>
      )}
    </div>
  );
}

function WorkflowRef({ workflowStage, setWorkflowStage }) {
  const stages = [
    { id: 1, label: "Enquiry & Quote", color: "#1f6feb", states: ["New Enquiry","Quote Requested","Quote Generated","Sent to IFA"], data: ["DOB, gender, smoker status","Fund value & pension type","Annuity type","IFA FCA number & Unipass ID","Postcode"], integrations: ["Unipass / Origo (IFA auth)","Internal pricing engine"], rules: ["Enhanced triage: age, BMI, conditions","Joint life — collect partner details","Guarantee period max 10 yrs"] },
    { id: 2, label: "Underwriting", color: "#b45309", states: ["Awaiting Medical Info","GP Report Requested","Evidence Received","UW Decision","Referred to Chief UW"], data: ["ICD-10 coded conditions","Lifestyle factors","Medication list","GP name & practice","iGPR / Morgan Ash ref"], integrations: ["iGPR API","Morgan Ash MARS","UW rules engine"], rules: ["Auto-accept: standard risk only","Refer: 2+ conditions, high BMI, age <60","Art.9 GDPR separate data store"] },
    { id: 3, label: "Repricing", color: "#d4a017", states: ["Reprice Triggered","Reprice Calculated","IFA Notified","IFA Accepted","Lapsed"], data: ["Reprice reason code","New annuity rate","Rate change %","Validity window","IFA acknowledgement timestamp"], integrations: ["Internal pricing engine","IFA portal notification","Mailock secure messaging"], rules: ["Triggers: fund change >£500, rate >0.1%","IFA must re-accept within validity window","Auto-lapse if no response","Audit log every event — FCA"] },
    { id: 4, label: "Reinsurer Submission", color: "#0f766e", states: ["Submission Prepared","Sent to Reinsurer","Awaiting Decision","Accepted","Counter-offer"], data: ["Case summary pack","Medical evidence bundle","Proposed annuity rate","Sum reinsured","Treaty reference"], integrations: ["Reinsurer portal / SFTP / API","Secure document transfer"], rules: ["Facultative: fund >threshold or impaired life","Treaty auto-accept: standard lives","Counter-offer: present to UW","30-day decision SLA"] },
    { id: 5, label: "Fund Transfer", color: "#1d4ed8", states: ["Transfer Requested","Awaiting Funds","Partial Receipt","Full Receipt","Reconciled"], data: ["Ceding scheme name","Expected transfer value","Received amount","Origo tracking ref","Reconciliation status"], integrations: ["Origo Options","Ceding provider API","Bank reconciliation feed"], rules: ["Tolerance ±£50 auto-reconcile","Partial transfer: hold policy issue","30-day lapse warning"] },
    { id: 6, label: "Policy Issue", color: "#166534", states: ["Pre-issue Checks","Documents Generated","Sent to Policyholder","Sent to IFA","Policy Live"], data: ["Policy number","Commencement date","First payment amount","Cooling-off end date","IFA commission"], integrations: ["Document generation","DocuSign / e-sign","IFA back-office","Payment engine"], rules: ["FCA: schedule, IPID, welcome letter required","30-day cooling off mandatory","Consumer Duty confirmation","Commission disclosed on schedule"] },
    { id: 7, label: "In-Force Management", color: "#374151", states: ["Live","Payment Query","Death Claim","Cancelled in Cooling Off","Ceased"], data: ["Payment run status","Beneficiary details","Death notification","Cessation reason","Annual statement data"], integrations: ["BACS payment engine","DWP Tell Us Once (future)","Annual statement generation"], rules: ["Joint life: commence survivor pension on death","Guarantee: pay to estate if within period","Annual statement FCA required"] },
  ];

  const active = stages.find(s => s.id === workflowStage);

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10, marginBottom: 22 }}>
        {stages.map(s => (
          <div key={s.id} onClick={() => setWorkflowStage(workflowStage === s.id ? null : s.id)}
            style={{ background: workflowStage === s.id ? "#161b22" : "#0a0e15", border: `1px solid ${workflowStage === s.id ? s.color : "#161b22"}`, borderRadius: 8, padding: "14px 16px", cursor: "pointer", transition: "all 0.15s", boxShadow: workflowStage === s.id ? `0 0 16px ${s.color}33` : "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.color }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: s.color, letterSpacing: "0.05em" }}>0{s.id}. {s.label}</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
              {s.states.slice(0,3).map(st => <span key={st} style={{ fontSize: 9, background: "#0d1117", color: "#6e7681", padding: "1px 5px", borderRadius: 3, border: "1px solid #161b22" }}>{st}</span>)}
              {s.states.length > 3 && <span style={{ fontSize: 9, color: "#4a6fa5" }}>+{s.states.length - 3}</span>}
            </div>
          </div>
        ))}
      </div>
      {active && (
        <div style={{ background: "#0a0e15", border: `1px solid ${active.color}44`, borderRadius: 10, padding: 22 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#e6edf3", marginBottom: 18, display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: active.color }} />
            {active.label}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18 }}>
            {[
              { title: "States", color: active.color, items: active.states },
              { title: "Data Required", color: "#d4a017", items: active.data },
              { title: "Integrations", color: "#3fb950", items: active.integrations },
              { title: "Business Rules", color: "#f85149", items: active.rules },
            ].map(section => (
              <div key={section.title}>
                <div style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: section.color, marginBottom: 8, fontWeight: 700 }}>{section.title}</div>
                {section.items.map(item => (
                  <div key={item} style={{ fontSize: 12, color: "#8b949e", padding: "5px 0", borderBottom: "1px solid #161b22", paddingLeft: section.title === "Business Rules" ? 8 : 0, borderLeft: section.title === "Business Rules" ? `2px solid ${section.color}44` : "none" }}>{item}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Integrations() {
  const items = [
    { name: "iGPR", category: "Medical", status: "Pending Contract", effort: "2–4 weeks", desc: "GP report requests and structured medical evidence retrieval", color: "#b45309" },
    { name: "Morgan Ash MARS", category: "Medical / Vulnerability", status: "Pending Contract", effort: "3–5 weeks", desc: "Vulnerability assessments and complex medical data flows", color: "#b45309" },
    { name: "Unipass / Origo", category: "IFA Identity", status: "Accreditation Required", effort: "4–6 weeks", desc: "IFA authentication, authorisation, and transfer tracking", color: "#1f6feb" },
    { name: "Origo Options", category: "Fund Transfer", status: "Accreditation Required", effort: "4–8 weeks", desc: "Pension transfer tracking across UK provider network", color: "#1f6feb" },
    { name: "Munich Re / RGA", category: "Reinsurer", status: "Commercial Negotiation", effort: "1–3 months", desc: "Facultative and treaty submission — format varies by reinsurer", color: "#0f766e" },
    { name: "DocuSign", category: "e-Signature", status: "Ready to Integrate", effort: "1–2 weeks", desc: "Policy document signing and IFA acceptance workflows", color: "#3fb950" },
    { name: "Mailock", category: "Secure Messaging", status: "Ready to Integrate", effort: "1–2 weeks", desc: "FCA-compliant secure email for IFA and policyholder comms", color: "#3fb950" },
    { name: "BACS / Faster Payments", category: "Payments", status: "Banking Partner Required", effort: "6–10 weeks", desc: "Annuity payment runs — requires sponsor bank or payment agent", color: "#d4a017" },
  ];
  const statusColor = { "Ready to Integrate": "#3fb950", "Pending Contract": "#d4a017", "Accreditation Required": "#388bfd", "Commercial Negotiation": "#f85149", "Banking Partner Required": "#b45309" };
  return (
    <div>
      <div style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#4a6fa5", marginBottom: 14 }}>Integration Registry</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 14 }}>
        {items.map(item => (
          <div key={item.name} style={{ background: "#0a0e15", border: "1px solid #161b22", borderRadius: 10, padding: "16px 18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#e6edf3" }}>{item.name}</div>
                <div style={{ fontSize: 10, color: "#4a6fa5", marginTop: 1 }}>{item.category}</div>
              </div>
              <div style={{ fontSize: 9, background: statusColor[item.status] + "22", border: `1px solid ${statusColor[item.status]}66`, color: statusColor[item.status], borderRadius: 4, padding: "2px 7px", whiteSpace: "nowrap" }}>{item.status}</div>
            </div>
            <div style={{ fontSize: 12, color: "#8b949e", marginBottom: 10, lineHeight: 1.5 }}>{item.desc}</div>
            <div style={{ fontSize: 11, color: "#6e7681" }}>Est. effort: <span style={{ color: "#c9d1d9" }}>{item.effort}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}
