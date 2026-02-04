
import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Scale, 
  ShieldCheck, 
  Gavel, 
  ArrowRight, 
  Menu, 
  X, 
  Percent, 
  HandCoins, 
  ReceiptText, 
  Users,
  MapPin, 
  Mail,
  Instagram,
  Linkedin,
  ShieldAlert,
  MessageCircle,
  ExternalLink,
  ChevronDown,
  Briefcase
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ServicePage } from './ServicePage';

// --- Assets & Constants ---
const WHATSAPP_LINK = "https://wa.me/555532176378";
const INSTAGRAM_LINK = "https://www.instagram.com/langcardosoadvocacia?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";
const DISPLAY_PHONE = "55 55 3217-6378";
const LAWYER_IMAGE = "/images/advogado.png";
const PREMIUM_EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

// --- Sub-components ---

const Logo: React.FC<{ light?: boolean; className?: string; translucent?: boolean }> = ({ light, className = "", translucent = false }) => (
  <motion.div 
    whileHover={{ scale: 1.01 }}
    className={`relative flex flex-col items-center border ${light ? 'border-white' : 'border-black'} 
      ${translucent ? 'bg-white/80 backdrop-blur-md' : 'bg-white'} 
      px-8 py-10 transition-all cursor-pointer shadow-xl ${className}`}
  >
    <span className="text-xl md:text-2xl font-bold text-black tracking-[0.3em] uppercase mb-4">Lang Cardoso</span>
    <div className="relative w-full h-[1.5px] bg-black mb-6">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[1.5px] h-4 bg-black"></div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1.5px] h-4 bg-black"></div>
    </div>
    <span className="text-xs md:text-base font-medium text-black tracking-[0.6em] uppercase">Advocacia</span>
    <span className="absolute bottom-2 right-3 text-[8px] text-black/60 tracking-tight font-normal">OAB/RS 12.585</span>
  </motion.div>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const civelLinks = [
    { name: 'Área Cível', href: '/area-civel' },
    { name: 'Cobrança', href: '/cobranca' },
    { name: 'Imobiliário', href: '/imobiliario' },
    { name: 'Inventário', href: '/inventario' },
    { name: 'Família', href: '/familia' },
    { name: 'Financiamento', href: '/revisao-financiamento' },
    { name: 'Tributário', href: '/tributario' },
    { name: 'Societário', href: '/contrato-social' }
  ];

  const criminalLinks = [
    { name: 'Violência Doméstica', href: '/violencia-domestica' },
    { name: 'Tribunal do Júri', href: '/tribunal-do-juri' },
    { name: 'Custódia', href: '/custodia' },
    { name: 'Cibernéticos', href: '/crimes-ciberneticos' },
    { name: 'Empresariais', href: '/crimes-empresariais' },
    { name: 'Flagrante 24h', href: '/flagrante' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-1000 ${isScrolled || !isHome ? 'py-2 bg-white/95 backdrop-blur-xl shadow-sm' : 'py-10 bg-transparent'}`}>
      <div className="container mx-auto px-8 flex justify-between items-center">
        <Link to="/" className="scale-[0.45] md:scale-[0.55] origin-left">
          {(isScrolled || !isHome) && <Logo translucent />}
        </Link>

        <div className="hidden lg:flex items-center gap-10">
          <Link to="/" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900 hover:text-slate-400">Início</Link>
          
          {/* Cível Dropdown */}
          <div className="dropdown relative group py-4">
            <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900 group-hover:text-slate-400">
              Cível <ChevronDown size={12} />
            </button>
            <div className="dropdown-content mt-2 p-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="grid gap-4">
                {civelLinks.map(link => (
                  <Link key={link.href} to={link.href} className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-500 hover:text-black hover:translate-x-1 transition-all">{link.name}</Link>
                ))}
              </div>
            </div>
          </div>

          {/* Criminal Dropdown */}
          <div className="dropdown relative group py-4">
            <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900 group-hover:text-slate-400">
              Criminal <ChevronDown size={12} />
            </button>
            <div className="dropdown-content mt-2 p-4">
              <div className="grid gap-4">
                {criminalLinks.map(link => (
                  <Link key={link.href} to={link.href} className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-500 hover:text-black hover:translate-x-1 transition-all">{link.name}</Link>
                ))}
              </div>
            </div>
          </div>

          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="px-10 py-4 bg-black text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-slate-800 transition-all shadow-xl flex items-center gap-2">
            <MessageCircle size={14} /> Contato
          </a>
        </div>

        <button className="lg:hidden p-2 text-black" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 p-8 flex flex-col gap-6 shadow-2xl overflow-y-auto max-h-[80vh]">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-xs font-bold uppercase tracking-[0.2em]">Início</Link>
            <div className="border-t pt-4">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-4">Estratégia Cível</span>
              <div className="grid grid-cols-2 gap-4">
                {civelLinks.map(link => <Link key={link.href} to={link.href} onClick={() => setMobileMenuOpen(false)} className="text-[9px] font-bold uppercase text-slate-700">{link.name}</Link>)}
              </div>
            </div>
            <div className="border-t pt-4">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-4">Defesa Criminal</span>
              <div className="grid grid-cols-2 gap-4">
                {criminalLinks.map(link => <Link key={link.href} to={link.href} onClick={() => setMobileMenuOpen(false)} className="text-[9px] font-bold uppercase text-slate-700">{link.name}</Link>)}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const WhatsAppFloating = () => (
  <motion.a 
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    whileHover={{ scale: 1.1, y: -5 }}
    href={WHATSAPP_LINK}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-10 right-10 z-[100] bg-black text-white p-6 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.3)] flex items-center justify-center border border-white/20"
  >
    <MessageCircle size={28} />
  </motion.a>
);

// --- Main Pages ---

const Home = () => {
  const { scrollYProgress } = useScroll();
  const yRange = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const heroImageScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center pt-32 md:pt-40 overflow-hidden">
        <div className="container mx-auto px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 md:gap-20 items-start">
            <div className="lg:col-span-7 relative">
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: PREMIUM_EASE }} className="mb-16 md:mb-24 relative z-30 inline-block">
                <Logo className="scale-[0.8] md:scale-[0.9] origin-left" translucent />
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 1.5, ease: PREMIUM_EASE }} className="relative z-10">
                <h1 className="text-6xl md:text-9xl font-serif text-slate-900 leading-[0.85] mb-12 tracking-tighter">
                  Estratégia <br /> <span className="italic font-light text-slate-400">Jurídica.</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-500 max-w-md mb-14 leading-relaxed font-light">Advocacia corporativa de alta complexidade. Inteligência em viabilidade econômica e segurança jurídica para o topo do mercado.</p>
                <div className="flex flex-col sm:flex-row gap-8">
                  <motion.a whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }} href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="px-14 py-7 bg-black text-white font-bold uppercase text-xs tracking-[0.4em] shadow-3xl transition-all flex items-center gap-4">Conectar Agora <MessageCircle size={18} /></motion.a>
                </div>
              </motion.div>
            </div>
            <div className="lg:col-span-5 relative mt-20 lg:mt-0">
              <motion.div style={{ scale: heroImageScale, y: yRange }} className="relative z-10 p-4 bg-white shadow- luxury rounded-sm border border-slate-100 overflow-hidden group">
                <img src={LAWYER_IMAGE} alt="Matheus Lang Cardoso" className="w-full grayscale group-hover:grayscale-0 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-10">
                  <span className="text-white text-2xl font-serif">Matheus Lang Cardoso</span>
                  <span className="text-white/60 text-[10px] uppercase tracking-widest mt-2">Sócio Fundador</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section id="sobre" className="py-40 bg-slate-50 overflow-hidden relative z-20">
        <div className="container mx-auto px-8">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <div className="lg:w-1/2">
              <img src={LAWYER_IMAGE} alt="Matheus Lang Cardoso" className="w-full grayscale shadow-3xl max-w-md mx-auto border p-2 bg-white" />
            </div>
            <div className="lg:w-1/2">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-400 block mb-6">O Fundador</span>
              <h2 className="text-5xl md:text-7xl font-serif text-slate-900 leading-tight mb-12">Matheus Lang Cardoso</h2>
              <div className="space-y-12 text-slate-600">
                <p className="text-2xl text-slate-400 font-light italic">"Transformamos o Direito em uma ferramenta de eficiência prática para o mundo dos negócios."</p>
                <div className="grid gap-6">
                  {["OAB/RS 12.585", "Especialista em Direito Imobiliário e Penal", "Pós-graduando em Gestão Contábil"].map((edu, i) => (
                    <div key={i} className="flex items-center gap-4 group"><div className="w-2 h-2 bg-black group-hover:w-6 transition-all duration-500"></div><span className="text-[11px] font-bold uppercase tracking-widest">{edu}</span></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer minimal */}
      <footer className="py-20 bg-white border-t border-slate-100">
        <div className="container mx-auto px-8 flex justify-between items-center">
          <Logo className="scale-50 origin-left" />
          <div className="flex gap-8">
            <Instagram size={24} className="text-slate-300 hover:text-black transition-colors" />
            <Linkedin size={24} className="text-slate-300 hover:text-black transition-colors" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <WhatsAppFloating />
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Cível Routes */}
        <Route path="/area-civel" element={<ServicePage LogoComponent={Logo} subtitle="Direito Civil Estratégico" title="Soluções Cíveis de Alta Complexidade" description={`Consultoria preventiva e contenciosa focada na desjudicialização e na proteção de interesses fundamentais.\n\nAtuamos na elaboração de pareceres técnicos, mediação de conflitos e representação estratégica em tribunais superiores para garantir a segurança jurídica de nossos clientes.`} />} />
        <Route path="/cobranca" element={<ServicePage LogoComponent={Logo} subtitle="Gestão de Ativos" title="Recuperação de Crédito Jurídico" description={`Metodologia própria para recuperação de recebíveis com foco na liquidez corporativa.\n\nUnimos inteligência de dados à pressão jurídica técnica para reaver ativos de forma célere e ética, mitigando o impacto financeiro da inadimplência em sua operação.`} />} />
        <Route path="/imobiliario" element={<ServicePage LogoComponent={Logo} subtitle="Patrimônio" title="Inteligência Imobiliária de Elite" description={`Gestão jurídica completa para transações de alto valor, regularizações e estruturação de holdings patrimoniais.\n\nProtegemos seu investimento imobiliário através de due diligence rigorosa e conformidade documental absoluta.`} />} />
        <Route path="/inventario" element={<ServicePage LogoComponent={Logo} subtitle="Sucessório" title="Planejamento e Inventários" description={`Condução sensível e técnica de processos sucessórios, priorizando a preservação do patrimônio familiar.\n\nEspecialistas em inventários judiciais e extrajudiciais, focados na resolução harmoniosa e tributariamente eficiente da transmissão de bens.`} />} />
        <Route path="/familia" element={<ServicePage LogoComponent={Logo} subtitle="Direito de Família" title="Proteção e Planejamento Familiar" description={`Assessoria jurídica focada no planejamento sucessório e gestão de conflitos familiares com discrição absoluta.\n\nAtuamos em divórcios complexos, partilhas e estruturação de pactos antenupciais para garantir a tranquilidade de todas as partes.`} />} />
        <Route path="/revisao-financiamento" element={<ServicePage LogoComponent={Logo} subtitle="Bancário" title="Revisão de Juros e Financiamentos" description={`Análise pericial de contratos de financiamento para identificar abusividades e reequilibrar a relação contratual.\n\nFoco na redução de parcelas e eliminação de taxas indevidas, restaurando a saúde financeira de sua empresa ou patrimônio pessoal.`} />} />
        <Route path="/tributario" element={<ServicePage LogoComponent={Logo} subtitle="Fiscal" title="Estratégia Tributária e Compliance" description={`Otimização da carga tributária através de teses jurídicas sólidas e conformidade fiscal preventiva.\n\nAuxiliamos empresas na recuperação de créditos e na defesa contra autuações fiscais, transformando o passivo tributário em oportunidade estratégica.`} />} />
        <Route path="/contrato-social" element={<ServicePage LogoComponent={Logo} subtitle="Societário" title="Estruturação de Contratos e Acordos" description={`Design jurídico de contratos sociais e acordos de acionistas para prevenir conflitos e garantir a perenidade do negócio.\n\nModelamos sua empresa desde a base, prevendo mecanismos de saída e proteção contra riscos operacionais e sucessórios.`} />} />

        {/* Criminal Routes */}
        <Route path="/violencia-domestica" element={<ServicePage LogoComponent={Logo} subtitle="Defesa Técnica" title="Proteção e Direito da Família" description={`Defesa técnica especializada em contextos de alta vulnerabilidade, assegurando o cumprimento estrito das garantias constitucionais.\n\nAtendimento humanizado e estratégico focado na resolução justa e na proteção da integridade de nossos constituintes.`} />} />
        <Route path="/tribunal-do-juri" element={<ServicePage LogoComponent={Logo} subtitle="Criminal Especializado" title="Tribunal do Júri de Alta Performance" description={`Defesa técnica perante o Conselho de Sentença em crimes dolosos contra a vida. Experiência e oratória de elite.\n\nA atuação no Plenário do Júri exige precisão absoluta, análise pericial detalhada e uma estratégia defensiva inabalável.`} />} />
        <Route path="/custodia" element={<ServicePage LogoComponent={Logo} subtitle="Liberdade" title="Audiências de Custódia e Garantias" description={`Atuação imediata em audiências de custódia para garantir a legalidade da prisão e a preservação dos direitos fundamentais.\n\nFocamos na viabilidade da liberdade provisória e no controle de convencionalidade das prisões preventivas.`} />} />
        <Route path="/crimes-ciberneticos" element={<ServicePage LogoComponent={Logo} subtitle="Direito Digital" title="Defesa em Crimes Informáticos" description={`Especialistas em fraudes digitais, invasões de dispositivos e crimes contra a honra no ambiente cibernético.\n\nUtilizamos perícia técnica digital aliada à estratégia jurídica para proteger a reputação e os ativos digitais de nossos clientes.`} />} />
        <Route path="/crimes-empresariais" element={<ServicePage LogoComponent={Logo} subtitle="Compliance Penal" title="Direito Penal Econômico" description={`Defesa estratégica em crimes contra a ordem tributária, sistema financeiro e crimes de colarinho branco.\n\nAssessoria em compliance penal para prevenir riscos institucionais e proteger a diretoria de responsabilidades criminais indevidas.`} />} />
        <Route path="/flagrante" element={<ServicePage LogoComponent={Logo} subtitle="Urgência 24h" title="Atendimento Especializado em Flagrante" description={`Plantão jurídico permanente para atendimento imediato em situações de prisão em flagrante e diligências policiais.\n\nA presença imediata de um advogado de elite é crucial para evitar nulidades e garantir que nenhuma ilegalidade seja cometida desde os primeiros momentos.`} />} />
      </Routes>
    </BrowserRouter>
  );
}
