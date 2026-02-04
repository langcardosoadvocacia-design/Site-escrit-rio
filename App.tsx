
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
  Users,
  ShieldAlert,
  MessageCircle,
  ChevronDown,
  AlertCircle,
  CheckCircle2,
  Lock,
  Search,
  Users2,
  Landmark,
  FileText,
  Instagram,
  Linkedin
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';

// --- Constantes ---
const WHATSAPP_LINK = "https://wa.me/555532176378";
const INSTAGRAM_LINK = "https://www.instagram.com/langcardosoadvocacia";
const LAWYER_IMAGE = "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800"; 
const PREMIUM_EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

// --- Componentes de UI ---

/**
 * Logo Component - Réplica exata da imagem enviada (Design Minimalista Premium)
 */
const Logo: React.FC<{ className?: string; translucent?: boolean }> = ({ 
  className = "", 
  translucent = false 
}) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className={`relative flex flex-col items-center border-[1.5px] border-black 
        ${translucent ? 'bg-white/40 backdrop-blur-xl' : 'bg-white'} 
        px-12 py-14 transition-all cursor-pointer shadow-sm ${className}`}
    >
      <span className="text-2xl md:text-3xl font-bold text-black tracking-[0.15em] uppercase mb-4 font-sans">
        Lang Cardoso
      </span>
      
      {/* Linha com limitadores (ticks) conforme a imagem original */}
      <div className="relative w-full h-[1.5px] bg-black mb-4">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[1.5px] h-3 bg-black"></div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1.5px] h-3 bg-black"></div>
      </div>
      
      <span className="text-xl md:text-2xl font-bold text-black tracking-[0.3em] uppercase mb-8 font-sans">
        Advocacia
      </span>
      
      <span className="absolute bottom-4 right-5 text-[9px] text-black font-medium tracking-tighter opacity-70">
        OAB/RS 12.585
      </span>
    </motion.div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${isScrolled ? 'py-2 bg-white/70 backdrop-blur-2xl border-b border-black/5 shadow-sm' : 'py-10 bg-transparent'}`}>
      <div className="container mx-auto px-8 flex justify-between items-center">
        <Link to="/" className="scale-[0.3] md:scale-[0.4] origin-left">
          <Logo translucent />
        </Link>

        <div className="hidden lg:flex items-center gap-14">
          <Link to="/assessoria-empresarial" className={`text-[10px] font-bold uppercase tracking-[0.4em] transition-all ${location.pathname === '/assessoria-empresarial' ? 'text-[#D4AF37]' : 'text-black/40 hover:text-black'}`}>Empresarial</Link>
          <Link to="/defesa-criminal" className={`text-[10px] font-bold uppercase tracking-[0.4em] transition-all ${location.pathname === '/defesa-criminal' ? 'text-[#D4AF37]' : 'text-black/40 hover:text-black'}`}>Criminal</Link>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="px-10 py-5 bg-black text-white text-[10px] font-bold uppercase tracking-[0.5em] hover:bg-[#D4AF37] hover:text-black transition-all shadow-xl">
            Consulta Técnica
          </a>
        </div>

        <button className="lg:hidden p-2 text-black" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-3xl border-b border-black/5 p-10 flex flex-col gap-8 shadow-2xl">
            <Link to="/assessoria-empresarial" onClick={() => setMobileMenuOpen(false)} className="text-xs font-bold uppercase tracking-[0.3em] text-black">Assessoria Empresarial</Link>
            <Link to="/defesa-criminal" onClick={() => setMobileMenuOpen(false)} className="text-xs font-bold uppercase tracking-[0.3em] text-black">Defesa Criminal</Link>
            <a href={WHATSAPP_LINK} className="w-full py-6 bg-black text-white text-center text-[10px] font-bold uppercase tracking-[0.3em]">WhatsApp Direto</a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const WhatsAppFloating = () => (
  <motion.a 
    initial={{ scale: 0 }} animate={{ scale: 1 }} whileHover={{ scale: 1.1 }}
    href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
    className="fixed bottom-10 right-10 z-[100] bg-white text-[#25D366] p-5 rounded-full shadow-2xl flex items-center justify-center border border-black/5"
  >
    <MessageCircle size={32} fill="currentColor" />
  </motion.a>
);

// --- Layout Template ---

interface ServiceProps {
  title: string;
  desc: string;
  icon: React.ReactNode;
}

interface LayoutProps {
  type: 'empresarial' | 'criminal';
  headline: string;
  subheadline: string;
  painTitle: string;
  painPoints: { title: string; desc: string }[];
  stepsTitle: string;
  steps: { title: string; desc: string }[];
  services: ServiceProps[];
  bio: string;
}

const LayoutServico: React.FC<LayoutProps> = ({ 
  type, headline, subheadline, painTitle, painPoints, stepsTitle, steps, services, bio 
}) => {
  useEffect(() => { window.scrollTo(0, 0); }, [type]);

  return (
    <div className="bg-[#FFFFFF] text-black min-h-screen selection:bg-black selection:text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center pt-32 overflow-hidden bg-[#FAFAFA]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(212,175,55,0.03)_0%,_transparent_60%)] pointer-events-none" />
        <div className="container mx-auto px-8 relative z-10">
          <div className="max-w-6xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: PREMIUM_EASE }}>
              <span className="text-[10px] font-bold uppercase tracking-[1em] text-[#D4AF37] mb-12 block">
                Exclusividade & Estratégia
              </span>
              <h1 className="text-6xl md:text-[10rem] font-serif text-black leading-[0.85] mb-14 tracking-tighter">
                {headline}
              </h1>
              <p className="text-xl md:text-3xl text-black/40 font-light leading-relaxed mb-16 max-w-4xl border-l-[3px] border-[#D4AF37] pl-12">
                {subheadline}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-8">
                <a href={WHATSAPP_LINK} className="px-20 py-10 bg-black text-white font-bold uppercase text-[10px] tracking-[0.5em] hover:bg-[#D4AF37] hover:text-black transition-all shadow-2xl flex items-center gap-4">
                  Consulta de Elite <ArrowRight size={18} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
        
        <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-12 left-1/2 -translate-x-1/2 text-black/20 flex flex-col items-center">
          <span className="text-[8px] font-bold uppercase tracking-[0.4em] mb-2">Scroll</span>
          <ChevronDown size={16} />
        </motion.div>
      </section>

      {/* Pain Points (Dores) */}
      <section className="py-48 relative bg-white border-y border-black/[0.03]">
        <div className="container mx-auto px-8">
          <div className="text-center mb-32 max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-8xl font-serif mb-10 italic">{painTitle}</h2>
            <div className="h-[2px] w-32 bg-[#D4AF37] mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {painPoints.map((point, idx) => (
              <motion.div 
                key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
                className="p-14 bg-[#FDFDFD] border border-black/[0.05] hover:border-[#D4AF37]/40 hover:bg-white transition-all duration-700 shadow-sm hover:shadow-2xl"
              >
                <AlertCircle className="text-[#D4AF37] mb-12" size={36} strokeWidth={1} />
                <h3 className="text-2xl font-serif mb-6 text-black uppercase tracking-tight">{point.title}</h3>
                <p className="text-black/50 text-sm leading-relaxed font-light">{point.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-28 text-center">
             <a href={WHATSAPP_LINK} className="px-14 py-8 bg-white border border-black text-black font-bold uppercase text-[10px] tracking-[0.5em] hover:bg-black hover:text-white transition-all">
                Desejo Atuação Técnica Agora
             </a>
          </div>
        </div>
      </section>

      {/* Metodologia */}
      <section className="py-48 bg-[#FAFAFA] overflow-hidden">
        <div className="container mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-black/30 mb-12 block">{stepsTitle}</span>
              <h2 className="text-7xl md:text-9xl font-serif mb-20 leading-[0.9] tracking-tighter">Nosso <br /> <span className="italic text-[#D4AF37]">Rigor.</span></h2>
              
              <div className="space-y-20">
                {steps.map((step, idx) => (
                  <div key={idx} className="flex gap-12 group">
                    <div className="text-5xl font-serif text-black/5 group-hover:text-[#D4AF37]/30 transition-colors">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold uppercase tracking-[0.3em] mb-4 text-black">/ {step.title}</h4>
                      <p className="text-black/40 text-lg font-light leading-relaxed max-w-md">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-[#D4AF37]/5 blur-[100px] rounded-full" />
              <motion.div whileHover={{ scale: 1.01 }} className="relative z-10 border-[1.5px] border-black/5 bg-white p-6 shadow-2xl">
                <img src={LAWYER_IMAGE} alt="Matheus" className="w-full grayscale filter contrast-125 object-cover aspect-[3/4]" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Áreas de Atuação */}
      <section className="py-48 bg-white">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12 border-b border-black/5 pb-20">
            <div className="max-w-3xl">
              <h2 className="text-7xl md:text-9xl font-serif tracking-tighter italic">Expertise.</h2>
              <p className="text-black/40 mt-8 text-xl font-light">Especialização cirúrgica para demandas de alta complexidade.</p>
            </div>
            <a href={WHATSAPP_LINK} className="px-14 py-8 bg-black text-white font-bold uppercase text-[10px] tracking-[0.5em] hover:bg-[#D4AF37] hover:text-black transition-all">
               Falar com Especialista
            </a>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-black/5 border border-black/5">
            {services.map((service, idx) => (
              <div key={idx} className="p-16 bg-white hover:bg-[#FDFDFD] transition-all duration-500 group">
                <div className="text-black/30 mb-12 group-hover:text-[#D4AF37] transition-colors">{service.icon}</div>
                <h3 className="text-3xl font-serif mb-8 tracking-tight">{service.title}</h3>
                <p className="text-black/40 text-sm leading-relaxed font-light">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Autoridade & Bio */}
      <section className="py-48 bg-[#FAFAFA] relative">
        <div className="container mx-auto px-8">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-32">
            <div className="lg:w-2/5">
              <Logo className="mb-20 scale-90" translucent />
              <div className="aspect-[3/4] overflow-hidden grayscale border border-black/5 p-4 bg-white shadow-xl">
                <img src={LAWYER_IMAGE} alt="Matheus" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="lg:w-3/5">
              <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-[#D4AF37] mb-12 block">Estrategista Jurídico</span>
              <h2 className="text-6xl md:text-[7.5rem] font-serif mb-16 tracking-tighter leading-tight text-black">Matheus <br /> Lang Cardoso</h2>
              <p className="text-2xl text-black/50 font-light mb-20 italic leading-relaxed border-l-2 border-[#D4AF37] pl-12">
                "{bio}"
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {[
                  "Inscrição OAB/RS 12.585",
                  "Especialista Imobiliário",
                  "Defesa no Tribunal do Júri",
                  "Consultoria de Blindagem Elite"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 group">
                    <CheckCircle2 size={24} className="text-[#D4AF37] group-hover:scale-110 transition-transform" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-black/70">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer & CTA Final */}
      <footer className="py-48 bg-white border-t border-black/5 text-center relative overflow-hidden">
        <div className="container mx-auto px-8">
          <Logo className="scale-[0.4] mx-auto mb-32" />
          <h2 className="text-6xl md:text-[11rem] font-serif mb-32 tracking-tighter leading-[0.8] text-black">Estratégia <br /> <span className="text-[#D4AF37] italic">Inabalável.</span></h2>
          
          <a href={WHATSAPP_LINK} className="inline-block px-28 py-12 bg-black text-white font-bold uppercase text-[11px] tracking-[1em] hover:bg-[#D4AF37] hover:text-black transition-all shadow-2xl transform hover:-translate-y-1">
            Iniciar Atendimento
          </a>
          
          <div className="mt-48 pt-24 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-14">
            <div className="text-left">
              <p className="text-[10px] font-bold uppercase tracking-[0.8em] text-black/20 mb-3">Sede Santa Maria | RS</p>
              <p className="text-[10px] text-black/40 tracking-[0.3em] font-medium">Alameda Montevideo, 322, Sala 108</p>
            </div>
            <div className="flex gap-14 items-center">
              <a href={INSTAGRAM_LINK} target="_blank" className="text-black/30 hover:text-black transition-all"><Instagram size={22} /></a>
              <a href="#" className="text-black/30 hover:text-black transition-all"><Linkedin size={22} /></a>
              <div className="w-px h-8 bg-black/10 mx-2" />
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-black/20">© 2025 Lang Cardoso</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- Páginas Específicas ---

const EmpresarialPage = () => (
  <LayoutServico 
    type="empresarial"
    headline="Corporate Protection."
    subheadline="Blindagem jurídica e arquitetura de ativos focada na perenidade econômica e na proteção máxima de operações empresariais de alto valor."
    painTitle="Onde moram os riscos da sua empresa?"
    painPoints={[
      { title: "Bloqueio de Contas", desc: "Intervenção técnica urgente contra execuções fiscais ou bancárias que travam a saúde financeira." },
      { title: "Passivo Trabalhista", desc: "Redução de danos e implementação de compliance preventivo para estancar novas demandas laborais." },
      { title: "Proteção de Sócios", desc: "Engenharia societária para separação absoluta entre patrimônio pessoal e riscos do negócio." },
      { title: "Fragilidade Contratual", desc: "Revisão rigorosa de acordos comerciais para eliminar vulnerabilidades de alto impacto financeiro." }
    ]}
    stepsTitle="Workflow Estratégico"
    steps={[
      { title: "Audit & Analysis", desc: "Mapeamento cirúrgico de cada vulnerabilidade legal e financeira oculta na sua operação." },
      { title: "Active Shielding", desc: "Implementação imediata de camadas de proteção societária e reestruturação de garantias." },
      { title: "Continuity Plan", desc: "Acompanhamento permanente para viabilizar novos negócios sob segurança jurídica absoluta." }
    ]}
    services={[
      { title: "Cível Estratégico", desc: "Contencioso focado na desoneração de passivos e resoluções táticas de caixa.", icon: <Scale size={32} /> },
      { title: "Recuperação de Ativos", desc: "Inteligência jurídica para reaver créditos com máxima liquidez e agilidade técnica.", icon: <HandCoins size={32} /> },
      { title: "Direito Imobiliário", desc: "Due diligence em transações premium e regularização de holdings patrimoniais.", icon: <Landmark size={32} /> },
      { title: "Tributário Elite", desc: "Otimização da carga fiscal e defesas técnicas contra autuações administrativas severas.", icon: <ReceiptText size={32} /> },
      { title: "Partnership Design", desc: "Modelagem de contratos sociais e acordos de acionistas focados em proteção mútua.", icon: <FileText size={32} /> },
      { title: "Succession Planning", desc: "Planejamento focado na preservação do legado e gestão suave de ativos familiares.", icon: <Users2 size={32} /> }
    ]}
    bio="Minha missão é transformar o Direito em uma ferramenta de viabilidade. Na Lang Cardoso, atuamos como parceiros estratégicos para que o empresário foque no crescimento com segurança total."
  />
);

const CriminalPage = () => (
  <LayoutServico 
    type="criminal"
    headline="Criminal Intelligence."
    subheadline="Defesa técnica de urgência com rigor garantista. Onde a liberdade é tratada com a gravidade que a excelência exige."
    painTitle="Urgência Criminal?"
    painPoints={[
      { title: "Prisão em Flagrante", desc: "Atendimento imediato 24h para controle de legalidade e audiências de custódia preventivas." },
      { title: "Fase de Inquérito", desc: "Acompanhamento técnico precoce para evitar produção de provas viciadas e abusos de autoridade." },
      { title: "Tribunal do Júri", desc: "Defesa especializada em crimes dolosos contra a vida com oratória persuasiva e técnica de elite." },
      { title: "Delitos Digitais", desc: "Estratégia defensiva em fraudes eletrônicas e crimes cibernéticos com perícia avançada." }
    ]}
    stepsTitle="Defesa em 3 Atos"
    steps={[
      { title: "Emergency Action", desc: "Presença física imediata em delegacias e tribunais para controle de danos reais e direitos." },
      { title: "Forensic Analysis", desc: "Investigação defensiva profunda para desarticular a narrativa acusatória com provas técnicas." },
      { title: "Court Litigation", desc: "Atuação vigorosa em plenário para garantir a justiça constitucional e o devido processo legal." }
    ]}
    services={[
      { title: "Plantão Criminal 24h", desc: "Atendimento exclusivo para diligências urgentes e salvaguarda de direitos fundamentais.", icon: <ShieldAlert size={32} /> },
      { title: "Tribunal do Júri", desc: "Especialista em Plenário, defendendo a liberdade com oratória técnica e vigorosa.", icon: <Gavel size={32} /> },
      { title: "White Collar Crime", desc: "Defesa em crimes contra a ordem tributária, sistema financeiro e compliance penal.", icon: <Building2 size={32} /> },
      { title: "Audiência Técnica", desc: "Presença combativa para garantir o estrito cumprimento de todas as garantias processuais.", icon: <Scale size={32} /> },
      { title: "Cyber Defense", desc: "Atuação jurídica em crimes informáticos com auxílio de alta tecnologia forense.", icon: <Lock size={32} /> },
      { title: "Instâncias Superiores", desc: "Recursos em tribunais superiores (STJ/STF) para correção de nulidades e arbitrariedades.", icon: <Search size={32} /> }
    ]}
    bio="Atuamos como um escudo contra o excesso. No Direito Criminal, a técnica precede a retórica. Cada processo é tratado com a gravidade que a liberdade humana exige."
  />
);

// --- App Root ---

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <WhatsAppFloating />
      <Routes>
        <Route path="/" element={<EmpresarialPage />} />
        <Route path="/assessoria-empresarial" element={<EmpresarialPage />} />
        <Route path="/defesa-criminal" element={<CriminalPage />} />
      </Routes>
    </BrowserRouter>
  );
}
