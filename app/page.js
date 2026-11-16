'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'https://dummyjson.com';
const LOGIN_PATH = process.env.NEXT_PUBLIC_LOGIN_PATH || '/user/login';

const UMUR = '21';

const COUNT = ['3', '2', '1', 'Start!'];

const STORY = 'Aku mulai dari elektro medis, lalu pindah haluan ke Sistem Informasi karena ketemu hal yang bikin aku betah berjam-jam: ngoding sesuatu yang bisa langsung dilihat dan dipakai orang. Targetku dekat: front-end developer. Targetku jauh: software engineer yang paham banyak sisi.';

const STOPS = [
  ['Km 1', 'Elektro Medis, UMY', 'Kuliah pertamaku di Universitas Muhammadiyah Yogyakarta. Di sini aku belajar disiplin teknis, sebelum sadar arahku ada di software.'],
  ['Km 2', 'Pindah ke Sistem Informasi, UT', 'Ganti jalur ke Universitas Terbuka. Sekarang semester 3 dan belajar PHP, Java, Vue.js, dan R lewat tugas kuliah.'],
  ['Km 3', 'Sertifikat Data Analyst', 'Dari LAZ Percikan Iman Sedekahku. Belajar merapikan data lalu membuatnya jadi dashboard di Google Looker Studio.'],
  ['Km 4', 'Bangun proyek sendiri', 'Latihan membuat sistem kasir toko dengan PHP dan MySQL untuk portofolio, termasuk CRUD produk.'],
  ['Km 5', 'Cretivox Endurance Test', 'Halaman yang lagi kamu baca ini. Brief padat, deadline ketat, dan aku mau buktikan bisa diandalkan.'],
];

const PROJECTS = [
  ['Sistem Kasir Toko', 'PHP native + MySQL.', 'Aplikasi kasir latihan dengan CRUD produk (tambah, lihat, ubah, hapus) dan database kasir_db. Berikutnya: halaman login.'],
  ['Aplikasi Pemesanan Bahan Ajar', 'Vue.js.', 'Meniru alur pemesanan bahan ajar SITTA UT: daftar bahan ajar, stok, tracking pengiriman DO, dan form order, dibangun dari komponen terpisah.'],
  ['Dashboard Data', 'Google Looker Studio.', 'Dari data mentah yang dirapikan sampai dashboard yang bisa dibaca orang non-teknis. Dibuat saat pelatihan data analyst.'],
  ['Manajemen Restoran', 'Java (PBO).', 'Program menu dan pesanan restoran dengan kelas turunan, diskon, exception handling, dan penyimpanan ke file.'],
];

const CHIPS = [
  ['HTML & CSS', 'front'], ['JavaScript', 'front'], ['Vue.js', 'front'], ['GSAP', 'front'],
  ['PHP', 'back'], ['MySQL', 'back'], ['Java', 'back'], ['R', 'data'], ['Looker Studio', 'data'],
];

const ROUTES = [['all', 'Semua'], ['front', 'Front-end'], ['back', 'Back-end'], ['data', 'Data']];

const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function Item({ title, lead, text }) {
  const [open, setOpen] = useState(false);
  const panel = useRef(null);
  useEffect(() => {
    gsap.to(panel.current, {
      height: open ? 'auto' : 0,
      duration: reducedMotion() ? 0 : 0.45,
      ease: 'power3.out',
      onComplete: () => ScrollTrigger.refresh(),
    });
  }, [open]);
  return (
    <div className={'item' + (open ? ' open' : '')}>
      <button aria-expanded={open} onClick={() => setOpen(!open)}>
        <span>{title}</span><span className="plus" aria-hidden="true">+</span>
      </button>
      <div className="panel" ref={panel}><div><b>{lead}</b> {text}</div></div>
    </div>
  );
}

function Site({ intro }) {
  const root = useRef(null);
  const kmRef = useRef(null);
  const progRef = useRef(null);
  const [route, setRoute] = useState('all');

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduce = reducedMotion();
    const cleanups = [];
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 0, end: 'max',
        onUpdate: (s) => {
          kmRef.current.textContent = (s.progress * 42.195).toFixed(1) + ' km';
          progRef.current.style.transform = 'scaleX(' + s.progress + ')';
        },
      });
      if (reduce) return;

      const chars = gsap.utils.toArray('.ch');
      gsap.from(chars, { yPercent: 110, rotate: 6, duration: 1.1, ease: 'expo.out', stagger: 0.07, delay: intro ? 0.9 : 0.2 });

      const hero = document.querySelector('.hero');
      const onMove = (e) => {
        chars.forEach((c) => {
          const r = c.getBoundingClientRect();
          const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
          gsap.to(c, { y: -Math.max(0, 1 - d / 320) * 60, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
        });
      };
      const onLeave = () => gsap.to(chars, { y: 0, duration: 0.6, ease: 'power3.out' });
      hero.addEventListener('mousemove', onMove);
      hero.addEventListener('mouseleave', onLeave);
      cleanups.push(() => { hero.removeEventListener('mousemove', onMove); hero.removeEventListener('mouseleave', onLeave); });

      gsap.to('.w', { opacity: 1, stagger: 0.1, ease: 'none',
        scrollTrigger: { trigger: '#about', start: 'top 75%', end: 'bottom 60%', scrub: true } });

      const rail = document.getElementById('rail');
      gsap.to(rail, { x: () => -(rail.scrollWidth - window.innerWidth), ease: 'none',
        scrollTrigger: { trigger: '#journey', pin: true, scrub: 1, invalidateOnRefresh: true,
          end: () => '+=' + (rail.scrollWidth - window.innerWidth) } });
      gsap.from('.stop', { rotate: 3, scale: 0.94, stagger: 0.15, ease: 'none',
        scrollTrigger: { trigger: '#journey', scrub: 1, start: 'top 80%', end: 'top top' } });

      gsap.from('#finish', { yPercent: 40, opacity: 0, duration: 1.2, ease: 'expo.out',
        scrollTrigger: { trigger: '#finish', start: 'top 90%' } });

      const dot = document.getElementById('dot');
      const mx = gsap.quickTo(dot, 'x', { duration: 0.25, ease: 'power3' });
      const my = gsap.quickTo(dot, 'y', { duration: 0.25, ease: 'power3' });
      const follow = (e) => { mx(e.clientX); my(e.clientY); };
      window.addEventListener('mousemove', follow);
      cleanups.push(() => window.removeEventListener('mousemove', follow));
      document.querySelectorAll('a,button,.chip').forEach((el) => {
        el.addEventListener('mouseenter', () => gsap.to(dot, { scale: 3, duration: 0.25 }));
        el.addEventListener('mouseleave', () => gsap.to(dot, { scale: 1, duration: 0.25 }));
      });
    }, root);
    return () => { cleanups.forEach((f) => f()); ctx.revert(); };
  }, []);

  useEffect(() => {
    gsap.to('.chip', {
      opacity: (i, el) => (route === 'all' || el.dataset.t === route ? 1 : 0.2),
      y: (i, el) => (route !== 'all' && el.dataset.t === route ? -6 : 0),
      duration: reducedMotion() ? 0 : 0.35,
    });
  }, [route]);

  return (
    <main ref={root}>
      <div className="track"><i ref={progRef} style={{ transform: 'scaleX(0)' }} /></div>
      <div className="bar"><span>Lioniel Salomon Siregar</span><b ref={kmRef}>0.0 km</b></div>
      <div className="dot" id="dot" />

      <header className="hero wrap">
        <h1 aria-label="LIONIL">
          <span className="m" aria-hidden="true">
            {'Lioniel'.split('').map((c, i) => <span className="ch" key={i}>{c}</span>)}
          </span>
        </h1>
        <p>
          <b>Lioniel Salomon Siregar{UMUR ? ', ' + UMUR + ' tahun' : ''}.</b> Mahasiswa Sistem Informasi semester 3, Universitas Terbuka. Lagi lari menuju posisi Front-end Developer Intern.
        </p>
        <p className="hint">Scroll buat ikut lari. Jaraknya di pojok kanan atas, finish di 42,2 km.</p>
      </header>

      <section className="about wrap" id="about">
        <p>{STORY.split(' ').map((w, i) => <span className="w" key={i}>{w}</span>)}</p>
      </section>

      <section className="journey" id="journey" aria-label="Perjalanan">
        <div className="rail" id="rail">
          <div className="lead"><h2>Rute yang sudah kulewati</h2><span>Geser dengan scroll.</span></div>
          {STOPS.map(([km, h, p]) => (
            <article className="stop" key={km}><em>{km}</em><div><h3>{h}</h3><p>{p}</p></div></article>
          ))}
        </div>
      </section>

      <section className="work wrap">
        <h2>Yang pernah kubuat</h2>
        {PROJECTS.map(([t, l, x]) => <Item key={t} title={t} lead={l} text={x} />)}
      </section>

      <section className="stack wrap">
        <h2>Perlengkapan lari</h2>
        <div className="routes" role="group" aria-label="Pilih rute">
          {ROUTES.map(([r, label]) => (
            <button key={r} aria-pressed={route === r} onClick={() => setRoute(r)}>{label}</button>
          ))}
        </div>
        <div className="chips">
          {CHIPS.map(([t, g]) => <span className="chip" data-t={g} key={t}>{t}</span>)}
        </div>
      </section>

      <section className="join wrap">
        <div className="grid links-only">
          <div className="links">
            <a href="https://github.com/lionilsalomon414-commits" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/lionil-salomon-siregar-54897a320" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
        <div className="finish" id="finish">Dream on.</div>
        <footer>Lioniel Salomon Siregar · Cretivox Internship Experience Season II Batch 6</footer>
      </section>
    </main>
  );
}

function Gate({ stage, setStage }) {
  const ref = useRef(null);
  const kmEl = useRef(null);
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);
  const [bib, setBib] = useState(0);
  const [name, setName] = useState('');
  const [n, setN] = useState(0);

  useEffect(() => {
    const reduce = reducedMotion();
    if (stage === 'login') {
      const ctx = gsap.context(() => {
        if (!reduce) gsap.from('.gbox > *', { y: 24, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out' });
      }, ref);
      return () => ctx.revert();
    }
    if (stage === 'bib') {
      const ctx = gsap.context(() => {
        if (!reduce) gsap.fromTo('.bibc', { y: -180, rotate: -10, opacity: 0 }, { y: 0, rotate: -2, opacity: 1, duration: 1, ease: 'elastic.out(1,0.6)' });
      }, ref);
      const t = setTimeout(() => setStage('count'), reduce ? 700 : 2000);
      return () => { clearTimeout(t); ctx.revert(); };
    }
    if (stage === 'count') {
      const ctx = gsap.context(() => {
        if (!reduce) gsap.fromTo('.cd', { scale: 1.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'power3.out' });
      }, ref);
      const t = setTimeout(() => { if (n < COUNT.length - 1) setN(n + 1); else setStage('run'); }, reduce ? 300 : 800);
      return () => { clearTimeout(t); ctx.revert(); };
    }
    if (stage === 'run') {
      const o = { v: 0 };
      const tw = gsap.to(o, {
        v: 42.2, duration: reduce ? 0.3 : 3.6, ease: 'power1.inOut',
        onUpdate: () => { if (kmEl.current) kmEl.current.textContent = o.v.toFixed(1).replace('.', ',') + ' km'; },
        onComplete: () => setStage('reveal'),
      });
      return () => tw.kill();
    }
    if (stage === 'reveal') {
      const tw = gsap.to(ref.current, {
        yPercent: -100, duration: reduce ? 0 : 0.9, delay: 0.2, ease: 'power3.inOut',
        onComplete: () => setStage('site'),
      });
      return () => tw.kill();
    }
  }, [stage, n]);

  async function onLogin(e) {
    e.preventDefault();
    if (busy) return;
    const username = u.trim();
    if (!username || !p) return setMsg('Nomor dada ga bisa diambil kalau formnya kosong.');
    setBusy(true);
    setMsg('Ngecek daftar peserta...');
    try {
      const res = await fetch(API_BASE + LOGIN_PATH, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password: p }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMsg(res.status === 400
          ? 'Kamu ga ada di daftar peserta. Cek lagi username dan password-nya.'
          : 'Panitia lagi sibuk. Coba lagi bentar.');
        return;
      }
      try { sessionStorage.setItem('token', data.accessToken || data.token || data.access_token || 'ok'); } catch (_) {}
      setName(data.firstName || username);
      setBib(Math.floor(1000 + Math.random() * 9000));
      setMsg('');
      setStage('bib');
    } catch (err) {
      setMsg('Panitia ga jawab. Coba lagi bentar.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="gate" ref={ref} aria-label="Pengambilan nomor dada">
      {stage === 'login' && (
        <div className="gbox">
          <h2>Pengambilan nomor dada</h2>
          <p className="gm">Login dulu sebelum lewat garis start.</p>
          <form onSubmit={onLogin} noValidate>
            <label>Username<input type="text" value={u} onChange={(e) => setU(e.target.value)} autoComplete="username" /></label>
            <label>Password<input type="password" value={p} onChange={(e) => setP(e.target.value)} autoComplete="current-password" /></label>
            <p className="msg" role="status">{msg}</p>
            <div className="gtools">
              <button className="ghost" type="button" onClick={() => { setU('emilys'); setP('emilyspass'); setMsg(''); }}>Isi otomatis</button>
              <button className="go" type="submit">Masuk</button>
            </div>
          </form>
          <p className="gm">Pengunjung: username emilys, password emilyspass</p>
        </div>
      )}
      {stage === 'bib' && (
        <div className="gbox">
          <p className="gm">Terdaftar! Ini nomor dadamu.</p>
          <div className="bibc"><small>PESERTA</small><strong>#{bib}</strong><span>{name} · Cretivox Run, 42,2 km</span></div>
        </div>
      )}
      {stage === 'count' && (
        <div className="gbox">
          <p className="gm">Siap-siap di garis start</p>
          <div className="cd" aria-live="polite">{COUNT[n]}</div>
        </div>
      )}
      {(stage === 'run' || stage === 'reveal') && (
        <div className="gbox">
          <b className="gkm" ref={kmEl}>0,0 km</b>
          <p className="gm">Lari dulu, halamannya nunggu di finish.</p>
          <div className="road" aria-hidden="true">
            <svg className="runner" width="44" height="76" viewBox="0 0 44 76">
              <circle cx="22" cy="10" r="7" style={{ fill: 'var(--sky)' }} />
              <rect x="14" y="19" width="16" height="22" rx="3" style={{ fill: 'var(--dust)' }} />
              <g className="lg"><line x1="22" y1="40" x2="22" y2="68" strokeWidth="5" strokeLinecap="round" style={{ stroke: 'var(--sky)' }} /></g>
              <g className="lg lg2"><line x1="22" y1="40" x2="22" y2="68" strokeWidth="5" strokeLinecap="round" style={{ stroke: 'var(--mist)' }} /></g>
            </svg>
          </div>
        </div>
      )}
    </section>
  );
}

export default function Home() {
  const [stage, setStage] = useState('login');
  useEffect(() => {
    try { if (sessionStorage.getItem('token')) setStage('site'); } catch (_) {}
  }, []);
  const inSite = stage === 'reveal' || stage === 'site';
  return (
    <>
      {inSite && <Site intro={stage === 'reveal'} />}
      {stage !== 'site' && <Gate stage={stage} setStage={setStage} />}
    </>
  );
}