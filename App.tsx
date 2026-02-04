
import React, { useState, useEffect, useRef } from 'react';
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
  Linkedin,
  MapPin,
  Clock,
  Briefcase
} from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';

// --- Constantes ---
const WHATSAPP_LINK = "https://wa.me/555532176378";
const INSTAGRAM_LINK = "https://www.instagram.com/langcardosoadvocacia";
const LAWYER_IMAGE = "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800"; 
const PREMIUM_EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

// --- Componentes de UI ---

const Logo: React.FC<{ className?: string; translucent?: boolean; small?: boolean }> = ({ 
  className = "", 
  translucent = false,
  small = false
}) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.01 }}
      className={`relative flex flex-col items-center border-[1.5px] border-black 
        ${translucent ? 'bg-white/40 backdrop-blur-xl' : 'bg-white'} 
        ${small ? 'px-6 py-8' : 'px-10 md:px-12 py-12 md:py-14'} transition-all cursor-pointer shadow-sm ${className}`}
    >
      <span className={`${small ? 'text-base' : 'text-xl md:text-3xl'} font-bold text-black tracking-[0.15em] uppercase mb-2 md:mb-3 font-sans text-center`}>
        Lang Cardoso
      </span>
      
      <div className="relative w-full h-[1.2px] bg-black mb-2 md:mb-3">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[1.2px] h-3 bg-black"></div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1.2px] h-3 bg-black"></div>
      </div>
      
      <span className={`${small ? 'text-xs' : 'text-lg md:text-2xl'} font-bold text-black tracking-[0.3em] uppercase mb-4 md:mb-6 font-sans text-center`}>
        Advocacia
      </span>
      
      {!small && (
        <span className="hidden md:block absolute bottom-4 right-5 text-[9px] text-black font-medium tracking-tighter opacity-70">
          OAB/RS 12.585
        </span>
      )}
    </motion.div>
  );
};

/**
 * GlassCard3D - Otimizado para responsividade
 * Desabilita rotação em telas pequenas para evitar saltos visuais em touch.
 */
const GlassCard3D: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  // Rotação sutil em desktop, desativada via lógica de movimento em mobile
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    // Apenas aplica se for mouse (não touch)
    if (window.matchMedia("(pointer: fine)").matches) {
      const rect = event.currentTarget.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const xPct = mouseX / width - 0.5;
      const yPct = mouseY / height - 0.5;

      x.set(xPct);
      y.set(yPct);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative group h-full w-full bg-white/40 backdrop-blur-3xl border border-black/[0.05] transition-all duration-500 neon-glow-hover overflow-hidden ${className}`}
    >
      <div 
        style={{ transform: "translateZ(30px)" }} 
        className="relative z-10 h-full w-full"
      >
        {children}
      </div>
      
      {/* Reflexo de luz dinâmico apenas em desktop */}
      <motion.div
        className="hidden lg:block absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          transform: "translateZ(15px)",
        }}
      />
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

  // Fecha o menu ao mudar de rota
  useEffect(() => {
    setMobileMenuOpen(false);
    if (mobileMenuOpen) {
      document.body.style.overflow = 'unset';
    }
  }, [location]);

  const toggleMobileMenu = () => {
    const newState = !mobileMenuOpen;
    setMobileMenuOpen(newState);
    document.body.style.overflow = newState ? 'hidden' : 'unset';
  };

  const links = [
    { name: 'Início', path: '/' },
    { name: 'Empresarial & Cível', path: '/assessoria-empresarial' },
    { name: 'Criminal', path: '/defesa-criminal' }
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-[100] transition-all duration-700 ease-in-out
        ${isScrolled || mobileMenuOpen
          ? 'py-3 md:py-4 bg-white/80 backdrop-blur-2xl border-b border-black/5 shadow-sm' 
          : 'py-8 md:py-12 bg-transparent'
        }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo responsiva */}
        <Link to="/" className={`transition-all duration-500 origin-left ${isScrolled ? 'scale-[0.22] md:scale-[0.25]' : 'scale-[0.28] md:scale-[0.35]'}`}>
          <Logo translucent />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-12">
          <div className="flex items-center gap-10">
            {links.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className="group relative py-2"
              >
                <span className={`text-[9px] font-bold uppercase tracking-[0.5em] transition-all duration-500 
                  ${location.pathname === link.path ? 'text-[#D4AF37]' : 'text-black/50 hover:text-black'}`}
                >
                  {link.name}
                </span>
                {location.pathname === link.path && (
                  <motion.div 
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 w-full h-[1px] bg-[#D4AF37]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>
          
          <a 
            href={WHATSAPP_LINK} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group relative px-8 py-4 bg-black overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[#D4AF37]/10"
          >
            <div className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative z-10 text-white group-hover:text-black text-[9px] font-bold uppercase tracking-[0.5em] transition-colors duration-500">
              Atendimento Prioritário
            </span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden p-3 text-black z-[110] bg-black/5 rounded-full backdrop-blur-md" 
          onClick={toggleMobileMenu}
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile Menu Overlay & Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobileMenu}
              className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-[101] h-screen"
            />
            {/* Drawer */}
            <motion.div 
              initial={{ x: '100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '100%' }} 
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed top-0 right-0 w-[85%] sm:w-[350px] h-screen bg-white z-[102] shadow-[-20px_0_60px_rgba(0,0,0,0.1)] flex flex-col"
            >
              <div className="p-10 pt-32 flex flex-col gap-8 flex-grow">
                {links.map((link, idx) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Link 
                      to={link.path} 
                      className={`text-[11px] font-bold uppercase tracking-[0.4em] block py-4 transition-colors
                        ${location.pathname === link.path ? 'text-[#D4AF37] border-b border-[#D4AF37]/20' : 'text-black border-b border-black/5'}`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              <div className="p-10 border-t border-black/5 bg-[#FAFAFA]">
                <span className="text-[10px] font-bold uppercase tracking-widest text-black/30 mb-6 block">Emergência e Contato</span>
                <a 
                  href={WHATSAPP_LINK} 
                  className="w-full flex items-center justify-center gap-3 py-6 bg-black text-white text-[10px] font-bold uppercase tracking-[0.4em] shadow-xl hover:bg-[#D4AF37] hover:text-black transition-all"
                >
                  <MessageCircle size={16} /> WhatsApp Direto
                </a>
                <div className="mt-8 flex gap-6">
                   <a href={INSTAGRAM_LINK} target="_blank" className="text-black/30 hover:text-black"><Instagram size={20} /></a>
                   <a href="#" className="text-black/30 hover:text-black"><Linkedin size={20} /></a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

const WhatsAppFloating = () => (
  <motion.a 
    initial={{ scale: 0 }} animate={{ scale: 1 }} whileHover={{ scale: 1.1 }}
    href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
    className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[90] bg-white text-[#25D366] p-4 md:p-5 rounded-full shadow-2xl flex items-center justify-center border border-black/5 backdrop-blur-xl transition-all"
  >
    <MessageCircle size={28} md:size={32} fill="currentColor" />
  </motion.a>
);

// --- Componentes de Seção ---

const HomePage = () => {
  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Home */}
      <section className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-center pt-24 md:pt-32 bg-[#FAFAFA]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_rgba(212,175,55,0.05)_0%,_transparent_60%)] pointer-events-none" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-6xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: PREMIUM_EASE }}>
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.8em] md:tracking-[1em] text-[#D4AF37] mb-8 md:mb-12 block">
                Excelência Jurídica & Resultados
              </span>
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-serif text-black leading-[1] md:leading-[0.85] mb-8 md:mb-14 tracking-tighter">
                Estratégia <br className="hidden sm:block" /> <span className="italic">Infalível.</span>
              </h1>
              <p className="text-lg md:text-2xl lg:text-3xl text-black/40 font-light leading-relaxed mb-12 md:mb-16 max-w-4xl border-l-[2px] md:border-l-[3px] border-[#D4AF37] pl-8 md:pl-12">
                Lang Cardoso Advocacia: Uma boutique jurídica em Santa Maria/RS focada na proteção de ativos e liberdade individual.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 md:gap-8">
                <a href={WHATSAPP_LINK} className="w-full sm:w-auto px-12 md:px-20 py-8 md:py-10 bg-black text-white text-center font-bold uppercase text-[9px] md:text-[10px] tracking-[0.4em] md:tracking-[0.5em] hover:bg-[#D4AF37] hover:text-black transition-all shadow-2xl flex items-center justify-center gap-4">
                  Consulta de Elite <ArrowRight size={18} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sobre o Escritório */}
      <section className="py-24 md:py-48 bg-white relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-20 md:gap-32 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -inset-6 md:-inset-10 bg-[#D4AF37]/5 blur-[60px] md:blur-[80px] rounded-full" />
              <div className="relative z-10 p-1 bg-white border border-black/5 shadow-2xl">
                <img src={LAWYER_IMAGE} alt="Escritório" className="w-full grayscale filter contrast-125 aspect-[4/5] object-cover" />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.6em] text-[#D4AF37] mb-8 md:mb-12 block">A Instituição</span>
              <h2 className="text-4xl md:text-6xl lg:text-8xl font-serif mb-10 md:mb-16 tracking-tighter leading-tight text-reveal">Tradição com <br className="hidden md:block" /> Inovação Técnica.</h2>
              <p className="text-base md:text-xl text-black/50 font-light leading-relaxed mb-10 md:mb-12">
                O escritório Lang Cardoso Advocacia nasceu com o propósito de oferecer uma advocacia altamente técnica e personalizada. Não trabalhamos com massa, trabalhamos com casos selecionados que exigem o máximo de rigor estratégico.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                <div className="p-8 bg-white/40 backdrop-blur-xl border border-black/5 shadow-sm hover:shadow-xl transition-all">
                  <Briefcase className="text-[#D4AF37] mb-6" size={24} md:size={28} />
                  <h4 className="text-[11px] font-bold uppercase tracking-widest mb-3">Atuação Boutique</h4>
                  <p className="text-xs text-black/40 font-light">Casos tratados com exclusividade e atenção absoluta aos detalhes.</p>
                </div>
                <div className="p-8 bg-white/40 backdrop-blur-xl border border-black/5 shadow-sm hover:shadow-xl transition-all">
                  <Clock className="text-[#D4AF37] mb-6" size={24} md:size={28} />
                  <h4 className="text-[11px] font-bold uppercase tracking-widest mb-3">Prontidão Técnica</h4>
                  <p className="text-xs text-black/40 font-light">Equipe de prontidão para intervenções críticas e urgências jurídicas.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seções de Atuação Principal */}
      <section className="py-24 md:py-48 bg-[#FAFAFA]">
        <div className="container mx-auto px-6 md:px-12 text-center mb-20 md:mb-32">
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-serif tracking-tighter italic text-reveal">Nossos Pilares.</h2>
          <p className="text-black/40 mt-6 md:mt-8 text-lg md:text-xl font-light">Especialização cirúrgica dividida em duas grandes áreas de elite.</p>
        </div>
        <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-8 md:gap-10">
          <Link to="/assessoria-empresarial" className="group relative block p-10 md:p-16 bg-white border border-black/5 shadow-xl md:shadow-2xl overflow-hidden transition-all duration-700 hover:-translate-y-2">
            <div className="absolute top-0 right-0 w-24 md:w-32 h-24 md:h-32 bg-[#D4AF37]/5 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-700" />
            <Building2 className="text-black mb-10 md:mb-12 group-hover:text-[#D4AF37] transition-colors" size={40} md:size={48} strokeWidth={1} />
            <h3 className="text-3xl md:text-4xl font-serif mb-6 md:mb-8 tracking-tight">Empresarial & Cível</h3>
            <p className="text-black/40 mb-10 md:mb-12 text-base md:text-lg font-light leading-relaxed">
              Blindagem patrimonial, contratos de alta complexidade e gestão de passivos. O suporte que sua empresa precisa para crescer segura.
            </p>
            <span className="inline-flex items-center gap-4 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] border-b border-black/10 pb-2 group-hover:text-[#D4AF37] group-hover:border-[#D4AF37] transition-all">
              Ver Detalhes <ArrowRight size={14} />
            </span>
          </Link>

          <Link to="/defesa-criminal" className="group relative block p-10 md:p-16 bg-white border border-black/5 shadow-xl md:shadow-2xl overflow-hidden transition-all duration-700 hover:-translate-y-2">
            <div className="absolute top-0 right-0 w-24 md:w-32 h-24 md:h-32 bg-[#D4AF37]/5 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-700" />
            <ShieldAlert className="text-black mb-10 md:mb-12 group-hover:text-[#D4AF37] transition-colors" size={40} md:size={48} strokeWidth={1} />
            <h3 className="text-3xl md:text-4xl font-serif mb-6 md:mb-8 tracking-tight">Defesa Criminal</h3>
            <p className="text-black/40 mb-10 md:mb-12 text-base md:text-lg font-light leading-relaxed">
              Atuação técnica de urgência, tribunal do júri e defesa em crimes empresariais. Quando a liberdade é o ativo mais precioso.
            </p>
            <span className="inline-flex items-center gap-4 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] border-b border-black/10 pb-2 group-hover:text-[#D4AF37] group-hover:border-[#D4AF37] transition-all">
              Ver Detalhes <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </section>

      {/* Localização e Footer */}
      <footer className="py-24 md:py-48 bg-white border-t border-black/5 text-center relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <Logo className="scale-[0.35] md:scale-[0.4] mx-auto mb-20 md:mb-32" />
          <h2 className="text-4xl md:text-6xl lg:text-[9rem] font-serif mb-20 md:mb-32 tracking-tighter leading-[1] md:leading-[0.8] text-black text-reveal">Presença <br className="hidden md:block" /> <span className="text-[#D4AF37] italic">Física.</span></h2>
          
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-12 md:gap-20 mb-24 md:mb-48 text-left border-y border-black/5 py-12 md:py-20">
            <div>
              <MapPin className="text-[#D4AF37] mb-6" size={24} />
              <h5 className="text-[10px] font-bold uppercase tracking-widest mb-4">Localização</h5>
              <p className="text-xs text-black/50 leading-loose">Alameda Montevideo, 322 <br /> Sala 108, Santa Maria - RS</p>
            </div>
            <div>
              <MessageCircle className="text-[#D4AF37] mb-6" size={24} />
              <h5 className="text-[10px] font-bold uppercase tracking-widest mb-4">Contato</h5>
              <p className="text-xs text-black/50 leading-loose">(55) 3217-6378 <br /> contato@langcardoso.adv.br</p>
            </div>
            <div>
              <Clock className="text-[#D4AF37] mb-6" size={24} />
              <h5 className="text-[10px] font-bold uppercase tracking-widest mb-4">Horários</h5>
              <p className="text-xs text-black/50 leading-loose">Segunda a Sexta <br /> 09h às 18h (Plantão 24h)</p>
            </div>
          </div>

          <a href={WHATSAPP_LINK} className="w-full sm:w-auto inline-block px-12 md:px-28 py-8 md:py-12 bg-black text-white font-bold uppercase text-[10px] md:text-[11px] tracking-[0.6em] md:tracking-[1em] hover:bg-[#D4AF37] hover:text-black transition-all shadow-2xl">
            Agendar Reunião
          </a>
          
          <div className="mt-24 md:mt-48 pt-12 md:pt-24 flex flex-col md:flex-row justify-between items-center gap-10 md:gap-14 border-t border-black/5 lg:border-none">
            <div className="flex gap-10 md:gap-14 items-center">
              <a href={INSTAGRAM_LINK} target="_blank" className="text-black/30 hover:text-black transition-all"><Instagram size={22} /></a>
              <a href="#" className="text-black/30 hover:text-black transition-all"><Linkedin size={22} /></a>
              <div className="hidden md:block w-px h-8 bg-black/10 mx-2" />
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-black/20">© 2025 Lang Cardoso Advocacia</span>
            </div>
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-black/20 italic">Design por Elite Jurídica</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- Layout das Páginas de Serviço ---

interface LayoutProps {
  type: 'empresarial' | 'criminal';
  headline: string;
  subheadline: string;
  painTitle: string;
  painPoints: { title: string; desc: string }[];
  stepsTitle: string;
  steps: { title: string; desc: string }[];
  services: { title: string; desc: string; icon: React.ReactNode }[];
  bio: string;
}

const LayoutServico: React.FC<LayoutProps> = ({ 
  type, headline, subheadline, painTitle, painPoints, stepsTitle, steps, services, bio 
}) => {
  useEffect(() => { window.scrollTo(0, 0); }, [type]);

  return (
    <div className="bg-[#FFFFFF] text-black min-h-screen selection:bg-black selection:text-white" style={{ perspective: "1500px" }}>
      {/* Hero Service */}
      <section className="relative min-h-[80vh] md:min-h-screen flex flex-col justify-center pt-24 md:pt-32 overflow-hidden bg-[#FAFAFA]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(212,175,55,0.03)_0%,_transparent_60%)] pointer-events-none" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-6xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: PREMIUM_EASE }}>
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.6em] md:tracking-[1em] text-[#D4AF37] mb-8 md:mb-12 block">
                {type === 'empresarial' ? 'Proteção Corporativa' : 'Proteção Individual'}
              </span>
              <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[9.5rem] font-serif text-black leading-[1] md:leading-[0.85] mb-8 md:mb-14 tracking-tighter">
                {headline}
              </h1>
              <p className="text-lg md:text-2xl lg:text-3xl text-black/40 font-light leading-relaxed mb-12 md:mb-16 max-w-4xl border-l-[2px] md:border-l-[3px] border-[#D4AF37] pl-8 md:pl-12">
                {subheadline}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 md:gap-8">
                <a href={WHATSAPP_LINK} className="w-full sm:w-auto px-12 md:px-20 py-8 md:py-10 bg-black text-white text-center font-bold uppercase text-[9px] md:text-[10px] tracking-[0.4em] md:tracking-[0.5em] hover:bg-[#D4AF37] hover:text-black transition-all shadow-2xl flex items-center justify-center gap-4">
                  Consulta Técnica <ArrowRight size={18} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dores com GlassCard3D */}
      <section className="py-24 md:py-48 relative bg-white border-y border-black/[0.03]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16 md:mb-32 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl lg:text-8xl font-serif mb-6 md:mb-10 italic text-reveal">{painTitle}</h2>
            <div className="h-[2px] w-24 md:w-32 bg-[#D4AF37] mx-auto" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {painPoints.map((point, idx) => (
              <motion.div 
                key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
                className="h-full"
              >
                <GlassCard3D className="p-10 md:p-14 h-full">
                  <AlertCircle className="text-[#D4AF37] mb-10 md:mb-12" size={32} md:size={36} strokeWidth={1} />
                  <h3 className="text-xl md:text-2xl font-serif mb-4 md:mb-6 text-black uppercase tracking-tight leading-tight">{point.title}</h3>
                  <p className="text-black/50 text-sm leading-relaxed font-light">{point.desc}</p>
                </GlassCard3D>
              </motion.div>
            ))}
          </div>
          <div className="mt-16 md:mt-28 text-center px-4">
             <a href={WHATSAPP_LINK} className="w-full sm:w-auto inline-block px-10 md:px-14 py-6 md:py-8 bg-white border border-black text-black font-bold uppercase text-[9px] md:text-[10px] tracking-[0.4em] md:tracking-[0.5em] hover:bg-black hover:text-white transition-all">
                Desejo Atuação Tática Agora
             </a>
          </div>
        </div>
      </section>

      {/* Metodologia */}
      <section className="py-24 md:py-48 bg-[#FAFAFA] overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-20 md:gap-32 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.6em] text-black/30 mb-8 md:mb-12 block">{stepsTitle}</span>
              <h2 className="text-4xl md:text-6xl lg:text-[8rem] font-serif mb-12 md:mb-20 leading-[1.1] md:leading-[0.9] tracking-tighter text-reveal">Nosso <br className="hidden md:block" /> Rigor Técnico.</h2>
              
              <div className="space-y-12 md:space-y-20">
                {steps.map((step, idx) => (
                  <div key={idx} className="flex gap-8 md:gap-12 group">
                    <div className="text-4xl md:text-5xl font-serif text-black/5 group-hover:text-[#D4AF37]/30 transition-colors">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-lg md:text-xl font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] mb-3 md:mb-4 text-black">/ {step.title}</h4>
                      <p className="text-black/40 text-base md:text-lg font-light leading-relaxed max-w-md">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-[#D4AF37]/5 blur-[80px] md:blur-[100px] rounded-full" />
              <motion.div whileHover={{ scale: 1.01 }} className="relative z-10 border-[1.5px] border-black/5 bg-white p-4 md:p-6 shadow-2xl">
                <img src={LAWYER_IMAGE} alt="Matheus" className="w-full grayscale filter contrast-125 object-cover aspect-[3/4]" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Especialidades com GlassCard3D */}
      <section className="py-24 md:py-48 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-32 gap-10 md:gap-12 border-b border-black/5 pb-12 md:pb-20">
            <div className="max-w-3xl">
              <h2 className="text-4xl md:text-7xl lg:text-9xl font-serif tracking-tighter italic text-reveal">Expertise.</h2>
              <p className="text-black/40 mt-6 md:mt-8 text-lg md:text-xl font-light">Especialização técnica para demandas de alta complexidade.</p>
            </div>
            <a href={WHATSAPP_LINK} className="w-full sm:w-auto text-center px-10 md:px-14 py-6 md:py-8 bg-black text-white font-bold uppercase text-[9px] md:text-[10px] tracking-[0.4em] md:tracking-[0.5em] hover:bg-[#D4AF37] hover:text-black transition-all">
               Consulta Tática
            </a>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <GlassCard3D key={idx} className="p-10 md:p-16 h-full">
                <div className="text-black/30 mb-8 md:mb-12 group-hover:text-[#D4AF37] transition-colors">{service.icon}</div>
                <h3 className="text-2xl md:text-3xl font-serif mb-6 md:mb-8 tracking-tight">{service.title}</h3>
                <p className="text-black/40 text-sm md:text-base leading-relaxed font-light">{service.desc}</p>
              </GlassCard3D>
            ))}
          </div>
        </div>
      </section>

      {/* Bio Autoridade */}
      <section className="py-24 md:py-48 bg-[#FAFAFA] relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 md:gap-32">
            <div className="lg:w-2/5 w-full max-w-md lg:max-w-none">
              <Logo className="mb-10 md:mb-20 scale-75 md:scale-90" translucent />
              <div className="aspect-[3/4] overflow-hidden grayscale border border-black/5 p-3 md:p-4 bg-white shadow-xl">
                <img src={LAWYER_IMAGE} alt="Matheus" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="lg:w-3/5">
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.6em] text-[#D4AF37] mb-8 md:mb-12 block">Fundador</span>
              <h2 className="text-4xl md:text-6xl lg:text-[7.5rem] font-serif mb-10 md:mb-16 tracking-tighter leading-tight text-black text-reveal">Matheus <br className="hidden md:block" /> Lang Cardoso</h2>
              <p className="text-xl md:text-2xl text-black/50 font-light mb-12 md:mb-20 italic leading-relaxed border-l-2 border-[#D4AF37] pl-8 md:pl-12">
                "{bio}"
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
                {[
                  "Inscrição OAB/RS 12.585",
                  "Especialista Imobiliário",
                  "Defesa no Tribunal do Júri",
                  "Consultoria de Blindagem Elite"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 md:gap-6 group">
                    <CheckCircle2 size={20} md:size={24} className="text-[#D4AF37] group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] text-black/70">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-24 md:py-48 bg-white border-t border-black/5 text-center relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <Logo className="scale-[0.35] md:scale-[0.4] mx-auto mb-20 md:mb-32" />
          <h2 className="text-4xl md:text-6xl lg:text-[11rem] font-serif mb-20 md:mb-32 tracking-tighter leading-[1] md:leading-[0.8] text-black text-reveal">Estratégia <br className="hidden md:block" /> <span className="text-[#D4AF37] italic">Inabalável.</span></h2>
          <a href={WHATSAPP_LINK} className="w-full sm:w-auto inline-block px-12 md:px-28 py-8 md:py-12 bg-black text-white font-bold uppercase text-[10px] md:text-[11px] tracking-[0.6em] md:tracking-[1em] hover:bg-[#D4AF37] hover:text-black transition-all shadow-2xl">
            Iniciar Atendimento
          </a>
        </div>
      </footer>
    </div>
  );
};

// --- Páginas de Serviço ---

const EmpresarialPage = () => (
  <LayoutServico 
    type="empresarial"
    headline="Proteção Corporativa."
    subheadline="Blindagem jurídica e arquitetura de ativos focada na perenidade econômica e na proteção de operações empresariais de alto valor."
    painTitle="Onde moram os riscos da sua empresa?"
    painPoints={[
      { title: "Bloqueio de Contas", desc: "Intervenção técnica urgente contra execuções fiscais ou bancárias arbitrárias." },
      { title: "Passivo Trabalhista", desc: "Redução de danos e compliance preventivo para estancar novas demandas laborais." },
      { title: "Proteção de Sócios", desc: "Engenharia societária para separação absoluta entre patrimônio pessoal e riscos do negócio." },
      { title: "Gargalos Contratuais", desc: "Revisão rigorosa de acordos comerciais para eliminar vulnerabilidades de alto impacto." }
    ]}
    stepsTitle="Workflow Estratégico"
    steps={[
      { title: "Diagnóstico de Ativos", desc: "Mapeamento cirúrgico de cada vulnerabilidade legal e financeira da sua operação." },
      { title: "Blindagem Ativa", desc: "Implementação imediata de camadas de proteção societária e reestruturação de garantias." },
      { title: "Compliance de Expansão", desc: "Acompanhamento permanente para viabilizar novos negócios sob segurança jurídica." }
    ]}
    services={[
      { title: "Cível Estratégico", desc: "Contencioso focado na desoneração de passivos e resoluções táticas.", icon: <Scale size={32} strokeWidth={1} /> },
      { title: "Recuperação de Créditos", desc: "Inteligência jurídica para reaver ativos com máxima liquidez e agilidade.", icon: <HandCoins size={32} strokeWidth={1} /> },
      { title: "Direito Imobiliário", desc: "Assessoria em transações premium e regularização de holdings patrimoniais.", icon: <Landmark size={32} strokeWidth={1} /> },
      { title: "Tributário Elite", desc: "Otimização da carga fiscal e defesas técnicas contra autuações administrativas.", icon: <ReceiptText size={32} strokeWidth={1} /> },
      { title: "Societário", desc: "Modelagem de contratos sociais e acordos de acionistas com foco em proteção mútua.", icon: <FileText size={32} strokeWidth={1} /> },
      { title: "Planejamento Sucessório", desc: "Gestão suave de ativos familiares e preservação de legados entre gerações.", icon: <Users2 size={32} strokeWidth={1} /> }
    ]}
    bio="Minha missão é transformar o Direito em uma ferramenta de viabilidade. Na Lang Cardoso, atuamos como parceiros estratégicos para que o empresário foque no crescimento com segurança total."
  />
);

const CriminalPage = () => (
  <LayoutServico 
    type="criminal"
    headline="Inteligência Criminal."
    subheadline="Defesa técnica de urgência com rigor garantista. Onde a liberdade é tratada com a gravidade que a excelência exige."
    painTitle="Urgência Criminal?"
    painPoints={[
      { title: "Prisão em Flagrante", desc: "Atendimento imediato 24h para controle de legalidade e audiências de custódia." },
      { title: "Inquérito Policial", desc: "Acompanhamento precoce para evitar produção de provas viciadas e abusos." },
      { title: "Tribunal do Júri", desc: "Defesa especializada em crimes contra a vida com oratória persuasiva e técnica de elite." },
      { title: "Crimes Digitais", desc: "Estratégia defensiva em fraudes eletrônicas e crimes cibernéticos com perícia avançada." }
    ]}
    stepsTitle="Defesa em 3 Atos"
    steps={[
      { title: "Resposta Imediata", desc: "Presença física em delegacias e tribunais para controle de danos reais e direitos." },
      { title: "Investigação Defensiva", desc: "Coleta proativa de provas periciais para desarticular narrativas acusatórias." },
      { title: "Litigância em Plenário", desc: "Atuação vigorosa em tribunais para garantir o devido processo legal e a justiça." }
    ]}
    services={[
      { title: "Plantão 24h", desc: "Exclusivo para diligências urgentes e salvaguarda de direitos fundamentais.", icon: <ShieldAlert size={32} strokeWidth={1} /> },
      { title: "Tribunal do Júri", desc: "Especialista em Plenário, defendendo a liberdade com oratória técnica e vigorosa.", icon: <Gavel size={32} strokeWidth={1} /> },
      { title: "Crimes Empresariais", desc: "Defesa em crimes contra a ordem tributária, sistema financeiro e compliance penal.", icon: <Building2 size={32} strokeWidth={1} /> },
      { title: "Audiência Técnica", desc: "Controle estrito de legalidade para evitar prisões preventivas arbitrárias.", icon: <Scale size={32} strokeWidth={1} /> },
      { title: "Direito Cyber Penal", desc: "Atuação jurídica em crimes informáticos com auxílio de alta tecnologia forense.", icon: <Lock size={32} strokeWidth={1} /> },
      { title: "Recursos Superiores", desc: "Atuação no STJ e STF para correção de nulidades e arbitrariedades processuais.", icon: <Search size={32} strokeWidth={1} /> }
    ]}
    bio="Atuamos como um escudo contra o arbítrio. No Direito Criminal, a técnica precede a retórica. Cada processo é tratado com a gravidade que a liberdade humana exige."
  />
);

// --- Root ---

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <WhatsAppFloating />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/assessoria-empresarial" element={<EmpresarialPage />} />
        <Route path="/defesa-criminal" element={<CriminalPage />} />
      </Routes>
    </BrowserRouter>
  );
}
