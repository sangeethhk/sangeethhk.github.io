import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiExternalLink, FiChevronDown } from 'react-icons/fi'
import { certificates, achievements } from '../data/content'

function CertificateCard({ cert, index }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`glass rounded-xl overflow-hidden group cursor-pointer transition-all duration-300 ${
        expanded ? 'border-cyber-green/40 shadow-lg shadow-cyber-green/10' : ''
      }`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className={`h-2 w-full bg-gradient-to-r ${cert.color}`} />

      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{cert.icon}</span>
            <div>
              <h3 className="text-base font-bold text-white group-hover:text-cyber-green transition-colors leading-tight">
                {cert.title}
              </h3>
              <p className="font-mono text-xs text-cyber-teal/60">{cert.issuer}</p>
            </div>
          </div>
          <span className="font-mono text-[9px] uppercase tracking-widest px-2 py-1 rounded border border-cyber-green/20 text-cyber-green/70 bg-cyber-green/5 whitespace-nowrap">
            {cert.badge}
          </span>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="text-sm text-gray-400 leading-relaxed mb-3 pt-2 border-t border-cyber-green/10">
                {cert.description}
              </p>
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-gray-500">
                  ID: <span className="text-cyber-green/60">{cert.credentialId}</span>
                </span>
                <span className="text-gray-500">
                  Issued: <span className="text-gray-400">{cert.date}</span>
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-cyber-green/5">
          <span className="font-mono text-[10px] text-cyber-green/40 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-green/50" />
            VERIFIED_CREDENTIAL
          </span>
          <button className="font-mono text-[10px] text-gray-500 hover:text-cyber-green transition-colors flex items-center gap-1">
            {expanded ? 'Collapse' : 'Verify'}
            <FiChevronDown className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

function AchievementCard({ achievement, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ x: 4 }}
      className="relative pl-8 pb-8 border-l-2 border-cyber-green/20 last:pb-0 group"
    >
      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-cyber-black border-2 border-cyber-green/40 group-hover:border-cyber-green group-hover:shadow-[0_0_12px_rgba(0,255,65,0.3)] transition-all duration-300 flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-cyber-green/60 group-hover:bg-cyber-green transition-colors" />
      </div>

      <div className={`glass rounded-lg p-4 ${achievement.highlight ? 'border-cyber-green/30 bg-cyber-green/[0.02]' : ''}`}>
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">{achievement.icon}</span>
            <h3 className="text-sm font-bold text-white group-hover:text-cyber-green transition-colors">
              {achievement.title}
            </h3>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded border border-cyber-teal/20 text-cyber-teal/70 bg-cyber-teal/5 whitespace-nowrap">
            {achievement.result}
          </span>
        </div>
        <p className="text-sm text-gray-400 leading-relaxed ml-9">{achievement.description}</p>
        <div className="ml-9 mt-2">
          <span className="font-mono text-[10px] text-gray-600">{achievement.date}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function Credentials() {
  return (
    <section id="credentials" className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cyber-black via-cyber-dark to-cyber-black" />
      <div className="absolute inset-0 bg-cyber-grid bg-cyber-grid opacity-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="font-mono text-cyber-green text-sm mb-2 tracking-widest">
            {'// CREDENTIALS &_ACHIEVEMENTS'}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Verified <span className="text-gradient-cyber">Credentials</span>
          </h2>
          <div className="h-[1px] w-24 bg-cyber-green/50 mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3">
            <div className="flex items-center gap-2 mb-6">
              <span className="font-mono text-xs text-cyber-green/60 tracking-wider">
                {'>>'} CERTIFICATE_WALL
              </span>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-cyber-green/20 to-transparent" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certificates.map((cert, i) => (
                <CertificateCard key={cert.id} cert={cert} index={i} />
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <span className="font-mono text-xs text-cyber-green/60 tracking-wider">
                {'>>'} MISSION_MILESTONES
              </span>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-cyber-green/20 to-transparent" />
            </div>

            <div>
              {achievements.map((ach, i) => (
                <AchievementCard key={ach.id} achievement={ach} index={i} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-6 glass rounded-lg p-4"
            >
              <div className="font-mono text-[11px] text-gray-500 space-y-1">
                <p className="text-cyber-green">{'> stats --achievements'}</p>
                <p className="text-gray-400">Total Certifications: {certificates.length}</p>
                <p className="text-gray-400">Key Achievements: {achievements.length}</p>
                <p className="text-gray-400">Active Bounties: 3</p>
                <p className="text-cyber-green">Status: ACTIVE // ACCEPTING MISSIONS</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
