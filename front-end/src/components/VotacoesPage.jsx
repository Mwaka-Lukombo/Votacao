// src/pages/VotacoesPage.jsx
import React, { useState } from 'react';
import { Title } from '../components/Title';
import { Card } from '../components/Card';
import { Search, Plus, Filter, Calendar, Users, Clock } from 'lucide-react';
import { mockData } from '../consts/mockData';

export const VotacoesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const votacoes = mockData.votacoes;

  const filteredVotacoes = votacoes.filter(votacao => {
    const matchSearch = votacao.titulo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'todos' || votacao.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'ativa': return 'bg-green-100 text-green-800';
      case 'encerrada': return 'bg-gray-100 text-gray-800';
      case 'pendente': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="py-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <Title text="Votações" />
        <button className="flex items-center gap-2 bg-primary-color text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors">
          <Plus size={20} />
          Nova Votação
        </button>
      </div>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar votações..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border text-xs font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color"
        >
          <option value="todos">Todos os Status</option>
          <option value="ativa">Ativas</option>
          <option value="encerrada">Encerradas</option>
          <option value="pendente">Pendentes</option>
        </select>
      </div>

      {/* Lista de Votações */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredVotacoes.map((votacao) => (
          <div key={votacao.id} className="border border-[#cccc] rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold">{votacao.titulo}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(votacao.status)}`}>
                {votacao.status.charAt(0).toUpperCase() + votacao.status.slice(1)}
              </span>
            </div>
            
            <p className="text-gray-600 text-sm mb-4">{votacao.descricao}</p>
            
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Users size={16} />
                <span>{votacao.participantes} participantes</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock size={16} />
                <span>{votacao.totalVotos} votos</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 col-span-2">
                <Calendar size={16} />
                <span>
                  {new Date(votacao.dataInicio).toLocaleDateString()} - {new Date(votacao.dataTermino).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t flex justify-end gap-2">
              <button className="px-3 py-1 text-sm text-primary-color border border-primary-color rounded hover:bg-primary-color hover:text-white transition-colors">
                Ver Detalhes
              </button>
              {votacao.status === 'ativa' && (
                <button className="px-3 py-1 text-sm bg-primary-color text-white rounded hover:bg-opacity-90 transition-colors">
                  Votar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};