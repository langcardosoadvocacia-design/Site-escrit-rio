
import React, { useState, useEffect, useRef } from 'react';
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

// --- Assets & Constants ---
const WHATSAPP_LINK = "https://wa.me/555532176378";
const INSTAGRAM_LINK = "https://www.instagram.com/langcardosoadvocacia?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";
const MAPS_LINK = "https://maps.app.goo.gl/efHVKMHhRBSw2PXd8";
const EMAIL = "langcardosoadvocacia@gmail.com";
const MAILTO_LINK = `mailto:${EMAIL}`;
const DISPLAY_PHONE = "55 55 3217-6378";
const FULL_ADDRESS = "Alameda Montevideo, 322, Sala 108, Ed. Miguel Reale - Nossa Senhora das Dores, Santa Maria - RS, 97050-030";
const LAWYER_IMAGE = "/images/advogado.png";

// Premium Easing Constant
const PREMIUM_EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

// --- UI Components ---

/**
 * Logo component redesigned based on the architectural reference.
 * Refined with backdrop-blur and subtle transparency for the "letters passing under" effect.
 */
const Logo: React.FC<{ light?: boolean; className?: string; translucent?: boolean }> = ({ light, className = "", translucent = false }) => (
  <motion.div 
    whileHover={{ scale: 1.01 }}
    className={`relative flex flex-col items-center border ${light ? 'border-white' : 'border-black'} 
      ${translucent ? 'bg-white/80 backdrop-blur-md' : 'bg-white'} 
      px-8 py-10 transition-all cursor-pointer shadow-xl ${className}`}
  >
    {/* Firm Name */}
    <span className="text-xl md:text-2xl font-bold text-black tracking-[0.3em] uppercase mb-4">
      Lang Cardoso
    </span>

    {/* Architectural Dimension Line */}
    <div className="relative w-full h-[1.5px] bg-black mb-6">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[1.5px] h-4 bg-black"></div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1.5px] h-4 bg-black"></div>
    </div>

    {/* Descriptor */}
    <span className="text-xs md:text-base font-medium text-black tracking-[0.6em] uppercase">
      Advocacia
    </span>

    {/* OAB Detail */}
    <span className="absolute bottom-2 right-3 text-[8px] text-black/60 tracking-tight font-normal">
      OAB/RS 12.585
    </span>
  </motion.div>
);

const GlassCard3D: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 80, damping: 25 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), springConfig);
  const glareX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), springConfig);
  const glareY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), springConfig);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const xPct = (event.clientX - rect.left) / rect.width - 0.5;
    const yPct = (event.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  return (
    <motion.div 
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, perspective: 1200, transformStyle: "preserve-3d" }}
      className={`group relative glass rounded-3xl p-10 shadow-luxury border-white/40 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] hover:shadow-[0_40px_100px_-30px_rgba(0,0,0,0.15)] hover:border-blue-400/30 ${className}`}
    >
      <motion.div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl" style={{ background: useTransform([glareX, glareY], ([gx, gy]) => `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.3) 0%, transparent 80%)`) }} />
      <motion.div animate={{ opacity: [0.2, 0.5, 0.2], boxShadow: ["inset 0 0 2px #00d4ff", "inset 0 0 12px #00d4ff", "inset 0 0 2px #00d4ff"] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-0 rounded-3xl border border-blue-400/40 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700 blur-[0.3px]" />
      <div style={{ transform: "translateZ(60px)", transformStyle: "preserve-3d" }}>{children}</div>
    </motion.div>
  );
};

const SectionHeading: React.FC<{ title: string; subtitle: string; centered?: boolean }> = ({ title, subtitle, centered }) => (
  <div className={`mb-20 ${centered ? 'text-center' : ''}`}>
    <motion.div initial={{ opacity: 0, letterSpacing: "0.2em" }} whileInView={{ opacity: 1, letterSpacing: "0.6em" }} transition={{ duration: 1.2, ease: PREMIUM_EASE }}>
      <span className="text-[10px] font-bold uppercase text-slate-400 block mb-6">{subtitle}</span>
    </motion.div>
    <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: PREMIUM_EASE }} className="text-4xl md:text-6xl font-serif text-slate-900 leading-tight">{title}</motion.h2>
    <motion.div initial={{ width: 0 }} whileInView={{ width: 80 }} transition={{ duration: 1.5, ease: PREMIUM_EASE }} className={`h-[2px] bg-black mt-8 ${centered ? 'mx-auto' : ''}`} />
  </div>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 150);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Estratégia', href: '#assessoria' },
    { name: 'Expertise', href: '#especialidades' },
    { name: 'O Escritório', href: '#sobre' },
    { name: 'Contato', href: '#contato' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-1000 ${isScrolled ? 'py-2 bg-white/90 backdrop-blur-xl shadow-sm' : 'py-10 bg-transparent'}`}>
      <div className="container mx-auto px-8 flex justify-between items-center">
        {/* Navbar Logo only appears after scrolling to avoid "two logos" at start */}
        <motion.div 
          animate={{ opacity: isScrolled ? 1 : 0, y: isScrolled ? 0 : -20 }}
          className="scale-[0.45] md:scale-[0.6] origin-left pointer-events-none"
        >
          {isScrolled && <Logo translucent />}
        </motion.div>

        <div className="hidden lg:flex items-center gap-12">
          {links.map((link) => (
            <a key={link.name} href={link.href} className="group relative text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900 overflow-hidden">
              <span className="block transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-full">{link.name}</span>
              <span className="absolute top-full left-0 block transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-full text-slate-400">{link.name}</span>
            </a>
          ))}
          <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="px-10 py-4 bg-black text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-slate-800 transition-all duration-500 shadow-2xl">
            WhatsApp
          </motion.a>
        </div>

        <button className="lg:hidden p-2 text-black" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 p-8 flex flex-col gap-8 shadow-2xl">
            {links.map((link) => (
              <a key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-xs font-bold uppercase tracking-[0.2em]">{link.name}</a>
            ))}
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="w-full py-5 bg-black text-white text-center text-xs font-bold uppercase tracking-[0.2em]">Agendar Agora</a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const yRange = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const heroImageScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0.5]);

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center pt-32 md:pt-40 overflow-hidden">
        <div className="absolute inset-0 bg-soft-gradient opacity-30 pointer-events-none"></div>
        
        <div className="container mx-auto px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 md:gap-20 items-start">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 relative">
              
              {/* Logo Main Placement: Organized to be the section header, translucent to allow interaction */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: PREMIUM_EASE }}
                className="mb-16 md:mb-24 relative z-30 inline-block"
              >
                <Logo className="scale-[0.8] md:scale-[0.9] origin-left" translucent />
              </motion.div>

              <motion.div 
                style={{ opacity: titleOpacity }}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 1.5, ease: PREMIUM_EASE }}
                className="relative z-10"
              >
                <h1 className="text-6xl md:text-9xl font-serif text-slate-900 leading-[0.85] mb-12 tracking-tighter">
                  Estratégia <br />
                  <span className="italic font-light text-slate-400">Jurídica.</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-500 max-w-md mb-14 leading-relaxed font-light">
                  Advocacia corporativa de alta complexidade. Inteligência em viabilidade econômica e segurança jurídica.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-8 items-center lg:items-start">
                  <motion.a whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }} href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="px-14 py-7 bg-black text-white font-bold uppercase text-xs tracking-[0.4em] shadow-3xl transition-all flex items-center gap-4">
                    Conectar Agora <MessageCircle size={18} />
                  </motion.a>
                  <a href="#especialidades" className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400 hover:text-black transition-colors py-7">Explorar Soluções</a>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Founder Image */}
            <div className="lg:col-span-5 relative mt-20 lg:mt-0">
              <motion.div 
                style={{ scale: heroImageScale, y: yRange }}
                className="relative z-10 p-4 bg-white shadow- luxury rounded-sm border border-slate-100 overflow-hidden group"
              >
                <img src={LAWYER_IMAGE} alt="Matheus Lang Cardoso" className="w-full grayscale group-hover:grayscale-0 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-10">
                  <span className="text-white text-2xl font-serif">Matheus Lang Cardoso</span>
                  <span className="text-white/60 text-[10px] uppercase tracking-widest mt-2">Sócio Fundador</span>
                </div>
              </motion.div>
              <div className="absolute -top-10 -right-10 w-full h-full border border-slate-100 -z-10 translate-x-4 translate-y-4"></div>
            </div>
          </div>
        </div>
        
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-300 flex flex-col items-center gap-2">
          <span className="text-[8px] font-bold uppercase tracking-[0.4em]">Scroll</span>
          <ChevronDown size={14} />
        </motion.div>
      </section>

      {/* Specialty Sections and rest of the app... */}
      <section id="assessoria" className="py-40 bg-white relative z-20">
        <div className="container mx-auto px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <SectionHeading subtitle="Direito & Negócios" title="A Evolução da Advocacia de Resultados" />
              <div className="space-y-12 text-2xl text-slate-500 leading-relaxed font-light">
                <motion.p initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: PREMIUM_EASE }} className="border-l-4 border-black pl-8">
                  Oferecemos uma <span className="text-slate-900 font-medium">gestão jurídica integral</span>, onde o Direito é o motor da viabilidade operacional.
                </motion.p>
              </div>
            </div>
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              {[{ label: "Segurança", icon: <ShieldCheck size={20}/> }, { label: "Compliance", icon: <Building2 size={20}/> }, { label: "Estratégia", icon: <Scale size={20}/> }, { label: "Patrimônio", icon: <HandCoins size={20}/> }].map((item, i) => (
                <motion.div key={i} whileHover={{ y: -10, rotateZ: 2 }} className="bg-slate-50 p-10 flex flex-col items-center justify-center text-center gap-4 border border-slate-100 transition-all hover:shadow-xl hover:bg-white">
                  <div className="text-black">{item.icon}</div>
                  <span className="text-[9px] font-bold uppercase tracking-widest">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="especialidades" className="py-40 bg-slate-50 overflow-hidden relative z-20">
        <div className="container mx-auto px-8">
          <SectionHeading subtitle="Especialidades" title="Estratégia Empresarial" centered />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[{ icon: <Percent size={32} />, title: "Revisão de Juros" }, { icon: <HandCoins size={32} />, title: "Recuperação" }, { icon: <ReceiptText size={32} />, title: "Tributário" }, { icon: <Users size={32} />, title: "Trabalhista" }].map((item, idx) => (
              <GlassCard3D key={idx}>
                <div className="mb-10 text-slate-300 group-hover:text-black transition-colors">{item.icon}</div>
                <h3 className="text-2xl font-serif mb-6 text-slate-900">{item.title}</h3>
                <a href={WHATSAPP_LINK} className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-black group">Agendar Consulta <ArrowRight size={14} className="transition-transform group-hover:translate-x-2" /></a>
              </GlassCard3D>
            ))}
          </div>
        </div>
      </section>

      <section id="sobre" className="py-40 bg-white overflow-hidden relative z-20">
        <div className="container mx-auto px-8">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <div className="lg:w-1/2 relative group">
              <img src={LAWYER_IMAGE} alt="Matheus Lang Cardoso" className="w-full grayscale group-hover:grayscale-0 transition-all duration-1000 shadow-3xl max-w-md mx-auto border p-2" />
            </div>
            <div className="lg:w-1/2">
              <SectionHeading subtitle="O Fundador" title="Matheus Lang Cardoso" />
              <div className="space-y-12">
                <p className="text-2xl text-slate-400 font-light italic italic">"Transformamos o Direito em uma ferramenta de eficiência prática."</p>
                <div className="grid gap-6">
                  {["OAB/RS 12.585", "Especialista em Direito Imobiliário e Penal", "Atuação em Tribunal do Júri"].map((edu, i) => (
                    <div key={i} className="flex items-center gap-4 group"><div className="w-2 h-2 bg-black group-hover:w-6 transition-all duration-500"></div><span className="text-[11px] font-bold uppercase tracking-widest">{edu}</span></div>
                  ))}
                </div>
                
                <div className="pt-8 border-t border-slate-100">
                  <div className="flex items-center gap-3 mb-8"><Briefcase size={20} className="text-slate-400" /><h4 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-900">Atuação Pública e Especializada</h4></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {["Santa Maria (Júri)", "Porto Alegre", "Portão", "Tapera", "Rosário do Sul"].map((comarca, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 border hover:bg-white transition-all"><MapPin size={12} className="text-slate-400" /><span className="text-[10px] font-medium tracking-wider uppercase">{comarca}</span></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-24 bg-white border-t border-slate-100 relative z-20">
        <div className="container mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-16">
          <Logo className="scale-[0.5] origin-center" translucent />
          <div className="flex gap-12">
             <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-black transition-colors"><Instagram size={28} /></a>
             <a href="#" className="text-slate-300 hover:text-black transition-colors"><Linkedin size={28} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
