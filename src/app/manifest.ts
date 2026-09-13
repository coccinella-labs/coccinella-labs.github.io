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
        sizes: "460x460",
        type: "image/png",
      },
    ],
  }
}
