import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import Categories from './components/Categories'
import PainFeed from './components/PainFeed'
import WhyShare from './components/WhyShare'
import PainForm from './components/PainForm'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-forge-bg noise-bg">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Categories />
      <PainFeed />
      <WhyShare />
      <PainForm />
      <Footer />
    </div>
  )
}
