export default function Footer() {
  return (
    <footer className="relative border-t border-cyber-green/10 py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-mono text-xs text-gray-500">
          <span className="text-cyber-green">sangeeth k@portfolio:~$</span> echo "All systems secure"
        </div>

        <div className="font-mono text-[10px] text-gray-600 flex items-center gap-4">
          <span>&copy; {new Date().getFullYear()} Sangeeth K</span>
          <span className="w-1 h-1 rounded-full bg-cyber-green/30" />
          <span>Built with React + Three.js</span>
          <span className="w-1 h-1 rounded-full bg-cyber-green/30" />
          <span className="text-cyber-green/50">v1.0</span>
        </div>
      </div>
    </footer>
  )
}
