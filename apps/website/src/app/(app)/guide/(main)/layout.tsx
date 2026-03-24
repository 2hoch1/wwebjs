import { source } from '@/lib/source'
import { GuideShellLayout } from '@/layouts/guide'

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return <GuideShellLayout tree={source.pageTree}>{children}</GuideShellLayout>
}
