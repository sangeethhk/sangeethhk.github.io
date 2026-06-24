import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiExternalLink } from 'react-icons/fi'
import { projects } from '../data/content'

const tabs = [
  { id: 'security', label: 'Cybersecurity & Systems' },
  { id: 'creative', label: '3D & Web Development' },
]

export default function CoreOperations() {
  const [activeTab, setActiveTab] = useState('security')

  return (
    <section id="operations" className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cyber-black via-cyber-dark to-cyber-black" />
      <div className="absolute inset-0 bg-cyber-grid bg-cyber-grid opacity-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="font-mono text-cyber-green text-sm mb-2 tracking-widest">
            {'// CORE_OPERATIONS'}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Active <span className="text-gradient-cyber">Projects</span>
          </h2>
          <div className="h-[1px] w-24 bg-cyber-green/50 mt-4" />
        </motion.div>

        <div className="flex gap-1 mb-10 p-1 glass rounded-lg w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`font-mono text-xs md:text-sm px-4 py-2.5 rounded-md transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-cyber-green/15 text-cyber-green shadow-sm shadow-cyber-green/20'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects[activeTab].map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass glass-hover rounded-xl p-6 group"
              >
                <div className="w-full h-32 rounded-lg bg-gradient-to-br from-cyber-green/5 to-cyber-teal/5 mb-4 flex items-center justify-center border border-cyber-green/5 group-hover:border-cyber-green/20 transition-colors">
                  <span className="font-mono text-3xl text-cyber-green/20 group-hover:text-cyber-green/40 transition-colors">
                    {'{ }'}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyber-green transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-400 mb-4 leading-relaxed">{project.desc}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] px-2 py-1 rounded border border-cyber-green/20 text-cyber-green/70 bg-cyber-green/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs text-cyber-teal hover:text-cyber-green transition-colors group/link"
                >
                  <FiExternalLink className="group-hover/link:rotate-45 transition-transform" />
                  View Repository
                </a>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
