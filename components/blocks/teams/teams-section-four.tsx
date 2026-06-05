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
]

export default function TeamSectionFour() {
  return (
    <section className="bg-gray-50 py-16 md:py-32 dark:bg-transparent">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 flex flex-col items-start gap-4 md:mb-16">
          <Badge variant="ghost" className="text-sm text-muted-foreground uppercase">
            The Team
          </Badge>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <h1 className="text-xl md:text-4xl">Join a global team dedicated to their craft</h1>
            <p className="mt-0 text-left text-muted-foreground md:mt-6">
              We work with incredible talent from all around the world, each offering unique skills
              and perspectives. Joining us means you&apos;ll collaborate with industry leaders,
              learn from the best, and continuously grow.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4 md:grid-rows-3">
          {members.map((member, index) => {
            const bentoSpans = [
              'md:col-span-2 md:row-span-2',
              'md:col-span-2 md:row-span-1',
              'md:col-span-1 md:row-span-1',
            ]

            return (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-xl bg-muted ring-1 ring-border ${bentoSpans[index]}`}
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="h-full w-full object-cover object-top grayscale transition duration-500 ease-in-out group-hover:grayscale-0"
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
