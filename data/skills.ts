export interface Skill {
  id: string;
  name: string;
  icon: string;
  desc: string;
  enabled: boolean;
  prompt: string;
}

export const skillsData: Skill[] = [
  { id: 'seguranca', name: 'Análise de Segurança', icon: 'bi-shield-check', desc: 'Identifica vulnerabilidades como SQL injection, XSS, exposição de secrets e más práticas de autenticação.', enabled: true, prompt: 'Revise o código em busca de vulnerabilidades de segurança conhecidas (OWASP Top 10).' },
  { id: 'arquitetura', name: 'Análise de Arquitetura', icon: 'bi-layers', desc: 'Avalia separação de concerns, acoplamento, coesão e conformidade com padrões de projeto.', enabled: true, prompt: 'Analise a arquitetura do projeto: padrões utilizados, acoplamento entre módulos e aderência a boas práticas.' },
  { id: 'codesmell', name: 'Code Smell', icon: 'bi-exclamation-triangle', desc: 'Detecta código duplicado, métodos muito longos, complexidade ciclomática elevada e más práticas.', enabled: true, prompt: 'Identifique code smells: duplicação, métodos longos, complexidade elevada e más práticas de codificação.' },
  { id: 'desempenho', name: 'Análise de Desempenho', icon: 'bi-speedometer2', desc: 'Aponta gargalos de performance, queries N+1, falta de cache e uso ineficiente de recursos.', enabled: false, prompt: 'Analise o código em busca de gargalos de performance: queries lentas, falta de cache e uso ineficiente de recursos.' },
  { id: 'dependencias', name: 'Dependências', icon: 'bi-box-seam', desc: 'Verifica versões de dependências, vulnerabilidades conhecidas em pacotes e licenças.', enabled: false, prompt: 'Analise as dependências do projeto: versões desatualizadas, vulnerabilidades conhecidas e licenças.' },
];