import Link from "next/link";

const members = [
  {
    name: "Arjun Patel",
    role: "Founder - CEO",
    avatar: "/teams/avatar1.jpg",
    link: "",
  },
  {
    name: "Daniel Kim",
    role: "Co-Founder - CTO",
    avatar: "/teams/avatar2.jpg",
    link: "",
  },
  {
    name: "Sofia Martinez",
    role: "Sales Manager",
    avatar: "/teams/avatar3.jpg",
    link: "",
  },
  {
    name: "Ethan Chen",
    role: "UX Engineer",
    avatar: "/teams/avatar4.jpg",
    link: "",
  },
  {
    name: "Maya Thompson",
    role: "Interaction Designer",
    avatar: "/teams/avatar5.jpg",
    link: "",
  },
  {
    name: "Lucas Anderson",
    role: "Visual Designer",
    avatar: "/teams/avatar6.jpg",
    link: "",
  },
];

export default function TeamSectionThree() {
  return (
    <section className="bg-gray-50 py-16 md:py-32 dark:bg-transparent">
      <div className="mx-auto max-w-6xl px-6">
        <div className="md:mb-16 mb-12 pb-4">
          <h1 className="sm:text-5xl text-4xl font-times-heading text-center">
            Our team
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l relative">
          <span
            className="absolute top-0 left-0
               -translate-x-1/2 -translate-y-1/2
               h-4 w-px bg-neutral-700 dark:bg-neutral-200"
          />

          <span
            className="absolute top-0 left-0
               -translate-x-1/2 -translate-y-1/2
               w-4 h-px bg-neutral-700 dark:bg-neutral-200"
          />
          <span
            className="absolute bottom-0 right-0
               translate-x-1/2 translate-y-1/2
               h-4 w-px bg-neutral-700 dark:bg-neutral-200"
          />

          <span
            className="absolute bottom-0 right-0
               translate-x-1/2 translate-y-1/2
               w-4 h-px bg-neutral-700 dark:bg-neutral-200"
          />

          {members.map((member, index) => (
            <div
              key={index}
              className="group overflow-hidden flex items-center flex-col justify-center border-r border-b  p-6"
            >
              <Link href={member.link}>
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="size-20 ring-1 ring-border group-hover:ring-2 rounded-full object-cover object-top grayscale-100 group-hover:grayscale-0 duration-500 ease-in-out transition"
                />
              </Link>
              <div className="pt-3">
                <div className="text-center">
                  <h3 className="text-sm font-medium">{member.name}</h3>
                </div>

                <div className="mt-1 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {member.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
