import { Building2, CloudCog, Rocket } from 'lucide-react'

export const partnerPages = {
  builders: {
    slug:'builders', nav:'Builders & startups', icon:Rocket, eyebrow:'For builders and startups',
    title:'Keep building. We’ll help you find the market proof.',
    description:'AI7Lab partners with early-stage AI teams to turn a promising product into an enterprise-ready proof—without asking a part-time founder to build a full sales, infrastructure, and enterprise-delivery organization alone.',
    promise:'Your product stays at the centre. AI7Lab helps create the commercial and technical conditions for a credible enterprise evaluation.',
    primaryCta:'Discuss your product with the founders', interest:'Builder or startup partnership',
    outcomes:['A sharper enterprise use case','Direct buyer and operator feedback','Evidence from a bounded deployment','A path from first proof to repeatable traction'],
    stages:[
      {label:'01 · Position',title:'Make the product legible to an enterprise buyer',copy:'Clarify the urgent workflow, economic buyer, operational user, proof threshold, integration surface, and why the product is materially better than the current process.'},
      {label:'02 · Introduce',title:'Reach the people who can validate the problem',copy:'Prepare targeted one-to-one discussions with enterprise leaders across the Middle East, Asia, and the US where there is genuine use-case fit—not broad, unqualified exposure.'},
      {label:'03 · Prove',title:'Run a bounded enterprise evaluation',copy:'Shape the evaluation plan, success metrics, security questions, data boundaries, infrastructure, test environment, and feedback loop required to earn a scale decision.'},
      {label:'04 · Scale',title:'Turn proof into a repeatable company',copy:'Use early traction metrics to strengthen packaging, pricing, delivery, the first-customer motion, technical architecture, and the evidence needed for future fundraising.'},
    ],
    capabilities:[
      ['Enterprise GTM','Positioning, account selection, buyer conversations, evaluation design, and support toward the first five customers or design partners.'],
      ['Product evaluation','Structured feedback from real operators, buyers, security teams, and decision-makers against an explicit outcome.'],
      ['Enterprise proofing','Scalability, security hardening, integration planning, infrastructure review, observability, and production-readiness guidance.'],
      ['Infrastructure pathways','Guidance on cloud, storage, compute, hardware, models, tokens, and approved startup programs. Credits or provider benefits remain subject to provider eligibility and approval.'],
      ['Founder-friendly path','A staged engagement for builders who are employed, bootstrapped, or working part-time and want market evidence before taking a larger personal or financial risk.'],
      ['Traction and fundraising readiness','A clearer proof narrative, customer evidence, usage signals, delivery learning, and a stronger basis for an investor conversation—without promising funding outcomes.'],
    ],
    fit:['A working product or convincing prototype','A specific enterprise problem','A team willing to learn from buyer evidence','A product that can be evaluated safely in a bounded workflow'],
    guardrails:['No guaranteed customers, revenue, investment, credits, or provider approval.','Introductions follow demonstrated fit and enterprise demand.','Commercial, IP, data, and delivery terms are agreed for each engagement.','High-impact decisions remain with authorized enterprise owners.'],
  },
  enterprises: {
    slug:'enterprises', nav:'Enterprises', icon:Building2, eyebrow:'For enterprise leaders',
    title:'Access the AI market without turning your company into a lab.',
    description:'AI7Lab gives enterprise teams a governed route to specialized AI products and exceptional builders—then hardens the most relevant solution for security, scale, integration, and measurable business outcomes.',
    promise:'Explore faster, commit later. Start with one controlled workflow and scale only when the evidence supports it.',
    primaryCta:'Design an enterprise AI pipeline', interest:'Enterprise AI pipeline',
    outcomes:['A curated solution shortlist','Faster path from problem to live proof','Lower experimentation and license risk','Enterprise controls built into the scale decision'],
    stages:[
      {label:'01 · Frame',title:'Start with the operating problem',copy:'Define the workflow, baseline, owner, data sensitivity, acceptable failure, budget, and success metric before looking at products.'},
      {label:'02 · Match',title:'Meet specialists built for the exact use case',copy:'AI7Lab curates relevant products and startup teams by capability, industry fit, integration needs, evidence, and enterprise readiness.'},
      {label:'03 · Validate',title:'Run one proof inside clear boundaries',copy:'Use a time-boxed evaluation with representative data, human controls, technical review, security requirements, and measurable exit criteria.'},
      {label:'04 · Industrialize',title:'Scale the winner—not the experiment',copy:'Harden architecture, identity, security, observability, integrations, cost controls, support ownership, and rollback before wider deployment.'},
    ],
    capabilities:[
      ['Curated innovation access','Reach specialized AI products across niche industries and workflows without scanning the entire market or managing dozens of unqualified conversations.'],
      ['Faster controlled proofs','Move from an operating problem to a bounded production-minded evaluation with clear evidence and no automatic long-term commitment.'],
      ['Enterprise proofing','AI7Lab reviews scalability, security, infrastructure, integrations, monitoring, failure paths, cost, and operational ownership.'],
      ['Customized delivery','Adapt workflows and interfaces to the organization instead of forcing every process into a broad, expensive software suite.'],
      ['Commercial efficiency','Test value before major license expansion; identify where focused solutions, owned workflows, or usage optimization can reduce recurring costs.'],
      ['Portfolio-to-platform path','Turn successful proofs into a governed enterprise AI pipeline with reusable identity, evaluation, monitoring, procurement, and deployment patterns.'],
    ],
    fit:['A named workflow with an accountable owner','Access to representative users and evidence','Willingness to run a bounded evaluation','A defined security, risk, and procurement path'],
    guardrails:['AI7Lab does not recommend automation without a measurable operational case.','A proof is not a promise of production approval.','Savings depend on the workflow, baseline, architecture, and commercial terms.','Security, legal, procurement, and decision authority remain governed by the enterprise.'],
  },
  'technology-providers': {
    slug:'technology-providers', nav:'Technology providers', icon:CloudCog, eyebrow:'For technology and infrastructure providers',
    title:'Reach a portfolio of builders through one qualified ecosystem.',
    description:'AI7Lab helps cloud, compute, storage, model, data, security, and hardware providers support multiple AI startups and enterprise proofs through a coordinated technical and commercial channel.',
    promise:'Replace fragmented one-off outreach with qualified workloads, shared enablement, measurable adoption, and clearer routes to future enterprise demand.',
    primaryCta:'Explore an ecosystem partnership', interest:'Technology provider partnership',
    outcomes:['Qualified startup and workload access','More efficient technical enablement','Earlier visibility into emerging demand','Joint pathways from startup proof to enterprise scale'],
    stages:[
      {label:'01 · Align',title:'Define where the platform creates advantage',copy:'Map the provider’s strongest services, ideal workloads, regions, technical constraints, program eligibility, and desired adoption outcomes.'},
      {label:'02 · Enable',title:'Equip a portfolio—not one startup at a time',copy:'Create repeatable onboarding, architecture guidance, credits pathways, office hours, reference patterns, and support routes for qualified builders.'},
      {label:'03 · Activate',title:'Connect infrastructure to real proofs',copy:'Match relevant startups and enterprise workflows to the provider, then measure activation, usage, performance, support needs, and expansion signals.'},
      {label:'04 · Grow',title:'Build future customers and category credibility',copy:'Develop joint case evidence, technical content, events, solution patterns, and co-selling pathways when the workload has proved real value.'},
    ],
    capabilities:[
      ['Portfolio access','Engage a curated group of AI builders and enterprise use cases through a single ecosystem relationship.'],
      ['Qualified workload matching','Prioritize teams whose architecture, stage, geography, and expected usage match the provider’s capabilities and program rules.'],
      ['Repeatable enablement','Deliver technical sessions, office hours, reference architectures, onboarding materials, and support patterns across multiple teams.'],
      ['Adoption intelligence','See recurring needs, architecture patterns, friction, usage signals, and emerging enterprise demand earlier.'],
      ['Joint market development','Create relevant workshops, proofs, technical narratives, and enterprise pathways around validated solutions rather than generic sponsorship.'],
      ['Responsible benefits routing','Help eligible teams navigate credits, hardware access, model programs, and technical support without representing third-party benefits as automatic.'],
    ],
    fit:['Cloud, compute, storage, data, security, model, or hardware capability','A clear startup or enterprise program','Technical enablement capacity','Interest in measurable adoption rather than logo collection'],
    guardrails:['Portfolio access does not imply guaranteed volume or spend.','Credits and benefits remain controlled by the issuing provider.','Startup and enterprise data is shared only under agreed permissions.','Joint selling begins only after technical and commercial fit is demonstrated.'],
  },
} as const

export const partnerAudienceList = Object.values(partnerPages)
