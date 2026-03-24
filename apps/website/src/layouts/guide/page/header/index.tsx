import { CopyPage } from './page-actions'
import { PageBreadcrumb } from './breadcrumb'
import { PageTitle } from './title'
import { PageNotice } from './notice'
import { PrevIconButton, NextIconButton } from '../next-page'
import type { CrumbSegment } from '@/lib/page-tree'

type Neighbour = { url: string; name: React.ReactNode } | undefined

type PageHeaderProps = {
  title: string
  description?: string
  notice?: string
  lastModified?: Date
  badges?: string[]
  breadcrumbs: CrumbSegment[]
  neighbours: { previous?: Neighbour; next?: Neighbour }
  page: string
  url: string
  markdownUrl: string
  githubUrl?: string
}

export function PageHeader({
  title,
  description,
  notice,
  lastModified,
  badges,
  breadcrumbs,
  neighbours,
  page,
  url,
  markdownUrl,
  githubUrl,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-10 pb-1">
      <div className="flex items-center justify-between pb-5">
        <PageBreadcrumb crumbs={breadcrumbs} />
        <div className="flex items-center gap-1.5">
          <div className="hidden sm:block">
            <CopyPage page={page} url={url} markdownUrl={markdownUrl} />
          </div>
          <div className="flex gap-1.5">
            {neighbours.previous && <PrevIconButton url={neighbours.previous.url} />}
            {neighbours.next && <NextIconButton url={neighbours.next.url} />}
          </div>
        </div>
      </div>
      <PageTitle
        title={title}
        lastModified={lastModified}
        badges={badges}
        notice={notice}
        githubUrl={githubUrl}
      />
      {notice && <PageNotice notice={notice} badges={badges} />}
      {description && <p className="text-default text-foreground">{description}</p>}
    </div>
  )
}
