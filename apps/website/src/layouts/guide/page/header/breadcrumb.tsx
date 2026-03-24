import React from 'react'
import Link from 'next/link'

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import type { CrumbSegment } from '@/lib/page-tree'

function renderSegment(seg: CrumbSegment) {
  switch (seg.type) {
    case 'link':
      return (
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link href={seg.url} />}>{seg.name}</BreadcrumbLink>
        </BreadcrumbItem>
      )
    case 'label':
      return (
        <BreadcrumbItem>
          <span data-slot="breadcrumb-label">{seg.name}</span>
        </BreadcrumbItem>
      )
    case 'page':
      return (
        <BreadcrumbItem>
          <BreadcrumbPage>{seg.name}</BreadcrumbPage>
        </BreadcrumbItem>
      )
    case 'ellipsis':
      return (
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
      )
  }
}

export function PageBreadcrumb({ crumbs }: { crumbs: CrumbSegment[] }) {
  if (!crumbs.length) return null

  return (
    <Breadcrumb className="cursor-default">
      <BreadcrumbList>
        {crumbs.map((seg, i) => (
          <React.Fragment key={i}>
            {i > 0 && <BreadcrumbSeparator />}
            {renderSegment(seg)}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
