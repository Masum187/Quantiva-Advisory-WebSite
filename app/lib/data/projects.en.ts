/**
 * English translations of the Quantiva venture portfolio.
 *
 * Mirrors the user-visible strings of `projects.ts` (German source of truth).
 * Non-textual fields (slug, logo, colors, effect) stay in `projects.ts`;
 * this module only overrides the translatable copy per venture.
 */

import type { Venture } from './projects';

export type VentureTranslation = Pick<
  Venture,
  | 'category'
  | 'verb'
  | 'tagline'
  | 'intro'
  | 'problemTitle'
  | 'problems'
  | 'flowTitle'
  | 'flow'
  | 'principles'
>;

export const ventureTranslationsEn: Record<string, VentureTranslation> = {
  solutiongate: {
    category: 'AI Problem Intelligence',
    verb: 'identify',
    tagline: 'Find the problems worth solving. Prove what works.',
    intro:
      'Companies do not lack ideas. They lack transparency about which problems matter, which solutions exist, and which measures actually create impact. SolutionGate identifies, structures, and evaluates operational business problems economically — and guides the solution through to a measurable outcome.',
    problemTitle: 'Five problems, one pattern',
    problems: [
      {
        title: 'Problem Fragmentation',
        text: 'Quality report, ticket, audit finding, Excel, e-mail: the knowledge exists — scattered across systems, departments, and heads. Nobody can reliably say what the 30 most expensive unsolved problems are.',
      },
      {
        title: 'Problem Duplication',
        text: 'Several plants or teams independently solve the same problem. Every duplicate solution is work paid for twice — plus the lost economies of scale of the better variant.',
      },
      {
        title: 'Weak Prioritization',
        text: 'Prioritization follows volume or hierarchy instead of economic impact, risk, and solvability. Whoever escalates loudest wins the budget.',
      },
      {
        title: 'Solution Discovery Gap',
        text: 'Unclear whether a solution already exists internally, whether suitable vendors or alternatives are available — or whether another plant solved the problem long ago.',
      },
      {
        title: 'Execution Gap',
        text: 'No structured path from idea through evaluation, PoC, and business case to decision and rollout. Initiatives fizzle out between PowerPoint and pilot.',
      },
    ],
    flowTitle: 'From signal to outcome',
    flow: [
      { label: 'Signal', desc: 'Operational systems contain problem signals before anyone formulates an initiative.' },
      { label: 'Problem', desc: 'Signals are condensed into structured, comparable problems.' },
      { label: 'Business Impact', desc: 'Every problem receives an economic assessment — cost, risk, frequency.' },
      { label: 'Solution', desc: 'Internal and external solutions are connected systematically.' },
      { label: 'Evaluation & PoC', desc: 'Candidates are tested in a structured way instead of decided politically.' },
      { label: 'Decision & Outcome', desc: 'Decision, rollout, and actual impact remain measurably linked.' },
    ],
    principles: [
      'Time-to-Validated-Solution is the central metric — not the number of submitted ideas.',
      'Problem intelligence is more valuable than idea management.',
      'The data value emerges from connecting problem → context → solution → decision → outcome.',
      'Works for a single customer from day one — without marketplace liquidity.',
    ],
  },
  shiftgate: {
    category: 'SAP Evidence & Proof',
    verb: 'prove',
    tagline: 'No change without proof.',
    intro:
      'Your systems say the change was clean. ShiftGate AI proves it: the read-only, operator-blind, tamper-proof, and audit-ready state and change evidence for SAP landscapes — prepared for audits and legal review.',
    problemTitle: 'Why proof instead of assertion',
    problems: [
      {
        title: 'Reconstruction devours days',
        text: 'When something goes wrong, the search begins: who changed what, and when — and what was the state before? Assembling the facts costs hours to days — per case.',
      },
      {
        title: 'Systems do not attest themselves',
        text: 'Logs are scattered, overwritable, and without context. An operator attesting itself is not proof.',
      },
      {
        title: 'Audits need chaining',
        text: 'Audits demand a complete, traceable chain — not screenshots and memories.',
      },
    ],
    flowTitle: 'The chain of evidence',
    flow: [
      { label: 'Observe', desc: 'Read-only connection to the SAP landscape — ShiftGate changes nothing, ever.' },
      { label: 'Capture', desc: 'State and change data are recorded systematically.' },
      { label: 'Chain', desc: 'Every entry is chained tamper-proof and audit-ready.' },
      { label: 'Substantiate', desc: 'The complete, citable body of facts emerges in minutes instead of hours.' },
      { label: 'Review', desc: 'Prepared for audits and legal review — the judgment stays with the engineer.' },
    ],
    principles: [
      'The proof is the product — not the change itself.',
      'Operator-blind by design: whoever operates cannot intervene unnoticed.',
      'The complete, citable body of facts in minutes instead of hours.',
      'The judgment stays with the engineer — ShiftGate delivers evidence, not interpretation.',
    ],
  },
  lumena: {
    category: 'AI Governance · EU AI Act',
    verb: 'govern',
    tagline: 'Compliance-by-Proof for AI systems.',
    intro:
      'LUMENA AI tests AI systems technically against specific EU AI Act articles and produces auditable evidence — compliance-by-proof instead of self-attestation. And it proposes, based on data, which AI is economically worthwhile.',
    problemTitle: 'The governance gap',
    problems: [
      {
        title: 'Self-attestation is not evidence',
        text: 'Questionnaires and policies do not demonstrate how an AI system actually behaves. The EU AI Act demands more than good intentions.',
      },
      {
        title: 'Articles are specific — tests are rare',
        text: 'Transparency obligations, robustness, human oversight: the requirements are precisely worded, yet rarely tested technically.',
      },
      {
        title: 'Which AI is even worth it?',
        text: 'Before the governance question comes the investment question. Without a data basis, use-case selection remains gut feeling.',
      },
    ],
    flowTitle: 'Two wedges, one system',
    flow: [
      { label: 'Connect', desc: 'The AI system is connected technically — EU-sovereign, EU-only hosting.' },
      { label: 'Test', desc: 'Specific EU AI Act articles are tested technically, not surveyed.' },
      { label: 'Generate evidence', desc: 'Every test produces auditable, traceable evidence.' },
      { label: 'Evaluate use cases', desc: 'Data-based proposals for which AI pays off, at what ROI.' },
      { label: 'Govern', desc: 'LUMENA governs the in-between — from idea to compliant operation.' },
    ],
    principles: [
      'Compliance-by-proof: technical tests against specific articles, not checklists.',
      'EU-sovereign — EU-only hosting, operator-blind architecture.',
      'Auditable evidence as the result, not a by-product.',
      'Wedge 2: use-case generation with ROI — which AI is truly worth it?',
    ],
  },
  procuvera: {
    category: 'Spend & Compliance Governance',
    verb: 'steer',
    tagline: 'Flags risk, passes no judgment.',
    intro:
      'Procuvera governs spend and compliance in transformation programs that buy external consulting — preventively at the moment of deployment, not reactively at the moment of booking. Off-contract spend, supplier concentration, and labor-leasing and contract-for-work risks become visible before they get expensive.',
    problemTitle: 'The finance system sees it too late',
    problems: [
      {
        title: 'Reactive at the moment of booking',
        text: 'ERP systems govern the financial document — by the time it is booked, the engagement is long over. Procuvera governs the engagement itself.',
      },
      {
        title: 'Off-contract spend',
        text: 'Is the deployed external covered by a valid framework agreement for exactly this scope? Usually nobody knows for sure.',
      },
      {
        title: 'Labor-law gray areas',
        text: 'Labor leasing, contracts for work, false self-employment: risks arise in day-to-day engagements — and only surface in the audit.',
      },
      {
        title: 'Concentration & contract terms',
        text: 'Supplier concentration and expiring framework agreements erode programs quietly.',
      },
    ],
    flowTitle: 'Governance at the moment of deployment',
    flow: [
      { label: 'Capture', desc: 'Programs, streams, framework agreements, engagements, and costs are brought together.' },
      { label: 'Reconcile', desc: 'Every engagement is checked against contract coverage and scope.' },
      { label: 'Flag', desc: 'Labor-leasing and contract-for-work signals and compliance gaps are marked — as risk, not as judgment.' },
      { label: 'Monitor', desc: 'Supplier concentration and contract terms stay continuously in view.' },
      { label: 'Steer', desc: 'PMO, procurement, and legal decide on a shared basis of facts.' },
    ],
    principles: [
      'Flags risk, renders no legal judgments — the legal assessment stays with Legal.',
      'Preventive at the moment of deployment instead of reactive at the moment of booking.',
      'SAP-independent at the core, connector-based at the data edge.',
      'For PMO, CFO, procurement, and HR/Legal — one shared basis of facts.',
    ],
  },
  limen: {
    category: 'Regulatory Product Classification',
    verb: 'classify',
    tagline: 'Regulatory Compliance Simplified.',
    intro:
      'Limen — Latin for threshold. A muslin cloth is a textile. A comfort blanket is a toy. Same factory, same fabric — but two entirely different worlds of obligations. LIMEN classifies products legally before they are placed on the EU market: deterministic, effective-date-exact, with a complete chain of evidence.',
    problemTitle: 'The expensive order of events',
    problems: [
      {
        title: 'Order first, find out later',
        text: 'Today, retailers learn the legal classification of their product in reverse order: order, sell, complaint.',
      },
      {
        title: 'Classification is the expensive part',
        text: 'The list of obligations is written in the law — diligence work. The valuable part is the classification: what does this product legally count as?',
      },
      {
        title: 'Law changes to the exact date',
        text: 'GPSR, PPWR, Toy Regulation: every rule has a legal basis and a validity period. When the rulebook changes, affected products must be reassessed.',
      },
    ],
    flowTitle: 'From product to chain of evidence',
    flow: [
      { label: 'Product file', desc: 'Everything known about a product: raw data, documents, supplier information, images.' },
      { label: 'Feature extraction', desc: 'Structured extraction of typed features — with confidence and source reference per field.' },
      { label: 'Rule evaluation', desc: 'Deterministic, as of the effective date, without an LLM in the decision path. Same input always yields the same result.' },
      { label: 'Reasoned finding', desc: 'The complete rule path with its legal basis is disclosed — phrased in plain language.' },
      { label: 'Approval', desc: 'No artifact leaves the system without sign-off by a qualified person.' },
      { label: 'Evidence record', desc: 'Every evaluation is immutably chained — the exhibit for market surveillance and marketplaces.' },
    ],
    principles: [
      'Deterministic core, probabilistic edges — no LLM in the decision path.',
      'Four result states: decided, undecided, escalated — and honestly “normatively indeterminate”.',
      'A system that says “the legal position is contested here” is more valuable than one that guesses.',
      'Reassessment when the rulebook changes: binding force and liability protection at once.',
    ],
  },
  veya: {
    category: 'Workforce Progression',
    verb: 'enable',
    tagline: 'Progression you can prove.',
    intro:
      'Veya does not optimize filling a shift — it optimizes the provable economic progression of a person. The guiding question: which real next action, under a self-chosen goal, expands the provable opportunity space?',
    problemTitle: 'Profiles are not progression',
    problems: [
      {
        title: 'Declared identity',
        text: 'Networks show what people say about themselves. They do not show what someone has demonstrably done — and what becomes reachable from there.',
      },
      {
        title: 'Applications instead of development',
        text: 'Job boards match people to existing openings. The path there — which action proves which capability — remains invisible.',
      },
      {
        title: 'Scores without substance',
        text: 'Global person scores reduce people to a number. Veya knows no scores — only proven capabilities and reachable opportunities.',
      },
    ],
    flowTitle: 'The progression graph',
    flow: [
      { label: 'Action', desc: 'Real work, real engagements — Veya is involved at the point of origin.' },
      { label: 'Evidence', desc: 'Every action produces evidence with provenance — traceable, not claimed.' },
      { label: 'Capability', desc: 'Evidence yields proven capabilities. No strategic capability without evidence.' },
      { label: 'Opportunity', desc: 'Capabilities unlock the next reachable opportunity — and the cycle begins again.' },
    ],
    principles: [
      'No strategically important capability without evidence — evidence needs provenance.',
      'No global person scores. No personality as capability.',
      'UNKNOWN is not inability.',
      'Every transition is versioned and auditable.',
    ],
  },
  nuvora: {
    category: 'Computational Workforce Capacity',
    verb: 'compute',
    tagline: 'Workforce capacity as a computable model.',
    intro:
      'Nuvora is not a staffing portal but a computational model of workforce capacity: seven layers, each building on the last, turn personnel data into reliable answers — what capacity really exists, what is permitted, and what happens when things change?',
    problemTitle: 'Capacity is more than headcount',
    problems: [
      {
        title: 'Available does not mean deployable',
        text: 'Qualification, authorization, deployment context, recovery: real deployability is a multi-layered model — not a column value.',
      },
      {
        title: 'Decisions without reproducibility',
        text: 'Make a workforce decision twice and you often get two different results. A computable model makes them reproducible.',
      },
      {
        title: 'What-if remains gut feeling',
        text: 'What happens on absence, shifts, or new requirements? Without simulation, the answer stays speculation.',
      },
    ],
    flowTitle: 'Seven layers',
    flow: [
      { label: 'R1 · Semantics', desc: 'What can be represented at all? The semantic foundation.' },
      { label: 'R2 · Eligibility', desc: 'What is permitted? Rules and authorizations decide.' },
      { label: 'R3 · Readiness', desc: 'What is true right now? The current state.' },
      { label: 'R4 · Capacity', desc: 'What capacity actually exists? The computation.' },
      { label: 'R5 · Optimization', desc: 'What should we do? The optimization.' },
      { label: 'R6 · Counterfactual', desc: 'What happens if we do it? The simulation.' },
      { label: 'R7 · Execution & Memory', desc: 'What actually happened? The system learns from execution.' },
    ],
    principles: [
      'R1 represents. R2 decides. R3 determines state. R4 computes. R5 optimizes. R6 simulates. R7 learns.',
      'Hypotheses are explicitly separated from proven statements.',
      'Privacy and authorization are architecture, not a setting.',
      'Specification depth is no proof of product maturity — evidence decides.',
    ],
  },
  weftline: {
    category: 'Business Flow Assurance',
    verb: 'verify',
    tagline: 'Your systems say it worked. WEFTLINE verifies the business flow actually did.',
    intro:
      'WEFTLINE monitors business-critical end-to-end process chains across ERP, integration, and satellite-system boundaries — and detects when expected business states fail to occur. Even when the systems involved report no technical error.',
    problemTitle: 'The silent failure',
    problems: [
      {
        title: 'Green does not mean good',
        text: 'Every system reports success — and still the delivery is missing, the invoice is stuck, the process stalls. The failure is a business failure, not a technical one.',
      },
      {
        title: 'Days of clarification',
        text: 'When a chain breaks, multi-day cases tie up several experts in hours of clarification rounds — the problem is attribution, not waiting.',
      },
      {
        title: 'Monitoring sees systems, not chains',
        text: 'Observability produces signals per system. Nobody verifies whether the business flow actually happened across all boundaries.',
      },
    ],
    flowTitle: 'Expectation versus reality',
    flow: [
      { label: 'Scenario Graph', desc: 'The process chain is modeled as the expected business flow — from order-to-cash to hire-to-retire.' },
      { label: 'Expectation Engine', desc: 'Expectation rules define which business states must occur, and when.' },
      { label: 'Target/actual comparison', desc: 'Cyclical comparison across system and vendor boundaries.' },
      { label: 'Finding', desc: 'If reality deviates, a finding is created with path, impact, and coverage.' },
      { label: 'Handover', desc: 'The finding is handed over, structured, to the existing ITSM — coexistence instead of displacement.' },
    ],
    principles: [
      'Vendor-neutral core, vendor-specific connectors — SAP is the beginning, not the boundary.',
      'Process Packs: O2C, P2P, R2R, Plan-to-Produce, Warehouse-to-Ship, Hire-to-Retire.',
      'WEFTLINE does not generate signals — it verifies business states.',
      'Coexistence with the existing ITSM instead of displacement.',
    ],
  },
};
