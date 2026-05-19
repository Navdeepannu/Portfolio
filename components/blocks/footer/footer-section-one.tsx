import { Button } from "@/components/ui/button";
import {
  IconArrowRight,
  IconHexagonFilled,
  IconSend,
} from "@tabler/icons-react";
import Link from "next/link";

const products = [
  { title: "Overview", href: "#" },
  { title: "Features", href: "#" },
  { title: "Integrations", href: "#" },
  { title: "Use cases", href: "#" },
  { title: "Pricing", href: "#" },
  { title: "Demo", href: "#" },
];

const company = [
  { title: "About us", href: "#" },
  { title: "Careers", href: "#" },
  { title: "Blog", href: "#" },
  { title: "Customers", href: "#" },
  { title: "Contact", href: "#" },
  { title: "Legal & Privacy", href: "#" },
];

export default function FooterSectionOne() {
  return (
    <footer className="border-t border-neutral-200 py-8 dark:border-neutral-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-12">
          {/* Brand + CTA — full width on mobile, 2 cols on lg */}
          <div className="flex flex-col gap-2 sm:col-span-2 lg:col-span-2">
            <div className="flex items-start gap-1 justify-start">
              <IconHexagonFilled className="size-8 shrink-0 fill-neutral-900 stroke-1 stroke-gray-300 dark:fill-neutral-100 dark:stroke-neutral-600" />
              <span className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                Hex UI
              </span>
            </div>

            <div className="text-sm font-normal pl-1 max-w-2xs ">
              Modern UI components for fast and accessible web apps.
            </div>
            <Button variant="secondary" className="w-fit mt-2">
              Start Free trial
              <IconArrowRight className="size-4" />
            </Button>
          </div>

          {/* Products */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Products
            </h4>
            <ul className="list-none space-y-2">
              {products.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Company
            </h4>
            <ul className="list-none space-y-2">
              {company.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter — full width on mobile/sm, 1 col on lg */}
          <div className="flex flex-col gap-3 sm:col-span-2 lg:col-span-1">
            <h4 className="text-sm font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Newsletter
            </h4>
            <div className="flex overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800/50">
              <input
                type="email"
                aria-label="Email for newsletter"
                placeholder="Your email"
                className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-neutral-700 outline-none placeholder:text-neutral-400 dark:text-neutral-300 dark:placeholder:text-neutral-500"
              />
              <button
                type="button"
                aria-label="Subscribe"
                className="shrink-0 rounded-none bg-neutral-900 px-4 py-3 text-white transition-colors hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
              >
                <IconSend className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-200 mt-8 pt-12">
        <span className="text-muted-foreground block text-center text-sm">
          {" "}
          © {new Date().getFullYear()} Hex UI, All rights reserved
        </span>
      </div>
    </footer>
  );
}
