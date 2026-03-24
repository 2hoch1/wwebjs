import { legacySource } from '@/lib/source'
import { GuideShellLayout } from '@/layouts/guide'

export default function LegacyGuideLayout({ children }: { children: React.ReactNode }) {
  return <GuideShellLayout tree={legacySource.pageTree}>{children}</GuideShellLayout>
}
