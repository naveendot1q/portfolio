import { useEffect, useState, useRef } from 'react';
import { Link } from 'wouter';

type Post = { id: string; title: string; slug: string; excerpt: string | null; category: string; cover_emoji: string | null; created_at: string; read_time: number | null; };

const SKILLS = [
  { group: 'Network', color: '#3b82f6', items: ['MPLS / BGP / OSPF', 'TCP/IP · LAN/WAN', 'VPN · SD-WAN', 'Network Security', 'VPC Design'] },
  { group: 'Cloud', color: '#10b981', items: ['AWS EC2 · S3 · RDS', 'IAM · VPC · CloudWatch', 'Azure · GCP', 'Auto Scaling · ELB', 'Multi-AZ HA'] },
  { group: 'DevOps', color: '#8b5cf6', items: ['Docker · Kubernetes', 'Terraform · Ansible', 'Jenkins · GitLab CI', 'Prometheus · Grafana', 'ELK Stack'] },
];

const PROJECTS = [
  { n: '01', title: 'Airtel MPLS — Banking', desc: "Designed high-availability MPLS topologies for B2B enterprise banking clients across Airtel's network.", tags: ['MPLS', 'BGP', 'OSPF', 'QoS'], color: '#3b82f6' },
  { n: '02', title: 'AWS Multi-Tier VPC', desc: 'Production VPC with public/private subnets, NAT, VPC peering, VPN to on-prem, and fine-grained IAM.', tags: ['VPC', 'EC2', 'IAM', 'VPN'], color: '#10b981' },
  { n: '03', title: 'CI/CD + Security Gates', desc: 'Jenkins pipeline with SonarQube, TRIVY container scanning, OWASP checks, and K8s auto-deploy.', tags: ['Jenkins', 'Docker', 'K8s', 'TRIVY'], color: '#8b5cf6' },
  { n: '04', title: 'Terraform IaC — AWS', desc: 'Modular Terraform for full AWS provisioning: VPC, EC2, RDS, S3, IAM, ASG with remote S3 state.', tags: ['Terraform', 'AWS', 'S3'], color: '#f59e0b' },
  { n: '05', title: 'RDS Multi-AZ HA', desc: 'Amazon RDS MySQL with Multi-AZ standby, read replicas, and ELB-backed auto-scaling. 99.99% SLA.', tags: ['RDS', 'Multi-AZ', 'ELB'], color: '#10b981' },
  { n: '06', title: 'Observability Stack', desc: 'Prometheus + Grafana dashboards, ELK log aggregation, CloudWatch alerts across hybrid infra.', tags: ['Prometheus', 'Grafana', 'ELK'], color: '#ef4444' },
];

const CERTS = [
  { icon: '☁️', title: 'AWS Solutions Architect', issuer: 'Amazon Web Services' },
  { icon: '🌐', title: 'CCNA', issuer: 'Cisco Systems' },
  { icon: '🔷', title: 'Azure Fundamentals AZ-900', issuer: 'Microsoft' },
  { icon: '🎓', title: 'B.Tech — ECE · 8.6 CGPA', issuer: 'BK Birla Institute · 2018–2022' },
  { icon: '⚙️', title: 'DevOps Foundations', issuer: 'Linux Foundation' },
  { icon: '🐳', title: 'Docker & Kubernetes', issuer: 'CNCF Ecosystem' },
];

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    fetch('/api/posts?limit=3').then(r => r.json()).then(d => setPosts(d.posts || [])).catch(() => {});
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).style.opacity = '1';
          (e.target as HTMLElement).style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [posts]);

  const fmt = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div style={{ fontFamily: "Inter, system-ui, -apple-system, sans-serif", background: '#f9fafb', color: '#111827', lineHeight: 1.6, WebkitFontSmoothing: 'antialiased', overflowX: 'hidden' }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        a { color: inherit; text-decoration: none; }
        ::-webkit-scrollbar { width: 3px; } ::-webkit-scrollbar-thumb { background: #3b82f6; }

        .hp-wrap { max-width: 1100px; margin: 0 auto; padding: 0 24px; }
        .hp-sec { padding: 96px 0; }
        .hp-sec-sm { padding: 72px 0; }
        .hp-tag { font-size: .72rem; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; color: #3b82f6; margin-bottom: 10px; }
        .hp-h2 { font-size: clamp(1.75rem, 4vw, 2.5rem); font-weight: 800; letter-spacing: -.03em; color: #111827; line-height: 1.15; margin-bottom: 16px; }
        .hp-lead { font-size: 1.05rem; color: #6b7280; max-width: 560px; line-height: 1.7; }

        [data-reveal] { opacity: 0; transform: translateY(20px); transition: opacity .5s ease, transform .5s ease; }

        .hp-nav { position: fixed; top: 0; width: 100%; z-index: 100; background: rgba(249,250,251,.92); backdrop-filter: blur(12px); border-bottom: 1px solid #e5e7eb; }
        .hp-nav-inner { max-width: 1100px; margin: 0 auto; padding: 0 24px; height: 56px; display: flex; align-items: center; justify-content: space-between; }
        .hp-logo { font-size: .95rem; font-weight: 700; letter-spacing: -.02em; color: #111827; display: flex; align-items: center; gap: 6px; cursor:pointer; }
        .hp-logo-dot { width: 8px; height: 8px; border-radius: 50%; background: #3b82f6; }
        .hp-nav-links { display: flex; align-items: center; gap: 4px; }
        .hp-nav-links a { font-size: .82rem; color: #6b7280; padding: 5px 10px; border-radius: 6px; transition: color .15s, background .15s; font-weight: 500; }
        .hp-nav-links a:hover { color: #111827; background: #e5e7eb; }
        .hp-nav-blog { background: #3b82f6!important; color: #fff!important; font-weight: 600!important; border-radius: 6px; }
        .hp-nav-blog:hover { background: #2563eb!important; }
        .hp-hamburger { display: none; width: 36px; height: 36px; align-items: center; justify-content: center; border: 1px solid #e5e7eb; border-radius: 8px; background: none; cursor: pointer; color: #6b7280; }
        .hp-mobile-nav { display: none; position: fixed; inset: 0; background: #f9fafb; z-index: 99; flex-direction: column; align-items: center; justify-content: center; gap: 24px; }
        .hp-mobile-nav.open { display: flex; }
        .hp-mobile-nav a, .hp-mobile-nav button { font-size: 1.5rem; font-weight: 700; color: #111827; background: none; border: none; cursor: pointer; }
        .hp-mobile-close { position: absolute; top: 20px; right: 20px; font-size: 1.5rem; background: none; border: none; cursor: pointer; color: #6b7280; }

        .hp-hero { min-height: 100vh; display: flex; align-items: center; padding-top: 56px; position: relative; overflow: hidden; }
        .hp-hero::before { content: ''; position: absolute; top: -200px; right: -200px; width: 600px; height: 600px; background: radial-gradient(circle, rgba(59,130,246,.08) 0%, transparent 70%); pointer-events: none; }
        .hp-hero::after { content: ''; position: absolute; bottom: -100px; left: -100px; width: 400px; height: 400px; background: radial-gradient(circle, rgba(16,185,129,.06) 0%, transparent 70%); pointer-events: none; }
        .hp-hero-inner { display: grid; grid-template-columns: 1fr auto; gap: 64px; align-items: center; position: relative; z-index: 1; }
        .hp-hero-status { display: inline-flex; align-items: center; gap: 7px; font-size: .78rem; font-weight: 600; color: #10b981; background: rgba(16,185,129,.08); border: 1px solid rgba(16,185,129,.2); padding: 5px 12px; border-radius: 20px; margin-bottom: 24px; }
        .hp-hero-status-dot { width: 7px; height: 7px; border-radius: 50%; background: #10b981; animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.2)} }
        .hp-hero-name { font-size: clamp(3.5rem, 8vw, 6rem); font-weight: 900; letter-spacing: -.05em; line-height: .95; color: #111827; margin-bottom: 12px; }
        .hp-hero-sub { font-size: 1rem; color: #6b7280; font-weight: 500; letter-spacing: .01em; margin-bottom: 20px; }
        .hp-hero-pills { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }
        .hp-pill { font-size: .72rem; font-weight: 600; padding: 4px 12px; border-radius: 20px; border: 1px solid; }
        .hp-pill-blue { background: rgba(59,130,246,.07); color: #3b82f6; border-color: rgba(59,130,246,.2); }
        .hp-pill-green { background: rgba(16,185,129,.07); color: #10b981; border-color: rgba(16,185,129,.2); }
        .hp-pill-purple { background: rgba(139,92,246,.07); color: #8b5cf6; border-color: rgba(139,92,246,.2); }
        .hp-pill-orange { background: rgba(249,115,22,.07); color: #f97316; border-color: rgba(249,115,22,.2); }
        .hp-hero-desc { font-size: .95rem; color: #4b5563; max-width: 500px; line-height: 1.75; margin-bottom: 32px; }
        .hp-cta-row { display: flex; gap: 12px; flex-wrap: wrap; }
        .hp-btn { display: inline-flex; align-items: center; gap: 6px; padding: 10px 22px; border-radius: 8px; font-size: .875rem; font-weight: 600; cursor: pointer; transition: all .15s; border: none; text-decoration: none; }
        .hp-btn-primary { background: #3b82f6; color: #fff; }
        .hp-btn-primary:hover { background: #2563eb; }
        .hp-btn-ghost { background: transparent; color: #374151; border: 1px solid #e5e7eb; }
        .hp-btn-ghost:hover { background: #f3f4f6; }

        .hp-hero-visual { display: flex; flex-direction: column; gap: 12px; }
        .hp-id-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 18px 20px; min-width: 180px; transition: box-shadow .2s; }
        .hp-id-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,.08); }
        .hp-id-card-icon { font-size: 1.4rem; margin-bottom: 8px; }
        .hp-id-card-label { font-size: .65rem; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; margin-bottom: 4px; }
        .hp-id-card-value { font-size: .92rem; font-weight: 700; color: #111827; }
        .hp-id-card-sub { font-size: .72rem; color: #9ca3af; margin-top: 2px; }

        .hp-about-strip { background: #fff; border-top: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; padding: 40px 0; }
        .hp-stat-row { display: grid; grid-template-columns: repeat(4, 1fr); }
        .hp-stat-item { padding: 0 32px; border-right: 1px solid #e5e7eb; text-align: center; }
        .hp-stat-item:last-child { border-right: none; }
        .hp-stat-n { font-size: 2.25rem; font-weight: 900; letter-spacing: -.04em; color: #111827; }
        .hp-stat-l { font-size: .78rem; color: #9ca3af; font-weight: 500; margin-top: 2px; }

        .hp-skills-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .hp-skill-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 22px; }
        .hp-skill-card-head { display: flex; align-items: center; gap: 8px; margin-bottom: 14px; }
        .hp-skill-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .hp-skill-card-title { font-size: .82rem; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; }
        .hp-skill-list { list-style: none; display: flex; flex-direction: column; gap: 6px; }
        .hp-skill-list li { font-size: .82rem; color: #4b5563; display: flex; align-items: center; gap: 6px; }
        .hp-skill-list li::before { content: ''; width: 4px; height: 4px; border-radius: 50%; flex-shrink: 0; background: currentColor; }

        .hp-exp-bg { background: #fff; border-top: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; }
        .hp-exp-list { display: flex; flex-direction: column; gap: 0; }
        .hp-exp-item { display: grid; grid-template-columns: 180px 1fr; gap: 32px; padding: 28px 0; border-bottom: 1px solid #f3f4f6; }
        .hp-exp-item:last-child { border-bottom: none; }
        .hp-exp-period { font-size: .75rem; font-family: 'JetBrains Mono', monospace; color: #9ca3af; font-weight: 500; padding-top: 3px; line-height: 1.6; }
        .hp-exp-company { font-size: 1.05rem; font-weight: 800; color: #111827; margin-bottom: 2px; }
        .hp-exp-role { font-size: .85rem; font-weight: 600; color: #6b7280; margin-bottom: 10px; }
        .hp-exp-desc { font-size: .84rem; color: #6b7280; line-height: 1.7; margin-bottom: 12px; }
        .hp-exp-tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .hp-tag-chip { font-size: .68rem; font-weight: 600; padding: 2px 10px; border-radius: 20px; background: #f3f4f6; color: #374151; border: 1px solid #e5e7eb; }

        .hp-proj-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .hp-proj-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; transition: box-shadow .2s; }
        .hp-proj-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,.08); }
        .hp-proj-num { font-size: .72rem; font-weight: 700; font-family: monospace; letter-spacing: .1em; margin-bottom: 10px; }
        .hp-proj-title { font-size: .95rem; font-weight: 700; color: #111827; margin-bottom: 8px; }
        .hp-proj-desc { font-size: .8rem; color: #6b7280; line-height: 1.65; margin-bottom: 12px; flex: 1; }
        .hp-proj-tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .hp-proj-tag { font-size: .65rem; font-weight: 600; padding: 2px 8px; border-radius: 4px; }

        .hp-certs-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        .hp-cert-card { display: flex; align-items: center; gap: 14px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 10px; padding: 14px 16px; }
        .hp-cert-icon { font-size: 1.6rem; flex-shrink: 0; }
        .hp-cert-title { font-size: .82rem; font-weight: 700; color: #111827; margin-bottom: 2px; }
        .hp-cert-issuer { font-size: .72rem; color: #9ca3af; }

        .hp-bball-sec { background: linear-gradient(135deg, #1e3a5f 0%, #1e2a5f 100%); }
        .hp-bball-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
        .hp-bball-text { color: #cbd5e1; }
        .hp-bball-text .hp-tag { color: #f97316; }
        .hp-bball-text .hp-h2 { color: #f1f5f9; }
        .hp-bball-text p { font-size: .9rem; color: #94a3b8; line-height: 1.75; margin-bottom: 14px; }
        .hp-bball-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 24px; }
        .hp-bs { background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.1); border-radius: 10px; padding: 14px; text-align: center; }
        .hp-bs-n { font-size: 1.5rem; font-weight: 900; color: #f97316; margin-bottom: 2px; }
        .hp-bs-l { font-size: .65rem; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: .08em; }
        .hp-court-diagram { background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1); border-radius: 14px; padding: 24px; }
        .hp-court-row { display: flex; align-items: flex-start; gap: 12px; padding-bottom: 14px; }
        .hp-court-icon { width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: .95rem; flex-shrink: 0; }
        .hp-court-label { font-size: .82rem; font-weight: 700; color: #e2e8f0; margin-bottom: 2px; }
        .hp-court-val { font-size: .76rem; color: #94a3b8; }
        .hp-divider { height: 1px; background: rgba(255,255,255,.07); margin-bottom: 14px; }

        .hp-contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; }
        .hp-c-link { display: flex; align-items: center; gap: 12px; font-size: .88rem; color: #4b5563; padding: 12px 0; border-bottom: 1px solid #f3f4f6; transition: color .15s; }
        .hp-c-link:hover { color: #3b82f6; }
        .hp-c-link-icon { width: 32px; height: 32px; border-radius: 6px; background: #f3f4f6; display: flex; align-items: center; justify-content: center; font-size: .9rem; flex-shrink: 0; }
        .hp-c-form { display: flex; flex-direction: column; gap: 14px; }
        .hp-f-label { font-size: .72rem; font-weight: 600; text-transform: uppercase; letter-spacing: .07em; color: #6b7280; display: block; margin-bottom: 5px; }
        .hp-f-input, .hp-f-textarea { width: 100%; background: #fff; border: 1px solid #e5e7eb; color: #111827; padding: 10px 14px; font-size: .88rem; font-family: inherit; border-radius: 8px; outline: none; transition: border-color .15s; }
        .hp-f-input:focus, .hp-f-textarea:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,.1); }
        .hp-f-textarea { resize: vertical; min-height: 100px; }

        .hp-posts-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 32px; }
        .hp-post-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; display: flex; flex-direction: column; gap: 8px; transition: box-shadow .2s, transform .2s; height: 100%; }
        .hp-post-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,.08); transform: translateY(-2px); }
        .hp-post-emoji { font-size: 1.6rem; line-height: 1; }
        .hp-post-cat-badge { font-size: .65rem; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; padding: 2px 8px; border-radius: 4px; display: inline-block; }
        .hp-post-title { font-size: .92rem; font-weight: 700; color: #111827; line-height: 1.35; }
        .hp-post-card:hover .hp-post-title { color: #3b82f6; }
        .hp-post-excerpt { font-size: .78rem; color: #6b7280; line-height: 1.6; flex: 1; }
        .hp-post-meta { font-size: .7rem; color: #9ca3af; font-family: 'JetBrains Mono', monospace; }
        .hp-posts-empty { text-align: center; padding: 48px 24px; color: #6b7280; font-size: .88rem; border: 1px dashed #e5e7eb; border-radius: 12px; }

        .hp-footer { border-top: 1px solid #e5e7eb; padding: 28px 0; }
        .hp-footer-inner { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
        .hp-footer-copy { font-size: .78rem; color: #9ca3af; }
        .hp-footer-back { font-size: .75rem; color: #9ca3af; background: none; border: none; cursor: pointer; }
        .hp-footer-back:hover { color: #3b82f6; }

        @media (max-width: 900px) {
          .hp-hero-inner { grid-template-columns: 1fr; gap: 40px; }
          .hp-hero-visual { flex-direction: row; width: 100%; overflow-x: auto; }
          .hp-id-card { min-width: 160px; }
          .hp-stat-row { grid-template-columns: repeat(2, 1fr); }
          .hp-skills-grid, .hp-proj-grid, .hp-certs-grid, .hp-posts-grid { grid-template-columns: 1fr 1fr; }
          .hp-bball-inner, .hp-contact-grid { grid-template-columns: 1fr; gap: 40px; }
          .hp-exp-item { grid-template-columns: 1fr; gap: 8px; }
          .hp-nav-links { display: none; }
          .hp-hamburger { display: flex; }
        }
        @media (max-width: 560px) {
          .hp-skills-grid, .hp-proj-grid, .hp-certs-grid, .hp-posts-grid { grid-template-columns: 1fr; }
          .hp-stat-row { grid-template-columns: repeat(2, 1fr); }
          .hp-bball-stats { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>

      {/* Mobile Nav */}
      <div className={`hp-mobile-nav ${menuOpen ? 'open' : ''}`}>
        <button className="hp-mobile-close" onClick={() => setMenuOpen(false)}>✕</button>
        {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map(s => (
          <a key={s} href={`#${s.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{s}</a>
        ))}
        <Link href="/blog" onClick={() => setMenuOpen(false)} style={{ color: '#3b82f6' }}>Blog →</Link>
      </div>

      {/* Nav */}
      <nav className="hp-nav">
        <div className="hp-nav-inner">
          <a href="#" className="hp-logo"><div className="hp-logo-dot"></div>Naveen Meel</a>
          <div className="hp-nav-links">
            {['about', 'skills', 'experience', 'projects', 'contact'].map(s => (
              <a key={s} href={`#${s}`} style={{ textTransform: 'capitalize' }}>{s}</a>
            ))}
            <Link href="/blog" className="hp-nav-blog" style={{ padding: '5px 12px', borderRadius: '6px', fontSize: '.82rem', fontWeight: 600 }}>Blog</Link>
          </div>
          <button className="hp-hamburger" onClick={() => setMenuOpen(true)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="hp-hero" ref={heroRef}>
        <div className="hp-wrap">
          <div className="hp-hero-inner">
            <div>
              <div className="hp-hero-status"><div className="hp-hero-status-dot"></div>Open to Cloud &amp; DevOps Roles</div>
              <h1 className="hp-hero-name">Naveen<br />Meel</h1>
              <p className="hp-hero-sub">Network · Cloud · DevOps · Basketball</p>
              <div className="hp-hero-pills">
                <span className="hp-pill hp-pill-blue">🌐 Network Engineering</span>
                <span className="hp-pill hp-pill-green">☁️ AWS · GCP · Azure</span>
                <span className="hp-pill hp-pill-purple">⚙️ DevOps &amp; CI/CD</span>
                <span className="hp-pill hp-pill-orange">🏀 Point Guard</span>
              </div>
              <p className="hp-hero-desc">NOC Network Engineer at <strong>Airtel</strong>, designing MPLS networks for enterprise B2B clients. Former <strong>VLSI Engineer</strong>. Cloud practitioner across AWS, GCP &amp; Azure. Based in Rajasthan, India.</p>
              <div className="hp-cta-row">
                <a href="#contact" className="hp-btn hp-btn-primary">Get in touch</a>
                <a href="#projects" className="hp-btn hp-btn-ghost">View projects</a>
              </div>
            </div>
            <div className="hp-hero-visual" data-reveal>
              <div className="hp-id-card">
                <div className="hp-id-card-icon">🌐</div>
                <div className="hp-id-card-label" style={{ color: '#3b82f6' }}>Network</div>
                <div className="hp-id-card-value">MPLS · BGP</div>
                <div className="hp-id-card-sub">Airtel NOC Engineer</div>
              </div>
              <div className="hp-id-card">
                <div className="hp-id-card-icon">☁️</div>
                <div className="hp-id-card-label" style={{ color: '#10b981' }}>Cloud</div>
                <div className="hp-id-card-value">AWS Certified</div>
                <div className="hp-id-card-sub">EC2 · VPC · RDS · IAM</div>
              </div>
              <div className="hp-id-card">
                <div className="hp-id-card-icon">🏀</div>
                <div className="hp-id-card-label" style={{ color: '#f97316' }}>Court</div>
                <div className="hp-id-card-value">Point Guard</div>
                <div className="hp-id-card-sub">10+ years · 5v5</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <div className="hp-about-strip" id="about">
        <div className="hp-wrap">
          <div className="hp-stat-row">
            {[['3+', 'Years Experience'], ['3', 'Cloud Platforms'], ['10+', 'DevOps Tools'], ['8.6', 'B.Tech CGPA']].map(([n, l]) => (
              <div key={l} className="hp-stat-item" data-reveal>
                <div className="hp-stat-n">{n}</div>
                <div className="hp-stat-l">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skills */}
      <section className="hp-sec" id="skills">
        <div className="hp-wrap">
          <div className="hp-tag">Technical Stack</div>
          <h2 className="hp-h2">Skills &amp; Tools</h2>
          <p className="hp-lead" style={{ marginBottom: 40 }}>From packet routing to cloud infra to containerised pipelines — the full stack.</p>
          <div className="hp-skills-grid">
            {SKILLS.map(s => (
              <div key={s.group} className="hp-skill-card" data-reveal>
                <div className="hp-skill-card-head">
                  <div className="hp-skill-dot" style={{ background: s.color }}></div>
                  <span className="hp-skill-card-title" style={{ color: s.color }}>{s.group}</span>
                </div>
                <ul className="hp-skill-list" style={{ color: s.color }}>
                  {s.items.map(i => <li key={i}>{i}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <div className="hp-exp-bg" id="experience">
        <div className="hp-wrap hp-sec-sm">
          <div className="hp-tag">Career</div>
          <h2 className="hp-h2">Work Experience</h2>
          <div className="hp-exp-list" style={{ marginTop: 40 }}>
            <div className="hp-exp-item" data-reveal>
              <div className="hp-exp-period">Sep 2025 – Present<br /><span style={{ color: '#10b981', fontSize: '.7rem' }}>● Current</span></div>
              <div>
                <div className="hp-exp-company">Airtel</div>
                <div className="hp-exp-role">NOC Network Engineer</div>
                <div className="hp-exp-desc">Designing complex MPLS networks for B2B enterprise banking clients. Optimised network design workflows and collaborating cross-functionally to deliver high-availability, low-latency connectivity.</div>
                <div className="hp-exp-tags">
                  {['MPLS', 'BGP', 'OSPF', 'B2B Enterprise', 'NOC', 'Network Design'].map(t => <span key={t} className="hp-tag-chip">{t}</span>)}
                </div>
              </div>
            </div>
            <div className="hp-exp-item" data-reveal>
              <div className="hp-exp-period">2022 – 2025</div>
              <div>
                <div className="hp-exp-company">Cloud &amp; DevOps Projects</div>
                <div className="hp-exp-role">Cloud &amp; DevOps Engineer (Project-based)</div>
                <div className="hp-exp-desc">AWS infrastructure (EC2, S3, RDS, VPC, IAM, ELB, Auto Scaling). CI/CD pipelines via Jenkins &amp; GitLab. Terraform IaC modules. Docker containerisation. Monitoring with Prometheus, Grafana, and ELK.</div>
                <div className="hp-exp-tags">
                  {['AWS', 'Terraform', 'Docker', 'Kubernetes', 'Jenkins', 'Prometheus', 'Grafana'].map(t => <span key={t} className="hp-tag-chip">{t}</span>)}
                </div>
              </div>
            </div>
            <div className="hp-exp-item" data-reveal>
              <div className="hp-exp-period">2018 – 2022</div>
              <div>
                <div className="hp-exp-company">VLSI / ECE Domain</div>
                <div className="hp-exp-role">VLSI Design &amp; Verification (Academic + Internship)</div>
                <div className="hp-exp-desc">RTL design with Verilog/SystemVerilog. Verification methodologies. Strong foundation in digital logic and signal processing — the bedrock of modern networking hardware.</div>
                <div className="hp-exp-tags">
                  {['Verilog', 'SystemVerilog', 'RTL Design', 'Digital Logic', 'ECE'].map(t => <span key={t} className="hp-tag-chip">{t}</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects */}
      <section className="hp-sec" id="projects">
        <div className="hp-wrap">
          <div className="hp-tag">Portfolio</div>
          <h2 className="hp-h2">Key Projects</h2>
          <p className="hp-lead" style={{ marginBottom: 40 }}>Real-world network, cloud, and DevOps work.</p>
          <div className="hp-proj-grid">
            {PROJECTS.map(p => (
              <div key={p.n} className="hp-proj-card" data-reveal style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="hp-proj-num" style={{ color: p.color }}>{p.n}</div>
                <div className="hp-proj-title">{p.title}</div>
                <div className="hp-proj-desc">{p.desc}</div>
                <div className="hp-proj-tags">
                  {p.tags.map(t => <span key={t} className="hp-proj-tag" style={{ background: `${p.color}12`, color: p.color }}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certs */}
      <div className="hp-exp-bg">
        <div className="hp-wrap hp-sec-sm">
          <div className="hp-tag">Credentials</div>
          <h2 className="hp-h2">Certifications &amp; Education</h2>
          <div className="hp-certs-grid" style={{ marginTop: 36 }}>
            {CERTS.map(c => (
              <div key={c.title} className="hp-cert-card" data-reveal>
                <div className="hp-cert-icon">{c.icon}</div>
                <div>
                  <div className="hp-cert-title">{c.title}</div>
                  <div className="hp-cert-issuer">{c.issuer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Basketball */}
      <div className="hp-bball-sec">
        <div className="hp-wrap hp-sec-sm">
          <div className="hp-bball-inner">
            <div className="hp-bball-text" data-reveal>
              <div className="hp-tag">Off the Clock</div>
              <h2 className="hp-h2">On the Court</h2>
              <p>Basketball is my parallel operating system. <strong>Reading the defense</strong> before a play is the same instinct as reading a network topology before a change window.</p>
              <p>Point guard mentality — <strong>see the full picture, control the tempo, elevate everyone around you</strong>. Same approach in engineering: architect the system, then let the team execute.</p>
              <p>In both: <strong>the best players adapt in real time</strong>. Build the plan, adjust when reality hits, never lose composure.</p>
              <div className="hp-bball-stats">
                <div className="hp-bs"><div className="hp-bs-n">PG</div><div className="hp-bs-l">Position</div></div>
                <div className="hp-bs"><div className="hp-bs-n">10+</div><div className="hp-bs-l">Yrs</div></div>
                <div className="hp-bs"><div className="hp-bs-n">5v5</div><div className="hp-bs-l">Format</div></div>
              </div>
            </div>
            <div className="hp-court-diagram" data-reveal>
              <div style={{ fontSize: '.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: '#94a3b8', marginBottom: 4 }}>The Parallel</div>
              {[
                { icon: '🏀', bg: 'rgba(249,115,22,.1)', label: 'Point Guard', val: 'Controls tempo, reads the floor' },
                { icon: '🌐', bg: 'rgba(59,130,246,.1)', label: 'Network Architect', val: 'Designs topology, routes traffic' },
                { icon: '☁️', bg: 'rgba(16,185,129,.1)', label: 'Cloud Engineer', val: 'Scales infra, maintains uptime' },
                { icon: '⚙️', bg: 'rgba(139,92,246,.1)', label: 'DevOps', val: 'Automates delivery, monitors health' },
              ].map((row, i) => (
                <div key={row.label}>
                  {i > 0 && <div className="hp-divider"></div>}
                  <div className="hp-court-row" style={{ paddingTop: i > 0 ? 14 : 0, paddingBottom: 0 }}>
                    <div className="hp-court-icon" style={{ background: row.bg }}>{row.icon}</div>
                    <div>
                      <div className="hp-court-label">{row.label}</div>
                      <div className="hp-court-val">{row.val}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <section className="hp-sec" id="contact">
        <div className="hp-wrap">
          <div className="hp-tag">Let's Connect</div>
          <h2 className="hp-h2">Get in Touch</h2>
          <div className="hp-contact-grid" style={{ marginTop: 40 }}>
            <div data-reveal>
              <p style={{ fontSize: '.9rem', color: '#6b7280', lineHeight: 1.8, marginBottom: 8 }}>Whether you're hiring for Cloud or DevOps, want to talk network architecture, or run a few drills — reach out. Based in Rajasthan, open to remote or relocation.</p>
              <div>
                {[
                  { icon: '✉️', label: 'naveenmeel10@gmail.com', href: 'mailto:naveenmeel10@gmail.com' },
                  { icon: '📱', label: '+91 87694 71595', href: 'tel:+918769471595' },
                  { icon: '💼', label: 'linkedin.com/in/naveenmeel', href: 'https://www.linkedin.com/in/naveenmeel' },
                  { icon: '⌥', label: 'GitHub — naveenmeel', href: 'https://github.com/naveenmeel' },
                ].map(l => (
                  <a key={l.label} href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noopener" className="hp-c-link">
                    <div className="hp-c-link-icon">{l.icon}</div>
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="hp-c-form" data-reveal>
              <div><label className="hp-f-label">Name</label><input id="cName" className="hp-f-input" placeholder="Your name" /></div>
              <div><label className="hp-f-label">Email</label><input type="email" className="hp-f-input" placeholder="your@email.com" /></div>
              <div><label className="hp-f-label">Subject</label><input className="hp-f-input" placeholder="Cloud Engineer role · Collaboration · etc." /></div>
              <div><label className="hp-f-label">Message</label><textarea className="hp-f-textarea" placeholder="Tell me about the opportunity..." /></div>
              <button className="hp-btn hp-btn-primary" style={{ alignSelf: 'flex-start' }} onClick={() => {
                const n = (document.getElementById('cName') as HTMLInputElement)?.value;
                if (!n?.trim()) { alert('Please add your name'); return; }
                alert("Sent! I'll reply soon.");
              }}>Send Message</button>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <div className="hp-exp-bg">
        <div className="hp-wrap hp-sec-sm">
          <div className="hp-tag">Writing</div>
          <h2 className="hp-h2">Latest Posts</h2>
          <p className="hp-lead" style={{ marginBottom: 36 }}>Notes on networking, cloud, DevOps, and life off the court.</p>
          {posts.length === 0 ? (
            <div className="hp-posts-empty">
              <div style={{ fontSize: '2rem', marginBottom: 10 }}>✍️</div>
              <p>No posts yet — <Link href="/blog" style={{ color: '#3b82f6' }}>visit the blog</Link> to get started.</p>
            </div>
          ) : (
            <div className="hp-posts-grid">
              {posts.map(post => {
                const catColors: Record<string, string> = { networking: '#3b82f6', cloud: '#10b981', devops: '#8b5cf6', basketball: '#f97316', tech: '#3b82f6', life: '#ec4899' };
                const c = catColors[post.category?.toLowerCase()] || '#3b82f6';
                return (
                  <Link key={post.id} href={`/blog/${post.slug}`} style={{ display: 'block', height: '100%' }}>
                    <div className="hp-post-card" data-reveal>
                      <div className="hp-post-emoji">{post.cover_emoji || '📝'}</div>
                      <span className="hp-post-cat-badge" style={{ background: `${c}14`, color: c }}>{post.category}</span>
                      <div className="hp-post-title">{post.title}</div>
                      {post.excerpt && <div className="hp-post-excerpt">{post.excerpt.slice(0, 90)}…</div>}
                      <div className="hp-post-meta">{fmt(post.created_at)}{post.read_time ? ` · ${post.read_time} min read` : ''}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
          <div style={{ textAlign: 'center', marginTop: 8 }}>
            <Link href="/blog" className="hp-btn hp-btn-ghost">View all posts →</Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="hp-footer">
        <div className="hp-wrap">
          <div className="hp-footer-inner">
            <div className="hp-footer-copy">© 2025 <strong>Naveen Meel</strong> · Built with Vite &amp; React</div>
            <button className="hp-footer-back" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>↑ Back to top</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
