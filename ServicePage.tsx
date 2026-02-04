
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WHATSAPP_LINK = "https://wa.me/555532176378";

// Import Logo and Navbar components if they were separate, 
// but since they are in App.tsx we will pass them or redefine a simple version here 
// for consistency in a single-file mental model.

interface ServicePageProps {
  title: string;
  subtitle: string;
  description: string;
  ctaText?: string;
  LogoComponent: React.FC<any>;
}

const PREMIUM_EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

export const ServicePage: React.FC<ServicePageProps> = ({ title, subtitle, description, ctaText = "Agendar Consulta", LogoComponent }) => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Editorial Header */}
      <section className="relative pt-40 pb-20 md:pt-52 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-8 relative z-10">
          
          <motion.button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 hover:text-black mb-12 transition-colors"
          >
            <ChevronLeft size={14} /> Voltar para o início
          </motion.button>

          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: PREMIUM_EASE }}
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-400 block mb-6">
                  {subtitle}
                </span>
                <h1 className="text-5xl md:text-8xl font-serif text-slate-900 leading-[0.9] mb-12 tracking-tight">
                  {title}
                </h1>
              </motion.div>
            </div>
            
            <div className="lg:col-span-4 flex justify-end">
               <div className="hidden lg:block">
                 <LogoComponent translucent className="scale-75 origin-right" />
               </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 -z-10"></div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl">
             <motion.div
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               transition={{ duration: 1 }}
               className="text-2xl md:text-3xl text-slate-500 font-light leading-relaxed mb-20 whitespace-pre-line"
             >
               {description}
             </motion.div>

             <div className="flex flex-col sm:flex-row gap-8 items-center">
                <motion.a 
                  whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-14 py-8 bg-black text-white font-bold uppercase text-xs tracking-[0.4em] shadow-2xl flex items-center gap-4 w-full sm:w-auto justify-center"
                >
                  {ctaText} <ArrowRight size={18} />
                </motion.a>
             </div>
          </div>
        </div>
      </section>

      {/* Footer minimal for Service Page */}
      <footer className="py-20 border-t border-slate-100 bg-slate-50">
        <div className="container mx-auto px-8 text-center">
           <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-300">
             © Lang Cardoso Advocacia • Excelência Jurídica sob Medida
           </p>
        </div>
      </footer>
    </div>
  );
};
