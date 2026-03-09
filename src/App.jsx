import { useState } from "react";

const CASES = [
  // Stage 1 - Enquiry
  {
    id: "ANN-2026-0901", name: "James Whitfield", age: 61, fund: "£98,400", stage: 1, stageLabel: "Enquiry",
    status: "New Enquiry Received", ifa: "Rathbones", days: 1, urgent: false,
    annuityType: "Level — Single Life", dob: "14/03/1964", gender: "Male", smoker: "Non-smoker",
    postcode: "SK4 2NL", paymentFreq: "Monthly", guaranteePeriod: "5 years",
    niNumber: "JW421836C", address: "12 Maple Avenue, Stockport, SK4 2NL",
    contact: "07812 334 556 / j.whitfield@email.co.uk",
    notes: "Straightforward level single life — no medical flags at enquiry stage.",
  },
  {
    id: "ANN-2026-0898", name: "Helen Forsythe", age: 66, fund: "£176,250", stage: 1, stageLabel: "Enquiry",
    status: "Quote Requested", ifa: "Tilney", days: 2, urgent: false,
    annuityType: "Escalating 3% — Joint Life", dob: "22/07/1959", gender: "Female", smoker: "Non-smoker",
    postcode: "OX2 6QA", paymentFreq: "Monthly", guaranteePeriod: "10 years",
    niNumber: "HF882341B", address: "4 Blenheim Close, Oxford, OX2 6QA",
    contact: "07723 441 882 / helen.forsythe@outlook.com",
    notes: "Joint life — partner details required. Escalating product. Larger fund may require reinsurer review.",
  },

  // Stage 2 - Quote
  {
    id: "ANN-2026-0895", name: "Susan Fairweather", age: 63, fund: "£310,000", stage: 2, stageLabel: "Quote",
    status: "Quote Generated", ifa: "Quilter", days: 1, urgent: false,
    annuityType: "Level — Joint Life", dob: "05/11/1962", gender: "Female", smoker: "Non-smoker",
    postcode: "BS8 1TH", paymentFreq: "Monthly", guaranteePeriod: "None",
    niNumber: "SF334821A", address: "7 Clifton Park Road, Bristol, BS8 1TH",
    contact: "07934 112 774 / s.fairweather@gmail.com",
    quoteRate: "5.12% p.a.", quoteAnnualIncome: "£15,872", quoteExpiry: "14 Mar 2026",
    notes: "Large fund — facultative reinsurance will be required at policy issue stage.",
  },
  {
    id: "ANN-2026-0892", name: "Thomas Briggs", age: 69, fund: "£54,100", stage: 2, stageLabel: "Quote",
    status: "Quote Sent to IFA", ifa: "St. James's Place", days: 3, urgent: false,
    annuityType: "Level — Single Life", dob: "30/09/1956", gender: "Male", smoker: "Ex-smoker",
    postcode: "NG1 4AB", paymentFreq: "Quarterly", guaranteePeriod: "5 years",
    niNumber: "TB774412D", address: "22 Castle Gate, Nottingham, NG1 4AB",
    contact: "07541 223 990 / tbriggs@btinternet.com",
    quoteRate: "5.76% p.a.", quoteAnnualIncome: "£3,116", quoteExpiry: "16 Mar 2026",
    notes: "Ex-smoker flagged — potential enhanced rate. IFA to confirm whether to proceed to medical triage.",
  },

  // Stage 3 - Underwriting
  {
    id: "ANN-2026-0891", name: "Margaret Thornton", age: 67, fund: "£142,500", stage: 3, stageLabel: "Underwriting",
    status: "Medical Evidence Requested", ifa: "Hargreaves Lansdown", days: 4, urgent: true,
    annuityType: "Enhanced — Joint Life", dob: "18/04/1958", gender: "Female", smoker: "Non-smoker",
    postcode: "LS6 2EP", paymentFreq: "Monthly", guaranteePeriod: "5 years",
    niNumber: "MT221934B", address: "8 Headingley Lane, Leeds, LS6 2EP",
    contact: "07812 556 334 / m.thornton@yahoo.co.uk",
    conditions: "Type 2 Diabetes, Hypertension", medications: "Metformin 500mg, Amlodipine 5mg",
    gp: "Thornton Medical Centre, Leeds", igprRef: "Awaiting", morganAshRef: "N/A",
    uwDecision: "Pending", ratingFactor: "TBC",
    notes: "Two qualifying conditions — automatic refer to medical underwriting. iGPR request raised 05/03/2026.",
  },
  {
    id: "ANN-2026-0885", name: "Colin Draper", age: 71, fund: "£88,750", stage: 3, stageLabel: "Underwriting",
    status: "GP Report Received — Under Review", ifa: "Brewin Dolphin", days: 9, urgent: true,
    annuityType: "Enhanced — Single Life", dob: "02/12/1954", gender: "Male", smoker: "Ex-smoker",
    postcode: "M20 3LB", paymentFreq: "Monthly", guaranteePeriod: "None",
    niNumber: "CD881243A", address: "31 Palatine Road, Manchester, M20 3LB",
    contact: "07634 882 113 / c.draper@hotmail.com",
    conditions: "COPD, Type 2 Diabetes, Obesity (BMI 34)", medications: "Salbutamol inhaler, Metformin 1g, Atorvastatin 20mg",
    gp: "Palatine Road Surgery, Manchester", igprRef: "IGPR-2026-44821", morganAshRef: "N/A",
    uwDecision: "Under Review — Chief UW Referral Likely", ratingFactor: "TBC",
    notes: "3 conditions present. GP report received 07/03. Chief UW referral being prepared. SLA at risk.",
  },
  {
    id: "ANN-2026-0881", name: "Dorothy Ashworth", age: 74, fund: "£201,000", stage: 3, stageLabel: "Underwriting",
    status: "Referred to Chief Underwriter", ifa: "Rathbones", days: 14, urgent: true,
    annuityType: "Enhanced — Single Life", dob: "11/06/1951", gender: "Female", smoker: "Non-smoker",
    postcode: "W1G 8QN", paymentFreq: "Monthly", guaranteePeriod: "None",
    niNumber: "DA334512C", address: "14 Harley Street, London, W1G 8QN",
    contact: "07201 445 771 / d.ashworth@gmail.com",
    conditions: "Previous stroke (2022), Atrial Fibrillation, Hypertension", medications: "Warfarin, Bisoprolol 5mg, Ramipril 10mg",
    gp: "Marylebone Health Centre, London", igprRef: "IGPR-2026-44103", morganAshRef: "MARS-2026-0882",
    uwDecision: "Referred to Chief UW — Awaiting Decision", ratingFactor: "Enhanced +40% likely",
    notes: "Complex medical history. Morgan Ash vulnerability assessment also triggered. Art.9 GDPR data handling active.",
  },

  // Stage 4 - Repricing
  {
    id: "ANN-2026-0887", name: "Robert Hesketh", age: 72, fund: "£89,200", stage: 4, stageLabel: "Repricing",
    status: "IFA Acceptance Pending", ifa: "St. James's Place", days: 2, urgent: true,
    annuityType: "Level — Single Life", dob: "14/08/1953", gender: "Male", smoker: "Non-smoker",
    postcode: "CH1 2LR", paymentFreq: "Monthly", guaranteePeriod: "5 years",
    niNumber: "RH441823D", address: "5 Eastgate Row, Chester, CH1 2LR",
    contact: "07712 334 009 / r.hesketh@btinternet.com",
    repriceReason: "Medical evidence — enhanced rate applied", newRate: "5.84% p.a.", previousRate: "5.66% p.a.",
    rateChange: "+0.18%", validityExpiry: "13 Mar 2026", newAnnualIncome: "£5,210",
    notes: "Validity window closes in 2 days. IFA notified via Mailock 09/03/2026. Auto-lapse if no response.",
  },
  {
    id: "ANN-2026-0879", name: "Anne-Marie Gallagher", age: 65, fund: "£134,800", stage: 4, stageLabel: "Repricing",
    status: "Reprice Triggered — Fund Value Change", ifa: "Quilter", days: 5, urgent: false,
    annuityType: "Escalating 3% — Joint Life", dob: "27/02/1961", gender: "Female", smoker: "Non-smoker",
    postcode: "L1 8JQ", paymentFreq: "Monthly", guaranteePeriod: "10 years",
    niNumber: "AG112344B", address: "88 Bold Street, Liverpool, L1 8JQ",
    contact: "07823 556 221 / amgallagher@gmail.com",
    repriceReason: "Fund value changed — £134,800 vs original £131,200 (CETV uplift)", newRate: "4.92% p.a.", previousRate: "4.88% p.a.",
    rateChange: "+0.04%", validityExpiry: "17 Mar 2026", newAnnualIncome: "£6,626",
    notes: "CETV increased on recalculation from ceding scheme. Reprice calculated. IFA notification being prepared.",
  },

  // Stage 5 - Reinsurer
  {
    id: "ANN-2026-0882", name: "Patricia Walmsley", age: 65, fund: "£214,000", stage: 5, stageLabel: "Reinsurer",
    status: "Awaiting Decision — Munich Re", ifa: "Quilter", days: 12, urgent: false,
    annuityType: "Enhanced — Single Life", dob: "09/01/1961", gender: "Female", smoker: "Non-smoker",
    postcode: "YO1 9RY", paymentFreq: "Monthly", guaranteePeriod: "5 years",
    niNumber: "PW334112A", address: "3 The Shambles, York, YO1 9RY",
    contact: "07934 221 445 / p.walmsley@outlook.com",
    reinsurer: "Munich Re", treatyRef: "MR-2026-4421", sumReinsured: "£214,000",
    submissionDate: "25 Feb 2026", decisionSLA: "18 days remaining", counterOffer: "None yet",
    notes: "Facultative submission — fund above £200k threshold. All medical evidence included. Awaiting underwriting decision from Munich Re.",
  },
  {
    id: "ANN-2026-0875", name: "Frederick Nolan", age: 70, fund: "£289,500", stage: 5, stageLabel: "Reinsurer",
    status: "Counter-offer Received", ifa: "Hargreaves Lansdown", days: 22, urgent: true,
    annuityType: "Enhanced — Joint Life", dob: "04/05/1955", gender: "Male", smoker: "Ex-smoker",
    postcode: "EH2 4RJ", paymentFreq: "Monthly", guaranteePeriod: "None",
    niNumber: "FN221834C", address: "21 George Street, Edinburgh, EH2 4RJ",
    contact: "07612 334 887 / f.nolan@gmail.com",
    reinsurer: "RGA UK", treatyRef: "RGA-2026-1182", sumReinsured: "£289,500",
    submissionDate: "15 Feb 2026", decisionSLA: "Expired — counter-offer stage",
    counterOffer: "RGA accepting at +15% loading on proposed rate. Chief UW review required.",
    notes: "Counter-offer requires Chief UW acceptance before proceeding. IFA must be notified of potential rate impact.",
  },

  // Stage 6 - Fund Transfer
  {
    id: "ANN-2026-0876", name: "David Cartwright", age: 70, fund: "£67,400", stage: 6, stageLabel: "Fund Transfer",
    status: "Partial Receipt — £62,800 received", ifa: "Brewin Dolphin", days: 8, urgent: false,
    annuityType: "Escalating 3% — Joint Life", dob: "19/10/1955", gender: "Male", smoker: "Non-smoker",
    postcode: "B1 2JB", paymentFreq: "Monthly", guaranteePeriod: "5 years",
    niNumber: "DC441823B", address: "7 Colmore Row, Birmingham, B1 2JB",
    contact: "07534 221 009 / d.cartwright@hotmail.com",
    cedingProvider: "Legal & General Workplace Pension", expectedTransfer: "£67,400",
    receivedAmount: "£62,800", receiptDate: "01 Mar 2026", origoRef: "ORG-2026-88421",
    reconciled: "No — shortfall £4,600", notes: "Partial transfer received. Ceding provider advising second tranche expected by 14/03. Policy issue on hold.",
  },
  {
    id: "ANN-2026-0871", name: "Irene Blackwood", age: 68, fund: "£115,900", stage: 6, stageLabel: "Fund Transfer",
    status: "Awaiting Funds — Day 18", ifa: "Tilney", days: 18, urgent: true,
    annuityType: "Level — Single Life", dob: "30/06/1957", gender: "Female", smoker: "Non-smoker",
    postcode: "CF10 1EP", paymentFreq: "Monthly", guaranteePeriod: "10 years",
    niNumber: "IB882341D", address: "14 Park Place, Cardiff, CF10 1EP",
    contact: "07923 441 556 / i.blackwood@yahoo.co.uk",
    cedingProvider: "Aviva Pension (Occupational)", expectedTransfer: "£115,900",
    receivedAmount: "£0", receiptDate: "Awaited", origoRef: "ORG-2026-87334",
    reconciled: "No — nothing received", notes: "30-day lapse warning in 12 days. IFA chasing ceding provider. Origo tracking shows transfer initiated.",
  },

  // Stage 7 - Policy Issue
  {
    id: "ANN-2026-0869", name: "Gerald Morrison", age: 74, fund: "£128,750", stage: 7, stageLabel: "Policy Issue",
    status: "Documents Generated — Awaiting Signature", ifa: "Rathbones", days: 3, urgent: false,
    annuityType: "Enhanced — Single Life", dob: "22/02/1952", gender: "Male", smoker: "Ex-smoker",
    postcode: "SO14 1AR", paymentFreq: "Monthly", guaranteePeriod: "None",
    niNumber: "GM334112A", address: "3 Oxford Street, Southampton, SO14 1AR",
    contact: "07812 334 991 / g.morrison@btinternet.com",
    policyNumber: "POL-2026-00412", commencementDate: "01 Apr 2026", firstPaymentDate: "30 Apr 2026",
    annualIncome: "£8,142", coolingOffExpiry: "01 May 2026", ifaCommission: "£1,931.25",
    docuSignRef: "DS-2026-88821", notes: "Policy schedule, IPID and welcome letter generated. Sent to policyholder via DocuSign. IFA copy sent to Rathbones back-office.",
  },
  {
    id: "ANN-2026-0864", name: "Vera Hutchinson", age: 66, fund: "£93,200", stage: 7, stageLabel: "Policy Issue",
    status: "Policy Live — Cooling Off Active", ifa: "St. James's Place", days: 6, urgent: false,
    annuityType: "Level — Joint Life", dob: "08/09/1959", gender: "Female", smoker: "Non-smoker",
    postcode: "NE1 7RU", paymentFreq: "Monthly", guaranteePeriod: "5 years",
    niNumber: "VH221934C", address: "9 Grey Street, Newcastle, NE1 7RU",
    contact: "07723 556 334 / v.hutchinson@gmail.com",
    policyNumber: "POL-2026-00398", commencementDate: "01 Mar 2026", firstPaymentDate: "31 Mar 2026",
    annualIncome: "£5,124", coolingOffExpiry: "31 Mar 2026", ifaCommission: "£1,398.00",
    docuSignRef: "DS-2026-87441", notes: "Policy live. First payment scheduled. Cooling off period expires 31 Mar — cancellation workflow available if required.",
  },

  // Stage 8 - In-Force
  {
    id: "ANN-2025-0741", name: "Arthur Pemberton", age: 77, fund: "£104,300", stage: 8, stageLabel: "In-Force",
    status: "Live — Payments Running", ifa: "Hargreaves Lansdown", days: 284, urgent: false,
    annuityType: "Level — Single Life", dob: "14/01/1949", gender: "Male", smoker: "Non-smoker",
    postcode: "GL50 1BN", paymentFreq: "Monthly", guaranteePeriod: "10 years",
    niNumber: "AP441823B", address: "2 Montpellier Walk, Cheltenham, GL50 1BN",
    contact: "07512 334 009 / a.pemberton@btinternet.com",
    policyNumber: "POL-2025-00284", commencementDate: "01 Jun 2025", annualIncome: "£6,258",
    lastPaymentDate: "28 Feb 2026", lastPaymentAmount: "£521.50", nextPaymentDate: "31 Mar 2026",
    notes: "Payments running normally. Annual statement due June 2026.",
  },
  {
    id: "ANN-2025-0698", name: "Constance Weatherby", age: 73, fund: "£187,500", stage: 8, stageLabel: "In-Force",
    status: "Death Claim — Survivor Pension Active", ifa: "Quilter", days: 412, urgent: true,
    annuityType: "Enhanced — Joint Life", dob: "03/04/1952", gender: "Female", smoker: "Non-smoker",
    postcode: "TN1 1HR", paymentFreq: "Monthly", guaranteePeriod: "None",
    niNumber: "CW882341A", address: "15 Mount Ephraim, Tunbridge Wells, TN1 1HR",
    contact: "07923 441 112 / estate@weatherby.co.uk",
    policyNumber: "POL-2025-00201", commencementDate: "01 Jan 2025", annualIncome: "£9,882",
    lastPaymentDate: "28 Feb 2026", lastPaymentAmount: "£823.50", nextPaymentDate: "31 Mar 2026",
    notes: "Primary life deceased 01/03/2026. Death verified. Survivor pension (50%) now active at £411.75/month. DWP Tell Us Once notification received.",
  },
  {
    id: "ANN-2025-0712", name: "Norman Blackhurst", age: 80, fund: "£72,400", stage: 8, stageLabel: "In-Force",
    status: "Payment Query — Returned Payment", ifa: "Brewin Dolphin", days: 341, urgent: true,
    annuityType: "Level — Single Life", dob: "17/07/1945", gender: "Male", smoker: "Non-smoker",
    postcode: "PR1 2LL", paymentFreq: "Monthly", guaranteePeriod: "5 years",
    niNumber: "NB334512D", address: "6 Fishergate, Preston, PR1 2LL",
    contact: "07634 221 009 / n.blackhurst@hotmail.com",
    policyNumber: "POL-2025-00241", commencementDate: "01 Apr 2025", annualIncome: "£4,320",
    lastPaymentDate: "28 Feb 2026", lastPaymentAmount: "Returned — bank details changed", nextPaymentDate: "31 Mar 2026",
    notes: "February payment returned by bank. Policyholder has changed bank account. New details required urgently to prevent payment arrears.",
  },
];

const STAGES = [
  { n: 1, label: "Enquiry" }, { n: 2, label: "Quote" }, { n: 3, label: "Underwriting" },
  { n: 4, label: "Repricing" }, { n: 5, label: "Reinsurer" }, { n: 6, label: "Fund Transfer" },
  { n: 7, label: "Policy Issue" }, { n: 8, label: "In-Force" },
];

const STAGE_COLORS = ["", "#388bfd", "#388bfd", "#b45309", "#d4a017", "#0f766e", "#1d4ed8", "#166534", "#374151"];

const WORKFLOW_DETAIL = {
  1: {
    color: "#388bfd",
    states: ["New Enquiry Received", "Quote Requested", "Quote Generated", "Quote Sent to IFA"],
    integrations: ["Unipass / Origo — IFA identity verification", "Internal pricing engine — standard rate"],
    rules: ["Enhanced annuity triage: age, BMI, conditions flagged", "Joint life — partner details required", "Guarantee period max 10 years", "Quote valid for 5 business days"],
  },
  2: {
    color: "#388bfd",
    states: ["Quote Generated", "Quote Sent to IFA", "IFA Reviewing", "IFA Accepted — Proceed"],
    integrations: ["Internal pricing engine", "Mailock — secure quote delivery to IFA"],
    rules: ["Quote expiry: 5 business days", "Rate locked at quote acceptance", "IFA must confirm suitability assessment complete"],
  },
  3: {
    color: "#b45309",
    states: ["Awaiting Medical Info", "GP Report Requested", "Medical Evidence Received", "Underwriting Decision", "Referred to Chief UW"],
    integrations: ["iGPR API — GP report requests", "Morgan Ash MARS — vulnerability & complex medical", "Internal UW rules engine"],
    rules: ["Auto-accept threshold: standard risk only", "Refer triggers: 2+ conditions, BMI >35, age <60", "Chief UW escalation: stroke, cancer, terminal", "Art.9 GDPR — medical data in isolated store", "SLA: 10 working days"],
  },
  4: {
    color: "#d4a017",
    states: ["Reprice Triggered", "Reprice Calculated", "IFA Notified", "IFA Accepted", "IFA Declined / Lapsed"],
    integrations: ["Internal pricing engine", "Mailock — secure IFA notification", "IFA portal — acceptance workflow"],
    rules: ["Triggers: fund change >£500, rate movement >0.1%, medical evidence changes rating", "Validity window: 5 business days", "IFA must re-accept within window", "Auto-lapse if no IFA response", "FCA: every reprice event audit logged"],
  },
  5: {
    color: "#0f766e",
    states: ["Submission Prepared", "Sent to Reinsurer", "Awaiting Decision", "Accepted", "Counter-offer Received", "Declined"],
    integrations: ["Munich Re / RGA portal or SFTP", "Secure document transfer — medical bundle", "Internal case management"],
    rules: ["Facultative referral: fund >£200k or impaired life", "Treaty automatic acceptance: standard lives within bands", "Counter-offer: present to Chief UW", "30-day decision SLA tracked", "Declined: case must be reviewed before lapsing"],
  },
  6: {
    color: "#1d4ed8",
    states: ["Transfer Requested", "Awaiting Funds", "Partial Receipt", "Full Receipt", "Reconciled"],
    integrations: ["Origo Options — transfer tracking", "Ceding provider API or manual SFTP", "Bank reconciliation feed"],
    rules: ["Tolerance band ±£50 auto-reconcile", "Partial transfer: hold policy issue until full receipt", "Overpayment: return immediately + audit log", "30-day lapse warning if funds not received", "Escalate to IFA if provider unresponsive after 14 days"],
  },
  7: {
    color: "#166534",
    states: ["Pre-issue Checks", "Documents Generated", "Sent to Policyholder", "Sent to IFA", "Policy Live"],
    integrations: ["Document generation engine", "DocuSign — e-signature", "IFA back-office (API or PDF)", "Payment engine — first payment setup"],
    rules: ["FCA required: policy schedule, IPID, welcome letter", "30-day cooling off — cancellation workflow mandatory", "Consumer Duty: confirm policyholder understanding", "IFA commission disclosed on schedule", "First payment must be scheduled before policy live"],
  },
  8: {
    color: "#374151",
    states: ["Live", "Payment Query", "Death Claim", "Survivor Pension Active", "Cancelled in Cooling Off", "Ceased"],
    integrations: ["BACS payment engine — monthly runs", "DWP Tell Us Once — death notifications", "Annual statement generation"],
    rules: ["Joint life: commence survivor pension immediately on death verification", "Guarantee: continue payments to estate if within period", "Annual statement: FCA requirement — due annually", "Payment queries: resolve within 5 working days", "Death claim: verify before ceasing primary payments"],
  },
};

const WORKFLOW_STAGES_REF = [
  { id: 1, label: "Enquiry & Quote", color: "#388bfd", states: ["New Enquiry","Quote Requested","Quote Generated","Sent to IFA"], data: ["DOB, gender, smoker status","Fund value & pension type","Annuity type (level/escalating/joint)","IFA FCA number & Unipass ID","Postcode (mortality banding)","Payment frequency preference"], integrations: ["Unipass / Origo (IFA auth)","Internal pricing engine"], rules: ["Enhanced triage: age, BMI, conditions","Joint life — collect partner details","Guarantee period max 10 yrs","Quote valid 5 business days"] },
  { id: 2, label: "Underwriting", color: "#b45309", states: ["Awaiting Medical Info","GP Report Requested","Evidence Received","UW Decision","Referred to Chief UW"], data: ["ICD-10 coded conditions","Lifestyle factors (alcohol, BMI, occupation)","Medication list","GP name & practice","iGPR / Morgan Ash reference","UW decision & rating factors"], integrations: ["iGPR API","Morgan Ash MARS","UW rules engine"], rules: ["Auto-accept: standard risk only","Refer: 2+ conditions, high BMI, age <60","Decline: terminal illness sub-2yr","Art.9 GDPR separate data store","SLA: 10 working days"] },
  { id: 3, label: "Repricing", color: "#d4a017", states: ["Reprice Triggered","Reprice Calculated","IFA Notified","IFA Accepted","Lapsed"], data: ["Reprice reason code","New annuity rate","Rate change %","Validity window (5 days)","IFA acknowledgement timestamp","Fund value at reprice date"], integrations: ["Internal pricing engine","IFA portal notification","Mailock secure messaging"], rules: ["Triggers: fund change >£500, rate >0.1%","IFA must re-accept within validity window","Auto-lapse if no response","Audit log every event — FCA requirement"] },
  { id: 4, label: "Reinsurer Submission", color: "#0f766e", states: ["Submission Prepared","Sent to Reinsurer","Awaiting Decision","Accepted","Counter-offer","Declined"], data: ["Case summary pack","Medical evidence bundle","Proposed annuity rate","Sum reinsured","Treaty reference","Reinsurer decision & terms"], integrations: ["Reinsurer portal / SFTP / API","Secure document transfer"], rules: ["Facultative: fund >£200k or impaired life","Treaty auto-accept: standard lives","Counter-offer: present to Chief UW","30-day decision SLA tracked"] },
  { id: 5, label: "Fund Transfer", color: "#1d4ed8", states: ["Transfer Requested","Awaiting Funds","Partial Receipt","Full Receipt","Reconciled"], data: ["Ceding scheme / provider name","Expected transfer value","Received amount","Transfer date","Origo tracking reference","Reconciliation status"], integrations: ["Origo Options (transfer tracking)","Ceding provider API","Bank reconciliation feed"], rules: ["Tolerance ±£50 auto-reconcile","Partial transfer: hold policy issue","Overpayment: return immediately","30-day lapse warning if funds not received"] },
  { id: 6, label: "Policy Issue", color: "#166534", states: ["Pre-issue Checks","Documents Generated","Sent to Policyholder","Sent to IFA","Policy Live"], data: ["Policy number","Commencement date","First payment date & amount","Policy schedule values","Cooling-off period end date","IFA commission amount"], integrations: ["Document generation engine","DocuSign / e-signature","IFA back-office","Payment engine"], rules: ["FCA: schedule, IPID, welcome letter required","30-day cooling off mandatory","IFA commission disclosed on schedule","Consumer Duty confirmation required"] },
  { id: 7, label: "In-Force Management", color: "#374151", states: ["Live","Payment Query","Death Claim","Survivor Pension Active","Cancelled in Cooling Off","Ceased"], data: ["Payment run status","Beneficiary details","Death notification","Cessation reason","Annual statement data","Survivor pension rate"], integrations: ["BACS payment engine","DWP Tell Us Once (death)","Annual statement generation"], rules: ["Joint life: commence survivor pension on death","Guarantee: pay to estate if within period","Annual statement FCA required","Payment queries: 5 working day SLA"] },
];

const INTEGRATIONS = [
  { name: "iGPR", category: "Medical", status: "Pending Contract", effort: "2–4 weeks", desc: "GP report requests and structured medical evidence retrieval via secure API", color: "#b45309" },
  { name: "Morgan Ash MARS", category: "Medical / Vulnerability", status: "Pending Contract", effort: "3–5 weeks", desc: "Vulnerability assessments and complex medical data flows for enhanced cases", color: "#b45309" },
  { name: "Unipass / Origo", category: "IFA Identity", status: "Accreditation Required", effort: "4–6 weeks", desc: "IFA authentication, authorisation, and FCA number verification", color: "#388bfd" },
  { name: "Origo Options", category: "Fund Transfer", status: "Accreditation Required", effort: "4–8 weeks", desc: "Pension transfer tracking across the UK provider network", color: "#388bfd" },
  { name: "Munich Re", category: "Reinsurer", status: "Commercial Negotiation", effort: "1–3 months", desc: "Facultative and treaty submission for large and impaired life cases", color: "#0f766e" },
  { name: "RGA UK", category: "Reinsurer", status: "Commercial Negotiation", effort: "1–3 months", desc: "Secondary reinsurance partner — counter-offer and specialist impaired cases", color: "#0f766e" },
  { name: "DocuSign", category: "e-Signature", status: "Ready to Integrate", effort: "1–2 weeks", desc: "Policy document signing and IFA acceptance workflows", color: "#166534" },
  { name: "Mailock", category: "Secure Messaging", status: "Ready to Integrate", effort: "1–2 weeks", desc: "FCA-compliant secure email for IFA and policyholder communications", color: "#166534" },
  { name: "BACS / Faster Payments", category: "Payments", status: "Banking Partner Required", effort: "6–10 weeks", desc: "Monthly annuity payment runs — requires sponsor bank or payment agent", color: "#d4a017" },
  { name: "DWP Tell Us Once", category: "Death Notification", status: "Future Phase", effort: "3–6 months", desc: "Automated death notifications from DWP to trigger in-force claim workflows", color: "#374151" },
];

const STATUS_COLOR = {
  "Ready to Integrate": "#3fb950", "Pending Contract": "#d4a017",
  "Accreditation Required": "#388bfd", "Commercial Negotiation": "#f85149",
  "Banking Partner Required": "#b45309", "Future Phase": "#374151",
};

const NAV = ["Dashboard", "Cases", "Workflow Reference", "Integrations", "Reports"];

export default function AnnuityPortal() {
  const [nav, setNav] = useState("Dashboard");
  const [selectedCase, setSelectedCase] = useState(null);
  const [workflowStage, setWorkflowStage] = useState(null);
  const [stageFilter, setStageFilter] = useState(null);

  const sc = selectedCase ? CASES.find(c => c.id === selectedCase) : null;
  const filteredCases = stageFilter ? CASES.filter(c => c.stage === stageFilter) : CASES;
  const urgentCount = CASES.filter(c => c.urgent).length;
  const awaitingMedical = CASES.filter(c => c.stage === 3).length;
  const pendingIFA = CASES.filter(c => c.stage === 4).length;
  const issuedMTD = CASES.filter(c => c.stage === 7 || c.stage === 8).length;

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
            <div key={n} onClick={() => { setNav(n); setSelectedCase(null); setStageFilter(null); }} style={{
              padding: "10px 20px", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 10,
              color: nav === n ? "#e6edf3" : "#6e7681",
              background: nav === n ? "#161b22" : "transparent",
              borderLeft: nav === n ? "2px solid #d4a017" : "2px solid transparent",
            }}>
              <span style={{ fontSize: 15 }}>{["⬡", "⬜", "◈", "⬢", "◉"][NAV.indexOf(n)]}</span>
              {n}
              {n === "Cases" && urgentCount > 0 && (
                <span style={{ marginLeft: "auto", background: "#f8514922", border: "1px solid #f85149", color: "#f85149", borderRadius: 10, padding: "1px 6px", fontSize: 10 }}>{urgentCount}</span>
              )}
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
            <div style={{ background: "#161b22", border: "1px solid #30363d", borderRadius: 6, padding: "6px 14px", fontSize: 12, color: "#8b949e" }}>Mon 9 Mar 2026</div>
            {selectedCase && (
              <button onClick={() => setSelectedCase(null)} style={{ background: "transparent", border: "1px solid #30363d", color: "#8b949e", borderRadius: 6, padding: "6px 14px", fontSize: 12, cursor: "pointer" }}>
                ← Back to Cases
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
                {[
                  { label: "Active Cases", value: CASES.length, delta: `${urgentCount} requiring urgent action`, up: false },
                  { label: "Awaiting Medical", value: awaitingMedical, delta: "1 past SLA — escalate", up: false },
                  { label: "Pending IFA Action", value: pendingIFA, delta: "1 expiring today", up: false },
                  { label: "Issued / In-Force", value: issuedMTD, delta: "3 live, 1 death claim active", up: true },
                ].map(s => (
                  <div key={s.label} style={{ background: "#0a0e15", border: "1px solid #161b22", borderRadius: 10, padding: "18px 20px" }}>
                    <div style={{ fontSize: 11, color: "#6e7681", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>{s.label}</div>
                    <div style={{ fontSize: 32, fontWeight: 700, color: "#e6edf3" }}>{s.value}</div>
                    <div style={{ fontSize: 11, marginTop: 4, color: s.up ? "#3fb950" : "#f85149" }}>{s.delta}</div>
                  </div>
                ))}
              </div>

              {/* Pipeline by stage */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#4a6fa5", marginBottom: 12 }}>Pipeline by Stage</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 8 }}>
                  {STAGES.map(s => {
                    const count = CASES.filter(c => c.stage === s.n).length;
                    return (
                      <div key={s.n} onClick={() => { setNav("Cases"); setStageFilter(s.n); }} style={{ background: "#0a0e15", border: `1px solid ${STAGE_COLORS[s.n]}33`, borderRadius: 8, padding: "12px 10px", textAlign: "center", cursor: "pointer" }}
                        onMouseEnter={e => e.currentTarget.style.border = `1px solid ${STAGE_COLORS[s.n]}`}
                        onMouseLeave={e => e.currentTarget.style.border = `1px solid ${STAGE_COLORS[s.n]}33`}>
                        <div style={{ fontSize: 22, fontWeight: 700, color: STAGE_COLORS[s.n] }}>{count}</div>
                        <div style={{ fontSize: 9, color: "#6e7681", marginTop: 4, letterSpacing: "0.05em" }}>{s.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#4a6fa5", marginBottom: 14 }}>Urgent Cases</div>
              <CaseTable cases={CASES.filter(c => c.urgent)} onSelect={id => { setSelectedCase(id); }} />
            </>
          )}

          {/* CASES */}
          {nav === "Cases" && !selectedCase && (
            <>
              <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
                <button onClick={() => setStageFilter(null)} style={{ padding: "5px 14px", borderRadius: 5, border: "1px solid #30363d", background: !stageFilter ? "#161b22" : "transparent", color: !stageFilter ? "#e6edf3" : "#6e7681", fontSize: 12, cursor: "pointer" }}>All ({CASES.length})</button>
                {STAGES.map(s => {
                  const count = CASES.filter(c => c.stage === s.n).length;
                  if (!count) return null;
                  return (
                    <button key={s.n} onClick={() => setStageFilter(stageFilter === s.n ? null : s.n)} style={{ padding: "5px 14px", borderRadius: 5, border: `1px solid ${stageFilter === s.n ? STAGE_COLORS[s.n] : "#30363d"}`, background: stageFilter === s.n ? STAGE_COLORS[s.n] + "22" : "transparent", color: stageFilter === s.n ? STAGE_COLORS[s.n] : "#6e7681", fontSize: 12, cursor: "pointer" }}>
                      {s.label} ({count})
                    </button>
                  );
                })}
              </div>
              <CaseTable cases={filteredCases} onSelect={id => setSelectedCase(id)} />
            </>
          )}

          {/* CASE DETAIL */}
          {selectedCase && sc && <CaseDetail c={sc} wd={WORKFLOW_DETAIL[sc.stage]} />}

          {/* WORKFLOW REFERENCE */}
          {nav === "Workflow Reference" && <WorkflowRef stages={WORKFLOW_STAGES_REF} workflowStage={workflowStage} setWorkflowStage={setWorkflowStage} />}

          {/* INTEGRATIONS */}
          {nav === "Integrations" && <IntegrationsView items={INTEGRATIONS} />}

          {nav === "Reports" && (
            <div style={{ color: "#6e7681", fontSize: 14, marginTop: 60, textAlign: "center" }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>◉</div>
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
            {["Case ID", "Policyholder", "Fund", "Stage", "Status", "IFA", "Days", ""].map(h => (
              <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "#4a6fa5", fontWeight: 600 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cases.map((c, i) => (
            <tr key={c.id} onClick={() => onSelect(c.id)}
              style={{ borderBottom: "1px solid #0d1117", cursor: "pointer", background: i % 2 === 0 ? "transparent" : "#0b0f16" }}
              onMouseEnter={e => e.currentTarget.style.background = "#161b22"}
              onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "transparent" : "#0b0f16"}>
              <td style={{ padding: "11px 14px", fontSize: 11, color: "#58a6ff", fontFamily: "monospace" }}>{c.id}</td>
              <td style={{ padding: "11px 14px" }}><div style={{ fontSize: 13, color: "#e6edf3" }}>{c.name}</div><div style={{ fontSize: 10, color: "#6e7681" }}>Age {c.age}</div></td>
              <td style={{ padding: "11px 14px", fontSize: 13, color: "#d4a017" }}>{c.fund}</td>
              <td style={{ padding: "11px 14px" }}><StageBadge stage={c.stage} label={c.stageLabel} /></td>
              <td style={{ padding: "11px 14px", fontSize: 11, color: "#8b949e", maxWidth: 180 }}>{c.status}</td>
              <td style={{ padding: "11px 14px", fontSize: 11, color: "#6e7681" }}>{c.ifa}</td>
              <td style={{ padding: "11px 14px", fontSize: 12, color: c.urgent ? "#f85149" : "#8b949e" }}>{c.days}d {c.urgent && "⚠"}</td>
              <td style={{ padding: "11px 14px", fontSize: 12, color: "#4a6fa5" }}>→</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StageBadge({ stage, label }) {
  const color = STAGE_COLORS[stage] || "#374151";
  return (
    <span style={{ background: color + "22", border: `1px solid ${color}55`, color: "#e6edf3", borderRadius: 4, padding: "2px 8px", fontSize: 10, whiteSpace: "nowrap" }}>
      {stage}. {label}
    </span>
  );
}

function CaseDetail({ c, wd }) {
  const stageState = wd ? wd.states[Math.floor(wd.states.length / 2)] : null;

  const extraFields = [];
  if (c.conditions) extraFields.push({ k: "Conditions", v: c.conditions });
  if (c.medications) extraFields.push({ k: "Medications", v: c.medications });
  if (c.gp) extraFields.push({ k: "GP Practice", v: c.gp });
  if (c.igprRef) extraFields.push({ k: "iGPR Ref", v: c.igprRef });
  if (c.morganAshRef) extraFields.push({ k: "Morgan Ash Ref", v: c.morganAshRef });
  if (c.uwDecision) extraFields.push({ k: "UW Decision", v: c.uwDecision });
  if (c.repriceReason) extraFields.push({ k: "Reprice Reason", v: c.repriceReason });
  if (c.newRate) extraFields.push({ k: "New Rate", v: c.newRate });
  if (c.previousRate) extraFields.push({ k: "Previous Rate", v: c.previousRate });
  if (c.validityExpiry) extraFields.push({ k: "Validity Expires", v: c.validityExpiry });
  if (c.reinsurer) extraFields.push({ k: "Reinsurer", v: c.reinsurer });
  if (c.treatyRef) extraFields.push({ k: "Treaty Ref", v: c.treatyRef });
  if (c.sumReinsured) extraFields.push({ k: "Sum Reinsured", v: c.sumReinsured });
  if (c.counterOffer) extraFields.push({ k: "Counter-offer", v: c.counterOffer });
  if (c.cedingProvider) extraFields.push({ k: "Ceding Provider", v: c.cedingProvider });
  if (c.expectedTransfer) extraFields.push({ k: "Expected Transfer", v: c.expectedTransfer });
  if (c.receivedAmount) extraFields.push({ k: "Received", v: c.receivedAmount });
  if (c.origoRef) extraFields.push({ k: "Origo Ref", v: c.origoRef });
  if (c.reconciled) extraFields.push({ k: "Reconciled", v: c.reconciled });
  if (c.policyNumber) extraFields.push({ k: "Policy Number", v: c.policyNumber });
  if (c.commencementDate) extraFields.push({ k: "Commencement", v: c.commencementDate });
  if (c.annualIncome) extraFields.push({ k: "Annual Income", v: c.annualIncome });
  if (c.coolingOffExpiry) extraFields.push({ k: "Cooling Off Expires", v: c.coolingOffExpiry });
  if (c.ifaCommission) extraFields.push({ k: "IFA Commission", v: c.ifaCommission });
  if (c.lastPaymentDate) extraFields.push({ k: "Last Payment", v: c.lastPaymentDate });
  if (c.nextPaymentDate) extraFields.push({ k: "Next Payment", v: c.nextPaymentDate });

  return (
    <div>
      <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }`}</style>
      <div style={{ animation: "fadeUp 0.2s ease" }}>
        {/* Top cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 20 }}>
          {[
            { l: "Fund Value", v: c.fund },
            { l: "Annuity Type", v: c.annuityType },
            { l: "IFA / Broker", v: c.ifa },
            { l: "Days Open", v: `${c.days} days${c.urgent ? " ⚠" : ""}` },
          ].map(item => (
            <div key={item.l} style={{ background: "#0a0e15", border: "1px solid #161b22", borderRadius: 8, padding: "14px 16px" }}>
              <div style={{ fontSize: 10, letterSpacing: "0.15em", color: "#4a6fa5", textTransform: "uppercase", marginBottom: 4 }}>{item.l}</div>
              <div style={{ fontSize: 14, color: "#e6edf3", fontWeight: 600 }}>{item.v}</div>
            </div>
          ))}
        </div>

        {/* Lifecycle bar */}
        <div style={{ background: "#0a0e15", border: "1px solid #161b22", borderRadius: 10, padding: "18px 20px", marginBottom: 18 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.15em", color: "#4a6fa5", textTransform: "uppercase", marginBottom: 14 }}>Policy Lifecycle</div>
          <div style={{ display: "flex", alignItems: "center" }}>
            {STAGES.map((s, i) => {
              const done = s.n < c.stage;
              const active = s.n === c.stage;
              const col = done ? "#3fb950" : active ? "#d4a017" : "#21262d";
              const tcol = done ? "#3fb950" : active ? "#d4a017" : "#484f58";
              return (
                <div key={s.n} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 52 }}>
                    <div style={{ width: 26, height: 26, borderRadius: "50%", background: active ? "#d4a01722" : done ? "#3fb95022" : "#161b22", border: `2px solid ${col}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: tcol }}>
                      {done ? "✓" : s.n}
                    </div>
                    <div style={{ fontSize: 8, color: tcol, marginTop: 4, textAlign: "center" }}>{s.label}</div>
                  </div>
                  {i < STAGES.length - 1 && <div style={{ flex: 1, height: 2, background: done ? "#3fb950" : "#21262d", margin: "0 2px", marginBottom: 14 }} />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Detail grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {/* Policyholder */}
          <div style={{ background: "#0a0e15", border: "1px solid #161b22", borderRadius: 10, padding: "16px 18px" }}>
            <div style={{ fontSize: 11, letterSpacing: "0.15em", color: "#4a6fa5", textTransform: "uppercase", marginBottom: 10 }}>Policyholder</div>
            {[
              { k: "DOB", v: c.dob }, { k: "Gender", v: c.gender }, { k: "Smoker", v: c.smoker },
              { k: "NI Number", v: c.niNumber }, { k: "Address", v: c.address },
              { k: "Contact", v: c.contact }, { k: "Postcode", v: c.postcode },
              { k: "Payment Freq", v: c.paymentFreq }, { k: "Guarantee", v: c.guaranteePeriod },
            ].map(d => (
              <div key={d.k} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid #161b22", gap: 10 }}>
                <span style={{ fontSize: 11, color: "#6e7681", flexShrink: 0 }}>{d.k}</span>
                <span style={{ fontSize: 11, color: "#e6edf3", textAlign: "right" }}>{d.v}</span>
              </div>
            ))}
          </div>

          {/* Stage-specific data */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {extraFields.length > 0 && (
              <div style={{ background: "#0a0e15", border: "1px solid #161b22", borderRadius: 10, padding: "16px 18px" }}>
                <div style={{ fontSize: 11, letterSpacing: "0.15em", color: "#d4a017", textTransform: "uppercase", marginBottom: 10 }}>Stage Data</div>
                {extraFields.map(d => (
                  <div key={d.k} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid #161b22", gap: 10 }}>
                    <span style={{ fontSize: 11, color: "#6e7681", flexShrink: 0 }}>{d.k}</span>
                    <span style={{ fontSize: 11, color: "#e6edf3", textAlign: "right" }}>{d.v}</span>
                  </div>
                ))}
              </div>
            )}

            {wd && (
              <>
                <div style={{ background: "#0a0e15", border: "1px solid #1f3a1f", borderRadius: 10, padding: "16px 18px" }}>
                  <div style={{ fontSize: 11, letterSpacing: "0.15em", color: "#3fb950", textTransform: "uppercase", marginBottom: 10 }}>Active Integrations</div>
                  {wd.integrations.map(item => <div key={item} style={{ fontSize: 11, color: "#8b949e", padding: "4px 0", borderBottom: "1px solid #161b22" }}>⬡ {item}</div>)}
                </div>
                <div style={{ background: "#0a0e15", border: "1px solid #3a1f1f", borderRadius: 10, padding: "16px 18px" }}>
                  <div style={{ fontSize: 11, letterSpacing: "0.15em", color: "#f85149", textTransform: "uppercase", marginBottom: 10 }}>Rules & Compliance Flags</div>
                  {wd.rules.map(r => <div key={r} style={{ fontSize: 11, color: "#8b949e", padding: "4px 0 4px 8px", borderBottom: "1px solid #161b22", borderLeft: "2px solid #f8514933" }}>{r}</div>)}
                </div>
              </>
            )}

            {c.notes && (
              <div style={{ background: "#0a0e15", border: "1px solid #161b22", borderRadius: 10, padding: "16px 18px" }}>
                <div style={{ fontSize: 11, letterSpacing: "0.15em", color: "#8b949e", textTransform: "uppercase", marginBottom: 8 }}>Case Notes</div>
                <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.6 }}>{c.notes}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkflowRef({ stages, workflowStage, setWorkflowStage }) {
  const active = stages.find(s => s.id === workflowStage);
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px,1fr))", gap: 10, marginBottom: 20 }}>
        {stages.map(s => (
          <div key={s.id} onClick={() => setWorkflowStage(workflowStage === s.id ? null : s.id)}
            style={{ background: workflowStage === s.id ? "#161b22" : "#0a0e15", border: `1px solid ${workflowStage === s.id ? s.color : "#161b22"}`, borderRadius: 8, padding: "14px 16px", cursor: "pointer", boxShadow: workflowStage === s.id ? `0 0 14px ${s.color}33` : "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.color }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: s.color }}>0{s.id}. {s.label}</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
              {s.states.slice(0, 3).map(st => <span key={st} style={{ fontSize: 9, background: "#0d1117", color: "#6e7681", padding: "1px 5px", borderRadius: 3, border: "1px solid #161b22" }}>{st}</span>)}
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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 18 }}>
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

function IntegrationsView({ items }) {
  return (
    <div>
      <div style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#4a6fa5", marginBottom: 14 }}>Integration Registry</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 14 }}>
        {items.map(item => (
          <div key={item.name} style={{ background: "#0a0e15", border: "1px solid #161b22", borderRadius: 10, padding: "16px 18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#e6edf3" }}>{item.name}</div>
                <div style={{ fontSize: 10, color: "#4a6fa5", marginTop: 1 }}>{item.category}</div>
              </div>
              <div style={{ fontSize: 9, background: STATUS_COLOR[item.status] + "22", border: `1px solid ${STATUS_COLOR[item.status]}66`, color: STATUS_COLOR[item.status], borderRadius: 4, padding: "2px 7px", whiteSpace: "nowrap" }}>{item.status}</div>
            </div>
            <div style={{ fontSize: 12, color: "#8b949e", marginBottom: 10, lineHeight: 1.5 }}>{item.desc}</div>
            <div style={{ fontSize: 11, color: "#6e7681" }}>Est. effort: <span style={{ color: "#c9d1d9" }}>{item.effort}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}
