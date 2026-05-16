"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ═══════════════════════════════════════════════════════════════
   PORTAL CANVAS — Particulas que forman un portal dimensional
   ═══════════════════════════════════════════════════════════════ */
function PortalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let w = canvas.width = canvas.offsetWidth;
    let h = canvas.height = canvas.offsetHeight;

    const particles = [];
    const colors = ["#ff2d78", "#00e5ff", "#ffd700", "#ff2d78", "#00e5ff"];
    for (let i = 0; i < 120; i++) {
      particles.push({
        angle: Math.random() * Math.PI * 2,
        radius: 80 + Math.random() * 200,
        speed: 0.002 + Math.random() * 0.008,
        size: 1 + Math.random() * 2.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 0.2 + Math.random() * 0.6,
        orbitOffset: Math.random() * Math.PI * 2,
      });
    }

    const handleMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.addEventListener("mousemove", handleMouse);
    const resize = () => { w = canvas.width = canvas.offsetWidth; h = canvas.height = canvas.offsetHeight; };
    window.addEventListener("resize", resize);

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2, cy = h / 2;
      const mx = mouseRef.current.x || cx, my = mouseRef.current.y || cy;
      const time = Date.now() * 0.001;

      for (let r = 0; r < 3; r++) {
        const ringRadius = 100 + r * 60;
        const ringAlpha = 0.04 - r * 0.01;
        ctx.beginPath(); ctx.arc(cx, cy, ringRadius, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255,45,120," + ringAlpha + ")"; ctx.lineWidth = 1; ctx.stroke();
        ctx.beginPath(); ctx.arc(cx, cy, ringRadius + 20, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(0,229,255," + (ringAlpha * 0.7) + ")"; ctx.stroke();
      }

      for (const p of particles) {
        p.angle += p.speed;
        const wobble = Math.sin(time * 2 + p.orbitOffset) * 15;
        const r = p.radius + wobble;
        const x = cx + Math.cos(p.angle) * r;
        const y = cy + Math.sin(p.angle) * r;
        const dx = mx - x, dy = my - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const ax = dist < 200 ? x + dx * 0.02 : x;
        const ay = dist < 200 ? y + dy * 0.02 : y;
        const fa = p.alpha * (0.7 + Math.sin(time * 3 + p.orbitOffset) * 0.3);
        ctx.beginPath(); ctx.arc(ax, ay, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color; ctx.globalAlpha = fa; ctx.fill();
        ctx.beginPath(); ctx.arc(ax, ay, p.size * 3, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(ax, ay, 0, ax, ay, p.size * 3);
        grad.addColorStop(0, p.color); grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad; ctx.globalAlpha = fa * 0.3; ctx.fill();
      }
      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(animRef.current); canvas.removeEventListener("mousemove", handleMouse); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="portal-canvas" />;
}

/* ═══════════════════════════════════════════════════════════════
   CURSOR TRAIL
   ═══════════════════════════════════════════════════════════════ */
function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef(0);
  const pointsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const handleMouse = (e) => {
      const colors = ["#ff2d78", "#00e5ff", "#ffd700"];
      pointsRef.current.push({ x: e.clientX, y: e.clientY, age: 0, color: colors[Math.floor(Math.random() * colors.length)] });
      if (pointsRef.current.length > 50) pointsRef.current.shift();
    };
    const resize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("resize", resize);

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      pointsRef.current = pointsRef.current.filter(p => p.age < 30);
      for (const p of pointsRef.current) {
        p.age++;
        const alpha = 1 - p.age / 30;
        const size = 2 * (1 - p.age / 30);
        ctx.beginPath(); ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = p.color; ctx.globalAlpha = alpha * 0.6; ctx.fill();
      }
      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener("mousemove", handleMouse); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} id="cursor-trail" />;
}

/* ═══════════════════════════════════════════════════════════════
   POWER LEVEL
   ═══════════════════════════════════════════════════════════════ */
function PowerLevel() {
  const [power, setPower] = useState(0);
  const [label, setLabel] = useState("???");
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = Math.min(scrollTop / docHeight, 1);
      setPower(pct * 100);
      if (pct < 0.2) setLabel("Novato");
      else if (pct < 0.4) setLabel("Fan");
      else if (pct < 0.6) setLabel("Otaku");
      else if (pct < 0.8) setLabel("Weeb");
      else setLabel("Dios del anime");
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="power-level">
      <div className="power-bar"><div className="power-fill" style={{ width: power + "%" }} /></div>
      <span className="power-label">Nivel de otaku: <span>{label}</span></span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav className={"navbar " + (scrolled ? "scrolled" : "")}>
      <div className="nav-inner">
        <a href="#inicio" className="nav-brand">
          <span className="brand-icon">AK</span>
          <span className="brand-text">AKIRAMART</span>
        </a>
        <div className={"nav-links " + (menuOpen ? "open" : "")}>
          <a href="#mercado" onClick={() => setMenuOpen(false)}>Mercado</a>
          <a href="#colecciones" onClick={() => setMenuOpen(false)}>Arcos</a>
          <a href="#testimonios" onClick={() => setMenuOpen(false)}>Testimonios</a>
          <a href="#mision" className="nav-cta" onClick={() => setMenuOpen(false)}>Entrar al mercado</a>
        </div>
        <button className={"nav-toggle " + (menuOpen ? "open" : "")} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section className="hero" id="inicio">
      <PortalCanvas />
      <div className="scanlines" />
      <div className="hero-content">
        <p className="caption hero-caption">Tienda Oficial - Envio en 24h - +10.000 productos</p>
        <h1 className="display">
          <span className="line">El otro mundo</span>
          <span className="line accent">es este mundo</span>
        </h1>
        <p className="hero-desc">Figuras que cobran vida. Mangas que te transportan. Merch que te define. Todo lo que necesitas para vivir en el lado correcto de la realidad.</p>
        <div className="hero-cta">
          <a href="#mercado" className="cta-primary">
            <span>Entrar al mercado</span>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
          <a href="#colecciones" className="cta-secondary"><span>Ver colecciones</span></a>
        </div>
      </div>
      <PowerLevel />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PRODUCT DATA WITH REAL IMAGES
   ═══════════════════════════════════════════════════════════════ */
const PRODUCTOS = [
  { id: 1, anime: "Demon Slayer", nombre: "Tanjiro Kamado - Hashira Form", precio: "89.99", categoria: "figuras", badges: ["HOT","Quedan 3"], stock: 3, img: "https://m.media-amazon.com/images/I/7K3xYq0hHL._AC_SL1500_.jpg" },
  { id: 2, anime: "One Piece", nombre: "Monkey D. Luffy - Gear 5", precio: "129.99", categoria: "figuras", badges: ["HOT"], stock: 12, img: "https://m.media-amazon.com/images/I/61+O1k3LqSL._AC_SL1000_.jpg" },
  { id: 3, anime: "Jujutsu Kaisen", nombre: "Gojo Satoru - Six Eyes", precio: "149.99", categoria: "figuras", badges: ["NUEVO"], stock: 8, img: "https://m.media-amazon.com/images/I/61XH7ppn4ZL._AC_SL1000_.jpg" },
  { id: 4, anime: "Naruto", nombre: "Manga Box Set - Vol. 1-27", precio: "199.99", categoria: "mangas", badges: ["OFERTA"], stock: 5, img: "https://m.media-amazon.com/images/I/81YLm4k4jGL._AC_SL1500_.jpg" },
  { id: 5, anime: "Dragon Ball", nombre: "Goku Ultra Instinct - SH Figuarts", precio: "79.99", categoria: "figuras", badges: [], stock: 20, img: "https://m.media-amazon.com/images/I/61V+Kq0kLhL._AC_SL1000_.jpg" },
  { id: 6, anime: "Attack on Titan", nombre: "Survey Corps - Chaqueta Oficial", precio: "59.99", categoria: "merch", badges: ["HOT"], stock: 15, img: "https://m.media-amazon.com/images/I/61LQ3Kj6qVL._AC_SL1000_.jpg" },
  { id: 7, anime: "My Hero Academia", nombre: "Deku - Hero Costume Ver.", precio: "69.99", categoria: "figuras", badges: [], stock: 10, img: "https://m.media-amazon.com/images/I/61+1B+Mz4aL._AC_SL1000_.jpg" },
  { id: 8, anime: "Chainsaw Man", nombre: "Denji - Chainsaw Form", precio: "99.99", categoria: "figuras", badges: ["NUEVO","Quedan 2"], stock: 2, img: "https://m.media-amazon.com/images/I/71d+K1X-KLL._AC_SL1500_.jpg" },
  { id: 9, anime: "One Piece", nombre: "Manga Box Set - Vol. 1-36", precio: "299.99", categoria: "mangas", badges: ["OFERTA"], stock: 3, img: "https://m.media-amazon.com/images/I/81YLm4k4jGL._AC_SL1500_.jpg" },
  { id: 10, anime: "Studio Ghibli", nombre: "Totoro - Peluche Premium 40cm", precio: "34.99", categoria: "merch", badges: [], stock: 25, img: "https://m.media-amazon.com/images/I/71IyK8KQjIL._AC_SL1500_.jpg" },
  { id: 11, anime: "Spy x Family", nombre: "Anya Forger - Nendoroid", precio: "49.99", categoria: "figuras", badges: ["HOT"], stock: 18, img: "https://m.media-amazon.com/images/I/61+0B+Kz4aL._AC_SL1000_.jpg" },
  { id: 12, anime: "Demon Slayer", nombre: "Nezuko - Demon Form Ver.", precio: "109.99", categoria: "figuras", badges: ["NUEVO"], stock: 7, img: "https://m.media-amazon.com/images/I/71d+K1X-KLL._AC_SL1500_.jpg" },
];

/* ═══════════════════════════════════════════════════════════════
   MERCADO
   ═══════════════════════════════════════════════════════════════ */
function Mercado() {
  const [filtro, setFiltro] = useState("todos");
  const [addedIds, setAddedIds] = useState(new Set());

  const filtered = filtro === "todos" ? PRODUCTOS : PRODUCTOS.filter(p => p.categoria === filtro || (filtro === "ofertas" && p.badges.includes("OFERTA")));

  const handleAdd = (id) => {
    setAddedIds(prev => new Set(prev).add(id));
    setTimeout(() => { setAddedIds(prev => { const n = new Set(prev); n.delete(id); return n; }); }, 2000);
  };

  return (
    <section className="mercado" id="mercado">
      <div className="section-header scroll-reveal">
        <p className="caption">Capitulo 2 - El Mercado</p>
        <h2 className="heading">Cada puesto,<br />un mundo diferente</h2>
        <p className="section-desc">Figuras que cobran vida. Mangas que te transportan. Merch que te define.</p>
      </div>

      <div className="filtros">
        {[
          { key: "todos", icon: "*", label: "Todos" },
          { key: "figuras", icon: "F", label: "Figuras" },
          { key: "mangas", icon: "M", label: "Mangas" },
          { key: "merch", icon: "m", label: "Merch" },
          { key: "ofertas", icon: "!", label: "Ofertas", badge: 12 },
        ].map(f => (
          <button key={f.key} className={"filtro " + (filtro === f.key ? "active" : "")} onClick={() => setFiltro(f.key)}>
            <span className="filtro-icon">{f.icon}</span>
            <span>{f.label}</span>
            {"badge" in f && f.badge && <span className="filtro-badge">{f.badge}</span>}
          </button>
        ))}
      </div>

      <div className="productos-grid">
        {filtered.map(producto => (
          <article key={producto.id} className="producto">
            <div className="producto-visual">
              <Image src={producto.img} alt={producto.nombre} fill style={{ objectFit: "cover" }} className="producto-img" />
              <div className="producto-overlay" />
              {producto.badges.length > 0 && (
                <div className="producto-badges">
                  {producto.badges.map(b => (
                    <span key={b} className={"badge " + (b.startsWith("Quedan") ? "stock-low" : b === "HOT" ? "hot" : "")}>{b}</span>
                  ))}
                </div>
              )}
            </div>
            <div className="producto-info">
              <span className="producto-anime">{producto.anime}</span>
              <h3 className="producto-nombre">{producto.nombre}</h3>
              <div className="producto-meta">
                <span className="price">{producto.precio} EUR</span>
                <span className={"stock " + (producto.stock <= 3 ? "low" : "")}>Stock: {producto.stock} uds</span>
              </div>
              <button className={"producto-cta " + (addedIds.has(producto.id) ? "added" : "")} onClick={() => handleAdd(producto.id)}>
                {addedIds.has(producto.id) ? "Anadido!" : "Anadir al carrito"}
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   COLECCIONES
   ═══════════════════════════════════════════════════════════════ */
const ARCOS = [
  { key: "shonen", tipo: "Arco de Poder", nombre: "Shonen", desc: "One Piece - Naruto - Dragon Ball - Jujutsu Kaisen", count: "2.847", img: "https://m.media-amazon.com/images/I/81YLm4k4jGL._AC_SL1500_.jpg" },
  { key: "seinen", tipo: "Arco de Oscuridad", nombre: "Seinen", desc: "Berserk - Tokyo Ghoul - Vinland Saga - Monster", count: "1.203", img: "https://m.media-amazon.com/images/I/71d+K1X-KLL._AC_SL1500_.jpg" },
  { key: "ghibli", tipo: "Arco de Nostalgia", nombre: "Studio Ghibli", desc: "Totoro - Chihiro - Howl - Mononoke", count: "856", img: "https://m.media-amazon.com/images/I/71IyK8KQjIL._AC_SL1500_.jpg" },
  { key: "isekai", tipo: "Arco de Portal", nombre: "Isekai", desc: "Re:Zero - Shield Hero - Overlord - Konosuba", count: "1.564", img: "https://m.media-amazon.com/images/I/61+0B+Kz4aL._AC_SL1000_.jpg" },
];

function Colecciones() {
  return (
    <section className="colecciones" id="colecciones">
      <div className="section-header scroll-reveal">
        <p className="caption">Capitulo 3 - Los Arcos</p>
        <h2 className="heading">Elige tu mision</h2>
        <p className="section-desc">Cada coleccion es un arco argumental. Cual es el tuyo?</p>
      </div>
      <div className="arcos-grid">
        {ARCOS.map(arco => (
          <a href="#" key={arco.key} className="arco">
            <div className="arco-visual">
              <Image src={arco.img} alt={arco.nombre} fill style={{ objectFit: "cover" }} className="arco-img" />
              <div className="arco-overlay" />
            </div>
            <div className="arco-info">
              <span className="arco-tipo">{arco.tipo}</span>
              <h3 className="arco-nombre">{arco.nombre}</h3>
              <p className="arco-desc">{arco.desc}</p>
              <span className="arco-count">{arco.count} productos</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TESTIMONIOS
   ═══════════════════════════════════════════════════════════════ */
const TESTIMONIOS = [
  { avatar: "AK", nombre: "Akira_Tanaka", nivel: 8.7, rating: 5, texto: "Compre el figure de Tanjiro y ahora mi escritorio tiene mas personalidad que yo. Mi madre pregunto si estaba bien. Le dije que si. No lo estoy.", producto: "Figura Tanjiro Kamado - Hashira Form", precio: "89.99", hue: 320 },
  { avatar: "YM", nombre: "Yuki_Moon", nivel: 9.2, rating: 5, texto: "Pedi el box set de Naruto y llego en 24h. La caja estaba perfecta. Llore un poco. No me arrepiento.", producto: "Manga Box Set Naruto Vol. 1-27", precio: "199.99", hue: 180 },
  { avatar: "KR", nombre: "Kai_Ryu", nivel: 7.5, rating: 4, texto: "La chaqueta de Survey Corps es LEGIT. La llevo a la oficina y mis companeros no entienden. No necesitan entender.", producto: "Chaqueta Survey Corps - Oficial", precio: "59.99", hue: 260 },
  { avatar: "SN", nombre: "Sora_Nakamura", nivel: 9.8, rating: 5, texto: "Mi coleccion de figuras ya supera los 200. Mi pareja dice que tengo un problema. Tiene razon. No me importa.", producto: "Gojo Satoru - Six Eyes", precio: "149.99", hue: 40 },
];

function Testimonios() {
  return (
    <section className="testimonios" id="testimonios">
      <div className="section-header scroll-reveal">
        <p className="caption">Capitulo 4 - Los Testimonios</p>
        <h2 className="heading">Confesiones<br />de otakus</h2>
      </div>
      <div className="testimonios-grid">
        {TESTIMONIOS.map((t, i) => (
          <article key={i} className="testimonio scroll-reveal" style={{ "--delay": (i * 0.15) + "s" }}>
            <div className="testimonio-header">
              <div className="avatar" style={{ "--hue": t.hue }}>{t.avatar}</div>
              <div className="autor-info">
                <span className="autor-nombre">{t.nombre}</span>
                <span className="autor-nivel">Nivel de otaku: {t.nivel}</span>
              </div>
              <div className="rating">{"*".repeat(t.rating)}{"-".repeat(5 - t.rating)}</div>
            </div>
            <blockquote className="testimonio-texto">&ldquo;{t.texto}&rdquo;</blockquote>
            <div className="testimonio-producto">
              <span className="producto-ref">{t.producto}</span>
              <span className="producto-precio">{t.precio} EUR</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CTA FINAL
   ═══════════════════════════════════════════════════════════════ */
function CTAFinal() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

  return (
    <section className="cta-final" id="mision">
      <div className="cta-final-content scroll-reveal">
        <p className="caption">Capitulo 5 - La Mision</p>
        <h2 className="heading">Cual es tu mision?</h2>
        <p className="cta-final-desc">Dinos que buscas y te encontramos el producto perfecto. Como un sensei encuentra al alumno correcto.</p>

        {submitted ? (
          <div className="mision-success">
            <div className="mision-success-icon">M</div>
            <h3 className="mision-success-title">Mision aceptada!</h3>
            <p className="mision-success-text">Te contactaremos con los mejores productos para tu arco argumental. Preparate, otaku.</p>
          </div>
        ) : (
          <form className="cta-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Que tipo de producto buscas?</label>
              <div className="form-options">
                {[{ value: "figura", icon: "F", label: "Figuras" }, { value: "manga", icon: "M", label: "Mangas" }, { value: "merch", icon: "m", label: "Merch" }, { value: "ropa", icon: "R", label: "Ropa" }].map(opt => (
                  <button key={opt.value} type="button" className={"option " + (selectedOption === opt.value ? "selected" : "")} onClick={() => setSelectedOption(opt.value)}>
                    <span className="option-icon">{opt.icon}</span><span>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Cual es tu anime favorito?</label>
              <input type="text" className="form-input" placeholder="Ej: One Piece, Demon Slayer, Naruto..." />
            </div>
            <div className="form-group">
              <label className="form-label">Tu email</label>
              <input type="email" className="form-input" placeholder="tu@email.com" required />
            </div>
            <button type="submit" className="cta-primary" style={{ width: "100%", justifyContent: "center" }}>
              <span>Encontrar mi producto</span>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <span className="brand-name">AKIRAMART</span>
          <span className="brand-tagline">El otro mundo es este mundo</span>
        </div>
        <div className="footer-links">
          <div className="link-group">
            <h4>Mercado</h4>
            <a href="#">Figuras</a><a href="#">Mangas</a><a href="#">Merch</a><a href="#">Ropa</a>
          </div>
          <div className="link-group">
            <h4>Arcos</h4>
            <a href="#">Shonen</a><a href="#">Seinen</a><a href="#">Ghibli</a><a href="#">Isekai</a>
          </div>
          <div className="link-group">
            <h4>Info</h4>
            <a href="#">Sobre nosotros</a><a href="#">Envios</a><a href="#">Devoluciones</a><a href="#">Contacto</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="copyright">2026 AKIRAMART - Hecho con amor en Akihabara</p>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCROLL REVEAL
   ═══════════════════════════════════════════════════════════════ */
function ScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add("visible"); }); },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    const els = document.querySelectorAll(".scroll-reveal");
    els.forEach(el => observer.observe(el));
    setTimeout(() => { els.forEach(el => { if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("visible"); }); }, 100);
    return () => observer.disconnect();
  }, []);
  return null;
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <>
      <CursorTrail />
      <ScrollReveal />
      <Navbar />
      <Hero />
      <Mercado />
      <Colecciones />
      <Testimonios />
      <CTAFinal />
      <Footer />
    </>
  );
}
