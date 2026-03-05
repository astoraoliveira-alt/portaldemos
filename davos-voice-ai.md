# Experiência Davos Voice AI

## 1. Documento de Requisitos de Produto (PRD)

### Objetivo
Criar uma landing page interativa e premium onde os usuários possam testar agentes de voz de inteligência artificial em tempo real. A experiência deve funcionar como um produto de alto nível e não como uma página de SaaS genérica.

### Público-Alvo
- Clientes B2B, tomadores de decisão em empresas e usuários antenados em tecnologia que buscam soluções avançadas de IA em voz.

### Histórias de Usuário & Critérios de Aceite (AC)
1. **Explorar o Laboratório de Voz (Voice AI Lab)**
   - **Como** usuário, **eu quero** visualizar uma grade futurista dos agentes de IA disponíveis (RH Onboarding, RH Acolhimento, Utilities, Cobrança), **para que** eu entenda as capacidades da plataforma.
   - **AC**: O laboratório não pode se assemelhar a uma grade de cards padrão. Deve apresentar painéis de "glassmorphism", brilhos de borda sutis, ícones de formato de onda animados e efeitos ao passar o mouse (inclinação do painel, intensificação do brilho, animação da onda).

2. **Ativar o Agente de IA**
   - **Como** usuário, **eu quero** clicar em um módulo de agente específico, **para que** um modal/painel se abra de forma fluida para solicitar minhas informações de contato.
   - **AC**: O painel de ativação deve ter um avatar temático de IA, um visualizador de onda animado e campos para Nome e Telefone (com formatação de máscara).

3. **Simulação de Chamada e Disparo**
   - **Como** usuário, **eu quero** enviar meus dados, **para que** a interface faça a transição para uma tela de simulação de chamada enquanto envia um payload de requisição para o backend para disparar a chamada automática real.
   - **AC**: A simulação de chamada deve se assemelhar à interface de um smartphone moderno com ondas de áudio animadas. O sistema deve disparar um POST request para um webhook configurável com `{ name, phone, assistantId }`.

---

## 2. Compromisso de Design (Anticlichê / Anti-Safe Harbor)

🎨 **COMPROMISSO DE DESIGN: Digital Fluido (Liquid Digital) & Brutalismo High-Tech**

- **Escolha Topológica**: Quebra do hábito do "Corte Padrão" (Standard Split) usando uma narrativa com fluxo contínuo vertical. A seção inicial (hero) será uma experiência imersiva de viewport total com camadas profundas de parallax (campos de ondas de áudio animados e partículas de redes neurais) em vez de uma divisão simples de texto/imagem em esquerda e direita.
- **Sistema de Cores (DAVOS)**: Fundo preto e azul marinho profundo misturando-se a detalhes azuis mais claros (light blue) e gradientes. **NENHUM TOM DE ROXO.** (Adesão estrita ao Purple Ban).
- **Geometria**: Limites definidos e precisos (bordas de brilho de 1px, ~2-4px de arredondamento) nos "Módulos do Laboratório" em formato "glassmorphic" (vidro) para invocar a ideia de um painel de controle futurista, evitando o clichê excessivamente suave de "bento grid".
- **Tipografia & Layout**: Tipografia centralizada, em negrito e com alto contraste no hero (`Converse com Agentes de Voz de IA`). Revelações escalonadas e posicionamento assimétrico de elementos na seção do Laboratório de Agentes de Voz.
- **Movimento (Motion) & Efeitos**: Animações com camadas (layered) obrigatórias via Framer Motion. Cada módulo interativo deve fornecer uma resposta volumétrica física (inclinação 3D no hover, pulso no brilho). A profundidade e parallax na seção do hero garantem imersão visual.

## 3. Fases de Implementação
1. **Análise & Portal Socrático**: Definir cenários de borda (edge cases) e compensações arquitetônicas (Fase Atual).
2. **Planejamento & Setup**: Inicializar React/Next.js/Vite com TailwindCSS e Framer Motion. Estabelecer o sistema base de design (cores, design tokens).
3. **Desenvolvimento Principal**: Construir a seção Hero imersiva, a grade modular do VoiceLab, o modal Activation Panel e a interface Call Simulation.
4. **Integração**: Conectar o evento `onSubmit` ao disparo externo do webhook. Adicionar manipulação robusta de erros.
5. **Auditoria**: Executar o "Maestro Audit" e a verificação frontend antes da entrega final.
