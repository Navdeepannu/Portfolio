import { Atom, Component, FileText, Hash, Home, Images, LayoutGrid } from 'lucide-react'
import { IconBrandGithub, IconBrandLinkedin, IconBrandX } from '@tabler/icons-react'

import { blockCategories } from '@/features/navui/catalog/blocks/block-categories'
import { blocks } from '@/features/navui/catalog/blocks/block-definitions'
import { getCategoryHref } from '@/features/navui/catalog/blocks/block-helpers'
import { portfolioSiteConfig } from '@/config/sites'
import { SITE_ORIGINS } from '@/config/site-origins'
import type { SearchGroup, SearchIcon } from '@/lib/search'

export type { SearchGroup, SearchIcon } from '@/lib/search'

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
