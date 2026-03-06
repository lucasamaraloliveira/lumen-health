"use client";

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2 } from 'lucide-react';

interface ServiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    service: any;
}

const ServiceModal = ({ isOpen, onClose, service }: ServiceModalProps) => {
    if (!service) return null;

    return (
        <AnimatePresence mode="wait">
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm shadow-inner"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden"
                    >
                        <div className="relative p-8 sm:p-12">
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 bg-slate-50 rounded-full transition-colors"
                                aria-label="Fechar"
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
                                className="w-full mt-10 bg-brand-primary text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
                            >
                                Fechar
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ServiceModal;
