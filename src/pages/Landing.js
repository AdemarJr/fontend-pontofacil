// src/pages/Landing.js — página pública de vendas
import { Link } from 'react-router-dom';
import '../styles/landing.css';

const WA_NUMBER = '5592994764780';
const WA_TEXT = encodeURIComponent(
  'Olá! Gostaria de falar com um consultor sobre o PontoFácil — controle de ponto digital.'
);
const WA_HREF = `https://wa.me/${WA_NUMBER}?text=${WA_TEXT}`;

const FEATURES = [
  {
    icon: '🖥️',
    title: 'Totem com PIN',
    text: 'Tablet na entrada com teclado numérico, registro rápido por PIN e foto opcional — ideal para recepção.',
  },
  {
    icon: '📊',
    title: 'Dashboard do gestor',
    text: 'Visão do dia, colaboradores, configurações da empresa e gestão de equipe em um só lugar.',
  },
  {
    icon: '📋',
    title: 'Espelho de ponto e relatórios',
    text: 'Espelho mensal por colaborador, exportação CSV, ajustes manuais com motivo e auditoria.',
  },
  {
    icon: '📍',
    title: 'Geofencing (GPS)',
    text: 'Restrinja registros a uma área configurável em metros — compliance e controle de presença no local.',
  },
  {
    icon: '📷',
    title: 'Foto no registro',
    text: 'Evidência visual integrada (armazenamento seguro; modo desenvolvimento sem S3 também disponível).',
  },
  {
    icon: '🏢',
    title: 'Multi-empresa (SaaS)',
    text: 'Isolamento total por tenant: cada cliente com seus dados, usuários e políticas próprias.',
  },
];

const SECURITY = [
  { icon: '🔐', title: 'JWT + refresh', desc: 'Sessões com renovação automática e tokens de curta duração no totem.' },
  { icon: '🔒', title: 'Senhas e PIN', desc: 'Hash bcrypt (salt 12); PIN numérico para o modo totem.' },
  { icon: '🛡️', title: 'Rate limiting', desc: 'Proteção contra abuso: limites globais e reforço no registro de ponto.' },
  { icon: '📸', title: 'Privacidade', desc: 'Fotos com acesso controlado; IP com hash para auditoria sem expor dados brutos.' },
];

export default function Landing() {
  return (
    <div className="landing">
      <header className="landing-header">
        <div className="landing-header-inner">
          <div className="landing-logo">
            <span style={{ fontSize: '1.5rem' }}>🕐</span>
            <span>PontoFácil</span>
          </div>
          <nav className="landing-nav" aria-label="Seções">
            <a href="#funcionalidades">Funcionalidades</a>
            <a href="#planos">Planos</a>
            <a href="#seguranca">Segurança</a>
            <a href="#como-funciona">Como funciona</a>
          </nav>
          <div className="landing-header-actions">
            <a href={WA_HREF} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '10px 18px', fontSize: '14px' }}>
              Fale com um consultor
            </a>
            <Link to="/login" className="btn btn-secondary" style={{ padding: '10px 18px', fontSize: '14px' }}>
              Entrar
            </Link>
          </div>
        </div>
      </header>

      <section className="landing-hero">
        <div className="landing-hero-inner">
          <h1>Controle de ponto digital que sua empresa merece</h1>
          <p className="lead">
            PontoFácil é um sistema SaaS completo: totem com PIN, painel para gestores, relatórios,
            geofencing, multi-empresa e segurança de nível corporativo — tudo em uma PWA que roda no
            navegador ou instalável no tablet e no celular.
          </p>
          <div className="landing-pill-row" aria-hidden>
            <span className="landing-pill">PWA instalável</span>
            <span className="landing-pill">Multi-tenant</span>
            <span className="landing-pill">API REST moderna</span>
          </div>
          <div className="landing-hero-ctas">
            <a href={WA_HREF} target="_blank" rel="noopener noreferrer" className="landing-btn-wa">
              <span style={{ fontSize: '1.35rem' }} aria-hidden>💬</span>
              Fale com um de nossos consultores
            </a>
            <Link to="/login" className="landing-btn-outline-light">
              Já sou cliente — Entrar
            </Link>
          </div>
          <p style={{ marginTop: '20px', fontSize: '13px', opacity: 0.75 }}>
            WhatsApp: <strong style={{ fontWeight: 600 }}>(92) 99476-4780</strong>
          </p>
        </div>
      </section>

      <section id="funcionalidades" className="landing-section">
        <div className="landing-section-inner">
          <h2>Tudo que o sistema oferece</h2>
          <p className="sub">
            Do registro no totem ao espelho de ponto e ajustes auditáveis — funcionalidades pensadas para RH,
            gestores e colaboradores no dia a dia.
          </p>
          <div className="landing-grid-3">
            {FEATURES.map((f) => (
              <article key={f.title} className="landing-card">
                <div className="icon" aria-hidden>{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="como-funciona" className="landing-section alt">
        <div className="landing-section-inner">
          <h2>Como funciona na prática</h2>
          <p className="sub">
            Fluxo típico: configure a empresa no painel, disponibilize o totem na entrada e acompanhe os
            registros em tempo real.
          </p>
          <div className="landing-grid-3">
            <article className="landing-card">
              <div className="icon">1️⃣</div>
              <h3>Cadastro e configuração</h3>
              <p>
                Plano por porte (usuários), dados da empresa, geofencing opcional e política de foto obrigatória
                ou não — tudo centralizado nas configurações.
              </p>
            </article>
            <article className="landing-card">
              <div className="icon">2️⃣</div>
              <h3>Totem e colaboradores</h3>
              <p>
                Colaboradores batem ponto com PIN no totem; gestores cadastram equipe, cargos e escalas de
                trabalho conforme o processo da empresa.
              </p>
            </article>
            <article className="landing-card">
              <div className="icon">3️⃣</div>
              <h3>Relatórios e conformidade</h3>
              <p>
                Espelho de ponto mensal, resumo do dia, exportação CSV e ajustes com motivo — base para
                processos internos e fiscalização.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="planos" className="landing-section">
        <div className="landing-section-inner">
          <h2>Planos por porte</h2>
          <p className="sub">
            Escolha o plano conforme o tamanho da sua equipe. Fale com um consultor para condições comerciais
            e implantação.
          </p>
          <div className="landing-plans">
            <div className="landing-plan">
              <h3>Básico</h3>
              <p className="price-note">Até 10 usuários</p>
              <ul>
                <li>Totem + PIN</li>
                <li>Dashboard e colaboradores</li>
                <li>Relatórios e espelho de ponto</li>
                <li>Geofencing e foto configuráveis</li>
              </ul>
              <a href={WA_HREF} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-full">
                Solicitar proposta
              </a>
            </div>
            <div className="landing-plan featured">
              <h3>Profissional</h3>
              <p className="price-note">Até 50 usuários</p>
              <ul>
                <li>Tudo do Básico</li>
                <li>Mais capacidade para médias empresas</li>
                <li>Ideal para filiais e times maiores</li>
                <li>Suporte à implantação com consultor</li>
              </ul>
              <a href={WA_HREF} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-full">
                Fale com consultor
              </a>
            </div>
            <div className="landing-plan">
              <h3>Enterprise</h3>
              <p className="price-note">Usuários ilimitados</p>
              <ul>
                <li>Volume e requisitos corporativos</li>
                <li>Condições sob medida</li>
                <li>Integrações e roadmap alinhado</li>
                <li>Atendimento dedicado</li>
              </ul>
              <a href={WA_HREF} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-full">
                Solicitar proposta
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="seguranca" className="landing-section alt">
        <div className="landing-section-inner">
          <h2>Segurança e tecnologia</h2>
          <p className="sub">
            Arquitetura moderna (API REST, JWT, PostgreSQL) com boas práticas para proteger dados e operações.
          </p>
          <div className="landing-security">
            {SECURITY.map((s) => (
              <div key={s.title} className="landing-security-item">
                <span style={{ fontSize: '1.5rem' }} aria-hidden>{s.icon}</span>
                <div>
                  <strong>{s.title}</strong>
                  <span>{s.desc}</span>
                </div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', marginTop: '28px', fontSize: '14px', color: 'var(--cinza-400)', maxWidth: '640px', marginLeft: 'auto', marginRight: 'auto' }}>
            Roadmap: exportação PDF do espelho, notificações, integrações com folha e eSocial, entre outras
            evoluções — consulte nossos especialistas sobre o que já está disponível e o que está em
            desenvolvimento.
          </p>
        </div>
      </section>

      <section className="landing-section">
        <div className="landing-section-inner" style={{ textAlign: 'center' }}>
          <h2>App no celular e tablet</h2>
          <p className="sub" style={{ marginBottom: '0' }}>
            Progressive Web App (PWA): instale na tela inicial, use em tela cheia no totem e aproveite
            experiência otimizada para toque — sem depender de loja de aplicativos para começar.
          </p>
        </div>
      </section>

      <section className="landing-cta">
        <h2>Pronto para modernizar o ponto na sua empresa?</h2>
        <p>
          Nossa equipe tira suas dúvidas sobre planos, implantação e como o PontoFácil se encaixa no seu
          processo de RH.
        </p>
        <a href={WA_HREF} target="_blank" rel="noopener noreferrer" className="landing-btn-wa" style={{ fontSize: '17px' }}>
          💬 Fale com um de nossos consultores
        </a>
        <p style={{ marginTop: '16px', fontSize: '14px', color: 'var(--cinza-700)' }}>
          WhatsApp: <strong>(92) 99476-4780</strong>
        </p>
      </section>

      <footer className="landing-footer">
        <p>
          <strong>PontoFácil</strong> — Sistema SaaS de controle de ponto digital
        </p>
        <p style={{ marginTop: '8px' }}>
          <Link to="/login" style={{ color: 'var(--verde)' }}>Acesso ao sistema</Link>
          {' · '}
          <a href={WA_HREF} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--verde)' }}>
            Contato comercial
          </a>
        </p>
      </footer>
    </div>
  );
}
