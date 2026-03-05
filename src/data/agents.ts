export type AgentId = 'd5b203bf-c1af-4aa6-bac9-b13ab84f9a71' | 'c74c2543-29be-43f1-b399-c12636593096' | '36a66e30-533b-4b61-ab57-e79c23543bbd' | 'f0137689-cfa0-4dda-9e13-77c925d05d7d';

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
        id: 'c74c2543-29be-43f1-b399-c12636593096',
        name: 'RH – Acolhimento',
        description: 'Acompanhamento humanizado de colaboradores.',
        image: '/images/rh_acolhimento.png'
    },
    {
        id: '36a66e30-533b-4b61-ab57-e79c23543bbd',
        name: 'Saneamento – Atendimento',
        description: 'Agendamento automático de manutenções e suporte.',
        image: '/images/saneamento.png'
    },
    {
        id: 'f0137689-cfa0-4dda-9e13-77c925d05d7d',
        name: 'Cobrança',
        description: 'Recuperação de crédito com abordagem inteligente.',
        image: '/images/cobranca.png'
    }
];
