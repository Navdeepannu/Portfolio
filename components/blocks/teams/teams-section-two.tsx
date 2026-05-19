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

export default function TeamSectionTwo() {
  return (
    <section className="bg-gray-50 py-16 md:py-32 dark:bg-transparent">
      <div className="mx-auto max-w-6xl px-6">
        <div className="md:mb-16 mb-12 pb-4">
          <h1 className="sm:text-5xl text-4xl font-times-heading">Our team</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
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
