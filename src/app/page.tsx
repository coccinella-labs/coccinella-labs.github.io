import SiteHeader from "@/components/SiteHeader"
import Hero from "@/components/Hero"
import Philosophy from "@/components/Philosophy"
import Projects from "@/components/Projects"
import Categories from "@/components/Categories"
import Discovery from "@/components/Discovery"
import Activity from "@/components/Activity"
import Principles from "@/components/Principles"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Philosophy />
        <Projects />
        <Categories />
        <Discovery />
        <Activity />
        <Principles />
      </main>
      <Footer />
    </>
  )
}
