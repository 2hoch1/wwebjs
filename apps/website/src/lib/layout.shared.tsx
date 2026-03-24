import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      enabled: false,
    },
    searchToggle: {
      enabled: false,
    },
    themeSwitch: {
      enabled: false,
    },
  }
}

export const gitConfig = {
  user: 'wwebjs',
  repo: 'wwebjs',
  branch: 'main',
}
