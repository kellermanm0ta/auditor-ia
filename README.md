# AuditorIA

**AuditorIA** é uma plataforma de análise automatizada de repositórios de código utilizando agentes de IA. O sistema orquestra múltiplos agentes especializados para avaliar segurança, arquitetura, qualidade do código, desempenho e dependências de um projeto.

### Funcionalidades

- **Análise multi-agente** — executa agentes de IA especializados em paralelo ou em série
- **Skills customizáveis** — ative/desative agentes e edite os prompts de cada um
- **Pipeline visual** — veja e reordene a ordem de execução dos agentes
- **Histórico de análises** — consulte resultados anteriores com busca
- **Integrações CI/CD** — conecte com GitHub Actions, GitLab CI, Jenkins, webhooks e CLI
- **Tema escuro** — interface moderna com Bootstrap 5 em dark mode

### Skills disponíveis

| Skill | Descrição |
|---|---|
| Análise de Segurança | Identifica SQL injection, XSS, secrets expostos e OWASP Top 10 |
| Análise de Arquitetura | Avalia acoplamento, coesão e padrões de projeto |
| Code Smell | Detecta duplicação, métodos longos e complexidade alta |
| Análise de Desempenho | Aponta queries N+1, falta de cache e gargalos |
| Dependências | Verifica versões, vulnerabilidades e licenças |

---

## Pré-requisitos

- **Node.js** versão 18 ou superior
- **npm** (acompanha o Node.js) ou **yarn** / **pnpm**

## Como executar

> **Nota:** A aba Integrações consome dados de uma API REST. Em desenvolvimento, o Next.js faz proxy de `/api/*` para `http://localhost:8000/api/*` (configurado em `next.config.ts`). Certifique-se de que o backend esteja rodando na porta 8000.

### Linux / macOS / Windows (comando único)

```bash
# 1. Instalar as dependências
npm install

# 2. Iniciar o servidor de desenvolvimento
npm run dev
```

3. Abra [http://localhost:3000](http://localhost:3000) no navegador.

### Passo a passo (Linux)

```bash
# Atualizar pacotes (Debian/Ubuntu)
sudo apt update && sudo apt install nodejs npm -y

# Verificar versão
node --version   # deve ser >= 18

# Clonar o projeto e entrar no diretório
cd auditor-ia

# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npm run dev
```

### Passo a passo (Windows)

1. Instale o Node.js em [nodejs.org](https://nodejs.org/)
2. Abra o **PowerShell** ou **Command Prompt**
3. Navegue até a pasta do projeto:

```powershell
cd C:\caminho\para\auditor-ia
```

4. Instale as dependências e inicie:

```powershell
npm install
npm run dev
```

5. Acesse `http://localhost:3000`

### Comandos úteis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera a build de produção |
| `npm run start` | Inicia o servidor com a build de produção |
| `npm run lint` | Verifica problemas no código |

## Tecnologias

- **Next.js 16** — framework React com App Router
- **React 19** — biblioteca de UI
- **Bootstrap 5.3** — framework CSS (dark theme)
- **Bootstrap Icons** — ícones
- **react-markdown** — renderização de markdown
- **TypeScript** — tipagem estática

## Estrutura do projeto

```
auditor-ia/
├── app/
│   ├── globals.css       # Estilos globais
│   ├── layout.tsx         # Layout raiz com Bootstrap
│   └── page.tsx           # Página principal (dashboard)
├── components/
│   ├── Sidebar.tsx        # Navegação lateral
│   ├── TopNavbar.tsx      # Barra superior (mobile)
│   ├── AsyncWrapper.tsx   # Loading/error states reutilizável
│   ├── HomeTab.tsx        # Tela de análise
│   ├── SkillsTab.tsx      # Gerenciamento de skills
│   ├── WorkflowTab.tsx    # Pipeline de agentes
│   ├── HistoryTab.tsx     # Histórico de análises
│   ├── IntegrationsTab.tsx# Integrações CI/CD (consome API)
│   └── ConfigTab.tsx      # Configurações
├── data/
│   ├── skills.ts          # Dados mockados das skills
│   ├── analysis.ts        # Relatório mockado (markdown)
│   ├── history.ts         # Histórico mockado
│   └── integrations.ts    # Tipo das integrações (dados via API)
├── next.config.ts         # Rewrites de API (proxy em dev)
└── package.json
```