import Image from "next/image"

const buildDate = process.env.BUILD_DATE

const links = [
  {
    href: "https://github.com/palmshed",
    label: "Palmshed",
    icon: "https://github.com/palmshed.png?size=40",
  },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border">
      <Image
        src="/alaska-footer.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-20 grayscale"
      />
      <div className="absolute inset-0 bg-background/85" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-[1200px] px-6 py-12 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">© Coccinella Labs</p>
          <ul className="flex items-center gap-x-8">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="inline-flex items-center gap-1.5 text-sm text-muted underline-offset-4 transition-colors hover:text-foreground hover:underline"
                >
                  {link.icon ? (
                    <Image
                      src={link.icon}
                      alt=""
                      width={20}
                      height={20}
                      className="size-5 shrink-0 rounded-full ring-1 ring-inset ring-border"
                    />
                  ) : null}
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          {buildDate ? (
            <p className="text-sm text-muted">Last updated {buildDate}</p>
          ) : null}
        </div>
      </div>
    </footer>
  )
}
