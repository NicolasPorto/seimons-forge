import ForgeCanvas from './components/ForgeCanvas'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import WhatWeBuild from './components/WhatWeBuild'
import Categories from './components/Categories'
import PainFeed from './components/PainFeed'
import WhyShare from './components/WhyShare'
import PainForm from './components/PainForm'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <ForgeCanvas />
      <div className="relative min-h-screen bg-forge-bg noise-bg" style={{ zIndex: 1 }}>
        <Navbar />
        <Hero />
        <HowItWorks />
        <WhatWeBuild />
        <Categories />
        <PainFeed />
        <WhyShare />
        <PainForm />
        <Footer />
      </div>
    </>
  )
}
