import { CopyButton } from '@/components/ui/components/copy-button'
import { UiLibraryNavbar } from '@/site/ui-library/ui-library-navbar'
import Image from 'next/image'
import Link from 'next/link'

const templates = [
  {
    title: 'FlowDesk',
    category: 'SaaS Landing page',
    description: 'A full-page operations workspace with navigation, data views, and product UI.',
    image: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlUpuYbnXMcP1suvnB5JoeGFDfSm7wChl8LtpH',
    href: '/pages/flowdesk',
    command: 'pnpm dlx shadcn@latest add https://ui.navdeepsingh.dev/r/flowdesk.json',
  },
] as const

export default function PagesPage() {
  return (
    <section className="mx-auto flex max-w-360 flex-col border-x">
      <UiLibraryNavbar fullWidth />

      <div className="w-full px-6 py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <article
              key={template.title}
              className="group overflow-hidden rounded-xl border bg-card p-2 shadow-sm transition-shadow duration-300 hover:shadow-md"
            >
              <Link
                href={template.href}
                aria-label={`Open ${template.title} preview`}
                className="block"
              >
                <div className="relative aspect-4/5 overflow-hidden rounded-lg shadow-xs ring-1 ring-foreground/7.5">
                  <Image
                    src={template.image}
                    alt={`${template.title} page template preview`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top"
                  />
                </div>
              </Link>

              <div className="px-2 pt-4 pb-2">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <Link href={template.href} className="mt-1 inline-flex items-center gap-1.5">
                      <h2 className="font-geist text-lg font-semibold tracking-tight">
                        {template.title}
                      </h2>
                    </Link>
                  </div>
                </div>

                <p className="mt-2 text-sm leading-5 text-muted-foreground">
                  {template.description}
                </p>

                <div className="mt-4 flex items-center gap-2 rounded-lg border bg-muted/50 p-1 pl-3">
                  <code className="min-w-0 flex-1 truncate text-xs text-muted-foreground">
                    {template.command}
                  </code>
                  <CopyButton
                    text={template.command}
                    variant="ghost"
                    className="shrink-0"
                    aria-label={`Copy ${template.title} install command`}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
