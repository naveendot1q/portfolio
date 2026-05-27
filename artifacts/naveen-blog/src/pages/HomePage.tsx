import { useEffect, useState } from 'react';
import { useTheme } from '@/lib/theme';

type Post = { id: string; title: string; slug: string; excerpt: string | null; category: string; cover_emoji: string | null; created_at: string; read_time: number | null; };

const SKILLS = [
  {
    name: 'Networking', icon: '🌐', color: '#3b82f6',
    items: ['MPLS Networks (B2B/Banking)', 'BGP · OSPF · VPN', 'VPC Design & Peering', 'SD-WAN · QoS', 'Network Security'],
  },
  {
    name: 'Cloud', icon: '☁️', color: '#10b981',
    items: ['AWS — EC2, S3, RDS, VPC', 'IAM · ELB · Auto Scaling', 'CloudWatch · CloudTrail · SNS', 'Azure & GCP (working knowledge)', 'Multi-AZ HA Architecture'],
  },
  {
    name: 'DevOps & IaC', icon: '⚙️', color: '#8b5cf6',
    items: ['Terraform (modules, state)', 'Ansible', 'Jenkins · Azure DevOps CI/CD', 'GitHub Actions', 'Maven · NodeJS (basics)'],
  },
  {
    name: 'Containers & K8s', icon: '☸️', color: '#f59e0b',
    items: ['Docker (containerisation)', 'Kubernetes', 'Nexus3 · Azure Artifacts', 'Container security (TRIVY)', 'OWASP ZAP · Anchore'],
  },
  {
    name: 'Monitoring & Ops', icon: '📊', color: '#ef4444',
    items: ['Prometheus · Grafana', 'ELK Stack', 'AWS CloudWatch', 'Sonarqube (code quality)', 'JIRA · Git · GitHub'],
  },
  {
    name: 'Scripting & OS', icon: '🐧', color: '#06b6d4',
    items: ['Shell Scripting', 'Python (basics)', 'Linux (Ubuntu · RHEL)', 'Windows Server', 'System Hardening'],
  },
];

const EXPERIENCE = [
  {
    company: 'Airtel',
    role: 'NOC Network Engineer',
    period: 'Sep 2025 – Present',
    location: 'Gurugram, India',
    icon: '📡',
    current: true,
    points: [
      'Designing complex MPLS networks for B2B customers — primarily Banking sector',
      'Optimised design tasks, leading to measurable improvement in turnaround for similar network requirements',
    ],
  },
];

const EDUCATION = [
  {
    degree: 'B.Tech — Electronics & Communication Engineering',
    school: 'BK Birla Institute of Engineering & Technology',
    period: '2018 – 2022',
    grade: '8.6 CGPA',
    icon: '🎓',
  },
  {
    degree: '12th — Board of Secondary Education, Rajasthan',
    school: '',
    period: '',
    grade: '85.60%',
    icon: '📚',
  },
  {
    degree: '10th — CBSE',
    school: '',
    period: '',
    grade: '10 CGPA',
    icon: '🏅',
  },
];

const CERTIFICATIONS = [
  { name: 'AWS Solutions Architect', issuer: 'Amazon Web Services', icon: '☁️', color: '#f59e0b' },
  { name: 'Kubernetes (CKA)', issuer: 'CNCF / Linux Foundation', icon: '☸️', color: '#3b82f6' },
  { name: 'Terraform Associate', issuer: 'HashiCorp', icon: '🏗️', color: '#8b5cf6' },
];

const CAT_COLORS: Record<string, string> = {
  networking: '#3b82f6',
  cloud: '#10b981',
  devops: '#8b5cf6',
  kubernetes: '#f59e0b',
  linux: '#06b6d4',
  basketball: '#f97316',
  life: '#ec4899',
  default: '#94a3b8',
};

export default function HomePage() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch('/api/posts?limit=3')
      .then(r => r.json())
      .then(d => setRecentPosts(d.posts || []))
      .catch(() => {});
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--fg)', fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ── NAV ── */}
      <nav className="nav-glass" style={{ position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: 800, fontSize: '1rem', letterSpacing: '-0.02em', color: 'var(--fg)' }}>
            Naveen<span style={{ color: 'var(--accent)' }}>.</span>dev
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="nav-links">
            {[
              { label: 'About', href: '#about' },
              { label: 'Skills', href: '#skills' },
              { label: 'Experience', href: '#experience' },
              { label: 'Education', href: '#education' },
              { label: 'Blog', href: '/blog' },
              { label: 'Contact', href: '#contact' },
            ].map(({ label, href }) => (
              <a key={label} href={href}
                style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--muted)', padding: '6px 10px', borderRadius: 6, transition: 'color 0.15s', textDecoration: 'none' }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--fg)')}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--muted)')}>{label}</a>
            ))}
            <button onClick={toggle} className="theme-toggle" style={{ marginLeft: 4 }} title={isDark ? 'Light mode' : 'Dark mode'}>
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="about" style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 24px 64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: 56, alignItems: 'center' }} className="hero-grid">
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: isDark ? 'rgba(52,211,153,0.08)' : 'rgba(5,150,105,0.08)', border: `1px solid ${isDark ? 'rgba(52,211,153,0.25)' : 'rgba(5,150,105,0.2)'}`, borderRadius: 24, padding: '5px 14px', marginBottom: 28 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', animation: 'pulse 2s infinite', flexShrink: 0 }} />
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--green)', letterSpacing: '0.04em' }}>Open to Cloud / DevOps roles</span>
            </div>

            <h1 style={{ fontWeight: 900, fontSize: 'clamp(2.2rem,5vw,3.6rem)', color: 'var(--fg)', lineHeight: 1.08, letterSpacing: '-0.04em', marginBottom: 10 }}>
              Naveen Meel
            </h1>
            <p style={{ fontWeight: 700, fontSize: 'clamp(1rem,2vw,1.2rem)', color: 'var(--accent)', marginBottom: 20, letterSpacing: '-0.01em' }}>
              NOC Network Engineer @ Airtel · Cloud & DevOps Enthusiast
            </p>
            <p style={{ fontSize: '1rem', color: 'var(--fg2)', lineHeight: 1.8, maxWidth: 540, marginBottom: 20 }}>
              Designing complex MPLS networks for Airtel's B2B customers (Banking sector) in Gurugram.
              Passionate about Cloud infrastructure, DevOps automation, and Kubernetes — and basketball when I'm not staring at Grafana dashboards.
            </p>

            {/* Location */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 28, fontSize: '0.8rem', color: 'var(--muted)' }}>
              <span>📍 Gurugram, India</span>
              <span>🎓 B.Tech ECE · 8.6 CGPA</span>
              <span>📧 <a href="mailto:naveenmeel10@gmail.com" style={{ color: 'var(--muted)', textDecoration: 'underline', textDecorationColor: 'transparent', transition: 'text-decoration-color 0.15s' }} onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.textDecorationColor = 'var(--muted)')} onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.textDecorationColor = 'transparent')}>naveenmeel10@gmail.com</a></span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <a href="/blog" className="btn btn-primary">Read the Blog →</a>
              <a href="https://www.linkedin.com/in/naveenmeel" target="_blank" rel="noopener" className="btn btn-ghost">LinkedIn ↗</a>
              <a href="https://github.com/naveenmeel" target="_blank" rel="noopener" className="btn btn-ghost">GitHub ↗</a>
              <a href="mailto:naveenmeel10@gmail.com" className="btn btn-ghost">Email</a>
            </div>

            <div style={{ display: 'flex', gap: 28, marginTop: 40, paddingTop: 28, borderTop: '1px solid var(--border)' }}>
              {[{ n: '8.6', l: 'CGPA' }, { n: '1+', l: 'Year @ Airtel' }, { n: '∞', l: 'Packets routed' }].map(({ n, l }) => (
                <div key={l}>
                  <div style={{ fontWeight: 800, fontSize: '1.6rem', color: 'var(--fg)', lineHeight: 1, letterSpacing: '-0.02em' }}>{n}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--muted)', marginTop: 4, fontWeight: 600 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Photo */}
          <div style={{ position: 'relative', flexShrink: 0 }} className="hero-photo">
            <div style={{ width: 280, height: 280, borderRadius: '50%', padding: 4, background: isDark ? 'conic-gradient(from 0deg, #f97316, transparent 40%, #f97316 60%, transparent 80%, #f97316)' : 'conic-gradient(from 0deg, #ea580c, transparent 40%, #ea580c 60%, transparent 80%, #ea580c)' }}>
              <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'var(--bg)', padding: 4 }}>
                <img src="/naveen.jpg" alt="Naveen Meel" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
              </div>
            </div>
            <div style={{ position: 'absolute', bottom: 16, left: -20, background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 12, padding: '8px 14px', boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--fg)' }}>📡 Airtel · Gurugram</span>
            </div>
            <div style={{ position: 'absolute', top: 24, right: -20, background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 12, padding: '8px 14px', boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--fg)' }}>🏀 Baller</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '64px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 }}>Expertise</p>
          <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.4rem,3vw,2rem)', color: 'var(--fg)', letterSpacing: '-0.03em', marginBottom: 32 }}>Technical Skills</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 14 }}>
            {SKILLS.map(skill => (
              <div key={skill.name} className="card card-hover" style={{ padding: '18px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: `${skill.color}15`, border: `1px solid ${skill.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>
                    {skill.icon}
                  </div>
                  <span style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--fg)' }}>{skill.name}</span>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>
                  {skill.items.map(item => (
                    <li key={item} style={{ fontSize: '0.78rem', color: 'var(--muted)', display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <span style={{ width: 4, height: 4, borderRadius: '50%', background: skill.color, opacity: 0.7, flexShrink: 0, marginTop: 6 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 24px' }}>
        <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 }}>Career</p>
        <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.4rem,3vw,2rem)', color: 'var(--fg)', letterSpacing: '-0.03em', marginBottom: 32 }}>Work Experience</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 720 }}>
          {EXPERIENCE.map((exp, i) => (
            <div key={i} className="card" style={{ padding: '24px 26px', display: 'flex', gap: 20, position: 'relative', overflow: 'hidden' }}>
              {exp.current && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--accent)' }} />}
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--bg3)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}>
                {exp.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 4, flexWrap: 'wrap' }}>
                  <div>
                    <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--fg)' }}>{exp.role}</span>
                    <span style={{ color: 'var(--muted)', margin: '0 8px', fontSize: '0.9rem' }}>·</span>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--accent)' }}>{exp.company}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexShrink: 0 }}>
                    {exp.current && <span style={{ fontSize: '0.65rem', fontWeight: 700, background: 'var(--accent-dim)', color: 'var(--accent)', border: '1px solid var(--accent-border)', padding: '2px 9px', borderRadius: 20 }}>Current</span>}
                  </div>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--muted)', fontFamily: 'monospace', marginBottom: 12 }}>
                  📅 {exp.period} &nbsp;·&nbsp; 📍 {exp.location}
                </p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {exp.points.map((pt, pi) => (
                    <li key={pi} style={{ fontSize: '0.84rem', color: 'var(--fg2)', display: 'flex', alignItems: 'flex-start', gap: 10, lineHeight: 1.6 }}>
                      <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }}>▸</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          {/* Broader project experience card */}
          <div className="card" style={{ padding: '24px 26px' }}>
            <p style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)', marginBottom: 14 }}>Project Experience (Pre-Airtel)</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                'Implemented and managed AWS infrastructure — EC2, S3, RDS, VPC, IAM, ELB, Auto Scaling, CloudWatch, CloudTrail, SNS',
                'Configured Auto Scaling Groups with Elastic Load Balancers for dynamic scaling and cost efficiency',
                'Designed custom VPC architectures with CIDR planning, VPC peering, and VPN for hybrid connectivity',
                'Deployed Terraform infrastructure including module creation, state management, and version locking',
                'Built CI/CD pipelines using Jenkins and GitLab — significantly reduced deployment times',
                'Containerized applications with Docker for consistent cross-environment deployments',
                'Monitored system performance and logs via AWS CloudWatch',
              ].map((pt, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.82rem', color: 'var(--fg2)', lineHeight: 1.6 }}>
                  <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }}>▸</span>
                  {pt}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section id="education" style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '64px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 }}>Academic</p>
          <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.4rem,3vw,2rem)', color: 'var(--fg)', letterSpacing: '-0.03em', marginBottom: 32 }}>Education</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 680 }}>
            {EDUCATION.map((edu, i) => (
              <div key={i} className="card" style={{ padding: '18px 22px', display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--bg3)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                  {edu.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--fg)', marginBottom: 3 }}>{edu.degree}</p>
                  {edu.school && <p style={{ fontSize: '0.78rem', color: 'var(--fg2)', marginBottom: 2 }}>{edu.school}</p>}
                  <div style={{ display: 'flex', gap: 12, fontSize: '0.72rem', color: 'var(--muted)', fontFamily: 'monospace' }}>
                    {edu.period && <span>📅 {edu.period}</span>}
                    <span style={{ fontWeight: 700, color: 'var(--accent)' }}>✦ {edu.grade}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 24px' }}>
        <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 }}>Credentials</p>
        <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.4rem,3vw,2rem)', color: 'var(--fg)', letterSpacing: '-0.03em', marginBottom: 32 }}>Certifications</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
          {CERTIFICATIONS.map((cert, i) => (
            <div key={i} className="card card-hover" style={{ padding: '16px 22px', display: 'flex', alignItems: 'center', gap: 14, minWidth: 260 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: `${cert.color}15`, border: `1px solid ${cert.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                {cert.icon}
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--fg)' }}>{cert.name}</p>
                <p style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{cert.issuer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── RECENT BLOG POSTS ── */}
      <section id="blog" style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', padding: '64px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 }}>Writing</p>
              <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.4rem,3vw,2rem)', color: 'var(--fg)', letterSpacing: '-0.03em' }}>Recent Articles</h2>
            </div>
            <a href="/blog" className="btn btn-ghost">All posts →</a>
          </div>

          {recentPosts.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14 }}>
              {recentPosts.map(post => {
                const catColor = CAT_COLORS[post.category] || CAT_COLORS.default;
                const date = new Date(post.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
                return (
                  <a key={post.id} href={`/blog/${post.slug}`} className="card card-hover" style={{ padding: '20px 22px', display: 'block', textDecoration: 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                      <span style={{ fontSize: '1.6rem' }}>{post.cover_emoji || '📝'}</span>
                      <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.04em', background: `${catColor}16`, color: catColor, border: `1px solid ${catColor}40`, padding: '2px 9px', borderRadius: 20 }}>{post.category}</span>
                    </div>
                    <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--fg)', marginBottom: 8, lineHeight: 1.4 }}>{post.title}</h3>
                    {post.excerpt && <p style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: 10 }} className="line-clamp-2">{post.excerpt}</p>}
                    <p style={{ fontSize: '0.7rem', color: 'var(--muted)', fontFamily: 'monospace' }}>{date}{post.read_time ? ` · ${post.read_time} min read` : ''}</p>
                  </a>
                );
              })}
            </div>
          ) : (
            <div className="card" style={{ padding: '40px 24px', textAlign: 'center' }}>
              <p style={{ fontSize: '2rem', marginBottom: 10 }}>✍️</p>
              <p style={{ fontWeight: 700, color: 'var(--fg)', marginBottom: 6 }}>Articles coming soon</p>
              <p style={{ fontSize: '0.875rem', color: 'var(--muted)', marginBottom: 20 }}>I'm working on some posts about Networking, Cloud & DevOps.</p>
              <a href="/blog" className="btn btn-primary">Go to Blog</a>
            </div>
          )}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 24px 80px' }}>
        <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 }}>Get in touch</p>
        <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.4rem,3vw,2rem)', color: 'var(--fg)', letterSpacing: '-0.03em', marginBottom: 12 }}>Contact</h2>
        <p style={{ fontSize: '0.95rem', color: 'var(--muted)', maxWidth: 480, lineHeight: 1.7, marginBottom: 32 }}>
          Open to Cloud Engineer and DevOps Engineer roles. Feel free to reach out via email or LinkedIn.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, maxWidth: 600 }}>
          {[
            { label: '📧 Email', href: 'mailto:naveenmeel10@gmail.com', value: 'naveenmeel10@gmail.com' },
            { label: '📞 Phone', href: 'tel:+918769471595', value: '+91 8769471595' },
            { label: '🔗 LinkedIn', href: 'https://linkedin.com/in/naveenmeel', value: 'linkedin.com/in/naveenmeel' },
            { label: '💻 GitHub', href: 'https://github.com/naveenmeel', value: 'github.com/naveenmeel' },
          ].map(({ label, href, value }) => (
            <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener' : undefined}
              className="card card-hover"
              style={{ padding: '14px 20px', textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 4, minWidth: 220 }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--muted)', letterSpacing: '0.04em' }}>{label}</span>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--accent)' }}>{value}</span>
            </a>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--bg)', padding: '32px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src="/naveen.jpg" alt="Naveen Meel" style={{ width: 30, height: 30, borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border)' }} />
            <span style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--fg)' }}>Naveen Meel</span>
            <span style={{ color: 'var(--muted)', fontSize: '0.78rem' }}>NOC Network Engineer · Airtel</span>
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
        <p style={{ textAlign: 'center', marginTop: 20, fontSize: '0.7rem', color: 'var(--muted)' }}>
          © {new Date().getFullYear()} Naveen Meel · Rajasthan, India
        </p>
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
        @media (max-width: 680px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-photo { display: flex; justify-content: center; }
          .hero-photo > div { width: 200px !important; height: 200px !important; }
          .nav-links a:not(:last-child) { display: none; }
        }
      `}</style>
    </div>
  );
}
