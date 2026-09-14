import { ParticleJourney } from './particle-journey'
import { formatBrand } from '@/lib/brand-text'
import { products } from '@/lib/site'
import { AI7Loop, DeploymentModes, GovernanceFlow, IntelligenceRouter, MotionBoundary } from './interactive'
import { stages } from './stages'
import s from './sovereign.module.css'

const controls = [
  ['Data', 'Sensitive enterprise data stays within the approved residency and access boundary.'],
  ['Compute', 'Choose where workloads run: on-premise, dedicated private infrastructure or controlled hybrid.'],
  ['Model', 'Select, adapt, route and replace models without rebuilding your application layer.'],
  ['Governance', 'Design policies, identity, guardrails, evaluations, approvals and auditability into the system.'],
]
const layers = [
  ['AI Researchers', 'Model research, evaluation, adaptation and multimodal intelligence.'],
  ['Forward Deployed Engineers', 'Engineers working alongside your teams to connect AI to production workflows.'],
  ['Compute', 'GPU infrastructure, storage, networking, orchestration and capacity engineering.'],
  ['Intelligence', 'Vision, speech, retrieval, agents, model routing and domain intelligence.'],
  ['Software', 'APIs, applications, connectors, control planes and lifecycle tooling.'],
  ['Trust', 'Security architecture, access control, guardrails, policy and audit evidence.'],
]
const proof = [
  { slug: 'taed', layer: 'Vision Intelligence', description: 'Documents, images, audio and video become structured, schema-controlled intelligence through production APIs.', inputs: 'Documents + images + video', output: 'Structured intelligence / API' },
  { slug: 'rolefield', layer: 'Conversational AI + Agentic Execution', description: 'Multilingual conversations connect to agents that execute work across enterprise systems, from natural interaction to operational outcomes.', inputs: 'Voice + knowledge + agents', output: 'Communication / action / execution' },
  { slug: 'vendoreye', layer: 'Full-Stack Domain Application', description: 'Intelligence, workflows and governance come together for supplier discovery, onboarding, risk, sourcing and vendor operations.', inputs: 'Intelligence + workflows + governance', output: 'Supplier intelligence / operations' },
]
function Heading({ number, label, title, copy }: { number: string; label: string; title: string; copy?: string }) {
  return <div className={s.sectionHeading}><div><span className={s.eyebrow}>{formatBrand(number)} / {formatBrand(label)}</span><h2>{formatBrand(title)}</h2></div>{copy && <p>{formatBrand(copy)}</p>}</div>
}
function ContactLink({ secondary = false, children = 'Design Your AI Stack' }: { secondary?: boolean; children?: React.ReactNode }) {
  return <a href="/contact" className={secondary ? s.secondaryButton : s.primaryButton}>{formatBrand(children)}<span aria-hidden="true">↗</span></a>
}

export function SovereignHome() {
  return <div className={s.home}>
    <section className={s.hero} aria-labelledby="home-title"><div className={s.wrap}>
      <div className={s.heroGrid}><div className={s.heroCopy}><span className={s.eyebrow}><i /> SOVEREIGN AI · END TO END</span><h1 id="home-title">Build AI<br />you <em>control.</em></h1><p>AI7Lab helps enterprises and governments design, build and operate private AI environments, from strategy and GPUs to models, applications, guardrails and production operations.</p><div className={s.actions}><ContactLink /><a className={s.textLink} href="#ai7-loop">Explore the AI7 Loop <span aria-hidden="true">↓</span></a></div></div><MotionBoundary className={s.heroDiagram}><ParticleJourney /><div className={s.diagramFooter}><span><i /> ONE INTEGRATED ENVIRONMENT</span><span>BUILT AROUND YOU</span></div></MotionBoundary></div>
      <div className={s.heroBase}><span>RESEARCH TO PRODUCTION</span><p>AI Researchers <b>+</b> Forward Deployed Engineers <b>+</b> Compute <b>+</b> Software <b>+</b> Governance</p></div>
    </div></section>

    <section className={`${s.section} ${s.controlSection}`}><div className={s.wrap}><Heading number="01" label="THE CONTROL PRINCIPLE" title="Sovereignty is who controls the system." copy="Where data lives. Where inference runs. Which models are allowed. Who can access them. What AI can do, and how every decision is governed and audited." /><div className={s.controlLayout}><div className={s.controlStatement}><span className={s.micro}>YOUR APPROVED BOUNDARY</span><h3>Your data.<br />Your infrastructure.<br />Your policies.<br /><em>Your AI.</em></h3><div className={s.controlBoundary}><span>Data → Compute → Models → Applications</span><span>Identity · Policies · Audit</span></div><p>AI7Lab designs and engineers the environment.<br />Your organisation retains control.</p></div><div className={s.controlList}>{controls.map(([name, copy], i) => <article key={name}><span className={s.micro}>0{formatBrand(i + 1)}</span><div><h3>{formatBrand(name)} Control</h3><p>{formatBrand(copy)}</p></div><span aria-hidden="true">↗</span></article>)}</div></div></div></section>

    <AI7Loop />

    <section className={s.section}><div className={s.wrap}><Heading number="03" label="THE STACK WE BRING" title="One partner across the AI stack." copy="People, infrastructure and software, assembled around your deployment. One architecture from the first requirement to production." /><div className={s.stackLayout}><div className={s.stackIntro}><span className={s.micro}>INTEGRATED DELIVERY UNIT</span><h3>A working model.<br />A working business system.</h3><p>Forward Deployed Engineers close the gap, connecting your data, APIs, internal systems and workflow logic to the right AI capability.</p><div className={s.fdeFlow}><span>Enterprise workflow</span><b>↕</b><strong>FDEs + APIs + integration</strong><b>↕</b><span>Production AI capability</span></div></div><div className={s.stackLayers}><div className={s.stackLabel}>CUSTOMER AI ENVIRONMENT</div>{layers.map(([title, copy], i) => <div key={title} className={s.stackLayer}><span>0{formatBrand(i + 1)}</span><div><h3>{formatBrand(title)}</h3><p>{formatBrand(copy)}</p></div><span aria-hidden="true">↳</span></div>)}<div className={s.stackFoundation}>ONE DEPLOYMENT ARCHITECTURE</div></div></div>
      <div className={s.subheading}><h3>Different workloads. The right intelligence.</h3><p>Compose models around the problem, from multimodal understanding to conversational AI.</p></div><IntelligenceRouter />
    </div></section>

    <section className={`${s.section} ${s.soft}`}><div className={s.wrap}><Heading number="04" label="DEPLOYMENT CONTROL" title="Deploy where your risk model demands." copy="Architecture follows your workload, jurisdiction, risk profile and economics. Choose the boundary that fits your organisation." /><DeploymentModes /></div></section>

    <section className={`${s.section} ${s.proofSection}`}><div className={s.wrap}><Heading number="05" label="BUILT, NOT THEORISED" title="Our building blocks are already running in products." copy="Production products demonstrate how reusable AI7 capabilities become intelligence, actions and complete enterprise applications." /><div className={s.proofRoot}><span className={s.micro}>AI7 SOVEREIGN STACK</span><span>Infrastructure + Intelligence + Engineering + Governance</span></div><div className={s.proofBranches}>{proof.map(item => {
      const product = products.find(product => product.slug === item.slug)!
      return <article key={item.slug} className={s.proofBranch}><span className={s.eyebrow}>{formatBrand(item.layer)}</span><div className={s.proofInputs}>{formatBrand(item.inputs)}</div><div className={s.productNode}><div className={s.productName}><h3>{formatBrand(product.name)}</h3><span>● {formatBrand(product.status)}</span></div><p>{formatBrand(item.description)}</p><a href={product.external} target="_blank" rel="noopener noreferrer">See {formatBrand(product.name === 'rolefield.ai' ? 'rolefield.ai' : product.name)} in Production <span aria-hidden="true">↗</span></a></div><span className={s.productOutput}>↓ {formatBrand(item.output)}</span>{item.slug === 'vendoreye' && <span className={s.micro}>BUILT ON AI7 CAPABILITIES</span>}</article>
    })}</div></div></section>

    <section className={`${s.section} ${s.soft}`}><div className={s.wrap}><Heading number="06" label="CONTROL IN PRACTICE" title="Trust is an active part of the architecture." copy="Governance controls how AI acts. Observability makes the estate understandable, so your team can intervene and improve it." /><GovernanceFlow /><div className={s.operations}><div><span className={s.micro}>OPERATE, OBSERVE & SCALE</span><h3>See the system.<br />Act on the evidence.</h3><p>Monitor model behaviour, GPU utilisation, cost and application health. Evaluate, version, roll back and improve through LLMOps and MLOps.</p></div><div className={s.operationsFlow}><span className={s.micro}>ILLUSTRATIVE RESPONSE · NOT LIVE METRICS</span><div><span>Latency deviation detected</span><b>→</b><span>Route to approved alternate model</span><b>→</b><span>Evaluate recovery</span></div><p>Operational telemetry → production evidence → next strategy cycle ↺</p></div></div></div></section>

    <section className={s.section}><div className={s.wrap}><Heading number="07" label="FROM USE CASE TO AI ESTATE" title="Start with one use case. Build a capability that compounds." copy="Reusable infrastructure, model access, governance and engineering patterns make every successful deployment a foundation for the next." /><div className={s.compounding}>{['Use case 01', 'Shared AI platform', 'Additional use cases', 'Enterprise AI estate'].map((text, i) => <div key={text}><span className={s.micro}>0{formatBrand(i + 1)}</span><h3>{formatBrand(text)}</h3><span aria-hidden="true">{formatBrand(i === 3 ? '↺' : '→')}</span></div>)}</div><div className={s.sharedLayers}><span className={s.micro}>PERSISTENT SHARED LAYERS</span><p>Identity · Security · Model gateway · Observability · Data controls · Infrastructure · Governance</p></div><div className={s.audiences}><h3>For organisations where AI has to work inside real constraints.</h3><div>{[
      ['Regulated Enterprises', 'Data boundaries, auditability and access controls for banking, insurance, healthcare and other regulated environments.'],
      ['Governments & Public Sector', 'Infrastructure and applications shaped by jurisdiction, sovereignty and institutional control.'],
      ['Large Enterprises', 'Move from scattered pilots to shared infrastructure, reusable intelligence and governed deployment.'],
      ['AI-Native Transformation Programs', 'Build operating models around agents, multimodal intelligence and accountable autonomous workflows.'],
    ].map(([title, copy]) => <article key={title}><h4>{formatBrand(title)}</h4><p>{formatBrand(copy)}</p></article>)}</div></div><div className={s.delivery}><span className={s.eyebrow}>DESIGN THROUGH PRODUCTION</span><h3>We stay close to implementation and outcomes.</h3><p>Research, infrastructure engineering and Forward Deployed Engineering work as one team. Discover and design, deploy and embed, prove, scale and operate: the same AI7 loop in practice.</p><div>{stages.map((stage, i) => <span key={stage.slug}><b>0{formatBrand(i + 1)}</b>{formatBrand(stage.delivery)}</span>)}</div></div></div></section>

    <section className={s.finalCta}><div className={s.wrap}><span className={s.eyebrow}>YOUR NEXT AI CHAPTER</span><h2>Own the AI capability,<br /><em>not just the API access.</em></h2><p>Build a controlled AI environment around your data, infrastructure, policies and business workflows, with one team from strategy to operations.</p><div className={s.actions}><ContactLink /><ContactLink secondary>Talk to the Founding Team</ContactLink></div><div className={s.finalLine}>AI7Lab · Sovereign AI, end to end.<span>STRATEGY → PRODUCTION → NEXT CYCLE ↺</span></div></div></section>
  </div>
}
