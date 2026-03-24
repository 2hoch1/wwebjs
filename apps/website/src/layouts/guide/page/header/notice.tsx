import { renderInline } from '@/lib/render-inline'

export function PageNotice({ notice, badges }: { notice: string; badges?: string[] }) {
  return (
    <div className="relative rounded-lg border border-border px-6 py-5">
      <div className="absolute -top-3 left-4 flex gap-1 bg-background px-2">
        {badges && badges.length > 0 ? (
          badges.map(badge => (
            <span
              key={badge}
              className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2.5 py-0.5 text-xs text-foreground/90"
            >
              <span className="text-foreground/90">@</span>
              {badge.charAt(0).toUpperCase() + badge.slice(1)}
            </span>
          ))
        ) : (
          <span className="inline-flex items-center py-0.5 text-xs text-foreground">Notice</span>
        )}
      </div>
      <p className="text-sm text-foreground">{renderInline(notice)}</p>
    </div>
  )
}
