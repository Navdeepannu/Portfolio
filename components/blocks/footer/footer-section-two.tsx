import { IconHexagonFilled } from "@tabler/icons-react";
import {
  IconBrandLinkedin,
  IconBrandGithub,
  IconBrandX,
  IconMail,
} from "@tabler/icons-react";
import Link from "next/link";

const links = [
  { title: "Features", href: "#" },
  { title: "Solutions", href: "#" },
  { title: "Customers", href: "#" },
  { title: "Pricing", href: "#" },
  { title: "Help", href: "#" },
];

const socials = [
  {
    title: "LinkedIn",
    href: "#",
    icon: IconBrandLinkedin,
  },
  {
    title: "GitHub",
    href: "#",
    icon: IconBrandGithub,
  },
  {
    title: "Twitter",
    href: "#",
    icon: IconBrandX,
  },
  {
    title: "Email",
    href: "#",
    icon: IconMail,
  },
];

export default function FooterSectionTwo() {
  return (
    <footer className="py-40">
      <div className="mx-auto max-w-6xl ">
        <div className="flex items-center justify-between ">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-1">
              <IconHexagonFilled className="size-7 shrink-0 fill-neutral-900 stroke-1 stroke-gray-300 dark:fill-neutral-100 dark:stroke-neutral-600" />
              <span className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                Hex UI
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {links.map((item) => (
              <Link
                href={item.href}
                key={item.title}
                className="text-sm font-normal hover:text-black text-neutral-600 duration-200 transition"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-neutral-200 border-dashed  py-6 mt-8 dark:border-neutral-800 sm:flex-row">
          <span className="text-center text-sm text-muted-foreground sm:text-left">
            © {new Date().getFullYear()} Hex UI, All rights reserved
          </span>
          <ul className="flex items-center gap-5">
            {socials.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.title}>
                  <a
                    href={item.href}
                    aria-label={item.title}
                    className="text-neutral-700 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
                  >
                    <Icon className="size-5" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
}
