import Image from 'next/image'
import Link from 'next/link'

const templates = [
  {
    title: 'FlowDesk',
    category: 'SaaS dashboard',
    description: 'A full-page operations workspace with navigation, data views, and product UI.',
    image: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTljn0lnIziS93GUAyT2Loud5qMEamYgj7C0BVN',
    href: '/pages/flowdesk',
  },
] as const

export default function PagesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-12">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <Link
            key={template.title}
            href={template.href}
            className="group rounded-xl border bg-card p-2 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="relative aspect-4/3 overflow-hidden rounded-lg ring-1 ring-foreground/6.5">
              <Image
                src={template.image}
                alt={`${template.title} page template preview`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-top transition-transform duration-200 group-hover:scale-[1.01]"
              />
            </div>
            <div className="px-2 py-3">
              <h2 className="text-sm font-medium tracking-tight text-foreground">
                {template.title}
              </h2>
              <p className="mt-0.5 text-xs text-muted-foreground">{template.category}</p>
              <p className="mt-2 text-sm leading-5 text-muted-foreground">{template.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
