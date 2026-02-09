import React, { useState, useEffect } from 'react';
import { 
  Building2, Scale, Gavel, ArrowRight, Menu, X, HandCoins, ReceiptText, 
  ShieldAlert, MessageCircle, AlertCircle, CheckCircle2, Lock, Search, 
  Users2, Landmark, FileText, Instagram, Linkedin, MapPin, Clock, Mail, Phone, Briefcase 
} from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';

// --- CONFIGURAÇÃO DE IMAGENS CORRIGIDA ---
// Usando caminhos diretos da pasta public/images
const IMAGEM_ADVOGADO = "/images/advogado.png"; 
const IMG_ESCRITORIO_1 = "/images/escritorio1.PNG";
const IMG_ESCRITORIO_2 = "/images/escritorio2.PNG";
const IMG_ESCRITORIO_3 = "/images/escritorio3.PNG";

// Se as fotos dos colaboradores ainda não existirem, o sistema usará o placeholder automaticamente
const IMG_COLABORADOR_1 = "/images/colaborador1.png";
const IMG_COLABORADOR_2 = "/images/colaborador2.png";
const IMG_COLABORADOR_3 = "/images/colaborador3.png";

// --- Constantes e Funções ---
const LINK_WHATSAPP = "https://wa.me/555532176378";
const LINK_INSTAGRAM = "https://www.instagram.com/langcardosoadvocacia";
const LINK_MAPA = "https://goo.gl/maps/SeuLinkAqui"; 
const EMAIL_CONTATO = "contato@langcardoso.adv.br";

const dispararConversaoWhatsApp = () => {
  if (typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', 'conversion', {
      'send_to': 'AW-17926426473/xB7yCIDz6vIbEOme_uNC',
      'value': 1.0,
      'currency': 'BRL'
    });
  }
};

const TRANSICAO_SUAVE: [number, number, number, number] = [0.23, 1, 0.32, 1];

// --- Componentes de Interface ---

const Logotipo: React.FC<{ className?: string; reduzido?: boolean }> = ({ className = "", reduzido = false }) => (
  <motion.div whileHover={{ scale: 1.01 }} className={`relative flex flex-col items-center border border-black bg-white ${reduzido ? 'px-3 py-2' : 'px-8 md:px-10 py-10 md:py-12'} transition-all cursor-pointer ${className}`}>
    <span className={`${reduzido ? 'text-[9px]' : 'text-xl md:text-3xl'} font-bold text-black tracking-[0.2em] uppercase mb-1 font-sans text-center`}>Lang Cardoso</span>
    <div className="relative w-full h-[1px] bg-black mb-1">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-2 bg-black"></div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-2 bg-black"></div>
    </div>
    <span className={`${reduzido ? 'text-[7px]' : 'text-lg md:text-2xl'} font-bold text-black tracking-[0.4em] uppercase mb-0 font-sans text-center`}>Advocacia</span>
    {!reduzido && <span className="hidden md:block absolute bottom-2 right-3 text-[7px] text-black font-medium tracking-tighter opacity-40">OAB/RS 12.585</span>}
  </motion.div>
);

const BotaoCTA: React.FC<{ texto: string; className?: string }> = ({ texto, className = "" }) => (
  <a href={LINK_WHATSAPP} target="_blank" rel="noopener noreferrer" onClick={dispararConversaoWhatsApp} className={`inline-flex items-center gap-4 px-10 py-6 bg-black text-white font-bold uppercase text-[10px] tracking-[0.3em] transition-all hover:bg-gray-800 shadow-xl cursor-pointer ${className}`}>
    {texto} <ArrowRight size={16} />
  </a>
);

const CardInterativo: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const x = useMotionValue(0); const y = useMotionValue(0);
  const mXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rX = useTransform(mYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rY = useTransform(mXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);
  return (
    <motion.div style={{ rotateX: rX, rotateY: rY, transformStyle: "preserve-3d" }} onMouseMove={(e) => { const b = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - b.left) / b.width - 0.5); y.set((e.clientY - b.top) / b.height - 0.5); }} onMouseLeave={() => { x.set(0); y.set(0); }} className={`relative group bg-white border border-black/10 transition-all duration-500 overflow-hidden efeito-hover ${className}`}>
      <div style={{ transform: "translateZ(20px)" }} className="relative z-10 h-full w-full">{children}</div>
    </motion.div>
  );
};

const BarraNavegacao = () => {
  const [rolou, setRolou] = useState(false); const [menuAberto, setMenuAberto] = useState(false);
  const local = useLocation();
  useEffect(() => { const mon = () => setRolou(window.scrollY > 20); window.addEventListener('scroll', mon); return () => window.removeEventListener('scroll', mon); }, []);
  const links = [{ n: 'Início', c: '/' }, { n: 'Empresarial', c: '/assessoria-empresarial' }, { n: 'Criminal', c: '/defesa-criminal' }, { n: 'Equipe', c: '/equipe' }, { n: 'Estrutura', c: '/estrutura' }];
  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${rolou ? 'py-2 bg-white border-b border-black/5 shadow-sm' : 'py-4 md:py-6 bg-transparent'}`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link to="/"><Logotipo reduzido /></Link>
        <div className="hidden lg:flex items-center gap-10">
          <div className="flex items-center gap-6 xl:gap-8">
            {links.map((l) => (
              <Link key={l.c} to={l.c} className="group relative py-1">
                <span className={`text-[9px] xl:text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${local.pathname === l.c ? 'text-black' : 'text-black/40 hover:text-black'}`}>{l.n}</span>
                {local.pathname === l.c && <motion.div layoutId="sub" className="absolute bottom-0 left-0 w-full h-[1px] bg-black" />}
              </Link>
            ))}
          </div>
          <a href={LINK_WHATSAPP} onClick={dispararConversaoWhatsApp} className="px-6 py-3 bg-black text-white text-[9px] font-bold uppercase tracking-[0.3em] hover:bg-gray-800">Atendimento</a>
        </div>
        <button className="lg:hidden p-2 text-black" onClick={() => setMenuAberto(!menuAberto)}>{menuAberto ? <X size={24} /> : <Menu size={24} />}</button>
      </div>
      <AnimatePresence>{menuAberto && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-black/10 flex flex-col p-8 gap-6 shadow-xl">
          {links.map((l) => <Link key={l.c} to={l.c} onClick={() => setMenuAberto(false)} className={`text-[12px] font-bold uppercase tracking-[0.2em] py-2 ${local.pathname === l.c ? 'text-black' : 'text-black/40'}`}>{l.n}</Link>)}
        </motion.div>
      )}</AnimatePresence>
    </nav>
  );
};

// --- Páginas ---
const PaginaInicial = () => (
  <main className="bg-white">
    <section className="min-h-[85vh] md:min-h-screen flex flex-col justify-center bg-[#fcfcfc] border-b border-black/5">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: TRANSICAO_SUAVE }}>
          <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-black/30 mb-6 block">Excelência Jurídica em Santa Maria/RS</span>
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-serif text-black leading-[1.1] mb-10 tracking-tighter">Atuação <br /> <span className="italic text-gray-400">Consciente.</span></h1>
          <p className="text-lg md:text-2xl text-black/50 font-light leading-relaxed mb-12 max-w-3xl border-l border-black/10 pl-8">Proteção de ativos e defesa intransigente da liberdade individual e empresarial.</p>
          <BotaoCTA texto="Solicitar Consulta" />
        </motion.div>
      </div>
    </section>
    <section className="py-24 md:py-40 container mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-20 items-center">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-black/30 mb-8 block">Sobre o Escritório</span>
        <h2 className="text-4xl md:text-7xl font-serif mb-10 tracking-tighter texto-revelado">Tradição com <br /> Rigor Técnico.</h2>
        <p className="text-base md:text-xl text-black/60 font-light leading-relaxed mb-12">Priorizamos o atendimento personalizado para casos complexos que exigem atenção absoluta aos detalhes.</p>
      </div>
      <div className="relative">
        <img src={IMAGEM_ADVOGADO} alt="Foto Dr. Lang" className="w-full grayscale shadow-2xl border border-black/5" />
      </div>
    </section>
    <Rodape />
  </main>
);

const PaginaEquipe = () => {
  const colaboradores = [
    { n: "Dr. Matheus Lang", a: "Sócio Fundador", i: IMAGEM_ADVOGADO },
    { n: "Nicolas Brito", a: "Produtos Digitais e Modelos de Assinatura (SaaS)","Marketing Estratégico","Social Midia", i: IMG_COLABORADOR_1 },
    { n: "Consultoria", a: "Especialista Penal", i: IMG_COLABORADOR_2 },
  ];
  return (
    <main className="bg-white">
      <section className="py-32 container mx-auto px-6 md:px-12 text-center">
        <h1 className="text-5xl md:text-8xl font-serif text-black mb-10 tracking-tighter">Equipe Técnica.</h1>
        <div className="grid md:grid-cols-3 gap-10">
          {colaboradores.map((c, i) => (
            <CardInterativo key={i}>
              <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                <img src={c.i} alt={c.n} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all" onError={(e) => {(e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x600?text=Foto+Pendente'}} />
              </div>
              <div className="p-8 text-center bg-white">
                <h3 className="text-xl font-serif mb-2">{c.n}</h3>
                <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">{c.a}</span>
              </div>
            </CardInterativo>
          ))}
        </div>
      </section>
      <Rodape />
    </main>
  );
};

const PaginaEstrutura = () => {
  const fotos = [IMG_ESCRITORIO_1, IMG_ESCRITORIO_2, IMG_ESCRITORIO_3];
  return (
    <main className="bg-white">
      <section className="py-32 container mx-auto px-6 md:px-12">
        <h1 className="text-5xl md:text-8xl font-serif mb-10 tracking-tighter">O Escritório.</h1>
        <div className="grid gap-12">
          {fotos.map((f, i) => (
            <motion.div key={i} className="w-full border border-black/5 p-4 bg-white shadow-sm">
              <img src={f} alt="Ambiente" className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700" onError={(e) => {(e.target as HTMLImageElement).src = 'https://via.placeholder.com/1200x600?text=Foto+Pendente'}} />
            </motion.div>
          ))}
        </div>
      </section>
      <Rodape />
    </main>
  );
};

const Rodape = () => (
  <footer className="py-24 bg-white border-t border-black/5">
    <div className="container mx-auto px-6 md:px-12 text-center">
      <Logotipo className="scale-75 mb-16" />
      <div className="grid md:grid-cols-3 gap-12 py-16 border-y border-black/10 mb-12">
        <div><MapPin className="mx-auto mb-4" /><h5 className="text-[10px] font-bold uppercase tracking-widest">Localização</h5><p className="text-xs text-black/40">Santa Maria - RS</p></div>
        <div><MessageCircle className="mx-auto mb-4" /><h5 className="text-[10px] font-bold uppercase tracking-widest">WhatsApp</h5><p className="text-xs text-black/40">(55) 3217-6378</p></div>
        <div><Mail className="mx-auto mb-4" /><h5 className="text-[10px] font-bold uppercase tracking-widest">E-mail</h5><p className="text-xs text-black/40">{EMAIL_CONTATO}</p></div>
      </div>
      <p className="text-[9px] font-bold uppercase tracking-widest opacity-30">© 2025 Lang Cardoso Advocacia</p>
    </div>
  </footer>
);

export default function App() {
  return (
    <HashRouter>
      <BarraNavegacao />
      <Routes>
        <Route path="/" element={<PaginaInicial />} />
        <Route path="/equipe" element={<PaginaEquipe />} />
        <Route path="/estrutura" element={<PaginaEstrutura />} />
        <Route path="/assessoria-empresarial" element={<div className="pt-32 text-center">Página em Construção</div>} />
        <Route path="/defesa-criminal" element={<div className="pt-32 text-center">Página em Construção</div>} />
      </Routes>
    </HashRouter>
  );
}
