import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

const siteUrl = "https://coccinella-labs.github.io"
const organizationIcon = `${siteUrl}/coccinella-labs-icon.png`

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "coccinella-labs",
  url: siteUrl,
  logo: organizationIcon,
  sameAs: ["https://github.com/coccinella-labs"],
  description: "Small developer tools.",
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "coccinella-labs",
    template: "%s · coccinella-labs",
  },
  description: "Small developer tools.",
  icons: {
    icon: [{ url: "/coccinella-labs-icon.png", sizes: "460x460", type: "image/png" }],
    apple: [{ url: "/coccinella-labs-icon.png", sizes: "460x460" }],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "coccinella-labs",
    description: "Small developer tools.",
    siteName: "coccinella-labs",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "coccinella-labs: small tools that do one thing well",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "coccinella-labs",
    description: "Small developer tools.",
    images: ["/og.png"],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function () {
  try {
    var t = localStorage.getItem("coccinella-labs:theme") || "system";
    var dark =
      t === "dark" ||
      (t === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.add(dark ? "dark" : "light");
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", dark ? "#0d1117" : "#ffffff");
  } catch (e) {}
})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        {children}
      </body>
    </html>
  )
}
