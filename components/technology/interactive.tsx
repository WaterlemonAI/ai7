'use client'

import { formatBrand } from '@/lib/brand-text'
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { technologyLayers, telemetry } from './data'
import s from './technology.module.css'

export function MotionCanvas({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => ref.current?.setAttribute('data-visible', String(entry.isIntersecting)), { rootMargin: '40px' })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return <div ref={ref} data-visible="false" className={`${s.motionCanvas} ${className}`}>{formatBrand(children)}</div>
}

export function Flow({ items }: { items: readonly string[] }) {
  return <div className={s.flow}>{items.map((item, i) => <span key={item}>{formatBrand(item)}{i < items.length - 1 && <b aria-hidden="true">→</b>}</span>)}</div>
}

export function StackDrawing({ active = -1, interactive = false }: { active?: number; interactive?: boolean }) {
  return <div className={s.stackDrawing}>
    <div className={s.enterpriseLabel}><span className={s.statusDot} /> YOUR ENTERPRISE ENVIRONMENT</div>
    <div className={s.stackBody}><div className={s.edgeRail}><span>SECURITY + POLICY</span><i /></div><div className={s.stackNodes}>{[...technologyLayers].reverse().map((layer, reversedIndex) => {
      const index = 6 - reversedIndex
      const content = <><span className={s.nodeIndex}>0{formatBrand(index + 1)}</span><strong>{formatBrand(layer.name)}</strong><span className={s.nodeState}>{formatBrand(active === index ? 'EXPLORING' : 'CONNECTED')}</span></>
      return interactive ? <a key={layer.id} href={`#layer-${layer.id}`} aria-current={active === index ? 'step' : undefined} className={s.stackNode} data-active={active === index} style={{ '--order': index } as CSSProperties}>{formatBrand(content)}</a> : <div key={layer.id} className={s.stackNode} style={{ '--order': index } as CSSProperties}>{formatBrand(content)}</div>
    })}</div><div className={`${s.edgeRail} ${s.telemetryRail}`}><span>OBSERVABILITY + AUDIT</span><i /></div></div>
    <div className={s.stackBase}>COMPUTE → INTELLIGENCE → OUTCOME <span>↺</span></div>
  </div>
}

export function TechnologyStack() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting)
      if (visible.length) setActive(Number(visible[0].target.getAttribute('data-layer')))
    }, { rootMargin: '-25% 0px -45% 0px' })
    ref.current?.querySelectorAll('[data-layer]').forEach(node => observer.observe(node))
    return () => observer.disconnect()
  }, [])
  return <div className={s.stackExplorer} ref={ref}>
    <div className={s.stickyStack}><MotionCanvas><StackDrawing active={active} interactive /></MotionCanvas><p className={s.diagramNote}>Select a layer or scroll to explore. Security and observability span the entire stack.</p></div>
    <div className={s.layerNarrative}>{technologyLayers.map((layer, i) => <article key={layer.id} id={`layer-${layer.id}`} data-layer={i} className={s.layerArticle}><span className={s.eyebrow}>0{formatBrand(i + 1)} / {formatBrand(layer.name)}</span><h3>{formatBrand(layer.title)}</h3><p>{formatBrand(layer.description)}</p><Flow items={layer.flow} /><ul>{layer.capabilities.map(capability => <li key={capability}>{formatBrand(capability)}</li>)}</ul></article>)}</div>
  </div>
}

const gatewayCases = [
  { name: 'Authorised request', result: 'Validated → permitted context enters the environment.', state: 'allowed' },
  { name: 'Sensitive action', result: 'Held at the gateway → human approval required before execution.', state: 'approval' },
  { name: 'Unapproved connection', result: 'Blocked at the gateway → no access granted → event logged.', state: 'blocked' },
]
export function SovereigntyBoundary() {
  const [request, setRequest] = useState(0)
  return <div className={s.boundaryDiagram}><div className={s.externalSources}><span className={s.micro}>EXTERNAL CONNECTIONS</span><p>Users · Enterprise systems · Data sources<br />Partners · Cloud providers · External models</p></div><div className={s.gateway}><span className={s.eyebrow}>↓ CONTROLLED GATEWAY ↓</span><p>Identity · Policy · Encryption · API control · Human approval · Audit</p></div><div className={s.boundaryInterior}><span className={s.micro}>YOUR AI ENVIRONMENT</span><div>{['Data', 'Models', 'Compute', 'Agents', 'APIs', 'Policies', 'Logs', 'Secrets', 'Identity', 'Workflows'].map(item => <span key={item}>{formatBrand(item)}</span>)}</div></div><div className={s.segmented} aria-label="Illustrative gateway requests">{gatewayCases.map((item, i) => <button key={item.name} onClick={() => setRequest(i)} aria-pressed={request === i}>{formatBrand(item.name)}</button>)}</div><p className={s.result} data-state={gatewayCases[request].state} aria-live="polite">{formatBrand(gatewayCases[request].result)}</p><span className={s.diagramNote}>Illustrative control flow. Policies are configured for each deployment.</span></div>
}

const tasks = [
  { title: 'Prepare a supplier review', research: 'Retrieve supplier evidence', decision: 'Evaluate risk and policy', action: 'Prepare the review record', result: 'Evidence-backed review → procurement approval → approved system update' },
  { title: 'Resolve a customer request', research: 'Retrieve permitted account context', decision: 'Determine eligible next steps', action: 'Prepare a CRM update', result: 'Validated response → required approval → customer follow-up' },
]
export function AgentOrchestration() {
  const [task, setTask] = useState(0)
  return <div className={s.agentDiagram}><div className={s.segmented} aria-label="Illustrative agent objectives">{tasks.map((item, i) => <button key={item.title} aria-pressed={task === i} onClick={() => setTask(i)}>{formatBrand(item.title)}</button>)}</div><MotionCanvas><div className={s.orchestrator}><span className={s.micro}>OBJECTIVE → ORCHESTRATOR</span><strong>{formatBrand(tasks[task].title)}</strong><span>Plan · decompose · retain state</span></div><div className={s.agentBranches} key={task}>{[['Research agent', tasks[task].research, 'DATA / RAG'], ['Decision agent', tasks[task].decision, 'POLICIES / MEMORY'], ['Action agent', tasks[task].action, 'TOOLS / APIs']].map(([name, detail, tools], i) => <div key={name} style={{ '--order': i } as CSSProperties}><span className={s.micro}>{formatBrand(name)}</span><strong>{formatBrand(detail)}</strong><span>{formatBrand(tools)}</span></div>)}</div><div className={s.validation}><span>VALIDATION → HUMAN / MACHINE APPROVAL → ACTION</span><p aria-live="polite">{formatBrand(tasks[task].result)}</p></div></MotionCanvas><p className={s.diagramNote}>Illustrative workflow. Event triggers, scheduling, retries and escalation keep the task accountable from objective to outcome.</p></div>
}

const actions = [
  { name: 'Read customer data', state: 'allowed', label: 'Allowed', reason: 'Read access is limited to the records permitted by the user’s role.' },
  { name: 'Summarise account', state: 'allowed', label: 'Allowed', reason: 'Use permitted account context and validate the output before returning it.' },
  { name: 'Update CRM', state: 'allowed', label: 'Allowed', reason: 'The approved tool can update permitted fields. The change is recorded.' },
  { name: 'Refund AED 100', state: 'approval', label: 'Requires approval', reason: 'Pause execution and route the proposed refund to an authorised human.' },
  { name: 'Export customer database', state: 'blocked', label: 'Blocked', reason: 'Bulk export is outside the agent’s permissions. Deny the action and record the attempt.' },
]
export function GovernanceEngine() {
  const [active, setActive] = useState(3)
  return <div className={s.governance}><div className={s.policyEngine}><span className={s.micro}>ILLUSTRATIVE POLICY ENGINE</span><h3>One agent.<br />Explicit action limits.</h3><p>Role + data classification + tool permissions + action limits</p><div className={s.policyDecision} data-state={actions[active].state} aria-live="polite"><strong>{formatBrand(actions[active].label)}</strong><p>{formatBrand(actions[active].reason)}</p></div><span className={s.diagramNote}>Example policies, not a live customer system.</span></div><div className={s.actionList}>{actions.map((action, i) => <button key={action.name} aria-pressed={active === i} onClick={() => setActive(i)}><span>{formatBrand(action.name)}</span><b data-state={action.state}>{formatBrand(action.state === 'allowed' ? '✓ ' : action.state === 'blocked' ? '⊘ ' : '◇ ')}{formatBrand(action.label)}</b></button>)}</div></div>
}

const deployments = [
  { name: 'On-Premise', boundary: 'ENTERPRISE DATA CENTRE', copy: 'For maximum infrastructure control, strict internal data requirements and existing enterprise data centres.', zone: 'Customer-managed infrastructure' },
  { name: 'Private Cloud', boundary: 'ISOLATED PRIVATE CLOUD / VPC', copy: 'For cloud elasticity with isolated workloads, private networking and an approved VPC architecture.', zone: 'Dedicated network and workload isolation' },
  { name: 'Sovereign Cloud', boundary: 'APPROVED JURISDICTION / CLOUD BOUNDARY', copy: 'For government and regulated workloads with geography-specific requirements. Provider, residency and access controls are validated during architecture design.', zone: 'Jurisdiction and operational controls defined for the workload' },
  { name: 'Controlled Hybrid', boundary: 'PRIVATE ENVIRONMENT + POLICY ROUTER', copy: 'Sensitive data and workloads stay private. Only explicitly permitted workloads can reach approved external capabilities.', zone: 'Local runtime ↔ policy gateway ↔ approved external model' },
]
export function DeploymentModels() {
  const [active, setActive] = useState(0)
  return <div className={s.deployments}><div className={s.deploymentTabs} aria-label="Deployment configurations">{deployments.map((mode, i) => <button key={mode.name} aria-pressed={active === i} aria-controls="technology-deployment" onClick={() => setActive(i)}><span>0{formatBrand(i + 1)}</span>{formatBrand(mode.name)}<b>↗</b></button>)}</div><div className={s.deploymentDetail} id="technology-deployment" aria-live="polite"><p>{formatBrand(deployments[active].copy)}</p><div className={s.deploymentBoundary} key={active}><span className={s.micro}>{formatBrand(deployments[active].boundary)}</span><div className={s.deploymentModules}>{['Compute', 'Models', 'Data', 'AI7 runtime', 'Applications'].map(item => <span key={item}>{formatBrand(item)}</span>)}</div><div className={s.persistentControl}>IDENTITY · POLICIES · ENCRYPTION · AUDIT</div></div><div className={s.deploymentZone}>{formatBrand(deployments[active].zone)}</div></div></div>
}

export function ObservabilitySystem() {
  const [active, setActive] = useState(0)
  return <div className={s.observability}><div className={s.telemetrySources}>{telemetry.map((item, i) => <button key={item.name} aria-pressed={active === i} onClick={() => setActive(i)}><span>{formatBrand(item.name)}</span><b>→</b></button>)}</div><MotionCanvas className={s.controlPlane}><span className={s.micro}>TELEMETRY → AI7 CONTROL PLANE</span><h3>Observe. Evaluate.<br />Intervene.</h3><div className={s.telemetryDetail} aria-live="polite"><span className={s.eyebrow}>{formatBrand(telemetry[active].name)}</span><p>{formatBrand(telemetry[active].signals)}</p></div><Flow items={['Detect deviation', 'Investigate', 'Apply approved change', 'Evaluate recovery']} /><p className={s.diagramNote}>Signal categories and response flow shown for illustration. No live metrics or performance guarantees.</p></MotionCanvas></div>
}
