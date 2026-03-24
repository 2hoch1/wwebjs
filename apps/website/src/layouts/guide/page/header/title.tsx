import { Pencil } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export function PageTitle({
  title,
  lastModified,
  badges,
  notice,
  githubUrl,
}: {
  title: string
  lastModified?: Date
  badges?: string[]
  notice?: string
  githubUrl?: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="scroll-m-24 text-3xl font-semibold tracking-tight">{title}</h1>
      <div className="flex items-center gap-1.5">
        <p className="text-sm text-muted-foreground">
          {lastModified
            ? `Last updated ${lastModified.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`
            : 'Last updated, not long ago'}
        </p>
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Edit on GitHub"
          >
            <Pencil className="size-3.5" />
          </a>
        )}
      </div>
      {!notice && badges && badges.length > 0 && (
        <div className="flex gap-1.5 mt-1">
          {badges.map(badge => (
            <Badge key={badge}>@{badge.charAt(0).toUpperCase() + badge.slice(1)}</Badge>
          ))}
        </div>
      )}
    </div>
  )
}
