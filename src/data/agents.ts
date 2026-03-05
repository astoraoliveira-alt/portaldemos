export type AgentId = 'd5b203bf-c1af-4aa6-bac9-b13ab84f9a71' | 'RH_ACOLHIMENTO' | 'UTILITIES_FATURAS' | 'f0137689-cfa0-4dda-9e13-77c925d05d7d';

export interface Agent {
    id: AgentId;
    name: string;
    description: string;
    image: string;
}

export const agents: Agent[] = [
    {
        id: 'd5b203bf-c1af-4aa6-bac9-b13ab84f9a71',
        name: 'RH – Onboarding',
        description: 'Integração automatizada de novos colaboradores.',
        image: '/images/rh_onboarding.png'
    },
    {
        id: 'RH_ACOLHIMENTO',
        name: 'RH – Acolhimento',
        description: 'Acompanhamento humanizado de colaboradores.',
        image: '/images/rh_acolhimento.png'
    },
    {
        id: 'UTILITIES_FATURAS',
        name: 'Utilities – Faturas e Contas',
        description: 'Explicação automática de contas e faturas.',
        image: '/images/utilities_faturas.png'
    },
    {
        id: 'f0137689-cfa0-4dda-9e13-77c925d05d7d',
        name: 'Cobrança',
        description: 'Recuperação de crédito com abordagem inteligente.',
        image: '/images/cobranca.png'
    }
];
