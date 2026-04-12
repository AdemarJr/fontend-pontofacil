/**
 * Tour guiado do painel (gestor) — sequência de balões próximos aos elementos.
 * Biblioteca: driver.js
 */
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

export const STORAGE_TOUR_ADMIN_DASHBOARD = 'pontofacil_tour_admin_dashboard_v1';

function buildSteps() {
  return [
    {
      element: '#tour-sidebar',
      popover: {
        title: 'Menu principal',
        description:
          'Use o menu para acessar Início, Colaboradores, Jornadas, Ausências, Relatórios e Configurações. Daqui você gerencia toda a operação de ponto.',
        side: 'right',
        align: 'start',
      },
    },
    {
      element: '#tour-dashboard-header',
      popover: {
        title: 'Painel de controle',
        description: 'Visualize a data de referência e o contexto do dia para acompanhar sua equipe.',
        side: 'bottom',
        align: 'start',
      },
    },
    {
      element: '#tour-dashboard-metrics',
      popover: {
        title: 'Indicadores do dia',
        description:
          'Resumo rápido: total de colaboradores, presentes, ausentes e quantidade de registros de ponto hoje.',
        side: 'bottom',
        align: 'center',
      },
    },
    {
      element: '#tour-dashboard-registros',
      popover: {
        title: 'Registros de hoje',
        description:
          'Últimas batidas do dia com tipo, horário e localização. Toque em Atualizar para recarregar a lista.',
        side: 'top',
        align: 'start',
      },
    },
  ];
}

function allTargetsPresent() {
  return ['#tour-sidebar', '#tour-dashboard-header', '#tour-dashboard-metrics', '#tour-dashboard-registros'].every(
    (sel) => document.querySelector(sel)
  );
}

/**
 * @param {{ force?: boolean }} opts — force=true ignora "já vi o tour" (ex.: botão Ajuda)
 */
export function runAdminDashboardTour(opts = {}) {
  const { force = false } = opts;
  if (typeof window === 'undefined') return;

  if (!force) {
    try {
      if (localStorage.getItem(STORAGE_TOUR_ADMIN_DASHBOARD) === '1') return;
    } catch {
      /* ignore */
    }
  }

  if (!allTargetsPresent()) return;

  const driverObj = driver({
    showProgress: true,
    progressText: '{{current}} de {{total}}',
    nextBtnText: 'Próximo',
    prevBtnText: 'Anterior',
    doneBtnText: 'Concluir',
    overlayColor: '#0f172a',
    overlayOpacity: 0.72,
    smoothScroll: true,
    animate: true,
    stagePadding: 8,
    stageRadius: 10,
    steps: buildSteps(),
    onDestroyed: () => {
      try {
        localStorage.setItem(STORAGE_TOUR_ADMIN_DASHBOARD, '1');
      } catch {
        /* ignore */
      }
    },
  });

  driverObj.drive();
}
