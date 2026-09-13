import Image from "next/image"

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
        <div className="relative mx-auto aspect-video w-full max-w-lg overflow-hidden rounded-lg border border-line bg-surface">
          <video
            className="absolute inset-0 size-full object-contain"
            autoPlay
            muted
            playsInline
            poster="/coccinella-labs-icon.png"
            aria-hidden="true"
          >
            <source src="/coccinella-labs-wordmark.mp4" type="video/mp4" />
          </video>
          <div
            className="absolute inset-0 bg-background/10"
            aria-hidden="true"
          />
          <Image
            src="/coccinella-labs-icon.png"
            alt="Coccinella Labs organization mark"
            width={280}
            height={280}
            sizes="64px"
            className="absolute bottom-4 left-4 size-14 rounded-md bg-background/85 p-2 object-contain shadow-lg lg:size-16"
            priority
          />
        </div>
      </div>
    </section>
  )
}
