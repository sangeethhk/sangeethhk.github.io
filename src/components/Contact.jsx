import { motion } from 'framer-motion'
import { socialLinks } from '../data/content'

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault()
    // form submission logic placeholder
  }

  return (
    <section id="contact" className="relative py-24 px-6 overflow-hidden">
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
            {'// SECURE_UPLINK'}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Establish <span className="text-gradient-cyber">Connection</span>
          </h2>
          <div className="h-[1px] w-24 bg-cyber-green/50 mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="glass rounded-xl p-8 space-y-6">
              <div className="flex items-center gap-2 mb-2 pb-3 border-b border-cyber-green/10">
                <span className="w-2.5 h-2.5 rounded-full bg-cyber-green" />
                <span className="font-mono text-xs text-gray-500">ENCRYPTED_CHANNEL</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs text-gray-500 mb-1.5">// NAME</label>
                  <input
                    type="text"
                    placeholder="Your designation"
                    className="w-full bg-cyber-black/50 border border-cyber-green/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyber-green/40 transition-colors font-mono"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-gray-500 mb-1.5">// UPLINK_ADDR</label>
                  <input
                    type="email"
                    placeholder="your@domain.com"
                    className="w-full bg-cyber-black/50 border border-cyber-green/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyber-green/40 transition-colors font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs text-gray-500 mb-1.5">// SUBJECT</label>
                <input
                  type="text"
                  placeholder="Transmission subject"
                  className="w-full bg-cyber-black/50 border border-cyber-green/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyber-green/40 transition-colors font-mono"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-gray-500 mb-1.5">// MESSAGE</label>
                <textarea
                  rows={5}
                  placeholder="Encrypt your message..."
                  className="w-full bg-cyber-black/50 border border-cyber-green/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyber-green/40 transition-colors font-mono resize-none"
                />
              </div>

              <button
                type="submit"
                className="cyber-button w-full text-sm"
              >
                [Transmit Message]
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            <div className="glass rounded-xl p-8">
              <h3 className="font-mono text-sm text-cyber-green mb-6 tracking-wider">
                {'// EXTERNAL_LINKS'}
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass glass-hover rounded-lg p-4 flex items-center gap-4 group"
                  >
                    <span className="text-2xl">{link.icon}</span>
                    <div>
                      <p className="font-mono text-sm text-white group-hover:text-cyber-green transition-colors">
                        {link.label}
                      </p>
                      <p className="font-mono text-[10px] text-gray-500">
                        {link.url.replace('mailto:', '').replace('https://', '')}
                      </p>
                    </div>
                    <span className="ml-auto font-mono text-[10px] text-cyber-green/50 group-hover:text-cyber-green transition-colors">
                      {'->'}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="glass rounded-xl p-6">
              <div className="font-mono text-xs text-gray-500 space-y-1">
                <p className="text-cyber-green">{'> ping sangeeth_k'}</p>
                <p className="text-gray-400">PING sangeeth_k (192.168.1.1): 56 data bytes</p>
                <p className="text-gray-400">64 bytes from 192.168.1.1: icmp_seq=1 ttl=64 time=0.3ms</p>
                <p className="text-gray-400">64 bytes from 192.168.1.1: icmp_seq=2 ttl=64 time=0.2ms</p>
                <p className="text-cyber-green">3 packets transmitted, 3 received, 0% packet loss</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
