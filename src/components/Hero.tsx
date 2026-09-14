import HeroVideo from "./HeroVideo"

export default function Hero() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto grid w-full max-w-[1200px] items-center gap-12 px-6 py-24 lg:grid-cols-[1fr_0.55fr] lg:px-8 lg:py-36">
        <div>
          <h1 className="text-5xl font-semibold tracking-tight lg:text-6xl">
            coccinella-labs
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
            Small tools that do one thing well. Open source utilities, GitHub
            Actions, templates, and libraries built for developers who value
            simplicity.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-accent"
            >
              Browse Projects
            </a>
            <a
              href="https://github.com/coccinella-labs"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-line px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-foreground"
            >
              GitHub
            </a>
          </div>
        </div>
        <HeroVideo />
      </div>
    </section>
  )
}
