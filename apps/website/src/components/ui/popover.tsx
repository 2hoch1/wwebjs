'use client'

import { Popover as Primitive } from '@base-ui/react/popover'
import { forwardRef, type ComponentPropsWithoutRef, type ComponentRef } from 'react'

import { cn } from '@/lib/utils'

const Popover = Primitive.Root
const PopoverTrigger = Primitive.Trigger
const PopoverClose = Primitive.Close

const PopoverContent = forwardRef<
  ComponentRef<typeof Primitive.Popup>,
  ComponentPropsWithoutRef<typeof Primitive.Popup> &
    Pick<Primitive.Positioner.Props, 'sideOffset' | 'align'>
>(({ className, align = 'start', sideOffset = 4, ...props }, ref) => (
  <Primitive.Portal>
    <Primitive.Positioner align={align} side="bottom" sideOffset={sideOffset} className="z-50">
      <Primitive.Popup
        ref={ref}
        className={s =>
          cn(
            'z-50 max-h-(--available-height) min-w-[200px] max-w-[98vw] origin-(--transform-origin) overflow-y-auto rounded-xl border bg-popover/80 p-1.5 text-sm text-popover-foreground shadow-lg backdrop-blur-lg focus-visible:outline-none data-[closed]:animate-out data-[closed]:fade-out-0 data-[closed]:zoom-out-95 data-[open]:animate-in data-[open]:fade-in-0 data-[open]:zoom-in-95',
            typeof className === 'function' ? className(s) : className
          )
        }
        {...props}
      />
    </Primitive.Positioner>
  </Primitive.Portal>
))
PopoverContent.displayName = 'PopoverContent'

export { Popover, PopoverTrigger, PopoverContent, PopoverClose }
