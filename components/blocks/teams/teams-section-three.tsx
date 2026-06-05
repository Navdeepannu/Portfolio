import Link from 'next/link'

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

export default function TeamSectionThree() {
  return (
    <section className="bg-gray-50 py-16 md:py-32 dark:bg-transparent">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 pb-4 md:mb-16">
          <h1 className="font-times-heading text-center text-4xl sm:text-5xl">Our team</h1>
        </div>

        <div className="relative grid grid-cols-1 border-t border-l md:grid-cols-3">
          <span className="absolute top-0 left-0 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-neutral-700 dark:bg-neutral-200" />

          <span className="absolute top-0 left-0 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-neutral-700 dark:bg-neutral-200" />
          <span className="absolute right-0 bottom-0 h-4 w-px translate-x-1/2 translate-y-1/2 bg-neutral-700 dark:bg-neutral-200" />

          <span className="absolute right-0 bottom-0 h-px w-4 translate-x-1/2 translate-y-1/2 bg-neutral-700 dark:bg-neutral-200" />

          {members.map((member, index) => (
            <div
              key={index}
              className="group flex flex-col items-center justify-center overflow-hidden border-r border-b p-6"
            >
              <Link href={member.link}>
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="size-20 rounded-full object-cover object-top ring-1 ring-border grayscale-100 transition duration-500 ease-in-out group-hover:ring-2 group-hover:grayscale-0"
                />
              </Link>
              <div className="pt-3">
                <div className="text-center">
                  <h3 className="text-sm font-medium">{member.name}</h3>
                </div>

                <div className="mt-1 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{member.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
