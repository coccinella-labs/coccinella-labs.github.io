import Link from "next/link"

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center px-6">
      <div className="w-full max-w-md py-24 text-center">
        <p className="font-mono text-sm font-medium text-accent">404</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">
          Page not found.
        </h1>
        <p className="mt-4 text-base leading-7 text-muted">
          The page you are looking for doesn&apos;t exist. It may have moved or
          was never here.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-accent"
        >
          Back to coccinella-labs
        </Link>
      </div>
    </main>
  )
}
