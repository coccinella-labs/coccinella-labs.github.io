import type { MetadataRoute } from "next"

export const dynamic = "force-static"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "coccinella-labs",
    short_name: "coccinella-labs",
    description: "Small developer tools.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1f883d",
    icons: [
      {
        src: "/coccinella-labs-icon.png",
        sizes: "1024x1024",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
