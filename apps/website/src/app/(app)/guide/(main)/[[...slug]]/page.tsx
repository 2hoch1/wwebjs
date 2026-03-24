import { notFound, redirect } from 'next/navigation'
import { findNeighbour } from 'fumadocs-core/page-tree'
import { getGithubLastEdit } from 'fumadocs-core/content/github'
import type { Metadata } from 'next'

import { getPageImage, source } from '@/lib/source'
import {
  getPageCrumbs,
  type PageTreeNode,
  type PageTreeFolder,
  type PageTreePage,
} from '@/lib/page-tree'
import { GuidePageContent, getSectionCrumb } from '@/layouts/guide'

function findFirstPageUnder(nodes: PageTreeNode[], prefix: string): string | null {
  for (const node of nodes) {
    if (node.type === 'page' && (node as PageTreePage).url.startsWith(prefix))
      return (node as PageTreePage).url
    if (node.type === 'folder') {
      const found = findFirstPageUnder((node as PageTreeFolder).children as PageTreeNode[], prefix)
      if (found) return found
    }
  }
  return null
}

export function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata(props: PageProps<'/guide/[[...slug]]'>): Promise<Metadata> {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) {
    const prefix = '/guide/' + (params.slug ?? []).join('/') + '/'
    const firstUrl = findFirstPageUnder(source.pageTree.children as PageTreeNode[], prefix)
    if (firstUrl) redirect(firstUrl)
    notFound()
  }

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: { images: getPageImage(page).url },
  }
}

export default async function Page(props: PageProps<'/guide/[[...slug]]'>) {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) {
    const prefix = '/guide/' + (params.slug ?? []).join('/') + '/'
    const firstUrl = findFirstPageUnder(source.pageTree.children as PageTreeNode[], prefix)
    if (firstUrl) redirect(firstUrl)
    notFound()
  }

  const raw = (await page.data.getText?.('raw')) ?? ''
  const lastModified = await getGithubLastEdit({
    owner: 'wwebjs',
    repo: 'wwebjs',
    path: `apps/website/content/guide/${page.path}`,
    token: process.env.GITHUB_TOKEN,
  }).catch(() => page.data.lastModified)

  return (
    <GuidePageContent
      title={page.data.title}
      description={page.data.description}
      notice={page.data.notice}
      toc={page.data.toc}
      breadcrumbs={getPageCrumbs(source.pageTree, page.url, getSectionCrumb('guide'))}
      neighbours={findNeighbour(source.pageTree, page.url)}
      lastModified={lastModified ?? undefined}
      badges={page.data.badges}
      markdownUrl={`/llms.mdx${page.url}`}
      githubUrl={`https://github.com/wwebjs/wwebjs/edit/main/apps/website/content/guide/${page.path}`}
      page={raw}
      url={`https://wwebjs.dev${page.url}`}
      MDX={page.data.body}
    />
  )
}
