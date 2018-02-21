export default {
  key: 'refuse_reason',
  name: 'Razão de recusa',
  items: [
    {
      label: 'Operadora de cartão',
      value: 'acquirer',
    },
    {
      label: 'Tempo de resposta excedido',
      value: 'acquirer_timeout',
    },
    {
      label: 'Antifraude',
      value: 'antifraud',
    },
    {
      label: 'Erro interno',
      value: 'internal_error',
    },
  ],
}
