import React, { useState, useEffect } from 'react';
import { 
  Building2, Scale, ArrowRight, Menu, X, ReceiptText, 
  ShieldAlert, MessageCircle, AlertCircle, Landmark, 
  FileText, Instagram, Linkedin, MapPin, Mail, Lock, Search
} from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';

// --- CAMINHOS DE IMAGEM CORRIGIDOS ---
const IMAGEM_ADVOGADO = "/images/advogado.png"; 
const IMG_ESCRITORIO_1 = "/images/escritorio1.PNG";
const IMG_ESCRITORIO_2 = "/images/escritorio2.PNG";
const IMG_ESCRITORIO_3 = "/images/escritorio3.PNG";

// Ficheiros dos colaboradores que estão na sua pasta public/images
const IMG_COLABORADOR_1 = "/images/colaborador1.png";
const IMG_COLABORADOR_2 = "/images/colaborador2.png";

const LINK_WHATSAPP = "https://wa.me/555532176378";
const EMAIL_CONTATO = "contato@langcardoso.adv.br";

const dispararConversaoWhatsApp = () => {
  if (typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', 'conversion', { 'send_to': 'AW-17926426473/xB7yCIDz6vIbEOme_uNC', 'value': 1.0, 'currency': 'BRL' });
  }
};

// --- COMPONENTES BASE ---
const Logotipo = ({ reduzido = false }) => (
  <div className={`flex flex-col items-center border border-black bg-white ${reduzido ? 'px-2 py-1' : 'px-8 py-10'}`}>
    <span className={`${reduzido ? 'text-[8px]' : 'text-2xl'} font-bold tracking-[0.2em] uppercase`}>Lang Cardoso</span>
    <div className="w-full h-[1px] bg-black my-1"></div>
    <span className={`${reduzido ? 'text-[6px]' : 'text-xl'} font-bold tracking-[0.4em] uppercase`}>Advocacia</span>
  </div>
);

const BotaoCTA = ({ texto }: { texto: string }) => (
  <a href={LINK_WHATSAPP} target="_blank" onClick={dispararConversaoWhatsApp} className="inline-flex items-center gap-4 px-8 py-4 bg-black text-white font-bold uppercase text-[10px] tracking-widest hover:bg-gray-800 transition-all">
    {texto} <ArrowRight size={14} />
  </a>
);

const CardInterativo = ({ children }: { children: React.ReactNode }) => {
  const x = useMotionValue(0); const y = useMotionValue(0);
  const rx = useTransform(useSpring(y, { stiffness: 300, damping: 30 }), [-0.5, 0.5], ["5deg", "-5deg"]);
  const ry = useTransform(useSpring(x, { stiffness: 300, damping: 30 }), [-0.5, 0.5], ["-5deg", "5deg"]);
  return (
    <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }} onMouseMove={(e) => { const b = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - b.left) / b.width - 0.5); y.set((e.clientY - b.top) / b.height - 0.5); }} onMouseLeave={() => { x.set(0); y.set(0); }} className="bg-white border border-black/10 overflow-hidden">
      {children}
    </motion.div>
  );
};

const BarraNavegacao = () => {
  const [menu, setMenu] = useState(false);
  const links = [{ n: 'Início', c: '/' }, { n: 'Empresarial', c: '/assessoria-empresarial' }, { n: 'Criminal', c: '/defesa-criminal' }, { n: 'Equipe', c: '/equipe' }, { n: 'Estrutura', c: '/estrutura' }];
  return (
    <nav className="fixed top-0 w-full z-[100] bg-white/90 backdrop-blur-md border-b border-black/5 py-4">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/"><Logotipo reduzido /></Link>
        <div className="hidden lg:flex gap-8 items-center">
          {links.map(l => <Link key={l.c} to={l.c} className="text-[10px] font-bold uppercase tracking-widest text-black/60 hover:text-black">{l.n}</Link>)}
          <a href={LINK_WHATSAPP} className="px-4 py-2 bg-black text-white text-[9px] uppercase font-bold tracking-widest">Contato</a>
        </div>
        <button className="lg:hidden" onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
      </div>
      <AnimatePresence>
        {menu && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="lg:hidden bg-white p-6 flex flex-col gap-4 border-t overflow-hidden">
            {links.map(l => <Link key={l.c} to={l.c} onClick={() => setMenu(false)} className="text-[10px] font-bold uppercase">{l.n}</Link>)}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- PÁGINAS ---
const ModeloServico = ({ titulo, subtitulo, itens }: any) => (
  <main className="pt-20">
    <section className="bg-[#fcfcfc] py-20 border-b border-black/5">
      <div className="container mx-auto px-6">
        <h1 className="text-5xl md:text-7xl font-serif mb-6">{titulo}</h1>
        <p className="max-w-2xl text-black/50 text-xl font-light">{subtitulo}</p>
        <div className="mt-10"><BotaoCTA texto="Consultar Agora" /></div>
      </div>
    </section>
    <section className="py-20 container mx-auto px-6 grid md:grid-cols-2 gap-8">
      {itens.map((i: any, idx: number) => (
        <div key={idx} className="p-10 border border-black/5 bg-white">
          <h3 className="text-2xl font-serif mb-4">{i.t}</h3>
          <p className="text-black/40 font-light">{i.d}</p>
        </div>
      ))}
    </section>
    <Rodape />
  </main>
);

const PaginaInicial = () => (
  <main className="pt-20">
    <section className="min-h-[70vh] flex flex-col justify-center bg-[#fcfcfc]">
      <div className="container mx-auto px-6">
        <h1 className="text-6xl md:text-9xl font-serif tracking-tighter mb-8">Estratégia <br /><span className="italic text-gray-400">Jurídica.</span></h1>
        <BotaoCTA texto="Agendar Reunião" />
      </div>
    </section>
    <section className="py-24 container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-4xl md:text-6xl font-serif mb-6">Foco no Resultado.</h2>
        <p className="text-black/60 text-lg font-light leading-relaxed">Atuação técnica de alta performance para demandas empresariais e criminais em Santa Maria e região.</p>
      </div>
      <img src={IMAGEM_ADVOGADO} className="w-full grayscale border border-black/5" alt="Dr Lang" />
    </section>
    <Rodape />
  </main>
);

const PaginaEquipe = () => {
  const equipe = [
    { n: "Dr. Matheus Lang", a: "Sócio Fundador", i: IMAGEM_ADVOGADO },
    { n: "Equipe Técnica", a: "Direito Cível", i: IMG_COLABORADOR_1 },
    { n: "Equipe Técnica", a: "Direito Penal", i: IMG_COLABORADOR_2 },
  ];
  return (
    <main className="pt-32 pb-20 container mx-auto px-6">
      <h1 className="text-6xl font-serif mb-16">Equipe.</h1>
      <div className="grid md:grid-cols-3 gap-10">
        {equipe.map((m, idx) => (
          <CardInterativo key={idx}>
            <div className="aspect-[3/4] overflow-hidden">
              <img src={m.i} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all" alt={m.n} />
            </div>
            <div className="p-6 text-center">
              <h3 className="font-serif text-xl">{m.n}</h3>
              <p className="text-[10px] uppercase tracking-widest text-black/40">{m.a}</p>
            </div>
          </CardInterativo>
        ))}
      </div>
      <Rodape />
    </main>
  );
};

const PaginaEstrutura = () => (
  <main className="pt-32 pb-20 container mx-auto px-6">
    <h1 className="text-6xl font-serif mb-16">O Escritório.</h1>
    <div className="grid gap-10">
      {[IMG_ESCRITORIO_1, IMG_ESCRITORIO_2, IMG_ESCRITORIO_3].map((img, i) => (
        <img key={i} src={img} className="w-full grayscale border border-black/5" alt="Estrutura" />
      ))}
    </div>
    <Rodape />
  </main>
);

const Rodape = () => (
  <footer className="py-20 border-t border-black/5 bg-white mt-20">
    <div className="container mx-auto px-6 flex flex-col items-center gap-10">
      <Logotipo reduzido />
      <div className="flex gap-10 text-black/40">
        <a href={LINK_WHATSAPP}><MessageCircle size={20} /></a>
        <a href="#"><Instagram size={20} /></a>
        <a href="#"><Linkedin size={20} /></a>
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
        <Route path="/estrutura" element={<PaginaEstrutura />} />
        <Route path="/assessoria-empresarial" element={<ModeloServico titulo="Cível & Empresarial" subtitulo="Blindagem patrimonial e segurança jurídica." itens={[{t:"Contratos", d:"Revisão tática."}, {t:"Recuperação", d:"Gestão de créditos."}]} />} />
        <Route path="/defesa-criminal" element={<ModeloServico titulo="Defesa Criminal" subtitulo="Atuação estratégica em defesa da liberdade." itens={[{t:"Custódia", d:"Atendimento 24h."}, {t:"Econômicos", d:"Defesa financeira."}]} />} />
      </Routes>
    </HashRouter>
  );
}
