import React from 'react';
import { Logo } from '../components/Logo';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function Privacidade() {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-secondary transition-colors mb-8 group">
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Voltar para Home
                </Link>

                <div className="bg-white rounded-[2rem] shadow-xl p-8 sm:p-12">
                    <Logo className="mb-12" />
                    <h1 className="text-4xl font-bold text-brand-primary mb-8">Política de Privacidade</h1>

                    <div className="prose prose-slate max-w-none space-y-6 text-slate-600">
                        <p>A <strong>Lumen Health</strong> valoriza a sua privacidade. Esta Política de Privacidade descreve como coletamos, usamos e protegemos suas informações pessoais ao utilizar nossos serviços de telerradiologia.</p>

                        <h2 className="text-2xl font-bold text-brand-primary mt-8">1. Coleta de Informações</h2>
                        <p>Coletamos informações necessárias para a prestação de serviços médicos e diagnósticos, incluindo dados cadastrais e exames de imagem enviados pelas clínicas parceiras.</p>

                        <h2 className="text-2xl font-bold text-brand-primary mt-8">2. Proteção de Dados (LGPD)</h2>
                        <p>Operamos em total conformidade com a Lei Geral de Proteção de Dados (LGPD). Todos os dados sensíveis e médicos são criptografados e armazenados em servidores seguros com acesso restrito.</p>

                        <h2 className="text-2xl font-bold text-brand-primary mt-8">3. Uso das Informações</h2>
                        <p>Os dados coletados são utilizados exclusivamente para:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Emissão de laudos radiológicos;</li>
                            <li>Comunicação com a clínica solicitante;</li>
                            <li>Melhoria contínua de nossos processos diagnósticos;</li>
                            <li>Cumprimento de obrigações legais e regulatórias.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-brand-primary mt-8">4. Seus Direitos</h2>
                        <p>Como titular dos dados, você tem o direito de solicitar o acesso, correção ou exclusão de suas informações pessoais a qualquer momento, conforme previsto em lei.</p>
                    </div>
                </div>

                <footer className="mt-12 text-center text-slate-400 text-sm">
                    © 2026 Lumen Health Telerradiologia - Desenvolvido por Alrion Tech
                </footer>
            </div>
        </div>
    );
}
