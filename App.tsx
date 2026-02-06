import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Scale, 
  Gavel, 
  ArrowRight, 
  Menu, 
  X, 
  HandCoins, 
  ReceiptText, 
  ShieldAlert,
  MessageCircle,
  AlertCircle,
  CheckCircle2,
  Lock,
  Search,
  Users2,
  Landmark,
  FileText,
  Instagram,
  Linkedin,
  MapPin,
  Clock,
  Mail,
  Phone
} from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';

// --- IMPORTAÇÃO BLINDADA DA IMAGEM ---
import fotoAdvogado from './advogado.png'; 

// --- Declaração Global para o Gtag (Para o TypeScript não reclamar) ---
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

// --- Função de Disparo de Conversão (Estratégia Oculta) ---
const dispararConversaoWhatsApp = () => {
  if (typeof window.gtag === 'function') {
    // Dispara o evento de conversão específico que você criou
    window.gtag('event', 'conversion', {
      'send_to': 'AW-17926426473/xB7yCIDz6vIbEOme_uNC',
      'value': 1.0,
      'currency': 'BRL'
    });
    console.log("Conversão de WhatsApp disparada para o Google Ads");
  } else {
    console.warn("Google Tag não encontrada. Verifique o index.html");
  }
};

// --- Constantes ---
const LINK_WHATSAPP = "https://wa.me/555532176378";
const LINK_INSTAGRAM = "https://www.instagram.com/langcardosoadvocacia";
const LINK_MAPA = "https://www.google.com/maps/search/?api=1&query=Alameda+Montevideo,+322,+Sala+108,+Santa+Maria+-+RS";
const EMAIL_CONTATO = "contato@langcardoso.adv.br";

// Agora usamos a imagem importada
const IMAGEM_ADVOGADO = fotoAdvogado;

const TRANSICAO_SUAVE: [number, number, number, number] = [0.23, 1, 0.32, 1];

// --- Componentes de Interface ---

const Logotipo: React.FC<{ className?: string; reduzido?: boolean }> = ({ 
  className = "", 
  reduzido = false
}) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.01 }}
      className={`relative flex flex-col items-center border border-black bg-white
        ${reduzido ? 'px-3 py-2' : 'px-8 md:px-10 py-10 md:py-12'} transition-all cursor-pointer ${className}`}
    >
      <span className={`${reduzido ? 'text-[9px]' : 'text-xl md:text-3xl'} font-bold text-black tracking-[0.2em] uppercase mb-1 font-sans text-center`}>
        Lang Cardoso
      </span>
      
      <div className="relative w-full h-[1px] bg-black mb-1">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-2 bg-black"></div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-2 bg-black"></div>
      </div>
      
      <span className={`${reduzido ? 'text-[7px]' : 'text-lg md:text-2xl'} font-bold text-black tracking-[0.4em] uppercase mb-0 font-sans text-center`}>
        Advocacia
      </span>
      
      {!reduzido && (
        <span className="hidden md:block absolute bottom-2 right-3 text-[7px] text-black font-medium tracking-tighter opacity-40">
          OAB/RS 12.585
        </span>
      )}
    </motion.div>
  );
};

const BotaoCTA: React.FC<{ texto: string; className?: string }> = ({ texto, className = "" }) => (
  <a 
    href={LINK_WHATSAPP} 
    target="_blank" 
    rel="noopener noreferrer" 
    onClick={dispararConversaoWhatsApp} // <--- GATILHO INSTALADO AQUI
    className={`inline-flex items-center gap-4 px-10 py-6 bg-black text-white font-bold uppercase text-[10px] tracking-[0.3em] transition-all hover:bg-gray-800 shadow-xl cursor-pointer ${className}`}
  >
    {texto} <ArrowRight size={16} />
  </a>
);

const CardInterativo: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rX = useTransform(mYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rY = useTransform(mXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const aoMoverMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(pointer: fine)").matches) {
      const b = e.currentTarget.getBoundingClientRect();
      x.set((e.clientX - b.left) / b.width - 0.5);
      y.set((e.clientY - b.top) / b.height - 0.5);
    }
  };

  const aoSairMouse = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ rotateX: rX, rotateY: rY, transformStyle: "preserve-3d" }}
      onMouseMove={aoMoverMouse}
      onMouseLeave={aoSairMouse}
      className={`relative group bg-white border border-black/10 transition-all duration-500 overflow-hidden effect-hover ${className}`}
    >
      <div style={{ transform: "translateZ(20px)" }} className="relative z-10 h-full w-full">
        {children}
      </div>
    </motion.div>
  );
};

const BarraNavegacao = () => {
  const [rolou, setRolou] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const local = useLocation();

  useEffect(() => {
    const monitorarRolagem = () => setRolou(window.scrollY > 20);
    window.addEventListener('scroll', monitorarRolagem);
    return () => window.removeEventListener('scroll', monitorarRolagem);
  }, []);

  const links = [
    { nome: 'Início', caminho: '/' },
    { nome: 'Empresarial & Cível', caminho: '/assessoria-empresarial' },
    { nome: 'Criminal', caminho: '/defesa-criminal' }
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-[100] transition-all duration-300
        ${rolou ? 'py-2 bg-white border-b border-black/5 shadow-sm' : 'py-4 md:py-6 bg-transparent'}`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link to="/" className="transition-transform duration-300 hover:scale-105">
          <Logotipo reduzido />
        </Link>

        <div className="hidden lg:flex items-center gap-10">
          <div className="flex items-center gap-8">
            {links.map((link) => (
              <Link 
                key={link.caminho}
                to={link.caminho} 
                className="group relative py-1"
              >
                <span className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors
                  ${local.pathname === link.caminho ? 'text-black' : 'text-black/40 hover:text-black'}`}
                >
                  {link.nome}
                </span>
                {local.pathname === link.caminho && (
                  <motion.div layoutId="sublinhado" className="absolute bottom-0 left-0 w-full h-[1px] bg-black" />
                )}
              </Link>
            ))}
          </div>
          
          <a 
            href={LINK_WHATSAPP} 
            target="_blank" 
            rel="noopener noreferrer" 
            onClick={dispararConversaoWhatsApp} // <--- GATILHO INSTALADO AQUI
            className="px-6 py-3 bg-black text-white text-[9px] font-bold uppercase tracking-[0.3em] transition-colors hover:bg-gray-800 cursor-pointer"
          >
            Atendimento
          </a>
        </div>

        <button 
          className="lg:hidden p-2 text-black" 
          onClick={() => setMenuAberto(!menuAberto)}
        >
          {menuAberto ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {menuAberto && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }} 
            className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-black/10 flex flex-col p-8 gap-6 shadow-xl"
          >
            {links.map((link) => (
              <Link 
                key={link.caminho}
                to={link.caminho} 
                onClick={() => setMenuAberto(false)}
                className={`text-[12px] font-bold uppercase tracking-[0.2em] py-2 
                  ${local.pathname === link.caminho ? 'text-black' : 'text-black/40'}`}
              >
                {link.nome}
              </Link>
            ))}
            <a 
              href={LINK_WHATSAPP} 
              onClick={dispararConversaoWhatsApp} // <--- GATILHO INSTALADO AQUI
              className="w-full py-4 bg-black text-white text-center text-[10px] font-bold uppercase tracking-[0.3em] cursor-pointer"
            >
              WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Páginas ---

const PaginaInicial = () => {
  return (
    <main className="bg-white">
      {/* Seção Principal */}
      <section className="min-h-[85vh] md:min-h-screen flex flex-col justify-center bg-[#fcfcfc] border-b border-black/5">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: TRANSICAO_SUAVE }}
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-black/30 mb-6 block">
              Excelência Jurídica em Santa Maria/RS
            </span>
            <h1 className="text-5xl sm:text-7xl md:text-9xl font-serif text-black leading-[1.1] mb-10 tracking-tighter">
              Atuação <br /> <span className="italic text-gray-400">Consciente.</span>
            </h1>
            <p className="text-lg md:text-2xl text-black/50 font-light leading-relaxed mb-12 max-w-3xl border-l border-black/10 pl-8">
              Um escritório de advocacia focado na proteção de ativos e na defesa intransigente da liberdade individual e empresarial.
            </p>
            <BotaoCTA texto="Solicitar Consulta" />
          </motion.div>
        </div>
      </section>

      {/* Sobre */}
      <section className="py-24 md:py-40 container mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-20 items-center">
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
          <img src={IMAGEM_ADVOGADO} alt="Foto Dr. Lang" className="w-full grayscale shadow-2xl border border-black/5" />
        </div>
      </section>

      {/* Áreas de Atuação */}
      <section className="py-24 md:py-40 bg-[#f9f9f9] border-y border-black/5">
        <div className="container mx-auto px-6 md:px-12 text-center mb-20">
          <h2 className="text-4xl md:text-7xl font-serif italic mb-4">Especialidades.</h2>
          <p className="text-black/30 text-lg font-light tracking-wide uppercase">Atuação técnica dividida em pilares de elite</p>
        </div>
        <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-8">
          <Link to="/assessoria-empresarial" className="group p-12 bg-white border border-black/10 transition-all hover:border-black/30">
            <Building2 className="mb-8 text-black" size={40} strokeWidth={1} />
            <h3 className="text-3xl font-serif mb-6">Empresarial & Cível</h3>
            <p className="text-black/40 mb-10 text-lg font-light leading-relaxed">
              Blindagem patrimonial, gestão de contratos e recuperação de créditos. Segurança para o crescimento do seu negócio.
            </p>
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] border-b border-black/20 pb-1 group-hover:border-black transition-all">Saber Mais</span>
          </Link>
          <Link to="/defesa-criminal" className="group p-12 bg-white border border-black/10 transition-all hover:border-black/30">
            <ShieldAlert className="mb-8 text-black" size={40} strokeWidth={1} />
            <h3 className="text-3xl font-serif mb-6">Defesa Criminal</h3>
            <p className="text-black/40 mb-10 text-lg font-light leading-relaxed">
              Atendimento de urgência, tribunal do júri e defesa em crimes econômicos. A liberdade como prioridade máxima.
            </p>
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] border-b border-black/20 pb-1 group-hover:border-black transition-all">Saber Mais</span>
          </Link>
        </div>
      </section>
      
      <Rodape />
    </main>
  );
};

const ModeloPaginaServico: React.FC<{ 
  titulo: string; 
  subtitulo: string; 
  dores: { t: string; d: string }[];
  servicos: { t: string; d: string; i: React.ReactNode }[];
  area: string;
}> = ({ titulo, subtitulo, dores, servicos, area }) => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <main className="bg-white">
      {/* 1. Botão de topo no final da Hero */}
      <section className="min-h-[70vh] flex flex-col justify-center bg-[#fcfcfc] border-b border-black/5 pb-20">
        <div className="container mx-auto px-6 md:px-12">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-black/30 mb-6 block">{area}</span>
          <h1 className="text-5xl md:text-8xl font-serif text-black mb-10 tracking-tighter leading-tight">{titulo}</h1>
          <p className="text-lg md:text-2xl text-black/50 font-light leading-relaxed max-w-3xl border-l border-black/10 pl-8 mb-12">{subtitulo}</p>
          <BotaoCTA texto="Agende uma Reunião" />
        </div>
      </section>

      {/* Seção Dores */}
      <section className="py-24 container mx-auto px-6 md:px-12 border-b border-black/5">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {dores.map((d, i) => (
            <CardInterativo key={i} className="p-10">
              <AlertCircle className="mb-8 text-black/20" size={32} />
              <h3 className="text-xl font-serif mb-4 uppercase tracking-tight">{d.t}</h3>
              <p className="text-xs text-black/50 leading-relaxed font-light">{d.d}</p>
            </CardInterativo>
          ))}
        </div>
        {/* 2. Botão de meio após a seção de dores */}
        <div className="flex justify-center">
          <BotaoCTA texto="Chame nosso Escritório" />
        </div>
      </section>

      {/* Seção Serviços */}
      <section className="py-24 bg-gray-50 border-b border-black/5">
        <div className="container mx-auto px-6 md:px-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {servicos.map((s, i) => (
            <div key={i} className="p-10 bg-white border border-black/5">
              <div className="mb-8 opacity-30">{s.i}</div>
              <h3 className="text-2xl font-serif mb-6">{s.t}</h3>
              <p className="text-sm text-black/40 leading-relaxed font-light">{s.d}</p>
            </div>
          ))}
        </div>
        {/* 3. Botão final antes do rodapé */}
        <div className="flex justify-center">
          <BotaoCTA texto="Fale com Matheus Lang" />
        </div>
      </section>
      
      <Rodape />
    </main>
  );
};

const Rodape = () => {
  return (
    <footer className="py-24 md:py-40 bg-white border-t border-black/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center mb-24">
          <Logotipo className="scale-75 md:scale-90 mb-16" />
          <h2 className="text-4xl md:text-7xl font-serif text-center mb-16 italic texto-revelado">Fale com nosso escritório.</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12 border-y border-black/10 py-16 mb-24">
          <a href={LINK_MAPA} target="_blank" rel="noopener noreferrer" className="group block">
            <MapPin className="mb-6 text-black group-hover:scale-110 transition-transform" size={32} />
            <h5 className="text-[11px] font-bold uppercase tracking-widest mb-4">Localização</h5>
            <p className="text-xs text-black/50 leading-loose group-hover:text-black transition-colors">
              Alameda Montevideo, 322 <br /> Sala 108, Santa Maria - RS <br /> <span className="underline opacity-40">Ver no Google Maps</span>
            </p>
          </a>
          <a 
            href={LINK_WHATSAPP} 
            target="_blank" 
            rel="noopener noreferrer" 
            onClick={dispararConversaoWhatsApp} // <--- GATILHO INSTALADO AQUI
            className="group block cursor-pointer"
          >
            <MessageCircle className="mb-6 text-black group-hover:scale-110 transition-transform" size={32} />
            <h5 className="text-[11px] font-bold uppercase tracking-widest mb-4">WhatsApp</h5>
            <p className="text-xs text-black/50 leading-loose group-hover:text-black transition-colors">
              (55) 3217-6378 <br /> Atendimento direto para urgências <br /> <span className="underline opacity-40">Abrir conversa agora</span>
            </p>
          </a>
          <a href={`mailto:${EMAIL_CONTATO}`} className="group block">
            <Mail className="mb-6 text-black group-hover:scale-110 transition-transform" size={32} />
            <h5 className="text-[11px] font-bold uppercase tracking-widest mb-4">E-mail</h5>
            <p className="text-xs text-black/50 leading-loose group-hover:text-black transition-colors">
              {EMAIL_CONTATO} <br /> Consultoria e Documentação <br /> <span className="underline opacity-40">Enviar e-mail</span>
            </p>
          </a>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-10 opacity-30">
          <div className="flex gap-8 items-center">
            <a href={LINK_INSTAGRAM} target="_blank" className="hover:text-black transition-colors"><Instagram size={20} /></a>
            <a href="#" className="hover:text-black transition-colors"><Linkedin size={20} /></a>
            <span className="text-[9px] font-bold uppercase tracking-[0.2em]">© 2025 Lang Cardoso Advocacia</span>
          </div>
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] italic">Santa Maria - RS</span>
        </div>
      </div>
    </footer>
  );
};

// --- Páginas Específicas ---

const PaginaEmpresarial = () => (
  <ModeloPaginaServico 
    area="Direito Corporativo"
    titulo="Direito Cível"
    subtitulo="Consultoria estratégica focada na segurança patrimonial e viabilidade econômica do seu negócio."
    dores={[
      { t: "Cobranças", d: "Cobrança judicial e extrajudicial para recuperação de créditos. Atuação estratégica em execuções, negociações, acordos e ações de cobrança para pessoas físicas e jurídicas." },
      { t: "CONTRATOS", d: "Criação, revisão e segurança jurídica contratual. Elaboração e análise de contratos civis e comerciais, com foco em prevenção de riscos e proteção legal." },
      { t: "FAMÍLIA", d: "Pensão, divórcio, guarda e revisões judiciais. Atuação técnica e humanizada em demandas familiares, buscando soluções jurídicas eficientes." },
      { t: "CONSULTORIA CONTRATUAL", d: "Análise estratégica de contratos e relações jurídicas. Suporte contínuo para empresas e pessoas físicas na tomada de decisões contratuais." }
    ]}
    servicos={[
      { t: "DIREITO IMOBILIÁRIO", d: "Regularização e segurança jurídica em imóveis. Assessoria em compra e venda, contratos, análise documental e desburocratização imobiliária.", i: <Scale size={28} /> },
      { t: "REESTRUTURAÇÃO DE DÍVIDAS", d: "Negociação e reorganização financeira. Atuação na revisão de financiamentos, acordos, redução de encargos e renegociação de passivos.", i: <Landmark size={28} /> },
      { t: "REGULARIZAÇÃO JURÍDICA", d: "Soluções legais para pendências patrimoniais e empresariais. Atuação em regularização de imóveis, documentos, registros, estrutura societária e resolução de entraves legais.", i: <ReceiptText size={28} /> }
    ]}
  />
);

const PaginaCriminal = () => (
  <ModeloPaginaServico 
    area="Direito Penal de Elite"
    titulo="Defesa da Liberdade."
    subtitulo="Atuação tática de urgência com rigor garantista para proteção dos direitos fundamentais."
    dores={[
      { t: "VIOLÊNCIA DOMÉSTICA", d: "Atuação em medidas protetivas e defesa criminal. Acompanhamento completo em casos de violência doméstica, desde o registro até a defesa técnica em processos judiciais." },
      { t: "TRIBUNAL DO JÚRI", d: "Defesa em crimes dolosos contra a vida. Atuação especializada em plenário do júri, com estratégia jurídica, sustentação oral e condução integral do processo." },
      { t: "AUDIÊNCIA DE CUSTÓDIA", d: "Atendimento imediato em prisões. Atuação urgente para análise da legalidade da prisão, pedido de liberdade provisória e medidas cautelares." },
      { t: "CRIMES CIBERNÉTICOS", d: "Defesa e investigação de crimes digitais. Atuação em fraudes online, invasão de dispositivos, estelionato eletrônico e crimes praticados na internet." }
    ]}
    servicos={[
      { t: "CRIMES EMPRESARIAIS", d: "Responsabilização penal no ambiente corporativo. Defesa em crimes financeiros, tributários, societários e infrações penais ligadas à atividade empresarial.", i: <Search size={28} /> },
      { t: "PRISÃO EM FLAGRANTE", d: "Atendimento 24h em casos de prisão. Acompanhamento imediato na delegacia, análise do flagrante, pedido de relaxamento ou liberdade.", i: <FileText size={28} /> },
      { t: "DEFESA CRIMINAL", d: "Atuação técnica em todas as fases do processo. Defesa estratégica desde o inquérito policial até a fase de julgamento e recursos.", i: <Lock size={28} /> }
    ]}
  />
);

// --- App ---

export default function App() {
  return (
    <HashRouter>
      <BarraNavegacao />
      <Routes>
        <Route path="/" element={<PaginaInicial />} />
        <Route path="/assessoria-empresarial" element={<PaginaEmpresarial />} />
        <Route path="/defesa-criminal" element={<PaginaCriminal />} />
      </Routes>
    </HashRouter>
  );
}
