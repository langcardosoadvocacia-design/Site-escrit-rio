
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
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// --- Assets & Constants ---
const WHATSAPP_LINK = "https://wa.me/555532176378";
const INSTAGRAM_LINK = "https://www.instagram.com/langcardosoadvocacia?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";
const MAPS_LINK = "https://share.google/ldozPbWAM9Ef0ioy2";
const EMAIL = "langcardosoadvocacia@gmail.com";
const MAILTO_LINK = `mailto:${EMAIL}`;
const DISPLAY_PHONE = "55 55 3217-6378";
const FULL_ADDRESS = "Alameda Montevideo, 322, Sala 108, Ed. Miguel Reale - Nossa Senhora das Dores, Santa Maria - RS, 97050-030";
// Caminho local da imagem conforme solicitado
const LAWYER_IMAGE = "/images/advogado.png";

// --- UI Components ---

const Logo: React.FC<{ light?: boolean }> = ({ light }) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    className={`relative flex flex-col items-center border ${light ? 'border-white' : 'border-black'} p-4 md:p-6 tracking-[0.25em] uppercase transition-all cursor-pointer bg-white shadow-2xl z-20`}
  >
    <span className="text-base md:text-2xl font-semibold text-black mb-1">Lang Cardoso</span>
    <div className="relative w-full h-[1.5px] bg-black my-2">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-3 bg-black"></div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-3 bg-black"></div>
    </div>
    <span className="text-xs md:text-lg font-medium text-black tracking-[0.3em]">Advocacia</span>
    <span className="absolute bottom-1 right-2 text-[6px] md:text-[8px] text-black/70 tracking-normal font-normal">OAB/RS 12.585</span>
  </motion.div>
);

const GlassCard3D: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX((y - centerY) / 10);
    setRotateY((centerX - x) / 10);
  };

  return (
    <motion.div 
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { setRotateX(0); setRotateY(0); }}
      style={{ 
        rotateX, 
        rotateY, 
        perspective: 1000,
        transformStyle: "preserve-3d" 
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`glass rounded-3xl p-10 shadow-luxury border-white/40 transition-shadow hover:shadow-2xl ${className}`}
    >
      <div style={{ transform: "translateZ(50px)" }}>
        {children}
      </div>
    </motion.div>
  );
};

const SectionHeading: React.FC<{ title: string; subtitle: string; centered?: boolean }> = ({ title, subtitle, centered }) => (
  <div className={`mb-20 ${centered ? 'text-center' : ''}`}>
    <motion.div
      initial={{ opacity: 0, letterSpacing: "0.2em" }}
      whileInView={{ opacity: 1, letterSpacing: "0.6em" }}
      transition={{ duration: 1 }}
    >
      <span className="text-[10px] font-bold uppercase text-slate-400 block mb-6">
        {subtitle}
      </span>
    </motion.div>
    <motion.h2 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-4xl md:text-6xl font-serif text-slate-900 leading-tight"
    >
      {title}
    </motion.h2>
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: 80 }}
      className={`h-[2px] bg-black mt-8 ${centered ? 'mx-auto' : ''}`}
    />
  </div>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
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
    <nav className={`fixed top-0 w-full z-50 transition-all duration-1000 ${isScrolled ? 'py-2 bg-white/80 backdrop-blur-xl shadow-sm' : 'py-10 bg-transparent'}`}>
      <div className="container mx-auto px-8 flex justify-between items-center">
        <div className="scale-75 md:scale-90 origin-left">
          <Logo />
        </div>

        <div className="hidden lg:flex items-center gap-12">
          {links.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="group relative text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900 overflow-hidden"
            >
              <span className="block transition-transform duration-500 group-hover:-translate-y-full">{link.name}</span>
              <span className="absolute top-full left-0 block transition-transform duration-500 group-hover:-translate-y-full text-slate-400">{link.name}</span>
            </a>
          ))}
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={WHATSAPP_LINK} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-10 py-4 bg-black text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-slate-800 transition-all shadow-2xl"
          >
            WhatsApp
          </motion.a>
        </div>

        <button className="lg:hidden p-2 text-black" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 p-8 flex flex-col gap-8 shadow-2xl"
          >
            {links.map((link) => (
              <a key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-xs font-bold uppercase tracking-[0.2em]">
                {link.name}
              </a>
            ))}
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)} className="w-full py-5 bg-black text-white text-center text-xs font-bold uppercase tracking-[0.2em]">
              Agendar Agora
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const yRange = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const heroImageScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* Hero Section 3D */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden perspective-2000">
        <div className="absolute inset-0 bg-soft-gradient opacity-50"></div>
        
        {/* Floating Background Elements */}
        <motion.div 
          style={{ y: yRange }}
          className="absolute top-1/4 right-10 w-[500px] h-[500px] bg-slate-50 rounded-full blur-[120px] -z-10 opacity-60"
        />
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 200]) }}
          className="absolute bottom-1/4 left-10 w-[300px] h-[300px] bg-slate-100 rounded-full blur-[100px] -z-10 opacity-40"
        />

        <div className="container mx-auto px-8 relative z-10 grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "circOut" }}
          >
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-[1px] w-20 bg-slate-200 mb-10 origin-left"
            />
            <h1 className="text-6xl md:text-8xl font-serif text-slate-900 leading-[0.95] mb-12">
              Estratégia <br />
              <span className="italic font-light text-slate-400">Jurídica.</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-lg mb-14 leading-relaxed font-light">
              Advocacia corporativa de alta complexidade. Inteligência em viabilidade econômica e segurança jurídica para o topo do mercado.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 items-center lg:items-start">
              <motion.a 
                whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}
                href={WHATSAPP_LINK} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-14 py-7 bg-black text-white font-bold uppercase text-xs tracking-[0.4em] shadow-3xl transition-all flex items-center gap-4"
              >
                Conectar Agora <MessageCircle size={18} />
              </motion.a>
              <a href="#especialidades" className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400 hover:text-black transition-colors py-7">
                Explorar Soluções
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.5, ease: "circOut" }}
            className="relative flex justify-center lg:justify-end"
          >
            <motion.div 
              style={{ scale: heroImageScale }}
              className="relative z-10 p-4 bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] rounded-sm border border-slate-100 max-w-lg overflow-hidden group"
            >
              <img 
                src={LAWYER_IMAGE}
                alt="Matheus Lang Cardoso" 
                className="w-full grayscale group-hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-10">
                <span className="text-white text-2xl font-serif">Matheus Lang Cardoso</span>
                <span className="text-white/60 text-[10px] uppercase tracking-widest mt-2">Sócio Fundador</span>
              </div>
            </motion.div>
            
            {/* 3D Decorative Layers */}
            <div className="absolute -top-10 -right-10 w-full h-full border border-slate-100 -z-10 translate-x-4 translate-y-4"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-slate-50 -z-10 animate-pulse"></div>
          </motion.div>
        </div>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-300 flex flex-col items-center gap-2 cursor-pointer"
        >
          <span className="text-[8px] font-bold uppercase tracking-[0.4em]">Scroll</span>
          <ChevronDown size={14} />
        </motion.div>
      </section>

      {/* Storytelling Section */}
      <section id="assessoria" className="py-40 bg-white">
        <div className="container mx-auto px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <SectionHeading 
                subtitle="Direito & Negócios" 
                title="A Evolução da Advocacia de Resultados" 
              />
              <div className="space-y-12 text-2xl text-slate-500 leading-relaxed font-light">
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="border-l-4 border-black pl-8"
                >
                  Mudamos a forma de atuar para oferecer uma <span className="text-slate-900 font-medium">gestão jurídica integral</span>, onde o Direito é o motor da viabilidade operacional da sua empresa.
                </motion.p>
                <p className="text-lg text-slate-400">
                  Nossa assessoria não foca apenas na lide, mas na estruturação de processos que mitiguem o passivo antes mesmo que ele ocorra. É inteligência técnica aplicada ao lucro.
                </p>
              </div>
            </div>
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              {[
                { label: "Segurança", icon: <ShieldCheck size={20}/> },
                { label: "Compliance", icon: <Building2 size={20}/> },
                { label: "Estratégia", icon: <Scale size={20}/> },
                { label: "Patrimônio", icon: <HandCoins size={20}/> }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -10 }}
                  className="bg-slate-50 p-10 flex flex-col items-center justify-center text-center gap-4 border border-slate-100 transition-shadow hover:shadow-xl"
                >
                  <div className="text-black">{item.icon}</div>
                  <span className="text-[9px] font-bold uppercase tracking-widest">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Specialties 3D Cards */}
      <section id="especialidades" className="py-40 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-8">
          <SectionHeading 
            subtitle="Especialidades" 
            title="Estratégia Empresarial" 
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { 
                icon: <Percent size={32} strokeWidth={1} />, 
                title: "Revisão de Juros", 
                desc: "Análise técnico-jurídica profunda de encargos bancários para restaurar o equilíbrio financeiro contratual." 
              },
              { 
                icon: <HandCoins size={32} strokeWidth={1} />, 
                title: "Recuperação", 
                desc: "Gestão técnica de recebíveis e ativos com metodologia própria focada na liquidez corporativa." 
              },
              { 
                icon: <ReceiptText size={32} strokeWidth={1} />, 
                title: "Tributário", 
                desc: "Otimização da carga fiscal através de compliance preventivo e recuperação de créditos legítimos." 
              },
              { 
                icon: <Users size={32} strokeWidth={1} />, 
                title: "Trabalhista", 
                desc: "Defesa e consultoria patronal focada na redução drástica de passivos laborais ocultos." 
              }
            ].map((item, idx) => (
              <GlassCard3D key={idx}>
                <div className="mb-10 text-slate-300 transition-colors group-hover:text-black">{item.icon}</div>
                <h3 className="text-2xl font-serif mb-6 text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-light mb-10">{item.desc}</p>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-black group">
                  Agendar Consulta <ArrowRight size={14} className="transition-transform group-hover:translate-x-2" />
                </a>
              </GlassCard3D>
            ))}
          </div>
        </div>
      </section>

      {/* Secondary Areas - 3D Layout */}
      <section className="py-40 bg-slate-900 text-white relative">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.1 }}
          className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none"
        >
          <Gavel size={800} strokeWidth={0.5} className="rotate-12" />
        </motion.div>

        <div className="container mx-auto px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-24 items-center">
            <div className="lg:w-1/2">
              <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-slate-500 mb-10 block">Vertical Secundária</span>
              <h2 className="text-5xl md:text-7xl font-serif mb-12 leading-tight">Suporte Civil <br />& Criminal</h2>
              <p className="text-slate-400 text-xl font-light leading-relaxed mb-16">
                Além do core business empresarial, mantemos núcleos de excelência para assegurar a tranquilidade individual e institucional frente a desafios cíveis e criminais.
              </p>
              
              <div className="grid gap-10">
                <div className="group p-8 border border-white/10 transition-all hover:bg-white/5 cursor-default">
                  <div className="flex items-center gap-6 mb-4">
                    <Scale size={28} className="text-white/40 group-hover:text-white transition-colors" />
                    <h4 className="text-2xl font-serif">Direito Civil Estratégico</h4>
                  </div>
                  <p className="text-slate-500 font-light ml-14">Gestão de conflitos e preservação de direitos fundamentais e patrimoniais.</p>
                </div>
                <div className="group p-8 border border-white/10 transition-all hover:bg-white/5 cursor-default">
                  <div className="flex items-center gap-6 mb-4">
                    <ShieldAlert size={28} className="text-white/40 group-hover:text-white transition-colors" />
                    <h4 className="text-2xl font-serif">Direito Criminal Especializado</h4>
                  </div>
                  <p className="text-slate-500 font-light ml-14">Defesa técnica em infrações de ordem econômica, fiscal e ambiental.</p>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 relative group">
              <div className="absolute inset-0 bg-slate-800 translate-x-10 translate-y-10 group-hover:translate-x-14 group-hover:translate-y-14 transition-all duration-700"></div>
              <div className="relative glass bg-white/5 p-4 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop" 
                  alt="Direito" 
                  className="w-full grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section id="sobre" className="py-40 bg-white overflow-hidden">
        <div className="container mx-auto px-8">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <div className="lg:w-1/2 relative group">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="relative z-10"
              >
                <img 
                  src={LAWYER_IMAGE}
                  alt="Matheus Lang Cardoso" 
                  className="w-full grayscale group-hover:grayscale-0 transition-all duration-1000 rounded-none shadow-3xl max-w-md mx-auto border-[1px] border-slate-100 p-2"
                />
              </motion.div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-slate-50 -z-0"></div>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 right-0 w-32 h-32 border-t-2 border-slate-200 rounded-full"
              />
            </div>
            
            <div className="lg:w-1/2">
              <SectionHeading 
                subtitle="O Fundador" 
                title="Matheus Lang Cardoso" 
              />
              <p className="text-2xl text-slate-400 font-light mb-12 italic leading-relaxed">
                "Nosso compromisso é com a viabilidade do negócio. Transformamos o Direito em uma ferramenta de eficiência prática."
              </p>
              <div className="space-y-8 text-slate-600">
                <p className="text-lg">
                  Especialista em Direito Imobiliário e Penal, com visão estratégica multidisciplinar focada em gestão contábil e preservação de ativos corporativos.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                  {[
                    "OAB/RS 12.585",
                    "Mestrando em Direito pela Ambra University",
                    "Especialista em Direito Imobiliário",
                    "Especialista em Direito Penal",
                    "Especialista em Tribunal do Júri",
                    "Especializado em Cobrança Jurídica",
                    "Especializado em Direito Empresarial e Societário"
                  ].map((edu, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                      <div className="w-2 h-2 bg-black group-hover:w-6 transition-all shrink-0"></div>
                      <span className="text-[11px] font-bold uppercase tracking-widest">{edu}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-12">
                  <motion.a 
                    whileHover={{ x: 10 }}
                    href={WHATSAPP_LINK} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.4em] text-black"
                  >
                    Falar com o Fundador <ArrowRight size={18} />
                  </motion.a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section 3D Layers */}
      <section id="contato" className="py-40 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-8 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <SectionHeading 
              subtitle="Conexão" 
              title="Atendimento Especializado" 
              centered
            />
            
            <div className="grid md:grid-cols-3 gap-12 mb-24">
              <GlassCard3D className="bg-white/40">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="block h-full">
                  <div className="p-6 bg-slate-900 text-white inline-block mb-10"><MessageCircle size={32} strokeWidth={1}/></div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">WhatsApp</h4>
                  <p className="text-xl font-medium text-slate-900">{DISPLAY_PHONE}</p>
                </a>
              </GlassCard3D>
              
              <GlassCard3D className="bg-white/40">
                <a href={MAILTO_LINK} className="block h-full">
                  <div className="p-6 bg-slate-900 text-white inline-block mb-10"><Mail size={32} strokeWidth={1}/></div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">E-mail</h4>
                  <p className="text-sm font-medium text-slate-900 break-all">{EMAIL}</p>
                </a>
              </GlassCard3D>
              
              <GlassCard3D className="bg-white/40">
                <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="block h-full">
                  <div className="p-6 bg-slate-900 text-white inline-block mb-10"><MapPin size={32} strokeWidth={1}/></div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Endereço</h4>
                  <p className="text-[11px] font-medium text-slate-900 leading-relaxed uppercase tracking-widest">
                    {FULL_ADDRESS}
                  </p>
                </a>
              </GlassCard3D>
            </div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative group inline-block"
            >
              <div className="absolute -inset-4 bg-black/5 rounded-full blur-2xl group-hover:bg-black/10 transition-all"></div>
              <a 
                href={WHATSAPP_LINK} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="relative px-24 py-10 bg-black text-white font-bold uppercase text-sm tracking-[0.6em] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] transition-all flex items-center gap-6"
              >
                Agendar Consulta Online <ExternalLink size={20} />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer Modern */}
      <footer className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-16">
            <div className="scale-90">
              <Logo />
            </div>
            
            <div className="flex gap-12">
               <motion.a whileHover={{ y: -5 }} href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-black transition-colors"><Instagram size={28} strokeWidth={1}/></motion.a>
               <motion.a whileHover={{ y: -5 }} href="#" className="text-slate-300 hover:text-black transition-colors"><Linkedin size={28} strokeWidth={1}/></motion.a>
            </div>
          </div>

          <div className="mt-24 pt-16 border-t border-slate-50 flex flex-col md:flex-row justify-between gap-8 text-center md:text-left">
            <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-slate-300">
              © Lang Cardoso Advocacia • OAB/RS 12.585
            </p>
            <div className="flex gap-8 justify-center">
              <span className="text-[8px] font-bold uppercase tracking-[0.6em] text-slate-200">Integridade</span>
              <span className="text-[8px] font-bold uppercase tracking-[0.6em] text-slate-200">Estratégia</span>
              <span className="text-[8px] font-bold uppercase tracking-[0.6em] text-slate-200">Excelência</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
