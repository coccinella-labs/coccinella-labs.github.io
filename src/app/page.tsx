import SiteHeader from "@/components/SiteHeader"
import OSHome, { Wallpaper } from "@/os/OSHome"
import Philosophy from "@/components/Philosophy"
import Showcase from "@/components/Showcase"
import Projects from "@/components/Projects"
import Categories from "@/components/Categories"
import Discovery from "@/components/Discovery"
import Activity from "@/components/Activity"
import Principles from "@/components/Principles"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <div className="relative overflow-x-clip bg-[#f1f3f6] text-foreground dark:bg-[#0b0e14]">
      <Wallpaper />
      <div className="relative">
        <SiteHeader />
        <main className="flex-1">
          <OSHome />
          <Philosophy />
          <Showcase />
          <Projects />
          <Categories />
          <Discovery />
          <Activity />
          <Principles />
        </main>
        <Footer />
      </div>
    </div>
  )
}
