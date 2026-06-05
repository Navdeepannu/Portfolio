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

export default function TeamSectionTwo() {
  return (
    <section className="bg-gray-50 py-16 md:py-32 dark:bg-transparent">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 pb-4 md:mb-16">
          <h1 className="font-times-heading text-4xl sm:text-5xl">Our team</h1>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {members.map((member, index) => (
            <div key={index} className="group overflow-hidden">
              <img
                src={member.avatar}
                alt={member.name}
                className="h-80 w-full rounded-md object-cover object-top"
              />

              <div className="pt-3">
                <div className="flex justify-between">
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
