import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getResponse } from '../data/chatResponses'

const BOOT_LINES = [
  { text: '> INITIALIZING CHAT INTERFACE...', delay: 200 },
  { text: '> LOADING KNOWLEDGE BASE...', delay: 600 },
  { text: '> INDEXING PORTFOLIO DATA...', delay: 1000 },
  { text: '> CALIBRATING RESPONSE ENGINE...', delay: 1400 },
  { text: '> SYSTEM READY. Type help for available commands.', delay: 1800 },
]

const STORAGE_KEY = 'chatbot_pos'

function loadPosition() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      if (typeof parsed.x === 'number' && typeof parsed.y === 'number') {
        return parsed
      }
    }
  } catch { /* ignore */ }
  return { x: window.innerWidth - 100, y: window.innerHeight - 100 }
}

export default function TerminalChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [bootVisible, setBootVisible] = useState([])
  const [bootDone, setBootDone] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [displayedText, setDisplayedText] = useState('')
  const [pendingResponse, setPendingResponse] = useState('')

  const [pos, setPos] = useState(loadPosition)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [hasMoved, setHasMoved] = useState(false)
  const windowRef = useRef(null)
  const msgEndRef = useRef(null)
  const inputRef = useRef(null)
  const logoRef = useRef(null)
  const typingTimerRef = useRef(null)

  const savePosition = useCallback((x, y) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ x, y }))
    } catch { /* ignore */ }
  }, [])

  useEffect(() => {
    if (!isOpen) {
      setBootVisible([])
      setBootDone(false)
      setMessages([])
      setDisplayedText('')
      setPendingResponse('')
      return
    }

    const timers = BOOT_LINES.map((line) =>
      setTimeout(() => {
        setBootVisible((prev) => [...prev, line.text])
      }, line.delay)
    )

    const doneTimer = setTimeout(() => {
      setBootDone(true)
      setMessages([{ role: 'bot', text: 'How can I help you? Type `help` to see available commands.' }])
    }, BOOT_LINES[BOOT_LINES.length - 1].delay + 400)

    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(doneTimer)
    }
  }, [isOpen])

  useEffect(() => {
    msgEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, bootVisible])

  useEffect(() => {
    if (isOpen && bootDone) {
      inputRef.current?.focus()
    }
  }, [isOpen, bootDone])

  useEffect(() => {
    if (!pendingResponse) return

    setIsTyping(true)
    setDisplayedText('')

    let i = 0
    typingTimerRef.current = setInterval(() => {
      i++
      setDisplayedText(pendingResponse.slice(0, i))
      if (i >= pendingResponse.length) {
        clearInterval(typingTimerRef.current)
        setIsTyping(false)
        setMessages((prev) => [...prev, { role: 'bot', text: pendingResponse }])
        setPendingResponse('')
        setDisplayedText('')
      }
    }, 12)

    return () => clearInterval(typingTimerRef.current)
  }, [pendingResponse])

  const handleSend = useCallback(() => {
    const text = input.trim()
    if (!text || isTyping) return

    setMessages((prev) => [...prev, { role: 'user', text }])
    setInput('')

    const response = getResponse(text)

    if (response === '__CLEAR__') {
      setMessages([])
      return
    }

    if (response === '__EXIT__') {
      setIsOpen(false)
      return
    }

    setPendingResponse(response)
  }, [input, isTyping])

  const handleLogoMouseDown = useCallback((e) => {
    const startX = e.clientX
    const startY = e.clientY
    setIsDragging(true)
    setHasMoved(false)
    setDragStart({ x: startX - pos.x, y: startY - pos.y })
  }, [pos])

  const handleLogoMouseMove = useCallback((e) => {
    if (!isDragging) return
    const dx = Math.abs(e.clientX - (dragStart.x + pos.x))
    const dy = Math.abs(e.clientY - (dragStart.y + pos.y))
    if (dx > 5 || dy > 5) setHasMoved(true)

    let newX = e.clientX - dragStart.x
    let newY = e.clientY - dragStart.y

    newX = Math.max(0, Math.min(newX, window.innerWidth - 72))
    newY = Math.max(0, Math.min(newY, window.innerHeight - 72))

    setPos({ x: newX, y: newY })
  }, [isDragging, dragStart, pos])

  const handleLogoMouseUp = useCallback(() => {
    setIsDragging(false)
    savePosition(pos.x, pos.y)
    if (!hasMoved) setIsOpen((prev) => !prev)
  }, [hasMoved, pos, savePosition])

  const getWindowStyle = () => {
    const logoW = 72
    const windowW = 400
    const windowH = 500
    const gap = 12

    let left = pos.x + logoW + gap
    if (left + windowW > window.innerWidth - 16) {
      left = pos.x - windowW - gap
    }
    if (left < 16) left = 16

    let top = pos.y
    if (top + windowH > window.innerHeight - 16) {
      top = window.innerHeight - windowH - 16
    }
    if (top < 16) top = pos.y - windowH + logoW
    if (top < 16) top = 16

    return { left, top }
  }

  return (
    <>
      <div
        ref={logoRef}
        onMouseDown={handleLogoMouseDown}
        onMouseMove={handleLogoMouseMove}
        onMouseUp={handleLogoMouseUp}
        onMouseLeave={handleLogoMouseUp}
        onTouchStart={(e) => {
          const touch = e.touches[0]
          handleLogoMouseDown({ clientX: touch.clientX, clientY: touch.clientY })
        }}
        onTouchMove={(e) => {
          const touch = e.touches[0]
          handleLogoMouseMove({ clientX: touch.clientX, clientY: touch.clientY })
        }}
        onTouchEnd={handleLogoMouseUp}
        style={{ left: pos.x, top: pos.y }}
        className={`fixed z-50 w-[68px] h-[68px] rounded-xl flex flex-col items-center justify-center gap-1 cursor-grab active:cursor-grabbing select-none transition-shadow duration-300 ${
          isDragging ? 'shadow-2xl shadow-cyber-green/30 scale-105' : ''
        }`}
      >
        <div className="absolute inset-0 rounded-xl bg-cyber-black/90 backdrop-blur-md border border-cyber-green/40 shadow-lg animate-glow-pulse" />
        <div className="relative flex flex-col items-center gap-1">
          <span className="font-mono text-xl font-bold text-cyber-green leading-none">&gt;_</span>
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500/70" />
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/70" />
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-green/70" />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={windowRef}
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            style={getWindowStyle()}
            className="fixed z-[60] w-[400px] max-h-[520px] flex flex-col rounded-xl overflow-hidden shadow-2xl border border-cyber-green/20"
          >
            <div className="bg-cyber-black/95 backdrop-blur-md border-b border-cyber-green/10 px-4 py-2.5 flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-cyber-green/80" />
              </div>
              <span className="font-mono text-[11px] text-gray-500 truncate">
                sangeeth_k@portfolio:~/chat
              </span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-cyber-black/90 backdrop-blur-md" style={{ minHeight: 0, maxHeight: 380 }}>
              {!bootDone && bootVisible.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="font-mono text-xs text-cyber-green/80"
                >
                  {line}
                </motion.p>
              ))}
              {!bootDone && bootVisible.length < BOOT_LINES.length && (
                <span className="inline-block w-2 h-4 bg-cyber-green animate-typing-cursor" />
              )}

              {bootDone && messages.map((msg, i) => (
                <div key={i} className="font-mono text-xs leading-relaxed">
                  {msg.role === 'user' ? (
                    <p>
                      <span className="text-cyber-teal/80">guest@unknown:~$</span>{' '}
                      <span className="text-white">{msg.text}</span>
                    </p>
                  ) : (
                    <div>
                      <p className="text-cyber-green/80">sangeeth_k@bot:~$</p>
                      <p className="text-gray-300 whitespace-pre-wrap pl-4 mt-0.5">{msg.text}</p>
                    </div>
                  )}
                </div>
              ))}

              {isTyping && pendingResponse && (
                <div className="font-mono text-xs leading-relaxed">
                  <p className="text-cyber-green/80">sangeeth_k@bot:~$</p>
                  <p className="text-gray-300 whitespace-pre-wrap pl-4 mt-0.5">
                    {displayedText}
                    <span className="inline-block w-1.5 h-3.5 bg-cyber-green animate-typing-cursor ml-0.5" />
                  </p>
                </div>
              )}

              {bootDone && !isTyping && !pendingResponse && (
                <div ref={msgEndRef} />
              )}
            </div>

            <div className="bg-cyber-black/95 backdrop-blur-md border-t border-cyber-green/10 px-4 py-2.5 flex items-center gap-2">
              <span className="font-mono text-[11px] text-cyber-green/70 whitespace-nowrap">root@portfolio:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSend() }}
                placeholder={bootDone ? 'Type a command...' : 'Booting...'}
                disabled={!bootDone || isTyping}
                className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs placeholder-gray-600"
              />
              <button
                onClick={handleSend}
                disabled={!bootDone || isTyping || !input.trim()}
                className="font-mono text-xs text-cyber-green hover:text-cyber-teal transition-colors disabled:text-gray-600 disabled:cursor-not-allowed"
              >
                ⏎
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
