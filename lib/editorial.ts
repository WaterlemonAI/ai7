import { editorialArticles, editorialPillars } from '@/lib/editorial-roadmap.generated'
import { taedUrl, vendorEyeUrl } from '@/lib/external-resources'

export { editorialArticles, editorialPillars }

export const pillarAssets = [
  '/insights/pillars/enterprise-strategy-line-art.png', '/insights/pillars/data-platforms-line-art.png',
  '/insights/pillars/computer-vision-line-art.png', '/insights/pillars/open-models-line-art.png',
  '/insights/pillars/proprietary-models-line-art.png', '/insights/pillars/voice-ai-line-art.png',
  '/insights/pillars/rag-knowledge-line-art.png', '/insights/pillars/vendor-neutral-line-art.png',
  '/insights/pillars/evaluation-operations-line-art.png', '/insights/pillars/governance-adoption-line-art.png',
  '/insights/pillars/voice-reality-line-art.png', '/insights/pillars/ai-products-proprietary-ip-line-art.png',
  '/insights/pillars/taed-document-intelligence-line-art.png', '/insights/pillars/vendoreye-procurement-line-art.png',
] as const

export const editorialSources = [
  { title: 'UAE National Strategy for Artificial Intelligence 2031', publisher: 'UAE Government', url: 'https://ai.gov.ae/strategy/' },
  { title: 'UAE federal legislation portal', publisher: 'UAE Cabinet', url: 'https://uaelegislation.gov.ae/en' },
  { title: 'AI Risk Management Framework', publisher: 'NIST', url: 'https://www.nist.gov/itl/ai-risk-management-framework' },
  { title: 'Generative AI Profile — NIST AI 600-1', publisher: 'NIST', url: 'https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence' },
  { title: 'Top 10 for LLM and GenAI', publisher: 'OWASP GenAI Security Project', url: 'https://genai.owasp.org/initiatives/top-10-for-llm-and-genai/' },
  { title: 'TAED document intelligence APIs', publisher: 'TAED', url: taedUrl },
  { title: 'VendorEye supplier intelligence platform', publisher: 'VendorEye', url: vendorEyeUrl },
] as const

export type EditorialArticle = (typeof editorialArticles)[number]

export function getEditorialArticle(slug: string) { return editorialArticles.find((article) => article.slug === slug) }
export function getPillar(article: EditorialArticle) { return editorialPillars.find((pillar) => pillar.number === article.pillar)! }
export function getPillarImage(pillar: number) { return pillarAssets[pillar - 1] }
export function getRelatedEditorial(article: EditorialArticle) {
  const cluster = editorialArticles.filter((item) => item.pillar === article.pillar)
  const index = cluster.findIndex((item) => item.slug === article.slug)
  return [-1, 1, 2].map((offset) => cluster[(index + offset + cluster.length) % cluster.length]).filter((item, itemIndex, items) => item.slug !== article.slug && items.findIndex((candidate) => candidate.slug === item.slug) === itemIndex)
}

export function sourcesForArticle(article: EditorialArticle) {
  const standards = editorialSources.slice(0, 5)
  if (article.pillar === 13) return [...standards, editorialSources[5]]
  if (article.pillar === 14) return [...standards, editorialSources[6]]
  if (article.pillar === 12) return editorialSources
  return standards
}

export function primaryKeyword(article: EditorialArticle) {
  const base = article.title.replace(/[:?]/g, '').replace(/\b(the|a|an|how|what|why|when|your|its|for)\b/gi, '').replace(/\s+/g, ' ').trim().toLowerCase()
  return `${base} UAE`
}

export function topicKeywords(article: EditorialArticle) {
  const pillarTerms: Record<number, string[]> = {
    1: ['enterprise AI strategy UAE', 'AI transformation GCC'],
    2: ['enterprise data platform UAE', 'AI analytics GCC'],
    3: ['computer vision UAE', 'image processing AI GCC'],
    4: ['open source LLM UAE', 'private LLM GCC'],
    5: ['proprietary AI models UAE', 'Arabic AI model'],
    6: ['voice AI UAE', 'Arabic voice agents GCC'],
    7: ['enterprise RAG UAE', 'Arabic knowledge assistant'],
    8: ['vendor neutral AI platform', 'enterprise AI architecture GCC'],
    9: ['AI evaluation framework', 'LLM observability UAE'],
    10: ['AI governance UAE', 'responsible AI GCC'],
    11: ['voice agent economics', 'contact centre AI UAE'],
    12: ['AI intellectual property UAE', 'TAED VendorEye'],
    13: ['document intelligence UAE', 'Arabic English OCR API', 'TAED'],
    14: ['vendor management software UAE', 'procurement platform GCC', 'VendorEye'],
  }
  return [primaryKeyword(article), ...(pillarTerms[article.pillar] ?? []), 'enterprise AI UAE', 'artificial intelligence GCC']
}

export function articleDescription(article: EditorialArticle) {
  const first = focusPoints(article)[0]?.replace(/[.:]+$/, '').toLowerCase()
  return `UAE and GCC guide to ${article.title.toLowerCase()}: ${first || 'architecture, governance, risk, cost, and production implementation'}.`.slice(0, 158)
}

export function focusPoints(article: EditorialArticle) {
  const sections = article.brief
    .replace(/\n+(?:\d+\.\s+|-\s*)?/g, '; ')
    .split(';')
    .map((item) => item.replace(/^(?:include|cover|discuss|explain):?\s*/i, '').trim())
    .filter((item) => item.length > 2)
  if (sections.length >= 3) return sections
  return article.brief
    .replace(/\n+(?:\d+\.\s+|-\s*)?/g, ', ')
    .split(',')
    .map((item) => item.replace(/^(?:include|cover|discuss|explain):?\s*/i, '').trim())
    .filter((item) => item.length > 2)
}

export function articleImageAlt(article: EditorialArticle) {
  return `${article.title}. Editorial concept: ${article.imagePrompt}`
}

const analysisPatterns = [
  { match: /cost|price|margin|roi|economic|saving|revenue/i, copy: 'Establish the baseline, include failure and human-review costs, and express the result per completed and correct business outcome. Sensitivity-test the assumptions before using the figure for procurement or investment.' },
  { match: /security|privacy|encryption|malware|tenant|access|identity|sensitive/i, copy: 'Convert this into explicit controls: data classification, least privilege, isolation, retention, audit evidence, incident ownership, and tested recovery. A policy statement without runtime evidence is not a production control.' },
  { match: /test|evaluation|confidence|quality|accuracy|error|failure|wrong/i, copy: 'Define representative normal, edge, multilingual, adversarial, and failure cases. Set thresholds by business consequence, preserve the evidence behind each result, and prevent aggregate accuracy from hiding critical-field failures.' },
  { match: /integrat|api|crm|erp|queue|workflow|tool|system|storage/i, copy: 'Specify the contract, identity boundary, timeout, retry, idempotency, reconciliation, and rollback behaviour. The integration is complete only when partial failure is observable and the business record remains consistent.' },
  { match: /human|review|approval|confirm|correction|authority|decision/i, copy: 'Name the accountable role, the evidence they see, the actions they may take, and the reason captured in history. Human involvement should be a designed control with service levels—not an undefined exception queue.' },
  { match: /arabic|english|dialect|multilingual|code-switch/i, copy: 'Evaluate Arabic, English, mixed-language, transliterated, and locally representative cases separately. Report coverage and failure patterns by language context rather than presenting one blended quality number.' },
  { match: /document|ocr|schema|field|licen[cs]e|extraction/i, copy: 'Preserve the source artifact, document type, schema version, extracted field, confidence, correction, and verification state as separate facts. Downstream systems should consume verified business fields, not an undifferentiated text dump.' },
  { match: /vendor|supplier|procurement|sourcing|bid|contract/i, copy: 'Tie the requirement to one governed supplier identity, the supporting evidence, buyer-specific rules, approval authority, and renewal lifecycle. Avoid turning a recommendation into an unexplained procurement decision.' },
  { match: /voice|call|speech|telephony|turn-taking|audio/i, copy: 'Test this on real telephone networks with noise, interruptions, accents, code-switching, tool failures, and human transfer. Measure completed and correct outcomes, repeat calls, latency, and caller recovery—not conversational fluency alone.' },
]

export function focusAnalysis(article: EditorialArticle) {
  return focusPoints(article).map((point, index) => {
    const pattern = analysisPatterns.find((candidate) => candidate.match.test(point))
    const fallback = 'Translate this theme into an owner, measurable acceptance criterion, representative evidence, operational control, and a stop or escalation condition before implementation begins.'
    return {
      heading: point.replace(/[.:]+$/, ''),
      analysis: `For ${article.title}, this matters because ${point.charAt(0).toLowerCase()}${point.slice(1).replace(/[.:]+$/, '')}. ${pattern?.copy ?? fallback}`,
      proof: `Evidence to request: a named owner, a baseline, a test case, an exception path, and a recorded decision for this requirement.`,
      index,
    }
  })
}

export function shareTakeaway(article: EditorialArticle) {
  const point = focusPoints(article)[0]?.replace(/[.:]+$/, '').toLowerCase()
  return `${article.title.replace(/[?]/g, '')}: the durable advantage comes from turning ${point || 'the proposed capability'} into a measurable, governed workflow—not from the model or demo alone.`
}
