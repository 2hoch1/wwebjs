'use client'

import { createContext, useContext, useState } from 'react'
import type { HTMLAttributes, ReactNode } from 'react'

interface CollapsibleProps {
  children: ReactNode
  className?: ((state: boolean) => string) | string
  defaultOpen?: boolean
}

interface CollapsibleTriggerProps {
  children: ReactNode
  className?: string
}

interface CollapsibleContentProps {
  children: ReactNode
}

const CollapsibleContext = createContext<{
  open: boolean
  setOpen: (open: boolean) => void
} | null>(null)

function useCollapsible() {
  const context = useContext(CollapsibleContext)
  if (!context) {
    throw new Error('Collapsible components must be used within a Collapsible')
  }
  return context
}

export function Collapsible({
  children,
  className,
  defaultOpen = false,
  ...props
}: CollapsibleProps & HTMLAttributes<HTMLDivElement>) {
  const [open, setOpen] = useState(defaultOpen)

  const classNameValue =
    typeof className === 'function' ? (className as (state: boolean) => string)(open) : className

  return (
    <CollapsibleContext.Provider value={{ open, setOpen }}>
      <div className={classNameValue} {...props}>
        {children}
      </div>
    </CollapsibleContext.Provider>
  )
}

export function CollapsibleTrigger({
  children,
  className,
  ...props
}: CollapsibleTriggerProps & HTMLAttributes<HTMLButtonElement>) {
  const { open, setOpen } = useCollapsible()

  return (
    <button className={className} onClick={() => setOpen(!open)} {...props}>
      {children}
    </button>
  )
}

export function CollapsibleContent({ children }: CollapsibleContentProps) {
  const { open } = useCollapsible()

  if (!open) return null

  return <>{children}</>
}
