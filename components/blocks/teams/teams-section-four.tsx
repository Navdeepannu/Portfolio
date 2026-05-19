import { Badge } from "@/components/ui/badge";

const members = [
  {
    name: "Arjun Patel",
    role: "Founder - CEO",
    avatar: "/teams/team4.jpg",
    link: "",
  },
  {
    name: "Daniel Kim",
    role: "Co-Founder - CTO",
    avatar: "/teams/team2.jpg",
    link: "",
  },
  {
    name: "Sofia Martinez",
    role: "Sales Manager",
    avatar: "/teams/team3.jpg",
    link: "",
  },
  {
    name: "Ethan Chen",
    role: "UX Engineer",
    avatar: "/teams/team1.jpg",
    link: "",
  },
];

export default function TeamSectionFour() {
  return (
    <section className="bg-gray-50 py-16 md:py-32 dark:bg-transparent">
      <div className="mx-auto max-w-6xl px-4">
        <div className="md:mb-16 mb-12 flex items-start gap-4 flex-col">
          <Badge
            variant="ghost"
            className="uppercase text-sm text-muted-foreground"
          >
            The Team
          </Badge>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <h1 className="text-xl md:text-4xl">
              Join a global team dedicated to their craft
            </h1>
            <p className="md:mt-6 mt-0 text-left text-muted-foreground">
              We work with incredible talent from all around the world, each
              offering unique skills and perspectives. Joining us means
              you&apos;ll collaborate with industry leaders, learn from the
              best, and continuously grow.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-6">
          {members.map((member, index) => {
            const bentoSpans = [
              "md:col-span-2 md:row-span-2",
              "md:col-span-2 md:row-span-1",
              "md:col-span-1 md:row-span-1",
            ];

            return (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-xl ring-1 ring-border bg-muted ${bentoSpans[index]}`}
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="h-full w-full object-cover  object-top grayscale transition duration-500 ease-in-out group-hover:grayscale-0"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
