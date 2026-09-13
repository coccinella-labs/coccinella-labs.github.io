import Image from "next/image"

const licenseUrl =
  "https://github.com/coccinella-labs/coccinella-labs.github.io/blob/main/LICENSE"

const buildDate = process.env.BUILD_DATE

const links = [
  { href: "https://github.com/coccinella-labs", label: "GitHub" },
  { href: "https://github.com/palmshed", label: "A Palmshed company" },
  { href: licenseUrl, label: "License" },
  { href: "mailto:hello@coccinella-labs.dev", label: "Contact" },
  { href: "/about/", label: "About" },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line">
      <Image
        src="/alaska-footer.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-20 grayscale"
      />
      <div className="absolute inset-0 bg-background/85" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-[1200px] px-6 py-12 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-base font-semibold tracking-tight">coccinella-labs</p>
          <p className="text-sm text-muted">
            © coccinella-labs ·{" "}
            <a
              href={licenseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              MIT License
            </a>
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm text-muted underline-offset-4 transition-colors hover:text-foreground hover:underline"
                >
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
