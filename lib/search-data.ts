import type { ComponentType, SVGProps } from 'react'
import {
  Atom,
  BookOpen,
  Briefcase,
  Component,
  FileText,
  Hash,
  Home,
  LayoutGrid,
  Mail,
  User,
} from 'lucide-react'
import { IconBrandGithub, IconBrandLinkedin, IconBrandX } from '@tabler/icons-react'

import { blockCategories } from '@/data/categories'
import { blocks } from '@/data/blocks'
import { getCategoryHref } from '@/data/block-helpers'
import { siteConfig } from '@/lib/site'

export type SearchIcon = ComponentType<SVGProps<SVGSVGElement>>

export type SearchItemType =
  | 'navigation'
  | 'portfolio'
  | 'block'
  | 'component'
  | 'page'
  | 'blog'
  | 'social'
  | 'action'

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
      id: 'projects',
      label: 'Projects',
      href: '/projects',
      type: 'navigation',
      icon: Briefcase,
      keywords: ['case studies', 'work', 'portfolio', 'archive'],
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
      id: 'blog',
      label: 'Blog',
      href: '/blog',
      type: 'blog',
      icon: BookOpen,
      keywords: ['writing', 'posts', 'articles'],
    },
  ],
}

/** Portfolio-specific anchors / sections on the landing page. */
const portfolioGroup: SearchGroup = {
  id: 'portfolio',
  heading: 'Portfolio',
  items: [
    {
      id: 'about',
      label: 'About',
      href: '/#about',
      type: 'portfolio',
      icon: User,
      keywords: ['bio', 'profile', 'navdeep'],
    },
    {
      id: 'projects',
      label: 'Projects',
      href: '/#projects',
      type: 'portfolio',
      icon: Briefcase,
      keywords: ['work', 'case studies'],
    },
    {
      id: 'contact',
      label: 'Contact',
      href: '/#contact',
      type: 'portfolio',
      icon: Mail,
      keywords: ['email', 'hire', 'reach out'],
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
      href: siteConfig.links.linkedin,
      external: true,
      type: 'social',
      icon: IconBrandLinkedin as SearchIcon,
      keywords: ['profile', 'work', 'resume', 'linkedin'],
    },
    {
      id: 'twitter',
      label: 'X / Twitter',
      href: siteConfig.links.twitter,
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
  return [menuGroup, portfolioGroup, buildCategoriesGroup(), buildBlocksGroup(), socialGroup]
}
