import React, { useState, useEffect } from 'react';
import { 
  Building2, Scale, ArrowRight, Menu, X, ReceiptText, 
  ShieldAlert, MessageCircle, AlertCircle, Landmark, 
  FileText, Instagram, Linkedin, MapPin, Mail, Lock, Search, Clock
} from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';

// --- CONFIGURAÇÃO DE IMAGENS ---
const IMAGEM_MATHEUS = "/images/advogado.png"; 
const IMG_NICOLAS = "/images/colaborador1.png";
const IMG_JEFFERSON = "/images/colaborador2.png";
const IMG_ESCRITORIO_1 = "/images/escritorio1.PNG";
const IMG_ESCRITORIO_2 = "/images/escritorio2.PNG";
const IMG_ESCRITORIO_3 = "/images/escritorio3.PNG";

const LINK_WHATSAPP = "https://wa.me/555532176378";
const EMAIL_CONTATO = "contato@langcardoso.adv.br";
const LINK_INSTAGRAM = "https://www.instagram.com/langcardosoadvocacia";
const LINK_MAPA = "https://www.google.com/maps/search/?api=1&query=Alameda+Montevideo,+322,+Sala+108,+Santa+Maria+-+RS";

const TRANSICAO_SUAVE: [number, number, number, number] = [0.23, 1, 0.32, 1];

// --- Declaração Global para o Gtag ---
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

// --- Função de Conversão ---
const dispararConversaoWhatsApp = () => {
  if (typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', 'conversion', { 'send_to': 'AW-17926426473/xB7yCIDz6vIbEOme_uNC', 'value': 1.0, 'currency': 'BRL' });
  }
};

// --- COMPONENTES BASE ---

const Logotipo: React.FC<{ reduzido?: boolean; className?: string }> = ({ reduzido = false, className = "" }) => (
  <div className={`flex flex-col items-center border border-black bg-white ${reduzido ? 'px-3 py-2' : 'px-8 py-10'} ${className}`}>
    <span className={`${reduzido ? 'text-[9px]' : 'text-2xl'} font-bold tracking-[0.2em] uppercase`}>Lang Cardoso</span>
    <div className="w-full h-[1px] bg-black my-1"></div>
    <span className={`${reduzido ? 'text-[7px]' : 'text-xl'} font-bold tracking-[0.4em] uppercase`}>Advocacia</span>
    {!reduzido && <span className="hidden md:block absolute bottom-2 right-3 text-[7px] text-black font-medium tracking-tighter opacity-40">OAB/RS 12.585</span>}
  </div>
);

const BotaoCTA: React.FC<{ texto: string }> = ({ texto }) => (
  <a href={LINK_WHATSAPP} target="_blank" rel="noopener noreferrer" onClick={dispararConversaoWhatsApp} className="inline-flex items-center gap-4 px-10 py-6 bg-black text-white font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-gray-800 transition-all cursor-pointer shadow-xl">
    {texto} <ArrowRight size={16} />
  </a>
);

const CardInterativo: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const x = useMotionValue(0); const y = useMotionValue(0);
  const rx = useTransform(useSpring(y, { stiffness: 300, damping: 30 }), [-0.5, 0.5], ["8deg", "-8deg"]);
  const ry = useTransform(useSpring(x, { stiffness: 300, damping: 30 }), [-0.5, 0.5], ["-8deg", "8deg"]);
  return (
    <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }} onMouseMove={(e) => { const b = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - b.left) / b.width - 0.5); y.set((e.clientY - b.top) / b.height - 0.5); }} onMouseLeave={() => { x.set(0); y.set(0); }} className={`bg-white border border-black/10 transition-all overflow-hidden ${className}`}>
      {children}
    </motion.div>
  );
};

const BarraNavegacao = () => {
  const [rolou, setRolou] = useState(false); const [menu, setMenu] = useState(false);
  const local = useLocation();
  useEffect(() => { const mon = () => setRolou(window.scrollY > 20); window.addEventListener('scroll', mon); return () => window.removeEventListener('scroll', mon); }, []);
  const links = [
    { nome: 'Início', caminho: '/' },
    { nome: 'Empresarial & Cível', caminho: '/assessoria-empresarial' },
    { nome: 'Criminal', caminho: '/defesa-criminal' },
    { nome: 'Equipe', caminho: '/equipe' },
    { nome: 'Estrutura', caminho: '/estrutura' }
  ];
  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${rolou ? 'py-2 bg-white border-b border-black/5' : 'py-6 bg-transparent'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/"><Logotipo reduzido /></Link>
        <div className="hidden lg:flex gap-10 items-center">
          {links.map(l => <Link key={l.caminho} to={l.caminho} className={`text-[10px] font-bold uppercase tracking-widest ${local.pathname === l.caminho ? 'text-black' : 'text-black/40 hover:text-black'}`}>{l.nome}</Link>)}
          <a href={LINK_WHATSAPP} onClick={dispararConversaoWhatsApp} className="px-6 py-3 bg-black text-white text-[9px] font-bold uppercase tracking-widest cursor-pointer">Atendimento</a>
        </div>
        <button className="lg:hidden" onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
      </div>
      <AnimatePresence>{menu && <motion.div className="lg:hidden bg-white p-8 flex flex-col gap-6 shadow-xl fixed top-20 right-0 w-full z-50">{links.map(l => <Link key={l.caminho} to={l.caminho} onClick={() => setMenu(false)} className="text-[12px] font-bold uppercase tracking-widest">{l.nome}</Link>)}</motion.div>}</AnimatePresence>
    </nav>
  );
};

// --- SEÇÕES COMPARTILHADAS (USADAS NA HOME E NAS PÁGINAS INTERNAS) ---

const SecaoEquipe = () => {
  const equipe = [
    { n: "Dr. Matheus Lang", a: "Sócio Fundador", d: "Estrategista Jurídico e Liderança.", i: IMAGEM_MATHEUS },
    { n: "Nicolas Brito", a: "Marketing & Tech", d: "Produtos Digitais e Modelos de Assinatura (SaaS); Marketing Estratégico; Social Media.", i: IMG_NICOLAS },
    { n: "Jefferson Cooper", a: "Jurídico Trabalhista", d: "Pós Graduado em Direito e Processo do Trabalho; Especialização em Acidentes de Trabalho e Compliance.", i: IMG_JEFFERSON }
  ];
  return (
    <section className="py-24 bg-white border-y border-black/5">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-black/30 mb-6 block">Nosso Time</span>
          <h2 className="text-4xl md:text-6xl font-serif tracking-tighter">Inteligência Coletiva.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {equipe.map((m, idx) => (
            <CardInterativo key={idx} className="flex flex-col">
              <div className="aspect-[3/4] overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                <img src={m.i} className="w-full h-full object-cover" alt={m.n} />
              </div>
              <div className="p-8 text-center bg-white flex-grow flex flex-col justify-center">
                <h3 className="font-serif text-2xl mb-2">{m.n}</h3>
                <span className="text-[9px] font-bold uppercase tracking-widest text-black/60 mb-4 block">{m.a}</span>
                <p className="text-[10px] uppercase tracking-wide text-black/40 leading-relaxed">{m.d}</p>
              </div>
            </CardInterativo>
          ))}
        </div>
      </div>
    </section>
  );
};

const SecaoEstrutura = () => (
  <section className="py-24 bg-[#fcfcfc]">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-black/30 mb-6 block">Sede Própria</span>
          <h2 className="text-4xl md:text-6xl font-serif tracking-tighter">Estrutura de Elite.</h2>
        </div>
        <Link to="/estrutura" className="text-[10px] font-bold uppercase tracking-[0.3em] border-b border-black pb-1 hover:opacity-50 transition-opacity">
          Ver galeria completa
        </Link>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {[IMG_ESCRITORIO_1, IMG_ESCRITORIO_2, IMG_ESCRITORIO_3].map((img, i) => (
          <div key={i} className="aspect-square overflow-hidden border border-black/5 group">
            <img src={img} className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-700" alt="Ambiente" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

// --- PÁGINAS ---

const PaginaInicial = () => (
  <main className="bg-white">
    {/* Hero Section */}
    <section className="min-h-[85vh] md:min-h-screen flex flex-col justify-center bg-[#fcfcfc] border-b border-black/5 px-6">
      <div className="container mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-black/30 mb-6 block">Excelência Jurídica em Santa Maria/RS</span>
          <h1 className="text-5xl md:text-9xl font-serif tracking-tighter mb-10 leading-none">Atuação <br /><span className="italic text-gray-400">Consciente.</span></h1>
          <p className="text-lg md:text-2xl text-black/50 font-light max-w-2xl border-l border-black/10 pl-8 mb-12">Proteção de ativos e defesa intransigente da liberdade individual e empresarial.</p>
          <BotaoCTA texto="Solicitar Consulta" />
        </motion.div>
      </div>
    </section>

    {/* Seção Sobre (Matheus) */}
    <section className="py-24 md:py-40 container mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-black/30 mb-8 block">Sobre o Escritório</span>
        <h2 className="text-4xl md:text-7xl font-serif mb-10 tracking-tighter texto-revelado">Tradição com <br /> Rigor Técnico.</h2>
        <p className="text-base md:text-xl text-black/60 font-light leading-relaxed mb-12">
          O escritório Lang Cardoso Advocacia prioriza o atendimento técnico e personalizado. Não trabalhamos com volume, trabalhamos com soluções estratégicas para casos complexos que exigem atenção absoluta aos detalhes.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-8 border border-black/5 bg-gray-50">
            <ShieldAlert className="mb-4 text-black" size={24} />
            <h4 className="text-[10px] font-bold uppercase tracking-widest mb-2">Segurança Jurídica</h4>
            <p className="text-xs text-black/40">Proteção robusta contra riscos imprevistos.</p>
          </div>
          <div className="p-8 border border-black/5 bg-gray-50">
            <Clock className="mb-4 text-black" size={24} />
            <h4 className="text-[10px] font-bold uppercase tracking-widest mb-2">Prontidão Técnica</h4>
            <p className="text-xs text-black/40">Respostas ágeis para demandas urgentes.</p>
          </div>
        </div>
      </div>
      <div className="relative">
        <img src={IMAGEM_MATHEUS} alt="Foto Dr. Lang" className="w-full grayscale shadow-2xl border border-black/5 hover:grayscale-0 transition-all duration-700" />
      </div>
    </section>

    {/* Áreas de Atuação */}
    <section className="py-24 md:py-40 bg-[#f9f9f9] border-y border-black/5">
      <div className="container mx-auto px-6 text-center mb-20">
        <h2 className="text-4xl md:text-7xl font-serif italic mb-4">Especialidades.</h2>
        <p className="text-black/30 text-lg font-light tracking-wide uppercase">Atuação técnica dividida em pilares de elite</p>
      </div>
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-8">
        <Link to="/assessoria-empresarial" className="group p-12 bg-white border border-black/10 transition-all hover:border-black/30">
          <Building2 className="mb-8 text-black" size={40} strokeWidth={1} />
          <h3 className="text-3xl font-serif mb-6">Empresarial & Cível</h3>
          <p className="text-black/40 mb-10 text-lg font-light leading-relaxed">Blindagem patrimonial, gestão de contratos e recuperação de créditos. Segurança para o crescimento do seu negócio.</p>
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] border-b border-black/20 pb-1 group-hover:border-black transition-all">Saber Mais</span>
        </Link>
        <Link to="/defesa-criminal" className="group p-12 bg-white border border-black/10 transition-all hover:border-black/30">
          <ShieldAlert className="mb-8 text-black" size={40} strokeWidth={1} />
          <h3 className="text-3xl font-serif mb-6">Defesa Criminal</h3>
          <p className="text-black/40 mb-10 text-lg font-light leading-relaxed">Atendimento de urgência, tribunal do júri e defesa em crimes econômicos. A liberdade como prioridade máxima.</p>
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] border-b border-black/20 pb-1 group-hover:border-black transition-all">Saber Mais</span>
        </Link>
      </div>
    </section>

    {/* RESTAURAÇÃO: EQUIPE E ESTRUTURA NA HOME */}
    <SecaoEquipe />
    <SecaoEstrutura />

    <Rodape />
  </main>
);

const ModeloPaginaServico: React.FC<{ titulo: string; subtitulo: string; dores: any[]; servicos: any[]; area: string; }> = ({ titulo, subtitulo, dores, servicos, area }) => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <main className="bg-white">
      <section className="min-h-[70vh] flex flex-col justify-center bg-[#fcfcfc] pt-20 border-b border-black/5">
        <div className="container mx-auto px-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-black/30 mb-6 block">{area}</span>
          <h1 className="text-5xl md:text-8xl font-serif mb-10 tracking-tighter leading-tight">{titulo}</h1>
          <p className="text-lg md:text-2xl text-black/50 font-light leading-relaxed max-w-3xl border-l border-black/10 pl-8 mb-12">{subtitulo}</p>
          <BotaoCTA texto="Agende uma Reunião" />
        </div>
      </section>
      <section className="py-24 container mx-auto px-6 border-b border-black/5">
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {dores.map((d, i) => (
            <CardInterativo key={i} className="p-10">
              <AlertCircle className="mb-8 text-black/20" size={32} />
              <h3 className="text-xl font-serif mb-4 uppercase">{d.t}</h3>
              <p className="text-xs text-black/50 font-light">{d.d}</p>
            </CardInterativo>
          ))}
        </div>
        <div className="flex justify-center"><BotaoCTA texto="Chame nosso Escritório" /></div>
      </section>
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-6 mb-16">
          {servicos.map((s, i) => (
            <div key={i} className="p-10 bg-white border border-black/5">
              <div className="mb-8 opacity-30">{s.i}</div>
              <h3 className="text-2xl font-serif mb-6">{s.t}</h3>
              <p className="text-sm text-black/40 font-light">{s.d}</p>
            </div>
          ))}
        </div>
      </section>
      <Rodape />
    </main>
  );
};

const PaginaEquipe = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <main className="pt-32 pb-20">
      <div className="container mx-auto px-6 mb-16">
        <h1 className="text-6xl font-serif mb-16 tracking-tighter">Equipe.</h1>
        <p className="text-xl text-black/50 max-w-2xl font-light">Profissionais multidisciplinares unidos por um único propósito: a defesa dos seus interesses.</p>
      </div>
      <SecaoEquipe />
      <Rodape />
    </main>
  );
};

const Rodape = () => (
  <footer className="py-24 bg-white border-t border-black/5">
    <div className="container mx-auto px-6 flex flex-col items-center gap-10">
      <Logotipo reduzido />
      <div className="grid md:grid-cols-3 gap-12 border-y border-black/10 py-16 w-full text-center">
        <a href={LINK_MAPA} target="_blank" className="group">
          <MapPin className="mx-auto mb-4 group-hover:scale-110 transition-transform" /> 
          <h5 className="text-[11px] font-bold uppercase mb-2">Localização</h5> 
          <p className="text-xs text-black/40 group-hover:text-black">Santa Maria - RS</p>
        </a>
        <a href={LINK_WHATSAPP} onClick={dispararConversaoWhatsApp} className="group cursor-pointer">
          <MessageCircle className="mx-auto mb-4 group-hover:scale-110 transition-transform" /> 
          <h5 className="text-[11px] font-bold uppercase mb-2">WhatsApp</h5> 
          <p className="text-xs text-black/40 group-hover:text-black">(55) 3217-6378</p>
        </a>
        <a href={`mailto:${EMAIL_CONTATO}`} className="group">
          <Mail className="mx-auto mb-4 group-hover:scale-110 transition-transform" /> 
          <h5 className="text-[11px] font-bold uppercase mb-2">E-mail</h5> 
          <p className="text-xs text-black/40 group-hover:text-black">{EMAIL_CONTATO}</p>
        </a>
      </div>
      <div className="flex gap-4 opacity-50">
        <a href={LINK_INSTAGRAM} target="_blank"><Instagram size={20} /></a>
        <Linkedin size={20} />
      </div>
      <p className="text-[9px] font-bold uppercase tracking-widest opacity-20">© 2025 Lang Cardoso Advocacia</p>
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
        <Route path="/estrutura" element={
          <main className="pt-32 container mx-auto px-6">
            <h1 className="text-6xl font-serif mb-16">O Escritório.</h1>
            <SecaoEstrutura />
            <Rodape />
          </main>
        } />
        <Route path="/assessoria-empresarial" element={
          <ModeloPaginaServico area="Direito Corporativo" titulo="Direito Cível" subtitulo="Consultoria estratégica focada na segurança patrimonial e viabilidade econômica do seu negócio." 
            dores={[{t:"Cobranças", d:"Atuação estratégica na recuperação de ativos financeiros..."}, {t:"CONTRATOS", d:"Desenvolvimento e revisão técnica de instrumentos contratuais..."}, {t:"FAMÍLIA", d:"Atendimento especializado e humanizado..."}, {t:"CONSULTORIA", d:"Análise contínua e preventiva..."}]}
            servicos={[{t:"IMOBILIÁRIO", d:"Consultoria completa para a regularização...", i:<Scale size={28}/>}, {t:"DÍVIDAS", d:"Atuação técnica na renegociação...", i:<Landmark size={28}/>}, {t:"REGULARIZAÇÃO", d:"Soluções jurídicas integradas...", i:<ReceiptText size={28}/>}]}
          />
        } />
        <Route path="/defesa-criminal" element={
          <ModeloPaginaServico area="Direito Penal de Elite" titulo="Defesa da Liberdade." subtitulo="Atuação tática de urgência com rigor garantista para proteção dos direitos fundamentais."
            dores={[{t:"VIOLÊNCIA DOMÉSTICA", d:"Atuação técnica e estratégica..."}, {t:"TRIBUNAL DO JÚRI", d:"Defesa especializada em crimes dolosos..."}, {t:"CUSTÓDIA", d:"Atendimento imediato e presencial..."}, {t:"CIBERNÉTICOS", d:"Defesa e investigação especializada..."}]}
            servicos={[{t:"EMPRESARIAIS", d:"Defesa corporativa de alta performance...", i:<Search size={28}/>}, {t:"FLAGRANTE", d:"Disponibilidade absoluta para acompanhamento...", i:<FileText size={28}/>}, {t:"DEFESA TÉCNICA", d:"Gestão estratégica do processo penal...", i:<Lock size={28}/>}]}
          />
        } />
      </Routes>
    </HashRouter>
  );
}
