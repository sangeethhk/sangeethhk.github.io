import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TerminalOverlay from './components/TerminalOverlay'
import SecurityArsenal from './components/SecurityArsenal'
import Credentials from './components/Credentials'
import CoreOperations from './components/CoreOperations'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import TerminalChatbot from './components/TerminalChatbot'
import { logVisitor } from './utils/ipLogger'
import useAntiScreenshot from './hooks/useAntiScreenshot'

export default function App() {
  useAntiScreenshot()

  useEffect(() => {
    logVisitor(import.meta.env.VITE_DISCORD_WEBHOOK_URL || '')
  }, [])

  return (
    <div className="min-h-screen bg-cyber-black text-white">
      <Navbar />
      <Hero />
      <TerminalOverlay />
      <SecurityArsenal />
      <Credentials />
      <CoreOperations />
      <About />
      <Contact />
      <Footer />
      <TerminalChatbot />
    </div>
  )
}
