import {
    Activity,
    Database,
    Shield,
    FileText,
    Users,
    Globe
} from 'lucide-react';

export const services = [
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
