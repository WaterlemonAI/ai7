import type { Metadata } from 'next'
import { PartnerLanding } from '@/components/partner-landing'
import { partnerPages } from '@/lib/partnerships'
import { pageMetadata } from '@/lib/seo'
export const metadata:Metadata=pageMetadata({title:'Startup and Builder Partnerships',description:'AI7Lab helps AI startups and independent builders validate enterprise use cases, run governed evaluations, and build early commercial traction.',path:'/partners/builders',keywords:['AI startup partnership UAE','enterprise GTM for AI startups','startup enterprise customers Middle East']})
export default function Page(){return <PartnerLanding page={partnerPages.builders}/>}
