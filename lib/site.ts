import { taedUrl, vendorEyeUrl } from './external-resources'

export const siteUrl = 'https://www.ai7lab.net'
export const linkedInUrl = 'https://www.linkedin.com/company/ai7lab/'

export const nav = [
  { label: 'Vision', href: '/vision' },
  { label: 'Products', href: '/products' },
  { label: 'Partner', href: '/partners' },
  { label: 'Technology', href: '/technology' },
  { label: 'Insights', href: '/insights' },
  { label: 'Announcements', href: '/announcements' },
  { label: 'Careers', href: '/careers' },
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
    name: 'Taed',
    slug: 'taed',
    tagline: 'Production-Grade Visual Intelligence APIs',
    description:
      'Turn documents, images, video, and audio into structured, versioned, monitored APIs. Taed packages AI7Lab’s visual intelligence research into schema-controlled infrastructure teams can take to production.',
    status: 'Live',
    external: taedUrl,
    logo: '/logo-taed.png',
    points: ['Any-media understanding', 'Schema-controlled outputs', 'Versioned and monitored APIs', 'Reusable enterprise workflows'],
  },
  {
    name: 'VendorEye',
    slug: 'vendoreye',
    tagline: 'Supplier Intelligence from First Contact to Governance',
    description:
      'See beyond the vendor. VendorEye discovers, verifies, assesses, qualifies, and continuously monitors suppliers while building an evidence-backed vendor record for every decision.',
    status: 'Live',
    external: vendorEyeUrl,
    logo: '/logo-vendoreye.png',
    points: ['Autonomous vendor master', 'Evidence-based assessments', 'Bid intelligence', 'Continuous supplier monitoring'],
  },
  {
    name: 'RoleField.ai',
    slug: 'rolefield',
    tagline: 'A Multilingual AI Workforce for the GCC',
    description:
      'Voice-led AI agents that understand intent, hold natural conversations, and complete the work after every interaction—from qualification and scheduling to follow-up, CRM updates, and human handoffs.',
    status: 'Live',
    external: 'https://www.rolefield.ai',
    linkedIn: 'https://www.linkedin.com/showcase/rolefield.ai/',
    logo: '/logo-rolefield.png',
    points: ['In-house speech-to-speech architecture', 'Arabic-native and multilingual', 'Goal-based task automation', 'CRM actions and human handoffs'],
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
    title: 'Taed crosses 1,000 API calls per day',
    summary: 'Taed has passed the milestone of processing more than 1,000 API calls each day as teams use its visual intelligence infrastructure to turn documents and media into structured, production-ready data.',
    href: taedUrl,
    cta: 'Explore Taed APIs',
  },
  {
    slug: 'vendoreye-gcc-vendor-lifecycle-marketplace-launch',
    date: '2026-08-19',
    category: 'Product',
    title: 'VendorEye launches a GCC-first vendor onboarding and lifecycle management portal',
    summary: 'VendorEye brings vendor onboarding, due diligence, approvals, continuous lifecycle management, and a built-in vendor marketplace into one platform designed around GCC business requirements.',
    href: vendorEyeUrl,
    cta: 'Explore VendorEye',
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
    title: 'RoleField.ai launches a voice-led AI workforce for the GCC',
    summary: 'AI7Lab’s in-house speech-to-speech research now powers multilingual agents that converse, act, and complete customer workflows.',
    href: 'https://www.rolefield.ai',
  },
  {
    slug: 'research-to-production',
    date: '2026-08-18',
    category: 'Research',
    title: 'One intelligence layer, multiple enterprise products',
    summary: 'Our visual intelligence, voice, and agentic automation research is becoming reusable infrastructure beneath Taed, VendorEye, and RoleField.',
    href: '/technology',
  },
  {
    slug: 'commercial-leadership-hiring',
    date: '2026-08-18',
    category: 'Leadership',
    title: 'AI7Lab is hiring two commercial leaders in the UAE',
    summary: 'We are opening searches for a Head of Sales for VendorEye and a Head of Partnerships for Taed.',
    href: '/careers',
  },
]

export type TeamMember = {
  name: string
  role: string
  focus: string
  bio: string
  linkedin?: string
}

export const team: TeamMember[] = [
  {
    name: 'Arbaz Uddin',
    role: 'Product & Go-to-Market',
    focus: 'Product · GTM · Enterprise',
    bio: 'Leads enterprise product strategy, sales, partnerships, and GCC market execution.',
    linkedin: 'https://www.linkedin.com/in/arbazdxb',
  },
  {
    name: 'Dr. Riya Rawal',
    role: 'AI Research',
    focus: 'Research · Models · Intelligence',
    bio: 'Advances AI7Lab’s model research and turns new intelligence capabilities into product foundations.',
    linkedin: 'https://www.linkedin.com/in/riya-rawal-93838044',
  },
  {
    name: 'Sazid',
    role: 'Technology Lead',
    focus: 'Architecture · Engineering · Scale',
    bio: 'Leads platform architecture and the engineering systems that move research into reliable production software.',
  },
  {
    name: 'Zainab Khan',
    role: 'Product & Operations',
    focus: 'Product · Customer · Operations',
    bio: 'Works across product delivery, customer operations, and the feedback loops that shape AI7Lab products.',
    linkedin: 'https://www.linkedin.com/in/zainabk01',
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
    title: 'Head of Sales — VendorEye',
    product: 'VendorEye',
    location: 'United Arab Emirates',
    salaryMin: 15000,
    salaryMax: 20000,
    summary: 'Own VendorEye’s enterprise sales motion across the UAE and turn procurement and supplier-risk conversations into durable customer relationships.',
    responsibilities: ['Build and own the UAE enterprise pipeline', 'Lead discovery, demos, proposals, and commercial negotiation', 'Develop sector-specific sales plays with product and leadership', 'Carry customer signal back into the product roadmap'],
    requirements: ['Enterprise SaaS or procurement-technology sales experience', 'Strong UAE network and consultative selling capability', 'Comfort selling into complex, regulated organizations', 'Builder mindset suited to an early-stage product company'],
  },
  {
    slug: 'head-of-partnerships-taed',
    title: 'Head of Partnerships — Taed',
    product: 'Taed',
    location: 'United Arab Emirates',
    salaryMin: 15000,
    salaryMax: 20000,
    summary: 'Build the partner ecosystem that takes Taed’s visual intelligence API infrastructure into enterprise workflows across the UAE.',
    responsibilities: ['Develop technology, channel, and strategic partnerships', 'Create joint solutions and go-to-market motions', 'Identify high-value visual-intelligence use cases', 'Coordinate partner feedback across research, product, and engineering'],
    requirements: ['Partnerships or business-development experience in enterprise technology', 'Understanding of AI, APIs, or systems integration', 'Strong UAE ecosystem relationships', 'Ability to translate technical capability into commercial value'],
  },
]

export function getJob(slug: string) {
  return jobs.find((job) => job.slug === slug)
}
