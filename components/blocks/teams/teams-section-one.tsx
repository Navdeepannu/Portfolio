import { IconBrandLinkedin } from "@tabler/icons-react";
import Link from "next/link";

const members = [
  {
    name: "Liam Brown",
    role: "Founder - CEO",
    avatar: "/teams/avatar1.jpg",
    link: "#",
  },
  {
    name: "Elijah Jones",
    role: "Co-Founder - CTO",
    avatar: "/teams/avatar2.jpg",
    link: "#",
  },
  {
    name: "Isabella Garcia",
    role: "Sales Manager",
    avatar: "/teams/avatar3.jpg",
    link: "#",
  },
  {
    name: "Henry Lee",
    role: "UX Engeneer",
    avatar: "/teams/avatar4.jpg",
    link: "#",
  },
  {
    name: "Ava Williams",
    role: "Interaction Designer",
    avatar: "/teams/avatar5.jpg",
    link: "#",
  },
  {
    name: "Olivia Miller",
    role: "Visual Designer",
    avatar: "/teams/avatar6.jpg",
    link: "#",
  },
];

function MemberGrid({ data }: { data: typeof members }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {data.map((member, index) => (
        <div key={index} className="group overflow-hidden">
          <img
            src={member.avatar}
            alt={member.name}
            className="h-64 w-full group-hover:h-60 rounded-md object-cover object-top grayscale transition-all duration-500 group-hover:grayscale-0"
          />

          <div className="pt-3">
            <div className="flex justify-between">
              <h3 className="text-sm font-medium">{member.name}</h3>
            </div>

            <div className="mt-1 flex items-center justify-between group-hover:translate-y-0 translate-y-8 duration-300 ease-in-out transition group-hover:opacity-100 opacity-0">
              <span className="text-sm text-muted-foreground">
                {member.role}
              </span>
              <Link href={member.link} className="text-sm">
                <IconBrandLinkedin className="size-4.5" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function TeamSectionOne() {
  const firstGroup = members.slice(0, 3);
  const secondGroup = members.slice(3, 6);

  return (
    <section className="bg-gray-50 py-16 md:py-32 dark:bg-transparent">
      <div className="mx-auto max-w-6xl px-6">
        <div className="md:mb-16 mb-12 border-b pb-4 md:grid-cols-2 gap-4 grid grid-cols-1">
          <h1 className="sm:text-5xl text-4xl font-times-heading">Our team</h1>
          <p className="md:mt-6 font-medium md:text-base text-sm ">
            Our diverse team brings togather expertise from varoius financial
            disciplies to provide comprehensive and personalized solutiosn for
            our clients.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <h2 className="text-3xl sm:text-4xl font-medium font-times-heading">
              Founders & Partners
            </h2>

            <p className="mt-4 max-w-md text-sm leading-relaxed">
              During the working process, we perform regular fitting with the
              client because he is the only person who can feel whether a new
              suit fits or not.
            </p>
          </div>

          <div className="lg:col-span-8  lg:pl-10">
            <MemberGrid data={firstGroup} />
          </div>
        </div>

        <div className="my-16 border-t" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <h2 className="text-3xl sm:text-4xl font-medium font-times-heading">
              Design & Experience Team
            </h2>

            <p className="mt-4 max-w-md text-sm leading-relaxed">
              Our design and experience team focuses on creating intuitive,
              accessible and visually strong products that work seamlessly
              across platforms and devices.
            </p>
          </div>

          <div className="lg:col-span-8  lg:pl-10">
            <MemberGrid data={secondGroup} />
          </div>
        </div>
      </div>
    </section>
  );
}
