import { startModuleTour } from './tourHelpers';

export const STORAGE_TOUR_AUSENCIAS = 'pontofacil_tour_ausencias_v1';

function steps() {
  return [
    {
      element: '#tour-aus-header',
      popover: {
        title: 'Ausências e comprovantes',
        description:
          'Acompanhe atestados e documentos enviados pelos colaboradores. Por padrão a lista mostra todos os status; use o filtro à direita para focar em pendentes ou decisões.',
        side: 'bottom',
        align: 'start',
      },
    },
    {
      element: '#tour-aus-filtro',
      popover: {
        title: 'Filtro por status',
        description: 'Todos, Pendentes, Aprovados ou Rejeitados — escolha o que precisa analisar.',
        side: 'left',
        align: 'center',
      },
    },
    {
      element: '#tour-aus-lista',
      popover: {
        title: 'Fila de análise',
        description:
          'Visualize o arquivo, aprove ou rejeite com observação. Apenas itens pendentes exibem os botões de decisão.',
        side: 'top',
        align: 'start',
      },
    },
  ];
}

export function runAusenciasTour(opts = {}) {
  startModuleTour({ storageKey: STORAGE_TOUR_AUSENCIAS, steps: steps(), force: opts.force === true });
}
