import { useTheme } from '@/lib/theme';

const SKILLS = [
  { name: 'Networking', icon: '🌐', items: ['BGP · OSPF · MPLS', 'SD-WAN · QoS', 'Packet Analysis'] },
  { name: 'Cloud', icon: '☁️', items: ['AWS · GCP · Azure', 'VPC · IAM', 'Cost Optimisation'] },
  { name: 'DevOps', icon: '⚙️', items: ['Terraform · Ansible', 'CI/CD Pipelines', 'GitHub Actions'] },
  { name: 'Kubernetes', icon: '☸️', items: ['Cluster Admin', 'Helm · Kustomize', 'Service Mesh'] },
  { name: 'Linux', icon: '🐧', items: ['Ubuntu · RHEL', 'Shell Scripting', 'System Hardening'] },
  { name: 'Monitoring', icon: '📊', items: ['Prometheus · Grafana', 'ELK Stack', 'Alerting'] },
];

const EXPERIENCE = [
  {
    company: 'Airtel India',
    role: 'Network Engineer',
    period: '2022 – Present',
    desc: 'Managing backbone network infrastructure across India — BGP peering, MPLS core, SD-WAN rollouts, and incident response at scale.',
    icon: '📡',
    current: true,
  },
  {
    company: 'Freelance / Projects',
    role: 'Cloud & DevOps',
    period: '2021 – 2022',
    desc: 'Built Terraform modules, automated CI/CD pipelines, deployed Kubernetes clusters on GKE and EKS for small businesses.',
    icon: '🚀',
    current: false,
  },
];

const POSTS_PREVIEW = [
  { emoji: '☁️', cat: 'Cloud', catColor: '#60a5fa', title: 'Understanding VPC Peering in AWS', excerpt: 'A deep dive into how VPC peering works and when to use Transit Gateway instead.' },
  { emoji: '☸️', cat: 'Kubernetes', catColor: '#a78bfa', title: 'Hardening K8s RBAC for Production', excerpt: 'Least-privilege patterns that actually make sense in the real world.' },
  { emoji: '🏀', cat: 'Basketball', catColor: '#f97316', title: 'What basketball taught me about DevOps', excerpt: 'Teamwork, playbooks, and why the best teams have strong defaults.' },
];

export default function HomePage() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--fg)', fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* Nav */}
      <nav className="nav-glass" style={{ position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: 800, fontSize: '1rem', letterSpacing: '-0.02em', color: 'var(--fg)' }}>
            Naveen<span style={{ color: 'var(--accent)' }}>.</span>dev
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            {['About', 'Skills', 'Experience', 'Blog'].map(link => (
              <a
                key={link}
                href={link === 'Blog' ? '/blog' : `#${link.toLowerCase()}`}
                style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--muted)', transition: 'color 0.15s', textDecoration: 'none' }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--fg)')}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--muted)')}
              >
                {link}
              </a>
            ))}
            <button onClick={toggle} className="theme-toggle" title={isDark ? 'Light mode' : 'Dark mode'}>
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="about" style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: 56, alignItems: 'center' }}>
          <div>
            {/* Status badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: isDark ? 'rgba(52,211,153,0.08)' : 'rgba(5,150,105,0.08)', border: `1px solid ${isDark ? 'rgba(52,211,153,0.25)' : 'rgba(5,150,105,0.2)'}`, borderRadius: 24, padding: '5px 12px', marginBottom: 28 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', animation: 'pulse 2s infinite', flexShrink: 0 }} />
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--green)', letterSpacing: '0.04em' }}>Open to opportunities</span>
            </div>

            <h1 style={{ fontWeight: 900, fontSize: 'clamp(2rem,5vw,3.5rem)', color: 'var(--fg)', lineHeight: 1.1, letterSpacing: '-0.04em', marginBottom: 8 }}>
              Naveen Meel
            </h1>
            <p style={{ fontWeight: 700, fontSize: 'clamp(1rem,2.5vw,1.3rem)', color: 'var(--accent)', marginBottom: 20, letterSpacing: '-0.01em' }}>
              Network Engineer · Cloud & DevOps
            </p>
            <p style={{ fontSize: '1rem', color: 'var(--fg2)', lineHeight: 1.8, maxWidth: 520, marginBottom: 32 }}>
              Building and operating resilient network infrastructure at <strong style={{ color: 'var(--fg)' }}>Airtel India</strong>.
              Passionate about automation, distributed systems, and Kubernetes — and basketball when I'm not staring at Grafana dashboards.
            </p>

            {/* Links */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <a href="/blog" className="btn btn-primary">Read the Blog →</a>
              <a href="https://www.linkedin.com/in/naveenmeel" target="_blank" rel="noopener" className="btn btn-ghost">LinkedIn ↗</a>
              <a href="https://github.com/naveenmeel" target="_blank" rel="noopener" className="btn btn-ghost">GitHub ↗</a>
              <a href="mailto:naveen@example.com" className="btn btn-ghost">Email</a>
            </div>

            {/* Quick stats */}
            <div style={{ display: 'flex', gap: 28, marginTop: 40, paddingTop: 32, borderTop: '1px solid var(--border)' }}>
              {[{ n: '3+', l: 'Years at Airtel' }, { n: '50+', l: 'Articles written' }, { n: '∞', l: 'Packets routed' }].map(({ n, l }) => (
                <div key={l}>
                  <div style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--fg)', lineHeight: 1, letterSpacing: '-0.02em' }}>{n}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: 4, fontWeight: 600 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Photo */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{ width: 280, height: 280, borderRadius: '50%', padding: 4, background: isDark ? 'conic-gradient(from 0deg, #f97316, transparent 40%, #f97316 60%, transparent 80%, #f97316)' : 'conic-gradient(from 0deg, #ea580c, transparent 40%, #ea580c 60%, transparent 80%, #ea580c)' }}>
              <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'var(--bg)', padding: 4 }}>
                <img
                  src="/naveen.jpg"
                  alt="Naveen Meel"
                  style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                />
              </div>
            </div>
            {/* Floating badges */}
            <div style={{ position: 'absolute', bottom: 16, left: -20, background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 12, padding: '8px 14px', boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--fg)' }}>📡 Airtel India</span>
            </div>
            <div style={{ position: 'absolute', top: 24, right: -20, background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 12, padding: '8px 14px', boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--fg)' }}>🏀 Baller</span>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '72px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 10 }}>Expertise</p>
          <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.5rem,3vw,2.2rem)', color: 'var(--fg)', letterSpacing: '-0.03em', marginBottom: 40 }}>Technical Skills</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14 }}>
            {SKILLS.map(skill => (
              <div key={skill.name} className="card card-hover" style={{ padding: '18px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <span style={{ fontSize: '1.3rem' }}>{skill.icon}</span>
                  <span style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--fg)' }}>{skill.name}</span>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {skill.items.map(item => (
                    <li key={item} style={{ fontSize: '0.78rem', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--accent)', opacity: 0.6, flexShrink: 0 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 24px' }}>
        <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 10 }}>Career</p>
        <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.5rem,3vw,2.2rem)', color: 'var(--fg)', letterSpacing: '-0.03em', marginBottom: 40 }}>Experience</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 680 }}>
          {EXPERIENCE.map((exp, i) => (
            <div key={i} className="card" style={{ padding: '22px 24px', display: 'flex', gap: 18, position: 'relative', overflow: 'hidden' }}>
              {exp.current && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--accent)' }} />}
              <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--bg3)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>
                {exp.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 4, flexWrap: 'wrap' }}>
                  <div>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--fg)' }}>{exp.role}</span>
                    <span style={{ color: 'var(--muted)', margin: '0 6px', fontSize: '0.8rem' }}>·</span>
                    <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--fg2)' }}>{exp.company}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexShrink: 0 }}>
                    {exp.current && <span style={{ fontSize: '0.65rem', fontWeight: 700, background: 'var(--accent-dim)', color: 'var(--accent)', border: '1px solid var(--accent-border)', padding: '2px 8px', borderRadius: 20 }}>Current</span>}
                    <span style={{ fontSize: '0.72rem', color: 'var(--muted)', fontFamily: 'monospace' }}>{exp.period}</span>
                  </div>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.7 }}>{exp.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Blog preview */}
      <section id="blog" style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', padding: '72px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 10 }}>Writing</p>
              <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.5rem,3vw,2.2rem)', color: 'var(--fg)', letterSpacing: '-0.03em' }}>Recent Articles</h2>
            </div>
            <a href="/blog" className="btn btn-ghost">All posts →</a>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14 }}>
            {POSTS_PREVIEW.map((p, i) => (
              <a key={i} href="/blog" className="card card-hover" style={{ padding: '20px 22px', display: 'block', textDecoration: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                  <span style={{ fontSize: '1.6rem' }}>{p.emoji}</span>
                  <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.04em', background: `${p.catColor}16`, color: p.catColor, border: `1px solid ${p.catColor}40`, padding: '2px 9px', borderRadius: 20 }}>{p.cat}</span>
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--fg)', marginBottom: 8, lineHeight: 1.4, letterSpacing: '-0.01em' }}>{p.title}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.6 }}>{p.excerpt}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--bg)', padding: '40px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src="/naveen.jpg" alt="Naveen Meel" style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border)' }} />
            <span style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--fg)' }}>Naveen Meel</span>
            <span style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>· Network Engineer</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {[{ l: 'Blog', h: '/blog' }, { l: 'LinkedIn', h: 'https://linkedin.com/in/naveenmeel' }, { l: 'GitHub', h: 'https://github.com/naveenmeel' }].map(({ l, h }) => (
              <a key={l} href={h} target={h.startsWith('http') ? '_blank' : undefined} rel={h.startsWith('http') ? 'noopener' : undefined}
                style={{ fontSize: '0.78rem', color: 'var(--muted)', transition: 'color 0.15s' }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--fg)')}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--muted)')}>{l}</a>
            ))}
            <button onClick={toggle} className="theme-toggle" style={{ width: 30, height: 30, fontSize: '0.85rem' }} title="Toggle theme">
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
        <p style={{ textAlign: 'center', marginTop: 24, fontSize: '0.72rem', color: 'var(--muted)' }}>
          © {new Date().getFullYear()} Naveen Meel · Built with React & Express
        </p>
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
        @media (max-width: 640px) {
          #about > div { grid-template-columns: 1fr !important; }
          #about > div > div:last-child { margin: 0 auto; }
          #about > div > div:last-child > div:first-child { width: 200px !important; height: 200px !important; }
        }
      `}</style>
    </div>
  );
}
