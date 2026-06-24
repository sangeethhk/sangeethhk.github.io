import { motion } from 'framer-motion'
import { tools } from '../data/content'

const categoryColors = {
  os: 'text-cyber-green border-cyber-green/30',
  lang: 'text-cyber-teal border-cyber-teal/30',
  tool: 'text-cyber-purple border-cyber-purple/30',
}

const categoryBgs = {
  os: 'bg-cyber-green/5',
  lang: 'bg-cyber-teal/5',
  tool: 'bg-cyber-purple/5',
}

export default function About() {
  return (
    <section id="about" className="relative py-24 px-6 overflow-hidden">
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
            {'// MISSION_BRIEF'}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Operator <span className="text-gradient-cyber">Profile</span>
          </h2>
          <div className="h-[1px] w-24 bg-cyber-green/50 mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-xl p-8">
              <div className="flex items-start gap-3 mb-6">
                <span className="text-cyber-green font-mono text-sm mt-1">{'>'}</span>
                <div>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Currently pursuing a B.Tech in Cybersecurity with a background in Computer Hardware Engineering. 
                    I thrive at the intersection of offensive security and creative technology — finding vulnerabilities 
                    in complex systems by day, crafting interactive 3D experiences by night.
                  </p>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    My workflow bridges two worlds: Kali Linux terminals and Blender viewports. I believe the best 
                    security engineers are creative problem-solvers, and the best creative technologists understand 
                    how systems break. This duality defines everything I build.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    Whether I'm exploiting a buffer overflow or optimizing a Three.js shader, the mission is the same:
                    <span className="text-cyber-green"> push boundaries, break limits, and build better.</span>
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-lg bg-cyber-green/5 border border-cyber-green/10 font-mono text-xs">
                <p className="text-cyber-green mb-1">{'> cat mission_statement.txt'}</p>
                <p className="text-gray-400">{'"Secure the future. Create the extraordinary."'}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="glass rounded-xl p-6">
              <h3 className="font-mono text-sm text-cyber-green mb-4 tracking-wider">
                {'// TECH_TOOLKIT'}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {tools.map((tool) => (
                  <span
                    key={tool.name}
                    className={`font-mono text-xs px-3 py-1.5 rounded-md border ${categoryColors[tool.category]} ${categoryBgs[tool.category]} transition-all duration-300 hover:scale-105`}
                  >
                    {tool.name}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
