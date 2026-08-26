// src/pages/ResultadosPage.jsx
import React, { useState } from 'react';
import { Title } from '../components/Title';
import { PieChartCard } from '../components/charts/PieChartCard';
import { BarChartCard } from '../components/charts/BarChartCard';
import { LineChartCard } from '../components/charts/LineChartCard';
import { mockData } from '../consts/mockData';
import { TrendingUp, Users, Vote, Calendar, ChevronDown } from 'lucide-react';

export const ResultadosPage = () => {
  const [selectedVotacao, setSelectedVotacao] = useState(mockData.votacoes[0]);
  const resultados = mockData.resultados;
  const votacoes = mockData.votacoes;

  const stats = [
    { icon: <Vote className="text-primary-color" />, label: "Total de Votos", value: selectedVotacao.totalVotos },
    { icon: <Users className="text-primary-color" />, label: "Participantes", value: selectedVotacao.participantes },
    { icon: <TrendingUp className="text-primary-color" />, label: "Participação", value: `${Math.round((selectedVotacao.totalVotos / selectedVotacao.participantes) * 100)}%` },
  ];

  return (
    <div className="py-4">
      <Title text="Resultados" />

      {/* Seletor de Votação */}
      <div className="mt-4 mb-6">
        <select
          value={selectedVotacao.id}
          onChange={(e) => {
            const votacao = votacoes.find(v => v.id === parseInt(e.target.value));
            setSelectedVotacao(votacao);
          }}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color w-full md:w-auto"
        >
          {votacoes.map(v => (
            <option key={v.id} value={v.id}>{v.titulo}</option>
          ))}
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white border border-[#cccc] rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <div className="w-12 h-12 bg-primary-color/10 rounded-full flex items-center justify-center">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PieChartCard data={resultados.distribuicaoVotos} title="Distribuição de Votos" />
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Detalhes da Votação</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-gray-600">Status</span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                selectedVotacao.status === 'ativa' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {selectedVotacao.status}
              </span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-gray-600">Período</span>
              <span className="text-sm">
                {new Date(selectedVotacao.dataInicio).toLocaleDateString()} - {new Date(selectedVotacao.dataTermino).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-gray-600">Tipo</span>
              <span className="text-sm">{selectedVotacao.tipo}</span>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Opções</h4>
              {selectedVotacao.opcoes.map((opcao) => (
                <div key={opcao.id} className="mb-2">
                  <div className="flex justify-between text-sm">
                    <span>{opcao.nome}</span>
                    <span>{opcao.votos} votos ({opcao.percentual}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-color rounded-full h-2 transition-all duration-500"
                      style={{ width: `${opcao.percentual}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <LineChartCard 
          data={resultados.evolucaoVotos} 
          title="Evolução dos Votos"
          xKey="dia"
          yKey="votos"
          color="#6366F1"
        />

        <BarChartCard 
          data={resultados.participacaoPorDia} 
          title="Participação por Dia"
          xKey="dia"
          yKey="participantes"
          color="#4F4665"
        />
      </div>
    </div>
  );
};