import { formatterSource } from '@/lib/source'
import { GuideShellLayout } from '@/layouts/guide'

export default function FormattersGuideLayout({ children }: { children: React.ReactNode }) {
  return <GuideShellLayout tree={formatterSource.pageTree}>{children}</GuideShellLayout>
}
