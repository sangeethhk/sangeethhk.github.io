import { motion } from 'framer-motion'
import ThreeScene from './ThreeScene'
import { useTypewriter } from '../hooks/useTypewriter'

const typeTexts = [
  'Securing the Digital Frontier, Crafting Interactive Worlds.',
  'Certified Penetration Tester ',
  'Hardware Engineer',
]

export default function Hero() {
  const typedLine = useTypewriter(typeTexts, { typingSpeed: 40, deletingSpeed: 20, pauseDuration: 3000 })

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-cyber-grid bg-cyber-grid opacity-30" />

      <div className="absolute inset-0 z-0">
        <ThreeScene />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-cyber-black/80 via-cyber-black/50 to-transparent z-[1]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="font-mono text-cyber-green text-sm mb-4 tracking-widest">
              {'<SYSTEM_INITIALIZED />'}
            </p>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
              <span className="text-white">Sangeeth K</span>
              <br />
              <span className="text-gradient-cyber text-3xl md:text-4xl lg:text-5xl">
                Cyber Security Analyst & Hardware Engineer
              </span>
            </h1>

            <div className="h-12 md:h-14 mb-8">
              <p className="text-gray-300 text-lg md:text-xl font-mono">
                {typedLine}
                <span className="inline-block w-2 h-5 bg-cyber-green animate-typing-cursor ml-1" />
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <a href="#arsenal" className="cyber-button text-sm">
                [Explore Arsenal]
              </a>
              <a href="#contact" className="cyber-button text-sm border-cyber-teal text-cyber-teal hover:shadow-cyber-teal/30 hover:border-cyber-teal">
                [Deploy Contact]
              </a>
              <a href="#resume" className="cyber-button text-sm">
                [View Resume]
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-cyber-green/40 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-cyber-green rounded-full mt-2 animate-bounce" />
        </div>
      </motion.div>
    </section>
  )
}
