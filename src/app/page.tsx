import SiteHeader from "@/components/SiteHeader"
import Hero from "@/components/Hero"
import Philosophy from "@/components/Philosophy"
import Systems from "@/components/Systems"
import Projects from "@/components/Projects"
import Categories from "@/components/Categories"
import Discovery from "@/components/Discovery"
import Activity from "@/components/Activity"
import OSHome from "@/os/OSHome"
import Principles from "@/components/Principles"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <div className="relative overflow-x-clip bg-[#f1f3f6] text-foreground dark:bg-[#0b0e14]">
      <div className="relative">
        <SiteHeader />
        <main className="flex-1">
          <Hero />
          <Philosophy />
          <Systems />
          <Projects />
          <Categories />
          <Discovery />
          <Activity />
          <OSHome />
          <Principles />
        </main>
        <Footer />
      </div>
    </div>
  )
}