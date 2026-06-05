import { IconBrandLinkedin } from '@tabler/icons-react'
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

function MemberGrid({ data }: { data: typeof members }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      {data.map((member, index) => (
        <div key={index} className="group overflow-hidden">
          <img
            src={member.avatar}
            alt={member.name}
            className="h-64 w-full rounded-md object-cover object-top grayscale transition-all duration-500 group-hover:h-60 group-hover:grayscale-0"
          />

          <div className="pt-3">
            <div className="flex justify-between">
              <h3 className="text-sm font-medium">{member.name}</h3>
            </div>

            <div className="mt-1 flex translate-y-8 items-center justify-between opacity-0 transition duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
              <span className="text-sm text-muted-foreground">{member.role}</span>
              <Link href={member.link} className="text-sm">
                <IconBrandLinkedin className="size-4.5" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function TeamSectionOne() {
  const firstGroup = members.slice(0, 3)
  const secondGroup = members.slice(3, 6)

  return (
    <section className="bg-gray-50 py-16 md:py-32 dark:bg-transparent">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 grid grid-cols-1 gap-4 border-b pb-4 md:mb-16 md:grid-cols-2">
          <h1 className="font-times-heading text-4xl sm:text-5xl">Our team</h1>
          <p className="text-sm font-medium md:mt-6 md:text-base">
            Our diverse team brings togather expertise from varoius financial disciplies to provide
            comprehensive and personalized solutiosn for our clients.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="font-times-heading text-3xl font-medium sm:text-4xl">
              Founders & Partners
            </h2>

            <p className="mt-4 max-w-md text-sm leading-relaxed">
              During the working process, we perform regular fitting with the client because he is
              the only person who can feel whether a new suit fits or not.
            </p>
          </div>

          <div className="lg:col-span-8 lg:pl-10">
            <MemberGrid data={firstGroup} />
          </div>
        </div>

        <div className="my-16 border-t" />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="font-times-heading text-3xl font-medium sm:text-4xl">
              Design & Experience Team
            </h2>

            <p className="mt-4 max-w-md text-sm leading-relaxed">
              Our design and experience team focuses on creating intuitive, accessible and visually
              strong products that work seamlessly across platforms and devices.
            </p>
          </div>

          <div className="lg:col-span-8 lg:pl-10">
            <MemberGrid data={secondGroup} />
          </div>
        </div>
      </div>
    </section>
  )
}
