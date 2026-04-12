import { startModuleTour } from './tourHelpers';

export const STORAGE_TOUR_RELATORIOS = 'pontofacil_tour_relatorios_v1';

function steps() {
  return [
    {
      element: '#tour-rel-header',
      popover: {
        title: 'Espelho de ponto',
        description:
          'Consolidado do mês por colaborador, com exportação CSV, Excel ou PDF para o contador ou RH.',
        side: 'bottom',
        align: 'start',
      },
    },
    {
      element: '#tour-rel-filtros',
      popover: {
        title: 'Período e colaborador',
        description: 'Selecione mês, ano e, se quiser, um colaborador específico ou todos.',
        side: 'bottom',
      },
    },
    {
      element: '#tour-rel-conteudo',
      popover: {
        title: 'Banco de horas e espelho',
        description:
          'Acima (quando houver dados): resumo de horas trabalhadas vs. esperado. Abaixo: espelho detalhado com cada batida; use o lápis para ajustar com motivo.',
        side: 'top',
        align: 'start',
      },
    },
  ];
}

export function runRelatoriosTour(opts = {}) {
  startModuleTour({ storageKey: STORAGE_TOUR_RELATORIOS, steps: steps(), force: opts.force === true });
}
