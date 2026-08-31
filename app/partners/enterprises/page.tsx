import type { Metadata } from 'next'
import { PartnerLanding } from '@/components/partner-landing'
import { partnerPages } from '@/lib/partnerships'
import { pageMetadata } from '@/lib/seo'
export const metadata:Metadata=pageMetadata({title:'Enterprise AI Partnerships',description:'Access curated AI products and specialist builders through governed proofs, enterprise hardening, and a faster path to production.',path:'/partners/enterprises',keywords:['enterprise AI partnership UAE','AI startup pilots enterprise','enterprise AI pipeline']})
export default function Page(){return <PartnerLanding page={partnerPages.enterprises}/>}
