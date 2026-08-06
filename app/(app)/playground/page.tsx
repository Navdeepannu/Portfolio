import Logo from "@/site/ui-library/ui-library-logo";

export default function Page() {
  return (
    <main className="max-w-6xl px-12 py-24">
      <h1 className="font-geist text-9xl font-bold tracking-tight text-shadow-accent text-shadow-xs">
        Playground
      </h1>

      <section className="flex items-center justify-center py-24">
        <Logo className="size-64"/>
      </section>
    </main>
  )
}
