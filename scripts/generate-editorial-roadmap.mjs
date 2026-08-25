import fs from 'node:fs'

const inputs = process.argv.slice(2, -1)
const output = process.argv.at(-1)
if (!inputs.length || !output) throw new Error('Usage: node script source... output')

const pillarAliases = new Map([
  ['TAED content cluster', { number: 13, title: 'TAED document intelligence and extraction infrastructure' }],
  ['VendorEye content cluster', { number: 14, title: 'VendorEye procurement, supplier evidence, and governance' }],
])

const parsed = inputs.map((source) => {
  const text = fs.readFileSync(source, 'utf8')
  const sections = [...text.matchAll(/^## (.+)$/gm)].map((match) => {
    const numbered = match[1].match(/^Pillar (\d+) — (.+)$/)
    const pillar = numbered ? { number: Number(numbered[1]), title: numbered[2] } : pillarAliases.get(match[1])
    return pillar ? { ...pillar, index: match.index } : null
  }).filter(Boolean)
  const articles = [...text.matchAll(/^### (\d+)\. (.+)\n([\s\S]*?)(?=\n### |\n## |(?![\s\S]))/gm)].map((match) => {
    const pillar = [...sections].reverse().find((item) => item.index < match.index)
    if (!pillar) throw new Error(`No pillar found for article ${match[1]} in ${source}`)
    const details = match[3].match(/(?:^|\n)Include: ([\s\S]*?)\n\nImage: ([\s\S]*?)\s*$/)
    if (!details) throw new Error(`Missing Include/Image fields for article ${match[1]} in ${source}`)
    const title = match[2].trim()
    return { number: Number(match[1]), pillar: pillar.number, title, brief: details[1].trim(), imagePrompt: details[2].trim(), slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') }
  })
  return { pillars: sections.map(({ index, ...pillar }) => pillar), articles }
})

const pillars = [...new Map(parsed.flatMap((item) => item.pillars).map((pillar) => [pillar.number, pillar])).values()].sort((a, b) => a.number - b.number)
const articles = parsed.flatMap((item) => item.articles).sort((a, b) => a.number - b.number)
if (articles.length !== 155) throw new Error(`Expected 155 supplied articles, found ${articles.length}`)
if (new Set(articles.map((article) => article.number)).size !== articles.length) throw new Error('Duplicate article number')
if (new Set(articles.map((article) => article.slug)).size !== articles.length) throw new Error('Duplicate article slug')

const banner = '// Generated from the approved AI7Lab editorial roadmap. Do not edit by hand.\n'
fs.writeFileSync(output, `${banner}export const editorialPillars = ${JSON.stringify(pillars, null, 2)} as const\n\nexport const editorialArticles = ${JSON.stringify(articles, null, 2)} as const\n`)
