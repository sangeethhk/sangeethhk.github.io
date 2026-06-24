import { arsenal, certificates, projects, tools, socialLinks } from './content'

function formatList(items, transform) {
  return items.map((item, i) => `${i + 1}. ${transform(item)}`).join('\n')
}

export function getResponse(input) {
  const text = input.toLowerCase().trim()

  if (!text) return 'Please enter a command. Type `help` for available commands.'

  if (text === 'help') {
    return [
      'Available commands:',
      '',
      '  about        — Who I am and what I do',
      '  certs        — My certifications & credentials',
      '  arsenal      — Security arsenal loadout',
      '  projects     — Projects I have built',
      '  skills       — My technical toolkit',
      '  contact      — How to reach me',
      '  linkedin     — My LinkedIn profile',
      '  github       — My GitHub repos',
      '  clear        — Clear the terminal',
      '  exit         — Close the terminal',
    ].join('\n')
  }

  if (text === 'clear') return '__CLEAR__'
  if (text === 'exit' || text === 'close') return '__EXIT__'

  if (text.includes('about') || text.includes('who are you') || text.includes('bio')) {
    return [
      'Sangeeth K — Cybersecurity Analyst, Certified Penetration Tester & 3D Web Developer.',
      '',
      'Currently pursuing a B.Tech in Cybersecurity with a background in Computer Hardware Engineering.',
      'I bridge offensive security and creative technology: finding vulnerabilities in complex systems',
      'by day, crafting interactive 3D experiences with Blender and Three.js by night.',
      '',
      'Mission: Secure the future. Create the extraordinary.',
    ].join('\n')
  }

  if (text.includes('cert') || text.includes('credential') || text.includes('badge')) {
    const lines = certificates.map(
      (c) => `  ${c.icon} ${c.title} — ${c.issuer} [${c.badge}]`
    )
    return ['Verified Credentials:', '', ...lines].join('\n')
  }

  if (text.includes('arsenal') || text.includes('loadout')) {
    const lines = arsenal.map((a) => `  ${a.icon} ${a.title} — ${a.status}`)
    return ['Security Arsenal Loadout:', '', ...lines].join('\n')
  }

  if (text.includes('project') || text.includes('work') || text.includes('portfolio')) {
    const sec = projects.security.map((p) => `  🔐 ${p.title} (${p.tags.join(', ')})`)
    const cre = projects.creative
      ? projects.creative.map((p) => `  🎨 ${p.title} (${p.tags.join(', ')})`)
      : []
    return [
      'Active Projects:',
      '',
      '--- Cybersecurity & Systems ---',
      ...sec,
      '',
      '--- 3D & Web Development ---',
      ...(cre.length ? cre : ['  (creative projects coming soon)']),
    ].join('\n')
  }

  if (text.includes('skill') || text.includes('tool') || text.includes('tech') || text.includes('stack')) {
    const os = tools.filter((t) => t.category === 'os').map((t) => t.name)
    const lang = tools.filter((t) => t.category === 'lang').map((t) => t.name)
    const tool = tools.filter((t) => t.category === 'tool').map((t) => t.name)
    return [
      'Technical Toolkit:',
      '',
      `  OS:        ${os.join(', ')}`,
      `  Languages: ${lang.join(', ')}`,
      `  Tools:     ${tool.join(', ')}`,
    ].join('\n')
  }

  if (text.includes('contact') || text.includes('email') || text.includes('reach')) {
    const email = socialLinks.find((l) => l.label === 'Email')
    return [
      'Secure Uplink:',
      '',
      `  Email:  ${email ? email.url.replace('mailto:', '') : 'N/A'}`,
      '',
      'Or use the contact form in the Secure Uplink section below.',
    ].join('\n')
  }

  if (text.includes('linkedin')) {
    const li = socialLinks.find((l) => l.label === 'LinkedIn')
    return li ? `LinkedIn: ${li.url}` : 'Not available.'
  }

  if (text.includes('github')) {
    const gh = socialLinks.find((l) => l.label === 'GitHub')
    return gh ? `GitHub: ${gh.url}` : 'Not available.'
  }

  return [
    `Command not recognized: "${input}"`,
    '',
    'Type `help` for a list of available commands.',
  ].join('\n')
}
