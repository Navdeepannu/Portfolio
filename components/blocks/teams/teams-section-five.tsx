import { Badge } from "@/components/ui/badge";

const members = [
  {
    name: "Liam Brown",
    role: "Founder - CEO",
    avatar: "/teams/avatar5.jpg",
    link: "#",
  },
  {
    name: "Elijah Jones",
    role: "Co-Founder - CTO",
    avatar: "/teams/avatar6.jpg",
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
];

export default function TeamSectionFive() {
  return (
    <section className="bg-gray-50 py-16 md:py-32 dark:bg-transparent">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 md:mb-16 flex flex-col items-start gap-4">
          <Badge
            variant="ghost"
            className="uppercase text-sm text-muted-foreground"
          >
            The Team
          </Badge>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <h1 className="text-2xl md:text-4xl font-medium max-w-[22ch]">
              Join a global team dedicated to their craft
            </h1>
            <p className="md:mt-6 text-left text-muted-foreground max-w-lg">
              We work with incredible talent from all around the world, each
              offering unique skills and perspectives. Joining us means
              you&apos;ll collaborate with industry leaders, learn from the
              best, and continuously grow.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {members.map((member, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl
                         aspect-3/4 md:aspect-2/3"
            >
              <img
                src={member.avatar}
                alt={member.name}
                className="absolute inset-0 h-full w-full object-cover object-top
                           grayscale transition duration-500 group-hover:grayscale-0 group-hover:scale-103"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                <h3 className="text-white font-medium">{member.name}</h3>
                <p className="text-white/80 text-sm">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
