import fs from 'node:fs'

const roadmap = fs.readFileSync('lib/editorial-roadmap.generated.ts', 'utf8')
const pillars = JSON.parse(roadmap.match(/export const editorialPillars = ([\s\S]+?) as const\s+export/)[1])
const articles = JSON.parse(roadmap.match(/export const editorialArticles = ([\s\S]+) as const\s*$/)[1])
const page = fs.readFileSync('app/insights/research/[slug]/page.tsx', 'utf8')
const index = fs.readFileSync('app/insights/page.tsx', 'utf8')
const sitemap = fs.readFileSync('app/sitemap.ts', 'utf8')
const llms = fs.readFileSync('lib/llms.ts', 'utf8')
const og = fs.readFileSync('app/insights/research/[slug]/opengraph-image.tsx', 'utf8')
const editorial = fs.readFileSync('lib/editorial.ts', 'utf8')

const stop = new Set('a an and are as at be by for from how in into is it of on or that the this to what when where which why with your'.split(' '))
const words = (value) => value.toLowerCase().replace(/[^a-z0-9\s-]/g, ' ').split(/\s+/).filter((word) => word.length > 2 && !stop.has(word))
const set = (value) => new Set(words(value))
const jaccard = (left, right) => {
  const intersection = [...left].filter((word) => right.has(word)).length
  const union = new Set([...left, ...right]).size
  return union ? intersection / union : 0
}
const focusPoints = (article) => {
  const sections = article.brief.replace(/\n+(?:\d+\.\s+|-\s*)?/g, '; ').split(';').map((item) => item.replace(/^(?:include|cover|discuss|explain):?\s*/i, '').trim()).filter((item) => item.length > 2)
  if (sections.length >= 3) return sections
  return article.brief.replace(/\n+(?:\d+\.\s+|-\s*)?/g, ', ').split(',').map((item) => item.replace(/^(?:include|cover|discuss|explain):?\s*/i, '').trim()).filter((item) => item.length > 2)
}
const description = (article) => `UAE and GCC guide to ${article.title.toLowerCase()}: ${(focusPoints(article)[0] || 'architecture, governance, risk, cost, and production implementation').replace(/[.:]+$/, '').toLowerCase()}.`.slice(0, 158)

const pageSignals = {
  canonical: page.includes("alternates: { canonical: path }"),
  staticGeneration: page.includes('generateStaticParams') && page.includes('editorialArticles.map'),
  blogPostingSchema: page.includes("'@type': 'BlogPosting'"),
  breadcrumbSchema: page.includes("'@type': 'BreadcrumbList'"),
  distinctOpenGraph: page.includes("const image = `${path}/opengraph-image`") && og.includes('new ImageResponse'),
  twitterCard: page.includes("card: 'summary_large_image'"),
  topicKeywords: page.includes('topicKeywords(article)'),
  articleAnalysis: page.includes('focusAnalysis(article)') && page.includes('Turning the brief into operating requirements'),
  authoritativeSources: page.includes('sourcesForArticle(article)') && page.includes('Research and standards'),
  referenceArchitecture: page.includes('Reference architecture'),
  buildBuyGuidance: page.includes('Build, buy, or combine?'),
  operationalControls: page.includes('Security, testing, cost, and operations'),
  implementationPath: page.includes('90-day path'),
  uniqueTakeaway: page.includes('shareTakeaway(article)'),
  internalClusterLinks: page.includes('getRelatedEditorial(article)') && page.includes('/insights#pillar-${article.pillar}'),
  voiceRealityBoxes: ['Economic reality', 'What remains difficult', 'Expected shelf life', 'Human fallback', 'Replaceability'].every((label) => page.includes(label)),
  productDisclosure: page.includes('AI7Lab builds {productName}') && page.includes('Product relationship and alternatives'),
  alternativesGuidance: page.includes('more suitable') && page.includes('more appropriate'),
  conversionActions: page.includes('Test one representative document with TAED') && page.includes('Map one complete supplier journey with VendorEye'),
  sitemapCoverage: sitemap.includes('editorialArticles.map') && sitemap.includes('/insights/research/${post.slug}'),
  llmDiscovery: llms.includes('editorialArticles.map') && llms.includes('/insights/research/${post.slug}'),
  indexCoverage: index.includes('editorialPillars.map') && index.includes('editorialArticles.filter'),
}

const titles = new Map()
const slugs = new Map()
const descriptions = new Map()
for (const article of articles) {
  titles.set(article.title, (titles.get(article.title) ?? 0) + 1)
  slugs.set(article.slug, (slugs.get(article.slug) ?? 0) + 1)
  const desc = description(article)
  descriptions.set(desc, (descriptions.get(desc) ?? 0) + 1)
}

const briefSets = articles.map((article) => set(`${article.title} ${article.brief}`))
const maxSimilarity = articles.map((_, indexA) => {
  let max = 0
  for (let indexB = 0; indexB < articles.length; indexB += 1) if (indexA !== indexB) max = Math.max(max, jaccard(briefSets[indexA], briefSets[indexB]))
  return max
})

const assetPaths = [...editorial.matchAll(/'\/insights\/pillars\/([^']+)'/g)].map((match) => `public/insights/pillars/${match[1]}`)
const assetCoverage = assetPaths.length === pillars.length && assetPaths.every((asset) => fs.existsSync(asset))

const results = articles.map((article, indexA) => {
  const points = focusPoints(article)
  const desc = description(article)
  const titleTerms = set(article.title)
  const briefTerms = set(article.brief)
  const topicalOverlap = [...titleTerms].filter((term) => briefTerms.has(term)).length
  const productArticle = article.pillar >= 12 && article.pillar <= 14

  const seo = 100
    - (article.title.length > 85 ? 2 : 0)
    - (desc.length < 95 || desc.length > 158 ? 3 : 0)
    - (titles.get(article.title) > 1 ? 15 : 0)
    - (descriptions.get(desc) > 1 ? 10 : 0)
    - (!pageSignals.canonical ? 15 : 0)
    - (!pageSignals.blogPostingSchema ? 10 : 0)
    - (!pageSignals.topicKeywords ? 8 : 0)
    - (!pageSignals.distinctOpenGraph ? 7 : 0)

  const searchability = 100
    - (!pageSignals.staticGeneration ? 20 : 0)
    - (!pageSignals.sitemapCoverage ? 20 : 0)
    - (!pageSignals.indexCoverage ? 15 : 0)
    - (!pageSignals.internalClusterLinks ? 15 : 0)
    - (!pageSignals.breadcrumbSchema ? 10 : 0)
    - (!pageSignals.llmDiscovery ? 5 : 0)
    - (slugs.get(article.slug) > 1 ? 30 : 0)

  const completeness = 100
    - (words(article.brief).length < 15 ? 5 : 0)
    - (points.length < 3 ? 6 : 0)
    - (!pageSignals.articleAnalysis ? 20 : 0)
    - (!pageSignals.referenceArchitecture ? 8 : 0)
    - (!pageSignals.buildBuyGuidance ? 6 : 0)
    - (!pageSignals.operationalControls ? 8 : 0)
    - (!pageSignals.implementationPath ? 6 : 0)
    - (!pageSignals.authoritativeSources ? 8 : 0)
    - (article.pillar === 11 && !pageSignals.voiceRealityBoxes ? 15 : 0)

  const relevance = 100
    - (topicalOverlap === 0 ? 5 : 0)
    - (words(`${article.title} ${article.imagePrompt}`).length < 7 ? 5 : 0)
    - (!assetCoverage ? 10 : 0)
    - (productArticle && !pageSignals.productDisclosure ? 15 : 0)
    - (productArticle && !pageSignals.alternativesGuidance ? 10 : 0)
    - (productArticle && !pageSignals.conversionActions ? 8 : 0)

  const uniqueness = 100
    - (maxSimilarity[indexA] > 0.80 ? 12 : maxSimilarity[indexA] > 0.68 ? 5 : 0)
    - (titles.get(article.title) > 1 ? 20 : 0)
    - (descriptions.get(desc) > 1 ? 15 : 0)
    - (!pageSignals.uniqueTakeaway ? 10 : 0)

  const overall = Math.round(seo * 0.27 + searchability * 0.20 + completeness * 0.23 + relevance * 0.18 + uniqueness * 0.12)
  return { number: article.number, slug: article.slug, seo, searchability, completeness, relevance, uniqueness, overall, focusPointCount: points.length, nearestBriefSimilarity: Number(maxSimilarity[indexA].toFixed(3)), status: overall >= 95 ? 'PASS' : 'REVISE' }
})

const metric = (name) => ({ min: Math.min(...results.map((item) => item[name])), average: Math.round(results.reduce((sum, item) => sum + item[name], 0) / results.length) })
const summary = {
  auditedAt: new Date().toISOString(),
  rubric: { seoWeight: 27, searchabilityWeight: 20, completenessWeight: 23, relevanceWeight: 18, uniquenessWeight: 12, passThreshold: 95 },
  inventory: { articleCount: articles.length, firstNumber: articles[0]?.number, lastNumber: articles.at(-1)?.number, continuousNumbering: articles.every((article, index) => article.number === index + 1), pillarCount: pillars.length, assetCoverage },
  passed: results.filter((item) => item.status === 'PASS').length,
  failed: results.filter((item) => item.status === 'REVISE').length,
  scores: { seo: metric('seo'), searchability: metric('searchability'), completeness: metric('completeness'), relevance: metric('relevance'), uniqueness: metric('uniqueness'), overall: metric('overall') },
  collectionChecks: { duplicateTitles: [...titles.values()].filter((count) => count > 1).length, duplicateSlugs: [...slugs.values()].filter((count) => count > 1).length, duplicateDescriptions: [...descriptions.values()].filter((count) => count > 1).length, maximumBriefSimilarity: Number(Math.max(...maxSimilarity).toFixed(3)) },
  pageSignals,
}

fs.mkdirSync('reports', { recursive: true })
fs.writeFileSync('reports/editorial-quality-audit.json', JSON.stringify({ summary, articles: results }, null, 2) + '\n')
console.log(JSON.stringify(summary, null, 2))
if (summary.failed || !summary.inventory.continuousNumbering || !summary.inventory.assetCoverage) process.exit(1)
