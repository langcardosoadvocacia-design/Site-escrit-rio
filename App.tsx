import React, { useState, useEffect } from 'react';
import { 
  Building2, Scale, ArrowRight, Menu, X, ReceiptText, 
  ShieldAlert, MessageCircle, AlertCircle, Landmark, 
  FileText, Instagram, Linkedin, MapPin, Mail, Lock, Search, CheckCircle2,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';

// --- CONFIGURAÇÃO DE IMAGENS ---
const IMAGEM_MATHEUS = "/images/advogado.png"; 
const IMG_NICOLAS = "/images/colaborador1.png";
const IMG_JEFFERSON = "/images/colaborador2.png";
const IMG_ESCRITORIO_1 = "/images/escritorio1.PNG";
const IMG_ESCRITORIO_2 = "/images/escritorio2.PNG";
const IMG_ESCRITORIO_3 = "/images/escritorio3.PNG";

const IMG_CHARLISE = "/images/charlise.png";
const IMG_LEANDRO = "/images/leandro.png";
const IMG_CRISTINA = "/images/cristina.png";
const IMG_RAFA = "/images/rafa.png";
const IMG_CARLA = "/images/carla.png";

// --- MENSAGEM DO WHATSAPP ATUALIZADA ---
const MENSAGEM_WA = encodeURIComponent("Olá, vim através do site e preciso de ajuda.");
const LINK_WHATSAPP = `https://wa.me/555532176378?text=${MENSAGEM_WA}`;

const EMAIL_CONTATO = "contato@langcardoso.adv.br";
const LINK_INSTAGRAM = "https://www.instagram.com/langcardosoadvocacia";
const LINK_MAPA = "https://www.google.com/maps/search/?api=1&query=Alameda+Antofagasta,+77+-+401+-+Nossa+Sra.+das+Dores,+Santa+Maria+-+RS,+CEP+97050-660";

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

const BotaoCTA: React.FC<{ texto: string; link?: string; primario?: boolean }> = ({ texto, link = LINK_WHATSAPP, primario = true }) => (
  <a 
    href={link} 
    target="_blank" 
    rel="noopener noreferrer" 
    onClick={primario ? dispararConversaoWhatsApp : undefined} 
    className={`inline-flex items-center gap-4 px-10 py-5 font-bold uppercase text-[10px] tracking-[0.3em] transition-all cursor-pointer shadow-lg rounded-lg
      ${primario ? 'bg-black text-white hover:bg-gray-800' : 'bg-white text-black border border-black hover:bg-gray-50'}`}
  >
    {texto} <ArrowRight size={14} />
  </a>
);

const CardInterativo: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const x = useMotionValue(0); const y = useMotionValue(0);
  const rx = useTransform(useSpring(y, { stiffness: 300, damping: 30 }), [-0.5, 0.5], ["5deg", "-5deg"]);
  const ry = useTransform(useSpring(x, { stiffness: 300, damping: 30 }), [-0.5, 0.5], ["-5deg", "5deg"]);
  return (
    <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }} onMouseMove={(e) => { const b = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - b.left) / b.width - 0.5); y.set((e.clientY - b.top) / b.height - 0.5); }} onMouseLeave={() => { x.set(0); y.set(0); }} className={`bg-white border border-black/10 transition-all overflow-hidden ${className}`}>
      {children}
    </motion.div>
  );
};

const BarraNavegacao = () => {
  const [rolou, setRolou] = useState(false); const [menu, setMenu] = useState(false);
  const local = useLocation();
  const [dropdownAberto, setDropdownAberto] = useState(false);

  useEffect(() => { const mon = () => setRolou(window.scrollY > 20); window.addEventListener('scroll', mon); return () => window.removeEventListener('scroll', mon); }, []);
  
  const areas = [
    { nome: 'Criminal', caminho: '/criminal' },
    { nome: 'Empresarial', caminho: '/empresarial' },
    { nome: 'Trabalhista & Prev', caminho: '/trabalhista' },
    { nome: 'Cível', caminho: '/civel' },
    { nome: 'Imobiliário', caminho: '/imobiliario' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${rolou ? 'py-2 bg-white border-b border-black/5' : 'py-6 bg-transparent'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/"><Logotipo reduzido /></Link>
        <div className="hidden lg:flex gap-10 items-center">
          <Link to="/" className={`text-[10px] font-bold uppercase tracking-widest ${local.pathname === '/' ? 'text-black' : 'text-black/40 hover:text-black'}`}>Início</Link>
          
          <div 
            className="relative"
            onMouseEnter={() => setDropdownAberto(true)}
            onMouseLeave={() => setDropdownAberto(false)}
          >
            <button className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest ${dropdownAberto || areas.some(a => a.caminho === local.pathname) ? 'text-black' : 'text-black/40 hover:text-black'}`}>
              Áreas de Atuação <ChevronDown size={14} className={`transition-transform duration-300 ${dropdownAberto ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {dropdownAberto && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-6 bg-[#2A2A2A] border border-[#3A3A3A] min-w-[280px] shadow-2xl flex flex-col"
                >
                  {areas.map((a, idx) => (
                    <Link 
                      key={a.caminho} 
                      to={a.caminho} 
                      className={`px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-white/80 hover:text-white hover:bg-white/5 transition-colors ${idx !== areas.length - 1 ? 'border-b border-[#3A3A3A]' : ''}`}
                    >
                      {a.nome}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/equipe" className={`text-[10px] font-bold uppercase tracking-widest ${local.pathname === '/equipe' ? 'text-black' : 'text-black/40 hover:text-black'}`}>Equipe</Link>
          
          <a href={LINK_WHATSAPP} onClick={dispararConversaoWhatsApp} className="px-6 py-3 bg-black text-white text-[9px] font-bold uppercase tracking-widest cursor-pointer">Atendimento</a>
        </div>
        <button className="lg:hidden" onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
      </div>
      <AnimatePresence>
        {menu && (
          <motion.div className="lg:hidden bg-white p-8 flex flex-col gap-6 shadow-xl fixed top-20 right-0 w-full z-50 overflow-y-auto max-h-[80vh]">
            <Link to="/" onClick={() => setMenu(false)} className="text-[12px] font-bold uppercase tracking-widest text-black">Início</Link>
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">Áreas de Atuação</span>
              {areas.map(a => (
                <Link key={a.caminho} to={a.caminho} onClick={() => setMenu(false)} className="pl-4 text-[12px] font-bold uppercase tracking-widest text-black/80 border-l border-black/10">{a.nome}</Link>
              ))}
            </div>
            <Link to="/equipe" onClick={() => setMenu(false)} className="text-[12px] font-bold uppercase tracking-widest text-black">Equipe</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- SEÇÕES COMPARTILHADAS ---

const SecaoEquipe = () => {
  const equipe = [
    { n: "Jefferson Cooper", a: "Coordenador Jurídico", d: "Pós Graduado em Direito e Processo do Trabalho; Especialização em Acidentes de Trabalho e Doença Ocupacional, Compliance Empresarial; Especializando em Direito Criminal e Direito Penal.", i: IMG_JEFFERSON },
    { n: "Leandro Garcia", a: "Advogado Associado", d: "OAB 138311. Pós graduado em direito penal e criminologia, especializado em direito condominial.", i: IMG_LEANDRO },
    { n: "Cristina Alves de Almeida", a: "Advogada Associada", d: "OAB/RS 140.508. Bacharel em Direito com sólida experiência no Poder Judiciário. Diretrizes nas áreas de Direito Civil, Trabalhista, Administrativo e Penal Militar.", i: IMG_CRISTINA },
    { n: "Rafaela Bellini Do Nascimento", a: "Advogada Associada", d: "OAB 132.260. Direito Criminal. Direito Cível. Direito Agrario.", i: IMG_RAFA },
    { n: "Carla Augusti Buzzetto", a: "Advogada Associada", d: "OAB 135.016. Direito Previdenciário, Direito do Trabalho.", i: IMG_CARLA },
    { n: "Charlise Martins", a: "Secretária", d: "Atendimento de excelência, organização, recepção e rotinas essenciais do escritório.", i: IMG_CHARLISE },
    { n: "Nicolas Brito", a: "Marketing Estratégico", d: "Produtos Digitais e Modelos de Assinatura (SaaS); Marketing Estratégico; Social Media.", i: IMG_NICOLAS }
  ];
  return (
    <section className="py-24 bg-white border-y border-black/5">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-black/30 mb-6 block">Nosso Time</span>
          <h2 className="text-4xl md:text-6xl font-serif tracking-tighter">Corpo Técnico.</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {equipe.map((m, idx) => (
            <CardInterativo key={idx} className="flex flex-col">
              <div className="aspect-square overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 rounded-full border-4 border-black/5 mx-auto w-48 h-48">
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

// --- PÁGINA INICIAL ---

const PaginaInicial = () => (
  <main className="bg-white">
    {/* 1. HERO SECTION */}
    <section className="min-h-[90vh] flex flex-col justify-center bg-[#fcfcfc] border-b border-black/5 px-6">
      <div className="container mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-black/30 mb-6 block">Lang Cardoso Advocacia</span>
          <h1 className="text-5xl md:text-9xl font-serif tracking-tighter mb-10 leading-[0.9]">
            Estratégia <br /> <span className="italic text-gray-400">Jurídica.</span>
          </h1>
          <p className="text-lg md:text-2xl text-black/50 font-light max-w-2xl border-l border-black/10 pl-8 mb-12">
            Advocacia corporativa de alta complexidade. Inteligência em viabilidade econômica e segurança jurídica para o topo do mercado.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <BotaoCTA texto="CONECTAR AGORA" primario={true} />
            <Link to="/empresarial">
               <BotaoCTA texto="EXPLORAR SOLUÇÕES" primario={false} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>

    {/* 2. DIREITO & NEGÓCIOS */}
    <section className="py-24 bg-white border-b border-black/5">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-black/30 mb-8 block">Direito & Negócios</span>
          <h2 className="text-4xl md:text-6xl font-serif mb-10 tracking-tighter leading-tight">
            A Evolução da <br/> Advocacia de Resultados.
          </h2>
          <div className="pl-6 border-l-2 border-black mb-8">
            <p className="text-lg md:text-xl font-medium text-black mb-4">
              Mudamos a forma de atuar para oferecer uma <span className="underline">gestão jurídica integral</span>, onde o Direito é o motor da viabilidade operacional da sua empresa.
            </p>
          </div>
          <p className="text-black/60 font-light leading-relaxed mb-10">
            Nossa assessoria não foca apenas na lide, mas na estruturação de processos que mitiguem o passivo antes mesmo que ele ocorra. É inteligência técnica aplicada ao lucro.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 content-center">
          {["SEGURANÇA", "COMPLIANCE", "ESTRATÉGIA", "PATRIMÔNIO"].map((item, i) => (
             <div key={i} className="aspect-square flex items-center justify-center border border-black/5 bg-[#fafafa] hover:bg-black hover:text-white transition-all duration-500 cursor-default group">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase">{item}</span>
             </div>
          ))}
        </div>
      </div>
    </section>

    {/* 3. O FUNDADOR */}
    <section className="py-24 md:py-40 container mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center border-b border-black/5">
      <div className="order-2 lg:order-1 relative">
        <img src={IMAGEM_MATHEUS} alt="Matheus Lang Cardoso" className="w-full grayscale shadow-2xl border border-black/5" />
      </div>
      <div className="order-1 lg:order-2">
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-black/30 mb-8 block">O Fundador</span>
        <h2 className="text-5xl font-serif mb-6 tracking-tighter">Matheus Lang Cardoso</h2>
        <p className="text-xl italic text-black/40 font-serif mb-10 leading-relaxed">
          "Nosso compromisso é com a viabilidade do negócio. Transformamos o Direito em uma ferramenta de eficiência prática."
        </p>
        <p className="text-base text-black/70 font-light leading-relaxed mb-8">
          Especialista em Direito Imobiliário e Penal, com visão estratégica multidisciplinar focada em gestão contábil e preservação de ativos corporativos.
        </p>
        
        <ul className="space-y-4 mb-12">
           {[
             "OAB/RS 12.585",
             "MESTRANDO EM DIREITO PELA AMBRA UNIVERSITY",
             "ESPECIALISTA EM DIREITO IMOBILIÁRIO",
             "ESPECIALISTA EM DIREITO PENAL",
             "ESPECIALISTA EM TRIBUNAL DO JÚRI",
             "ESPECIALIZADO EM COBRANÇA JURÍDICA",
             "ESPECIALIZADO EM DIREITO EMPRESARIAL E SOCIETÁRIO"
           ].map((item, i) => (
             <li key={i} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-black/80">
               <CheckCircle2 size={12} className="text-black/30" /> {item}
             </li>
           ))}
        </ul>
        
        <BotaoCTA texto="FALAR COM O FUNDADOR" />
      </div>
    </section>

    {/* 4. SEÇÕES EXTRAS */}
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
              <h3 className="text-xl font-serif mb-4 uppercase tracking-tight">{d.t}</h3>
              <p className="text-xs text-black/50 leading-relaxed font-light">{d.d}</p>
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
              <p className="text-sm text-black/40 font-light leading-relaxed">{s.d}</p>
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
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-10">
          <CardInterativo className="flex flex-col">
              <div className="aspect-square overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 rounded-full border-4 border-black/5 mx-auto w-48 h-48">
                <img src={IMAGEM_MATHEUS} className="w-full h-full object-cover" alt="Dr. Matheus Lang Cardoso" />
              </div>
              <div className="p-8 text-center bg-white flex-grow flex flex-col justify-center">
                <h3 className="font-serif text-2xl mb-2">Dr. Matheus Lang</h3>
                <span className="text-[9px] font-bold uppercase tracking-widest text-black/60 mb-4 block">Sócio Fundador</span>
                <p className="text-[10px] uppercase tracking-wide text-black/40 leading-relaxed">Advocacia corporativa e criminal de alta complexidade.</p>
              </div>
          </CardInterativo>
          {[
          { n: "Jefferson Cooper", a: "Coordenador Jurídico", d: "Pós Graduado em Direito e Processo do Trabalho; Especialização em Acidentes de Trabalho e Doença Ocupacional, Compliance Empresarial; Especializando em Direito Criminal e Direito Penal.", i: IMG_JEFFERSON },
          { n: "Leandro Garcia", a: "Advogado Associado", d: "OAB 138311. Pós graduado em direito penal e criminologia, especializado em direito condominial.", i: IMG_LEANDRO },
          { n: "Cristina Alves de Almeida", a: "Advogada Associada", d: "OAB/RS 140.508. Bacharel em Direito com sólida experiência no Poder Judiciário. Diretrizes nas áreas de Direito Civil, Trabalhista, Administrativo e Penal Militar.", i: IMG_CRISTINA },
          { n: "Rafaela Bellini Do Nascimento", a: "Advogada Associada", d: "OAB 132.260. Direito Criminal. Direito Cível. Direito Agrario.", i: IMG_RAFA },
          { n: "Carla Augusti Buzzetto", a: "Advogada Associada", d: "OAB 135.016. Direito Previdenciário, Direito do Trabalho.", i: IMG_CARLA },
          { n: "Charlise Martins", a: "Secretária", d: "Atendimento de excelência, organização, recepção e rotinas essenciais do escritório.", i: IMG_CHARLISE },
          { n: "Nicolas Brito", a: "Marketing Estratégico", d: "Produtos Digitais e Modelos de Assinatura (SaaS); Marketing Estratégico; Social Media.", i: IMG_NICOLAS }
          ].map((item, idx) => (
             <CardInterativo key={idx} className="flex flex-col">
                 <div className="aspect-square overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 rounded-full border-4 border-black/5 mx-auto w-48 h-48">
                   <img src={item.i} className="w-full h-full object-cover" alt={item.n} />
                 </div>
                 <div className="p-8 text-center bg-white flex-grow flex flex-col justify-center">
                   <h3 className="font-serif text-2xl mb-2">{item.n}</h3>
                   <span className="text-[9px] font-bold uppercase tracking-widest text-black/60 mb-4 block">{item.a}</span>
                   <p className="text-[10px] uppercase tracking-wide text-black/40 leading-relaxed">{item.d}</p>
                 </div>
             </CardInterativo>
          ))}
        </div>
      </section>
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
          <p className="text-xs text-black/40 group-hover:text-black leading-relaxed">
            Alameda Antofagasta, 77 - 401<br/>
            Santa Maria - RS
          </p>
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
    <BrowserRouter>
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
        <Route path="/civel" element={
          <ModeloPaginaServico area="Soluções e Prevenções" titulo="Direito Cível" subtitulo="Consultoria estratégica focada na segurança patrimonial e viabilidade econômica do seu negócio ou vida privada." 
            dores={[
              {t:"Cobranças", d:"Atuação estratégica na recuperação de ativos financeiros através de métodos de cobrança judicial e extrajudicial. Utilizamos técnicas avançadas de inteligência de dados para transformando títulos de crédito em liquidez imediata."}, 
              {t:"CONTRATOS", d:"Desenvolvimento e revisão técnica de instrumentos contratuais personalizados. Nossa prioridade é a blindagem jurídica, estabelecendo cláusulas de proteção que garantam a segurança da negociação."}, 
              {t:"FAMÍLIA E SUCESSÕES", d:"Atendimento especializado em demandas como divórcios, partilhas de bens, pensão alimentícia e inventários. Focamos na solução ética e eficiente, priorizando o mínimo desgaste e máxima preservação patrimonial."}, 
              {t:"CONSULTORIA CÍVEL", d:"Análise contínua e preventiva de relações jurídicas. Oferecemos suporte para a tomada de decisões garantindo que atitudes cotidianas tenham esteio legal seguro sob o Código Civil."}
            ]}
            servicos={[
              {t:"RESPONSABILIDADE CIVIL", d:"Demandas reparatórias para minimizar perdas e danos por eventuais descumprimentos ou acidentes.", i:<AlertCircle size={28}/>}, 
              {t:"EXECUÇÕES", d:"Cobrança ágil com bloqueio de ativos que garanta eficácia do Judiciário e satisfação mais célere do crédito.", i:<Landmark size={28}/>}, 
              {t:"BENS", d:"Soluções integradas para regularizações e pendências judiciais garantindo proteção possessória e petitória.", i:<ReceiptText size={28}/>}
            ]}
          />
        } />
        <Route path="/criminal" element={
          <ModeloPaginaServico area="Direito Penal" titulo="Área Criminal" subtitulo="Atuação tática de excelência técnica com rigor garantista para proteção dos direitos fundamentais e resguardo da liberdade."
            dores={[
              {t:"TRIBUNAL DO JÚRI", d:"Defesa especializada em crimes dolosos contra a vida. Nossa atuação em plenário combina oratória persuasiva, rigor técnico análise de provas, visando a melhor defesa técnica e humana do cliente."}, 
              {t:"ACOMPANHAMENTO EM DELEGACIA", d:"Presença presencial em flagrantes e inquéritos policiais, evitando arbítrios e consolidando uma defesa correta a partir dos primeiros momentos."}, 
              {t:"CIBERNÉTICOS E GOLPES", d:"Atuação especializada em fraudes, estelionatos na internet e crimes onde provas digitais são necessárias. Intermediação técnica e policial de ponta."}, 
              {t:"VIOLÊNCIA DOMÉSTICA", d:"Abordagem correta com a devida técnica penal sob a legislação especial, conferindo proteção sob o rito da Lei Maria da Penha sem excessos e com pleno direito de defesa."}
            ]}
            servicos={[
              {t:"CORPORATIVOS", d:"Defesa corporativa de alta performance contra sistema financeiro, ordem tributária e responsabilizações indevidas a sócios.", i:<Search size={28}/>}, 
              {t:"CUSTÓDIA", d:"Pedido de restabelecimento de liberdade com atuação desde a audiência de custódia e habeas corpus em instâncias superiores.", i:<Lock size={28}/>}, 
              {t:"DEFESA TÉCNICA", d:"Gestão estratégica do processo no TJ, STJ e STF garantindo amplitude do contraditório e buscando sempre nulidades processuais a favor da defesa.", i:<FileText size={28}/>}
            ]}
          />
        } />
        <Route path="/empresarial" element={
          <ModeloPaginaServico area="Corporate & Busines" titulo="Direito Empresarial" subtitulo="Blindagem corporativa, societária e compliance, atuando em conformidade com as exigências regulatórias do mercado."
            dores={[
              {t:"PLANEJAMENTO SOCIETÁRIO", d:"Organização de holdings e estruturas de governança corporativa. Maior eficiência na administração, preparando o negócio para crescimento escalável ou captação de sócios/investidores."}, 
              {t:"RECUPERAÇÃO E FALÊNCIA", d:"Abordagem preventiva com pedidos de recuperação empresarial e acompanhamento minucioso nos casos de liquidação de ativos. Respiro para a empresa sobreviver."}, 
              {t:"CONTRATOS EMPRESARIAIS", d:"Elaboração de memorandos de entendimento (MoU), Acordos de Sócios, Contratos de Vesting, Mútuo Conversível e toda papelada exigida pelas rotinas empresariais de ponta."}, 
              {t:"FRANQUIAS E MARCAS", d:"Estruturação de rede de franqueados e registro ativo de proteção imaterial intelectual ou industrial perante os órgãos de proteção."}
            ]}
            servicos={[
              {t:"DUE DILIGENCE", d:"Levantamento de contingências passivas corporativas prevenindo surpresas na aquisição ou venda de negócios (M&A).", i:<Search size={28}/>}, 
              {t:"COMPLIANCE", d:"Implementação de códigos de conduta visando lisura, Lei Anticorrupção (LGPD) em todas hierarquias da empresa.", i:<Lock size={28}/>}, 
              {t:"DEFESA TRIBUTÁRIA", d:"Análise visando diminuição da carga perante o Fisco e ampla defesa em processos administrativos ou execuções fiscais.", i:<Landmark size={28}/>}
            ]}
          />
        } />
        <Route path="/trabalhista" element={
          <ModeloPaginaServico area="Laboral & SS" titulo="Trabalhista & Previdenciário" subtitulo="Segurança em rotinas laborais, redução de passivos e busca imediata de benefícios assistenciais ou previdenciários."
            dores={[
              {t:"DEFESA TRABALHISTA PATRONAL", d:"Análise de riscos das rotinas e contencioso volumoso; defesa aguerrida em ações propostas pelos colaboradores. Redução do passivo trabalhista por meio de acordos inteligentes ou argumentação técnica."}, 
              {t:"RECLAMATÓRIAS (RECLAMANTE)", d:"Reconhecimento de vínculos, danos morais organizacionais, horas extras devidas e não pagas. Postulação máxima de todos os direitos infringidos pelo empregador."}, 
              {t:"APOSENTADORIAS", d:"Encaminhamento no INSS, planejamento previdenciário e recurso em face de negativas para tempo de contribuição especial, idade, e demais normas afetas do instituto (RPPS e RGPS)."}, 
              {t:"DOENÇAS OCUPACIONAIS", d:"Representação por contestações relativas à afastamentos, auxílio-doença (B31, B91), limbo previdenciário e estabilidades no trabalho, seja sob ótima do obreiro ou empreendedor."}
            ]}
            servicos={[
              {t:"COMPLIANCE TRABALHISTA", d:"Revisão de procedimentos internos como espelho de ponto, contratação, PCMSO, evitando multas na fiscalização.", i:<FileText size={28}/>}, 
              {t:"PLANEJAMENTO", d:"Parecer sobre cenários de aposentadorias que determinam quando é a hora mais rentável para deixar de contribuir ou se afastar.", i:<ReceiptText size={28}/>}, 
              {t:"LOAS E BPC", d:"Pedidos especializados a quem possui critérios estabelecidos de deficiência contínua e impedimento à uma vida compatível socialmente.", i:<CheckCircle2 size={28}/>}
            ]}
          />
        } />
        <Route path="/imobiliario" element={
          <ModeloPaginaServico area="Investimentos & Propriedade" titulo="Direito Imobiliário" subtitulo="Soluções inteligentes que viabilizam o tráfego imobiliário de alta performance sem receio de contingências legais que esvaziem seu imóvel."
            dores={[
              {t:"COMPRA E VENDA", d:"Acompanhamento e assessoria ostensiva desde a minuta inicial até elaboração de escritura no tabelionato. Revisão de certidões e análise real de viabilidade negocial."}, 
              {t:"USUCAPIÃO E REGULARIZAÇÃO", d:"Judicial e extrajudicial. Transformamos a posse num registro pleno assegurando o verdadeiro domínio econômico sobre seu imóvel de fato, para transacioná-lo em mercado aberto."}, 
              {t:"CONTRATOS LOCATÍCIOS", d:"Defesas em despejos ou confecção especializada dos termos de locação residencial, comercial (buit-to-suit), em shoppings centers e afins, com fixação de garantias imbatíveis."}, 
              {t:"INCORPORAÇÕES E CONDOMÍNIOS", d:"Atuação direta para síndicos e incorporadoras, com regularização perante registro de imóveis, confecção de convenção condominial e cobranças extremas de inadimplentes."}
            ]}
            servicos={[
              {t:"DUE DILIGENCE", d:"Apuramos antes toda a vida útil, tributária e cível dos vendedores ou litígios pretéritos envolvendo a terra para evitar surpresas.", i:<Search size={28}/>}, 
              {t:"ARRENDAMENTOS RURAIS", d:"Forte vivência no agronegócio e parceira rural, mitigando atritos nas colheitas e estipulando garantias fortes aos envolvidos.", i:<FileText size={28}/>}, 
              {t:"LEILÕES", d:"Suporte à arrematação imobiliária com estudos de casos sobre processos vigentes, calculando o melhor valuation e desocupando com segurança.", i:<Landmark size={28}/>}
            ]}
          />
        } />
      </Routes>
    </BrowserRouter>
  );
}
