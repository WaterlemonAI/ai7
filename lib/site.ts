import { taedUrl, vendorEyeUrl } from './external-resources'

export const siteUrl = 'https://www.ai7lab.net'
export const linkedInUrl = 'https://www.linkedin.com/company/ai7lab/'

export const nav = [
  { label: 'Products', href: '/products' },
  { label: 'Enterprise AI', href: '/enterprise-ai' },
  { label: 'Technology', href: '/technology' },
  { label: 'Insights', href: '/insights' },
  { label: 'Company', href: '/vision' },
]

export type Product = {
  name: string
  slug: string
  tagline: string
  description: string
  status: 'Live' | 'Beta' | 'Coming Soon'
  external: string
  linkedIn?: string
  logo: string
  points: string[]
}

export const products: Product[] = [
  {
    name: 'Vendoreye',
    slug: 'vendoreye',
    tagline: 'Supplier and Opportunity Intelligence',
    description:
      'See beyond the vendor. Vendoreye discovers, verifies, assesses, qualifies, and continuously monitors suppliers while building an evidence-backed vendor record for every decision.',
    status: 'Live',
    external: vendorEyeUrl,
    logo: '/logo-vendoreye.png',
    points: ['Autonomous vendor master', 'Evidence-based assessments', 'Bid intelligence', 'Continuous supplier monitoring'],
  },
  {
    name: 'rolefield.ai',
    slug: 'rolefield',
    tagline: 'End-to-End Customer Operations AI',
    description:
      'One operating layer for support, calling and call-centre operations, with in-person kiosk AI through Seer. RoleField handles conversations, actions, quality, escalation and operational visibility across the customer journey.',
    status: 'Live',
    external: 'https://www.rolefield.ai',
    linkedIn: 'https://www.linkedin.com/showcase/rolefield.ai/',
    logo: '/logo-rolefield.png',
    points: ['Support operations', 'Calling and call-centre operations', 'Seer kiosk AI', 'Quality, actions and human handoffs'],
  },
  {
    name: 'taed.dev',
    slug: 'taed',
    tagline: 'Structured Intelligence from Unstructured Media',
    description:
      'An AI7Lab-built tool for turning documents, images, video, and audio into schema-controlled outputs. Taed remains a supporting technology capability rather than a principal portfolio product.',
    status: 'Live',
    external: taedUrl,
    logo: '/logo-taed.png',
    points: ['Any-media understanding', 'Schema-controlled outputs', 'Versioned and monitored APIs', 'Reusable enterprise workflows'],
  },
]

export const statusStyles: Record<Product['status'], string> = {
  Live: 'bg-primary/15 text-primary border-primary/30',
  Beta: 'bg-secondary text-foreground border-border',
  'Coming Soon': 'bg-muted text-muted-foreground border-border',
}

export const capabilities = [
  {
    title: 'Visual Intelligence LLM',
    description: 'Understand documents, imagery, audio, and video and return structured intelligence through one model layer.',
  },
  {
    title: 'Speech-to-Speech Intelligence',
    description: 'Natural, low-latency multilingual voice interactions built for Arabic, English, and the GCC’s diverse languages.',
  },
  {
    title: 'Agentic Task Automation',
    description: 'Move beyond conversations with agents that qualify, schedule, follow up, update systems, and complete workflows.',
  },
  {
    title: 'AI Infrastructure & APIs',
    description: 'Expose research as secure, schema-controlled, versioned, and monitored production APIs.',
  },
  {
    title: 'Governance & Security',
    description: 'Design enterprise intelligence around traceability, policy controls, auditability, and responsible deployment.',
  },
  {
    title: 'Research-to-Product Engine',
    description: 'Combine technology research with continuous market research to build around validated enterprise pain.',
  },
]

export const industries = [
  { name: 'Banking', blurb: 'Document intelligence, customer operations, and governed workflow automation.' },
  { name: 'Insurance', blurb: 'Visual claims intelligence, voice-led service, and operational automation.' },
  { name: 'Government', blurb: 'Multilingual citizen experiences and accountable task orchestration.' },
  { name: 'Healthcare', blurb: 'Document workflows and natural, multilingual patient interactions.' },
  { name: 'Real Estate', blurb: 'Lead qualification, scheduling, follow-up, and document intelligence.' },
  { name: 'Logistics', blurb: 'Supplier trust, operations intelligence, and workflow coordination.' },
]

export type Announcement = {
  slug: string
  date: string
  category: 'Product' | 'Research' | 'Company' | 'Leadership'
  title: string
  summary: string
  href: string
  cta?: string
}

export const announcements: Announcement[] = [
  {
    slug: 'taed-crosses-1000-daily-api-calls',
    date: '2026-08-19',
    category: 'Product',
    title: 'taed.dev crosses 1,000 API calls per day',
    summary: 'taed.dev has passed the milestone of processing more than 1,000 API calls each day as teams use its visual intelligence infrastructure to turn documents and media into structured, production-ready data.',
    href: taedUrl,
    cta: 'Explore taed.dev APIs',
  },
  {
    slug: 'vendoreye-gcc-vendor-lifecycle-marketplace-launch',
    date: '2026-08-19',
    category: 'Product',
    title: 'Vendoreye launches a GCC-first vendor onboarding and lifecycle management portal',
    summary: 'Vendoreye brings vendor onboarding, due diligence, approvals, continuous lifecycle management, and a built-in vendor marketplace into one platform designed around GCC business requirements.',
    href: vendorEyeUrl,
    cta: 'Explore Vendoreye',
  },
  {
    slug: 'dr-riya-rawal-ai-research-leadership',
    date: '2026-08-19',
    category: 'Leadership',
    title: 'Dr. Riya Rawal joins AI7Lab to advance AI research and future products',
    summary: 'Dr. Rawal will strengthen the research foundations behind AI7Lab’s future products, connecting scientific rigour, responsible AI, and practical product development.',
    href: '/announcements/dr-riya-rawal-ai7lab-profile.pdf',
    cta: 'Read the leadership profile',
  },
  {
    slug: 'rolefield-launch',
    date: '2026-08-18',
    category: 'Product',
    title: 'rolefield.ai launches a voice-led AI workforce for the GCC',
    summary: 'AI7Lab’s in-house speech-to-speech research now powers multilingual agents that converse, act, and complete customer workflows.',
    href: 'https://www.rolefield.ai',
  },
  {
    slug: 'research-to-production',
    date: '2026-08-18',
    category: 'Research',
    title: 'One intelligence layer, multiple enterprise products',
    summary: 'Our visual intelligence, voice, and agentic automation research is becoming reusable infrastructure beneath taed.dev, Vendoreye, and rolefield.ai.',
    href: '/technology',
  },
  {
    slug: 'commercial-leadership-hiring',
    date: '2026-08-18',
    category: 'Leadership',
    title: 'AI7Lab is hiring two commercial leaders in the UAE',
    summary: 'We are opening searches for a Head of Sales for Vendoreye and a Head of Partnerships for taed.dev.',
    href: '/careers',
  },
]

export type TeamMember = {
  name: string
  role: string
  focus: string
  bio: string
  photo?: string
  photoPosition?: string
}

export const team: TeamMember[] = [
  {
    name: 'Arbaz Uddin',
    photo: '/team/arbaz-uddin.jpg',
    role: 'Product & Go-to-Market',
    focus: 'Product · GTM · Enterprise',
    bio: 'Leads enterprise product strategy, sales, partnerships, and GCC market execution.',
  },
  {
    name: 'Dr. Riya Rawal',
    photo: '/team/dr-riya-rawal.jpg',
    role: 'AI Research',
    focus: 'Research · Models · Intelligence',
    bio: 'Advances AI7Lab’s model research and turns new intelligence capabilities into product foundations.',
  },
  {
    name: 'Taha Siddiqui',
    photo: '/team/taha-siddiqui.jpeg',
    photoPosition: 'center 18%',
    role: 'Product & Technology Lead',
    focus: 'Product · Technology · Delivery',
    bio: 'Leads product and technology across AI7Lab, turning operational problems into clear product direction and production-ready systems.',
  },
  {
    name: 'Zainab Khan',
    photo: '/team/zainab-khan.jpg',
    role: 'Product & Operations',
    focus: 'Product · Customer · Operations',
    bio: 'Works across product delivery, customer operations, and the feedback loops that shape AI7Lab products.',
  },
  {
    name: 'Vikram Kapoor',
    photo: '/team/vikram-kapoor.jpeg',
    role: 'Sales & Partnership Lead',
    focus: 'Sales · Partnerships · Growth',
    bio: 'Leads sales and partnerships, connecting organisations and ecosystem partners with the right AI7Lab products and delivery path.',
  },
  {
    name: 'Saddam Rajput',
    photo: '/team/saddam-rajput.jpeg',
    role: 'CTO — RoleField',
    focus: 'Architecture · Engineering · Scale',
    bio: 'Leads RoleField’s technology direction across support, calling, call-centre operations, and Seer kiosk AI.',
  },
]

export type Job = {
  slug: string
  title: string
  product: string
  location: string
  salaryMin: number
  salaryMax: number
  summary: string
  responsibilities: string[]
  requirements: string[]
}

export const jobs: Job[] = [
  {
    slug: 'head-of-sales-vendoreye',
    title: 'Head of Sales — Vendoreye',
    product: 'Vendoreye',
    location: 'United Arab Emirates',
    salaryMin: 15000,
    salaryMax: 20000,
    summary: 'Own Vendoreye’s enterprise sales motion across the UAE and turn procurement and supplier-risk conversations into durable customer relationships.',
    responsibilities: ['Build and own the UAE enterprise pipeline', 'Lead discovery, demos, proposals, and commercial negotiation', 'Develop sector-specific sales plays with product and leadership', 'Carry customer signal back into the product roadmap'],
    requirements: ['Enterprise SaaS or procurement-technology sales experience', 'Strong UAE network and consultative selling capability', 'Comfort selling into complex, regulated organizations', 'Builder mindset suited to an early-stage product company'],
  },
  {
    slug: 'head-of-partnerships-taed',
    title: 'Head of Partnerships — taed.dev',
    product: 'taed.dev',
    location: 'United Arab Emirates',
    salaryMin: 15000,
    salaryMax: 20000,
    summary: 'Build the partner ecosystem that takes taed.dev’s visual intelligence API infrastructure into enterprise workflows across the UAE.',
    responsibilities: ['Develop technology, channel, and strategic partnerships', 'Create joint solutions and go-to-market motions', 'Identify high-value visual-intelligence use cases', 'Coordinate partner feedback across research, product, and engineering'],
    requirements: ['Partnerships or business-development experience in enterprise technology', 'Understanding of AI, APIs, or systems integration', 'Strong UAE ecosystem relationships', 'Ability to translate technical capability into commercial value'],
  },
]

export function getJob(slug: string) {
  return jobs.find((job) => job.slug === slug)
}
