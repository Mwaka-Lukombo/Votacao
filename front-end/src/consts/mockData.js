// src/data/mockData.js
export const mockData = {
  // Dados do Dashboard
  dashboard: {
    votacoesAtivas: 12,
    totalVotos: 12450,
    totalParticipantes: 859,
    taxaParticipacao: 85,
    votacoesRecentes: [
      { id: 1, titulo: "Eleição para Diretoria 2024", status: "ativa", participantes: 1248, votos: 856 },
      { id: 2, titulo: "Reforma do Estatuto", status: "ativa", participantes: 567, votos: 432 },
      { id: 3, titulo: "Novo Código de Ética", status: "ativa", participantes: 890, votos: 654 }
    ]
  },

  // Dados de Votações
  votacoes: [
    {
      id: 1,
      titulo: "Eleição para Diretoria 2024",
      descricao: "Eleição para escolher os novos membros da diretoria para o mandato 2024-2026",
      tipo: "Eleição",
      dataInicio: "2024-02-01T09:00:00",
      dataTermino: "2024-02-15T18:00:00",
      status: "ativa",
      participantes: 1248,
      totalVotos: 856,
      opcoes: [
        { id: 1, nome: "Chapa 1 - Carlos Oliveira", votos: 385, percentual: 45 },
        { id: 2, nome: "Chapa 2 - Maria Santos", votos: 257, percentual: 30 },
        { id: 3, nome: "Chapa 3 - João Pereira", votos: 171, percentual: 20 },
        { id: 4, nome: "Branco/Nulo", votos: 43, percentual: 5 }
      ]
    },
    {
      id: 2,
      titulo: "Reforma do Estatuto Social",
      descricao: "Votação para aprovação das alterações no estatuto social da organização",
      tipo: "Referendo",
      dataInicio: "2024-01-20T08:00:00",
      dataTermino: "2024-02-10T17:00:00",
      status: "ativa",
      participantes: 567,
      totalVotos: 432,
      opcoes: [
        { id: 1, nome: "Sim", votos: 324, percentual: 75 },
        { id: 2, nome: "Não", votos: 86, percentual: 20 },
        { id: 3, nome: "Abstenção", votos: 22, percentual: 5 }
      ]
    },
    {
      id: 3,
      titulo: "Novo Código de Ética",
      descricao: "Aprovação do novo código de ética e conduta para os membros",
      tipo: "Aprovação",
      dataInicio: "2024-01-15T10:00:00",
      dataTermino: "2024-02-05T16:00:00",
      status: "encerrada",
      participantes: 890,
      totalVotos: 654,
      opcoes: [
        { id: 1, nome: "Aprovar", votos: 524, percentual: 80 },
        { id: 2, nome: "Rejeitar", votos: 98, percentual: 15 },
        { id: 3, nome: "Abster-se", votos: 32, percentual: 5 }
      ]
    },
    {
      id: 4,
      titulo: "Plano de Ação Anual 2024",
      descricao: "Votação para aprovação do plano de ação e orçamento para 2024",
      tipo: "Planejamento",
      dataInicio: "2023-12-01T09:00:00",
      dataTermino: "2023-12-20T18:00:00",
      status: "encerrada",
      participantes: 723,
      totalVotos: 523,
      opcoes: [
        { id: 1, nome: "Aprovar", votos: 418, percentual: 80 },
        { id: 2, nome: "Rejeitar", votos: 68, percentual: 13 },
        { id: 3, nome: "Abster-se", votos: 37, percentual: 7 }
      ]
    }
  ],

  // Dados de Participantes
  participantes: [
    { id: 1, nome: "João Silva", email: "joao.silva@email.com", cargo: "Membro", status: "ativo", votos: 12 },
    { id: 2, nome: "Maria Santos", email: "maria.santos@email.com", cargo: "Diretora", status: "ativo", votos: 8 },
    { id: 3, nome: "Carlos Oliveira", email: "carlos.oliveira@email.com", cargo: "Presidente", status: "ativo", votos: 15 },
    { id: 4, nome: "Ana Pereira", email: "ana.pereira@email.com", cargo: "Vice-Presidente", status: "ativo", votos: 6 },
    { id: 5, nome: "Roberto Lima", email: "roberto.lima@email.com", cargo: "Membro", status: "inativo", votos: 3 },
    { id: 6, nome: "Patrícia Costa", email: "patricia.costa@email.com", cargo: "Membro", status: "ativo", votos: 9 },
    { id: 7, nome: "Fernando Rocha", email: "fernando.rocha@email.com", cargo: "Membro", status: "ativo", votos: 11 },
    { id: 8, nome: "Juliana Almeida", email: "juliana.almeida@email.com", cargo: "Membro", status: "inativo", votos: 2 }
  ],

  // Dados de Resultados (para gráficos)
  resultados: {
    evolucaoVotos: [
      { dia: "01/02", votos: 120 },
      { dia: "02/02", votos: 180 },
      { dia: "03/02", votos: 250 },
      { dia: "04/02", votos: 320 },
      { dia: "05/02", votos: 410 },
      { dia: "06/02", votos: 480 },
      { dia: "07/02", votos: 540 },
      { dia: "08/02", votos: 610 },
      { dia: "09/02", votos: 680 },
      { dia: "10/02", votos: 740 },
      { dia: "11/02", votos: 790 },
      { dia: "12/02", votos: 830 },
      { dia: "13/02", votos: 856 }
    ],
    distribuicaoVotos: [
      { name: "Chapa 1", value: 385 },
      { name: "Chapa 2", value: 257 },
      { name: "Chapa 3", value: 171 },
      { name: "Branco/Nulo", value: 43 }
    ],
    participacaoPorDia: [
      { dia: "01/02", participantes: 150 },
      { dia: "03/02", participantes: 280 },
      { dia: "05/02", participantes: 450 },
      { dia: "07/02", participantes: 580 },
      { dia: "09/02", participantes: 690 },
      { dia: "11/02", participantes: 780 },
      { dia: "13/02", participantes: 856 }
    ]
  }
};