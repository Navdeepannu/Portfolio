'use client'

import { useState } from 'react'
import { ArrowUpRight, GitMerge, GitPullRequest, MessageSquare } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

import type {
  GithubActivityItem,
  GithubActivityPreview as GithubActivityPreviewData,
} from '@/site/portfolio/landing-page-content'

type GithubActivityPreviewProps = {
  activity: GithubActivityPreviewData
}

type ActivityGroup = {
  repository: string
  repositoryHref: string
  items: GithubActivityItem[]
}

function groupActivityByRepository(items: readonly GithubActivityItem[]) {
  const groups = new Map<string, ActivityGroup>()

  for (const item of items) {
    const group = groups.get(item.repository)

    if (group) {
      group.items.push(item)
      continue
    }

    groups.set(item.repository, {
      repository: item.repository,
      repositoryHref: item.repositoryHref,
      items: [item],
    })
  }

  return Array.from(groups.values())
}

function getRepositoryLabel(repository: string) {
  const separatorIndex = repository.indexOf('/')

  if (separatorIndex === -1) {
    return { owner: '', project: repository }
  }

  return {
    owner: repository.slice(0, separatorIndex),
    project: repository.slice(separatorIndex + 1),
  }
}

function getActivitySummary(items: GithubActivityItem[]) {
  const mergedCount = items.filter((item) => item.status === 'Merged').length
  const pullRequestLabel = items.length === 1 ? 'pull request' : 'pull requests'

  if (mergedCount === items.length) {
    return `${mergedCount} merged ${pullRequestLabel}`
  }

  return `${items.length} ${pullRequestLabel} · ${mergedCount} merged`
}

function RepositoryIcon({ allMerged }: { allMerged: boolean }) {
  const Icon = allMerged ? GitMerge : GitPullRequest

  return (
    <span className="relative z-10 flex size-8 items-center justify-center rounded-full border border-border bg-background text-violet-700 dark:text-violet-400">
      <Icon className="size-4" aria-hidden="true" />
    </span>
  )
}

function MorphingDisclosureIcon({ open }: { open: boolean }) {
  const shouldReduceMotion = useReducedMotion()
  const transition = {
    duration: shouldReduceMotion ? 0 : 0.2,
    ease: [0.77, 0, 0.175, 1] as const,
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-3.5"
    >
      <motion.path
        d="M7 15L12 20L17 15"
        initial={false}
        animate={{ d: open ? 'M7 20L12 15L17 20' : 'M7 15L12 20L17 15' }}
        transition={transition}
      />
      <motion.path
        d="M7 9L12 4L17 9"
        initial={false}
        animate={{ d: open ? 'M7 4L12 9L17 4' : 'M7 9L12 4L17 9' }}
        transition={transition}
      />
    </svg>
  )
}

export function GithubActivityPreview({ activity }: GithubActivityPreviewProps) {
  const groups = groupActivityByRepository(activity.items)
  const [openRepositories, setOpenRepositories] = useState(
    () => new Set(groups[0] ? [groups[0].repository] : []),
  )

  return (
    <section aria-labelledby="github-activity-heading" className="mt-10 max-w-3xl sm:mt-12">
      <div className="mb-6 flex items-start justify-between gap-6">
        <div>
          <h3 id="github-activity-heading" className="text-sm font-medium text-foreground">
            {activity.title}
          </h3>
          <p className="mt-1 max-w-xl text-sm leading-6 text-muted-foreground">
            {activity.description}
          </p>
        </div>
      </div>

      <div>
        <ol className="divide-y divide-dashed divide-border/70">
          {groups.map((group) => {
            const { owner, project } = getRepositoryLabel(group.repository)
            const allMerged = group.items.every((item) => item.status === 'Merged')
            const isOpen = openRepositories.has(group.repository)

            return (
              <li key={group.repository}>
                <Collapsible
                  open={isOpen}
                  onOpenChange={(open) => {
                    setOpenRepositories((current) => {
                      const next = new Set(current)

                      if (open) {
                        next.add(group.repository)
                      } else {
                        next.delete(group.repository)
                      }

                      return next
                    })
                  }}
                >
                  <CollapsibleTrigger asChild>
                    <button
                      type="button"
                      className="group/trigger flex min-h-20 w-full items-center gap-3 rounded-md py-4 text-left transition-[background-color,color,transform] duration-150 hover:bg-muted/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-[0.995] motion-reduce:transform-none motion-reduce:transition-none"
                    >
                      <RepositoryIcon allMerged={allMerged} />
                      <span className="min-w-0 flex-1 pt-0.5">
                        <span className="block text-sm font-medium text-foreground transition-colors duration-150 group-hover/trigger:text-emerald-600 dark:group-hover/trigger:text-emerald-400">
                          {project}
                        </span>
                        <span className="mt-0.5 block text-xs leading-5 text-muted-foreground">
                          {owner && `${owner} · `}
                          {getActivitySummary(group.items)}
                        </span>
                      </span>

                      <span className="flex size-11 shrink-0 items-center justify-center text-muted-foreground transition-colors duration-150 group-hover/trigger:text-foreground">
                        <MorphingDisclosureIcon open={isOpen} />
                      </span>
                    </button>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <ul className="mb-5 space-y-3 sm:mr-11 sm:ml-11">
                      {group.items.map((item) => (
                        <li
                          key={item.title}
                          className="grid min-w-0 items-start gap-x-4 gap-y-1 sm:grid-cols-[minmax(0,1fr)_auto]"
                        >
                          <div className="min-w-0">
                            <div className="flex items-start gap-2">
                              <GitPullRequest
                                className="mt-1 size-3.5 shrink-0 text-violet-500 dark:text-violet-400"
                                aria-hidden="true"
                              />
                              {item.href ? (
                                <a
                                  href={item.href}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="rounded-sm text-sm leading-5 text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                                >
                                  {item.title}
                                </a>
                              ) : (
                                <p className="text-sm leading-5 text-muted-foreground">
                                  {item.title}
                                </p>
                              )}
                            </div>

                            {(item.additions !== undefined ||
                              item.deletions !== undefined ||
                              item.comments !== undefined) && (
                              <div className="mt-1.5 ml-5.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                                {item.additions !== undefined && (
                                  <span className="font-medium text-emerald-600 dark:text-emerald-400">
                                    +{item.additions}
                                  </span>
                                )}
                                {item.deletions !== undefined && (
                                  <span className="font-medium text-rose-500 dark:text-rose-400">
                                    −{item.deletions}
                                  </span>
                                )}
                                {item.comments !== undefined && (
                                  <span className="inline-flex items-center gap-1.5">
                                    <MessageSquare className="size-3.5" aria-hidden="true" />
                                    {item.comments} comments
                                  </span>
                                )}
                              </div>
                            )}
                          </div>

                          <time
                            className="ml-5.5 text-xs leading-5 text-muted-foreground sm:ml-0"
                            dateTime={item.dateTime}
                          >
                            {item.date}
                          </time>
                        </li>
                      ))}
                    </ul>
                  </CollapsibleContent>
                </Collapsible>
              </li>
            )
          })}
        </ol>
      </div>

      <a
        href={activity.profileHref}
        target="_blank"
        rel="noreferrer"
        className="group/activity mt-1 inline-flex min-h-11 items-center gap-1.5 rounded-sm text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      >
        <span className="border-b border-dotted border-current/55 pb-px">View GitHub activity</span>
        <ArrowUpRight className="size-3.5" aria-hidden="true" />
      </a>
    </section>
  )
}
