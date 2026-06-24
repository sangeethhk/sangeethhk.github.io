import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const bootLines = [
  { text: '> INITIALIZING SECURE CONNECTION...', delay: 200 },
  { text: '> SYSTEM: SANGEETH_K_PORTFOLIO v1.0', delay: 600 },
  { text: '> AUTH: BIOMETRIC SCAN COMPLETE', delay: 1000 },
  { text: '> STATUS: ACCESS GRANTED', delay: 1400 },
  { text: '> ROLE: PENETRATION TESTER // 3D ENGINEER', delay: 1800 },
  { text: '> LOADING INTERACTIVE INTERFACE...', delay: 2200 },
  { text: '> READY.', delay: 2600 },
]

export default function TerminalOverlay() {
  const [visibleLines, setVisibleLines] = useState([])
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const timers = bootLines.map((line) =>
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, line.text])
      }, line.delay)
    )

    const dismissTimer = setTimeout(() => {
      setDismissed(true)
    }, 4000)

    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(dismissTimer)
    }
  }, [])

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-8 left-8 z-40 max-w-md"
        >
          <div className="glass rounded-lg p-4 font-mono text-xs leading-relaxed shadow-2xl border-cyber-green/20">
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-cyber-green/10">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-cyber-green/80" />
              <span className="text-gray-500 ml-2">terminal — system_boot</span>
            </div>
            {visibleLines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className={`${line === '> READY.' ? 'text-cyber-green font-bold' : line.includes('ACCESS GRANTED') ? 'text-cyber-green' : 'text-gray-300'}`}
              >
                {line}
              </motion.p>
            ))}
            {visibleLines.length < bootLines.length && (
              <span className="inline-block w-2 h-4 bg-cyber-green animate-typing-cursor ml-1" />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
