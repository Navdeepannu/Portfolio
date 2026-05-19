import { Button } from "@/components/ui/button";
import { IconCaretRightFilled } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { Mail, SendHorizonal } from "lucide-react";
import Image from "next/image";
import HeaderOne from "../header/header-one";

export default function HeroSectionOne() {
  return (
    <section className="overflow-hidden">
      <HeaderOne />
      <div className="flex flex-col items-center justify-center gap-6 sm:mt-10 mt:20 py-16 md:py-24">
        <Badge
          variant="outline"
          className="text-sm py-1.5 px-3 shadow-sm bg-muted ring-1 ring-foreground/5 cursor-pointer hover:bg-white transition duration-200 hover:shadow-md gap-1"
        >
          Now available for teams and individuals
          <IconCaretRightFilled className="size-4" />
        </Badge>

        <div className="flex flex-col items-center justify-center gap-4 text-center mx-auto max-w-2xl">
          <h1 className="font-semibold bg-clip-text leading-[1.15] md:leading-[1.1] bg-linear-to-b from-neutral-900 to-neutral-600 text-transparent tracking-tight text-4xl md:text-5xl">
            Your personal AI workspace, built around how you actually work
          </h1>

          <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-xl text-balance">
            A smart assistant that connects your notes, conversations, and files
            into one searchable workspace — so you can find answers instantly
            and stay focused on real work.
          </p>
        </div>

        <div className="pt-6">
          <form action="" className="mx-auto max-w-sm">
            <div className="bg-background ring-3 ring-ring/50 has-[input:focus]:ring-ring relative grid grid-cols-[1fr_auto] items-center rounded-full pr-1 shadow shadow-zinc-950/5 has-[input:focus]:ring-2 border">
              <Mail className="pointer-events-none absolute inset-y-0 left-4 my-auto size-4 text-muted-foreground" />

              <input
                placeholder="Enter your email"
                className="h-11 w-full bg-transparent pl-12 text-sm md:text-base focus:outline-none"
                type="email"
              />

              <div className="pr-1.5">
                <Button
                  aria-label="submit"
                  size="sm"
                  className="rounded-2xl bg-gradient-to-t from-neutral-600 ring-1 transition duration-200 ring-ring/50 hover:shadow-sm hover:shadow-ring hover:bg-black via-neutral-700 to-neutral-900 px-4"
                >
                  <span className="hidden md:block">Get started</span>
                  <SendHorizonal
                    className="relative mx-auto size-4 md:hidden"
                    strokeWidth={2}
                  />
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="mask-b-from-40% relative max-w-6xl mx-auto overflow-hidden">
        <div className="rounded-2xl shadow-2xl shadow-zinc-950/50">
          <div className="border-2 border-ring/50 rounded-2xl relative bg-muted inset-shadow-2xs p-2">
            <Image
              src="/data/hero-image.png"
              alt="product-showcase"
              width={2700}
              height={1440}
              className="w-full h-auto rounded-xl border object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
