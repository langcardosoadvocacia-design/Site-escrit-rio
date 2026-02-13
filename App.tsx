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

// --- MENSAGEM DO WHATSAPP ATUALIZADA ---
const MENSAGEM_WA = encodeURIComponent("Olá, vim através do site e preciso de ajuda.");
const LINK_WHATSAPP = `https://wa.me/555532176378?text=${MENSAGEM_WA}`;

const EMAIL_CONTATO = "contato@langcardoso.adv.br";
const LINK_INSTAGRAM = "https://www.instagram.com/langcardosoadvocacia";
const LINK_MAPA = "https://www.google.com/maps/search/?api=1&query=Alameda+Montevideo,+322,+Sala+108,+Santa+Maria+-+RS";

const TRANSICAO_SUAVE: [number, number, number, number] = [0.23, 1, 0.32, 1];

const dispararConversaoWhatsApp = () => {
  if (typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', 'conversion', { 'send_to': 'AW-17926426473/xB7yCIDz6vIbEOme_uNC', 'value': 1.0, 'currency': 'BRL' });
  }
};

// --- COMPONENTES BASE ---

const Logotipo: React.FC<{ reduzido?: boolean }> = ({ reduzido = false }) => (
  <div className={`flex flex-col items-center border border-black bg-white ${reduzido ? 'px-3 py-2' : 'px-8 py-10'}`}>
    <span className={`${reduzido ? 'text-[9px]' : 'text-2xl'} font-bold tracking-[0.2em] uppercase`}>Lang Cardoso</span>
    <div className="w-full h-[1px] bg-black my-1"></div>
    <span className={`${reduzido ? 'text-[7px]' : 'text-xl'} font-bold tracking-[0.4em] uppercase`}>Advocacia</span>
  </div>
);

const BotaoCTA: React.FC<{ texto: string }> = ({ texto }) => (
  <a href={LINK_WHATSAPP} target="_blank" rel="noopener noreferrer" onClick={dispararConversaoWhatsApp} className="inline-flex items-center gap-4 px-10 py-6 bg-black text-white font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-gray-800 transition-all cursor-pointer">
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
          <a href={LINK_WHATSAPP} onClick={dispararConversaoWhatsApp} className="px-6 py-3 bg-black text-white text-[9px] font-bold uppercase tracking-widest">Atendimento</a>
        </div>
        <button className="lg:hidden" onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
      </div>
      <AnimatePresence>{menu && <motion.div className="lg:hidden bg-white p-8 flex flex-col gap-6 shadow-xl">{links.map(l => <Link key={l.caminho} to={l.caminho} onClick={() => setMenu(false)} className="text-[12px] font-bold uppercase tracking-widest">{l.nome}</Link>)}</motion.div>}</AnimatePresence>
    </nav>
  );
};

// --- MODELO DE PÁGINA DE SERVIÇO ---

const ModeloPaginaServico: React.FC<{ titulo: string; subtitulo: string; dores: any[]; servicos: any[]; area: string; }> = ({ titulo, subtitulo, dores, servicos, area }) => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <main className="bg-white">
      <section className="min-h-[70vh] flex flex-col justify-center bg-[#fcfcfc] pt-20">
        <div className="container mx-auto px-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-black/30 mb-6 block">{area}</span>
          <h1 className="text-5xl md:text-8xl font-serif mb-10 tracking-tighter leading-tight">{titulo}</h1>
          <p className="text-lg md:text-2xl text-black/50 font-light leading-relaxed max-w-3xl border-l border-black/10 pl-8 mb-12">{subtitulo}</p>
          <BotaoCTA texto="Agende uma Reunião" />
        </div>
      </section>
      <section className="py-24 container mx-auto px-6 border-y border-black/5">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {dores.map((d, i) => (
            <CardInterativo key={i} className="p-10">
              <AlertCircle className="mb-8 text-black/20" size={32} />
              <h3 className="text-xl font-serif mb-4 uppercase">{d.t}</h3>
              <p className="text-xs text-black/50 font-light leading-relaxed">{d.d}</p>
            </CardInterativo>
          ))}
        </div>
      </section>
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-6">
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

const PaginaInicial = () => (
  <main className="bg-white">
    <section className="min-h-screen flex flex-col justify-center bg-[#fcfcfc] px-6">
      <div className="container mx-auto">
        <h1 className="text-6xl md:text-9xl font-serif tracking-tighter mb-10 leading-none">Atuação <br /><span className="italic text-gray-400">Consciente.</span></h1>
        <p className="text-lg md:text-2xl text-black/50 font-light max-w-2xl border-l border-black/10 pl-8 mb-12">Proteção de ativos e defesa intransigente da liberdade individual e empresarial.</p>
        <BotaoCTA texto="Solicitar Consulta" />
      </div>
    </section>
    <Rodape />
  </main>
);

const PaginaEquipe = () => {
  const equipe = [
    { n: "Dr. Matheus Lang", a: "Sócio Fundador", i: IMAGEM_MATHEUS },
    { n: "Nicolas", a: "Produtos Digitais e Modelos de Assinatura (SaaS); Marketing Estratégico; Social Media", i: IMG_NICOLAS },
    { n: "Jefferson", a: "Consultoria e Estrutura Técnica", i: IMG_JEFFERSON }
  ];
  return (
    <main className="pt-32 pb-20 container mx-auto px-6">
      <h1 className="text-6xl font-serif mb-16 tracking-tighter">Equipe.</h1>
      <div className="grid md:grid-cols-3 gap-10">
        {equipe.map((m, idx) => (
          <CardInterativo key={idx} className="flex flex-col">
            <div className="aspect-[3/4] overflow-hidden grayscale hover:grayscale-0 transition-all">
              <img src={m.i} className="w-full h-full object-cover" alt={m.n} />
            </div>
            <div className="p-8 text-center bg-white flex-grow flex flex-col justify-center">
              <h3 className="font-serif text-2xl mb-4">{m.n}</h3>
              <p className="text-[10px] uppercase tracking-widest text-black/40 leading-loose">{m.a}</p>
            </div>
          </CardInterativo>
        ))}
      </div>
      <Rodape />
    </main>
  );
};

const Rodape = () => (
  <footer className="py-24 bg-white border-t border-black/5">
    <div className="container mx-auto px-6 flex flex-col items-center gap-10">
      <Logotipo reduzido />
      <div className="grid md:grid-cols-3 gap-12 border-y border-black/10 py-16 w-full text-center">
        <div><MapPin className="mx-auto mb-4" /> <h5 className="text-[11px] font-bold uppercase mb-2">Localização</h5> <p className="text-xs text-black/40">Santa Maria - RS</p></div>
        <div><MessageCircle className="mx-auto mb-4" /> <h5 className="text-[11px] font-bold uppercase mb-2">WhatsApp</h5> <p className="text-xs text-black/40">(55) 3217-6378</p></div>
        <div><Mail className="mx-auto mb-4" /> <h5 className="text-[11px] font-bold uppercase mb-2">E-mail</h5> <p className="text-xs text-black/40">{EMAIL_CONTATO}</p></div>
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
            <div className="grid gap-10">
              {[IMG_ESCRITORIO_1, IMG_ESCRITORIO_2, IMG_ESCRITORIO_3].map((img, i) => (
                <img key={i} src={img} className="w-full grayscale border border-black/5" alt="Ambiente" />
              ))}
            </div>
            <Rodape />
          </main>
        } />
        <Route path="/assessoria-empresarial" element={
          <ModeloPaginaServico area="Direito Corporativo" titulo="Direito Cível" subtitulo="Consultoria estratégica focada na segurança patrimonial e viabilidade econômica do seu negócio." 
            dores={[
              {t:"Cobranças", d:"Atuação estratégica na recuperação de ativos financeiros através de métodos de cobrança judicial e extrajudicial. Utilizamos técnicas avançadas de investigação patrimonial e inteligência de dados para localizar bens e garantir a efetividade da execução, transformando títulos de crédito em liquidez imediata para o cliente."}, 
              {t:"CONTRATOS", d:"Desenvolvimento e revisão técnica de instrumentos contratuais personalizados. Nossa prioridade é a blindagem jurídica, antecipando cenários de risco e estabelecendo cláusulas de proteção robustas que garantam a segurança do negócio e minimizem a possibilidade de litígios futuros."}, 
              {t:"FAMÍLIA", d:"Atendimento especializado e humanizado em demandas de alta complexidade, como divórcios, partilhas de bens e fixação ou revisão de pensão alimentícia. Focamos na solução estratégica de conflitos, priorizando a preservação do patrimônio familiar e o bem-estar dos envolvidos através de composições técnicas e precisas."}, 
              {t:"CONSULTORIA", d:"Análise contínua e preventiva de relações jurídicas para identificação de vulnerabilidades. Oferecemos suporte consultivo para a tomada de decisões, garantindo que as operações de pessoas físicas ou jurídicas estejam em total conformidade com a legislação vigente, evitando prejuízos financeiros e reputacionais."}
            ]}
            servicos={[
              {t:"IMOBILIÁRIO", d:"Consultoria completa para a regularização de propriedades e estruturação de negócios imobiliários. Atuamos desde o due diligence em transações de compra e venda até a elaboração de contratos de locação e incorporação, desburocratizando processos e garantindo a plena segurança do registro patrimonial.", i:<Scale size={28}/>}, 
              {t:"DÍVIDAS", d:"Atuação técnica na renegociação de passivos bancários e estruturação de cronogramas de pagamento sustentáveis. Protegemos o fluxo de caixa e o patrimônio do cliente através da revisão de cláusulas abusivas, juros extorsivos e propostas de acordo que visem o reequilíbrio financeiro e a viabilidade do negócio.", i:<Landmark size={28}/>}, 
              {t:"REGULARIZAÇÃO", d:"Soluções jurídicas integradas para a resolução de pendências em bens móveis e imóveis. Atuamos na retificação de registros, inventários acumulados e desembaraço de ativos, garantindo que o patrimônio esteja livre de entraves legais para exploração comercial ou transferência sucessória.", i:<ReceiptText size={28}/>}
            ]}
          />
        } />
        <Route path="/defesa-criminal" element={
          <ModeloPaginaServico area="Direito Penal de Elite" titulo="Defesa da Liberdade." subtitulo="Atuação tática de urgência com rigor garantista para proteção dos direitos fundamentais."
            dores={[
              {t:"VIOLÊNCIA DOMÉSTICA", d:"Atuação técnica e estratégica em casos regidos pela Lei Maria da Penha. Oferecemos suporte completo tanto no requerimento quanto na contestação de medidas protetivas de urgência, além de uma defesa criminal combativa que prioriza a preservação dos direitos e a análise minuciosa das provas apresentadas."}, 
              {t:"TRIBUNAL DO JÚRI", d:"Defesa especializada em crimes dolosos contra a vida. Nossa atuação em plenário combina oratória persuasiva, rigor técnico e análise psicológica de provas, visando a melhor estratégia de convencimento frente ao conselho de sentença para garantir a soberania do veredito e a liberdade do cliente."}, 
              {t:"CUSTÓDIA", d:"Atendimento imediato e presencial em casos de prisão em flagrante. Focamos na análise da legalidade do ato prisional e na articulação de pedidos de liberdade provisória ou substituição por medidas cautelares, garantindo que o cliente não permaneça detido ilegalmente."}, 
              {t:"CIBERNÉTICOS", d:"Defesa e investigação especializada em fraudes online, invasão de dispositivos, estelionato eletrônico e crimes de imagem na rede. Atuamos com suporte pericial para rastreamento de evidências digitais, protegendo sua reputação e seu patrimônio no ambiente virtual."}
            ]}
            servicos={[
              {t:"EMPRESARIAIS", d:"Defesa corporativa de alta performance em crimes contra o sistema financeiro, ordem tributária, relações de consumo e lavagem de dinheiro. Atuamos na proteção dos sócios e da empresa, mitigando riscos reputacionais e garantindo a conformidade perante os órgãos de fiscalização.", i:<Search size={28}/>}, 
              {t:"FLAGRANTE", d:"Disponibilidade absoluta para acompanhamento em delegacias e órgãos de investigação a qualquer hora. A presença técnica desde os primeiros momentos da prisão é crucial para evitar nulidades, orientar o depoimento e construir a base de uma defesa sólida.", i:<FileText size={28}/>}, 
              {t:"DEFESA TÉCNICA", d:"Gestão estratégica do processo penal em todas as suas fases: desde o acompanhamento de inquéritos policiais até a sustentação oral em recursos nos Tribunais Superiores (TJ, STJ e STF). Cada etapa é tratada como decisiva para o resultado final do processo.", i:<Lock size={28}/>}
            ]}
          />
        } />
      </Routes>
    </HashRouter>
  );
}
