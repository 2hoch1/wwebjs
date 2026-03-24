import { notFound } from 'next/navigation'
import { findNeighbour } from 'fumadocs-core/page-tree'
import { getGithubLastEdit } from 'fumadocs-core/content/github'
import type { Metadata } from 'next'

import { getPageImage, legacySource } from '@/lib/source'
import { getPageCrumbs } from '@/lib/page-tree'
import { GuidePageContent, getSectionCrumb } from '@/layouts/guide'

export function generateStaticParams() {
  return legacySource.generateParams()
}

export async function generateMetadata(
  props: PageProps<'/guide/legacy/[[...slug]]'>
): Promise<Metadata> {
  const params = await props.params
  const page = legacySource.getPage(params.slug)
  if (!page) notFound()

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: { images: getPageImage(page).url },
  }
}

export default async function Page(props: PageProps<'/guide/legacy/[[...slug]]'>) {
  const params = await props.params
  const page = legacySource.getPage(params.slug)
  if (!page) notFound()

  const raw = (await page.data.getText?.('raw')) ?? ''
  const lastModified = await getGithubLastEdit({
    owner: 'wwebjs',
    repo: 'wwebjs',
    path: `apps/website/content/guide/legacy/${page.path}`,
    token: process.env.GITHUB_TOKEN,
  }).catch(() => page.data.lastModified)

  return (
    <GuidePageContent
      title={page.data.title}
      description={page.data.description}
      notice={page.data.notice}
      toc={page.data.toc}
      breadcrumbs={getPageCrumbs(legacySource.pageTree, page.url, getSectionCrumb('legacy'))}
      neighbours={findNeighbour(legacySource.pageTree, page.url)}
      lastModified={lastModified ?? undefined}
      badges={page.data.badges}
      markdownUrl={`/llms.mdx${page.url}`}
      page={raw}
      url={`https://wwebjs.dev${page.url}`}
      MDX={page.data.body}
    />
  )
}
