import Image from 'next/image'
import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/ai7lab-logo.png"
      alt="AI7Lab"
      width={600}
      height={315}
      priority
      className={cn('h-8 w-auto', className)}
    />
  )
}
