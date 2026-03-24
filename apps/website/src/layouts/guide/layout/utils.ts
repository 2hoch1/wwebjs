import type { PageTreeFolder, PageTreeNode, PageTreePage } from '@/lib/page-tree'

export function hasActivePage(nodes: PageTreeNode[], pathname: string): boolean {
  for (const node of nodes) {
    if (node.type === 'page' && (node as PageTreePage).url === pathname) return true
    if (node.type === 'folder') {
      if (hasActivePage((node as PageTreeFolder).children as PageTreeNode[], pathname)) return true
    }
  }
  return false
}
