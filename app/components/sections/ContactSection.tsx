"use client";

import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, MapPin, ChevronRight, CheckCircle2 } from 'lucide-react';

interface ContactSectionProps {
    formData: any;
    setFormData: (data: any) => void;
    status: string;
    errors: any;
    setErrors: (errors: any) => void;
    handleSubmit: (e: React.FormEvent) => void;
    isSubjectOpen: boolean;
    setIsSubjectOpen: (open: boolean) => void;
    subjectOptions: string[];
}

export default function ContactSection({
    formData,
    setFormData,
    status,
    errors,
    setErrors,
    handleSubmit,
    isSubjectOpen,
    setIsSubjectOpen,
    subjectOptions
}: ContactSectionProps) {
    const subjectRef = useRef<HTMLDivElement>(null);

    const formatPhoneNumber = (value: string) => {
        const numbers = value.replace(/\D/g, '');
        if (numbers.length <= 2) return numbers;
        if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
    };

    return (
        <section id="contato" className="py-16 sm:py-24 bg-slate-50 scroll-mt-24 sm:scroll-mt-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-[3rem] shadow-xl overflow-hidden grid lg:grid-cols-5 border border-slate-100">
                    <div className="lg:col-span-2 bg-brand-primary p-8 sm:p-12 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-secondary/10 blur-3xl -mr-32 -mt-32 rounded-full" />
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-6">Canais de Atendimento</h3>
                            <p className="text-sky-100/60 mb-12">Estamos prontos para atender sua clínica ou hospital. Escolha o canal de sua preferência.</p>

                            <div className="space-y-8">
                                <div className="flex gap-4 group">
                                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-brand-secondary/20 transition-colors">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <div className="text-xs text-sky-100/70 uppercase font-bold mb-1">Telefone</div>
                                        <div className="font-bold">0800 123 4567</div>
                                    </div>
                                </div>
                                <div className="flex gap-4 group">
                                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-brand-secondary/20 transition-colors">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <div className="text-xs text-sky-100/70 uppercase font-bold mb-1">E-mail</div>
                                        <div className="font-bold">contato@lumenhealth.com.br</div>
                                    </div>
                                </div>
                                <div className="flex gap-4 group">
                                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-brand-secondary/20 transition-colors">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <div className="text-xs text-sky-100/70 uppercase font-bold mb-1">Endereço</div>
                                        <div className="font-bold text-sm">Rui Barbosa, 45 - Teresópolis, RJ</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-3 p-8 sm:p-12">
                        <h3 className="text-2xl font-bold text-brand-primary mb-8">Envie uma mensagem</h3>
                        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-2">Nome Completo</label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => {
                                            setFormData({ ...formData, name: e.target.value });
                                            if (errors.name) setErrors({ ...errors, name: '' });
                                        }}
                                        className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500 bg-red-50/50 ring-2 ring-red-500/10' : 'border-slate-200'} focus:border-brand-secondary focus:ring-2 focus:ring-brand-secondary/20 outline-none transition-all placeholder:text-slate-400`}
                                        placeholder="Seu nome..."
                                        disabled={status === 'sending'}
                                    />
                                    <AnimatePresence>
                                        {errors.name && (
                                            <motion.p
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="text-red-500 text-xs mt-1 font-medium overflow-hidden"
                                            >
                                                {errors.name}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">E-mail Corporativo</label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => {
                                            setFormData({ ...formData, email: e.target.value });
                                            if (errors.email) setErrors({ ...errors, email: '' });
                                        }}
                                        className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500 bg-red-50/50 ring-2 ring-red-500/10' : 'border-slate-200'} focus:border-brand-secondary focus:ring-2 focus:ring-brand-secondary/20 outline-none transition-all placeholder:text-slate-400`}
                                        placeholder="seu@email.com..."
                                        disabled={status === 'sending'}
                                    />
                                    <AnimatePresence>
                                        {errors.email && (
                                            <motion.p
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="text-red-500 text-xs mt-1 font-medium overflow-hidden"
                                            >
                                                {errors.email}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-bold text-slate-700 mb-2">WhatsApp / Telefone</label>
                                    <input
                                        id="phone"
                                        type="text"
                                        value={formData.phone}
                                        onChange={(e) => {
                                            const formatted = formatPhoneNumber(e.target.value);
                                            setFormData({ ...formData, phone: formatted });
                                            if (errors.phone) setErrors({ ...errors, phone: '' });
                                        }}
                                        className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500 bg-red-50/50 ring-2 ring-red-500/10' : 'border-slate-200'} focus:border-brand-secondary focus:ring-2 focus:ring-brand-secondary/20 outline-none transition-all placeholder:text-slate-400`}
                                        placeholder="(11) 99999-9999"
                                        disabled={status === 'sending'}
                                        maxLength={15}
                                    />
                                    <AnimatePresence>
                                        {errors.phone && (
                                            <motion.p
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="text-red-500 text-xs mt-1 font-medium overflow-hidden"
                                            >
                                                {errors.phone}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
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
                                                className={`text-slate-400 transition-transform duration-300 ${isSubjectOpen ? '-rotate-90' : 'rotate-90'}`}
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
                                                            className={`w-full px-4 py-3 text-left text-sm transition-colors hover:bg-sky-50 flex items-center justify-between ${formData.subject === option ? 'text-brand-secondary font-bold bg-sky-50/50' : 'text-slate-600'}`}
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
                                    value={formData.message}
                                    onChange={(e) => {
                                        setFormData({ ...formData, message: e.target.value });
                                        if (errors.message) setErrors({ ...errors, message: '' });
                                    }}
                                    className={`w-full px-4 py-3 rounded-xl border ${errors.message ? 'border-red-500 bg-red-50/50 ring-2 ring-red-500/10' : 'border-slate-200'} focus:border-brand-secondary focus:ring-2 focus:ring-brand-secondary/20 outline-none transition-all resize-none placeholder:text-slate-400`}
                                    placeholder="Como podemos ajudar?"
                                    disabled={status === 'sending'}
                                ></textarea>
                                <AnimatePresence>
                                    {errors.message && (
                                        <motion.p
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="text-red-500 text-xs mt-1 font-medium overflow-hidden"
                                        >
                                            {errors.message}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                className={`w-full bg-sky-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-sky-100 hover:bg-brand-primary transition-all flex items-center justify-center gap-2 ${status === 'sending' ? 'opacity-70 cursor-not-allowed' : ''}`}
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
    );
}
