import { PrevPageButton, NextPageButton } from '../next-page'
import { PageRating } from '@/components/rating'

type Neighbour = { url: string; name: React.ReactNode } | undefined

type PageFooterProps = {
  neighbours: { previous?: Neighbour; next?: Neighbour }
  url: string
}

export function PageFooter({ neighbours, url }: PageFooterProps) {
  return (
    <div className="hidden h-16 w-full items-center justify-between px-4 sm:flex sm:px-0">
      <div>
        {neighbours.previous && (
          <PrevPageButton url={neighbours.previous.url} name={neighbours.previous.name} />
        )}
      </div>
      <PageRating pageUrl={url} />
      <div>
        {neighbours.next && (
          <NextPageButton
            url={neighbours.next.url}
            name={neighbours.next.name}
            hasPrev={!!neighbours.previous}
          />
        )}
      </div>
    </div>
  )
}
