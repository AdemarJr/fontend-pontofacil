import { startModuleTour } from './tourHelpers';

export const STORAGE_TOUR_CONFIGURACOES = 'pontofacil_tour_configuracoes_v1';

function steps() {
  return [
    {
      element: '#tour-cfg-header',
      popover: {
        title: 'Configurações da empresa',
        description: 'Totem, cerca virtual, locais e regras de registro — tudo que vale para o time.',
        side: 'bottom',
        align: 'start',
      },
    },
    {
      element: '#tour-cfg-totem',
      popover: {
        title: 'ID do totem',
        description: 'Identificador único da empresa para configurar tablets na entrada (modo totem).',
        side: 'bottom',
      },
    },
    {
      element: '#tour-cfg-geofence',
      popover: {
        title: 'Geofencing',
        description:
          'Ative a restrição por localização e defina coordenadas ou use os locais nomeados abaixo. Com a cerca ligada, o registro só vale dentro da área.',
        side: 'bottom',
        align: 'start',
      },
    },
    {
      element: '#tour-cfg-locais',
      popover: {
        title: 'Locais permitidos',
        description: 'Cadastre filiais ou entradas com GPS e raio; em Colaboradores você pode restringir cada pessoa a um local.',
        side: 'bottom',
        align: 'start',
      },
    },
    {
      element: '#tour-cfg-registro',
      popover: {
        title: 'Regras de registro',
        description: 'Foto obrigatória e tolerância de atraso em minutos para o espelho de ponto.',
        side: 'bottom',
      },
    },
    {
      element: '#tour-cfg-salvar',
      popover: {
        title: 'Salvar',
        description: 'Confirme as alterações para aplicar em novos registros.',
        side: 'top',
        align: 'center',
      },
    },
  ];
}

export function runConfiguracoesTour(opts = {}) {
  startModuleTour({ storageKey: STORAGE_TOUR_CONFIGURACOES, steps: steps(), force: opts.force === true });
}
