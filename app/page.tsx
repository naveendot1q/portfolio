'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

type Post = {
  id: string; title: string; slug: string; excerpt: string | null;
  category: string; cover_emoji: string | null; created_at: string; read_time: number | null;
};

export default function PortfolioPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);

  // Fetch latest posts
  useEffect(() => {
    fetch('/api/posts?limit=3')
      .then(r => r.json())
      .then(d => setLatestPosts(d.posts || []))
      .catch(() => {});
  }, []);

  // Canvas background
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let W = canvas.width = window.innerWidth, H = canvas.height = window.innerHeight;
    const particles: { x: number; y: number; vx: number; vy: number; r: number; o: number }[] = [];
    for (let i = 0; i < 80; i++) particles.push({ x: Math.random()*W, y: Math.random()*H, vx: (Math.random()-.5)*.4, vy: (Math.random()-.5)*.4, r: Math.random()*2+.5, o: Math.random()*.6+.2 });
    let af: number;
    function draw() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fillStyle = `rgba(0,212,255,${p.o})`; ctx.fill();
      });
      particles.forEach((a, i) => particles.slice(i+1).forEach(b => {
        const d = Math.hypot(a.x-b.x, a.y-b.y);
        if (d < 120) { ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.strokeStyle = `rgba(0,212,255,${.15*(1-d/120)})`; ctx.lineWidth=.5; ctx.stroke(); }
      }));
      af = requestAnimationFrame(draw);
    }
    draw();
    const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(af); window.removeEventListener('resize', onResize); };
  }, []);

  // Custom cursor
  useEffect(() => {
    const cur = cursorRef.current, ring = ringRef.current;
    if (!cur || !ring) return;
    let rx = 0, ry = 0;
    const onMove = (e: MouseEvent) => {
      cur.style.left = e.clientX + 'px'; cur.style.top = e.clientY + 'px';
      rx += (e.clientX - rx) * .12; ry += (e.clientY - ry) * .12;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }), { threshold: 0.1 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Skill bar animation
  useEffect(() => {
    const bars = document.querySelectorAll<HTMLElement>('.bar-fill');
    const obs = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { const el = e.target as HTMLElement; el.style.transform = `scaleX(${el.style.getPropertyValue('--w') || 0})`; }
    }), { threshold: 0.3 });
    bars.forEach(b => obs.observe(b));
    return () => obs.disconnect();
  }, []);

  function handleSend() {
    const n = (document.getElementById('cName') as HTMLInputElement)?.value;
    if (!n?.trim()) { alert('Please fill in your name'); return; }
    alert('Message sent! I\'ll get back to you soon.');
  }

  function formatDate(d: string) {
    return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  const catColor: Record<string, string> = {
    networking: '#a78bfa', cloud: '#34d399', devops: '#60a5fa',
    devsecops: '#f59e0b', kubernetes: '#06b6d4', terraform: '#8b5cf6',
    basketball: '#FF6B1A', tech: '#58a6ff', linux: '#22c55e', life: '#f778a1',
  };

  return (
    <>
      <style>{`
        :root{--orange:#FF6B1A;--orange-glow:#FF8C42;--green:#00FF88;--blue:#00D4FF;--dark:#080A0F;--dark2:#0D1117;--dark3:#141920;--card:#111820;--text:#E8EDF2;--muted:#6B7B8D;--border:rgba(0,212,255,0.15);}
        *{margin:0;padding:0;box-sizing:border-box;}
        html{scroll-behavior:smooth;}
        body{font-family:'Space Mono',monospace;background:var(--dark);color:var(--text);overflow-x:hidden;cursor:none;}
        .cursor{width:12px;height:12px;background:var(--orange);border-radius:50%;position:fixed;top:0;left:0;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:width .2s,height .2s;mix-blend-mode:screen;}
        .cursor-ring{width:36px;height:36px;border:1.5px solid var(--orange);border-radius:50%;position:fixed;top:0;left:0;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);opacity:.6;}
        #bg-canvas{position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;opacity:.3;}
        ::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-track{background:var(--dark2);}::-webkit-scrollbar-thumb{background:var(--orange);border-radius:2px;}
        nav{position:fixed;top:0;width:100%;padding:20px 48px;display:flex;align-items:center;justify-content:space-between;z-index:100;background:linear-gradient(to bottom,rgba(8,10,15,.97),transparent);backdrop-filter:blur(12px);}
        .nav-logo{font-family:'Bebas Neue',sans-serif;font-size:1.6rem;letter-spacing:3px;color:var(--orange);text-decoration:none;}
        .nav-logo span{color:var(--blue);}
        .nav-links{display:flex;gap:32px;list-style:none;align-items:center;}
        .nav-links a{font-size:.7rem;letter-spacing:2px;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s;position:relative;}
        .nav-links a::after{content:'';position:absolute;bottom:-4px;left:0;width:0;height:1px;background:var(--orange);transition:width .3s;}
        .nav-links a:hover{color:var(--orange);}
        .nav-links a:hover::after{width:100%;}
        .nav-blog-link{color:var(--orange)!important;border:1px solid rgba(255,107,26,.35);padding:4px 14px!important;border-radius:2px;}
        .nav-blog-link:hover{background:rgba(255,107,26,.1);}
        .nav-blog-link::after{display:none!important;}
        .nav-menu{display:none;cursor:pointer;flex-direction:column;gap:5px;background:none;border:none;}
        .nav-menu span{width:22px;height:2px;background:var(--orange);display:block;}
        .mobile-menu{display:none;position:fixed;inset:0;background:rgba(8,10,15,.98);z-index:99;flex-direction:column;align-items:center;justify-content:center;gap:32px;backdrop-filter:blur(20px);}
        .mobile-menu.open{display:flex;}
        .mobile-menu a{font-family:'Bebas Neue',sans-serif;font-size:2.5rem;letter-spacing:4px;color:var(--text);text-decoration:none;transition:color .2s;}
        .mobile-menu a:hover{color:var(--orange);}
        .mobile-close{position:absolute;top:24px;right:24px;font-size:2rem;color:var(--muted);cursor:pointer;background:none;border:none;}
        #hero{min-height:100vh;display:flex;align-items:center;position:relative;z-index:1;padding:0 48px;}
        .hero-inner{max-width:1200px;margin:0 auto;width:100%;display:grid;grid-template-columns:1fr 400px;gap:60px;align-items:center;}
        .hero-tag{font-size:.68rem;letter-spacing:4px;text-transform:uppercase;color:var(--green);margin-bottom:18px;display:flex;align-items:center;gap:10px;}
        .hero-tag::before{content:'';width:30px;height:1px;background:var(--green);}
        .dot-pulse{width:8px;height:8px;background:var(--green);border-radius:50%;animation:pulse 2s infinite;}
        @keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(0,255,136,.4)}50%{box-shadow:0 0 0 8px rgba(0,255,136,0)}}
        .hero-name{font-family:'Bebas Neue',sans-serif;font-size:clamp(3.5rem,8vw,7.5rem);line-height:.92;letter-spacing:2px;margin-bottom:20px;}
        .hero-name .l1{color:var(--text);display:block;}
        .hero-name .l2{color:transparent;-webkit-text-stroke:2px var(--orange);display:block;}
        .hero-sub{font-family:'Syne',sans-serif;font-size:1rem;font-weight:700;color:var(--blue);letter-spacing:3px;text-transform:uppercase;margin-bottom:24px;}
        .hero-roles{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:28px;}
        .role-pill{padding:5px 14px;border-radius:2px;font-size:.65rem;letter-spacing:2px;text-transform:uppercase;border:1px solid;}
        .rp-net{border-color:var(--blue);color:var(--blue);background:rgba(0,212,255,.06);}
        .rp-cloud{border-color:var(--green);color:var(--green);background:rgba(0,255,136,.06);}
        .rp-devops{border-color:#C084FC;color:#C084FC;background:rgba(192,132,252,.06);}
        .rp-bball{border-color:var(--orange);color:var(--orange);background:rgba(255,107,26,.06);}
        .hero-desc{font-size:.86rem;line-height:1.85;color:var(--muted);margin-bottom:36px;max-width:480px;}
        .hero-desc strong{color:var(--text);}
        .hero-cta{display:flex;gap:16px;flex-wrap:wrap;}
        .btn-primary{padding:13px 30px;background:var(--orange);color:var(--dark);font-family:'Space Mono',monospace;font-size:.7rem;font-weight:700;letter-spacing:2px;text-transform:uppercase;text-decoration:none;border:none;cursor:pointer;clip-path:polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,12px 100%,0 calc(100% - 12px));transition:all .2s;display:inline-block;}
        .btn-primary:hover{background:var(--orange-glow);transform:translateY(-2px);box-shadow:0 8px 24px rgba(255,107,26,.4);}
        .btn-outline{padding:13px 30px;background:transparent;color:var(--blue);font-family:'Space Mono',monospace;font-size:.7rem;letter-spacing:2px;text-transform:uppercase;text-decoration:none;border:1px solid var(--blue);cursor:pointer;clip-path:polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,12px 100%,0 calc(100% - 12px));transition:all .2s;display:inline-block;}
        .btn-outline:hover{background:rgba(0,212,255,.1);transform:translateY(-2px);}
        .hero-visual{display:flex;align-items:center;justify-content:center;position:relative;}
        .ball-wrap{width:300px;height:300px;position:relative;}
        .ball-svg{width:100%;height:100%;animation:spin 14s linear infinite;filter:drop-shadow(0 0 40px rgba(255,107,26,.5));}
        @keyframes spin{to{transform:rotate(360deg)}}
        .orbit{position:absolute;top:50%;left:50%;transform-origin:0 0;animation:orb 6s linear infinite;}
        .orbit-dot{width:8px;height:8px;background:var(--blue);border-radius:50%;box-shadow:0 0 12px var(--blue);position:absolute;transform:translate(-50%,-50%);}
        @keyframes orb{from{transform:rotate(0deg) translateX(160px) rotate(0deg)}to{transform:rotate(360deg) translateX(160px) rotate(-360deg)}}
        .o2{animation-duration:4s;animation-direction:reverse;}
        .o2 .orbit-dot{background:var(--green);box-shadow:0 0 12px var(--green);}
        .o3{animation-duration:9s;}
        .o3 .orbit-dot{background:var(--orange);box-shadow:0 0 12px var(--orange);width:5px;height:5px;}
        .hero-info-cards{position:absolute;bottom:-30px;left:-40px;display:flex;flex-direction:column;gap:8px;}
        .info-card{background:var(--card);border:1px solid var(--border);padding:8px 14px;font-size:.62rem;letter-spacing:1px;white-space:nowrap;clip-path:polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px));}
        .info-card .val{color:var(--orange);font-weight:700;}
        section{position:relative;z-index:1;}
        .si{max-width:1200px;margin:0 auto;padding:100px 48px;}
        .sec-label{font-size:.64rem;letter-spacing:5px;text-transform:uppercase;color:var(--orange);margin-bottom:12px;display:flex;align-items:center;gap:12px;}
        .sec-label::after{content:'';flex:1;height:1px;background:linear-gradient(to right,var(--orange),transparent);}
        .sec-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(2.5rem,5vw,4rem);letter-spacing:2px;margin-bottom:56px;line-height:1;}
        #about{background:linear-gradient(180deg,transparent,rgba(0,212,255,.02),transparent);}
        .about-grid{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:start;}
        .about-text p{font-size:.88rem;line-height:1.9;color:var(--muted);margin-bottom:18px;}
        .about-text p strong{color:var(--text);}
        .quote-block{border-left:3px solid var(--orange);padding:16px 22px;background:rgba(255,107,26,.05);margin:24px 0;font-style:italic;color:var(--text);font-size:.83rem;line-height:1.7;}
        .loc-badge{display:inline-flex;align-items:center;gap:8px;background:var(--card);border:1px solid var(--border);padding:8px 16px;font-size:.68rem;letter-spacing:2px;color:var(--blue);margin-bottom:24px;}
        .stats-grid{display:grid;grid-template-columns:1fr 1fr;gap:2px;}
        .stat-box{background:var(--card);padding:26px;border:1px solid var(--border);transition:border-color .3s;position:relative;overflow:hidden;}
        .stat-box::before{content:'';position:absolute;top:0;left:0;width:3px;height:100%;background:var(--orange);transform:scaleY(0);transform-origin:bottom;transition:transform .3s;}
        .stat-box:hover::before{transform:scaleY(1);}
        .stat-box:hover{border-color:rgba(255,107,26,.3);}
        .stat-num{font-family:'Bebas Neue',sans-serif;font-size:2.8rem;color:var(--orange);line-height:1;}
        .stat-label{font-size:.62rem;letter-spacing:2px;text-transform:uppercase;color:var(--muted);margin-top:4px;}
        #skills{background:var(--dark2);}
        .skills-cols{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
        .skill-cat{background:var(--card);border:1px solid var(--border);padding:30px 26px;position:relative;overflow:hidden;transition:transform .3s,box-shadow .3s;}
        .skill-cat:hover{transform:translateY(-4px);box-shadow:0 16px 48px rgba(0,0,0,.4);}
        .skill-cat::after{content:'';position:absolute;top:0;right:0;width:60px;height:60px;background:radial-gradient(circle at top right,rgba(255,107,26,.12),transparent 70%);}
        .skill-cat-icon{font-size:1.8rem;margin-bottom:14px;}
        .skill-cat-title{font-family:'Syne',sans-serif;font-size:.9rem;font-weight:800;letter-spacing:1px;margin-bottom:20px;text-transform:uppercase;}
        .sct-blue{color:var(--blue);}.sct-green{color:var(--green);}.sct-purple{color:#C084FC;}.sct-orange{color:var(--orange);}
        .bar-wrap{margin-bottom:13px;}
        .bar-label{display:flex;justify-content:space-between;font-size:.65rem;letter-spacing:1px;color:var(--muted);margin-bottom:5px;}
        .bar-track{height:3px;background:rgba(255,255,255,.06);border-radius:2px;overflow:hidden;}
        .bar-fill{height:100%;border-radius:2px;transform:scaleX(0);transform-origin:left;transition:transform 1.2s cubic-bezier(.16,1,.3,1);}
        .bf-blue{background:linear-gradient(to right,var(--blue),rgba(0,212,255,.3));}
        .bf-green{background:linear-gradient(to right,var(--green),rgba(0,255,136,.3));}
        .bf-purple{background:linear-gradient(to right,#C084FC,rgba(192,132,252,.3));}
        .bf-orange{background:linear-gradient(to right,var(--orange),rgba(255,140,66,.3));}
        #certs{background:var(--dark);}
        .certs-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
        .cert-card{background:var(--card);border:1px solid var(--border);padding:28px;transition:all .3s;position:relative;overflow:hidden;clip-path:polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,14px 100%,0 calc(100% - 14px));}
        .cert-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(to right,var(--orange),var(--blue));transform:scaleX(0);transition:transform .4s;}
        .cert-card:hover{transform:translateY(-4px);border-color:rgba(255,107,26,.25);box-shadow:0 16px 40px rgba(0,0,0,.4);}
        .cert-card:hover::before{transform:scaleX(1);}
        .cert-icon{font-size:2rem;margin-bottom:12px;}
        .cert-title{font-family:'Syne',sans-serif;font-size:.95rem;font-weight:800;color:var(--text);margin-bottom:6px;}
        .cert-issuer{font-size:.65rem;letter-spacing:2px;text-transform:uppercase;color:var(--orange);}
        #experience{background:var(--dark2);}
        .timeline{position:relative;padding-left:40px;}
        .timeline::before{content:'';position:absolute;left:0;top:0;bottom:0;width:1px;background:linear-gradient(to bottom,var(--orange),var(--blue),var(--green));}
        .tl-item{position:relative;margin-bottom:48px;padding:30px;background:var(--card);border:1px solid var(--border);clip-path:polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,14px 100%,0 calc(100% - 14px));transition:border-color .3s,transform .3s;}
        .tl-item:hover{border-color:rgba(255,107,26,.3);transform:translateX(4px);}
        .tl-dot{position:absolute;left:-48px;top:30px;width:16px;height:16px;border-radius:50%;border:2px solid var(--orange);background:var(--dark);box-shadow:0 0 12px var(--orange);}
        .tl-dot.blue{border-color:var(--blue);box-shadow:0 0 12px var(--blue);}
        .tl-dot.green-d{border-color:var(--green);box-shadow:0 0 12px var(--green);}
        .tl-meta{display:flex;align-items:center;gap:12px;margin-bottom:8px;flex-wrap:wrap;}
        .tl-company{font-family:'Syne',sans-serif;font-size:1.05rem;font-weight:800;color:var(--text);}
        .tl-period{font-size:.62rem;letter-spacing:2px;color:var(--orange);text-transform:uppercase;padding:3px 10px;border:1px solid rgba(255,107,26,.3);}
        .tl-location{font-size:.62rem;letter-spacing:1px;color:var(--muted);}
        .tl-role{font-size:.7rem;letter-spacing:2px;color:var(--blue);text-transform:uppercase;margin-bottom:14px;}
        .tl-desc{font-size:.8rem;line-height:1.8;color:var(--muted);padding-left:16px;}
        .tl-desc li{margin-bottom:8px;position:relative;}
        .tech-tags{display:flex;flex-wrap:wrap;gap:7px;margin-top:16px;}
        .tt{font-size:.58rem;letter-spacing:1.5px;padding:3px 9px;background:rgba(0,212,255,.06);border:1px solid rgba(0,212,255,.2);color:var(--blue);text-transform:uppercase;}
        .tt.g{background:rgba(0,255,136,.06);border-color:rgba(0,255,136,.2);color:var(--green);}
        .tt.p{background:rgba(192,132,252,.06);border-color:rgba(192,132,252,.2);color:#C084FC;}
        .tt.o{background:rgba(255,107,26,.06);border-color:rgba(255,107,26,.2);color:var(--orange);}
        #projects{background:var(--dark);}
        .proj-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;}
        .proj-card{background:var(--card);border:1px solid var(--border);padding:26px;position:relative;overflow:hidden;transition:all .3s;clip-path:polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,12px 100%,0 calc(100% - 12px));}
        .proj-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(to right,var(--orange),var(--blue));transform:scaleX(0);transition:transform .4s;}
        .proj-card:hover{transform:translateY(-5px);border-color:rgba(255,107,26,.2);box-shadow:0 20px 50px rgba(0,0,0,.5);}
        .proj-card:hover::before{transform:scaleX(1);}
        .proj-num{font-family:'Bebas Neue',sans-serif;font-size:3rem;color:rgba(255,107,26,.1);line-height:1;margin-bottom:6px;}
        .proj-title{font-family:'Syne',sans-serif;font-size:.95rem;font-weight:800;color:var(--text);margin-bottom:10px;}
        .proj-desc{font-size:.76rem;line-height:1.75;color:var(--muted);margin-bottom:18px;}
        #basketball{background:linear-gradient(135deg,var(--dark) 0%,rgba(255,107,26,.03) 50%,var(--dark) 100%);}
        .bball-grid{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;}
        .bball-text p{font-size:.86rem;line-height:1.9;color:var(--muted);margin-bottom:18px;}
        .bball-text p strong{color:var(--text);}
        .bball-court-wrap{position:relative;max-width:380px;margin:auto;}
        .bball-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:28px;}
        .bs{text-align:center;padding:18px 10px;background:var(--card);border:1px solid rgba(255,107,26,.2);}
        .bs-num{font-family:'Bebas Neue',sans-serif;font-size:2.2rem;color:var(--orange);line-height:1;}
        .bs-label{font-size:.58rem;letter-spacing:2px;text-transform:uppercase;color:var(--muted);margin-top:4px;}
        #contact{background:var(--dark2);}
        .contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:72px;align-items:start;}
        .contact-info p{font-size:.86rem;line-height:1.9;color:var(--muted);margin-bottom:28px;}
        .c-links{display:flex;flex-direction:column;gap:10px;}
        .c-link{display:flex;align-items:center;gap:14px;padding:13px 18px;background:var(--card);border:1px solid var(--border);text-decoration:none;color:var(--text);font-size:.76rem;letter-spacing:1px;transition:all .2s;clip-path:polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px));}
        .c-link:hover{border-color:rgba(255,107,26,.4);color:var(--orange);transform:translateX(4px);}
        .c-icon{font-size:1rem;width:20px;text-align:center;}
        .c-form{display:flex;flex-direction:column;gap:14px;}
        .f-group{display:flex;flex-direction:column;gap:5px;}
        .f-label{font-size:.62rem;letter-spacing:2px;text-transform:uppercase;color:var(--muted);}
        .f-input,.f-textarea{background:var(--card);border:1px solid var(--border);color:var(--text);padding:13px 16px;font-family:'Space Mono',monospace;font-size:.8rem;outline:none;transition:border-color .2s;clip-path:polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px));}
        .f-input:focus,.f-textarea:focus{border-color:var(--orange);}
        .f-textarea{resize:vertical;min-height:110px;}
        #latest-posts{background:var(--dark);border-top:1px solid rgba(0,212,255,.1);}
        .posts-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-bottom:40px;}
        .post-card-link{text-decoration:none;display:block;}
        .post-card{background:var(--card);border:1px solid var(--border);padding:24px;transition:all .3s;position:relative;overflow:hidden;clip-path:polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,12px 100%,0 calc(100% - 12px));height:100%;}
        .post-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(to right,var(--orange),var(--blue));transform:scaleX(0);transition:transform .4s;}
        .post-card:hover{transform:translateY(-4px);border-color:rgba(255,107,26,.2);box-shadow:0 16px 40px rgba(0,0,0,.4);}
        .post-card:hover::before{transform:scaleX(1);}
        .post-emoji{font-size:2rem;margin-bottom:12px;}
        .post-cat{font-size:.55rem;letter-spacing:2px;text-transform:uppercase;padding:3px 8px;border-radius:3px;font-weight:700;display:inline-block;margin-bottom:10px;}
        .post-title{font-family:'Syne',sans-serif;font-size:.95rem;font-weight:800;color:var(--text);margin-bottom:8px;line-height:1.3;}
        .post-card:hover .post-title{color:var(--orange);}
        .post-excerpt{font-size:.75rem;line-height:1.7;color:var(--muted);margin-bottom:14px;}
        .post-meta{font-size:.6rem;letter-spacing:1px;color:var(--muted);}
        .posts-empty{text-align:center;padding:60px;color:var(--muted);font-size:.8rem;}
        .view-all-wrap{text-align:center;}
        footer{position:relative;z-index:1;border-top:1px solid var(--border);padding:28px 48px;display:flex;align-items:center;justify-content:space-between;background:var(--dark);flex-wrap:wrap;gap:12px;}
        .f-copy{font-size:.65rem;letter-spacing:1px;color:var(--muted);}
        .f-copy span{color:var(--orange);}
        .f-top{font-size:.62rem;letter-spacing:2px;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s;background:none;border:none;cursor:pointer;}
        .f-top:hover{color:var(--orange);}
        .reveal{opacity:0;transform:translateY(28px);transition:opacity .6s ease,transform .6s ease;}
        .reveal.visible{opacity:1;transform:translateY(0);}
        @media(max-width:960px){
          nav{padding:16px 24px;}
          .nav-links{display:none;}
          .nav-menu{display:flex;}
          #hero{padding:100px 24px 60px;min-height:auto;}
          .hero-inner{grid-template-columns:1fr;gap:40px;}
          .hero-visual{order:-1;}
          .ball-wrap{width:240px;height:240px;}
          .hero-info-cards{left:0;}
          .o2,.o3{display:none;}
          .si{padding:70px 24px;}
          .about-grid,.bball-grid,.contact-grid{grid-template-columns:1fr;}
          .skills-cols{grid-template-columns:1fr;}
          .proj-grid,.posts-grid{grid-template-columns:1fr;}
          .certs-grid{grid-template-columns:1fr 1fr;}
          footer{padding:20px 24px;flex-direction:column;text-align:center;}
        }
        @media(max-width:560px){
          .hero-name{font-size:3rem;}
          .bball-stats{grid-template-columns:1fr 1fr;}
          .certs-grid{grid-template-columns:1fr;}
        }
      `}</style>

      <div className="cursor" ref={cursorRef}></div>
      <div className="cursor-ring" ref={ringRef}></div>
      <canvas id="bg-canvas" ref={canvasRef}></canvas>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <button className="mobile-close" onClick={() => setMenuOpen(false)}>✕</button>
        {['about','skills','certs','experience','projects','basketball','contact'].map(s => (
          <a key={s} href={`#${s}`} onClick={() => setMenuOpen(false)} style={{textTransform:'uppercase'}}>{s}</a>
        ))}
        <Link href="/blog" onClick={() => setMenuOpen(false)} style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'2.5rem',letterSpacing:'4px',color:'var(--orange)',textDecoration:'none'}}>Blog</Link>
      </div>

      {/* Nav */}
      <nav>
        <a href="#" className="nav-logo">NM<span>.</span>DEV</a>
        <ul className="nav-links">
          {['about','skills','certs','experience','projects','basketball','contact'].map(s => (
            <li key={s}><a href={`#${s}`}>{s}</a></li>
          ))}
          <li><Link href="/blog" className="nav-blog-link">Blog</Link></li>
        </ul>
        <button className="nav-menu" onClick={() => setMenuOpen(true)}>
          <span/><span/><span/>
        </button>
      </nav>

      {/* Hero */}
      <section id="hero">
        <div className="hero-inner">
          <div>
            <div className="hero-tag"><div className="dot-pulse"></div>Open to Cloud &amp; DevOps Roles</div>
            <h1 className="hero-name"><span className="l1">NAVEEN</span><span className="l2">MEEL</span></h1>
            <div className="hero-sub">Network · Cloud · DevOps Engineer</div>
            <div className="hero-roles">
              <span className="role-pill rp-net">Network Engineering</span>
              <span className="role-pill rp-cloud">AWS · GCP · Azure</span>
              <span className="role-pill rp-devops">DevOps & CI/CD</span>
              <span className="role-pill rp-bball">Basketball 🏀</span>
            </div>
            <p className="hero-desc">NOC Network Engineer at <strong>Airtel</strong>, designing complex MPLS networks for enterprise B2B clients. Former <strong>VLSI Design & Verification Engineer</strong>. Cloud practitioner across <strong>AWS, GCP & Azure</strong>, fluent in DevOps pipelines, containers, and IaC. Based in Rajasthan, India.</p>
            <div className="hero-cta">
              <a href="#contact" className="btn-primary">Hire Me</a>
              <a href="#projects" className="btn-outline">View Projects</a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="ball-wrap">
              <svg className="ball-svg" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="bg2" cx="35%" cy="35%"><stop offset="0%" stopColor="#FF8C42"/><stop offset="60%" stopColor="#FF6B1A"/><stop offset="100%" stopColor="#8B2500"/></radialGradient>
                  <radialGradient id="glow2" cx="50%" cy="50%"><stop offset="0%" stopColor="rgba(255,107,26,.2)"/><stop offset="100%" stopColor="rgba(255,107,26,0)"/></radialGradient>
                  <clipPath id="bc2"><circle cx="150" cy="150" r="128"/></clipPath>
                </defs>
                <circle cx="150" cy="150" r="144" fill="url(#glow2)"/>
                <circle cx="150" cy="150" r="128" fill="url(#bg2)"/>
                <g clipPath="url(#bc2)" stroke="#1A0800" strokeWidth="3.5" fill="none" opacity=".65">
                  <path d="M150,22 C150,22 118,80 118,150 C118,220 150,278 150,278"/>
                  <path d="M150,22 C150,22 182,80 182,150 C182,220 150,278 150,278"/>
                  <path d="M22,150 C22,150 80,118 150,118 C220,118 278,150 278,150"/>
                  <path d="M22,150 C22,150 80,182 150,182 C220,182 278,150 278,150"/>
                </g>
                <g clipPath="url(#bc2)" stroke="rgba(0,212,255,.3)" strokeWidth="1" fill="none">
                  <path d="M40,60 L80,60 L80,100 L120,100"/><path d="M260,60 L220,60 L220,100 L180,100"/>
                  <path d="M40,240 L80,240 L80,200 L120,200"/><path d="M260,240 L220,240 L220,200 L180,200"/>
                </g>
                <g clipPath="url(#bc2)" fill="rgba(0,212,255,.5)">
                  <circle cx="80" cy="60" r="3"/><circle cx="220" cy="60" r="3"/>
                  <circle cx="80" cy="240" r="3"/><circle cx="220" cy="240" r="3"/>
                </g>
                <ellipse cx="108" cy="92" rx="28" ry="16" fill="rgba(255,255,255,.12)" transform="rotate(-30 108 92)"/>
              </svg>
              <div className="orbit"><div className="orbit-dot"></div></div>
              <div className="orbit o2"><div className="orbit-dot"></div></div>
              <div className="orbit o3"><div className="orbit-dot"></div></div>
              <div className="hero-info-cards">
                <div className="info-card">Airtel NOC <span className="val">→ MPLS</span></div>
                <div className="info-card">AWS Certified <span className="val">☁</span></div>
                <div className="info-card">Point Guard <span className="val">🏀</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about">
        <div className="si">
          <div className="sec-label">Who I Am</div>
          <h2 className="sec-title">NAVEEN<br/>MEEL</h2>
          <div className="about-grid">
            <div className="about-text">
              <div className="loc-badge">📍 Rajasthan, India &nbsp;|&nbsp; +91 87694 71595</div>
              <p>I'm a <strong>Network Engineer at Airtel</strong>, where I design complex MPLS networks for B2B enterprise customers — primarily in the banking sector. Before that, I was deep in silicon as a <strong>VLSI Design & Verification Engineer</strong>, which gives me a full-stack perspective from electrons to cloud packets.</p>
              <p>My foundation in <strong>Electronics & Communication Engineering</strong> (8.6 CGPA, BK Birla Institute) combined with hands-on work in AWS, DevOps pipelines, containers, and IaC puts me in a rare position — someone who understands both the physical network and the cloud-native world.</p>
              <div className="quote-block">"From designing silicon chip interconnects to routing MPLS traffic for India's largest telco — I've engineered systems from the ground up, one layer at a time."</div>
              <p>I'm actively seeking <strong>Cloud Engineer</strong> or <strong>DevOps Engineer</strong> roles where I can combine my networking depth with cloud and automation expertise.</p>
            </div>
            <div>
              <div className="stats-grid reveal">
                <div className="stat-box"><div className="stat-num">3+</div><div className="stat-label">Years Experience</div></div>
                <div className="stat-box"><div className="stat-num">8.6</div><div className="stat-label">B.Tech CGPA</div></div>
                <div className="stat-box"><div className="stat-num">3</div><div className="stat-label">Cloud Platforms</div></div>
                <div className="stat-box"><div className="stat-num">10+</div><div className="stat-label">DevOps Tools</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills">
        <div className="si">
          <div className="sec-label">Technical Stack</div>
          <h2 className="sec-title">SKILLS &<br/>TOOLS</h2>
          <div className="skills-cols">
            {[
              { icon:'🌐', title:'Networking', cls:'sct-blue', fill:'bf-blue', bars:[['MPLS Design','90%',.90],['BGP / OSPF','85%',.85],['VPN / VPC Design','88%',.88],['TCP/IP & LAN/WAN','92%',.92],['Network Security','80%',.80]] },
              { icon:'☁️', title:'Cloud Platforms', cls:'sct-green', fill:'bf-green', bars:[['AWS (EC2/VPC/IAM/S3/RDS)','90%',.90],['AWS CloudWatch / SNS','85%',.85],['Microsoft Azure','75%',.75],['Google Cloud (GCP)','70%',.70],['Auto Scaling / ELB','88%',.88]] },
              { icon:'⚙️', title:'DevOps & Automation', cls:'sct-purple', fill:'bf-purple', bars:[['Docker','85%',.85],['Jenkins / CI-CD','82%',.82],['Terraform / Ansible','80%',.80],['Kubernetes','72%',.72],['Linux / Shell Scripting','88%',.88]] },
              { icon:'📊', title:'Monitoring & Security', cls:'sct-orange', fill:'bf-orange', bars:[['Prometheus / Grafana','80%',.80],['ELK Stack','75%',.75],['SonarQube','78%',.78],['TRIVY / OWASP','72%',.72],['Python / Scripting','82%',.82]] },
              { icon:'🔀', title:'Version Control & Build', cls:'sct-blue', fill:'bf-blue', bars:[['Git / GitHub','90%',.90],['Azure DevOps / Repos','82%',.82],['Maven / NodeJS (Basics)','72%',.72],['Nexus / Azure Artifacts','75%',.75],['JIRA','85%',.85]] },
              { icon:'⚡', title:'VLSI Background', cls:'sct-green', fill:'bf-green', bars:[['SystemVerilog / Verilog','85%',.85],['RTL Design','80%',.80],['Verification / UVM','78%',.78],['ECE Fundamentals','90%',.90],['Digital Logic Design','88%',.88]] },
            ].map(cat => (
              <div key={cat.title} className="skill-cat reveal">
                <div className="skill-cat-icon">{cat.icon}</div>
                <div className={`skill-cat-title ${cat.cls}`}>{cat.title}</div>
                {cat.bars.map(([label, pct, w]) => (
                  <div key={label as string} className="bar-wrap">
                    <div className="bar-label"><span>{label}</span><span>{pct}</span></div>
                    <div className="bar-track"><div className={`bar-fill ${cat.fill}`} style={{'--w':w} as React.CSSProperties}></div></div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certs */}
      <section id="certs">
        <div className="si">
          <div className="sec-label">Credentials</div>
          <h2 className="sec-title">CERTIFICATIONS<br/>& EDUCATION</h2>
          <div className="certs-grid">
            {[
              { icon:'☁️', title:'AWS Certified Solutions Architect', issuer:'Amazon Web Services' },
              { icon:'🌐', title:'CCNA — Cisco Certified Network Associate', issuer:'Cisco Systems' },
              { icon:'🔷', title:'Microsoft Azure Fundamentals (AZ-900)', issuer:'Microsoft' },
              { icon:'🎓', title:'B.Tech — Electronics & Communication', issuer:'BK Birla Institute · 8.6 CGPA · 2018–2022' },
              { icon:'⚙️', title:'DevOps Foundations', issuer:'Linux Foundation / Udemy' },
              { icon:'🐳', title:'Docker & Kubernetes Practitioner', issuer:'CNCF Ecosystem Training' },
            ].map(c => (
              <div key={c.title} className="cert-card reveal">
                <div className="cert-icon">{c.icon}</div>
                <div className="cert-title">{c.title}</div>
                <div className="cert-issuer">{c.issuer}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience">
        <div className="si">
          <div className="sec-label">Career</div>
          <h2 className="sec-title">WORK<br/>EXPERIENCE</h2>
          <div className="timeline">
            <div className="tl-item reveal">
              <div className="tl-dot"></div>
              <div className="tl-meta"><span className="tl-company">Airtel</span><span className="tl-period">Sep 2025 – Present</span><span className="tl-location">📍 Gurugram, India</span></div>
              <div className="tl-role">NOC Network Engineer</div>
              <ul className="tl-desc"><li>Designing complex MPLS networks for Airtel's B2B enterprise customers, primarily in the banking sector.</li><li>Optimized network design workflows, improving turnaround for similar network requirements.</li><li>Collaborating with cross-functional teams to deliver high-availability, low-latency enterprise connectivity.</li></ul>
              <div className="tech-tags"><span className="tt">MPLS</span><span className="tt">BGP</span><span className="tt">OSPF</span><span className="tt">B2B Enterprise</span><span className="tt">NOC</span></div>
            </div>
            <div className="tl-item reveal">
              <div className="tl-dot blue"></div>
              <div className="tl-meta"><span className="tl-company">Cloud & DevOps Projects</span><span className="tl-period">2022 – 2025</span><span className="tl-location">📍 Rajasthan, India</span></div>
              <div className="tl-role">Cloud & DevOps Engineer (Project-based)</div>
              <ul className="tl-desc"><li>Implemented and managed AWS infrastructure including EC2, S3, RDS, VPC, IAM, ELB, Auto Scaling, CloudWatch, CloudTrail, and SNS.</li><li>Built CI/CD pipelines using Jenkins and GitLab, reducing deployment times through automation.</li><li>Developed Terraform modules for infrastructure provisioning with state management.</li><li>Containerized applications using Docker; monitored with Prometheus, Grafana, and ELK Stack.</li></ul>
              <div className="tech-tags"><span className="tt g">AWS EC2</span><span className="tt g">S3</span><span className="tt g">RDS</span><span className="tt p">Jenkins</span><span className="tt p">Docker</span><span className="tt p">Terraform</span><span className="tt p">Kubernetes</span><span className="tt o">Prometheus</span><span className="tt o">Grafana</span></div>
            </div>
            <div className="tl-item reveal">
              <div className="tl-dot green-d"></div>
              <div className="tl-meta"><span className="tl-company">VLSI / ECE Domain</span><span className="tl-period">2018 – 2022</span><span className="tl-location">📍 Academic & Internships</span></div>
              <div className="tl-role">VLSI Design & Verification Engineer (Academic + Internship)</div>
              <ul className="tl-desc"><li>Designed digital circuits and RTL modules using Verilog and SystemVerilog during B.Tech coursework and internships.</li><li>Strong foundation in digital logic, signal processing, and electronic circuit design.</li></ul>
              <div className="tech-tags"><span className="tt g">Verilog</span><span className="tt g">SystemVerilog</span><span className="tt g">RTL Design</span><span className="tt g">Digital Logic</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects">
        <div className="si">
          <div className="sec-label">Portfolio</div>
          <h2 className="sec-title">KEY<br/>PROJECTS</h2>
          <div className="proj-grid">
            {[
              { n:'01', title:'Airtel MPLS Network Design — Banking', desc:'Designed and optimized complex MPLS network topologies for Airtel\'s B2B banking clients, ensuring high-availability and low-latency private connectivity across enterprise sites.', tags:[['MPLS',''],['BGP',''],['OSPF',''],['QoS','']] },
              { n:'02', title:'AWS Multi-Tier VPC Architecture', desc:'Built a production-ready multi-tier VPC with public/private subnets, NAT gateway, VPC peering, VPN connectivity to on-premises, and IAM fine-grained access policies.', tags:[['VPC','g'],['EC2','g'],['IAM','g'],['VPN','g']] },
              { n:'03', title:'Full CI/CD Pipeline with Security Gates', desc:'Built an end-to-end Jenkins pipeline integrating SonarQube, TRIVY container scanning, OWASP Dependency Check, and automated deployment to Kubernetes.', tags:[['Jenkins','p'],['Docker','p'],['Kubernetes','p'],['SonarQube','o'],['TRIVY','o']] },
              { n:'04', title:'Terraform IaC — AWS Infrastructure', desc:'Developed modular Terraform templates for complete AWS environment provisioning with remote state management on S3.', tags:[['Terraform','p'],['AWS','g'],['S3 Backend','g']] },
              { n:'05', title:'Auto-Scaling RDS High-Availability Setup', desc:'Deployed Amazon RDS MySQL with Multi-AZ standby, Read Replicas, and Auto Scaling Groups behind an Elastic Load Balancer, achieving 99.99% uptime SLA.', tags:[['RDS','g'],['Multi-AZ','g'],['ELB','g'],['Auto Scaling','g']] },
              { n:'06', title:'Observability Stack — Prometheus + Grafana + ELK', desc:'Set up a full observability platform using Prometheus for metrics scraping, Grafana dashboards for visualization, and ELK Stack for centralized log aggregation.', tags:[['Prometheus','o'],['Grafana','o'],['ELK','o'],['CloudWatch','g']] },
            ].map(p => (
              <div key={p.n} className="proj-card reveal">
                <div className="proj-num">{p.n}</div>
                <div className="proj-title">{p.title}</div>
                <div className="proj-desc">{p.desc}</div>
                <div className="tech-tags" style={{marginBottom:14}}>{p.tags.map(([t,c]) => <span key={t} className={`tt ${c}`}>{t}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Basketball */}
      <section id="basketball">
        <div className="si">
          <div className="sec-label">Off The Clock</div>
          <h2 className="sec-title">ON THE<br/>COURT</h2>
          <div className="bball-grid">
            <div className="bball-text">
              <p>Basketball is my parallel operating system. <strong>Reading the defense</strong> before a play is the same instinct as reading a network topology before a change window.</p>
              <p>Point guard mentality: <strong>see the full picture, control the tempo, elevate everyone around you</strong>. That's exactly how I approach engineering.</p>
              <p>In both basketball and engineering, <strong>the best players adapt in real time</strong>. You build the plan, then you adjust when reality hits differently.</p>
              <div className="bball-stats">
                <div className="bs"><div className="bs-num">PG</div><div className="bs-label">Position</div></div>
                <div className="bs"><div className="bs-num">10+</div><div className="bs-label">Yrs Playing</div></div>
                <div className="bs"><div className="bs-num">5v5</div><div className="bs-label">Format</div></div>
              </div>
            </div>
            <div className="bball-court-wrap reveal">
              <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" style={{width:'100%'}}>
                <rect width="400" height="400" fill="var(--card)" rx="4"/>
                <rect x="18" y="18" width="364" height="364" fill="none" stroke="rgba(255,107,26,.4)" strokeWidth="2"/>
                <circle cx="200" cy="200" r="60" fill="none" stroke="rgba(255,107,26,.28)" strokeWidth="1.5"/>
                <circle cx="200" cy="200" r="4" fill="var(--orange)"/>
                <line x1="18" y1="200" x2="382" y2="200" stroke="rgba(255,107,26,.22)" strokeWidth="1.5"/>
                <rect x="18" y="128" width="100" height="144" fill="none" stroke="rgba(0,212,255,.3)" strokeWidth="1.5"/>
                <rect x="282" y="128" width="100" height="144" fill="none" stroke="rgba(0,212,255,.3)" strokeWidth="1.5"/>
                <circle cx="42" cy="200" r="10" fill="none" stroke="var(--orange)" strokeWidth="2.5"/>
                <circle cx="358" cy="200" r="10" fill="none" stroke="var(--orange)" strokeWidth="2.5"/>
                <circle cx="200" cy="200" r="8" fill="var(--orange)" opacity=".85">
                  <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values=".85;.4;.85" dur="2s" repeatCount="indefinite"/>
                </circle>
                <text x="200" y="376" textAnchor="middle" fill="rgba(255,107,26,.35)" fontFamily="Bebas Neue" fontSize="13" letterSpacing="3">NAVEEN'S COURT</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact">
        <div className="si">
          <div className="sec-label">Let's Connect</div>
          <h2 className="sec-title">GET IN<br/>TOUCH</h2>
          <div className="contact-grid">
            <div className="contact-info">
              <p>Whether you're hiring for a Cloud or DevOps Engineer, want to discuss network architecture, or just want to run drills — reach out.</p>
              <div className="c-links">
                <a href="mailto:naveenmeel10@gmail.com" className="c-link"><span className="c-icon">✉</span>naveenmeel10@gmail.com</a>
                <a href="tel:+918769471595" className="c-link"><span className="c-icon">📱</span>+91 87694 71595</a>
                <a href="https://www.linkedin.com/in/naveenmeel" target="_blank" className="c-link"><span className="c-icon">in</span>linkedin.com/in/naveenmeel</a>
                <a href="https://github.com/naveenmeel" target="_blank" className="c-link"><span className="c-icon">⌥</span>GitHub — naveenmeel</a>
              </div>
            </div>
            <div className="c-form">
              <div className="f-group"><label className="f-label">Your Name</label><input id="cName" type="text" className="f-input" placeholder="Your name"/></div>
              <div className="f-group"><label className="f-label">Email</label><input type="email" className="f-input" placeholder="your@email.com"/></div>
              <div className="f-group"><label className="f-label">Subject</label><input type="text" className="f-input" placeholder="Cloud Engineer Role / Collaboration..."/></div>
              <div className="f-group"><label className="f-label">Message</label><textarea className="f-textarea" placeholder="Tell me about the opportunity..."/></div>
              <button className="btn-primary" onClick={handleSend} style={{alignSelf:'flex-start'}}>Send Message</button>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <section id="latest-posts">
        <div className="si">
          <div className="sec-label">Writing</div>
          <h2 className="sec-title">LATEST<br/>POSTS</h2>
          {latestPosts.length === 0 ? (
            <div className="posts-empty">
              <div style={{fontSize:'2.5rem',marginBottom:12}}>✍️</div>
              <p>No posts yet — <Link href="/blog" style={{color:'var(--orange)',textDecoration:'none'}}>visit the blog</Link> to get started.</p>
            </div>
          ) : (
            <div className="posts-grid">
              {latestPosts.map(post => {
                const color = catColor[post.category?.toLowerCase()] || '#FF6B1A';
                return (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="post-card-link">
                    <div className="post-card reveal">
                      <div className="post-emoji">{post.cover_emoji || '📝'}</div>
                      <span className="post-cat" style={{background:`${color}18`,color}}>{post.category}</span>
                      <div className="post-title">{post.title}</div>
                      {post.excerpt && <div className="post-excerpt">{post.excerpt.substring(0,100)}...</div>}
                      <div className="post-meta">{formatDate(post.created_at)}{post.read_time ? ` · ${post.read_time} min read` : ''}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
          <div className="view-all-wrap">
            <Link href="/blog" className="btn-outline">View All Posts →</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="f-copy">© 2025 <span>Naveen Meel</span> — Built with Next.js & Supabase</div>
        <button className="f-top" onClick={() => window.scrollTo({top:0,behavior:'smooth'})}>↑ Back to Top</button>
      </footer>
    </>
  );
}
