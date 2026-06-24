import { useEffect } from 'react'

const BLOCKED_KEYS = [
  { key: 'F12', ctrl: false, shift: false },
  { key: 'i', ctrl: true, shift: true },
  { key: 'j', ctrl: true, shift: true },
  { key: 'u', ctrl: true, shift: false },
  { key: 'c', ctrl: true, shift: true },
  { key: 's', ctrl: true, shift: false },
]

const DEVTOOLS_THRESHOLD = 160

export default function useAntiScreenshot() {
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @media print {
        body { display: none !important; }
      }
      body {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-touch-callout: none !important;
      }
      img, video, canvas {
        -webkit-user-drag: none !important;
        user-drag: none !important;
        pointer-events: none !important;
      }
    `
    document.head.appendChild(style)

    const handleContextMenu = (e) => {
      e.preventDefault()
      return false
    }

    const handleKeyDown = (e) => {
      const match = BLOCKED_KEYS.some(
        (bk) =>
          (e.key === bk.key || e.code === bk.key || e.keyCode === 44) &&
          e.ctrlKey === bk.ctrl &&
          e.shiftKey === bk.shift
      )
      if (match) {
        e.preventDefault()
        e.stopPropagation()
        return false
      }
    }

    let devToolsInterval = null
    const detectDevTools = () => {
      const widthDiff = window.outerWidth - window.innerWidth
      const heightDiff = window.outerHeight - window.innerHeight
      if (widthDiff > DEVTOOLS_THRESHOLD || heightDiff > DEVTOOLS_THRESHOLD) {
        document.title = '⚠ Restricted Area'
      }
    }

    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('keydown', handleKeyDown, true)
    document.addEventListener('keyup', (e) => {
      if (e.key === 'PrintScreen') {
        e.preventDefault()
        return false
      }
    })
    devToolsInterval = setInterval(detectDevTools, 1000)

    return () => {
      document.head.removeChild(style)
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('keydown', handleKeyDown, true)
      if (devToolsInterval) clearInterval(devToolsInterval)
    }
  }, [])
}
