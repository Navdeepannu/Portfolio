export default function PagesPage() {
  return (
    <div className="mx-auto w-full px-24 py-12">
      <div className="grid grid-cols-3 gap-2"></div>
    </div>
  )
}

const Card = ({ image, title, category }: { image: string; title: string; category: string }) => {
  return (
    <>
      <div className="h-120 w-90 rounded-xl border bg-card p-1">
        <div className="rounded-lg shadow-sm ring-1 ring-foreground/6.5">
          <img
            src="https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTljn0lnIziS93GUAyT2Loud5qMEamYgj7C0BVN"
            alt="image"
            className="aspect-4/3 rounded-lg object-cover"
          />
        </div>
        <h2 className="text-md font-medium tracking-tight text-foreground">Landing One</h2>
        <p className="text-xs text-accent-foreground">AI ERA</p>
      </div>
      <div className="h-120 w-90 rounded-xl border bg-card p-1">
        <div className="rounded-lg shadow-sm ring-1 ring-foreground/6.5">
          <img
            src="https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTljn0lnIziS93GUAyT2Loud5qMEamYgj7C0BVN"
            alt="image"
            className="aspect-4/3 rounded-lg object-cover"
          />
        </div>
        <h2 className="text-md font-medium tracking-tight text-foreground">Landing One</h2>
        <p className="text-xs text-accent-foreground">AI ERA</p>
      </div>
      <div className="h-120 w-90 rounded-xl border bg-card p-1">
        <div className="rounded-lg shadow-sm ring-1 ring-foreground/6.5">
          <img
            src="https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTljn0lnIziS93GUAyT2Loud5qMEamYgj7C0BVN"
            alt="image"
            className="aspect-4/3 rounded-lg object-cover"
          />
        </div>
        <h2 className="text-md font-medium tracking-tight text-foreground">Landing One</h2>
        <p className="text-xs text-accent-foreground">AI ERA</p>
      </div>
    </>
  )
}
