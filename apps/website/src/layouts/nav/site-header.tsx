import Link from 'next/link'
import RobotIcon from '@/../public/robot.svg'

import { CommandMenu } from '@/layouts/nav/command-menu'
import { DiscordLink } from '@/layouts/nav/discord-link'
import { GitHubLink } from '@/layouts/nav/github-link'
import { MainNav } from '@/layouts/nav/main-nav'
import { MobileNav } from '@/layouts/nav/mobile-nav'
import { ModeSwitcher } from '@/layouts/nav/mode-switcher'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/config'

export function SiteHeader() {
  return (
    <header
      className="sticky top-0 z-50 w-full bg-background"
      style={{ '--header-height': '3.5rem' } as React.CSSProperties}
    >
      <div className="mx-auto flex h-14 max-w-screen-2xl items-center px-4 md:px-6">
        {/* Mobile hamburger */}
        <MobileNav items={siteConfig.navItems} className="flex lg:hidden" />

        {/* Logo as icon button */}
        <Button
          variant="ghost"
          size="icon-lg"
          nativeButton={false}
          render={
            <Link href="/" aria-label={siteConfig.name}>
              <RobotIcon className="size-4" aria-hidden="true" />
            </Link>
          }
        />

        {/* Desktop nav */}
        <MainNav items={siteConfig.navItems} className="hidden lg:flex" />

        {/* Right-hand actions */}
        <div className="ml-auto flex items-center gap-1">
          <CommandMenu />
          <div aria-hidden="true" className="mx-1 h-4 w-px bg-border" />
          <GitHubLink />
          <div aria-hidden="true" className="mx-1 h-4 w-px bg-border" />
          <DiscordLink />
          <div aria-hidden="true" className="mx-1 h-4 w-px bg-border" />
          <ModeSwitcher />
        </div>
      </div>
    </header>
  )
}
