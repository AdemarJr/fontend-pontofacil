import { startModuleTour } from './tourHelpers';

/** v2: tour detalhado; passos do formulário só entram no roteiro se um colaborador estiver selecionado */
export const STORAGE_TOUR_ESCALAS = 'pontofacil_tour_escalas_v2';

function steps() {
  return [
    {
      element: '#tour-escalas-header',
      popover: {
        title: 'Jornadas e escalas',
        description:
          'Aqui você define o horário esperado por colaborador: entrada, saída, intervalo de almoço e dias da semana. O espelho de ponto e o banco de horas nos Relatórios usam essas regras para comparar o que foi registrado com o que era esperado.',
        side: 'bottom',
        align: 'start',
      },
    },
    {
      element: '#tour-escalas-colaborador',
      popover: {
        title: 'Escolha o colaborador',
        description:
          'Cada pessoa pode ter uma ou mais escalas (ex.: turno manhã e turno tarde). Selecione alguém na lista para carregar e editar as jornadas dele.',
        side: 'bottom',
      },
    },
    {
      element: '#tour-escalas-dica',
      popover: {
        title: 'Como funciona o fluxo',
        description:
          '1) Selecione um colaborador.\n2) Preencha Nova escala: nome (ex.: Manhã), horários, almoço, carga horária, dias da semana e clique em Adicionar escala.\n3) Na lista abaixo, ative ou desative cada jornada ou exclua a que não for mais usada.\n\nSe ainda não escolheu ninguém, os passos seguintes aparecem depois da seleção ou ao abrir este tour com um colaborador já selecionado.',
        side: 'bottom',
        align: 'start',
      },
    },
    {
      element: '#tour-escalas-form',
      popover: {
        title: 'Nova escala — identificação',
        description:
          'Dê um nome à jornada para reconhecer no painel (ex.: Padrão, Sábado, 12x36).',
        side: 'bottom',
        align: 'start',
      },
    },
    {
      element: '#tour-escalas-horarios',
      popover: {
        title: 'Entrada e saída',
        description:
          'Entrada e Saída são o início e o fim do expediente esperados para essa escala nos dias marcados.',
        side: 'bottom',
      },
    },
    {
      element: '#tour-escalas-almoco',
      popover: {
        title: 'Intervalo de almoço (esperado)',
        description:
          'Saída almoço e Retorno almoço são os horários esperados de intervalo. Eles entram na sequência de batidas (saída para almoço → retorno) no espelho.',
        side: 'bottom',
      },
    },
    {
      element: '#tour-escalas-carga',
      popover: {
        title: 'Carga horária e intervalo mínimo',
        description:
          'Carga horária líquida ajuda nos cálculos de resumo. Intervalo mínimo (em minutos) é o tempo mínimo considerado para o período de almoço entre saída e retorno, alinhado à sua política interna.',
        side: 'bottom',
      },
    },
    {
      element: '#tour-escalas-dias',
      popover: {
        title: 'Dias da semana',
        description:
          'Clique nos dias em que esta escala vale (ex.: seg–sex). A escala só é considerada nesses dias; você pode criar outra escala para finais de semana ou turnos diferentes.',
        side: 'top',
      },
    },
    {
      element: '#tour-escalas-salvar',
      popover: {
        title: 'Salvar a escala',
        description:
          'Clique em Adicionar escala para gravar. Depois ela aparece na lista abaixo; você pode ter várias escalas por pessoa e ativar só a que estiver em uso.',
        side: 'top',
        align: 'center',
      },
    },
    {
      element: '#tour-escalas-lista',
      popover: {
        title: 'Escalas cadastradas',
        description:
          'Cada item mostra nome, horários e dias. Use Desativar para parar de usar aquela jornada nos cálculos sem apagar, ou Excluir para remover. Há paginação se a lista for grande.',
        side: 'top',
        align: 'start',
      },
    },
  ];
}

export function runEscalasTour(opts = {}) {
  startModuleTour({ storageKey: STORAGE_TOUR_ESCALAS, steps: steps(), force: opts.force === true });
}
