import type { ComponentType, SVGProps } from 'react'
import { Atom, Component, FileText, Hash, Home, Images, LayoutGrid } from 'lucide-react'
import { IconBrandGithub, IconBrandLinkedin, IconBrandX } from '@tabler/icons-react'

import { blockCategories } from '@/data/categories'
import { blocks } from '@/data/blocks'
import { getCategoryHref } from '@/data/block-helpers'
import { portfolioSiteConfig } from '@/lib/site'
import { SITE_ORIGINS } from '@/lib/sites'

export type SearchIcon = ComponentType<SVGProps<SVGSVGElement>>

export type SearchItemType =
  'navigation' | 'portfolio' | 'block' | 'component' | 'page' | 'blog' | 'social' | 'action'

export type SearchItem = {
  id: string
  label: string
  description?: string
  href?: string
  external?: boolean
  type: SearchItemType
  icon?: SearchIcon
  /** Visual keyboard hint shown on the right of the row (e.g. ["G", "H"]). */
  shortcut?: string[]
  /** Extra strings used by the fuzzy filter. */
  keywords?: string[]
  /** Custom select handler. When omitted the item navigates to `href`. */
  onSelect?: () => void
}

export type SearchGroup = {
  id: string
  heading: string
  items: SearchItem[]
}

/** Primary navigation — mirrors the navbar menu. */
const menuGroup: SearchGroup = {
  id: 'menu',
  heading: 'Menu',
  items: [
    {
      id: 'home',
      label: 'Home',
      href: '/',
      type: 'navigation',
      icon: Home,
      keywords: ['landing', 'index', 'start'],
    },
    {
      id: 'components',
      label: 'Components',
      href: '/components',
      type: 'navigation',
      icon: Atom,
      keywords: ['ui', 'kit', 'library'],
    },
    {
      id: 'blocks',
      label: 'Blocks',
      href: '/blocks',
      type: 'navigation',
      icon: LayoutGrid,
      keywords: ['sections', 'layouts', 'patterns'],
    },
    {
      id: 'illustrations',
      label: 'Illustrations',
      href: '/illustrations',
      type: 'navigation',
      icon: Images,
      keywords: ['artwork', 'visuals', 'assets'],
    },
    {
      id: 'pages',
      label: 'Pages',
      href: '/pages',
      type: 'navigation',
      icon: FileText,
      keywords: ['templates', 'screens'],
    },
    {
      id: 'portfolio',
      label: 'Personal portfolio',
      href: SITE_ORIGINS.portfolio,
      external: true,
      type: 'portfolio',
      icon: Home,
      keywords: ['about', 'projects', 'resume', 'contact'],
    },
  ],
}

/** Social / external profile links. */
const socialGroup: SearchGroup = {
  id: 'social',
  heading: 'Social',
  items: [
    {
      id: 'github',
      label: 'GitHub',
      href: 'https://github.com/Navdeepannu/Portfolio',
      external: true,
      type: 'social',
      icon: IconBrandGithub as SearchIcon,
      keywords: [
        'code',
        'repos',
        'open source',
        'portfolio',
        'developer',
        'react',
        'nextjs',
        'vercel',
        'github',
      ],
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: portfolioSiteConfig.links.linkedin,
      external: true,
      type: 'social',
      icon: IconBrandLinkedin as SearchIcon,
      keywords: ['profile', 'work', 'resume', 'linkedin'],
    },
    {
      id: 'twitter',
      label: 'X / Twitter',
      href: portfolioSiteConfig.links.twitter,
      external: true,
      type: 'social',
      icon: IconBrandX as SearchIcon,
      keywords: ['tweets', 'posts', 'x', 'content'],
    },
  ],
}

/** Dynamic group — block categories from the registry. */
function buildCategoriesGroup(): SearchGroup {
  return {
    id: 'block-categories',
    heading: 'Block Categories',
    items: blockCategories.map((category) => ({
      id: `category-${category.id}`,
      label: category.name,
      description: category.description,
      href: getCategoryHref(category.id),
      type: 'block',
      icon: Hash,
      keywords: [category.id, 'category', 'group'],
    })),
  }
}

/** Dynamic group — every block definition in the registry. */
function buildBlocksGroup(): SearchGroup {
  return {
    id: 'blocks-all',
    heading: 'Blocks',
    items: blocks.map((block) => ({
      id: `block-${block.slug}`,
      label: block.title,
      description: block.description,
      href: `${getCategoryHref(block.category)}#${block.slug}`,
      type: 'block',
      icon: Component,
      keywords: [block.category, block.slug, ...(block.tags ?? [])],
    })),
  }
}

/** Returns the full set of search groups in display order. */
export function getSearchGroups(): SearchGroup[] {
  return [menuGroup, buildCategoriesGroup(), buildBlocksGroup(), socialGroup]
}
