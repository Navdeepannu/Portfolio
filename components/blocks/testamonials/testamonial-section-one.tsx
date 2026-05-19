import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { IconArrowRight } from '@tabler/icons-react'

const members = [
  {
    name: 'Liam Brown',
    role: 'Founder - CEO',
    avatar: '/teams/avatar1.jpg',
    link: '#',
  },
  {
    name: 'Elijah Jones',
    role: 'Co-Founder - CTO',
    avatar: '/teams/avatar2.jpg',
    link: '#',
  },
  {
    name: 'Isabella Garcia',
    role: 'Sales Manager',
    avatar: '/teams/avatar3.jpg',
    link: '#',
  },
  {
    name: 'Henry Lee',
    role: 'UX Engeneer',
    avatar: '/teams/avatar4.jpg',
    link: '#',
  },
  {
    name: 'Isabella Garcia',
    role: 'Sales Manager',
    avatar: '/teams/avatar5.jpg',
    link: '#',
  },
  {
    name: 'Henry Lee',
    role: 'UX Engeneer',
    avatar: '/teams/avatar6.jpg',
    link: '#',
  },
  {
    name: 'Henry Lee',
    role: 'UX Engeneer',
    avatar: '/teams/avatar1.jpg',
    link: '#',
  },
]

export default function TestamonialSectionOne() {
  const left = members.slice(0, 2)
  const right = members.slice(3, 5)
  const center = members.slice(5, 7)

  return (
    <section className="bg-gray-50 py-16 md:py-32 dark:bg-transparent">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
        <div className="space-y-24">
          {left.map((member, index) => (
            <div
              key={index}
              className="group -rotate-6deg size-50 origin-right transform overflow-hidden rounded-xl transition-transform duration-500 group-hover:rotate-0 hover:rotate-0"
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
          <div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-4 text-center">
            <h1 className="text-3xl font-medium md:text-6xl">
              Trusted by leaders{' '}
              <span className="max-w-md text-neutral-500 dark:text-neutral-400">
                from various industries
              </span>
            </h1>
            <p className="text-center text-balance text-muted-foreground">
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
              className="rotate-6deg size-50 origin-left transform overflow-hidden rounded-xl shadow-2xl transition-transform duration-500 hover:rotate-0"
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

      {/* section  */}
    </section>
  )
}
