import React, { useState, useEffect } from 'react';
import { 
  Building2, Scale, ArrowRight, Menu, X, ReceiptText, 
  ShieldAlert, MessageCircle, Landmark, 
  Instagram, Linkedin, MapPin, Mail
} from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';

// --- CONFIGURAÇÃO DE IMAGENS (Usando caminhos absolutos da pasta public/images) ---
const IMAGEM_ADVOGADO = "/images/advogado.png"; 
const IMG_ESCRITORIO_1 = "/images/escritorio1.PNG";
const IMG_ESCRITORIO_2 = "/images/escritorio2.PNG";
const IMG_ESCRITORIO_3 = "/images/escritorio3.PNG";
const IMG_COLABORADOR_1 = "/images/colaborador1.png";
const IMG_COLABORADOR_2 = "/images/colaborador2.png";

const LINK_WHATSAPP = "https://wa.me/555532176378";
const EMAIL_CONTATO = "contato@langcardoso.adv.br";

const dispararConversaoWhatsApp = () => {
  if (typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', 'conversion', { 'send_to': 'AW-17926426473/xB7yCIDz6vIbEOme_uNC', 'value': 1.0, 'currency': 'BRL' });
  }
};

// --- COMPONENTES ---
const Logotipo = ({ reduzido = false }) => (
  <div className={`flex flex-col items-center border border-black bg-white ${reduzido ? 'px-2 py-1' : 'px-8 py-10'}`}>
    <span className={`${reduzido ? 'text-[8px]' : 'text-2xl'} font-bold tracking-[0.2em] uppercase`}>Lang Cardoso</span>
    <div className="w-full h-[1px] bg-black my-1"></div>
    <span className={`${reduzido ? 'text-[6px]' : 'text-xl'} font-bold tracking-[0.4em] uppercase`}>Advocacia</span>
  </div>
);

const BotaoCTA = ({ texto }: { texto: string }) => (
  <a href={LINK_WHATSAPP} target="_blank" onClick={dispararConversaoWhatsApp} className="inline-flex items-center gap-4 px-8 py-4 bg-black text-white font-bold uppercase text-[10px] tracking-widest hover:bg-gray-800 transition-all cursor-pointer">
    {texto} <ArrowRight size={14} />
  </a>
);

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
      {menu && <div className="lg:hidden bg-white p-6 flex flex-col gap-4 border-t mt-4">{links.map(l => <Link key={l.c} to={l.c} onClick={() => setMenu(false)} className="text-[10px] font-bold uppercase">{l.n}</Link>)}</div>}
    </nav>
  );
};

const PaginaInicial = () => (
  <main className="pt-20">
    <section className="min-h-[70vh] flex flex-col justify-center bg-[#fcfcfc]">
      <div className="container mx-auto px-6">
        <h1 className="text-6xl md:text-9xl font-serif tracking-tighter mb-8">Estratégia <br /><span className="italic text-gray-400">Digital.</span></h1>
        <BotaoCTA texto="Agendar Reunião" />
      </div>
    </section>
    <section className="py-24 container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-4xl md:text-6xl font-serif mb-6">Foco no Resultado.</h2>
        <p className="text-black/60 text-lg font-light leading-relaxed">Soluções estratégicas para o mercado digital e jurídico.</p>
      </div>
      <img src={IMAGEM_ADVOGADO} className="w-full grayscale border border-black/5" alt="Nicolas" />
    </section>
    <Rodape />
  </main>
);

const PaginaEquipe = () => {
  const equipe = [
    { 
      n: "Dr. Matheus Lang", 
      a: "Sócio Fundador", 
      i: "/images/advogado.png" 
    },
    { 
      n: "Especializações", 
      a: "Produtos Digitais e Modelos de Assinatura (SaaS); Marketing Estratégico; Social Media", 
      i: "/images/colaborador1.png" 
    },
    { 
      n: "Jefferson", 
      a: "", 
      i: "/images/colaborador2.png" 
    }
  ];

  return (
    <main className="pt-32 pb-20 container mx-auto px-6">
      <h1 className="text-6xl font-serif mb-16 tracking-tighter">Equipe.</h1>
      <div className="grid md:grid-cols-3 gap-10">
        {equipe.map((m, idx) => (
          <div key={idx} className="border border-black/10 bg-white overflow-hidden flex flex-col">
            <div className="aspect-[3/4] overflow-hidden">
                <img 
                  src={m.i} 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all" 
                  alt={m.n} 
                  onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/400x600?text=Foto+Pendente")}
                />
            </div>
            <div className="p-6 text-center flex-grow flex flex-col justify-center">
              <h3 className="font-serif text-xl mb-2">{m.n}</h3>
              <p className="text-[10px] uppercase tracking-widest text-black/40 leading-relaxed whitespace-pre-line">
                {m.a}
              </p>
            </div>
          </div>
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
        <a href={LINK_WHATSAPP} target="_blank"><MessageCircle size={20} /></a>
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
        <Route path="/assessoria-empresarial" element={<div className="pt-40 text-center font-serif text-2xl">Consultoria em SaaS e Marketing</div>} />
        <Route path="/defesa-criminal" element={<div className="pt-40 text-center font-serif text-2xl">Proteção Jurídica Digital</div>} />
      </Routes>
    </HashRouter>
  );
}
