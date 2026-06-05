import { Badge } from '@/components/ui/badge'

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

export default function TeamSectionFive() {
  return (
    <section className="bg-gray-50 py-16 md:py-32 dark:bg-transparent">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 flex flex-col items-start gap-4 md:mb-16">
          <Badge variant="ghost" className="text-sm text-muted-foreground uppercase">
            The Team
          </Badge>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <h1 className="max-w-[22ch] text-2xl font-medium md:text-4xl">
              Join a global team dedicated to their craft
            </h1>
            <p className="max-w-lg text-left text-muted-foreground md:mt-6">
              We work with incredible talent from all around the world, each offering unique skills
              and perspectives. Joining us means you&apos;ll collaborate with industry leaders,
              learn from the best, and continuously grow.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {members.map((member, index) => (
            <div
              key={index}
              className="group relative aspect-3/4 overflow-hidden rounded-xl md:aspect-2/3"
            >
              <img
                src={member.avatar}
                alt={member.name}
                className="absolute inset-0 h-full w-full object-cover object-top grayscale transition duration-500 group-hover:scale-103 group-hover:grayscale-0"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

              <div className="absolute right-0 bottom-0 left-0 z-10 p-4">
                <h3 className="font-medium text-white">{member.name}</h3>
                <p className="text-sm text-white/80">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
