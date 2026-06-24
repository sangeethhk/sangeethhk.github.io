import { motion } from 'framer-motion'
import { arsenal } from '../data/content'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function SecurityArsenal() {
  return (
    <section id="arsenal" className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-cyber-grid bg-cyber-grid opacity-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="font-mono text-cyber-green text-sm mb-2 tracking-widest">
            {'// SECURITY_ARSENAL'}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Unlocked <span className="text-gradient-green">Loadout</span>
          </h2>
          <div className="h-[1px] w-24 bg-cyber-green/50 mt-4" />
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {arsenal.map((card) => (
            <motion.div
              key={card.id}
              variants={item}
              whileHover={{ scale: 1.02 }}
              className="glass glass-hover rounded-xl p-6 group cursor-default"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl">{card.icon}</span>
                <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded border border-cyber-green/30 text-cyber-green bg-cyber-green/5">
                  {card.status}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyber-green transition-colors">
                {card.title}
              </h3>
              <p className="font-mono text-xs text-cyber-teal/70 mb-3">{card.issuer}</p>
              <p className="text-sm text-gray-400 leading-relaxed">{card.description}</p>

              <div className="mt-4 pt-4 border-t border-cyber-green/10">
                <div className="flex items-center gap-2 text-[10px] font-mono text-cyber-green/50">
                  <span className="w-2 h-2 rounded-full bg-cyber-green/50" />
                  ACCESS_GRANTED
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
