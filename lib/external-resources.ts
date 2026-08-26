export type ExternalResource = {
  title: string
  href: string
  description: string
}

export const vendorEyeUrl = 'https://www.vendoreye.ae'
export const vendorEyeBlogUrl = `${vendorEyeUrl}/blog`
export const taedUrl = 'https://taed.dev'

const vendorEyeGuides = {
  onboarding: {
    title: 'UAE Vendor Onboarding Checklist: Documents, Verification and Approvals',
    href: `${vendorEyeBlogUrl}/uae-vendor-onboarding-checklist-documents-verification-approvals`,
    description: 'A practical UAE guide to supplier evidence, verification, approvals, and activation controls.',
  },
  kyb: {
    title: 'KYB, UBO and AML Checks for UAE Vendors Explained',
    href: `${vendorEyeBlogUrl}/kyb-ubo-aml-checks-uae-vendors-explained`,
    description: 'How procurement teams can separate and document business, ownership, and sanctions checks.',
  },
  cybersecurity: {
    title: 'Third-Party Cybersecurity and Data Privacy Assessments in the UAE',
    href: `${vendorEyeBlogUrl}/third-party-cybersecurity-data-privacy-assessments-uae`,
    description: 'A risk-based approach to supplier security, privacy evidence, and contractual controls.',
  },
  prequalification: {
    title: 'Supplier Prequalification in the UAE: A Guide for Procurement Teams',
    href: `${vendorEyeBlogUrl}/supplier-prequalification-uae-guide`,
    description: 'How to qualify suppliers with proportionate questionnaires, evidence, scoring, and approvals.',
  },
  construction: {
    title: 'Construction Vendor Prequalification in the UAE',
    href: `${vendorEyeBlogUrl}/construction-vendor-prequalification-uae`,
    description: 'Enhanced due diligence for contractors, subcontractors, HSE, capacity, and project-specific risk.',
  },
  monitoring: {
    title: 'Negative and Adverse Media Screening in the UAE',
    href: `${vendorEyeBlogUrl}/adverse-media-screening-vendor-onboarding`,
    description: 'How to monitor supplier risk signals while controlling false positives and common-name matches.',
  },
  compliance: {
    title: 'Vendor Compliance in the UAE: The Complete Guide for Procurement Teams',
    href: `${vendorEyeBlogUrl}/uae-vendor-compliance-complete-guide`,
    description: 'A complete view of entry controls, lifecycle controls, and proportionate vendor compliance.',
  },
} satisfies Record<string, ExternalResource>

export const vendorEyeResourcesByInsight: Record<string, ExternalResource[]> = {
  'banking-third-party-risk-vendoreye': [vendorEyeGuides.kyb, vendorEyeGuides.cybersecurity, vendorEyeGuides.monitoring],
  'insurance-supplier-broker-governance-vendoreye': [vendorEyeGuides.compliance, vendorEyeGuides.kyb, vendorEyeGuides.monitoring],
  'government-procurement-supplier-intelligence-vendoreye': [vendorEyeGuides.onboarding, vendorEyeGuides.prequalification, vendorEyeGuides.compliance],
  'healthcare-supplier-credentialing-vendoreye': [vendorEyeGuides.prequalification, vendorEyeGuides.cybersecurity, vendorEyeGuides.compliance],
  'real-estate-contractor-vendor-risk-vendoreye': [vendorEyeGuides.construction, vendorEyeGuides.prequalification, vendorEyeGuides.monitoring],
  'logistics-carrier-supplier-monitoring-vendoreye': [vendorEyeGuides.monitoring, vendorEyeGuides.compliance, vendorEyeGuides.onboarding],
}

export function getVendorEyeGuideForTopic(topic: string): ExternalResource {
  const value = topic.toLowerCase()
  if (/cyber|privacy|data protection|pdpl/.test(value)) return vendorEyeGuides.cybersecurity
  if (/construction|contractor|real estate/.test(value)) return vendorEyeGuides.construction
  if (/aml|ubo|beneficial|kyb|sanction|third.party risk/.test(value)) return vendorEyeGuides.kyb
  if (/monitor|adverse|media|ongoing|reassess/.test(value)) return vendorEyeGuides.monitoring
  if (/prequal|assessment|score|qualification/.test(value)) return vendorEyeGuides.prequalification
  if (/onboard|registration|document|approval/.test(value)) return vendorEyeGuides.onboarding
  return vendorEyeGuides.compliance
}
