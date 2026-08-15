export interface Integration {
  id: string;
  name: string;
  icon: string;
  desc: string;
  status: 'connected' | 'disconnected';
  statusLabel: string;
  docUrl: string;
  steps: string[];
  yaml: string;
}

export const integrationsData: Integration[] = [
  {
    id: 'github-actions',
    name: 'GitHub Actions',
    icon: 'bi-github',
    desc: 'Execute a análise automaticamente em cada push ou pull request.',
    status: 'connected',
    statusLabel: 'Conectado',
    docUrl: '#',
    steps: [
      'Adicione o token AUDITORIA_TOKEN como secret do repositório.',
      'Crie o arquivo .github/workflows/auditoria.yml:'
    ],
    yaml: `name: AuditorIA Analysis
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run AuditorIA
        run: |
          curl -s -X POST https://api.auditoria.dev/analyze \\
            -H "Authorization: Bearer \${{ secrets.AUDITORIA_TOKEN }}" \\
            -H "Content-Type: application/json" \\
            -d '{"repo":"\${{ github.repository }}","ref":"\${{ github.ref }}"}'
`
  },
  {
    id: 'gitlab-ci',
    name: 'GitLab CI',
    icon: 'bi-gitlab',
    desc: 'Integre a análise nos pipelines do GitLab com um job customizado.',
    status: 'disconnected',
    statusLabel: 'Desconectado',
    docUrl: '#',
    steps: [
      'Configure a variável AUDITORIA_TOKEN no CI/CD Settings do projeto.',
      'Adicione ao seu .gitlab-ci.yml:'
    ],
    yaml: `auditoria-analysis:
  stage: test
  image: curlimages/curl:latest
  script:
    - curl -s -X POST https://api.auditoria.dev/analyze
        -H "Authorization: Bearer \$AUDITORIA_TOKEN"
        -H "Content-Type: application/json"
        -d '{"repo":"\$CI_PROJECT_PATH","ref":"\$CI_COMMIT_REF_NAME"}'
  only:
    - main
`
  },
  {
    id: 'jenkins',
    name: 'Jenkins',
    icon: 'bi-gear-wide-connected',
    desc: 'Adicione um stage no seu Jenkinsfile para auditar o código.',
    status: 'disconnected',
    statusLabel: 'Desconectado',
    docUrl: '#',
    steps: [
      'Instale o plugin de credenciais e adicione AUDITORIA_TOKEN.',
      'Adicione o stage ao seu Jenkinsfile:'
    ],
    yaml: `stage('AuditorIA') {
  steps {
    script {
      sh """
        curl -s -X POST https://api.auditoria.dev/analyze \\
          -H "Authorization: Bearer \${AUDITORIA_TOKEN}" \\
          -H "Content-Type: application/json" \\
          -d '{"repo":"\${env.GIT_URL}","ref":"\${env.BRANCH_NAME}"}'
      """
    }
  }
}
`
  },
  {
    id: 'webhook',
    name: 'Webhook Genérico',
    icon: 'bi-webhook',
    desc: 'Dispare análises de qualquer ferramenta via HTTP POST.',
    status: 'connected',
    statusLabel: 'Ativo',
    docUrl: '#',
    steps: [
      'Utilize o endpoint abaixo para disparar análises programaticamente:',
      'Exemplo com curl:'
    ],
    yaml: `curl -X POST https://api.auditoria.dev/webhook \\
  -H "Authorization: Bearer SEU_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "repo": "https://github.com/usuario/repositorio",
    "ref": "refs/heads/main",
    "skills": ["seguranca","arquitetura","codesmell"]
  }'
`
  },
  {
    id: 'cli',
    name: 'CLI (Linha de Comando)',
    icon: 'bi-terminal',
    desc: 'Execute análises diretamente do terminal em qualquer ambiente.',
    status: 'connected',
    statusLabel: 'Instalado',
    docUrl: '#',
    steps: [
      'Instale a CLI com npm:',
      'Execute a análise:'
    ],
    yaml: `# Instalação
npm install -g auditoria-cli

# Uso
auditoria analyze --repo . --token SEU_TOKEN
`
  },
  {
    id: 'slack',
    name: 'Slack',
    icon: 'bi-slack',
    desc: 'Receba notificações no Slack quando uma análise for concluída.',
    status: 'disconnected',
    statusLabel: 'Desconectado',
    docUrl: '#',
    steps: [
      'Crie um webhook no Slack (Incoming Webhook).',
      'Configure o webhook nas configurações da plataforma.'
    ],
    yaml: `# Webhook URL (adicione nas configurações)
https://hooks.slack.com/services/T00/B00/xxxxxxxxx
`
  }
];