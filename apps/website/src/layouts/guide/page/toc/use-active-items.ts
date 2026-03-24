'use client'

import { useState, useEffect } from 'react'

export function smoothScroll(el: HTMLElement, target: number, rafRef: { current: number }) {
  cancelAnimationFrame(rafRef.current)
  const start = el.scrollTop
  const distance = target - start
  if (Math.abs(distance) < 1) return
  const duration = 480
  const startTime = performance.now()

  function ease(t: number) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
  }

  function step(now: number) {
    const progress = Math.min((now - startTime) / duration, 1)
    el.scrollTop = start + distance * ease(progress)
    if (progress < 1) rafRef.current = requestAnimationFrame(step)
  }

  rafRef.current = requestAnimationFrame(step)
}

export function useActiveItems(itemIds: string[]) {
  const [activeIds, setActiveIds] = useState<string[]>(itemIds[0] ? [itemIds[0]] : [])

  useEffect(() => {
    if (itemIds.length === 0) return

    const visible = new Set<string>()

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.add(entry.target.id)
          } else {
            visible.delete(entry.target.id)
          }
        }

        if (visible.size > 0) {
          setActiveIds(itemIds.filter(id => visible.has(id)))
          return
        }

        // Find heading closest to viewport top
        // Scroll position may be between headings, so we pick the closest one as active
        let fallback: string | null = null
        let minDist = Infinity
        const viewTop = window.scrollY

        for (const id of itemIds) {
          const el = document.getElementById(id)
          if (!el) continue
          const dist = Math.abs(viewTop - (el.getBoundingClientRect().top + window.scrollY))
          if (dist < minDist) {
            minDist = dist
            fallback = id
          }
        }

        setActiveIds(fallback ? [fallback] : itemIds[0] ? [itemIds[0]] : [])
      },
      { threshold: 0.98 }
    )

    const elements = itemIds.flatMap(id => document.getElementById(id) ?? [])
    for (const el of elements) observer.observe(el)

    return () => observer.disconnect()
  }, [itemIds])

  return activeIds
}
