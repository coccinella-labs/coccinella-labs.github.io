import SiteHeader from "@/components/SiteHeader"
import Hero from "@/components/Hero"
import Systems from "@/components/Systems"
import Projects from "@/components/Projects"
import Activity from "@/components/Activity"
import SysStatus from "@/components/SysStatus"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <div className="relative overflow-x-clip bg-background text-foreground">
      <div className="relative">
        <SiteHeader />
        <main className="flex-1">
          <Hero />
          <Systems />
          <Projects />
          <Activity />
        </main>
        <SysStatus />
        <Footer />
      </div>
    </div>
  )
}