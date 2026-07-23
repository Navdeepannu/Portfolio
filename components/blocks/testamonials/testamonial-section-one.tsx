import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { IconArrowRight } from '@tabler/icons-react'

const members = [
  {
    name: 'Liam Brown',
    role: 'Founder - CEO',
    avatar: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlH4NUrIqHjv3VPCtBSMksEJOn7pmfxyc9IoU5',
    link: '#',
  },
  {
    name: 'Elijah Jones',
    role: 'Co-Founder - CTO',
    avatar: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTl81tMhO4dwU2oJkmKaujTg9FMAr3QiGROq5bE',
    link: '#',
  },
  {
    name: 'Isabella Garcia',
    role: 'Sales Manager',
    avatar: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlnj8ad4LL1RTlFOStU5Vx6bKDsZupeXgyGkhM',
    link: '#',
  },
  {
    name: 'Henry Lee',
    role: 'UX Engeneer',
    avatar: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlKywRt8Sa4eSEgVXynrIRWAk3NL9mFjvOTM0B',
    link: '#',
  },
  {
    name: 'Ava Williams',
    role: 'Interaction Designer',
    avatar: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlh433XXK0RlaETPbLcZQjyfg2StNvuB13w8rI',
    link: '#',
  },
  {
    name: 'Olivia Miller',
    role: 'Visual Designer',
    avatar: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlCsjkx0nF5BMj7T0uXqWGgbANfhcdeI8P3x9v',
    link: '#',
  },
]

export default function TestamonialSectionOne() {
  const left = members.slice(0, 2)
  const right = members.slice(3, 5)

  return (
    <section className="bg-gray-50 py-16 md:py-32 dark:bg-transparent">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
        <div className="space-y-24">
          {left.map((member, index) => (
            <div
              key={index}
              className="group size-20 origin-right -rotate-6 transform overflow-hidden rounded-xl transition-transform duration-500 hover:rotate-0 md:size-50"
            >
              <img
                src={member.avatar}
                alt={member.name}
                className="inset-0 h-full w-full object-cover object-top grayscale transition-all duration-500 group-hover:scale-103 group-hover:grayscale-0"
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center gap-2">
          <Badge variant="outline" className="text-muted-foreground uppercase shadow-md">
            Testimonials
          </Badge>
          <div className="mx-auto flex max-w-md flex-col items-center justify-center gap-4 text-center md:max-w-2xl">
            <h1 className="text-3xl font-medium md:text-6xl">
              Trusted by leaders{' '}
              <span className="max-w-md text-neutral-500 dark:text-neutral-400">
                from various industries
              </span>
            </h1>
            <p className="text-center text-sm text-balance text-muted-foreground md:text-base">
              Discover how teams rely on our platform to design, manage, and deliver seamless
              customer journeys from first touch to long-term engagement.
            </p>

            <Button
              variant="default"
              className="cursor-pointer rounded-full shadow-lg shadow-neutral-400"
            >
              Read Success Stories
              <IconArrowRight />{' '}
            </Button>
          </div>
        </div>

        <div className="space-y-24">
          {right.map((member, index) => (
            <div
              key={index}
              className="size-20 origin-left rotate-6 transform overflow-hidden rounded-xl shadow-2xl transition-transform duration-500 hover:rotate-0 md:size-50"
            >
              <img
                src={member.avatar}
                alt={member.name}
                className="inset-0 h-full w-full object-cover object-top grayscale transition-all duration-500 group-hover:scale-103 group-hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
