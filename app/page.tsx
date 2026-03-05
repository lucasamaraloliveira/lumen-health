"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Activity,
  Shield,
  Clock,
  ChevronRight,
  FileText,
  Users,
  Globe,
  Menu,
  X,
  CheckCircle2,
  ArrowRight,
  Stethoscope,
  Database,
  Phone,
  Instagram,
  Linkedin,
  Facebook,
  Twitter,
  Mail,
  MapPin,
  ArrowUp,
  MessageCircle
} from 'lucide-react';
import { Logo } from './components/Logo';
import { toast } from 'react-toastify';
import { sendGTMEvent } from '@next/third-parties/google';



const NavItem = ({ children, href }: { children: React.ReactNode, href: string }) => (
  <a
    href={href}
    className="text-slate-600 hover:text-brand-secondary transition-colors font-medium text-sm whitespace-nowrap"
  >
    {children}
  </a>
);

const FeatureCard = ({ icon: Icon, title, description, onClick }: { icon: any, title: string, description: string, onClick?: () => void }) => (
  <motion.div
    whileHover={{ y: -5 }}
    onClick={onClick}
    className={`glass-card p-6 sm:p-8 rounded-2xl flex flex-col gap-4 ${onClick ? 'cursor-pointer hover:border-brand-secondary/50 transition-colors' : ''}`}
  >
    <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center text-brand-secondary shrink-0">
      <Icon size={24} />
    </div>
    <div>
      <h3 className="text-xl font-bold text-brand-primary mb-2">{title}</h3>
      <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{description}</p>
    </div>
  </motion.div>
);

const SocialIcon = ({ icon: Icon, href }: { icon: any, href: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-brand-secondary hover:text-white transition-all duration-300"
  >
    <Icon size={18} />
  </a>
);

const ServiceModal = ({ isOpen, onClose, service }: { isOpen: boolean, onClose: () => void, service: any }) => {
  if (!service) return null;
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] sm:max-w-xl bg-white z-[101] rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="relative p-8 sm:p-12">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 bg-slate-50 rounded-full transition-colors"
              >
                <X size={20} />
              </button>

              <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center text-brand-secondary mb-6">
                <service.icon size={32} />
              </div>

              <h3 className="text-3xl font-bold text-brand-primary mb-4">{service.title}</h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                {service.fullDescription}
              </p>

              <div className="space-y-4">
                <h4 className="font-bold text-brand-primary uppercase text-xs tracking-widest">Diferenciais</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.benefits.map((benefit: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-slate-600 text-sm">
                      <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full mt-10 bg-brand-primary text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all"
              >
                Fechar
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Solicitar Orçamento',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isSubjectOpen, setIsSubjectOpen] = useState(false);
  const subjectRef = useRef<HTMLDivElement>(null);

  const subjectOptions = ['Solicitar Orçamento', 'Dúvidas Técnicas', 'Outros Assuntos'];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (subjectRef.current && !subjectRef.current.contains(event.target as Node)) {
        setIsSubjectOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!formData.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) newErrors.email = 'E-mail inválido';
    if (formData.phone.replace(/\D/g, '').length < 10) newErrors.phone = 'Telefone incompleto';
    if (!formData.message.trim()) newErrors.message = 'Mensagem é obrigatória';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const services = [
    {
      icon: Activity,
      title: "Raio-X Digital",
      description: "Laudos de radiologia convencional e contrastada com alta precisão e rapidez.",
      fullDescription: "Nosso serviço de Raio-X digital utiliza plataformas de ponta para análise de radiografias convencionais e contrastadas. Oferecemos laudos detalhados que auxiliam no diagnóstico rápido de fraturas, patologias torácicas, abdominais e muito mais.",
      benefits: ["Plantão 24/7", "Laudos em 15min", "Dupla checagem", "Conformidade LGPD"]
    },
    {
      icon: Database,
      title: "Tomografia",
      description: "Análise detalhada de exames de CT com reconstruções 3D e protocolos específicos.",
      fullDescription: "Especialistas em Tomografia Computadorizada realizam a leitura de exames complexos, incluindo angiotomografias e reconstruções tridimensionais. Focamos na precisão anatômica e na identificação precoce de anomalias.",
      benefits: ["Reconstrução 3D", "Protocolos específicos", "Subespecialistas", "Alta resolução"]
    },
    {
      icon: Shield,
      title: "Ressonância",
      description: "Especialistas em neuro, musculoesquelético e abdome para laudos complexos.",
      fullDescription: "A Ressonância Magnética exige expertise profunda. Contamos com um corpo clínico dividido por subespecialidades para garantir que cada exame de neuro, abdome ou musculoesquelético seja laudado por quem mais entende do assunto.",
      benefits: ["Laudos Neuro", "Musculoesquelético", "Abdome superior", "Pelve masculina/fem"]
    },
    {
      icon: FileText,
      title: "Mamografia",
      description: "Leitura crítica seguindo padrões BI-RADS para detecção precoce e acompanhamento.",
      fullDescription: "Dedicamos atenção especial à saúde da mulher. Nossos laudos de mamografia seguem rigorosamente o padrão BI-RADS, garantindo uma comunicação clara e precisa entre radiologista e médico assistente.",
      benefits: ["Padrão BI-RADS", "Prevenção", "Expertise em mama", "Acompanhamento"]
    },
    {
      icon: Users,
      title: "Segunda Opinião",
      description: "Consultoria especializada para casos desafiadores e revisão de diagnósticos.",
      fullDescription: "Oferecemos um serviço de consultoria radiológica para casos de alta complexidade. Nossa equipe revisa exames e fornece uma perspectiva adicional fundamentada nas melhores práticas mundiais.",
      benefits: ["Casos complexos", "Revisão detalhada", "Consultoria direta", "Segurança diagnóstica"]
    },
    {
      icon: Globe,
      title: "Telerradiologia 24h",
      description: "Suporte ininterrupto para plantões e emergências em todo o território nacional.",
      fullDescription: "Sua clínica nunca fica descoberta. Nosso serviço de plantão 24 horas garante que exames de urgência e emergência sejam laudados em tempo recorde, independentemente do horário ou localização.",
      benefits: ["Acesso remoto", "Nacional", "Suporte 24/7", "Escalabilidade"]
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.warn('Por favor, corrija os erros no formulário.');
      return;
    }
    setStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Mensagem enviada com sucesso! Entraremos em contato em breve.');

        // Google Ads / GTM Conversion Event
        sendGTMEvent({ event: 'generate_lead', value: 'contact_form' });

        setStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: 'Solicitar Orçamento', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        const errorMsg = typeof result.error === 'object'
          ? (result.error.message || JSON.stringify(result.error))
          : result.error;
        throw new Error(errorMsg || 'Erro ao enviar mensagem.');
      }
    } catch (error: any) {
      console.error('Email error:', error);
      toast.error(error.message || 'Ocorreu um erro inesperado.');
      setStatus('error');
      setErrorMessage(error.message || 'Ocorreu um erro inesperado.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col medical-grid overflow-x-hidden">
      <ServiceModal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        service={selectedService}
      />
      {/* Floating Navbar */}
      <div className="fixed top-4 sm:top-6 inset-x-0 z-50 px-4 sm:px-6 lg:px-8 pointer-events-none">
        <header className="max-w-7xl mx-auto h-16 sm:h-20 glass-card border border-slate-200/50 rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-200/40 flex items-center justify-between px-4 sm:px-8 pointer-events-auto">
          <Logo className="scale-90 sm:scale-100 origin-left" />

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            <NavItem href="#servicos">Serviços</NavItem>
            <NavItem href="#beneficios">Benefícios</NavItem>
            <NavItem href="#sobre">Sobre Nós</NavItem>
            <NavItem href="#contato">Contato</NavItem>
            <button className="bg-brand-primary text-white px-6 py-2.5 rounded-full font-medium text-sm hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
              Portal do Cliente
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-24 right-4 left-4 sm:left-auto sm:right-8 sm:w-[320px] bg-white z-[61] lg:hidden shadow-2xl rounded-3xl p-6 flex flex-col gap-6 border border-slate-100"
            >
              <div className="flex items-center justify-between mb-2">
                <Logo className="scale-90 origin-left" />
                <button onClick={() => setIsMenuOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 bg-slate-50 rounded-full">
                  <X size={20} />
                </button>
              </div>
              <nav className="flex flex-col gap-1">
                <a href="#servicos" className="p-3 font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition-colors flex items-center justify-between group" onClick={() => setIsMenuOpen(false)}>
                  Serviços
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-brand-secondary transition-colors" />
                </a>
                <a href="#beneficios" className="p-3 font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition-colors flex items-center justify-between group" onClick={() => setIsMenuOpen(false)}>
                  Benefícios
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-brand-secondary transition-colors" />
                </a>
                <a href="#sobre" className="p-3 font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition-colors flex items-center justify-between group" onClick={() => setIsMenuOpen(false)}>
                  Sobre Nós
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-brand-secondary transition-colors" />
                </a>
                <a href="#contato" className="p-3 font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition-colors flex items-center justify-between group" onClick={() => setIsMenuOpen(false)}>
                  Contato
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-brand-secondary transition-colors" />
                </a>
              </nav>
              <div className="pt-4 border-t border-slate-100">
                <button className="bg-brand-primary text-white w-full py-4 rounded-2xl font-bold shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all">
                  Portal do Cliente
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center lg:text-left"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-brand-secondary text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-6">
                  <Activity size={14} />
                  Líder em Telerradiologia no Brasil
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-primary leading-[1.1] mb-6">
                  Diagnósticos Precisos, <span className="text-brand-secondary">Sem Fronteiras.</span>
                </h1>
                <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  A Lumen Health conecta sua clínica aos melhores radiologistas do país. Laudos ágeis, precisos e disponíveis 24/7 para elevar o padrão do seu atendimento.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a
                    href="https://wa.me/551140030000?text=Quero%20um%20or%C3%A7amento"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-brand-secondary text-white px-8 py-4 rounded-full font-bold text-base sm:text-lg hover:bg-brand-accent transition-all shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2 group"
                  >
                    Solicitar Orçamento
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a href="#servicos" className="border-2 border-slate-200 text-slate-700 px-8 py-4 rounded-full font-bold text-base sm:text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                    Nossos Serviços
                  </a>
                </div>

                <div className="mt-12 grid grid-cols-3 gap-4 sm:gap-8 border-t border-slate-200 pt-8 max-w-md mx-auto lg:mx-0">
                  <div className="text-center lg:text-left">
                    <div className="text-xl sm:text-2xl font-bold text-brand-primary">15min</div>
                    <div className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-tight">Urgências</div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-xl sm:text-2xl font-bold text-brand-primary">500+</div>
                    <div className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-tight">Clínicas</div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-xl sm:text-2xl font-bold text-brand-primary">100%</div>
                    <div className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-tight">Digital</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative mt-8 lg:mt-0"
              >
                <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl shadow-slate-400/20 border-4 sm:border-8 border-white aspect-[4/3] sm:aspect-auto">
                  <img
                    src="https://picsum.photos/seed/radiology/800/600"
                    alt="Radiologista analisando exames"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/40 to-transparent" />
                </div>

                {/* Floating UI Elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-4 -right-2 sm:-top-6 sm:-right-6 glass-card p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-xl z-20 flex items-center gap-2 sm:gap-3"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-full flex items-center justify-center text-white shrink-0">
                    <CheckCircle2 size={16} className="sm:w-5 sm:h-5" />
                  </div>
                  <div className="hidden xs:block">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Status</div>
                    <div className="text-xs sm:text-sm font-bold text-brand-primary">Laudo Finalizado</div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                  className="absolute -bottom-6 -left-2 sm:-bottom-10 sm:-left-10 glass-card p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-xl z-20"
                >
                  <div className="flex items-center gap-3 sm:gap-4 mb-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-sky-100 rounded-xl flex items-center justify-center text-brand-secondary shrink-0">
                      <Stethoscope size={20} className="sm:w-6 sm:h-6" />
                    </div>
                    <div className="font-bold text-brand-primary text-sm sm:text-base">Especialistas</div>
                  </div>
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map(i => (
                      <img
                        key={i}
                        src={`https://i.pravatar.cc/150?u=${i + 10}`}
                        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white"
                        alt="Avatar"
                      />
                    ))}
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[8px] sm:text-[10px] font-bold text-slate-500">
                      +40
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="beneficios" className="py-16 sm:py-24 bg-slate-50 scroll-mt-24 sm:scroll-mt-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-primary mb-4">Por que escolher a Lumen Health?</h2>
              <p className="text-slate-600 text-base sm:text-lg">Unimos tecnologia de ponta e os melhores profissionais para entregar resultados excepcionais.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Clock, title: "Agilidade", desc: "Laudos urgentes em até 15 minutos e rotina em até 24h." },
                { icon: Shield, title: "Segurança", desc: "Plataforma 100% criptografada seguindo normas da LGPD." },
                { icon: Users, title: "Expertise", desc: "Corpo clínico formado por especialistas das melhores instituições." },
                { icon: CheckCircle2, title: "Qualidade", desc: "Processos rigorosos de dupla checagem e controle de qualidade." }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center"
                >
                  <div className="w-12 h-12 bg-sky-50 rounded-full flex items-center justify-center text-brand-secondary mx-auto mb-4">
                    <item.icon size={24} />
                  </div>
                  <h4 className="font-bold text-brand-primary mb-2">{item.title}</h4>
                  <p className="text-slate-500 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="sobre" className="py-16 sm:py-24 bg-white overflow-hidden scroll-mt-24 sm:scroll-mt-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider mb-6">
                  Nossa História
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-brand-primary mb-6">Tecnologia Humana a Serviço da Vida</h2>
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p>Fundada com o propósito de democratizar o acesso a diagnósticos de alta qualidade, a Lumen Health nasceu da união entre medicina radiológica e inovação tecnológica.</p>
                  <p>Hoje, somos referência em telerradiologia no Brasil, atendendo centenas de clínicas e hospitais com um compromisso inegociável: a precisão diagnóstica que salva vidas.</p>
                  <p>Nossa equipe é composta por radiologistas subespecialistas que utilizam as ferramentas mais avançadas e processamento de imagem para entregar laudos detalhados e assertivos.</p>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-6">
                  <div className="p-4 bg-sky-50 rounded-xl">
                    <div className="text-2xl font-bold text-brand-secondary">1M+</div>
                    <div className="text-xs text-slate-500">Exames laudados</div>
                  </div>
                  <div className="p-4 bg-sky-50 rounded-xl">
                    <div className="text-2xl font-bold text-brand-secondary">24/7</div>
                    <div className="text-xs text-slate-500">Suporte ininterrupto</div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="rounded-3xl overflow-hidden shadow-2xl rotate-3 aspect-[3/4]">
                  <img src="/images/radiologist.png" alt="Médico radiologista analisando exames em monitor profissional" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-brand-accent rounded-full -z-10 blur-3xl opacity-20" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contato" className="py-16 sm:py-24 bg-slate-50 scroll-mt-24 sm:scroll-mt-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-[3rem] shadow-xl overflow-hidden grid lg:grid-cols-5">
              <div className="lg:col-span-2 bg-brand-primary p-8 sm:p-12 text-white">
                <h3 className="text-2xl font-bold mb-6">Canais de Atendimento</h3>
                <p className="text-sky-100/60 mb-12">Estamos prontos para atender sua clínica ou hospital. Escolha o canal de sua preferência.</p>

                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                      <Phone size={24} />
                    </div>
                    <div>
                      <div className="text-xs text-sky-100/40 uppercase font-bold mb-1">Telefone</div>
                      <div className="font-bold">0800 123 4567</div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                      <Mail size={24} />
                    </div>
                    <div>
                      <div className="text-xs text-sky-100/40 uppercase font-bold mb-1">E-mail</div>
                      <div className="font-bold">contato@lumenhealth.com.br</div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <div className="text-xs text-sky-100/40 uppercase font-bold mb-1">Endereço</div>
                      <div className="font-bold text-sm">Rui Barbosa, 45 - Teresópolis, RJ</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-3 p-8 sm:p-12">
                <h3 className="text-2xl font-bold text-brand-primary mb-8">Envie uma mensagem</h3>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-2">Nome Completo</label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: '' });
                        }}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500 bg-red-50' : 'border-slate-200'} focus:border-brand-secondary focus:ring-2 focus:ring-brand-secondary/20 outline-none transition-all`}
                        placeholder="Seu nome..."
                        disabled={status === 'sending'}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">E-mail Corporativo</label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500 bg-red-50' : 'border-slate-200'} focus:border-brand-secondary focus:ring-2 focus:ring-brand-secondary/20 outline-none transition-all`}
                        placeholder="seu@email.com..."
                        disabled={status === 'sending'}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-bold text-slate-700 mb-2">WhatsApp / Telefone</label>
                      <input
                        id="phone"
                        type="text"
                        required
                        value={formData.phone}
                        onChange={(e) => {
                          const formatted = formatPhoneNumber(e.target.value);
                          setFormData({ ...formData, phone: formatted });
                          if (errors.phone) setErrors({ ...errors, phone: '' });
                        }}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500 bg-red-50' : 'border-slate-200'} focus:border-brand-secondary focus:ring-2 focus:ring-brand-secondary/20 outline-none transition-all`}
                        placeholder="(11) 99999-9999"
                        disabled={status === 'sending'}
                        maxLength={15}
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone}</p>}
                    </div>
                    <div ref={subjectRef}>
                      <label htmlFor="subject" className="block text-sm font-bold text-slate-700 mb-2">Assunto</label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setIsSubjectOpen(!isSubjectOpen)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between hover:border-brand-secondary transition-all outline-none focus:ring-2 focus:ring-brand-secondary/20"
                          disabled={status === 'sending'}
                        >
                          <span className="text-slate-600">{formData.subject}</span>
                          <ChevronRight
                            size={16}
                            className={`text-slate-400 transition-transform duration-300 ${isSubjectOpen ? '-rotate-90' : 'rotate-90'
                              }`}
                          />
                        </button>

                        <AnimatePresence>
                          {isSubjectOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-2xl border border-slate-100 py-2 overflow-hidden"
                            >
                              {subjectOptions.map((option) => (
                                <button
                                  key={option}
                                  type="button"
                                  onClick={() => {
                                    setFormData({ ...formData, subject: option });
                                    setIsSubjectOpen(false);
                                  }}
                                  className={`w-full px-4 py-3 text-left text-sm transition-colors hover:bg-sky-50 flex items-center justify-between ${formData.subject === option ? 'text-brand-secondary font-bold bg-sky-50/50' : 'text-slate-600'
                                    }`}
                                >
                                  {option}
                                  {formData.subject === option && <CheckCircle2 size={14} />}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-slate-700 mb-2">Mensagem</label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-xl border ${errors.message ? 'border-red-500 bg-red-50' : 'border-slate-200'} focus:border-brand-secondary focus:ring-2 focus:ring-brand-secondary/20 outline-none transition-all resize-none`}
                      placeholder="Como podemos ajudar?"
                      disabled={status === 'sending'}
                    ></textarea>
                    {errors.message && <p className="text-red-500 text-xs mt-1 font-medium">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className={`w-full bg-brand-secondary text-white py-4 rounded-xl font-bold shadow-lg shadow-sky-100 hover:bg-brand-accent transition-all flex items-center justify-center gap-2 ${status === 'sending' ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                  >
                    {status === 'sending' ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        Enviando...
                      </>
                    ) : (
                      'Enviar Mensagem'
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>


        {/* Services Section */}
        <section id="servicos" className="py-16 sm:py-24 bg-white scroll-mt-24 sm:scroll-mt-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-primary mb-4">Soluções Completas em Telerradiologia</h2>
              <p className="text-slate-600 text-base sm:text-lg">Oferecemos suporte diagnóstico para diversas modalidades, com laudos emitidos por especialistas titulados.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {services.map((service, index) => (
                <FeatureCard
                  key={index}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  onClick={() => setSelectedService(service)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-brand-primary rounded-3xl sm:rounded-[3rem] p-8 sm:p-12 lg:p-20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full bg-gradient-to-l from-brand-secondary/20 to-transparent pointer-events-none" />
              <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                <div className="text-center lg:text-left">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                    Pronto para modernizar o seu centro de diagnóstico?
                  </h2>
                  <p className="text-sky-100/80 text-lg sm:text-xl mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
                    Reduza custos operacionais e aumente a satisfação dos seus pacientes com laudos mais rápidos e precisos.
                  </p>
                  <div className="flex flex-row gap-2 sm:gap-4 justify-center lg:justify-start">
                    <a
                      href="https://wa.me/551140030000?text=Quero%20um%20or%C3%A7amento"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-brand-primary px-4 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-xs sm:text-base lg:text-lg hover:bg-sky-50 transition-all whitespace-nowrap"
                    >
                      Falar com Especialista
                    </a>
                    <a
                      href="tel:1140030000"
                      className="border border-white/30 text-white px-4 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-xs sm:text-base lg:text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                      <Phone size={16} className="sm:w-5 sm:h-5" />
                      (11) 4003-0000
                    </a>
                  </div>
                </div>
                <div className="hidden lg:block">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-3xl border border-white/10">
                        <Clock className="text-brand-accent mb-4" size={32} />
                        <div className="text-white font-bold text-lg">Agilidade</div>
                        <div className="text-sky-100/60 text-sm">Laudos em tempo recorde</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-3xl border border-white/10">
                        <Shield className="text-brand-accent mb-4" size={32} />
                        <div className="text-white font-bold text-lg">Segurança</div>
                        <div className="text-sky-100/60 text-sm">Dados criptografados</div>
                      </div>
                    </div>
                    <div className="space-y-4 pt-8">
                      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-3xl border border-white/10">
                        <Users className="text-brand-accent mb-4" size={32} />
                        <div className="text-white font-bold text-lg">Qualidade</div>
                        <div className="text-sky-100/60 text-sm">Corpo clínico de elite</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-3xl border border-white/10">
                        <Activity className="text-brand-accent mb-4" size={32} />
                        <div className="text-white font-bold text-lg">Inovação</div>
                        <div className="text-sky-100/60 text-sm">Tecnologia de ponta</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 pt-16 sm:pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 sm:col-span-2 lg:col-span-1">
              <Logo className="mb-6" />
              <p className="text-slate-500 leading-relaxed mb-6 max-w-sm">
                Transformando a radiologia através da tecnologia e expertise médica, conectando saúde onde quer que você esteja.
              </p>
              <div className="flex gap-3">
                <SocialIcon icon={Linkedin} href="https://linkedin.com" />
                <SocialIcon icon={Instagram} href="https://instagram.com" />
                <SocialIcon icon={Facebook} href="https://facebook.com" />
                <SocialIcon icon={Twitter} href="https://twitter.com" />
              </div>
            </div>

            <div className="sm:pl-8 lg:pl-0">
              <h4 className="font-bold text-brand-primary mb-6 uppercase text-[10px] tracking-widest">Serviços</h4>
              <ul className="space-y-4 text-slate-600 text-sm sm:text-base">
                <li><button onClick={() => setSelectedService(services[0])} className="hover:text-brand-secondary transition-colors text-left">Raio-X Digital</button></li>
                <li><button onClick={() => setSelectedService(services[1])} className="hover:text-brand-secondary transition-colors text-left">Tomografia</button></li>
                <li><button onClick={() => setSelectedService(services[2])} className="hover:text-brand-secondary transition-colors text-left">Ressonância</button></li>
                <li><button onClick={() => setSelectedService(services[3])} className="hover:text-brand-secondary transition-colors text-left">Mamografia</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-brand-primary mb-6 uppercase text-[10px] tracking-widest">Empresa</h4>
              <ul className="space-y-4 text-slate-600 text-sm sm:text-base">
                <li><a href="#sobre" className="hover:text-brand-secondary transition-colors">Sobre Nós</a></li>
                <li><a href="#beneficios" className="hover:text-brand-secondary transition-colors">Benefícios</a></li>
                <li><a href="#contato" className="hover:text-brand-secondary transition-colors">Contato</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-brand-primary mb-6 uppercase text-[10px] tracking-widest">Contato</h4>
              <ul className="space-y-4 text-slate-600 text-sm sm:text-base">
                <li className="flex items-start gap-3">
                  <Phone size={18} className="text-brand-secondary mt-1 shrink-0" />
                  <span>0800 123 4567</span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail size={18} className="text-brand-secondary mt-1 shrink-0" />
                  <span className="break-all">contato@lumenhealth.com.br</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-brand-secondary mt-1 shrink-0" />
                  <span>Rui Barbosa, 45 - Teresópolis, RJ</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-xs text-slate-400 text-center sm:text-left">
            <p>© 2026 Lumen Health Telerradiologia. Desenvolvido por Alrion Tech 2026.</p>
            <div className="flex gap-6 sm:gap-8">
              <a href="/privacidade" className="hover:text-slate-600 transition-colors">Privacidade</a>
              <a href="/termos" className="hover:text-slate-600 transition-colors">Termos de Uso</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Buttons Container */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-4">
        {/* WhatsApp Balloon */}
        <motion.a
          href="https://wa.me/551140030000"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.5, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          whileHover={{ scale: 1.1, x: -5 }}
          className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl shadow-green-500/40 border-4 border-white cursor-pointer"
          aria-label="Falar no WhatsApp"
        >
          <MessageCircle size={28} fill="currentColor" />
        </motion.a>

        {/* Back to Top Balloon */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 20 }}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="w-14 h-14 bg-brand-secondary text-white rounded-full flex items-center justify-center shadow-2xl shadow-brand-secondary/40 border-4 border-white cursor-pointer group"
              aria-label="Voltar ao início"
            >
              <ArrowUp size={24} className="group-hover:animate-bounce" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
