import React from 'react';
import { Logo } from '../components/Logo';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function Termos() {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-secondary transition-colors mb-8 group">
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Voltar para Home
                </Link>

                <div className="bg-white rounded-[2rem] shadow-xl p-8 sm:p-12">
                    <Logo className="mb-12" />
                    <h1 className="text-4xl font-bold text-brand-primary mb-8">Termos de Uso</h1>

                    <div className="prose prose-slate max-w-none space-y-6 text-slate-600">
                        <p>Bem-vindo à <strong>Lumen Health</strong>. Ao acessar nosso site e utilizar nossos serviços, você concorda com os seguintes termos e condições.</p>

                        <h2 className="text-2xl font-bold text-brand-primary mt-8">1. Aceitação dos Termos</h2>
                        <p>O uso dos serviços prestados pela Lumen Health implica na aceitação plena e sem reservas de todos os itens destes Termos de Uso.</p>

                        <h2 className="text-2xl font-bold text-brand-primary mt-8">2. Responsabilidades</h2>
                        <p>A Lumen Health é responsável pela entrega de laudos radiológicos baseados nas imagens enviadas. É responsabilidade da clínica contratante garantir a qualidade técnica das imagens enviadas para análise.</p>

                        <h2 className="text-2xl font-bold text-brand-primary mt-8">3. Uso do Portal</h2>
                        <p>O acesso ao Portal do Cliente é restrito a profissionais autorizados. O compartilhamento de credenciais de acesso é estritamente proibido e pode resultar em suspensão do serviço.</p>

                        <h2 className="text-2xl font-bold text-brand-primary mt-8">4. Propriedade Intelectual</h2>
                        <p>Todo o conteúdo presente neste site, incluindo textos, logotipos e design, é de propriedade exclusiva da Lumen Health ou licenciadores autorizados.</p>
                    </div>
                </div>

                <footer className="mt-12 text-center text-slate-400 text-sm">
                    © 2026 Lumen Health Telerradiologia - Desenvolvido por Alrion Tech
                </footer>
            </div>
        </div>
    );
}
