import type { Metadata } from 'next'
import { PartnerLanding } from '@/components/partner-landing'
import { partnerPages } from '@/lib/partnerships'
import { pageMetadata } from '@/lib/seo'
export const metadata:Metadata=pageMetadata({title:'Technology Provider Partnerships',description:'AI7Lab connects cloud, compute, data, model, security, storage, and hardware providers with qualified AI startups and enterprise workloads.',path:'/partners/technology-providers',keywords:['AI ecosystem partnership','cloud startup portfolio partnership','AI infrastructure partner UAE']})
export default function Page(){return <PartnerLanding page={partnerPages['technology-providers']}/>}
