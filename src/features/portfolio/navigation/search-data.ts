import { Component, FileText, Home, LayoutGrid } from 'lucide-react'
import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react'

import type { SearchGroup, SearchIcon } from '@/lib/search'
import { portfolioSiteConfig } from '@/config/sites'
import { SITE_ORIGINS } from '@/config/site-origins'

export const portfolioSearchGroups: SearchGroup[] = [
  {
    id: 'portfolio-menu',
    heading: 'Portfolio',
    items: [
      {
        id: 'portfolio-home',
        label: 'Home',
        href: '/',
        type: 'navigation',
        icon: Home,
        keywords: ['landing', 'index', 'start'],
      },
      {
        id: 'portfolio-work',
        label: 'Projects',
        href: '/projects',
        type: 'navigation',
        icon: LayoutGrid,
        keywords: ['work', 'case studies', 'products'],
      },
      {
        id: 'portfolio-about',
        label: 'About',
        href: '/#about',
        type: 'navigation',
        icon: FileText,
        keywords: ['profile', 'experience', 'skills'],
      },
      {
        id: 'portfolio-writing',
        label: 'Writing',
        href: '/blog',
        type: 'blog',
        icon: FileText,
        keywords: ['blog', 'articles'],
      },
      {
        id: 'portfolio-resume',
        label: 'Resume',
        href: '/resume/resume.pdf',
        external: true,
        type: 'portfolio',
        icon: FileText,
        keywords: ['cv', 'experience'],
      },
      {
        id: 'portfolio-navui',
        label: 'NavUI',
        href: SITE_ORIGINS.ui,
        external: true,
        type: 'portfolio',
        icon: Component,
        keywords: ['components', 'blocks', 'registry'],
      },
    ],
  },
  {
    id: 'portfolio-social',
    heading: 'Profiles',
    items: [
      {
        id: 'portfolio-github',
        label: 'GitHub',
        href: portfolioSiteConfig.links.github,
        external: true,
        type: 'social',
        icon: IconBrandGithub as SearchIcon,
        keywords: ['code', 'open source', 'profile'],
      },
      {
        id: 'portfolio-linkedin',
        label: 'LinkedIn',
        href: portfolioSiteConfig.links.linkedin,
        external: true,
        type: 'social',
        icon: IconBrandLinkedin as SearchIcon,
        keywords: ['profile', 'work', 'resume'],
      },
    ],
  },
]
